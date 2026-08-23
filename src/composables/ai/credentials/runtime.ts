import { hasTauriRuntime } from '../../tauri'

export const inMemorySecrets = new Map<string, string>()

export function hasTauriInternalsNow(): boolean {
  return hasTauriRuntime()
}
