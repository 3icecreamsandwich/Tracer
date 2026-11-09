<template>
  <main>
    <div class="tracer-page mx-auto max-w-6xl p-8">
      <div class="flex items-start justify-between gap-4 text-slate-950 dark:text-white">
        <div>
          <h1 class="text-2xl font-semibold">{{ t('studyGuide.title') }}</h1>
          <div v-if="setTitle && setId" class="mt-2 flex flex-wrap items-center gap-1 text-sm text-slate-950 dark:text-white">
            <span>{{ linkedToLabel }}</span>
            <NuxtLink
              :to="linkedSetUrl"
              data-testid="linked-set-link"
              class="inline-flex items-center gap-1 rounded-[var(--tracer-radius-control)] bg-orange-50 px-2 py-1 font-medium text-orange-700 underline decoration-orange-400 decoration-1 underline-offset-2 transition hover:bg-orange-100 hover:text-orange-800 focus-visible:bg-orange-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 dark:bg-orange-950/25 dark:text-orange-300 dark:hover:bg-orange-950/45"
            >
              {{ setTitle }}
            </NuxtLink>
          </div>
        </div>

        <NuxtLink
          :to="linkedSetUrl"
          class="inline-flex items-center gap-2 rounded-[var(--tracer-radius-control)] border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900 dark:focus-visible:ring-offset-slate-950"
        >
          {{ t('studyGuide.goToSet') }}
          <svg aria-hidden="true" viewBox="0 0 20 20" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 4h5v5M9 11l7-7M16 11v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4" /></svg>
        </NuxtLink>
      </div>

      <div
        v-if="isWebPreview"
        class="mt-4 rounded-[var(--tracer-radius-surface)] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 shadow-sm dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100"
        role="status"
        aria-live="polite"
      >
        {{ t('studyGuide.webPreviewNotice') }}
      </div>

      <div class="mt-6">
        <p v-if="loadError" class="text-sm text-red-700 dark:text-red-300">
          {{ loadError }}
        </p>

        <LoadingSpinner v-else-if="busy" screen />

        <div v-else-if="!displayMarkdown.trim()" class="flex min-h-[55vh] flex-col items-center justify-center gap-5 text-center">
          <StudyModeArtwork name="guide" :size="64" />
          <h2 class="text-3xl font-semibold">No study guide yet</h2>
          <p v-if="generateError" role="alert" class="text-sm text-red-600">{{ generateError }}</p>
          <AppButton :busy="generating" :disabled="generating" @click="generateGuide">{{ generating ? 'Generating…' : 'Generate one' }}</AppButton>
          <AppButton variant="white" :to="linkedSetUrl">Back to set</AppButton>
        </div>
        <div
          v-else
          class="rounded-[var(--tracer-radius-surface)] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        >
          <MarkdownRenderer :markdown="displayMarkdown" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { browserStorageKey, isWebPreviewRuntime } from "~/src/composables/platform/web";
import { getSupabaseClient, isSupabaseConfigured } from "~/src/composables/auth/client";
import { lockGetStatus } from '~/src/composables/lock'
import { useLockSession } from '~/src/composables/lock-session'
import { createProfileRepo, createSettingsRepo, createSetsRepo, createStudyGuidesRepo, useTracerDb } from '~/src/composables/db'
import type { Uuid } from '~/src/composables/db/types'
import MarkdownRenderer from '~/components/MarkdownRenderer.vue'
import { useAppLanguage } from '~/src/composables/language'
import { getPublishedSet } from '~/src/composables/published-sets'
import { syncPrivateSets } from '~/src/composables/private-set-sync'

const router = useRouter()
const route = useRoute()
const { unlockedThisSession, markLocked, markUnlocked } = useLockSession()
const { t } = useAppLanguage()

const isPublished = computed(() => route.query.published === '1')
const linkedSetUrl = computed(() => setId.value ? `${isPublished.value ? '/public-sets' : '/set'}/${setId.value}` : '/')

const isWebPreview = computed(() => !isPublished.value && (isWebPreviewRuntime() || route.params.setId === 'demo'))

const busy = ref(true)
const loadError = ref<string | null>(null)
const markdown = ref('')
const generating = ref(false), generateError = ref('')
const linkedSetTitle = ref('')
const setTitle = computed(() => isWebPreview.value ? t('demo.setTitle') : linkedSetTitle.value)
const linkedToLabel = computed(() => t('studyGuide.linkedTo', { title: '' }).trim())
const displayMarkdown = computed(() => {
  if (!isWebPreview.value) return markdown.value
  return [
    `# ${t('studyGuide.demoTitle')}`,
    '',
    t('studyGuide.demoIntro'),
    '',
    `- ${t('studyGuide.demoList')}`,
    `- ${t('studyGuide.demoCode')}`,
    '',
    `| ${t('studyGuide.demoTopic')} | ${t('studyGuide.demoStatus')} |`,
    '| --- | --- |',
    `| ${t('studyGuide.demoTables')} | ${t('studyGuide.demoRenderCorrectly')} |`,
    '',
    '```ts',
    'const demo = true',
    '```'
  ].join('\n')
})

const setId = computed(() => {
  const id = route.params.setId
  if (typeof id === 'string' && id.trim()) return id as Uuid
  return null
})

async function loadGuide(setId: Uuid) {
  busy.value = true
  loadError.value = null
  try {
    if (isPublished.value) {
      const published = await getPublishedSet(setId)
      linkedSetTitle.value = published.title
      markdown.value = published.study_guide_markdown ?? ''
      if (!markdown.value.trim()) { const key = await publicGuideCacheKey(setId); if (key) { try { markdown.value = localStorage.getItem(key) ?? '' } catch {} } }
      return
    }
    const db = await useTracerDb()
    let [guide, linkedSet] = await Promise.all([
      createStudyGuidesRepo(db).getBySetId(setId),
      createSetsRepo(db).get(setId)
    ])
    if (!guide && await syncPrivateSets().catch(() => false)) {
      ;[guide, linkedSet] = await Promise.all([
        createStudyGuidesRepo(db).getBySetId(setId), createSetsRepo(db).get(setId)
      ])
    }
    if (!guide) {
      markdown.value = ''
      linkedSetTitle.value = linkedSet?.title ?? ''
      return
    }
    linkedSetTitle.value = linkedSet?.title ?? ''
    markdown.value = guide.markdown
  } catch {
    loadError.value = 'Failed to load study guide.'
  } finally {
    busy.value = false
  }
}

async function publicGuideCacheKey(id: Uuid) {
  if (typeof window === 'undefined' || !isSupabaseConfigured()) return null
  try {
    const { data } = await getSupabaseClient().auth.getSession()
    return data.session?.user.id ? browserStorageKey(`public-guide:${data.session.user.id}:${id}`) : null
  } catch { return null }
}

async function generateGuide() {
  if (!setId.value || generating.value) return
  generating.value = true; generateError.value = ''
  try {
    const db = await useTracerDb()
    const source = isPublished.value ? await getPublishedSet(setId.value) : await createSetsRepo(db).get(setId.value)
    if (!source) throw new Error('Set not found.')
    const terms = source.terms.map(term => `${term.front}${term.frontImage?.altText ? ` [Image: ${term.frontImage.altText}]` : ''} — ${term.back}${term.backImage?.altText ? ` [Image: ${term.backImage.altText}]` : ''}`).join('\n')
    if (!terms.trim()) throw new Error('Add cards to this set first.')
    const prompt = `Create a clear, concise Markdown study guide based only on these flashcards. Organize related concepts and do not invent facts.\n\n${terms}`
    const settings = await createSettingsRepo(db).get()
    let result: string
    if (!settings.defaultModelId || settings.defaultModelId === 'builtin:auto') {
      result = await (await import('~/src/composables/ai/builtin/client')).builtinGenerate({ operation: 'chat', input: { messages: [{ role: 'user', content: prompt }], context: 'Create a study guide from the supplied set.', title: source.title, route: route.fullPath } })
    } else {
      const { resolveAiModel } = await import('~/src/composables/ai/registry')
      const { generateText } = await import('ai')
      result = (await generateText({ model: await resolveAiModel([settings.defaultModelId, ...settings.fallbackModelIds]), prompt })).text
    }
    if (!result.trim()) throw new Error('The model returned an empty study guide.')
    if (!isPublished.value) await createStudyGuidesRepo(db).create({ id: crypto.randomUUID() as Uuid, setId: setId.value, markdown: result })
    else { const key = await publicGuideCacheKey(setId.value); if (key) { try { localStorage.setItem(key, result) } catch {} } }
    markdown.value = result
  } catch (error) { generateError.value = error instanceof Error ? error.message : 'Could not generate a study guide.' }
  finally { generating.value = false }
}

onMounted(async () => {
  if (isPublished.value && setId.value) {
    await loadGuide(setId.value)
    return
  }
  if (isWebPreview.value) {
    busy.value = false
    return
  }

  try {
    const status = await lockGetStatus()
    const db = await useTracerDb()

    const profile = await createProfileRepo(db).get()
    if (!profile || !status.has_verifier) {
      markLocked()
      await router.replace('/first-run')
      return
    }

    const settings = await createSettingsRepo(db).get()
    if (settings.startupLockEnabled && status.requires_unlock) {
      if (!unlockedThisSession.value) {
        markLocked()
        await router.replace('/unlock')
        return
      }
    } else if (status.can_auto_unlock) {
      markUnlocked()
    }

    if (!setId.value) {
      busy.value = false
      loadError.value = 'Missing set id.'
      return
    }

    await loadGuide(setId.value)
  } catch {
    markLocked()
    await router.replace('/unlock')
  }
})
</script>
