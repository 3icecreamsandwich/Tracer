use super::AppLockError;
use keyring::Entry;

const KEYRING_SERVICE: &str = "tracer";
const KEYRING_ACCOUNT_APP_PASSWORD: &str = "app_password";
const DEVICE_KEY_PREFIX: &str = "device_key:";
const PASSWORD_KEY_PREFIX: &str = "password:";

fn bytes_to_hex(bytes: &[u8]) -> String {
    const LUT: &[u8; 16] = b"0123456789abcdef";
    let mut out = String::with_capacity(bytes.len() * 2);
    for b in bytes {
        out.push(LUT[(b >> 4) as usize] as char);
        out.push(LUT[(b & 0x0f) as usize] as char);
    }
    out
}

fn hex_to_bytes(hex: &str) -> Result<Vec<u8>, AppLockError> {
    let s = hex.trim();
    if s.len() % 2 != 0 {
        return Err(AppLockError::new("keychain", "Invalid keychain marker"));
    }
    let mut out = Vec::with_capacity(s.len() / 2);
    let bytes = s.as_bytes();
    let mut i = 0;
    while i < bytes.len() {
        let hi = (bytes[i] as char).to_digit(16);
        let lo = (bytes[i + 1] as char).to_digit(16);
        match (hi, lo) {
            (Some(h), Some(l)) => out.push(((h << 4) | l) as u8),
            _ => return Err(AppLockError::new("keychain", "Invalid keychain marker")),
        }
        i += 2;
    }
    Ok(out)
}

pub fn deobfuscate_bytes_from_keychain(hex: &str) -> Result<Vec<u8>, AppLockError> {
    let value = hex
        .strip_prefix(DEVICE_KEY_PREFIX)
        .or_else(|| hex.strip_prefix(PASSWORD_KEY_PREFIX))
        .unwrap_or(hex);
    hex_to_bytes(value)
}

pub fn device_key_marker(bytes: &[u8]) -> String {
    format!("{DEVICE_KEY_PREFIX}{}", bytes_to_hex(bytes))
}

pub fn password_key_marker(bytes: &[u8]) -> String {
    format!("{PASSWORD_KEY_PREFIX}{}", bytes_to_hex(bytes))
}

pub fn keychain_vault_mode(marker: &str) -> &'static str {
    if marker.starts_with(DEVICE_KEY_PREFIX) {
        "device_key"
    } else {
        "password"
    }
}

fn keyring_entry() -> Result<Entry, AppLockError> {
    Entry::new(KEYRING_SERVICE, KEYRING_ACCOUNT_APP_PASSWORD)
        .map_err(|e| AppLockError::new("keychain", e.to_string()))
}

pub trait Keychain {
    fn get_app_password(&self) -> Result<Option<String>, AppLockError>;
    fn set_app_password(&self, password: &str) -> Result<(), AppLockError>;
    fn delete_app_password(&self) -> Result<(), AppLockError>;
}

pub struct OsKeychain;

impl Keychain for OsKeychain {
    fn get_app_password(&self) -> Result<Option<String>, AppLockError> {
        keychain_get_app_password()
    }

    fn set_app_password(&self, password: &str) -> Result<(), AppLockError> {
        keychain_set_app_password(password)
    }

    fn delete_app_password(&self) -> Result<(), AppLockError> {
        keychain_delete_app_password()
    }
}

pub fn keychain_get_app_password() -> Result<Option<String>, AppLockError> {
    let entry = keyring_entry()?;
    match entry.get_password() {
        Ok(v) => Ok(Some(v)),
        Err(keyring::Error::NoEntry) => Ok(None),
        Err(e) => Err(AppLockError::new("keychain", e.to_string())),
    }
}

pub fn keychain_set_app_password(password: &str) -> Result<(), AppLockError> {
    let entry = keyring_entry()?;
    entry
        .set_password(password)
        .map_err(|e| AppLockError::new("keychain", e.to_string()))?;
    Ok(())
}

pub fn keychain_delete_app_password() -> Result<(), AppLockError> {
    let entry = keyring_entry()?;
    match entry.delete_credential() {
        Ok(()) => Ok(()),
        Err(keyring::Error::NoEntry) => Ok(()),
        Err(e) => Err(AppLockError::new("keychain", e.to_string())),
    }
}
