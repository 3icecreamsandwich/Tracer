use super::vault::{open_unlocked_stronghold, VaultKeyState};
use crate::security;
use serde::Deserialize;
use std::collections::HashMap;

const MAX_SECRET_LENGTH: usize = 8_192;
const MAX_OPENAI_COMPAT_CONFIG_LENGTH: usize = 4_096;

#[derive(Debug, Deserialize, serde::Serialize)]
struct OpenAiCompatConfig {
    #[serde(rename = "baseURL")]
    base_url: String,
    #[serde(rename = "modelId")]
    model_id: String,
}

fn normalize_secret(value: &str) -> Result<&str, security::AppLockError> {
    let normalized = value.trim();
    if normalized.len() > MAX_SECRET_LENGTH {
        return Err(security::AppLockError::new(
            "invalid_secret",
            "The credential is too long",
        ));
    }
    Ok(normalized)
}

/// Keep the configurable provider useful for trusted, user-chosen services while
/// preventing malformed, credential-bearing, or non-local insecure endpoints.
fn normalize_openai_compat_config_json(raw: &str) -> Result<String, security::AppLockError> {
    let raw = raw.trim();
    if raw.is_empty() || raw.len() > MAX_OPENAI_COMPAT_CONFIG_LENGTH {
        return Err(security::AppLockError::new(
            "invalid_provider_config",
            "The provider configuration is invalid",
        ));
    }

    let parsed: OpenAiCompatConfig = serde_json::from_str(raw).map_err(|_| {
        security::AppLockError::new(
            "invalid_provider_config",
            "The provider configuration is invalid",
        )
    })?;
    let model_id = parsed.model_id.trim();
    if model_id.is_empty() || model_id.len() > 256 || model_id.chars().any(char::is_control) {
        return Err(security::AppLockError::new(
            "invalid_provider_config",
            "The provider configuration is invalid",
        ));
    }

    let url = tauri::Url::parse(parsed.base_url.trim()).map_err(|_| {
        security::AppLockError::new(
            "invalid_provider_config",
            "The provider configuration is invalid",
        )
    })?;
    let host = url.host_str().unwrap_or_default().to_ascii_lowercase();
    let is_loopback = host == "localhost" || host == "127.0.0.1" || host == "::1";
    let secure_remote = url.scheme() == "https";
    let permitted_local = url.scheme() == "http" && is_loopback;
    if (!secure_remote && !permitted_local)
        || host.is_empty()
        || !url.username().is_empty()
        || url.password().is_some()
        || url.query().is_some()
        || url.fragment().is_some()
    {
        return Err(security::AppLockError::new(
            "invalid_provider_config",
            "Use an HTTPS provider URL or a local loopback URL",
        ));
    }

    let base_url = url.as_str().trim_end_matches('/').to_string();
    serde_json::to_string(&OpenAiCompatConfig {
        base_url,
        model_id: model_id.to_string(),
    })
    .map_err(|_| {
        security::AppLockError::new(
            "invalid_provider_config",
            "The provider configuration is invalid",
        )
    })
}

#[derive(Debug, Deserialize)]
pub(crate) struct AiOpenAiCompatSetArgs {
    #[serde(rename = "configJson")]
    config_json: String,
}

#[derive(Debug, Deserialize)]
pub(crate) struct AiProviderSettingsSaveArgs {
    #[serde(rename = "apiKeys")]
    api_keys: Option<HashMap<String, String>>,
    #[serde(rename = "openAiCompatConfigJson")]
    openai_compat_config_json: Option<String>,
}

fn map_ai_kind_to_store_key(kind: &str) -> Option<&'static str> {
    match kind {
        "openai_api_key" => Some(security::STRONGHOLD_STORE_KEY_OPENAI_API_KEY),
        "anthropic_api_key" => Some(security::STRONGHOLD_STORE_KEY_ANTHROPIC_API_KEY),
        "gemini_api_key" => Some(security::STRONGHOLD_STORE_KEY_GEMINI_API_KEY),
        "ollama_cloud_api_key" => Some(security::STRONGHOLD_STORE_KEY_OLLAMA_CLOUD_API_KEY),
        "github_models_token" => Some(security::STRONGHOLD_STORE_KEY_GITHUB_MODELS_TOKEN),
        "openai_compat_api_key" => Some(security::STRONGHOLD_STORE_KEY_OPENAI_COMPAT_API_KEY),
        _ => None,
    }
}

#[tauri::command]
pub(crate) async fn ai_provider_api_key_presence(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
) -> Result<security::ProviderApiKeyPresence, security::AppLockError> {
    let stronghold = open_unlocked_stronghold(&app, &key_state)?;
    security::stronghold_provider_api_key_presence(&stronghold)
}

#[tauri::command]
pub(crate) async fn ai_provider_settings_save(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
    args: AiProviderSettingsSaveArgs,
) -> Result<security::ProviderSettingsSaveResult, security::AppLockError> {
    let mut api_keys: Vec<(security::ProviderApiKeyId, String)> = Vec::new();
    for (id, value) in args.api_keys.unwrap_or_default() {
        let provider_id = security::provider_api_key_id_from_str(&id)
            .ok_or_else(|| security::AppLockError::new("invalid_provider", "Unknown provider"))?;
        api_keys.push((provider_id, normalize_secret(&value)?.to_string()));
    }

    let normalized_openai_compat_config = args
        .openai_compat_config_json
        .as_deref()
        .map(normalize_openai_compat_config_json)
        .transpose()?;

    if api_keys.iter().all(|(_, value)| value.trim().is_empty())
        && args
            .openai_compat_config_json
            .as_deref()
            .map(str::trim)
            .filter(|value| !value.is_empty())
            .is_none()
    {
        return Ok(security::ProviderSettingsSaveResult::default());
    }

    let stronghold = open_unlocked_stronghold(&app, &key_state)?;
    security::stronghold_provider_settings_save(
        &stronghold,
        &api_keys,
        normalized_openai_compat_config.as_deref(),
    )
}

#[tauri::command]
pub(crate) async fn ai_secrets_delete(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
    kind: String,
) -> Result<(), security::AppLockError> {
    let stronghold = open_unlocked_stronghold(&app, &key_state)?;
    let key = map_ai_kind_to_store_key(&kind)
        .ok_or_else(|| security::AppLockError::new("invalid_kind", "Unknown credential kind"))?;
    security::stronghold_store_delete_if_present(&stronghold, key)
}

#[tauri::command]
pub(crate) async fn ai_secrets_get(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
    kind: String,
) -> Result<Option<String>, security::AppLockError> {
    let stronghold = open_unlocked_stronghold(&app, &key_state)?;
    let key = map_ai_kind_to_store_key(&kind)
        .ok_or_else(|| security::AppLockError::new("invalid_kind", "Unknown credential kind"))?;
    security::stronghold_store_get(&stronghold, key)
}

#[tauri::command]
pub(crate) async fn ai_secrets_set(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
    kind: String,
    value: String,
) -> Result<(), security::AppLockError> {
    let stronghold = open_unlocked_stronghold(&app, &key_state)?;
    let key = map_ai_kind_to_store_key(&kind)
        .ok_or_else(|| security::AppLockError::new("invalid_kind", "Unknown credential kind"))?;
    let value = normalize_secret(&value)?;
    if value.is_empty() {
        security::stronghold_store_delete_if_present(&stronghold, key)
    } else {
        security::stronghold_store_set(&stronghold, key, value)
    }
}

#[tauri::command]
pub(crate) async fn ai_openai_compat_get_config(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
) -> Result<Option<String>, security::AppLockError> {
    let stronghold = open_unlocked_stronghold(&app, &key_state)?;
    let raw = security::stronghold_store_get(
        &stronghold,
        security::STRONGHOLD_STORE_KEY_OPENAI_COMPAT_CONFIG_JSON,
    )?;
    raw.map(|value| normalize_openai_compat_config_json(&value))
        .transpose()
}

#[tauri::command]
pub(crate) async fn ai_openai_compat_set_config(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
    args: AiOpenAiCompatSetArgs,
) -> Result<(), security::AppLockError> {
    let stronghold = open_unlocked_stronghold(&app, &key_state)?;
    let config_json = normalize_openai_compat_config_json(&args.config_json)?;
    security::stronghold_store_set(
        &stronghold,
        security::STRONGHOLD_STORE_KEY_OPENAI_COMPAT_CONFIG_JSON,
        &config_json,
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn normalizes_a_secure_custom_provider_configuration() {
        let value = normalize_openai_compat_config_json(
            r#"{ "baseURL": "https://models.example.com/v1/", "modelId": "model-1" }"#,
        )
        .expect("configuration should be valid");

        assert_eq!(
            value,
            r#"{"baseURL":"https://models.example.com/v1","modelId":"model-1"}"#
        );
    }

    #[test]
    fn permits_only_secure_remote_or_local_loopback_provider_urls() {
        for value in [
            r#"{"baseURL":"http://example.com/v1","modelId":"model"}"#,
            r#"{"baseURL":"https://user:secret@example.com/v1","modelId":"model"}"#,
            r#"{"baseURL":"https://example.com/v1?token=secret","modelId":"model"}"#,
            r#"{"baseURL":"ftp://example.com/v1","modelId":"model"}"#,
        ] {
            assert!(normalize_openai_compat_config_json(value).is_err());
        }

        assert!(normalize_openai_compat_config_json(
            r#"{"baseURL":"http://127.0.0.1:11434/v1","modelId":"local-model"}"#
        )
        .is_ok());
    }

    #[test]
    fn rejects_oversized_secrets() {
        assert!(normalize_secret(&"a".repeat(MAX_SECRET_LENGTH + 1)).is_err());
    }
}
