use super::AppLockError;
use argon2::{password_hash::SaltString, Argon2, PasswordHash, PasswordHasher, PasswordVerifier};
use rand_core::OsRng;

pub fn hash_password(password: &str) -> Result<String, AppLockError> {
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    let hash = argon2
        .hash_password(password.as_bytes(), &salt)
        .map_err(|e| AppLockError::new("hash", e.to_string()))?
        .to_string();
    Ok(hash)
}

pub fn verify_password(password: &str, stored: &str) -> Result<bool, AppLockError> {
    let parsed = PasswordHash::new(stored).map_err(|e| AppLockError::new("hash", e.to_string()))?;
    let argon2 = Argon2::default();
    Ok(argon2.verify_password(password.as_bytes(), &parsed).is_ok())
}
