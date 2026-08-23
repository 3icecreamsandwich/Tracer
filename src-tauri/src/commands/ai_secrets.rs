use super::vault::{open_unlocked_stronghold, VaultKeyState};
use crate::security;
use serde::Deserialize;
use std::collections::HashMap;

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
        api_keys.push((provider_id, value));
    }

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
        args.openai_compat_config_json.as_deref(),
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
    security::stronghold_store_set(&stronghold, key, value.trim())
}

#[tauri::command]
pub(crate) async fn ai_openai_compat_get_config(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
) -> Result<Option<String>, security::AppLockError> {
    let stronghold = open_unlocked_stronghold(&app, &key_state)?;
    security::stronghold_store_get(
        &stronghold,
        security::STRONGHOLD_STORE_KEY_OPENAI_COMPAT_CONFIG_JSON,
    )
}

#[tauri::command]
pub(crate) async fn ai_openai_compat_set_config(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
    args: AiOpenAiCompatSetArgs,
) -> Result<(), security::AppLockError> {
    let stronghold = open_unlocked_stronghold(&app, &key_state)?;
    security::stronghold_store_set(
        &stronghold,
        security::STRONGHOLD_STORE_KEY_OPENAI_COMPAT_CONFIG_JSON,
        args.config_json.trim(),
    )
}
