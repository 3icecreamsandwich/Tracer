import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const home = readFileSync(new URL('../../pages/index.vue', import.meta.url), 'utf8')
const item = readFileSync(new URL('../../components/HomeLibraryItem.vue', import.meta.url), 'utf8')

describe('home library sizing', () => {
  it('uses flashcard density across tabs without a special guide width', () => {
    expect(home).toContain("item.kind === 'set' && itemMatchesQuery(item)).length >= 4")
    expect(item).not.toContain('w-[97.5%]')
    expect(home.match(/min-h-\[58px\] gap-3 px-4 py-2/g)).toHaveLength(2)
    expect(item).toContain('min-h-[58px] gap-3 px-4 py-2')
  })

  it('makes Add Class one-third width with rounded corners using the shared button style', () => {
    expect(home).toContain('variant="white" class="mx-auto flex w-1/3 !rounded-xl"')
  })
})
