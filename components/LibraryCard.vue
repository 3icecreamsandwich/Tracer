<template>
  <article class="library-card" :class="{ 'library-card--selected': selected }">
    <NuxtLink v-if="to" :to="to" :draggable="false" class="library-card__main" :aria-label="title"><h3>{{ title }}</h3></NuxtLink>
    <h3 v-else>{{ title }}</h3>
    <div class="library-card__description">
      <template v-if="previews?.length"><p v-for="line in previews.slice(0, 3)" :key="line" class="truncate">{{ line }}</p></template>
      <p v-else-if="description" class="line-clamp-2">{{ excerpt }}</p>
    </div>
    <footer v-if="kind !== 'folder'" class="library-card__footer">
      <span class="library-card__author"><UAvatar :alt="author || 'Tracer'" size="xs" /><span class="truncate">{{ author || 'Tracer' }}</span></span>
      <span class="library-card__actions" @pointerdown.stop @click.stop>
        <template v-if="kind === 'set' && setId">
          <UButton :to="`/set/${setId}-flashcards`" color="primary" variant="ghost" square aria-label="Flashcards"><StudyModeArtwork name="cards" :size="22" /></UButton>
          <UButton :to="`/set/${setId}-learn`" color="primary" variant="ghost" square aria-label="Practice"><StudyModeArtwork name="practice" :size="22" /></UButton>
          <UButton :to="`/set/${setId}?tab=chat`" color="primary" variant="ghost" square aria-label="Chat"><StudyModeArtwork name="chat" :size="22" /></UButton>
        </template>
        <AppIcon v-else-if="kind === 'class'" name="classes" />
        <StudyModeArtwork v-else :name="kind === 'set' ? 'cards' : 'guide'" :size="24" />
      </span>
    </footer>
    <slot />
  </article>
</template>
<script setup lang="ts">
const props = defineProps<{ title: string; to?: string; description?: string | null; author?: string; kind?: 'set' | 'study-guide' | 'folder' | 'class'; setId?: string; previews?: string[]; selected?: boolean }>()
const excerpt = computed(() => {
  const words = props.description?.trim().split(/\s+/) ?? []
  return words.slice(0, 15).join(' ') + (words.length > 15 ? '…' : '')
})
</script>
<style scoped>
.library-card { position:relative; display:flex; flex-direction:column; min-width:0; height:196px; overflow:hidden; padding:22px; border-radius:var(--tracer-radius-surface); background:var(--ui-bg-muted); transition:background-color 160ms ease,box-shadow 160ms ease; }
.library-card:hover { background:var(--ui-bg-elevated); }
.library-card--selected { box-shadow:inset 0 0 0 2px var(--ui-primary); }
h3 { color:var(--ui-text-highlighted); font-size:1.125rem; line-height:1.4; font-weight:725; overflow-wrap:anywhere; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.library-card__main::after { content:''; position:absolute; inset:0; border-radius:inherit; }
.library-card__main:focus-visible { outline:none; }
.library-card:has(.library-card__main:focus-visible) { outline:2px solid var(--ui-primary); outline-offset:3px; }
.library-card__description { margin-top:10px; font-size:.9375rem; line-height:1.55; color:var(--ui-text-muted); }
.library-card__footer { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:auto; padding-top:22px; }
.library-card__author { display:flex; align-items:center; gap:8px; min-width:0; font-size:.875rem; color:var(--ui-text); }
.library-card__actions { position:relative; z-index:1; display:flex; align-items:center; flex-shrink:0; gap:2px; color:var(--ui-text); }
.library-card__actions :deep([data-slot=base]) { width:34px; min-height:34px; height:34px; padding:7px; }
</style>
