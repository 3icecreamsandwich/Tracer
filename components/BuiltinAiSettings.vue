<template>
  <section aria-label="AI" class="tracer-panel mt-6 p-5">
    <div class="flex items-center justify-between gap-4">
      <div class="min-w-0">
        <h2 class="text-sm font-medium">AI</h2>
        <p class="mt-2 text-sm font-medium">{{ mode === 'builtin' ? t('ai.builtin') : t('ai.myKeys') }}</p>
        <p role="status" class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ summary }}</p>
        <p v-if="mode === 'builtin' && allowance?.remaining && !allowance.available" class="mt-1 text-xs text-slate-500">{{ t('ai.temporarilyUnavailable') }}</p>
      </div>
      <UButton color="primary" variant="soft" type="button" class="shrink-0" :disabled="loading" ref="configureButton" @click="openConfigure">{{ t('ai.configure') }}</UButton>
    </div>
    <div v-if="mode === 'builtin'" class="mt-4 space-y-2">
      <div class="flex items-center justify-between gap-3 text-xs text-muted"><span>{{ t('ai.monthlyAllowance') }}</span><span>{{ allowance ? `${allowance.remaining} / ${allowance.limit}` : t('ai.unavailable') }}</span></div>
      <UProgress :get-value-label="() => t('ai.monthlyAllowance')" :get-value-text="() => allowance ? t('ai.remaining', { remaining: allowance.remaining, limit: allowance.limit, date: resetDate }) : t('ai.allowanceUnavailable')" :model-value="allowance?.remaining ?? 0" :max="allowance?.limit || 65" color="primary" size="sm" :class="{ 'opacity-40': !allowance }" />
    </div>
    <p v-if="saveError" role="alert" class="mt-2 text-sm text-red-700">{{ saveError }}</p>
  </section>
  <BaseModal :open="configureOpen" :title="t('ai.configure')" panel-class="max-w-2xl" close-label="Close AI configuration" :busy="saving" @close="configureOpen=false">
    <label class="block text-sm font-medium">{{ t('ai.service') }}
      <TracerSelect :aria-label="t('ai.service')" :value="mode" :disabled="saving || loading" class="mt-2 block w-full rounded-[var(--tracer-radius-control)] border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" @change="changeMode(($event.target as HTMLSelectElement).value)">
        <option value="builtin">{{ t('ai.builtin') }}</option><option value="byok">{{ t('ai.myKeys') }}</option>
      </TracerSelect>
    </label>
    <div v-if="mode === 'builtin'" class="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
      <p>{{ t('ai.description') }}</p>
      <p>{{ message || summary }}</p>
      <p>{{ t('ai.localDescription') }}</p>
      <UButton color="primary" variant="soft" type="button" class="rounded-[var(--tracer-radius-control)] border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 disabled:opacity-50" :disabled="refreshing" @click="refresh">{{ refreshing ? t('ai.checking') : t('ai.refresh') }}</UButton>
    </div>
    <section v-else aria-label="AI models" class="mt-5"><slot /></section>
    <details class="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
      <summary class="cursor-pointer text-sm font-medium">{{ t('ai.otherSettings') }}</summary>
      <slot name="options" />
    </details>
    <p v-if="saveError" role="alert" class="mt-3 text-sm text-red-700">{{ saveError }}</p>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed,onMounted,onBeforeUnmount,ref } from 'vue'
import { createSettingsRepo,useTracerDb,type AppSettings } from '~/src/composables/db'
import { useAppLanguage } from '~/src/composables/language'
import { inferredAiMode, type AiMode, type BuiltinUsage } from '~/src/composables/ai/builtin/types'
const { t, language } = useAppLanguage()
const emit=defineEmits<{changed:[settings:AppSettings]}>()
const configureOpen=ref(false)
const configureButton=ref<{ $el: HTMLButtonElement }|null>(null)
function openConfigure() {
  // Safari does not focus buttons on pointer activation. Give the modal a
  // stable return target for keyboard and assistive-technology users.
  configureButton.value?.$el?.focus()
  configureOpen.value=true
}
const mode=ref<AiMode>('builtin'),loading=ref(true),saving=ref(false),refreshing=ref(false)
const allowance=ref<BuiltinUsage|null>(null),message=ref(''),saveError=ref('')
const setupIncomplete=ref(false)
let mounted=true
const resetDate=computed(()=>allowance.value ? new Intl.DateTimeFormat(language.value,{month:'short',day:'numeric',timeZone:'UTC'}).format(new Date(allowance.value.resetsAt)) : '')
const summary=computed(()=>{
  if(loading.value) return t('ai.loading')
  if(mode.value==='byok') return t('ai.usingOwn')
  if(allowance.value?.remaining===0) return t('ai.used', { date: resetDate.value })
  if(allowance.value) return t('ai.remaining', { remaining: allowance.value.remaining, limit: allowance.value.limit, date: resetDate.value })
  return message.value ? (setupIncomplete.value ? t('ai.setupIncomplete') : t('ai.allowanceUnavailable')) : (refreshing.value ? t('ai.checkingAllowance') : t('ai.noKeys'))
})
async function refresh() {
  if(refreshing.value || mode.value!=='builtin') return
  refreshing.value=true; message.value='';setupIncomplete.value=false
  try {const value=await (await import('~/src/composables/ai/builtin/client')).builtinUsage(); if(mounted) allowance.value=value}
  catch(error) {if(mounted){setupIncomplete.value=['configuration','not_enabled','capacity_unconfigured'].includes((error as any)?.code);allowance.value=null; message.value=error instanceof Error?error.message:'Allowance unavailable. Try again shortly.'}}
  finally {refreshing.value=false}
}
async function changeMode(value:string) {
  if(value!=='builtin' && value!=='byok') return
  saving.value=true;saveError.value=''
  try {
    const settings=await createSettingsRepo(await useTracerDb()).set({aiMode:value})
    mode.value=value;emit('changed',settings)
    if(value==='builtin') void refresh()
  } catch {saveError.value=t('ai.saveFailed')}
  finally {saving.value=false}
}
onMounted(async()=>{
  window.addEventListener('tracer:ai-usage',refresh)
  try {mode.value=inferredAiMode(await createSettingsRepo(await useTracerDb()).get())}
  catch {saveError.value=t('ai.loadFailed')}
  finally {loading.value=false}
  void refresh()
})
onBeforeUnmount(()=>{mounted=false;window.removeEventListener('tracer:ai-usage',refresh)})
</script>
