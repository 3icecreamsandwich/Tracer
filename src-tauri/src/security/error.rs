use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct AppLockError {
    pub code: String,
    pub message: String,
}

impl AppLockError {
    pub fn new(code: impl Into<String>, message: impl Into<String>) -> Self {
        Self {
            code: code.into(),
            message: message.into(),
        }
    }
}
