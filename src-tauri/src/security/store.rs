use super::{hash_password, AppLockError};

pub(super) const STRONGHOLD_CLIENT: &str = "tracer";
const STRONGHOLD_STORE_KEY_VERIFIER: &str = "app_password_verifier";

pub fn stronghold_store_set(
    stronghold: &tauri_plugin_stronghold::stronghold::Stronghold,
    key: &str,
    value: &str,
) -> Result<(), AppLockError> {
    if value.trim().is_empty() {
        return stronghold_store_delete(stronghold, key);
    }
    let client = stronghold
        .load_client(STRONGHOLD_CLIENT)
        .or_else(|_| stronghold.create_client(STRONGHOLD_CLIENT))
        .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
    let store = client.store();
    store
        .insert(key.as_bytes().to_vec(), value.as_bytes().to_vec(), None)
        .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
    stronghold
        .save()
        .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
    Ok(())
}

pub fn stronghold_store_delete_if_present(
    stronghold: &tauri_plugin_stronghold::stronghold::Stronghold,
    key: &str,
) -> Result<(), AppLockError> {
    stronghold_store_delete(stronghold, key)
}

pub fn stronghold_store_delete(
    stronghold: &tauri_plugin_stronghold::stronghold::Stronghold,
    key: &str,
) -> Result<(), AppLockError> {
    let client = match stronghold.load_client(STRONGHOLD_CLIENT) {
        Ok(c) => c,
        Err(_) => return Ok(()),
    };
    let store = client.store();
    store
        .delete(key.as_bytes())
        .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
    stronghold
        .save()
        .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
    Ok(())
}

pub fn stronghold_store_get(
    stronghold: &tauri_plugin_stronghold::stronghold::Stronghold,
    key: &str,
) -> Result<Option<String>, AppLockError> {
    let client = match stronghold.load_client(STRONGHOLD_CLIENT) {
        Ok(c) => c,
        Err(_) => return Ok(None),
    };
    let store = client.store();
    let value = store
        .get(key.as_bytes())
        .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
    Ok(value.map(|v| String::from_utf8_lossy(&v).to_string()))
}

pub fn set_password_verifier(
    stronghold: &tauri_plugin_stronghold::stronghold::Stronghold,
    password: &str,
) -> Result<(), AppLockError> {
    let verifier = hash_password(password)?;
    stronghold_store_set(stronghold, STRONGHOLD_STORE_KEY_VERIFIER, &verifier)
}

pub fn get_password_verifier(
    stronghold: &tauri_plugin_stronghold::stronghold::Stronghold,
) -> Result<Option<String>, AppLockError> {
    stronghold_store_get(stronghold, STRONGHOLD_STORE_KEY_VERIFIER)
}
