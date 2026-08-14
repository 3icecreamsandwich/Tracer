mod commands;
mod security;

use commands::{
    ai_openai_compat_get_config, ai_openai_compat_set_config, ai_provider_api_key_presence,
    ai_provider_settings_save, ai_secrets_delete, ai_secrets_get, ai_secrets_set,
    auth_session_delete, auth_session_get, auth_session_set, github_oauth_pkce_cancel,
    github_oauth_pkce_finish, github_oauth_pkce_start, lock_first_run_set_password,
    lock_get_status, lock_reset_tracer, lock_set_startup_lock_enabled, lock_unlock,
    oauth_callback_cancel, oauth_callback_finish, oauth_callback_start, open_external,
    test_mode_confirm_exit, test_mode_set_active, OAuthCallbackState, TestModeExitState,
    VaultKeyState,
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    use tauri::{Emitter, Manager};
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
        Migration {
            version: 15,
            description: "add_floating_chat_preference",
            sql: include_str!("../migrations/015_floating_chat.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 16,
            description: "bind_profile_to_supabase_user",
            sql: include_str!("../migrations/016_profile_supabase_user.sql"),
            kind: MigrationKind::Up,
        },
    ];

    let app = tauri::Builder::default()
        .menu(|app_handle| {
            let menu = tauri::menu::Menu::default(app_handle)?;

            #[cfg(target_os = "macos")]
            if let Some(tauri::menu::MenuItemKind::Submenu(app_menu)) =
                menu.items()?.into_iter().next()
            {
                let quit_position = app_menu.items()?.iter().position(|item| {
                    item.as_predefined_menuitem()
                        .and_then(|item| item.text().ok())
                        .is_some_and(|text| text.starts_with("Quit "))
                });

                if let Some(position) = quit_position {
                    app_menu.remove_at(position)?;
                    app_menu.insert(
                        &tauri::menu::MenuItem::with_id(
                            app_handle,
                            "tracer-quit",
                            format!("Quit {}", app_handle.package_info().name),
                            true,
                            Some("CmdOrCtrl+Q"),
                        )?,
                        position,
                    )?;
                }
            }

            Ok(menu)
        })
        .on_menu_event(|app_handle, event| {
            if event.id() != "tracer-quit" {
                return;
            }

            let state = app_handle.state::<TestModeExitState>();
            if state.should_confirm_exit() {
                let _ = app_handle.emit("tracer://test-quit-requested", ());
            } else {
                app_handle.exit(0);
            }
        })
        .setup(|app| {
            let salt_path = app
                .path()
                .app_local_data_dir()
                .expect("could not resolve app local data path")
                .join("stronghold_salt.txt");
            app.handle()
                .plugin(tauri_plugin_stronghold::Builder::with_argon2(&salt_path).build())?;

            app.manage(VaultKeyState::default());
            app.manage(OAuthCallbackState::default());
            app.manage(TestModeExitState::default());
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
            auth_session_get,
            auth_session_set,
            auth_session_delete,
            ai_provider_api_key_presence,
            ai_provider_settings_save,
            ai_openai_compat_get_config,
            ai_openai_compat_set_config,
            open_external,
            github_oauth_pkce_start,
            github_oauth_pkce_finish,
            github_oauth_pkce_cancel,
            oauth_callback_start,
            oauth_callback_finish,
            oauth_callback_cancel,
            test_mode_set_active,
            test_mode_confirm_exit
        ])
        .build(tauri::generate_context!())
        .expect("error while building tauri application");

    app.run(|app_handle, event| {
        if let tauri::RunEvent::ExitRequested { api, .. } = event {
            let state = app_handle.state::<TestModeExitState>();
            let current_url = app_handle
                .get_webview_window("main")
                .and_then(|window| window.url().ok());
            let test_route_is_open = current_url.as_ref().is_some_and(|url| {
                url.path().starts_with("/set/") && url.path().ends_with("-test")
            });

            if state.should_confirm_exit() || test_route_is_open {
                api.prevent_exit();
                let _ = app_handle.emit("tracer://test-quit-requested", ());
            }
        }
    });
}
