<template>
  <AppDialog
    :open="open"
    :title="t('public.share')"
    :close-label="t('common.close')"
    :busy="publishing"
    @close="emit('close')"
  >
    <template v-if="allowCopying">
      <label for="share-terms" class="sr-only">{{ t('public.share') }}</label>
      <textarea
        id="share-terms"
        ref="textEl"
        readonly
        :value="tsv"
        rows="10"
        class="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
      />
    </template>
    <p v-else class="text-sm text-slate-600 dark:text-slate-300">{{ t('public.copyDisabled') }}</p>
    <div class="mt-5 flex flex-wrap gap-2">
      <template v-if="allowCopying">
        <AppButton :title="t('common.copy')" :aria-label="t('common.copy')" @click="copy"
          ><AppIcon name="copy" />{{ t('common.copy') }}</AppButton
        >
        <AppButton @click="download"
          ><AppIcon name="download" />{{ t('common.download') }}</AppButton
        >
        <AppButton @click="textEl?.select()"
          ><AppIcon name="select" />{{ t('common.selectAll') }}</AppButton
        >
      </template>
      <AppButton
        v-if="!publicSet"
        :disabled="!set?.terms.length"
        :busy="publishing"
        @click="publish"
        ><AppIcon name="publish" /><span class="text-orange-500">{{
          t(expanded ? 'public.publishNow' : 'public.publish')
        }}</span></AppButton
      >
    </div>
    <div
      v-if="expanded && !publicSet"
      class="mt-6 space-y-5 border-t border-slate-200 pt-5 dark:border-slate-800"
    >
      <fieldset :disabled="publishing">
        <legend class="mb-2 text-sm font-medium">{{ t('public.tags') }}</legend>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in PUBLIC_SET_TAGS"
            :key="tag"
            type="button"
            :aria-pressed="tags.includes(tag)"
            class="rounded-full border bg-white px-3 py-2 text-sm text-slate-950 focus-visible:ring-2 focus-visible:ring-orange-500"
            :class="
              tags.includes(tag) ? 'border-orange-500 ring-2 ring-orange-500' : 'border-slate-300'
            "
            @click="toggle(tag)"
          >
            {{ t(`public.tag.${tag}`) }}
          </button>
        </div>
      </fieldset>
      <label class="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium"
        >{{ t('public.allowCopying')
        }}<span class="relative inline-flex"
          ><input
            v-model="copying"
            :disabled="publishing"
            type="checkbox"
            role="switch"
            class="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" /><span
            aria-hidden="true"
            class="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-orange-600 peer-focus-visible:ring-2 peer-focus-visible:ring-orange-500 peer-focus-visible:ring-offset-2 dark:bg-slate-700" /><span
            aria-hidden="true"
            class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" /></span
      ></label>
      <p class="text-xs text-slate-500">{{ t('public.snapshot') }}</p>
    </div>
    <p v-if="message" role="status" class="mt-4 text-sm">{{ message }}</p>
    <p v-if="error" role="alert" class="mt-4 text-sm text-red-600 dark:text-red-300">{{ error }}</p>
    <NuxtLink
      v-if="publishedId"
      :to="`/public-sets/${publishedId}`"
      class="mt-3 inline-block underline"
      @click="emit('close')"
      >{{ t('public.view') }}</NuxtLink
    >
  </AppDialog>
</template>
<script setup lang="ts">
import { useAppLanguage } from '~/src/composables/language'
import {
  PUBLIC_SET_TAGS,
  publishSet,
  getPublicationSettings,
  type PublicSetTag,
} from '~/src/composables/published-sets'
import type { FlashcardSet } from '~/src/composables/db/types'
const props = withDefaults(
  defineProps<{
    open: boolean
    set: FlashcardSet | null
    publicSet?: boolean
    allowCopying?: boolean
  }>(),
  { allowCopying: true },
)
const emit = defineEmits<{ close: [] }>()
const { t } = useAppLanguage()
const expanded = ref(false),
  copying = ref(true),
  publishing = ref(false)
const tags = ref<PublicSetTag[]>([]),
  message = ref(''),
  error = ref(''),
  publishedId = ref('')
const textEl = ref<HTMLTextAreaElement | null>(null)
const tsv = computed(
  () =>
    props.set?.terms
      .map((term) =>
        [term.front, term.back].map((value) => value.replace(/[\t\r\n]+/g, ' ')).join('\t'),
      )
      .join('\n') ?? '',
)
watch(
  () => props.open,
  (open) => {
    if (open) {
      expanded.value = false
      message.value = ''
      error.value = ''
      publishedId.value = ''
    }
  },
)
function toggle(tag: PublicSetTag) {
  tags.value = tags.value.includes(tag) ? tags.value.filter((t) => t !== tag) : [...tags.value, tag]
}
async function copy() {
  if (!props.allowCopying) return
  try {
    await navigator.clipboard.writeText(tsv.value)
    message.value = t('public.copied')
  } catch {
    textEl.value?.select()
    error.value = t('public.copyFailed')
  }
}
function download() {
  if (!props.allowCopying) return
  const url = URL.createObjectURL(
    new Blob([tsv.value], { type: 'text/tab-separated-values;charset=utf-8' }),
  )
  const a = document.createElement('a')
  a.href = url
  a.download = `${props.set?.title || 'set'}.tsv`
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
async function publish() {
  if (!expanded.value) {
    if (!props.set || publishing.value) return
    publishing.value = true
    expanded.value = true
    error.value = ''
    try {
      const previous = await getPublicationSettings(props.set.id)
      tags.value = previous?.tags ?? []
      copying.value = previous?.allow_copying ?? true
      expanded.value = true
    } catch {
      expanded.value = false
      error.value = t('public.loadFailed')
    } finally {
      publishing.value = false
    }
    return
  }
  if (!props.set || props.publicSet || publishing.value) return
  publishing.value = true
  error.value = ''
  message.value = ''
  try {
    publishedId.value = await publishSet(props.set, tags.value, copying.value)
    message.value = t('public.published')
  } catch (e) {
    error.value = e instanceof Error ? e.message : t('public.publishFailed')
  } finally {
    publishing.value = false
  }
}
</script>
