mod commands;
mod security;

use commands::{
    ai_openai_compat_get_config, ai_openai_compat_set_config, ai_provider_api_key_presence,
    ai_provider_settings_save, ai_secrets_delete, ai_secrets_get, ai_secrets_set,
    github_oauth_pkce_cancel, github_oauth_pkce_finish, github_oauth_pkce_start,
    lock_first_run_set_password, lock_get_status, lock_reset_tracer, lock_set_startup_lock_enabled,
    lock_unlock, open_external, GithubPkceState, VaultKeyState,
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    use tauri::Manager;
    use tauri_plugin_sql::{Migration, MigrationKind};

    let migrations = vec![
        Migration {
            version: 1,
            description: "create_core_tables",
            sql: include_str!("../migrations/001_core.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "add_language_setting",
            sql: include_str!("../migrations/002_language.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "add_saved_chats",
            sql: include_str!("../migrations/003_chats.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "add_set_folders",
            sql: include_str!("../migrations/004_folders.sql"),
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .setup(|app| {
            let salt_path = app
                .path()
                .app_local_data_dir()
                .expect("could not resolve app local data path")
                .join("stronghold_salt.txt");
            app.handle()
                .plugin(tauri_plugin_stronghold::Builder::with_argon2(&salt_path).build())?;

            app.manage(VaultKeyState::default());
            app.manage(GithubPkceState::default());
            Ok(())
        })
        .plugin(tauri_plugin_http::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:tracer.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            lock_get_status,
            lock_first_run_set_password,
            lock_unlock,
            lock_set_startup_lock_enabled,
            lock_reset_tracer,
            ai_secrets_get,
            ai_secrets_set,
            ai_secrets_delete,
            ai_provider_api_key_presence,
            ai_provider_settings_save,
            ai_openai_compat_get_config,
            ai_openai_compat_set_config,
            open_external,
            github_oauth_pkce_start,
            github_oauth_pkce_finish,
            github_oauth_pkce_cancel
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}
