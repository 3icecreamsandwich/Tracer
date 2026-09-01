<template>
  <main>
    <div class="mx-auto max-w-3xl p-8">
      <div class="flex items-start justify-between gap-4 text-slate-950 dark:text-white">
        <div>
          <h1 class="text-2xl font-semibold">{{ t('studyGuide.title') }}</h1>
          <div v-if="setTitle && setId" class="mt-2 flex flex-wrap items-center gap-1 text-sm text-slate-950 dark:text-white">
            <span>{{ linkedToLabel }}</span>
            <NuxtLink
              :to="`/set/${setId}`"
              data-testid="linked-set-link"
              class="inline-flex items-center gap-1 rounded-md bg-orange-50 px-2 py-1 font-medium text-orange-700 underline decoration-orange-400 decoration-1 underline-offset-2 transition hover:bg-orange-100 hover:text-orange-800 focus-visible:bg-orange-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 dark:bg-orange-950/25 dark:text-orange-300 dark:hover:bg-orange-950/45"
            >
              {{ setTitle }}
            </NuxtLink>
          </div>
        </div>

        <NuxtLink
          :to="setId ? `/set/${setId}` : '/'"
          class="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-950 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900 dark:focus-visible:ring-offset-slate-950"
        >
          {{ t('studyGuide.goToSet') }}
          <svg aria-hidden="true" viewBox="0 0 20 20" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 4h5v5M9 11l7-7M16 11v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4" /></svg>
        </NuxtLink>
      </div>

      <div
        v-if="isWebPreview"
        class="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 shadow-sm dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100"
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

        <div
          v-else
          class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        >
          <MarkdownRenderer :markdown="displayMarkdown" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { lockGetStatus } from '~/src/composables/lock'
import { useLockSession } from '~/src/composables/lock-session'
import { createProfileRepo, createSettingsRepo, createSetsRepo, createStudyGuidesRepo, useTracerDb } from '~/src/composables/db'
import type { Uuid } from '~/src/composables/db/types'
import { hasTauriRuntime } from '~/src/composables/tauri'
import MarkdownRenderer from '~/components/MarkdownRenderer.vue'
import { useAppLanguage } from '~/src/composables/language'

const router = useRouter()
const route = useRoute()
const { unlockedThisSession, markLocked, markUnlocked } = useLockSession()
const { t } = useAppLanguage()

const hasTauriInternals = hasTauriRuntime()

const isWebPreview = computed(() => !hasTauriInternals)

const busy = ref(true)
const loadError = ref<string | null>(null)
const markdown = ref('')
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
    const db = await useTracerDb()
    const [guide, linkedSet] = await Promise.all([
      createStudyGuidesRepo(db).getBySetId(setId),
      createSetsRepo(db).get(setId)
    ])
    if (!guide) {
      markdown.value = ''
      loadError.value = 'Study guide not found.'
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

onMounted(async () => {
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
