use super::{
    get_password_verifier, obfuscate_bytes_for_keychain, set_password_verifier, verify_password,
    AppLockError, AppLockStatus, Keychain,
};
use std::path::{Path, PathBuf};
use tauri_plugin_stronghold::{kdf::KeyDerivation, stronghold::Stronghold};

pub fn stronghold_key_from_password(password: &str, salt_path: &Path) -> Vec<u8> {
    KeyDerivation::argon2(password, salt_path)
}

pub fn keychain_marker_from_password(password: &str, salt_path: &Path) -> String {
    obfuscate_bytes_for_keychain(&stronghold_key_from_password(password, salt_path))
}

pub fn lock_get_status_with(
    vault_path: &Path,
    keychain: &dyn Keychain,
) -> Result<AppLockStatus, AppLockError> {
    let has_vault = vault_path.exists();
    let can_auto_unlock = keychain.get_app_password()?.is_some();
    Ok(AppLockStatus {
        has_verifier: has_vault,
        requires_unlock: has_vault && !can_auto_unlock,
        can_auto_unlock,
    })
}

pub fn lock_first_run_set_password_with(
    vault_path: &Path,
    salt_path: &Path,
    password: &str,
) -> Result<(), AppLockError> {
    if password.trim().len() < 8 {
        return Err(AppLockError::new(
            "invalid_password",
            "Password must be at least 8 characters",
        ));
    }

    let sh = Stronghold::new(
        vault_path,
        stronghold_key_from_password(password, salt_path),
    )
    .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
    set_password_verifier(&sh, password)?;
    Ok(())
}

pub fn lock_unlock_with(
    vault_path: &Path,
    salt_path: &Path,
    password: &str,
) -> Result<(), AppLockError> {
    if !vault_path.exists() {
        return Err(AppLockError::new(
            "not_initialized",
            "App lock not initialized",
        ));
    }

    let sh = Stronghold::new(
        vault_path,
        stronghold_key_from_password(password, salt_path),
    )
    .map_err(|_| AppLockError::new("wrong_password", "Wrong password"))?;

    let verifier = get_password_verifier(&sh)?
        .ok_or_else(|| AppLockError::new("not_initialized", "App lock not initialized"))?;

    let ok = verify_password(password, &verifier)?;
    if !ok {
        return Err(AppLockError::new("wrong_password", "Wrong password"));
    }

    Ok(())
}

pub fn lock_set_startup_lock_enabled_with(
    vault_path: &Path,
    salt_path: &Path,
    enabled: bool,
    password: Option<&str>,
    keychain: &dyn Keychain,
) -> Result<(), AppLockError> {
    if enabled {
        keychain.delete_app_password()?;
        return Ok(());
    }

    let pw = password.ok_or_else(|| AppLockError::new("password_required", "Password required"))?;
    lock_unlock_with(vault_path, salt_path, pw)?;
    keychain.set_app_password(&keychain_marker_from_password(pw, salt_path))?;
    Ok(())
}

pub fn lock_reset_tracer_with(
    vault_path: &Path,
    sqlite_paths: &[PathBuf],
    keychain: &dyn Keychain,
) -> Result<(), AppLockError> {
    keychain.delete_app_password()?;
    remove_vault_file(vault_path)?;

    for db_path in sqlite_paths {
        if db_path.exists() {
            std::fs::remove_file(db_path).map_err(|e| AppLockError::new("io", e.to_string()))?;
        }
    }
    Ok(())
}

pub fn remove_vault_file(path: &Path) -> Result<(), AppLockError> {
    if path.exists() {
        std::fs::remove_file(path).map_err(|e| AppLockError::new("io", e.to_string()))?;
    }
    Ok(())
}
