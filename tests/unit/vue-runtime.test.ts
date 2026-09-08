import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'

const require = createRequire(import.meta.url)
const appVue = require('vue') as typeof import('vue')

describe('Vue runtime consistency', () => {
  for (const dependency of ['nuxt', '@nuxt/nitro-server']) {
    it(`renders app slots with the runtime resolved by ${dependency}`, () => {
      const frameworkVue = createRequire(require.resolve(`${dependency}/package.json`))('vue') as typeof import('vue')
      // Different copies have separate currentRenderingInstance state. A slot
      // compiled against one copy crashes when the other copy renders it.
      const renderer = frameworkVue.createRenderer({
        createElement: () => ({}),
        createText: () => ({}),
        createComment: () => ({}),
        insert: () => {},
        remove: () => {},
        setText: () => {},
        setElementText: () => {},
        parentNode: () => null,
        nextSibling: () => null,
        patchProp: () => {},
      })
      const app = renderer.createApp({
        render() {
          return appVue.renderSlot({ default: () => [appVue.h('span', 'Ready')] }, 'default')
        },
      })
      expect(() => app.mount({})).not.toThrow()
      expect(frameworkVue.renderSlot).toBe(appVue.renderSlot)
    })
  }
})
