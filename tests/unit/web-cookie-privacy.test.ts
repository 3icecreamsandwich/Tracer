import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const read = (path: string) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8')

describe('hosted web cookie disclosure', () => {
  it('documents the actual necessary sign-in cookie instead of claiming optional tracking consent', () => {
    const privacy = read('../../pages/privacy.vue')
    const terms = read('../../pages/terms.vue')

    expect(privacy).toContain('short-lived, strictly necessary, HTTP-only cookie')
    expect(privacy).toContain('no more than 90 seconds')
    expect(privacy).toContain('advertising, marketing, or session-replay cookie system')
    expect(terms).toContain('advertising, marketing, or session-replay cookies')
  })

  it('keeps the handoff cookie short-lived, secure, HTTP-only, strict, and narrowly scoped', () => {
    const handoff = read('../../server/api/web/auth/handoff.post.ts')
    const cookie = read('../../server/utils/web-auth-handoff.ts')

    expect(handoff).toContain('httpOnly: true')
    expect(handoff).toContain('secure: true')
    expect(handoff).toContain("sameSite: 'strict'")
    expect(handoff).toContain('maxAge: 90')
    expect(handoff).toContain('path: WEB_AUTH_HANDOFF_COOKIE_PATH')
    expect(cookie).toContain("WEB_AUTH_HANDOFF_COOKIE_PATH = '/api/web/auth/handoff/consume'")
  })
})
