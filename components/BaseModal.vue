<template>
  <UModal @after:leave="releaseOrphanedScrollLock" :open="open" :title="title" :description="description" :dismissible="!busy" :close="false" :ui="{ content: panelClass ?? 'sm:max-w-xl', header: 'relative', title: [titleClass ?? 'text-xl font-semibold', 'pe-12'] }" @update:open="value => { if (!value && !busy) emit('close') }">
    <template #actions><UButton class="absolute right-4 top-4" color="neutral" variant="ghost" :aria-label="closeLabel" :disabled="busy" @click="emit('close')"><AppIcon name="close" /></UButton></template>
    <template #body><div :role="role === 'alertdialog' ? 'alertdialog' : undefined"><slot /></div></template>
  </UModal>
</template>
<script setup lang="ts">
import { registerModal, unregisterModal, releaseOrphanedScrollLock } from '~/src/composables/modal-stack'
const props = defineProps<{
  open: boolean
  panelClass?: string
  title?: string
  titleClass?: string
  role?: 'dialog' | 'alertdialog'
  description?: string
  closeLabel: string
  busy?: boolean
}>()
const emit = defineEmits<{ close: [] }>()
const modalId = Symbol('modal')
watch(() => props.open, open => open ? registerModal(modalId) : unregisterModal(modalId), { immediate: true })
onBeforeUnmount(() => unregisterModal(modalId))
</script>
