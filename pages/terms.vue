<template>
  <PolicyPage title="Terms of Service" updated="September 15, 2026">
    <section aria-labelledby="terms-agreement">
      <h2 id="terms-agreement" class="text-xl font-semibold text-slate-950 dark:text-white">Using Tracer</h2>
      <p class="mt-3">These terms explain the current rules for using the Tracer web app. They are not a claim that Tracer is legally compliant in every jurisdiction. Tracer should receive jurisdiction-specific legal review before a broader launch.</p>
      <p class="mt-3">Use Tracer lawfully and do not interfere with the service, other accounts, or classroom spaces. Keep your sign-in details private. You are responsible for the study content, files, images, and public sets you choose to create, upload, share, or publish.</p>
    </section>

    <section aria-labelledby="terms-account">
      <h2 id="terms-account" class="text-xl font-semibold text-slate-950 dark:text-white">Accounts and age</h2>
      <p class="mt-3">Tracer is intended for people 13 and older. If someone is under 13, a parent or guardian must use the separate consent-request flow. That flow requires manual approval before a child account is created.</p>
      <p class="mt-3">Provide accurate account information and choose a display name and username that do not impersonate another person or violate another person’s rights. We may limit access needed to protect the service or its users.</p>
    </section>

    <section aria-labelledby="terms-content">
      <h2 id="terms-content" class="text-xl font-semibold text-slate-950 dark:text-white">Your content and public sets</h2>
      <p class="mt-3">You keep responsibility for your private study content. Do not upload or publish material you do not have permission to use, or material that is unlawful, harmful, or violates another person’s rights.</p>
      <p class="mt-3">Publishing a set makes that snapshot publicly viewable through Tracer’s public catalog. You can remove your own publication while your account is active. If you delete your account, published snapshots remain available with the publisher name replaced by <code class="rounded bg-slate-100 px-1 py-0.5 text-sm text-slate-950 dark:bg-slate-800 dark:text-white">&lt;unknown&gt;</code>. See the <NuxtLink class="font-medium underline underline-offset-4" to="/privacy">Privacy Policy</NuxtLink> for more about retention.</p>
    </section>

    <section aria-labelledby="terms-ai">
      <h2 id="terms-ai" class="text-xl font-semibold text-slate-950 dark:text-white">AI features</h2>
      <p class="mt-3">AI features are optional. When you use one, the study or chat content needed for the request may be sent to the provider you selected. Tracer currently supports OpenAI, Anthropic, Google Gemini, GitHub Models, Ollama Cloud, and an administrator-configured OpenAI-compatible provider. AI output can be wrong or incomplete; review it before relying on it for school, work, health, legal, financial, or other important decisions.</p>
      <p class="mt-3">You are responsible for any provider account, key, or usage charges associated with an AI provider you choose. Do not use AI features to submit sensitive information unless you accept the selected provider’s handling of that information.</p>
    </section>

    <section aria-labelledby="terms-availability">
      <h2 id="terms-availability" class="text-xl font-semibold text-slate-950 dark:text-white">Availability and changes</h2>
      <p class="mt-3">Tracer may change, pause, or remove features as the product develops. The service is provided without a promise that every feature will always be available or error-free. These terms do not remove rights that cannot be waived under applicable law.</p>
    </section>

    <section aria-labelledby="terms-help">
      <h2 id="terms-help" class="text-xl font-semibold text-slate-950 dark:text-white">Questions</h2>
      <p class="mt-3">For questions about these terms, account help, or a request about your data, contact <NuxtLink class="font-medium underline underline-offset-4" to="/contact">Tracer support</NuxtLink>.</p>
    </section>
  </PolicyPage>
</template>

<script setup lang="ts">
useHead({ title: 'Terms of Service · Tracer' })
</script>
