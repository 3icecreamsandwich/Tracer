<template>
  <div class="practice-settings">
    <div class="flex items-center justify-between gap-2 px-3 pt-3">
      <h2 class="text-sm font-semibold">Practice settings</h2>
      <button type="button" class="rounded-md p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close practice settings" @click="$emit('close')"><AppIcon name="close" :size="16" /></button>
    </div>
    <div class="mx-3 mt-3 grid grid-cols-2 rounded-full bg-slate-100 p-1 dark:bg-slate-800" aria-label="Session mode">
      <button v-for="choice in (['practice', 'test'] as const)" :key="choice" type="button" :aria-pressed="sessionMode === choice" class="rounded-full px-3 py-1.5 text-sm font-medium capitalize" :class="sessionMode === choice ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-600 dark:text-slate-300'" @click="$emit('update:sessionMode', choice)">{{ choice }}</button>
    </div>
    <div class="mt-3 border-t border-slate-200 py-2 dark:border-slate-800">
      <p class="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Question types</p>
      <button v-for="item in choices" :key="item.kind" type="button" class="settings-row" :aria-pressed="questionTypes[item.kind]" @click="$emit('toggleType', item.kind)"><span>{{ item.label }}</span><span class="text-slate-700 dark:text-slate-200" aria-hidden="true">{{ questionTypes[item.kind] ? '✓' : '' }}</span></button>
    </div>
    <div class="border-t border-slate-200 py-2 dark:border-slate-800">
      <label class="settings-row"><span>Questions</span><input :value="questionCount" type="number" min="1" :max="questionLimit" class="w-16 rounded-md border border-slate-300 bg-white px-2 py-1 text-right dark:border-slate-700 dark:bg-slate-950" @input="$emit('update:questionCount', Number(($event.target as HTMLInputElement).value))" @change="$emit('clampCount')" /></label>
      <button type="button" class="settings-row" :aria-pressed="shuffle" @click="$emit('update:shuffle', !shuffle)"><span>Shuffle questions</span><span aria-hidden="true">{{ shuffle ? '✓' : '' }}</span></button>
      <button type="button" class="settings-row" :aria-pressed="timed" @click="$emit('update:timed', !timed)"><span>Time limit</span><span aria-hidden="true">{{ timed ? '✓' : '' }}</span></button>
      <label v-if="timed" class="settings-row"><span>Minutes</span><input :value="minutes" type="number" min="1" max="60" class="w-16 rounded-md border border-slate-300 bg-white px-2 py-1 text-right dark:border-slate-700 dark:bg-slate-950" @input="$emit('update:minutes', Math.max(1, Math.min(60, Number(($event.target as HTMLInputElement).value) || 1)))" /></label>
    </div>
    <div class="border-t border-slate-200 p-3 dark:border-slate-800"><button type="button" class="w-full rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-600 dark:bg-white dark:text-slate-950 dark:disabled:bg-slate-800 dark:disabled:text-slate-400" :disabled="busy" @click="$emit('apply')">Restart {{ sessionMode }}</button></div>
  </div>
</template>
<script setup lang="ts">
type QuestionKind = 'multiple_choice' | 'true_false' | 'written'
defineProps<{ sessionMode: 'practice' | 'test'; choices: { kind: QuestionKind; label: string }[]; questionTypes: Record<QuestionKind, boolean>; questionCount: number; questionLimit: number; shuffle: boolean; timed: boolean; minutes: number; busy: boolean }>()
defineEmits<{ close: []; apply: []; clampCount: []; toggleType: [kind: QuestionKind]; 'update:sessionMode': [value: 'practice' | 'test']; 'update:questionCount': [value: number]; 'update:shuffle': [value: boolean]; 'update:timed': [value: boolean]; 'update:minutes': [value: number] }>()
</script>
<style scoped>
.settings-row { display:flex; min-height:36px; width:100%; align-items:center; justify-content:space-between; gap:.75rem; padding:.375rem .75rem; text-align:left; font-size:.875rem; }
button.settings-row:hover { background:var(--ui-bg-elevated); }
</style>
