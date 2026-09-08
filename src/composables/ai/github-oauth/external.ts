import { invoke } from '@tauri-apps/api/core'
import { isTracerTestMode } from '../test-mode'
import { hasTauriRuntime } from '../../tauri'

export async function openExternal(url: string): Promise<void> {
  if (isTracerTestMode()) return
  if (!hasTauriRuntime()) {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:') throw new Error('Only secure external links are supported.')
    window.open(parsed.href, '_blank', 'noopener,noreferrer')
    return
  }
  await invoke('open_external', { url })
}
