import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  setTestSessionCompleted,
  useTestSessionState,
} from '../../src/composables/test-session'

const appShellSource = readFileSync(
  fileURLToPath(new URL('../../components/AppShell.vue', import.meta.url)),
  'utf8',
)
const testModeSource = readFileSync(
  fileURLToPath(new URL('../../pages/set/[id]-test.vue', import.meta.url)),
  'utf8',
)

describe('floating page chat during tests', () => {
  it('tracks whether the current test has reached its results', () => {
    const { testSessionCompleted } = useTestSessionState()

    setTestSessionCompleted(true)
    expect(testSessionCompleted.value).toBe(true)

    setTestSessionCompleted(false)
    expect(testSessionCompleted.value).toBe(false)
  })

  it('suppresses chat until the test is submitted and resets on exit', () => {
    expect(appShellSource).toContain('isTestRoute.value && !testSessionCompleted.value')
    expect(testModeSource).toContain('setTestSessionCompleted(submitted)')
    expect(testModeSource).toContain('setTestSessionCompleted(false)')
  })
})
