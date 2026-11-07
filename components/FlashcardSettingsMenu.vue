<template>
  <div class="grid grid-cols-3 gap-1 p-2">
    <button type="button" role="menuitemcheckbox" :aria-checked="shuffle" :aria-label="shuffleLabel" :title="shuffleLabel" :disabled="empty" class="settings-icon" @click="$emit('shuffle')"><Shuffle :size="16" /></button>
    <button type="button" role="menuitem" :aria-label="frontLabel" :title="frontLabel" :disabled="frontBusy" class="settings-icon" @click="$emit('front')"><ArrowLeftRight :size="16" /></button>
    <button type="button" role="menuitemcheckbox" :aria-checked="starred" :aria-label="starredLabel" :title="starredLabel" :disabled="starDisabled" class="settings-icon" @click="$emit('star')"><Star :size="16" :fill="starred ? 'currentColor' : 'none'" /></button>
  </div>
  <div class="border-t border-slate-200 py-1 dark:border-slate-800">
    <button v-for="filter in filters" :key="filter.value" type="button" role="menuitemradio" :aria-checked="selected === filter.value" class="settings-row" @click="$emit('filter', filter.value)"><span>{{ filter.label }}</span><span aria-hidden="true">{{ selected === filter.value ? '✓' : '' }}</span></button>
    <button type="button" role="menuitem" :disabled="restartDisabled" class="settings-row" @click="$emit('restart')">{{ restartLabel }}</button>
  </div>
  <div class="border-t border-slate-200 py-1 dark:border-slate-800"><button type="button" role="menuitemcheckbox" :aria-checked="smartReview" class="settings-row" @click="$emit('smart')"><span>Smart Review</span><span aria-hidden="true">{{ smartReview ? '✓' : '' }}</span></button></div>
</template>
<script setup lang="ts">
import Shuffle from '@lucide/vue/dist/esm/icons/shuffle.mjs'
import ArrowLeftRight from '@lucide/vue/dist/esm/icons/arrow-left-right.mjs'
import Star from '@lucide/vue/dist/esm/icons/star.mjs'
defineProps<{ shuffle: boolean; starred: boolean; smartReview: boolean; selected: string; empty: boolean; frontBusy: boolean; starDisabled: boolean; restartDisabled: boolean; shuffleLabel: string; frontLabel: string; starredLabel: string; restartLabel: string; filters: { value: 'learning' | 'mastered' | 'all'; label: string }[] }>()
defineEmits<{ shuffle: []; front: []; star: []; smart: []; filter: [value: 'learning' | 'mastered' | 'all']; restart: [] }>()
</script>
<style scoped>
.settings-icon { display:flex; align-items:center; justify-content:center; min-height:40px; border-radius:8px; }
.settings-icon:hover, .settings-row:hover { background:var(--ui-bg-elevated); }
.settings-icon[aria-checked="true"] { background:var(--ui-bg-elevated); }
.settings-icon:disabled, .settings-row:disabled { opacity:.5; }
.settings-row { display:flex; width:100%; align-items:center; justify-content:space-between; padding:.5rem .75rem; text-align:start; font-size:.875rem; }
</style>
