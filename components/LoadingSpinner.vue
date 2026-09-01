<template>
  <span
    :class="containerClass"
    role="status"
    :aria-label="showLabel ? undefined : resolvedLabel"
  >
    <span
      aria-hidden="true"
      class="loading-spinner__motion block shrink-0"
      :class="sizeClass"
    >
      <svg viewBox="0 0 24 24" class="block h-full w-full" fill="none">
        <circle
          cx="12"
          cy="12"
          r="9"
          class="stroke-orange-500/45 dark:stroke-orange-400/55"
          stroke-width="3"
        />
        <path
          d="M12 3a9 9 0 0 1 9 9"
          class="stroke-red-600 dark:stroke-red-400"
          stroke-linecap="round"
          stroke-width="3"
        />
      </svg>
    </span>
    <span v-if="showLabel">{{ resolvedLabel }}</span>
  </span>
</template>

<script setup lang="ts">
import { useAppLanguage } from '~/src/composables/language'

const props = withDefaults(defineProps<{
  label?: string
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  centered?: boolean
  screen?: boolean
}>(), {
  label: undefined,
  showLabel: true,
  size: 'md',
  centered: false,
  screen: false,
})

const { t } = useAppLanguage()

const resolvedLabel = computed(() => props.label ?? t('common.loading'))
const containerClass = computed(() => {
  if (props.screen) {
    return 'flex min-h-[calc(100vh-8.75rem)] w-full flex-col items-center justify-center gap-4 text-center text-base text-slate-700 dark:text-slate-200'
  }
  if (props.centered) {
    return 'flex min-h-32 w-full flex-col items-center justify-center gap-3 text-center text-sm text-slate-700 dark:text-slate-200'
  }
  if (props.showLabel) return 'inline-flex flex-col items-center justify-center gap-2 text-center'
  return 'inline-flex items-center justify-center'
})
const sizeClass = computed(() => ({
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
}[props.screen || props.centered ? 'lg' : props.size]))
</script>

<style scoped>
.loading-spinner__motion {
  animation: tracer-spinner-rotate 0.8s linear infinite;
  transform: translate3d(0, 0, 0);
  transform-origin: center;
  will-change: transform;
}

@keyframes tracer-spinner-rotate {
  to {
    transform: translate3d(0, 0, 0) rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .loading-spinner__motion {
    animation-duration: 1.6s;
  }
}
</style>
