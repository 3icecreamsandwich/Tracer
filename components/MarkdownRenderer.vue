<template>
  <div
    class="markdown-renderer"
    :class="`markdown-renderer--${props.variant}`"
    data-testid="markdown-renderer"
    v-html="html"
  />
</template>

<script setup lang="ts">
import { renderMarkdownHtml } from '~/src/composables/markdown/parse'

const props = withDefaults(
  defineProps<{ markdown: string; variant?: 'default' | 'flashcard' | 'compact' | 'tile' }>(),
  { variant: 'default' }
)

const html = computed(() =>
  renderMarkdownHtml(props.markdown ?? '', {
    repairMath: props.variant !== 'default'
  })
)
</script>

<style scoped>
.markdown-renderer {
  color: rgb(51 65 85);
  font-size: var(--tracer-text-sm, 0.875rem);
  line-height: 1.625;
}

.markdown-renderer--flashcard {
  font-size: inherit;
  font-weight: inherit;
}

.markdown-renderer--compact {
  font-size: var(--tracer-text-sm, 0.875rem);
}

.markdown-renderer--tile {
  font-size: var(--tracer-text-xs, 0.75rem);
  line-height: 1.35;
}

.dark .markdown-renderer {
  color: rgb(226 232 240);
}

.markdown-renderer :deep(*) {
  overflow-wrap: anywhere;
}

.markdown-renderer :deep(> * + *) {
  margin-top: 1rem;
}

.markdown-renderer :deep(h1),
.markdown-renderer :deep(h2),
.markdown-renderer :deep(h3),
.markdown-renderer :deep(h4),
.markdown-renderer :deep(h5),
.markdown-renderer :deep(h6) {
  color: rgb(15 23 42);
  font-weight: 600;
  line-height: 1.25;
}

.dark .markdown-renderer :deep(h1),
.dark .markdown-renderer :deep(h2),
.dark .markdown-renderer :deep(h3),
.dark .markdown-renderer :deep(h4),
.dark .markdown-renderer :deep(h5),
.dark .markdown-renderer :deep(h6) {
  color: rgb(248 250 252);
}

.markdown-renderer :deep(h1) {
  font-size: var(--tracer-text-xl, 1.25rem);
}

.markdown-renderer :deep(h2) {
  font-size: var(--tracer-text-lg, 1.125rem);
}

.markdown-renderer :deep(h3) {
  font-size: var(--tracer-text-base, 1rem);
}

.markdown-renderer :deep(h4),
.markdown-renderer :deep(h5),
.markdown-renderer :deep(h6) {
  font-size: var(--tracer-text-sm, 0.875rem);
}

.markdown-renderer :deep(p) {
  margin: 0;
}

.markdown-renderer :deep(a) {
  color: rgb(37 99 235);
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.dark .markdown-renderer :deep(a) {
  color: rgb(96 165 250);
}

.markdown-renderer :deep(strong) {
  color: rgb(15 23 42);
  font-weight: 700;
}

.dark .markdown-renderer :deep(strong) {
  color: rgb(248 250 252);
}

.markdown-renderer :deep(ul),
.markdown-renderer :deep(ol) {
  margin: 0;
  padding-left: 1.5rem;
}

.markdown-renderer :deep(ul) {
  list-style-type: disc;
}

.markdown-renderer :deep(ol) {
  list-style-type: decimal;
}

.markdown-renderer :deep(li + li) {
  margin-top: 0.25rem;
}

.markdown-renderer :deep(blockquote) {
  border-left: 3px solid rgb(203 213 225);
  color: rgb(71 85 105);
  margin: 0;
  padding-left: 1rem;
}

.dark .markdown-renderer :deep(blockquote) {
  border-left-color: rgb(51 65 85);
  color: rgb(203 213 225);
}

.markdown-renderer :deep(code) {
  background: rgb(241 245 249);
  border: 1px solid rgb(226 232 240);
  border-radius: 0.25rem;
  color: rgb(15 23 42);
  font-size: var(--tracer-text-xs, 0.75rem);
  padding: 0.1rem 0.25rem;
}

.dark .markdown-renderer :deep(code) {
  background: rgb(15 23 42);
  border-color: rgb(30 41 59);
  color: rgb(248 250 252);
}

.markdown-renderer :deep(pre) {
  background: rgb(248 250 252);
  border: 1px solid rgb(226 232 240);
  border-radius: 0.375rem;
  margin: 0;
  overflow-x: auto;
  padding: 0.75rem;
}

.dark .markdown-renderer :deep(pre) {
  background: rgb(15 23 42);
  border-color: rgb(30 41 59);
}

.markdown-renderer :deep(pre code) {
  background: transparent;
  border: 0;
  border-radius: 0;
  display: block;
  padding: 0;
  white-space: pre;
}

.markdown-renderer :deep(.markdown-table-wrap) {
  max-width: 100%;
  overflow-x: auto;
}

.markdown-renderer :deep(.math-block) {
  overflow-x: auto;
  padding: 0.25rem 0;
}

.markdown-renderer :deep(.math-display-inline) {
  display: inline-block;
  max-width: 100%;
  overflow-x: auto;
  padding: 0.25rem 0;
  vertical-align: middle;
}

.markdown-renderer :deep(.katex-display) {
  margin: 0;
}

.markdown-renderer :deep(table) {
  border-collapse: collapse;
  min-width: 100%;
}

.markdown-renderer :deep(th),
.markdown-renderer :deep(td) {
  border: 1px solid rgb(226 232 240);
  min-width: 8rem;
  overflow-wrap: break-word;
  padding: 0.5rem 0.75rem;
  text-align: left;
  vertical-align: top;
  word-break: normal;
}

.markdown-renderer :deep(th *),
.markdown-renderer :deep(td *) {
  overflow-wrap: break-word;
  word-break: normal;
}

.dark .markdown-renderer :deep(th),
.dark .markdown-renderer :deep(td) {
  border-color: rgb(51 65 85);
}

.markdown-renderer :deep(th) {
  background: rgb(248 250 252);
  color: rgb(15 23 42);
  font-weight: 600;
}

.dark .markdown-renderer :deep(th) {
  background: rgb(15 23 42);
  color: rgb(248 250 252);
}
</style>
