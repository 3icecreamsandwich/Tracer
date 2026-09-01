<template>
  <section
    v-if="busy || response"
    class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
    :aria-label="t('factCheck.title')"
  >
    <div>
      <p class="text-sm font-medium text-slate-900 dark:text-slate-50">
        {{ t('factCheck.title') }}
      </p>
      <p class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
        {{ t('factCheck.hint') }}
      </p>
    </div>

    <div
      class="mt-4 max-h-[420px] overflow-y-auto rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50"
      role="log"
      aria-live="polite"
    >
      <div class="flex justify-start">
        <div
          class="max-w-[85%] rounded-lg px-3 py-2"
          :class="busy && !response
            ? ''
            : 'border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-700 dark:bg-slate-900'"
        >
          <LoadingSpinner
            v-if="busy && !response"
            :label="t('factCheck.loading')"
            :show-label="false"
          />
          <MarkdownRenderer v-else :markdown="renderedResponse" variant="compact" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import MarkdownRenderer from '~/components/MarkdownRenderer.vue'
import { useAppLanguage } from '~/src/composables/language'

const props = defineProps<{ busy: boolean; response: string }>()

const { t } = useAppLanguage()

// Preserve the prompt's one-suggestion-per-line format as visible Markdown line breaks.
const renderedResponse = computed(() => props.response.replace(/\n/g, '  \n'))
</script>
