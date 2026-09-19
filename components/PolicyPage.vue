<template>
  <main id="main-content" class="bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50">
    <article class="tracer-page mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <NuxtLink to="/first-run" class="text-sm font-medium underline underline-offset-4 hover:text-slate-700 dark:hover:text-slate-200">Back to sign in</NuxtLink>
      <h1 class="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{{ title }}</h1>
      <p v-if="updated" class="mt-3 text-sm text-slate-600 dark:text-slate-300">Last updated: {{ updated }}</p>
      <div class="mt-9 space-y-8 text-base leading-7 text-slate-800 dark:text-slate-200">
        <slot />
      </div>
    </article>
  </main>
</template>

<script setup lang="ts">
defineProps<{ title: string; updated?: string }>()
</script>
