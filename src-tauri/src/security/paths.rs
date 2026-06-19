use super::AppLockError;
use std::path::PathBuf;
use tauri::Manager;

pub fn vault_path(app: &tauri::AppHandle) -> Result<PathBuf, AppLockError> {
    let dir = app
        .path()
        .app_local_data_dir()
        .map_err(|e| AppLockError::new("path", e.to_string()))?;
    Ok(dir.join("vault.hold"))
}

pub fn stronghold_salt_path(app: &tauri::AppHandle) -> Result<PathBuf, AppLockError> {
    let dir = app
        .path()
        .app_local_data_dir()
        .map_err(|e| AppLockError::new("path", e.to_string()))?;
    Ok(dir.join("stronghold_salt.txt"))
}

pub fn possible_sqlite_paths(app: &tauri::AppHandle) -> Result<Vec<PathBuf>, AppLockError> {
    let mut out = Vec::new();

    let config_dir = app
        .path()
        .app_config_dir()
        .map_err(|e| AppLockError::new("path", e.to_string()))?;
    out.push(config_dir.join("tracer.db"));

    let data_dir = app
        .path()
        .app_data_dir()
        .map_err(|e| AppLockError::new("path", e.to_string()))?;
    out.push(data_dir.join("tracer.db"));

    let local_data_dir = app
        .path()
        .app_local_data_dir()
        .map_err(|e| AppLockError::new("path", e.to_string()))?;
    out.push(local_data_dir.join("tracer.db"));

    Ok(out)
}
