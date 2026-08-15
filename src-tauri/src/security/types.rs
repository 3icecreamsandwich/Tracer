use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct AppLockStatus {
    pub has_verifier: bool,
    pub requires_unlock: bool,
    pub can_auto_unlock: bool,
    pub vault_mode: Option<String>,
}

#[derive(Debug, Serialize, PartialEq, Eq, Default)]
pub struct ProviderApiKeyPresence {
    pub openai: bool,
    pub anthropic: bool,
    pub gemini: bool,
    pub openai_compat: bool,
}

#[derive(Debug, Serialize, PartialEq, Eq, Default)]
#[serde(rename_all = "camelCase")]
pub struct ProviderSettingsSaveResult {
    pub saved_api_key_ids: Vec<String>,
    pub saved_open_ai_compat_config: bool,
}
