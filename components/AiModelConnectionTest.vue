<template>
  <div class="mt-2">
    <button
      type="button"
      class="rounded border border-slate-200 px-2 py-1 text-xs disabled:opacity-40 dark:border-slate-800"
      :disabled="!configured || testing"
      :aria-busy="testing"
      :aria-label="`Test connection for ${label}`"
      @click="testConnection"
    >{{ testing ? 'Testing…' : 'Test connection' }}</button>
    <p v-if="message" role="status" class="mt-1 text-xs text-slate-600 dark:text-slate-300">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{ modelId: string; label: string; configured: boolean }>()
const testing = ref(false)
const message = ref('')
let active: AbortController | null = null

function reset() {
  active?.abort()
  active = null
  testing.value = false
  message.value = ''
}
watch(() => [props.modelId, props.configured], reset)
onBeforeUnmount(reset)

async function testConnection() {
  const controller = new AbortController()
  active = controller
  testing.value = true
  message.value = ''
  try {
    const [{ resolveAiModel }, { streamGroundedChatText }] = await Promise.all([
      import('~/src/composables/ai/registry'), import('~/src/composables/ai/chat'),
    ])
    // Test this exact model, without allowing a fallback to hide its failure.
    const model = await resolveAiModel([props.modelId])
    const result = await streamGroundedChatText({
      model, system: 'You are testing the connection. Reply briefly.',
      messages: [{ role: 'user', content: 'Reply with OK.' }],
      abortSignal: controller.signal,
    })
    for await (const _chunk of result.textStream) { /* consume the complete response */ }
    if (!controller.signal.aborted) message.value = `Response verified at ${new Date().toLocaleTimeString()}.`
  } catch (error) {
    if (controller.signal.aborted) return
    const { normalizeAiError } = await import('~/src/composables/ai/ux-errors')
    message.value = normalizeAiError(error).message
  } finally {
    if (active === controller) { active = null; testing.value = false }
  }
}
</script>
