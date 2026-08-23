<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="classes"
    @click="emit('click', $event)"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    :type="type"
    :class="classes"
    :disabled="disabled || busy"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  to?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'dark' | 'white' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  disabled?: boolean
  busy?: boolean
}>(), {
  type: 'button',
  variant: 'dark',
  size: 'md',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-lg border font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950',
  props.size === 'sm' ? 'min-h-9 px-3 py-1.5 text-sm' : '',
  props.size === 'md' ? 'min-h-10 px-4 py-2 text-sm' : '',
  props.size === 'lg' ? 'min-h-12 px-5 py-3 text-base' : '',
  props.block ? 'w-full' : '',
  props.variant === 'dark'
    ? 'border-slate-950 bg-slate-950 text-white hover:bg-slate-800 focus-visible:ring-slate-500 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200'
    : '',
  props.variant === 'white'
    ? 'border-slate-300 bg-white text-slate-950 hover:bg-slate-50 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900'
    : '',
  props.variant === 'danger'
    ? 'border-red-600 bg-white text-red-700 hover:bg-red-50 focus-visible:ring-red-500 dark:border-red-500 dark:bg-slate-950 dark:text-red-300 dark:hover:bg-red-950/30'
    : '',
])
</script>
