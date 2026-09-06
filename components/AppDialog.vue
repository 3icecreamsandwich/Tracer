<template>
  <BaseModal v-bind="$props" @close="$emit('close')"><slot /></BaseModal>
</template>
<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
  description?: string
  closeLabel: string
  busy?: boolean
  role?: 'dialog' | 'alertdialog'
}>()
defineEmits<{ close: [] }>()
</script>
