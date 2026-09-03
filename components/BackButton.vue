<template>
  <button
    type="button"
    :disabled="isDisabled"
    class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-sm font-medium text-slate-900 shadow-lg shadow-slate-900/5 backdrop-blur transition-[margin,background-color] hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950/85 dark:text-slate-50 dark:shadow-black/25 dark:hover:bg-slate-950"
    :class="{ 'ml-14': needsMacWindowControlsOffset }"
    @click="onBack"
  >
    <CreateChevron :direction="language === 'ar' ? 'right' : 'left'" />
    <span>{{ props.label ?? t('common.back') }}</span>
  </button>
</template>

<script setup lang="ts">
import { getCurrentWindow } from '@tauri-apps/api/window'
import type { UnlistenFn } from '@tauri-apps/api/event'
import { navigateBack } from '~/src/composables/navigation/app-navigation'
import { useAppLanguage } from '~/src/composables/language'
import { hasTauriRuntime } from '~/src/composables/tauri'

const props = withDefaults(
  defineProps<{
    nativeWindowControlsSafe?: boolean
    label?: string
    preventNavigation?: boolean
  }>(),
  {
    nativeWindowControlsSafe: false,
    label: undefined,
    preventNavigation: false,
  },
)

const emit = defineEmits<{
  activate: []
}>()

const router = useRouter()
const route = useRoute()
const { language, t } = useAppLanguage()
const needsMacWindowControlsOffset = ref(false)
let unlistenResize: UnlistenFn | null = null

const isDisabled = computed(() => {
  const path = route.path
  // Disable back button on homepage
  return path === '/'
})

function onBack() {
  if (props.preventNavigation) {
    emit('activate')
    return
  }
  navigateBack(router, route.path, window.history.state)
}

function isMacPlatform() {
  if (typeof navigator === 'undefined') return false
  const platform = navigator.platform.toLowerCase()
  const userAgent = navigator.userAgent.toLowerCase()
  return platform.includes('mac') || userAgent.includes('mac os')
}

async function refreshWindowControlsOffset() {
  if (!props.nativeWindowControlsSafe || !hasTauriRuntime() || !isMacPlatform()) {
    needsMacWindowControlsOffset.value = false
    return
  }

  try {
    needsMacWindowControlsOffset.value = !(await getCurrentWindow().isFullscreen())
  } catch {
    needsMacWindowControlsOffset.value = false
  }
}

onMounted(async () => {
  await refreshWindowControlsOffset()
  if (!props.nativeWindowControlsSafe || !hasTauriRuntime()) return
  try {
    unlistenResize = await getCurrentWindow().onResized(() => {
      void refreshWindowControlsOffset()
    })
  } catch {}
})

onBeforeUnmount(() => {
  unlistenResize?.()
  unlistenResize = null
})
</script>
