use super::vault::{clear_vault_key, set_vault_key, VaultKeyState};
use crate::security;

#[tauri::command]
pub(crate) async fn lock_get_status(
    app: tauri::AppHandle,
) -> Result<security::AppLockStatus, security::AppLockError> {
    let vault_path = security::vault_path(&app)?;
    security::lock_get_status_with(&vault_path, &security::OsKeychain)
}

#[tauri::command]
pub(crate) async fn lock_first_run_set_password(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
    password: String,
) -> Result<(), security::AppLockError> {
    let path = security::vault_path(&app)?;
    let salt_path = security::stronghold_salt_path(&app)?;
    security::lock_first_run_set_password_with(&path, &salt_path, &password)?;
    set_vault_key(
        &key_state,
        security::stronghold_key_from_password(&password, &salt_path),
    );
    Ok(())
}

#[tauri::command]
pub(crate) async fn lock_first_run_set_device_key(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
) -> Result<(), security::AppLockError> {
    let path = security::vault_path(&app)?;
    let key = security::lock_first_run_set_device_key_with(&path, &security::OsKeychain)?;
    set_vault_key(&key_state, key);
    Ok(())
}

#[tauri::command]
pub(crate) async fn lock_unlock(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
    password: String,
) -> Result<(), security::AppLockError> {
    let path = security::vault_path(&app)?;
    let salt_path = security::stronghold_salt_path(&app)?;
    security::lock_unlock_with(&path, &salt_path, &password)?;
    set_vault_key(
        &key_state,
        security::stronghold_key_from_password(&password, &salt_path),
    );
    Ok(())
}

#[tauri::command]
pub(crate) async fn lock_set_startup_lock_enabled(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
    enabled: bool,
    password: Option<String>,
) -> Result<(), security::AppLockError> {
    let path = security::vault_path(&app)?;
    let salt_path = security::stronghold_salt_path(&app)?;
    security::lock_set_startup_lock_enabled_with(
        &path,
        &salt_path,
        enabled,
        password.as_deref(),
        &security::OsKeychain,
    )?;

    if let Some(pw) = password.as_deref() {
        set_vault_key(
            &key_state,
            security::stronghold_key_from_password(pw, &salt_path),
        );
    }
    Ok(())
}

#[tauri::command]
pub(crate) async fn lock_reset_tracer(
    app: tauri::AppHandle,
    key_state: tauri::State<'_, VaultKeyState>,
) -> Result<(), security::AppLockError> {
    let vault_path = security::vault_path(&app)?;
    let sqlite_paths = security::possible_sqlite_paths(&app)?;
    clear_vault_key(&key_state);
    security::lock_reset_tracer_with(&vault_path, &sqlite_paths, &security::OsKeychain)
}
