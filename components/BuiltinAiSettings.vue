<template>
  <section aria-label="AI" class="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
    <div class="flex items-center justify-between gap-4">
      <div class="min-w-0">
        <h2 class="text-sm font-medium">AI</h2>
        <p class="mt-2 text-sm font-medium">{{ mode === 'builtin' ? 'Built-in AI' : 'My API keys' }}</p>
        <p role="status" class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ summary }}</p>
        <p v-if="mode === 'builtin' && allowance?.remaining && !allowance.available" class="mt-1 text-xs text-slate-500">Temporarily unavailable.</p>
        <p v-else-if="mode === 'builtin' && allowance?.remaining && allowance.throttled" class="mt-1 text-xs text-slate-500">Busy · please wait a minute between actions.</p>
      </div>
      <button type="button" class="shrink-0 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900" :disabled="loading" ref="configureButton" @click="openConfigure">Configure AI</button>
    </div>
    <p v-if="saveError" role="alert" class="mt-2 text-sm text-red-700">{{ saveError }}</p>
  </section>
  <BaseModal :open="configureOpen" title="Configure AI" panel-class="max-w-2xl" close-label="Close AI configuration" :busy="saving" @close="configureOpen=false">
    <label class="block text-sm font-medium">AI service
      <select aria-label="AI service" :value="mode" :disabled="saving || loading" class="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" @change="changeMode(($event.target as HTMLSelectElement).value)">
        <option value="builtin">Built-in AI</option><option value="byok">My API keys</option>
      </select>
    </label>
    <div v-if="mode === 'builtin'" class="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
      <p>65 shared AI actions each month for chat, generation, Fact Check, and optional AI grading. No API keys needed.</p>
      <p>{{ message || summary }}</p>
      <p>Local grading and file scanning use no AI actions. Internal retries count as part of one action.</p>
      <button type="button" class="rounded-md border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 disabled:opacity-50" :disabled="refreshing" @click="refresh">{{ refreshing ? 'Checking…' : 'Refresh allowance' }}</button>
    </div>
    <section v-else aria-label="AI models" class="mt-5"><slot /></section>
    <details class="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
      <summary class="cursor-pointer text-sm font-medium">Other settings</summary>
      <slot name="options" />
    </details>
    <p v-if="saveError" role="alert" class="mt-3 text-sm text-red-700">{{ saveError }}</p>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed,onMounted,onBeforeUnmount,ref } from 'vue'
import { createSettingsRepo,useTracerDb,type AppSettings } from '~/src/composables/db'
import type { AiMode,BuiltinUsage } from '~/src/composables/ai/builtin/types'
const emit=defineEmits<{changed:[settings:AppSettings]}>()
const configureOpen=ref(false)
const configureButton=ref<HTMLButtonElement|null>(null)
function openConfigure() {
  // Safari does not focus buttons on pointer activation. Give the modal a
  // stable return target for keyboard and assistive-technology users.
  configureButton.value?.focus()
  configureOpen.value=true
}
const mode=ref<AiMode>('builtin'),loading=ref(true),saving=ref(false),refreshing=ref(false)
const allowance=ref<BuiltinUsage|null>(null),message=ref(''),saveError=ref('')
const setupIncomplete=ref(false)
let mounted=true
const resetDate=computed(()=>allowance.value ? new Intl.DateTimeFormat(undefined,{month:'short',day:'numeric',timeZone:'UTC'}).format(new Date(allowance.value.resetsAt)) : '')
const summary=computed(()=>{
  if(loading.value) return 'Loading AI settings…'
  if(mode.value==='byok') return 'Using your own models and API keys.'
  if(allowance.value?.remaining===0) return `Monthly allowance used · resets ${resetDate.value} UTC.`
  if(allowance.value) return `${allowance.value.remaining} of ${allowance.value.limit} actions left · resets ${resetDate.value} UTC.`
  return message.value ? (setupIncomplete.value ? 'Built-in AI setup incomplete.' : 'Allowance unavailable. Open Configure AI for details.') : (refreshing.value ? 'Checking allowance…' : '65 AI actions per month. No API keys needed.')
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
  } catch {saveError.value='Could not save the AI service choice. Try again.'}
  finally {saving.value=false}
}
onMounted(async()=>{
  window.addEventListener('tracer:ai-usage',refresh)
  try {mode.value=(await createSettingsRepo(await useTracerDb()).get()).aiMode ?? 'builtin'}
  catch {saveError.value='Could not load the AI service choice.'}
  finally {loading.value=false}
  void refresh()
})
onBeforeUnmount(()=>{mounted=false;window.removeEventListener('tracer:ai-usage',refresh)})
</script>
