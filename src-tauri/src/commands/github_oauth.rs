use crate::security;
use rand_core::RngCore;
use std::collections::HashMap;
use std::sync::Mutex;
use tauri_plugin_opener::OpenerExt;

#[derive(Debug, Default)]
pub(crate) struct GithubPkceState(Mutex<HashMap<String, GithubPkceListener>>);

#[derive(Debug)]
struct GithubPkceListener {
    receiver: tokio::sync::oneshot::Receiver<GithubPkceCallback>,
}

#[derive(Debug, serde::Serialize, serde::Deserialize, Clone)]
pub(crate) struct GithubPkceCallback {
    code: String,
    state: String,
}

#[derive(Debug, serde::Serialize)]
pub(crate) struct GithubPkceStartResult {
    id: String,
    port: u16,
}

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

async fn handle_pkce_http_once(
    listener: tokio::net::TcpListener,
    sender: tokio::sync::oneshot::Sender<GithubPkceCallback>,
) {
    let accept = listener.accept().await;
    if accept.is_err() {
        return;
    }
    let (stream, _) = accept.expect("accepted");

    let mut buf = vec![0u8; 8192];
    let n = match stream.try_read(&mut buf) {
        Ok(n) => n,
        Err(_) => 0,
    };
    let req = String::from_utf8_lossy(&buf[..n]).to_string();
    let line = req.lines().next().unwrap_or("");

    let mut code: Option<String> = None;
    let mut state: Option<String> = None;
    if let Some(path) = line.split_whitespace().nth(1) {
        if let Some((p, q)) = path.split_once('?') {
            if p == "/callback" {
                code = parse_query_param(q, "code");
                state = parse_query_param(q, "state");
            }
        }
    }

    if let (Some(c), Some(s)) = (code, state) {
        let _ = sender.send(GithubPkceCallback { code: c, state: s });
    }

    let body =
        "<html><body><p>Authentication complete. You can close this window.</p></body></html>";
    let resp = format!(
        "HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: {}\r\nConnection: close\r\n\r\n{}",
        body.as_bytes().len(),
        body
    );
    let _ = stream.try_write(resp.as_bytes());
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
    state: tauri::State<'_, GithubPkceState>,
) -> Result<GithubPkceStartResult, security::AppLockError> {
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
        map.insert(id.clone(), GithubPkceListener { receiver: rx });
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
    state: tauri::State<'_, GithubPkceState>,
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
    if cb.state != args.expected_state {
        return Err(security::AppLockError::new(
            "invalid_state",
            "OAuth state mismatch",
        ));
    }
    Ok(cb)
}

#[tauri::command]
pub(crate) async fn github_oauth_pkce_cancel(
    state: tauri::State<'_, GithubPkceState>,
    id: String,
) -> Result<(), security::AppLockError> {
    let _ = {
        let mut map = state.0.lock().expect("pkce state mutex");
        map.remove(&id)
    };
    Ok(())
}
