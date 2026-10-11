<template>
  <div ref="root" class="relative justify-self-center">
    <button
      type="button"
      class="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-base font-semibold text-slate-950 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-white dark:hover:bg-slate-900 sm:gap-1.5 sm:px-2.5 sm:text-xl"
      :aria-label="`${currentLabel} · ${t('set.studyModes')}`"
      :aria-expanded="open"
      aria-haspopup="menu"
      @click="open = !open"
      @keydown.esc="open = false"
    >
      <span>{{ currentLabel }}</span>
      <svg aria-hidden="true" viewBox="0 0 20 20" class="h-4 w-4 transition-transform" :class="open ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m4 7 6 6 6-6" />
      </svg>
    </button>

    <div
      v-if="open"
      class="absolute left-1/2 top-full z-50 mt-2 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30"
      role="menu"
      :aria-label="t('set.studyModes')"
    >
      <button
        v-for="item in modes"
        :key="item.mode"
        type="button"
        role="menuitemradio"
        :aria-checked="item.mode === mode"
        :aria-label="item.label"
        :title="item.label"
        class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
        :class="item.mode === mode
          ? 'border-amber-400 bg-amber-50 shadow-sm dark:border-amber-700 dark:bg-amber-950/30'
          : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/60 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-amber-800 dark:hover:bg-amber-950/20'"
        @click="selectMode(item.mode)"
      >
        <img v-if="item.icon" :src="item.icon" alt="" class="h-9 w-9 object-contain" aria-hidden="true" />
        <svg v-else aria-hidden="true" viewBox="0 0 24 24" class="h-9 w-9 text-amber-600 dark:text-amber-300" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 3.5h10a2 2 0 0 1 2 2v15H5v-15a2 2 0 0 1 2-2Z" />
          <path d="M9 8h6M9 12h6M9 16h3" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import flashcardsIcon from '~/assets/icons/study-modes/flashcards.png'
import matchIcon from '~/assets/icons/study-modes/match.png'
import practiceIcon from '~/assets/icons/study-modes/practice.png'
import { useAppLanguage } from '~/src/composables/language'

export type FullscreenStudyMode = 'flashcards' | 'learn' | 'match' | 'test'

const props = defineProps<{ mode: FullscreenStudyMode }>()
const emit = defineEmits<{ select: [path: string] }>()
const route = useRoute()
const router = useRouter()
const { t } = useAppLanguage()
const open = ref(false)
const root = ref<HTMLElement | null>(null)

const modes = computed(() => [
  { mode: 'flashcards' as const, label: t('set.flashcards'), icon: flashcardsIcon },
  { mode: 'learn' as const, label: t('set.learn'), icon: practiceIcon },
  { mode: 'match' as const, label: t('set.match'), icon: matchIcon },
  { mode: 'test' as const, label: t('classroom.testMode'), icon: null },
])
const currentLabel = computed(() => modes.value.find(item => item.mode === props.mode)?.label ?? '')

function modePath(mode: FullscreenStudyMode) {
  const id = encodeURIComponent(String(route.params.id ?? ''))
  return { path: `/set/${id}-${mode}`, query: { ...route.query } }
}

function selectMode(mode: FullscreenStudyMode) {
  open.value = false
  if (mode === props.mode) return
  emit('select', router.resolve(modePath(mode)).fullPath)
}

function onPointerDown(event: PointerEvent) {
  if (event.target instanceof Node && root.value?.contains(event.target)) return
  open.value = false
}

onMounted(() => document.addEventListener('pointerdown', onPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown))
</script>
