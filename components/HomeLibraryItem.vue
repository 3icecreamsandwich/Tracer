<template>
  <li
    class="relative"
    :data-root-entry-kind="rootEntry ? 'set' : undefined"
    :data-root-entry-id="rootEntry ? (item.setId ?? item.id) : undefined"
    :style="rootEntry && order !== undefined ? { order } : undefined"
  >
    <div v-if="dropIndicator === 'before'" class="pointer-events-none absolute -top-2 left-0 right-0 z-10 h-1.5 rounded-full bg-[#C75F5F] shadow-sm" aria-hidden="true" />
    <div data-home-library-item :data-root-entry-hit="rootEntry ? 'true' : undefined" :data-item-kind="item.kind" :data-set-id="item.kind === 'set' ? item.id : undefined" class="h-full select-none touch-pan-y" @dragstart.prevent @click.capture="onCardClick" @pointerdown="onPointerDown">
      <LibraryCard :title="item.title" :to="to" :description="item.subtitle" :author="ownerName" :kind="item.kind" :set-id="item.setId ?? item.id" :selected="selected" />
    </div>
    <div v-if="dropIndicator === 'after'" class="pointer-events-none absolute -bottom-2 left-0 right-0 z-10 h-1.5 rounded-full bg-[#C75F5F] shadow-sm" aria-hidden="true" />
  </li>
</template>

<script setup lang="ts">
import type { Uuid } from '~/src/composables/db/types'

type HomeLibraryItem = {
  kind: 'set' | 'study-guide'
  id: Uuid
  setId?: Uuid
  title: string
  subtitle: string | null
  iconKey?: string | null
  iconTone?: string | null
  cardCount?: number
}

defineProps<{
  item: HomeLibraryItem
  to: string
  formattedDate: string
  selected?: boolean
  dense?: boolean
  rootEntry?: boolean
  order?: number
  dropIndicator?: 'before' | 'after' | null
}>()

const emit = defineEmits<{
  itemClick: [event: MouseEvent]
  itemPointerdown: [event: PointerEvent]
}>()

const ownerName = useState('library-owner-name', () => '')
function onCardClick(event: MouseEvent) {
  if ((event.target as HTMLElement).closest('.library-card__actions')) return
  event.preventDefault(); event.stopPropagation(); emit('itemClick', event)
}
function onPointerDown(event: PointerEvent) {
  if (event.pointerType === 'touch') return
  if ((event.target as HTMLElement).closest('.library-card__actions')) return
  const row = event.currentTarget
  if (row instanceof HTMLElement && event.isPrimary) {
    row.setPointerCapture(event.pointerId)
  }
  emit('itemPointerdown', event)
}
</script>
