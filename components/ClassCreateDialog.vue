<template>
  <AppDialog
    :open="open"
    :title="t('classroom.createClass')"
    :description="t('classroom.createDescription')"
    :close-label="t('common.close')"
    :busy="busy"
    @close="emit('close')"
  >
    <form class="space-y-4" @submit.prevent="submit">
      <label class="block">
        <span class="text-sm font-medium">{{ t('classroom.className') }}</span>
        <input
          v-model="name"
          data-autofocus
          required
          maxlength="120"
          autocomplete="off"
          class="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          :placeholder="t('classroom.classNamePlaceholder')"
        />
      </label>

      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block">
          <span class="text-sm font-medium">{{ t('classroom.subject') }}</span>
          <input
            v-model="subject"
            maxlength="120"
            autocomplete="off"
            class="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            :placeholder="t('classroom.subjectPlaceholder')"
          />
        </label>
        <label class="block">
          <span class="text-sm font-medium">{{ t('classroom.section') }}</span>
          <input
            v-model="section"
            maxlength="80"
            autocomplete="off"
            class="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            :placeholder="t('classroom.sectionPlaceholder')"
          />
        </label>
      </div>

      <label class="block">
        <span class="text-sm font-medium">{{ t('classroom.schoolYear') }}</span>
        <input
          v-model="schoolYear"
          maxlength="40"
          autocomplete="off"
          class="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          :placeholder="t('classroom.schoolYearPlaceholder')"
        />
      </label>

      <p v-if="error" class="text-sm text-red-700 dark:text-red-300" role="alert">
        {{ error }}
      </p>

      <div class="flex flex-wrap justify-end gap-2 pt-2">
        <AppButton variant="white" :disabled="busy" @click="emit('close')">
          {{ t('common.cancel') }}
        </AppButton>
        <AppButton type="submit" :busy="busy">
          {{ t('classroom.createClass') }}
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
  submit: [input: { name: string; subject: string; section: string; schoolYear: string }]
}>()

const { t } = useAppLanguage()
const name = ref('')
const subject = ref('')
const section = ref('')
const schoolYear = ref('')

watch(() => props.open, (open) => {
  if (!open) return
  name.value = ''
  subject.value = ''
  section.value = ''
  schoolYear.value = ''
})

function submit() {
  if (!name.value.trim() || props.busy) return
  emit('submit', {
    name: name.value.trim(),
    subject: subject.value.trim(),
    section: section.value.trim(),
    schoolYear: schoolYear.value.trim(),
  })
}
</script>
