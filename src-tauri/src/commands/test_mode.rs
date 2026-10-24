use std::sync::atomic::{AtomicBool, Ordering};

#[derive(Default)]
pub(crate) struct TestModeExitState {
    active: AtomicBool,
    allow_exit: AtomicBool,
}

impl TestModeExitState {
    pub(crate) fn should_confirm_exit(&self) -> bool {
        self.active.load(Ordering::SeqCst) && !self.allow_exit.load(Ordering::SeqCst)
    }
}

#[tauri::command]
pub(crate) fn test_mode_set_active(state: tauri::State<'_, TestModeExitState>, active: bool) {
    state.active.store(active, Ordering::SeqCst);
    if !active {
        state.allow_exit.store(false, Ordering::SeqCst);
    }
}

#[tauri::command]
pub(crate) fn test_mode_confirm_exit(
    app: tauri::AppHandle,
    state: tauri::State<'_, TestModeExitState>,
) {
    state.allow_exit.store(true, Ordering::SeqCst);
    app.exit(0);
}

#[tauri::command]
pub(crate) fn updater_preflight(
    window: tauri::WebviewWindow,
    state: tauri::State<'_, TestModeExitState>,
) -> Result<bool, String> {
    if state.should_confirm_exit() {
        return Err("Finish or leave your active test before updating.".into());
    }

    let url = window.url().map_err(|error| error.to_string())?;

    if url.path().trim_end_matches('/') != "/settings" {
        return Err("Open Settings before installing the update.".into());
    }

    Ok(cfg!(target_os = "windows"))
}
