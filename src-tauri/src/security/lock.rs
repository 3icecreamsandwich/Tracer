use super::{
    device_key_marker, get_password_verifier, keychain_vault_mode, password_key_marker,
    set_password_verifier, stronghold_store_set, verify_password, AppLockError, AppLockStatus,
    Keychain,
};
use rand_core::{OsRng, RngCore};
use std::path::{Path, PathBuf};
use tauri_plugin_stronghold::{kdf::KeyDerivation, stronghold::Stronghold};

pub fn stronghold_key_from_password(password: &str, salt_path: &Path) -> Vec<u8> {
    KeyDerivation::argon2(password, salt_path)
}

pub fn keychain_marker_from_password(password: &str, salt_path: &Path) -> String {
    password_key_marker(&stronghold_key_from_password(password, salt_path))
}

pub fn lock_get_status_with(
    vault_path: &Path,
    keychain: &dyn Keychain,
) -> Result<AppLockStatus, AppLockError> {
    let has_vault = vault_path.exists();
    let keychain_marker = keychain.get_app_password()?;
    let can_auto_unlock = keychain_marker.is_some();
    Ok(AppLockStatus {
        has_verifier: has_vault,
        requires_unlock: has_vault && !can_auto_unlock,
        can_auto_unlock,
        vault_mode: keychain_marker
            .as_deref()
            .map(keychain_vault_mode)
            .map(str::to_owned),
    })
}

pub fn lock_first_run_set_device_key_with(
    vault_path: &Path,
    keychain: &dyn Keychain,
) -> Result<Vec<u8>, AppLockError> {
    if vault_path.exists() {
        if let Some(marker) = keychain.get_app_password()? {
            if keychain_vault_mode(&marker) == "device_key" {
                let key = super::deobfuscate_bytes_from_keychain(&marker)?;
                Stronghold::new(vault_path, key.clone()).map_err(|_| {
                    AppLockError::new("keychain", "The saved device key cannot open the vault")
                })?;
                return Ok(key);
            }
        }
        return Err(AppLockError::new(
            "already_initialized",
            "App lock is already initialized",
        ));
    }

    let mut key = vec![0_u8; 32];
    OsRng.fill_bytes(&mut key);
    let initialize = || -> Result<(), AppLockError> {
        let sh = Stronghold::new(vault_path, key.clone())
            .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
        stronghold_store_set(&sh, "vault_mode", "device_key")?;
        keychain.set_app_password(&device_key_marker(&key))
    };

    if let Err(error) = initialize() {
        let _ = remove_vault_file(vault_path);
        let _ = keychain.delete_app_password();
        return Err(error);
    }

    Ok(key)
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

    let key = stronghold_key_from_password(password, salt_path);
    if vault_path.exists() {
        let sh = Stronghold::new(vault_path, key).map_err(|_| {
            AppLockError::new("already_initialized", "App lock is already initialized")
        })?;
        let verifier = get_password_verifier(&sh)?.ok_or_else(|| {
            AppLockError::new("already_initialized", "App lock is already initialized")
        })?;
        if verify_password(password, &verifier)? {
            return Ok(());
        }
        return Err(AppLockError::new(
            "already_initialized",
            "App lock is already initialized",
        ));
    }

    let initialize = || -> Result<(), AppLockError> {
        let sh = Stronghold::new(vault_path, key)
            .map_err(|e| AppLockError::new("stronghold", e.to_string()))?;
        set_password_verifier(&sh, password)
    };
    if let Err(error) = initialize() {
        let _ = remove_vault_file(vault_path);
        return Err(error);
    }
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
        if keychain
            .get_app_password()?
            .as_deref()
            .map(keychain_vault_mode)
            == Some("device_key")
        {
            return Err(AppLockError::new(
                "device_key_required",
                "Google device-key vaults cannot require a local password",
            ));
        }
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
        for path in [
            db_path.clone(),
            PathBuf::from(format!("{}-wal", db_path.display())),
            PathBuf::from(format!("{}-shm", db_path.display())),
            PathBuf::from(format!("{}-journal", db_path.display())),
        ] {
            if path.exists() {
                std::fs::remove_file(path).map_err(|e| AppLockError::new("io", e.to_string()))?;
            }
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
