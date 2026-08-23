import { afterEach, describe, expect, it, vi } from 'vitest'

import { applyAppLanguage, languageInit, useAppLanguage } from '../../src/composables/language'
import { languageOptions, messages } from '../../src/i18n/messages'

describe('app language', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    applyAppLanguage('en')
  })

  it('offers the requested locales with native names', () => {
    expect(languageOptions.map((option) => option.code)).toEqual([
      'en', 'es', 'fr', 'zh-CN', 'hi', 'ar', 'de', 'ru', 'ja', 'ko'
    ])
    expect(languageOptions.every((option) => option.nativeName.trim().length > 0)).toBe(true)
  })

  it('preserves the Tracer brand and translates system labels', () => {
    applyAppLanguage('es')
    const { t } = useAppLanguage()
    expect(t('app.name')).toBe('Tracer')
    expect(t('settings.language')).toBe('Idioma')

    applyAppLanguage('ja')
    expect(t('settings.language')).toBe('言語')
  })

  it('translates screenshot-visible Hindi controls and generated metadata', () => {
    applyAppLanguage('hi')
    const { t, translateAppGeneratedText } = useAppLanguage()

    for (const key of [
      'set.flashcardInstructions',
      'set.matchInstructions',
      'set.fullscreen',
      'common.restart',
      'set.termLabel',
      'set.definitionLabel',
      'create.themeHint',
      'create.generatedSetPlaceholder',
      'create.chooseFiles',
      'settings.advanced',
      'settings.apiKeySet',
    ]) {
      expect(t(key)).not.toBe(messages.en[key])
    }

    expect(translateAppGeneratedText('Synthesized from: MATH 400 2.4, MATH 400 3.2'))
      .toBe('इनसे सिंथेसाइज़ किया गया: MATH 400 2.4, MATH 400 3.2')
    expect(translateAppGeneratedText('User-written description')).toBe('User-written description')
  })

  it('applies right-to-left direction only for Arabic', () => {
    const documentElement = { lang: '', dir: '' }
    vi.stubGlobal('document', { documentElement })

    applyAppLanguage('ar')
    expect(documentElement).toEqual({ lang: 'ar', dir: 'rtl' })

    applyAppLanguage('ko')
    expect(documentElement).toEqual({ lang: 'ko', dir: 'ltr' })
  })

  it('applies English document metadata for a fresh session', async () => {
    const documentElement = { lang: '', dir: '' }
    vi.stubGlobal('document', { documentElement })
    vi.stubGlobal('window', {
      localStorage: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
      },
    })

    await languageInit()

    expect(documentElement).toEqual({ lang: 'en', dir: 'ltr' })
  })

  it('keeps every locale aligned with the English message catalog', () => {
    const requiredKeys = Object.keys(messages.en).filter((key) => key !== 'app.name')
    for (const option of languageOptions) {
      if (option.code === 'en') continue
      expect(Object.keys(messages[option.code])).toEqual(expect.arrayContaining(requiredKeys))
    }
  })

  it('distinguishes the global set-and-guide search from set-only search', () => {
    for (const option of languageOptions) {
      const localeMessages = messages[option.code]
      expect(localeMessages['nav.searchPlaceholder']).toBeTruthy()
      expect(localeMessages['create.searchSetsPlaceholder']).toBeTruthy()
      expect(localeMessages['nav.searchPlaceholder']).not.toBe(
        localeMessages['create.searchSetsPlaceholder']
      )
    }
  })

  it('resolves the already-assigned classroom label in every locale', () => {
    const expected = {
      en: 'Already assigned', es: 'Ya asignado', fr: 'Déjà attribué', 'zh-CN': '已分配',
      hi: 'पहले से असाइन किया गया', ar: 'تم تعيينها بالفعل', de: 'Bereits zugewiesen',
      ru: 'Уже назначено', ja: '割り当て済み', ko: '이미 배정됨',
    } as const
    const { t } = useAppLanguage()
    for (const option of languageOptions) {
      applyAppLanguage(option.code)
      expect(t('classroom.alreadyAssigned')).toBe(expected[option.code])
    }
  })
})
