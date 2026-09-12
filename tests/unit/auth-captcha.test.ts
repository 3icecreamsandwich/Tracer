import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { describe, expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '../..')
const read = (path: string) => readFileSync(resolve(root, path), 'utf8')

describe('desktop authentication CAPTCHA hardening', () => {
  it('passes CAPTCHA tokens to every protected Supabase email-auth request', () => {
    const account = read('src/composables/auth/account.ts')

    expect(account).toMatch(/signUpWithEmail[\s\S]*captchaToken: input\.captchaToken/)
    expect(account).toMatch(/resendVerification[\s\S]*options: \{ emailRedirectTo: callbackUrl\(listener\.port\), captchaToken \}/)
    expect(account).toMatch(/signInWithEmail[\s\S]*signInWithPassword\([\s\S]*options: \{ captchaToken \}/)
  })

  it('keeps the private Turnstile secret out of all desktop client configuration', () => {
    const clientFiles = [
      '.env.example',
      'README.md',
      'pages/first-run.vue',
      'components/TurnstileWidget.vue',
      '.github/workflows/windows-build.yml',
      '.github/workflows/macos-build.yml',
      '.github/workflows/linux-build.yml',
    ].map(read).join('\n')

    expect(clientFiles).toContain('VITE_TURNSTILE_SITE_KEY')
    expect(clientFiles).not.toMatch(/VITE_TURNSTILE_SECRET|TURNSTILE_SECRET_KEY\s*[:=]/)
  })

  it('allows only the Cloudflare challenge resources needed by the desktop WebView', () => {
    const config = JSON.parse(read('src-tauri/tauri.conf.json'))
    const csp = config.app.security.csp

    expect(csp['script-src']).toContain('https://challenges.cloudflare.com')
    expect(csp['frame-src']).toContain('https://challenges.cloudflare.com')
    expect(csp['frame-src']).toContain('about:')
  })
})
