mod error;
mod keychain;
mod lock;
mod password;
mod paths;
mod provider_keys;
mod store;
mod types;

pub use error::AppLockError;
pub use keychain::{
    deobfuscate_bytes_from_keychain, obfuscate_bytes_for_keychain, Keychain, OsKeychain,
};
pub use lock::{
    lock_first_run_set_password_with, lock_get_status_with, lock_reset_tracer_with,
    lock_set_startup_lock_enabled_with, lock_unlock_with, stronghold_key_from_password,
};
pub use password::{hash_password, verify_password};
pub use paths::{possible_sqlite_paths, stronghold_salt_path, vault_path};
pub use provider_keys::{
    provider_api_key_id_from_str, stronghold_provider_api_key_presence,
    stronghold_provider_settings_save, ProviderApiKeyId,
};
pub(crate) use provider_keys::{
    STRONGHOLD_STORE_KEY_ANTHROPIC_API_KEY, STRONGHOLD_STORE_KEY_GEMINI_API_KEY,
    STRONGHOLD_STORE_KEY_GITHUB_MODELS_TOKEN, STRONGHOLD_STORE_KEY_OPENAI_API_KEY,
    STRONGHOLD_STORE_KEY_OPENAI_COMPAT_API_KEY, STRONGHOLD_STORE_KEY_OPENAI_COMPAT_CONFIG_JSON,
};
pub use store::{
    get_password_verifier, set_password_verifier, stronghold_store_delete_if_present,
    stronghold_store_get, stronghold_store_set,
};
pub use types::{AppLockStatus, ProviderApiKeyPresence, ProviderSettingsSaveResult};

#[cfg(test)]
pub use lock::keychain_marker_from_password;
#[cfg(test)]
pub use provider_keys::provider_api_key_presence_from_secret_bytes;

#[cfg(test)]
mod tests {
    use super::*;
    use std::sync::{Mutex, MutexGuard};

    struct InMemoryKeychain {
        value: Mutex<Option<String>>,
    }

    impl InMemoryKeychain {
        fn new() -> Self {
            Self {
                value: Mutex::new(None),
            }
        }

        fn lock(&self) -> MutexGuard<'_, Option<String>> {
            self.value.lock().expect("mutex poisoned")
        }
    }

    impl Keychain for InMemoryKeychain {
        fn get_app_password(&self) -> Result<Option<String>, AppLockError> {
            Ok(self.lock().clone())
        }

        fn set_app_password(&self, password: &str) -> Result<(), AppLockError> {
            *self.lock() = Some(password.to_string());
            Ok(())
        }

        fn delete_app_password(&self) -> Result<(), AppLockError> {
            *self.lock() = None;
            Ok(())
        }
    }

    fn assert_err_code(err: AppLockError, expected: &str) {
        assert_eq!(err.code, expected, "unexpected error: {err:?}");
    }

    #[test]
    fn provider_api_key_presence_from_secret_bytes_trims_values() {
        let presence = provider_api_key_presence_from_secret_bytes(
            Some(b"sk-openai"),
            Some(b"   "),
            None,
            Some(b"compat-key\n"),
        );

        assert_eq!(
            presence,
            ProviderApiKeyPresence {
                openai: true,
                anthropic: false,
                gemini: false,
                openai_compat: true,
            }
        );
    }

    #[test]
    fn provider_api_key_id_from_str_maps_known_providers() {
        assert_eq!(
            provider_api_key_id_from_str("openai").map(ProviderApiKeyId::as_str),
            Some("openai")
        );
        assert_eq!(
            provider_api_key_id_from_str("anthropic").map(ProviderApiKeyId::as_str),
            Some("anthropic")
        );
        assert_eq!(
            provider_api_key_id_from_str("gemini").map(ProviderApiKeyId::as_str),
            Some("gemini")
        );
        assert_eq!(
            provider_api_key_id_from_str("openai_compat").map(ProviderApiKeyId::as_str),
            Some("openai_compat")
        );
        assert_eq!(provider_api_key_id_from_str("github"), None);
    }

    #[test]
    fn lock_flow_end_to_end_without_os_keychain() {
        let dir = tempfile::tempdir().expect("tempdir");
        let vault_path = dir.path().join("vault.hold");
        let salt_path = dir.path().join("stronghold_salt.txt");
        let sqlite_path = dir.path().join("tracer.db");
        let kc = InMemoryKeychain::new();

        let pw = "correct horse battery staple";
        lock_first_run_set_password_with(&vault_path, &salt_path, pw).expect("first run set pw");

        let sh = tauri_plugin_stronghold::stronghold::Stronghold::new(
            &vault_path,
            stronghold_key_from_password(pw, &salt_path),
        )
        .expect("open stronghold");
        let verifier = get_password_verifier(&sh)
            .expect("read verifier")
            .expect("verifier missing");
        assert!(verify_password(pw, &verifier).expect("verify hash"));

        let err = lock_unlock_with(&vault_path, &salt_path, "wrong password").unwrap_err();
        assert_err_code(err, "wrong_password");
        lock_unlock_with(&vault_path, &salt_path, pw).expect("unlock ok");

        lock_set_startup_lock_enabled_with(&vault_path, &salt_path, false, Some(pw), &kc)
            .expect("disable startup lock");
        let expected_marker = keychain_marker_from_password(pw, &salt_path);
        assert_eq!(
            kc.get_app_password().unwrap().as_deref(),
            Some(expected_marker.as_str())
        );
        let status = lock_get_status_with(&vault_path, &kc).expect("status");
        assert!(status.can_auto_unlock);
        assert!(!status.requires_unlock);

        lock_set_startup_lock_enabled_with(&vault_path, &salt_path, true, None, &kc)
            .expect("enable startup lock");
        assert!(kc.get_app_password().unwrap().is_none());
        let status = lock_get_status_with(&vault_path, &kc).expect("status after enable");
        assert!(status.requires_unlock);

        std::fs::write(&sqlite_path, b"not a real sqlite db").expect("write sqlite");
        assert!(vault_path.exists());
        assert!(sqlite_path.exists());
        kc.set_app_password("marker").unwrap();

        lock_reset_tracer_with(&vault_path, &[sqlite_path.clone()], &kc).expect("reset tracer");
        assert!(!vault_path.exists());
        assert!(!sqlite_path.exists());
        assert!(kc.get_app_password().unwrap().is_none());
    }
}
