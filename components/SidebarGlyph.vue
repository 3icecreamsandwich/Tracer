<template>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="name === 'cards'"><rect x="5" y="3" width="16" height="14" rx="3"/><path d="M8 17v1a3 3 0 0 0 3 3h7M9 8h8M9 12h5"/></template>
    <template v-else-if="name === 'classes'"><path d="m3 9 9-5 9 5-9 5-9-5ZM7 11.5V16c2.8 2.7 7.2 2.7 10 0v-4.5M21 9v6"/></template>
    <template v-else-if="name === 'basic'"><path d="m14.7 5.3 4 4M4 20l3.4-.7L19.5 7.2a2.1 2.1 0 0 0-3-3L4.3 16.4 4 20Zm9.5-13.5 4 4"/></template>
    <template v-else-if="name === 'synthesize'"><path d="M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5"/></template>
    <template v-else-if="name === 'generate'"><path d="M7 3v4M5 5h4M18 15v6M15 18h6M12.5 6.5l1.2 3.1 3.3 1.2-3.3 1.2-1.2 3.2-1.2-3.2L8 10.8l3.3-1.2 1.2-3.1Z"/></template>
    <template v-else-if="name === 'request'"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></template>
    <template v-else-if="name === 'dashboard'"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></template>
    <template v-else-if="name === 'insights'"><path d="M5 20V10M12 20V4M19 20v-7M3 20h18"/></template>
    <template v-else><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z"/></template>
  </svg>
</template>
<script setup lang="ts">
defineProps<{ name: string }>()
</script>
