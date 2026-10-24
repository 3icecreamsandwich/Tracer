import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

function source(path: string) {
  return readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8')
}

describe('streamlined non-settings copy', () => {
  it('removes explanatory descriptions and enlarges their headings', () => {
    const home = source('../../pages/index.vue')
    const basic = source('../../pages/create/basic.vue')
    const generate = source('../../pages/create/generate.vue')
    const synthesize = source('../../pages/create/synthesize.vue')
    const edit = source('../../pages/set/[id]/edit/index.vue')
    const destination = source('../../components/HomeDestinationLink.vue')

    expect(home).not.toMatch(/home\.(?:subtitle|chooseMode|basicHint|synthesizeHint|generateHint)/)
    expect(home).toContain('id="home-sets" class="text-3xl font-semibold"')
    expect(home).toContain('id="home-create" class="text-3xl font-semibold"')
    expect(basic).not.toContain("t('create.basicDescription')")
    expect(generate).not.toContain("t('create.generateDescription')")
    expect(synthesize).not.toMatch(/create\.(?:synthesizeDescription|themeHint)/)
    expect(edit).not.toContain('Update the title, description, and cards in this set.')
    expect(destination).not.toContain('description')
  })

  it('keeps settings descriptions and essential destructive confirmations', () => {
    const settings = source('../../pages/settings.vue')
    const manage = source('../../pages/teacher/classes/[id]/manage.vue')
    const edit = source('../../pages/set/[id]/edit/index.vue')

    expect(settings).toMatch(/t\(\s*(['"])settings\.deleteAccountDescription\1\s*\)/)
    expect(manage).toContain("t('classroom.removeStudentConfirmation'")
    expect(manage).toContain("t('classroom.removeMaterialConfirmation'")
    expect(edit).toContain('This deletes the set and its study guide from your account on all devices.')
  })
})
