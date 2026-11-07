<template>
  <span role="status" :aria-label="resolvedLabel" :class="['tracer-loading', { 'tracer-loading--screen': screen, 'tracer-loading--centered': centered }]">
    <span v-if="screen || centered" class="tracer-loading__skeleton" aria-hidden="true"><span /><span /><span /></span>
    <span class="tracer-loading__status"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" :class="['tracer-loading__spinner', `tracer-loading__spinner--${size}`]"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" opacity=".15"/><path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg><span v-if="showLabel">{{ resolvedLabel }}</span></span>
  </span>
</template>
<script setup lang="ts">
import { useAppLanguage } from '~/src/composables/language'
const props = withDefaults(defineProps<{ label?: string; showLabel?: boolean; size?: 'sm' | 'md' | 'lg'; centered?: boolean; screen?: boolean }>(), { showLabel:true, size:'md', centered:false, screen:false })
const { t } = useAppLanguage()
const resolvedLabel = computed(() => props.label ?? t('common.loading'))
</script>
<style scoped>
.tracer-loading { display:inline-flex; align-items:center; justify-content:center; color:var(--ui-text-muted); }
.tracer-loading__status { display:inline-flex; align-items:center; justify-content:center; gap:10px; font-size:.875rem; }
.tracer-loading--centered,.tracer-loading--screen { display:flex; flex-direction:column; width:100%; padding:28px 0; gap:24px; }
.tracer-loading--screen { min-height:min(60dvh,520px); }
.tracer-loading__spinner { width:24px; height:24px; flex-shrink:0; animation:tracer-spin 1s linear infinite; }
.tracer-loading__spinner--sm { width:18px; height:18px; }
.tracer-loading__spinner--lg { width:28px; height:28px; }
.tracer-loading__skeleton { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; width:100%; max-width:960px; }
.tracer-loading__skeleton > span { height:150px; border-radius:var(--tracer-radius-surface); background:linear-gradient(100deg,var(--ui-bg-muted) 25%,var(--ui-bg-elevated) 45%,var(--ui-bg-muted) 65%); background-size:240% 100%; animation:tracer-shimmer 1.8s ease-in-out infinite; }
@keyframes tracer-spin { to { transform:rotate(360deg); } }
@keyframes tracer-shimmer { to { background-position:-160% 0; } }
@media(max-width:640px) { .tracer-loading__skeleton { grid-template-columns:1fr; } .tracer-loading__skeleton > span:not(:first-child) { display:none; } }
@media(prefers-reduced-motion:reduce) { .tracer-loading__spinner,.tracer-loading__skeleton > span { animation:none; } }
</style>
