<template>
  <ChatGlyph v-if="name === 'chat'" :size="size" />
  <component v-else :is="icon" :size="size" :stroke-width="1.7" aria-hidden="true" class="study-mode-artwork" :style="{ color }" />
</template>
<script setup lang="ts">
import Layers from '@lucide/vue/dist/esm/icons/layers.mjs'
import Settings from '@lucide/vue/dist/esm/icons/settings.mjs'
import MessageSquare from '@lucide/vue/dist/esm/icons/message-square.mjs'
import Puzzle from '@lucide/vue/dist/esm/icons/puzzle.mjs'
import BookOpen from '@lucide/vue/dist/esm/icons/book-open.mjs'
import { studyModeColor } from '~/src/composables/study-mode-colors'
const props = withDefaults(defineProps<{ name: string; size?: number }>(), { size: 24 })
const color = computed(() => studyModeColor(props.name))
const icon = computed(() => ({ cards: Layers, flashcards: Layers, practice: Settings, learn: Settings, chat: MessageSquare, match: Puzzle } as Record<string, unknown>)[props.name] ?? BookOpen)
</script>
<style scoped>.study-mode-artwork { display:block; flex-shrink:0; }</style>
