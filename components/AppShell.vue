<template>
  <div class="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
    <AppTopbar v-if="!hideNavbar" />
    <div
      v-else-if="isDesktop && !isStudyRoute"
      class="h-11 shrink-0 select-none"
      data-tauri-drag-region
      @pointerdown="onWindowDrag"
    />

    <div v-if="!hideFloatingBackButton" class="tracer-back-control fixed bottom-6 left-6 z-50">
      <BackButton />
    </div>

    <div class="flex-1">
      <div v-if="creationNavigationError" role="alert" class="mx-auto mt-4 max-w-3xl rounded-xl border border-orange-300 bg-orange-50 p-4 text-orange-950 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-50">
        <p class="font-semibold">Could not open the creation page.</p>
        <p class="mt-1 break-words text-sm">{{ creationNavigationError.message }}</p>
        <a :href="creationNavigationError.path" class="mt-3 inline-block font-semibold underline">Reload this page and try again</a>
      </div>
      <slot />
    </div>

    <LazyFloatingPageChat v-if="!hideFloatingChat" />
  </div>
</template>

<script setup lang="ts">
 import {
   navigateBack,
   resolveAppShortcut,
   shouldPreventFullscreenExit,
 } from '~/src/composables/navigation/app-navigation'
 import { hasTauriRuntime } from '~/src/composables/tauri'
 import { startStudyStreakTracking } from '~/src/composables/study-streak'
 import { useTestSessionState } from '~/src/composables/test-session'
 import { redactSensitiveText } from '~/src/composables/security/redact'

 const route = useRoute()
 const isDesktop = ref(false)
 async function onWindowDrag(event: PointerEvent) {
   if (event.button !== 0) return
   event.preventDefault()
   const { getCurrentWindow } = await import('@tauri-apps/api/window')
   await getCurrentWindow().startDragging()
 }
 const router = useRouter()
 const creationNavigationError = useState<{ path: string; message: string } | null>('creation-navigation-error', () => null)
 let removeNavigationErrorHandler: (() => void) | undefined
 let removeNavigationSuccessHandler: (() => void) | undefined
 const { testSessionCompleted } = useTestSessionState()

 const hideNavbar = computed(() => route.meta?.hideNavbar === true)
 const isTestRoute = computed(() => /^\/set\/.+-test\/?$/.test(route.path))
 const hideFloatingChat = computed(() =>
   route.meta?.hideFloatingChat === true ||
   (isTestRoute.value && !testSessionCompleted.value)
 )

 const hideFloatingBackButton = computed(() => {
   if (route.meta?.hideBackButton === true) return true
   // Fullscreen study pages have their own header back button.
   return /^\/(set|study-guide)\/.+-(flashcards|learn|match|test)\/?$/.test(route.path)
 })
 const isStudyRoute = computed(() => /^\/set\/.+-(flashcards|learn|match|test)\/?$/.test(route.path))

 function onGlobalKeydown(event: KeyboardEvent) {
   // Cancel the native window action without stopping propagation so Escape
   // still closes Tracer dialogs, menus, and other transient UI.
   if (shouldPreventFullscreenExit(event)) event.preventDefault()

   const action = resolveAppShortcut(event, route.path)
   if (!action) return

   event.preventDefault()
   event.stopPropagation()

   if (action.type === 'back') {
     navigateBack(router, route.path, window.history.state)
     return
   }

   if (action.type === 'forward') {
     router.forward()
     return
   }

   if (action.type === 'focus-search') {
     window.dispatchEvent(new CustomEvent('tracer:focus-search'))
     return
   }

   if (action.type === 'reload') {
     window.location.reload()
     return
   }

   if (action.replace) {
     void router.replace(action.to)
     return
   }

   void router.push(action.to)
 }

 let stopStudyTracking: (() => void) | undefined
 onMounted(() => {
   removeNavigationErrorHandler = router.onError((error, to) => {
     if (!/^\/create\/(basic|generate|synthesize)\/?$/.test(to.path)) return
     const message = redactSensitiveText(error instanceof Error ? error.message : String(error))
     console.error('[Tracer] Creation page navigation failed:', redactSensitiveText(error instanceof Error ? error.stack ?? message : message))
     creationNavigationError.value = { path: router.resolve(to.fullPath).href, message }
   })
   removeNavigationSuccessHandler = router.afterEach((_to, _from, error) => {
     if (!error) creationNavigationError.value = null
   })
   isDesktop.value = hasTauriRuntime()
   window.addEventListener('keydown', onGlobalKeydown, { capture: true })
   stopStudyTracking = startStudyStreakTracking(() => isStudyRoute.value)
 })

 onBeforeUnmount(() => {
   stopStudyTracking?.()
   removeNavigationErrorHandler?.()
   removeNavigationSuccessHandler?.()
   window.removeEventListener('keydown', onGlobalKeydown, { capture: true })
 })
</script>
