<template>
  <AppDialog
    :open="restartDialogOpen"
    title="Restart Tracer?"
    description="Tracer will close to finish updating. Save any changes before continuing."
    close-label="Cancel"
    :busy="actionPending || busy"
    @close="restartDialogOpen = false"
  >
    <div class="flex justify-end gap-3">
      <button
        type="button"
        class="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700"
        :disabled="actionPending || busy"
        @click="restartDialogOpen = false"
      >
        Cancel
      </button>

      <button
        type="button"
        class="rounded-md bg-orange-600 px-3 py-2 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-60"
        :disabled="actionPending || busy || savingPreference"
        @click="confirmRestart"
      >
        {{ actionPending ? "Updating…" : "Restart now" }}
      </button>
    </div>
  </AppDialog>
  <section
    v-if="desktop"
    id="app-updates"
    class="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
    aria-labelledby="app-updates-title"
  >
    <div class="px-5 pt-3">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h2 id="app-updates-title" class="text-sm font-medium">App version</h2>

        <span
          class="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          aria-label="Current version"
        >
          {{ currentVersion ? `v${currentVersion}` : "Loading…" }}
        </span>
      </div>

      <div
        class="my-4 flex items-center justify-between gap-4 border-t border-slate-100 pt-4 dark:border-slate-800"
      >
        <div class="min-w-0">
          <p id="automatic-updates-label" class="text-sm font-medium">
            Automatic updates
          </p>
          <p
            id="automatic-updates-description"
            class="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400"
          >
            Download new versions in the background.
          </p>
        </div>

        <button
          type="button"
          role="switch"
          :aria-checked="enabled"
          aria-labelledby="automatic-updates-label"
          aria-describedby="automatic-updates-description"
          :aria-busy="savingPreference"
          :class="{ 'opacity-60': !ready }"
          class="inline-flex min-w-12 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
          @click="changePreference"
        >
          {{ enabled ? "On" : "Off" }}
        </button>
      </div>
    </div>

    <div
      class="border-t border-slate-200 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/40"
    >
      <div
        class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <p
          class="min-w-0 text-xs leading-5 text-slate-600 dark:text-slate-300"
          role="status"
        >
          {{ statusText }}
        </p>

        <button
          type="button"
          class="inline-flex shrink-0 items-center justify-center self-start rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-800"
          :disabled="busy || savingPreference || actionPending"
          @click="runAction"
        >
          {{ actionText }}
        </button>
      </div>

      <progress
        v-if="status === 'downloading'"
        class="mt-3 h-1.5 w-full accent-orange-600"
        :value="downloadPercent ?? undefined"
        max="100"
        aria-label="Update download progress"
      />

      <p
        v-if="displayError"
        class="mt-3 break-words text-xs leading-5 text-red-600 dark:text-red-400"
        role="alert"
      >
        {{ displayError }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { hasTauriRuntime } from "../src/composables/tauri"
import { useAppUpdates } from "../src/composables/app-updates"
import { useAutomaticUpdates } from "../src/composables/automatic-updates"

const desktop = ref(false)
const savingPreference = ref(false)
const actionPending = ref(false)
const localError = ref<string | null>(null)

const {
  status,
  currentVersion,
  availableVersion,
  downloadPercent,
  error,
  startupError,
  busy,
  initializeVersion,
  checkUpdate,
  downloadUpdate,
  installAndRestart,
} = useAppUpdates()

const { enabled, ready, initialize, setEnabled } = useAutomaticUpdates()

const displayError = computed(
  () => localError.value ?? error.value ?? startupError.value,
)

const restartDialogOpen = ref(false)

const statusText = computed(() => {
  switch (status.value) {
    case "checking":
      return "Checking for updates..."
    case "up-to-date":
      return "You're up to date."
    case "available":
      return `Update available: ${availableVersion.value}`
    case "downloading":
      return downloadPercent.value === null
        ? "Downloading update..."
        : `Downloading update... (${downloadPercent.value ?? 0}%)`
    case "ready":
      return `Version ${availableVersion.value} is downloaded.`
    case "error":
      return "The update couldn't be completed."
    case "installing":
      return "Installing the update…"
    case "installed":
      return "Update installed. Restart Tracer to finish."
    case "restarting":
      return "Restarting Tracer…"
    default:
      return "Check for a newer version of Tracer."
  }
})

const actionText = computed(() => {
  if (actionPending.value) return "Please wait..."

  switch (status.value) {
    case "checking":
      return "Checking..."
    case "available":
      return "Download update"
    case "downloading":
      return "Downloading..."
    case "ready":
      return "Update downloaded"
    case "error":
      return "Retry"
    case "ready":
      return "Restart to update"
    case "installed":
      return "Restart Tracer"
    case "installing":
      return "Installing…"
    case "restarting":
      return "Restarting…"
    default:
      return "Check for updates"
  }
})

function message(cause: unknown): string {
  return cause instanceof Error
    ? cause.message
    : "Unable to complete this action. Please try again."
}

async function initializeSection() {
  await Promise.all([initialize(), initializeVersion()])
}

async function changePreference() {
  if (!ready.value || savingPreference.value) return

  savingPreference.value = true
  localError.value = null

  try {
    await setEnabled(!enabled.value)
  } catch (cause) {
    localError.value = message(cause)
  } finally {
    savingPreference.value = false
  }
}

async function confirmRestart() {
  if (actionPending.value || busy.value || savingPreference.value) return

  actionPending.value = true
  localError.value = null

  try {
    await installAndRestart()
  } finally {
    restartDialogOpen.value = false
    actionPending.value = false
  }
}

async function runAction() {
  if (actionPending.value || busy.value) return

  if (status.value === "ready" || status.value === "installed") {
    restartDialogOpen.value = true
    return
  }

  actionPending.value = true
  localError.value = null

  try {
    await initializeSection()

    if (status.value === "available") {
      await downloadUpdate()
    } else {
      await checkUpdate()
    }
  } catch (error) {
    localError.value = message(error)
  } finally {
    actionPending.value = false
  }
}

onMounted(async () => {
  desktop.value = hasTauriRuntime()
  if (!desktop.value) return

  try {
    await initializeSection()
  } catch (error) {
    localError.value = message(error)
  }
})
</script>
