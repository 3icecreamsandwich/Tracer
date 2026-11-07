<template>
  <AppDialog
    :open="open"
    :title="t('classroom.addClass')"
    title-class="text-3xl font-semibold"
    :close-label="t('common.close')"
    :busy="busy"
    @close="emit('close')"
  >
    <form @submit.prevent="submit">
      <label class="block">
        <span class="text-sm font-medium">{{ t('classroom.classCode') }}</span>
        <UInput
          v-model="code"
          data-autofocus
          required
          maxlength="20"
          autocomplete="off"
          autocapitalize="characters"
          spellcheck="false"
          class="w-full mt-1.5"
          :placeholder="t('classroom.codePlaceholder')"
        />
      </label>
      <p v-if="error" class="mt-3 text-sm text-red-700 dark:text-red-300" role="alert">
        {{ error }}
      </p>
      <div class="mt-5 flex flex-wrap justify-end gap-2">
        <AppButton variant="white" :disabled="busy" @click="emit('close')">
          {{ t('common.cancel') }}
        </AppButton>
        <AppButton type="submit" :busy="busy">
          {{ t('classroom.joinClass') }}
        </AppButton>
      </div>
    </form>
  </AppDialog>
</template>

<script setup lang="ts">
import { useAppLanguage } from '~/src/composables/language'

const props = defineProps<{
  open: boolean
  busy?: boolean
  error?: string | null
}>()
const emit = defineEmits<{
  close: []
  submit: [code: string]
}>()
const { t } = useAppLanguage()
const code = ref('')

watch(() => props.open, (open) => {
  if (open) code.value = ''
})

function submit() {
  if (props.busy || !code.value.trim()) return
  emit('submit', code.value)
}
</script>
