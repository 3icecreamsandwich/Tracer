<template>
  <div class="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
    <AppTopbar v-if="!hideNavbar" />

    <div v-if="!hideFloatingBackButton" class="fixed bottom-6 left-6 z-50">
      <BackButton />
    </div>

    <main>
      <slot />
    </main>

    <FloatingPageChat />
  </div>
</template>

<script setup lang="ts">
 import {
   navigateBack,
   resolveAppShortcut,
 } from '~/src/composables/navigation/app-navigation'

 const route = useRoute()
 const router = useRouter()

 const hideNavbar = computed(() => route.meta?.hideNavbar === true)

 const hideFloatingBackButton = computed(() => {
   if (route.meta?.hideBackButton === true) return true
   // Fullscreen study pages have their own header back button.
   return /^\/(set|study-guide)\/.+-(flashcards|learn|match|test)\/?$/.test(route.path)
 })

 function onGlobalKeydown(event: KeyboardEvent) {
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
