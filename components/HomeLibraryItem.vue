<template>
  <li
    class="relative"
    :class="item.kind === 'study-guide' ? 'mx-auto w-[97.5%]' : ''"
    :data-root-entry-kind="rootEntry ? 'set' : undefined"
    :data-root-entry-id="rootEntry ? (item.setId ?? item.id) : undefined"
    :style="rootEntry && order !== undefined ? { order } : undefined"
  >
    <div v-if="dropIndicator === 'before'" class="pointer-events-none absolute -top-2 left-0 right-0 z-10 h-1.5 rounded-full bg-[#C75F5F] shadow-sm" aria-hidden="true" />
    <a
      :href="to"
      :aria-label="item.title"
      data-home-library-item
      :data-root-entry-hit="rootEntry ? 'true' : undefined"
      :data-item-kind="item.kind"
      :data-set-id="item.kind === 'set' ? item.id : undefined"
      :draggable="false"
      class="group flex touch-none select-none items-center rounded-lg border border-slate-200 text-slate-950 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-white dark:hover:bg-slate-900"
      :class="[
        dense ? 'min-h-[58px] gap-3 px-4 py-2' : 'min-h-[82px] gap-5 px-5 py-3.5',
        selected ? 'bg-slate-100 dark:bg-slate-900' : 'bg-white dark:bg-slate-950',
        'cursor-grab active:cursor-grabbing'
      ]"
      @click.stop.prevent="$emit('itemClick', $event)"
      @pointerdown="onPointerDown"
    >
      <svg aria-hidden="true" viewBox="0 0 16 20" class="h-5 w-4 shrink-0 text-slate-400 transition group-hover:text-slate-600 dark:text-slate-600 dark:group-hover:text-slate-300" fill="currentColor"><circle cx="5" cy="4" r="1.3"/><circle cx="11" cy="4" r="1.3"/><circle cx="5" cy="10" r="1.3"/><circle cx="11" cy="10" r="1.3"/><circle cx="5" cy="16" r="1.3"/><circle cx="11" cy="16" r="1.3"/></svg>
      <img
        :src="setIconSrc(item.iconKey)"
        :style="setIconToneStyle(item.iconTone)"
        alt=""
        class="shrink-0 rounded-xl object-cover"
        :class="dense ? 'h-10 w-10' : 'h-14 w-14'"
      />

      <div class="min-w-0 flex-1">
        <p class="truncate font-medium text-slate-950 dark:text-white" :class="dense ? 'text-sm' : 'text-base'">
          {{ item.title }}
        </p>
        <p class="mt-1 truncate text-slate-950 dark:text-slate-100" :class="dense ? 'text-xs' : 'text-sm'">
          <template v-if="item.kind === 'set' && typeof item.cardCount === 'number'">
            {{ item.cardCount }} {{ item.cardCount === 1 ? 'card' : 'cards' }} <span aria-hidden="true">•</span>
          </template>
          {{ formattedDate }}
        </p>
      </div>

      <svg aria-hidden="true" viewBox="0 0 20 20" class="h-5 w-5 shrink-0 text-slate-950 transition group-hover:translate-x-0.5 dark:text-white" fill="none" stroke="currentColor" stroke-width="1.8">
        <path d="m7 4 6 6-6 6" />
      </svg>
    </a>
    <div v-if="dropIndicator === 'after'" class="pointer-events-none absolute -bottom-2 left-0 right-0 z-10 h-1.5 rounded-full bg-[#C75F5F] shadow-sm" aria-hidden="true" />
  </li>
</template>

<script setup lang="ts">
import type { Uuid } from '~/src/composables/db/types'
import { setIconSrc, setIconToneStyle } from '~/src/composables/set-icons'

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

function onPointerDown(event: PointerEvent) {
  const row = event.currentTarget
  if (row instanceof HTMLElement && event.isPrimary) {
    row.setPointerCapture(event.pointerId)
  }
  emit('itemPointerdown', event)
}
</script>
