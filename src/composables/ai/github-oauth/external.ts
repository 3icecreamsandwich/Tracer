import { invoke } from '@tauri-apps/api/core'
import { isTracerTestMode } from '../test-mode'

export async function openExternal(url: string): Promise<void> {
  if (isTracerTestMode()) return
  await invoke('open_external', { url })
}
