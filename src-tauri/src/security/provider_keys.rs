use super::store::STRONGHOLD_CLIENT;
use super::{AppLockError, ProviderApiKeyPresence, ProviderSettingsSaveResult};

pub(crate) const STRONGHOLD_STORE_KEY_OPENAI_API_KEY: &str = "ai_openai_api_key";
pub(crate) const STRONGHOLD_STORE_KEY_ANTHROPIC_API_KEY: &str = "ai_anthropic_api_key";
pub(crate) const STRONGHOLD_STORE_KEY_GEMINI_API_KEY: &str = "ai_gemini_api_key";
pub(crate) const STRONGHOLD_STORE_KEY_OLLAMA_CLOUD_API_KEY: &str = "ai_ollama_cloud_api_key";
pub(crate) const STRONGHOLD_STORE_KEY_GITHUB_MODELS_TOKEN: &str = "ai_github_models_token";
pub(crate) const STRONGHOLD_STORE_KEY_OPENAI_COMPAT_API_KEY: &str = "ai_openai_compat_api_key";
pub(crate) const STRONGHOLD_STORE_KEY_OPENAI_COMPAT_CONFIG_JSON: &str =
    "ai_openai_compat_config_json";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ProviderApiKeyId {
    OpenAi,
    Anthropic,
    Gemini,
    OllamaCloud,
    OpenAiCompat,
}

impl ProviderApiKeyId {
    pub fn as_str(self) -> &'static str {
        match self {
            ProviderApiKeyId::OpenAi => "openai",
            ProviderApiKeyId::Anthropic => "anthropic",
            ProviderApiKeyId::Gemini => "gemini",
            ProviderApiKeyId::OllamaCloud => "ollama_cloud",
            ProviderApiKeyId::OpenAiCompat => "openai_compat",
        }
    }

    fn store_key(self) -> &'static str {
        match self {
            ProviderApiKeyId::OpenAi => STRONGHOLD_STORE_KEY_OPENAI_API_KEY,
            ProviderApiKeyId::Anthropic => STRONGHOLD_STORE_KEY_ANTHROPIC_API_KEY,
            ProviderApiKeyId::Gemini => STRONGHOLD_STORE_KEY_GEMINI_API_KEY,
            ProviderApiKeyId::OllamaCloud => STRONGHOLD_STORE_KEY_OLLAMA_CLOUD_API_KEY,
            ProviderApiKeyId::OpenAiCompat => STRONGHOLD_STORE_KEY_OPENAI_COMPAT_API_KEY,
        }
    }
}

pub fn provider_api_key_id_from_str(id: &str) -> Option<ProviderApiKeyId> {
    match id {
        "openai" => Some(ProviderApiKeyId::OpenAi),
        "anthropic" => Some(ProviderApiKeyId::Anthropic),
        "gemini" => Some(ProviderApiKeyId::Gemini),
        "ollama_cloud" => Some(ProviderApiKeyId::OllamaCloud),
        "openai_compat" => Some(ProviderApiKeyId::OpenAiCompat),
        _ => None,
    }
}

pub fn provider_api_key_presence_from_secret_bytes(
    openai: Option<&[u8]>,
    anthropic: Option<&[u8]>,
    gemini: Option<&[u8]>,
    ollama_cloud: Option<&[u8]>,
    openai_compat: Option<&[u8]>,
) -> ProviderApiKeyPresence {
    fn present(value: Option<&[u8]>) -> bool {
        value
            .map(|bytes| !String::from_utf8_lossy(bytes).trim().is_empty())
            .unwrap_or(false)
    }

    ProviderApiKeyPresence {
        openai: present(openai),
        anthropic: present(anthropic),
        gemini: present(gemini),
        ollama_cloud: present(ollama_cloud),
        openai_compat: present(openai_compat),
    }
}

pub fn stronghold_provider_api_key_presence(
    stronghold: &tauri_plugin_stronghold::stronghold::Stronghold,
) -> Result<ProviderApiKeyPresence, AppLockError> {
    let client = match stronghold.load_client(STRONGHOLD_CLIENT) {
        Ok(c) => c,
        Err(_) => return Ok(ProviderApiKeyPresence::default()),
    };
    let store = client.store();

    let openai = store
        .get(STRONGHOLD_STORE_KEY_OPENAI_API_KEY.as_bytes())
        .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
    let anthropic = store
        .get(STRONGHOLD_STORE_KEY_ANTHROPIC_API_KEY.as_bytes())
        .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
    let gemini = store
        .get(STRONGHOLD_STORE_KEY_GEMINI_API_KEY.as_bytes())
        .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
    let ollama_cloud = store
        .get(STRONGHOLD_STORE_KEY_OLLAMA_CLOUD_API_KEY.as_bytes())
        .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
    let openai_compat = store
        .get(STRONGHOLD_STORE_KEY_OPENAI_COMPAT_API_KEY.as_bytes())
        .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;

    Ok(provider_api_key_presence_from_secret_bytes(
        openai.as_deref(),
        anthropic.as_deref(),
        gemini.as_deref(),
        ollama_cloud.as_deref(),
        openai_compat.as_deref(),
    ))
}

pub fn stronghold_provider_settings_save(
    stronghold: &tauri_plugin_stronghold::stronghold::Stronghold,
    api_keys: &[(ProviderApiKeyId, String)],
    openai_compat_config_json: Option<&str>,
) -> Result<ProviderSettingsSaveResult, AppLockError> {
    let normalized_api_keys: Vec<(ProviderApiKeyId, &str)> = api_keys
        .iter()
        .filter_map(|(id, value)| {
            let trimmed = value.trim();
            if trimmed.is_empty() {
                None
            } else {
                Some((*id, trimmed))
            }
        })
        .collect();
    let normalized_config = openai_compat_config_json
        .map(str::trim)
        .filter(|value| !value.is_empty());

    if normalized_api_keys.is_empty() && normalized_config.is_none() {
        return Ok(ProviderSettingsSaveResult::default());
    }

    let client = stronghold
        .load_client(STRONGHOLD_CLIENT)
        .or_else(|_| stronghold.create_client(STRONGHOLD_CLIENT))
        .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
    let store = client.store();

    let mut result = ProviderSettingsSaveResult::default();
    for (id, value) in normalized_api_keys {
        store
            .insert(
                id.store_key().as_bytes().to_vec(),
                value.as_bytes().to_vec(),
                None,
            )
            .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
        result.saved_api_key_ids.push(id.as_str().to_string());
    }

    if let Some(config_json) = normalized_config {
        store
            .insert(
                STRONGHOLD_STORE_KEY_OPENAI_COMPAT_CONFIG_JSON
                    .as_bytes()
                    .to_vec(),
                config_json.as_bytes().to_vec(),
                None,
            )
            .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
        result.saved_open_ai_compat_config = true;
    }

    stronghold
        .save()
        .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
    Ok(result)
}
