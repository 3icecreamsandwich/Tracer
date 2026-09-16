<template>
  <div class="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
    <AppTopbar v-if="!hideNavbar" />

    <div v-if="!hideFloatingBackButton" class="tracer-back-control fixed bottom-6 left-6 z-50">
      <BackButton />
    </div>

    <div class="flex-1">
      <slot />
    </div>

    <PublicFooter v-if="showWebFooter" />

    <LazyFloatingPageChat v-if="!hideFloatingChat" />
  </div>
</template>

<script setup lang="ts">
 import {
   navigateBack,
   resolveAppShortcut,
   shouldPreventFullscreenExit,
 } from '~/src/composables/navigation/app-navigation'
 import { useTestSessionState } from '~/src/composables/test-session'

 const route = useRoute()
 const router = useRouter()
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

 const showWebFooter = computed(() => !hasTauriRuntime() && route.meta?.hidePublicFooter !== true)

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

 onMounted(() => {
   window.addEventListener('keydown', onGlobalKeydown, { capture: true })
 })

 onBeforeUnmount(() => {
   window.removeEventListener('keydown', onGlobalKeydown, { capture: true })
 })
</script>
