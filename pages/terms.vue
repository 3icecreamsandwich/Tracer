<template>
  <PolicyPage title="Terms of Service" updated="September 16, 2026">
    <section aria-labelledby="terms-agreement">
      <h2 id="terms-agreement" class="text-xl font-semibold text-slate-950 dark:text-white">Using Tracer</h2>
      <p class="mt-3">These terms explain the current rules for using the Tracer web app. They are not a claim that Tracer is legally compliant in every jurisdiction. Tracer should receive jurisdiction-specific legal review before a broader launch.</p>
      <p class="mt-3">Use Tracer lawfully and do not interfere with the service, other accounts, or classroom spaces. Keep your sign-in details private. You are responsible for the study content, files, images, and public sets you choose to create, upload, share, or publish.</p>
    </section>

    <section aria-labelledby="terms-account">
      <h2 id="terms-account" class="text-xl font-semibold text-slate-950 dark:text-white">Accounts and age</h2>
      <p class="mt-3">Users should be 13 or older to use Tracer. If a user is under 13, they need parent or guardian approval through the separate consent-request flow before a child account is created.</p>
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

    <section aria-labelledby="terms-eula">
      <h2 id="terms-eula" class="text-xl font-semibold text-slate-950 dark:text-white">End User License Agreement</h2>
      <p class="mt-3">Subject to these terms, Tracer gives you a limited, personal, non-exclusive, non-transferable, revocable right to use the Tracer web app for its intended study and classroom features. This is a permission to use the service, not a sale of the service or its software. You may not copy, reverse engineer, disrupt, or use Tracer to access another person’s account or data without permission.</p>
    </section>

    <section aria-labelledby="terms-warranties">
      <h2 id="terms-warranties" class="text-xl font-semibold text-slate-950 dark:text-white">No warranty and service limits</h2>
      <p class="mt-3">To the maximum extent permitted by law, Tracer is provided “as is” and “as available.” We do not promise uninterrupted, error-free, or completely secure service, or that every item of content will be preserved or recoverable. Keep your own copies of study material that is important to you.</p>
      <p class="mt-3">AI providers, sign-in providers, hosting providers, and other third-party services operate under their own terms and privacy practices. To the maximum extent permitted by law, Tracer is not responsible for their content, availability, outages, charges, or handling of information that you choose to send to them.</p>
    </section>

    <section aria-labelledby="terms-liability">
      <h2 id="terms-liability" class="text-xl font-semibold text-slate-950 dark:text-white">Limitation of liability</h2>
      <p class="mt-3">To the maximum extent permitted by law, Tracer and its operators are not liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, lost data, lost use, goodwill, or other intangible losses arising from the service. This includes harm connected with service interruptions, inaccurate AI output, user-published content, third-party services, or unauthorized access to or alteration of content.</p>
      <p class="mt-3">Nothing in these terms excludes or limits liability, a user’s rights, or notice obligations that applicable law does not allow us to exclude or limit. A data-security incident will be handled according to applicable legal requirements; this section is not a promise that Tracer can avoid responsibility for conduct that the law makes it responsible for.</p>
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
