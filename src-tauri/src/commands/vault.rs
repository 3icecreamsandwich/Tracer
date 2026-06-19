use crate::security;
use crate::security::Keychain;
use std::sync::Mutex;

#[derive(Debug, Default)]
pub(crate) struct VaultKeyState(Mutex<Option<Vec<u8>>>);

pub(crate) fn set_vault_key(state: &tauri::State<'_, VaultKeyState>, key: Vec<u8>) {
    *state.0.lock().expect("vault key mutex") = Some(key);
}

pub(crate) fn clear_vault_key(state: &tauri::State<'_, VaultKeyState>) {
    *state.0.lock().expect("vault key mutex") = None;
}

fn get_vault_key_from_state(state: &tauri::State<'_, VaultKeyState>) -> Option<Vec<u8>> {
    state.0.lock().expect("vault key mutex").clone()
}

pub(crate) fn open_unlocked_stronghold(
    app: &tauri::AppHandle,
    key_state: &tauri::State<'_, VaultKeyState>,
) -> Result<tauri_plugin_stronghold::stronghold::Stronghold, security::AppLockError> {
    let vault_path = security::vault_path(app)?;
    if !vault_path.exists() {
        return Err(security::AppLockError::new(
            "not_initialized",
            "App lock not initialized",
        ));
    }

    let key = if let Some(k) = get_vault_key_from_state(key_state) {
        k
    } else {
        let marker = security::OsKeychain
            .get_app_password()?
            .ok_or_else(|| security::AppLockError::new("vault_locked", "Your vault is locked"))?;
        security::deobfuscate_bytes_from_keychain(&marker)?
    };

    tauri_plugin_stronghold::stronghold::Stronghold::new(&vault_path, key)
        .map_err(|e| security::AppLockError::new("stronghold", e.to_string()))
}
