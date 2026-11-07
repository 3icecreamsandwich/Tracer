<template>
  <UButton :to="to" :type="type" :color="variant === 'danger' ? 'error' : 'primary'" :variant="variant === 'dark' ? 'solid' : 'soft'" :size="size === 'md' ? 'md' : size" :block="block" :disabled="disabled" :loading="busy" @click="emit('click', $event)"><slot /></UButton>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
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

</script>
