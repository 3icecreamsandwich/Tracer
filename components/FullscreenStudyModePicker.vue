<template>
  <nav class="fullscreen-modes" :aria-label="t('set.studyModes')">
    <button v-for="item in modes" :key="item.mode" type="button" :aria-current="item.mode === mode ? 'page' : undefined" :class="{ active: item.mode === mode }" @click="selectMode(item.mode)">{{ item.label }}</button>
  </nav>
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

<style scoped>
.fullscreen-modes { display:flex; gap:4px; padding:4px; border-radius:9999px; background:var(--ui-bg-elevated); overflow:auto; max-width:min(55vw, 32rem); }
.fullscreen-modes button { min-height:36px; padding:6px 12px; border-radius:9999px; white-space:nowrap; font-size:0.875rem; font-weight:600; }
.fullscreen-modes button.active { background:var(--ui-primary); color:var(--ui-bg); }
</style>
