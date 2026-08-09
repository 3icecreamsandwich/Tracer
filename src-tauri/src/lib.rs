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
        Migration {
            version: 5,
            description: "add_linked_folders",
            sql: include_str!("../migrations/005_linked_folders.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 6,
            description: "add_set_icons",
            sql: include_str!("../migrations/006_set_icons.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 7,
            description: "add_folder_order",
            sql: include_str!("../migrations/007_folder_order.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 8,
            description: "add_set_icon_tone",
            sql: include_str!("../migrations/008_set_icon_tone.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 9,
            description: "add_text_scale_setting",
            sql: include_str!("../migrations/009_text_scale.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 10,
            description: "add_home_library_order",
            sql: include_str!("../migrations/010_home_library_order.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 11,
            description: "expand_text_scale_range",
            sql: include_str!("../migrations/011_expand_text_scale.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 12,
            description: "add_flashcard_autosave",
            sql: include_str!("../migrations/012_flashcard_autosave.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 13,
            description: "add_flashcard_score_autosave",
            sql: include_str!("../migrations/013_flashcard_score_autosave.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 14,
            description: "add_practice_autosave",
            sql: include_str!("../migrations/014_practice_autosave.sql"),
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
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_persisted_scope::init())
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
