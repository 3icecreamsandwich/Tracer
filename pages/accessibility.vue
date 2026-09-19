<template>
  <PolicyPage title="Accessibility Statement" updated="September 15, 2026">
    <section aria-labelledby="accessibility-commitment">
      <h2 id="accessibility-commitment" class="text-xl font-semibold text-slate-950 dark:text-white">Our current approach</h2>
      <p class="mt-3">Tracer is working to make the web app usable with keyboard navigation, visible focus indicators, readable color contrast, labeled controls, and accessible dialogs. This statement describes ongoing work; it is not a claim of conformance with every accessibility law or standard.</p>
    </section>

    <section aria-labelledby="accessibility-help">
      <h2 id="accessibility-help" class="text-xl font-semibold text-slate-950 dark:text-white">Report a barrier or ask for help</h2>
      <p class="mt-3">If you have trouble using a page, need content in another format, or want to report an accessibility barrier, use the <NuxtLink class="font-medium underline underline-offset-4" to="/contact#accessibility-feedback">accessibility feedback contact route</NuxtLink>. Please include the page or feature, what you were trying to do, and the assistive technology or browser you used if you are comfortable sharing it.</p>
    </section>

    <section aria-labelledby="accessibility-known">
      <h2 id="accessibility-known" class="text-xl font-semibold text-slate-950 dark:text-white">Known limits and follow-up</h2>
      <p class="mt-3">Tracer includes complex study tools, file handling, third-party sign-in, and optional AI features. These areas need regular testing with real assistive technology and browsers. We will use reported barriers to prioritize fixes and will update this statement as the product changes.</p>
    </section>
  </PolicyPage>
</template>

<script setup lang="ts">
useHead({ title: 'Accessibility Statement · Tracer' })
</script>
