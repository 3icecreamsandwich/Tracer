use crate::security;
use rand_core::RngCore;
use std::collections::HashMap;
use std::sync::Mutex;
use tauri_plugin_opener::OpenerExt;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

#[derive(Debug, Default)]
pub(crate) struct OAuthCallbackState(Mutex<HashMap<String, OAuthCallbackListener>>);

#[derive(Debug)]
struct OAuthCallbackListener {
    receiver: tokio::sync::oneshot::Receiver<OAuthCallback>,
}

#[derive(Debug, serde::Serialize, serde::Deserialize, Clone)]
pub(crate) struct GithubPkceCallback {
    code: String,
    state: String,
}

#[derive(Debug, serde::Serialize, serde::Deserialize, Clone)]
pub(crate) struct OAuthCallback {
    code: Option<String>,
    state: Option<String>,
    error: Option<String>,
    #[serde(rename = "errorDescription")]
    error_description: Option<String>,
}

#[derive(Debug, serde::Serialize)]
pub(crate) struct GithubPkceStartResult {
    id: String,
    port: u16,
}

pub(crate) type OAuthCallbackStartResult = GithubPkceStartResult;

fn random_id_hex(bytes: usize) -> String {
    let mut buf = vec![0u8; bytes];
    rand_core::OsRng.fill_bytes(&mut buf);
    const LUT: &[u8; 16] = b"0123456789abcdef";
    let mut out = String::with_capacity(bytes * 2);
    for b in buf {
        out.push(LUT[(b >> 4) as usize] as char);
        out.push(LUT[(b & 0x0f) as usize] as char);
    }
    out
}

fn parse_query_param(query: &str, key: &str) -> Option<String> {
    for pair in query.split('&') {
        let mut it = pair.splitn(2, '=');
        let k = it.next()?;
        let v = it.next().unwrap_or("");
        if k == key {
            return Some(urlencoding::decode(v).ok()?.to_string());
        }
    }
    None
}

fn parse_callback_path(path: &str) -> Option<OAuthCallback> {
    let (route, query) = path.split_once('?')?;
    if route != "/callback" {
        return None;
    }
    let callback = OAuthCallback {
        code: parse_query_param(query, "code"),
        state: parse_query_param(query, "state"),
        error: parse_query_param(query, "error"),
        error_description: parse_query_param(query, "error_description"),
    };
    (callback.code.is_some() || callback.error.is_some()).then_some(callback)
}

async fn handle_pkce_http_once(
    listener: tokio::net::TcpListener,
    sender: tokio::sync::oneshot::Sender<OAuthCallback>,
) {
    let accept = listener.accept().await;
    if accept.is_err() {
        return;
    }
    let (mut stream, _) = accept.expect("accepted");

    let mut buf = vec![0u8; 8192];
    let n = match stream.read(&mut buf).await {
        Ok(n) => n,
        Err(_) => 0,
    };
    let req = String::from_utf8_lossy(&buf[..n]).to_string();
    let line = req.lines().next().unwrap_or("");

    let mut callback = None;
    if let Some(path) = line.split_whitespace().nth(1) {
        callback = parse_callback_path(path);
    }

    if let Some(callback) = callback {
        let _ = sender.send(callback);
    }

    let body =
        "<html><body><p>Authentication complete. You can close this window.</p></body></html>";
    let resp = format!(
        "HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: {}\r\nConnection: close\r\n\r\n{}",
        body.as_bytes().len(),
        body
    );
    let _ = stream.write_all(resp.as_bytes()).await;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_success_callback_and_decodes_values() {
        let callback =
            parse_callback_path("/callback?code=abc%20123&state=state-value").expect("callback");
        assert_eq!(callback.code.as_deref(), Some("abc 123"));
        assert_eq!(callback.state.as_deref(), Some("state-value"));
        assert!(callback.error.is_none());
    }

    #[test]
    fn parses_provider_error_callback() {
        let callback =
            parse_callback_path("/callback?error=access_denied&error_description=User%20cancelled")
                .expect("callback");
        assert_eq!(callback.error.as_deref(), Some("access_denied"));
        assert_eq!(
            callback.error_description.as_deref(),
            Some("User cancelled")
        );
    }

    #[test]
    fn rejects_wrong_paths_and_empty_callbacks() {
        assert!(parse_callback_path("/wrong?code=abc").is_none());
        assert!(parse_callback_path("/callback?state=only-state").is_none());
    }
}

#[tauri::command]
pub(crate) async fn open_external(
    app: tauri::AppHandle,
    url: String,
) -> Result<(), security::AppLockError> {
    if url.trim().is_empty() {
        return Err(security::AppLockError::new(
            "invalid_url",
            "URL is required",
        ));
    }
    app.opener()
        .open_url(url, None::<&str>)
        .map_err(|e| security::AppLockError::new("opener", e.to_string()))
}

#[tauri::command]
pub(crate) async fn github_oauth_pkce_start(
    state: tauri::State<'_, OAuthCallbackState>,
) -> Result<GithubPkceStartResult, security::AppLockError> {
    oauth_callback_start(state).await
}

#[tauri::command]
pub(crate) async fn oauth_callback_start(
    state: tauri::State<'_, OAuthCallbackState>,
) -> Result<OAuthCallbackStartResult, security::AppLockError> {
    let id = random_id_hex(16);
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0")
        .await
        .map_err(|e| security::AppLockError::new("listen", e.to_string()))?;
    let port = listener
        .local_addr()
        .map_err(|e| security::AppLockError::new("listen", e.to_string()))?
        .port();

    let (tx, rx) = tokio::sync::oneshot::channel();
    {
        let mut map = state.0.lock().expect("pkce state mutex");
        map.insert(id.clone(), OAuthCallbackListener { receiver: rx });
    }

    tauri::async_runtime::spawn(handle_pkce_http_once(listener, tx));

    Ok(GithubPkceStartResult { id, port })
}

#[derive(Debug, serde::Deserialize)]
pub(crate) struct GithubPkceFinishArgs {
    #[serde(rename = "expectedState")]
    expected_state: String,
    #[serde(rename = "timeoutMs")]
    timeout_ms: Option<u64>,
}

#[tauri::command]
pub(crate) async fn github_oauth_pkce_finish(
    state: tauri::State<'_, OAuthCallbackState>,
    id: String,
    args: GithubPkceFinishArgs,
) -> Result<GithubPkceCallback, security::AppLockError> {
    let mut listener = {
        let mut map = state.0.lock().expect("pkce state mutex");
        map.remove(&id)
    }
    .ok_or_else(|| security::AppLockError::new("not_found", "PKCE listener not found"))?;

    let timeout = args.timeout_ms.unwrap_or(120_000);
    let result = tokio::time::timeout(
        std::time::Duration::from_millis(timeout),
        &mut listener.receiver,
    )
    .await
    .map_err(|_| security::AppLockError::new("timeout", "OAuth callback timed out"))?;
    let cb =
        result.map_err(|_| security::AppLockError::new("cancelled", "OAuth callback cancelled"))?;
    let code = cb.code.ok_or_else(|| {
        security::AppLockError::new(
            "oauth_error",
            cb.error_description
                .unwrap_or_else(|| "OAuth authorization failed".into()),
        )
    })?;
    let callback_state = cb.state.unwrap_or_default();
    if callback_state != args.expected_state {
        return Err(security::AppLockError::new(
            "invalid_state",
            "OAuth state mismatch",
        ));
    }
    Ok(GithubPkceCallback {
        code,
        state: callback_state,
    })
}

#[derive(Debug, serde::Deserialize)]
pub(crate) struct OAuthCallbackFinishArgs {
    #[serde(rename = "timeoutMs")]
    timeout_ms: Option<u64>,
}

#[tauri::command]
pub(crate) async fn oauth_callback_finish(
    state: tauri::State<'_, OAuthCallbackState>,
    id: String,
    args: OAuthCallbackFinishArgs,
) -> Result<OAuthCallback, security::AppLockError> {
    let mut listener = {
        let mut map = state.0.lock().expect("oauth callback state mutex");
        map.remove(&id)
    }
    .ok_or_else(|| security::AppLockError::new("not_found", "OAuth callback listener not found"))?;

    let timeout = args.timeout_ms.unwrap_or(120_000);
    tokio::time::timeout(
        std::time::Duration::from_millis(timeout),
        &mut listener.receiver,
    )
    .await
    .map_err(|_| security::AppLockError::new("timeout", "OAuth callback timed out"))?
    .map_err(|_| security::AppLockError::new("cancelled", "OAuth callback cancelled"))
}

#[tauri::command]
pub(crate) async fn github_oauth_pkce_cancel(
    state: tauri::State<'_, OAuthCallbackState>,
    id: String,
) -> Result<(), security::AppLockError> {
    oauth_callback_cancel(state, id).await
}

#[tauri::command]
pub(crate) async fn oauth_callback_cancel(
    state: tauri::State<'_, OAuthCallbackState>,
    id: String,
) -> Result<(), security::AppLockError> {
    let _ = {
        let mut map = state.0.lock().expect("pkce state mutex");
        map.remove(&id)
    };
    Ok(())
}
