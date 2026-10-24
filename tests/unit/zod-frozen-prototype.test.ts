import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

describe('Zod compatibility with Tauri prototype protection', () => {
  for (const mode of ['esm', 'commonjs']) {
    it(`loads and validates through ${mode} with Object.prototype frozen`, () => {
      const load = mode === 'esm' ? "await import('zod/v3')" : "createRequire(import.meta.url)('zod/v3')"
      const script = `
        import { createRequire } from 'node:module';
        Object.freeze(Object.prototype);
        const { z } = ${load};
        const schema = z.object({ title: z.string().min(1, { message: 'Title required' }) });
        if (!schema.safeParse({ title: 'Set' }).success) throw new Error('Valid input rejected');
        const invalid = schema.safeParse({ title: '' });
        if (invalid.success || invalid.error.issues[0].message !== 'Title required') throw new Error('Validation message lost');
        if (!Object.isFrozen(Object.prototype)) throw new Error('Protection disabled');
        console.log('ok');
      `
      expect(execFileSync(process.execPath, ['--input-type=module', '-e', script], { encoding: 'utf8' }).trim()).toBe('ok')
    })
  }
})
