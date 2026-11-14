<template>
  <ChatGlyph v-if="name === 'chat'" :size="size" />
  <component v-else :is="icons[name]" :size="size" :stroke-width="strokeWidth" aria-hidden="true" class="shrink-0" />
</template>
<script setup lang="ts">
// Import only the icons we render; the barrel includes the entire library in Vite dev.
import X from '@lucide/vue/dist/esm/icons/x.mjs'
import Copy from '@lucide/vue/dist/esm/icons/copy.mjs'
import Download from '@lucide/vue/dist/esm/icons/download.mjs'
import FileInput from '@lucide/vue/dist/esm/icons/file-input.mjs'
import ScanText from '@lucide/vue/dist/esm/icons/scan-text.mjs'
import LibraryBig from '@lucide/vue/dist/esm/icons/library-big.mjs'
import ListFilter from '@lucide/vue/dist/esm/icons/list-filter.mjs'
import LayoutGrid from '@lucide/vue/dist/esm/icons/layout-grid.mjs'
import Pencil from '@lucide/vue/dist/esm/icons/pencil.mjs'
import Share2 from '@lucide/vue/dist/esm/icons/share-2.mjs'
import FolderPlus from '@lucide/vue/dist/esm/icons/folder-plus.mjs'
import Settings from '@lucide/vue/dist/esm/icons/settings.mjs'
import Crown from '@lucide/vue/dist/esm/icons/crown.mjs'
import Lightbulb from '@lucide/vue/dist/esm/icons/lightbulb.mjs'
import PanelsTopLeft from '@lucide/vue/dist/esm/icons/panels-top-left.mjs'
import GraduationCap from '@lucide/vue/dist/esm/icons/graduation-cap.mjs'
import MessageCircle from '@lucide/vue/dist/esm/icons/message-circle.mjs'
import BookOpen from '@lucide/vue/dist/esm/icons/book-open.mjs'
import Layers from '@lucide/vue/dist/esm/icons/layers.mjs'
import ListChecks from '@lucide/vue/dist/esm/icons/list-checks.mjs'
import ChevronRight from '@lucide/vue/dist/esm/icons/chevron-right.mjs'
import GripVertical from '@lucide/vue/dist/esm/icons/grip-vertical.mjs'
import Trash2 from '@lucide/vue/dist/esm/icons/trash-2.mjs'
import Expand from '@lucide/vue/dist/esm/icons/maximize.mjs'
import Puzzle from '@lucide/vue/dist/esm/icons/puzzle.mjs'
import ClipboardCheck from '@lucide/vue/dist/esm/icons/clipboard-check.mjs'
import ChevronDown from '@lucide/vue/dist/esm/icons/chevron-down.mjs'
import ImagePlus from '@lucide/vue/dist/esm/icons/image-plus.mjs'
import ArrowLeft from '@lucide/vue/dist/esm/icons/arrow-left.mjs'
import ArrowRight from '@lucide/vue/dist/esm/icons/arrow-right.mjs'
import ArrowUp from '@lucide/vue/dist/esm/icons/arrow-up.mjs'
import Check from '@lucide/vue/dist/esm/icons/check.mjs'
import Plus from '@lucide/vue/dist/esm/icons/plus.mjs'
import Flag from '@lucide/vue/dist/esm/icons/flag.mjs'
withDefaults(defineProps<{
  name: 'flag' | 'close' | 'copy' | 'download' | 'select' | 'publish' | 'filter' | 'dashboard' | 'insights' | 'edit' | 'share' | 'add-folder' | 'settings' | 'crown' | 'cards' | 'classes' | 'chat' | 'guide' | 'practice' | 'chevron' | 'grip' | 'trash' | 'fullscreen' | 'match' | 'test' | 'chevron-down' | 'image-plus' | 'file-input' | 'arrow-left' | 'arrow-right' | 'arrow-up' | 'check' | 'plus'
  size?: number
  strokeWidth?: number
}>(), {
  size: 20,
  strokeWidth: 2,
})
const icons = {
  flag: Flag,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  check: Check,
  plus: Plus,
  'chevron-down': ChevronDown,
  'image-plus': ImagePlus,
  'file-input': FileInput,
  fullscreen: Expand,
  match: Puzzle,
  test: ClipboardCheck,
  chevron: ChevronRight,
  grip: GripVertical,
  trash: Trash2,
  cards: Layers,
  classes: GraduationCap,
  chat: MessageCircle,
  guide: BookOpen,
  practice: ListChecks,
  close: X,
  copy: Copy,
  download: Download,
  select: ScanText,
  publish: LibraryBig,
  filter: ListFilter,
  dashboard: LayoutGrid,
  insights: Lightbulb,
  edit: Pencil,
  share: Share2,
  'add-folder': FolderPlus,
  settings: Settings,
  crown: Crown,
}
</script>
