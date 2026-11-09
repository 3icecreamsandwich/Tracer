<template>
  <div class="result-layout result-overview">
    <div class="result-main">
      <div class="result-message">
        <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">{{ attempted === 0 ? 'Keep trying!' : percent >= 80 ? 'Good job!' : percent >= 50 ? 'Getting there!' : 'Keep trying!' }}</h2>
        <p v-if="time" class="mt-2 text-sm text-slate-500 dark:text-slate-400">Time: {{ time }}</p>
        <nav v-if="setId" class="result-modes" aria-label="Study modes">
          <NuxtLink v-for="item in otherModes" :key="item.mode" :to="item.to" class="result-mode"><StudyModeArtwork :name="item.mode" :size="20" />{{ item.label }}</NuxtLink>
        </nav>
        <div class="result-actions">
          <NuxtLink v-if="restartTo" :to="restartTo" class="result-action result-action--primary">Restart {{ modeLabel }}</NuxtLink>
          <button v-else type="button" class="result-action result-action--primary" @click="$emit('restart')">Restart {{ modeLabel }}</button>
          <button v-if="resume" type="button" class="result-action" @click="$emit('resume')">Review missed</button>
          <slot name="actions" />
        </div>
      </div>
      <div class="result-chart" :style="chartStyle" role="img" :aria-label="`${safeCorrect} correct, ${wrong} incorrect, ${untested} not tested`"><div>{{ attempted ? `${percent}%` : '—' }}</div></div>
    </div>
    <aside v-if="!inline && missed.length" class="result-missed"><h3>Most missed</h3><ul><li v-for="term in missed.slice(0, 5)" :key="term.id"><p class="result-term">{{ term.front }}</p><p class="result-definition">{{ term.back }}</p></li></ul></aside>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{ correct: number; attempted: number; total: number; missed?: { id: string; front: string; back: string }[]; setId?: string; mode: 'flashcards' | 'learn' | 'match' | 'test'; inline?: boolean; published?: boolean; backTo?: string; restartTo?: string; time?: string; resume?: boolean }>(), { missed: () => [], inline: false, published: false })
defineEmits<{ restart: []; resume: [] }>()
const safeCorrect = computed(() => Math.max(0, Math.min(props.correct, props.attempted)))
const wrong = computed(() => Math.max(0, props.attempted - safeCorrect.value))
const untested = computed(() => Math.max(0, props.total - props.attempted))
const percent = computed(() => props.attempted ? Math.round(safeCorrect.value / props.attempted * 100) : 0)
const modeLabel = computed(() => ({ flashcards:'flashcards', learn:'practice', match:'match', test:'test' })[props.mode])
const chartStyle = computed(() => { const total = Math.max(1, safeCorrect.value + wrong.value + untested.value); const good = safeCorrect.value / total * 100; const answered = (safeCorrect.value + wrong.value) / total * 100; return { background: `conic-gradient(#16a34a 0 ${good}%, #f97316 ${good}% ${answered}%, #e2e8f0 ${answered}% 100%)` } })
const otherModes = computed(() => ([{ mode:'flashcards', label:'Flashcards' }, { mode:'learn', label:'Practice' }, { mode:'match', label:'Match' }, { mode:'chat', label:'Chat' }] as const).filter(item => item.mode !== props.mode).map(item => ({ ...item, to: item.mode === 'chat' || props.inline ? `${props.published ? '/public-sets' : '/set'}/${props.setId}?mode=${item.mode}` : `/set/${props.setId}-${item.mode}${props.published ? '?published=1' : ''}` })))
</script>
<style scoped>
.result-layout { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:1.5rem; width:100%; text-align:left; }
.result-main { display:flex; align-items:center; justify-content:space-between; gap:2rem; min-width:0; padding:clamp(1rem,3vw,2rem); border:1px solid var(--ui-border); border-radius:1.25rem; background:var(--ui-bg); box-shadow:0 1px 3px rgb(0 0 0 / .06); }
.result-message { min-width:0; }
.result-modes,.result-actions { display:flex; flex-wrap:wrap; gap:.5rem; margin-top:1rem; }
.result-mode,.result-action { display:inline-flex; min-height:44px; align-items:center; justify-content:center; gap:.5rem; padding:.65rem .9rem; border:1px solid var(--ui-border); border-radius:.75rem; background:var(--ui-bg); color:var(--ui-text-highlighted); font-size:.875rem; font-weight:600; }
.result-mode:hover,.result-action:hover { background:var(--ui-bg-elevated); }
.result-action--primary { background:#0f172a; border-color:#0f172a; color:white; }
.result-action--primary:hover { background:#334155; }
.result-chart { display:grid; place-items:center; width:clamp(130px, 19vw, 220px); aspect-ratio:1; flex-shrink:0; border-radius:50%; }
.result-chart > div { display:grid; place-items:center; width:82%; aspect-ratio:1; border-radius:50%; background:var(--ui-bg); font-size:clamp(1.5rem,3vw,2.25rem); font-weight:700; }
.result-missed { width:min(22rem,30vw); border:1px solid var(--ui-border); border-radius:1.25rem; padding:1.25rem; background:var(--ui-bg); box-shadow:0 1px 3px rgb(0 0 0 / .06); align-self:start; }
.result-missed h3 { font-size:1.125rem; font-weight:700; }
.result-missed ul { margin-top:.5rem; }
.result-missed li { padding:.75rem 0; border-bottom:1px solid var(--ui-border); }
.result-missed li:last-child { border-bottom:0; }
.result-term { font-weight:650; color:var(--ui-text-highlighted); overflow-wrap:anywhere; }
.result-definition { margin-top:.25rem; font-size:.875rem; line-height:1.5; color:var(--ui-text-muted); overflow-wrap:anywhere; }
@media(max-width:850px) { .result-layout { grid-template-columns:1fr; } .result-missed { width:100%; } }
@media(max-width:560px) { .result-main { flex-direction:column-reverse; align-items:flex-start; } .result-chart { align-self:center; } }
</style>
