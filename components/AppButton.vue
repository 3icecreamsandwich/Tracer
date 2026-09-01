<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="classes"
    @click="emit('click', $event)"
  >
    <LoadingSpinner v-if="busy" size="sm" :show-label="false" />
    <slot />
  </NuxtLink>
  <button
    v-else
    :type="type"
    :class="classes"
    :disabled="disabled || busy"
    @click="emit('click', $event)"
  >
    <LoadingSpinner v-if="busy" size="sm" :show-label="false" />
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
  'tracer-button',
  props.size === 'sm' ? 'tracer-button--sm' : '',
  props.size === 'md' ? 'tracer-button--md' : '',
  props.size === 'lg' ? 'tracer-button--lg' : '',
  props.variant === 'dark' ? 'tracer-button--dark' : '',
  props.variant === 'white' ? 'tracer-button--white' : '',
  props.variant === 'danger' ? 'tracer-button--danger' : '',
  props.block ? 'tracer-button--block' : '',
])
</script>
