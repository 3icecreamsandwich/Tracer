import { createSetsRepo, useTracerDb } from './db'
import { getPublishedSet } from './published-sets'

type PageRoute = {
  fullPath: string
  path: string
  params: Record<string, string | string[] | undefined>
  query: Record<string, string | string[] | undefined>
}

const STATIC_PAGE_TITLES: Record<string, string> = {
  '/': 'Library',
  '/accessibility': 'Accessibility Statement',
  '/contact': 'Contact',
  '/create/basic': 'Create Set',
  '/create/generate': 'Generate',
  '/create/synthesize': 'Synthesize',
  '/first-run': 'Welcome',
  '/parent-consent': 'Parent Consent',
  '/parent-consent-request': 'Parent Consent Request',
  '/privacy': 'Privacy Policy',
  '/public-sets': 'Explore Sets',
  '/settings': 'Settings',
  '/teacher': 'Teacher Dashboard',
  '/terms': 'Terms of Service',
  '/unlock': 'Unlock',
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export function getPageTitleFallback(path: string) {
  const exact = STATIC_PAGE_TITLES[path]
  if (exact) return exact
  if (/^\/teacher\/classes\/[^/]+\/manage$/.test(path)) return 'Manage Class'
  if (/^\/teacher\/classes\/[^/]+\/assign$/.test(path)) return 'Assign Material'
  if (/^\/teacher\/classes\/[^/]+$/.test(path)) return 'Class'
  if (/^\/student\/classes\/[^/]+$/.test(path)) return 'Class'
  if (/^\/study-guide\/[^/]+$/.test(path)) return 'Study Guide'
  if (/^\/public-sets\/[^/]+$/.test(path)) return 'Set'
  if (/^\/set\/[^/]+/.test(path)) return 'Set'
  return 'Tracer'
}

async function resolveSetTitle(route: PageRoute) {
  const publicSetId = /^\/public-sets\/[^/]+$/.test(route.path)
    ? firstParam(route.params.id)
    : undefined
  const setId = firstParam(route.params.setId) ?? firstParam(route.params.id)
  if (!setId) return null
  if (setId === 'demo') return 'Demo Set'

  if (publicSetId || route.query.published === '1') {
    return (await getPublishedSet(publicSetId ?? setId)).title
  }

  if (/^\/(?:set|study-guide)\//.test(route.path)) {
    const db = await useTracerDb()
    return (await createSetsRepo(db).get(setId))?.title ?? null
  }
  return null
}

export function installPageMetadata() {
  const route = useRoute()
  const title = ref(getPageTitleFallback(route.path))
  let resolution = 0

  useHead({
    title,
    titleTemplate: (pageTitle) => pageTitle && pageTitle !== 'Tracer'
      ? `Tracer | ${pageTitle}`
      : 'Tracer',
  })

  watch(
    () => route.fullPath,
    async () => {
      const currentResolution = ++resolution
      title.value = getPageTitleFallback(route.path)
      try {
        const setTitle = await resolveSetTitle(route as PageRoute)
        if (currentResolution === resolution && setTitle?.trim()) title.value = setTitle.trim()
      } catch {
        // Keep the useful route title if local or published set metadata is unavailable.
      }
    },
    { immediate: true },
  )
}
