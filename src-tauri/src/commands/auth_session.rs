use super::vault::{open_unlocked_stronghold, VaultKeyState};
use crate::security;

const SUPABASE_SESSION_KEY: &str = "auth.supabase.session";

#[tauri::command]
pub(crate) async fn auth_session_get(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
) -> Result<Option<String>, security::AppLockError> {
    let stronghold = open_unlocked_stronghold(&app, &key_state)?;
    security::stronghold_store_get(&stronghold, SUPABASE_SESSION_KEY)
}

#[tauri::command]
pub(crate) async fn auth_session_set(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
    session_json: String,
) -> Result<(), security::AppLockError> {
    let value = session_json.trim();
    if value.is_empty() || value.len() > 32_768 {
        return Err(security::AppLockError::new(
            "invalid_session",
            "Authentication session is invalid",
        ));
    }
    let stronghold = open_unlocked_stronghold(&app, &key_state)?;
    security::stronghold_store_set(&stronghold, SUPABASE_SESSION_KEY, value)
}

#[tauri::command]
pub(crate) async fn auth_session_delete(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
) -> Result<(), security::AppLockError> {
    let stronghold = open_unlocked_stronghold(&app, &key_state)?;
    security::stronghold_store_delete_if_present(&stronghold, SUPABASE_SESSION_KEY)
}
