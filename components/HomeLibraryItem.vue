<template>
  <li>
    <a
      :href="to"
      :aria-label="item.title"
      data-home-library-item
      :data-item-kind="item.kind"
      :data-set-id="item.kind === 'set' ? item.id : undefined"
      :draggable="false"
      class="group block rounded-md border border-slate-200 p-4 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
      :class="
        selected
          ? 'bg-slate-100 dark:bg-slate-900'
          : 'bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900'
      "
      @click.stop.prevent="$emit('itemClick', $event)"
      @pointerdown="$emit('itemPointerdown', $event)"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="truncate text-sm font-medium text-slate-900 dark:text-slate-50">
            {{ item.title }}
          </p>
          <p
            v-if="item.subtitle"
            class="mt-1 truncate text-sm text-slate-600 dark:text-slate-300"
          >
            {{ translateAppGeneratedText(item.subtitle) }}
          </p>
        </div>
        <span
          class="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        >
          {{ item.kind === 'set' ? t('home.setKind') : t('home.studyGuide') }}
        </span>
      </div>

      <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        <span>{{ formattedDate }}</span>
      </div>
    </a>
  </li>
</template>

<script setup lang="ts">
import type { Uuid } from '~/src/composables/db/types'
import { useAppLanguage } from '~/src/composables/language'

type HomeLibraryItem = {
  kind: 'set' | 'study-guide'
  id: Uuid
  title: string
  subtitle: string | null
}

defineProps<{
  item: HomeLibraryItem
  to: string
  formattedDate: string
  selected?: boolean
}>()

defineEmits<{
  itemClick: [event: MouseEvent]
  itemPointerdown: [event: PointerEvent]
}>()

const { t, translateAppGeneratedText } = useAppLanguage()
</script>
