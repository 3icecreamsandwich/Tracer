import { getIdentifier } from '@tauri-apps/api/app'
import { hasTauriRuntime } from '~/src/composables/tauri'
import { lockFirstRunSetPassword, lockGetStatus } from '~/src/composables/lock'
import { useTracerDb, createProfileRepo, createSettingsRepo } from '~/src/composables/db'
import { createLocalSetsRepo } from '~/src/composables/db/repos/sets.repo'
import { useLockSession } from '~/src/composables/lock-session'

export default defineNuxtPlugin(async nuxt => {
  if (!hasTauriRuntime() || await getIdentifier() !== 'com.tracer.ai-reliability-test') {
    throw new Error('The AI fixture requires an isolated native test app identifier.')
  }
  if (!(await lockGetStatus()).has_verifier) await lockFirstRunSetPassword('disposable-fixture-password')
  const db = await useTracerDb()
  await createProfileRepo(db).set({ name: 'AI Reliability Test', email: 'fixture@example.invalid' })
  await createSettingsRepo(db).set({ startupLockEnabled: false, automaticUpdatesEnabled: false,
    defaultModelId: 'ollama_cloud:gpt-oss:20b', fallbackModelIds: ['gemini:gemini-3.7-flash'] })
  const sets = createLocalSetsRepo(db)
  const id = '00000000-0000-4000-8000-000000000088'
  if (!await sets.get(id)) await sets.create({ id, title: 'AI reliability fixture', terms: [{ id: 't1', front: 'Water', back: 'H2O' }] })
  useLockSession().markUnlocked()
  nuxt.hook('app:mounted', () => {
    const toolbar = document.createElement('nav')
    toolbar.setAttribute('aria-label', 'AI test scenarios')
    toolbar.style.cssText = 'position:fixed;top:48px;left:280px;z-index:9999;background:#fff;color:#000;border:2px solid #333;padding:8px;display:flex;gap:12px'
    for (const scenario of ['recover', 'empty', 'error', 'partial']) {
      const button = document.createElement('button')
      button.textContent = `Fixture: ${scenario}`
      button.onclick = () => { localStorage.setItem('ai-fixture-scenario', scenario); button.focus() }
      toolbar.append(button)
    }
    for (const [name, path] of [['Settings', '/settings'], ['Chat', `/set/${id}?mode=chat`], ['Edit', `/set/${id}/edit`]]) {
      const link = document.createElement('a'); link.textContent = `Test ${name}`; link.href = path!; toolbar.append(link)
    }
    document.body.append(toolbar)
  })
})
