<template>
  <PolicyPage title="Privacy Policy" updated="September 15, 2026">
    <section aria-labelledby="privacy-summary">
      <h2 id="privacy-summary" class="text-xl font-semibold text-slate-950 dark:text-white">Summary</h2>
      <p class="mt-3">This policy describes how the Tracer web app handles information when you use it. It is a factual description of the current product, not a statement that Tracer meets every privacy law in every location. Tracer should receive jurisdiction-specific legal review before a broader launch.</p>
    </section>

    <section aria-labelledby="privacy-collect">
      <h2 id="privacy-collect" class="text-xl font-semibold text-slate-950 dark:text-white">Information Tracer handles</h2>
      <p class="mt-3">Your account can include your display name, username, email address, account role, and authentication method, such as email and password or Google sign-in.</p>
      <p class="mt-3">Tracer also handles the study information you choose to create or use: flashcard sets and study guides; files and images you attach; AI-generated content; chat content; classroom membership, assignments, and progress; and public sets that you choose to publish. Public sets include the content and profile name or username shown on the public catalog while your account is active.</p>
      <p class="mt-3">The browser version keeps your private study library, study progress, and saved chats in browser storage on the device you use. That information is not automatically synchronized between devices. Clearing browser storage can remove it from that browser.</p>
    </section>

    <section aria-labelledby="privacy-use">
      <h2 id="privacy-use" class="text-xl font-semibold text-slate-950 dark:text-white">How information is used and shared</h2>
      <p class="mt-3">Tracer uses account and study information to sign you in, show your library and classes, provide study features, maintain public sets you publish, and protect the service from abuse.</p>
      <p class="mt-3">If you choose an AI feature, the study, file-derived, or chat content needed for that request may be sent to the AI provider you selected. The currently supported provider options are OpenAI, Anthropic, Google Gemini, GitHub Models, Ollama Cloud, and an administrator-configured OpenAI-compatible provider. Do not submit information to an AI feature unless you are comfortable sending it to that selected provider.</p>
      <p class="mt-3">Tracer uses Supabase for account authentication, database services, and private file storage. It uses Cloudflare to deliver and protect the hosted web app, including edge security controls and Turnstile verification where enabled. Google is involved only when you choose Google sign-in, and GitHub is involved only when you choose GitHub Models authentication. These providers handle information according to their own terms and privacy practices.</p>
    </section>

    <section aria-labelledby="privacy-retention">
      <h2 id="privacy-retention" class="text-xl font-semibold text-slate-950 dark:text-white">Retention and account deletion</h2>
      <p class="mt-3">Account data remains in Tracer’s hosted account services while your account is active. You can delete your account from Settings by typing <code class="rounded bg-slate-100 px-1 py-0.5 text-sm text-slate-950 dark:bg-slate-800 dark:text-white">DELETE</code> in the confirmation dialog.</p>
      <p class="mt-3">When you delete an account, Tracer deletes the hosted account record. A set that you already chose to publish remains available as a public snapshot, but its publisher identity is replaced with <code class="rounded bg-slate-100 px-1 py-0.5 text-sm text-slate-950 dark:bg-slate-800 dark:text-white">&lt;unknown&gt;</code>. Classroom files may remain where needed to keep shared classroom material available, with account ownership removed. Contact us if you need help reviewing a particular published set or shared file.</p>
      <p class="mt-3">Private browser data is controlled by the browser and device. You can remove it by clearing this site’s storage. After account deletion, retained anonymized public snapshots and shared classroom material are kept only for the feature they support unless removal is requested or required.</p>
    </section>

    <section aria-labelledby="privacy-rights">
      <h2 id="privacy-rights" class="text-xl font-semibold text-slate-950 dark:text-white">Your choices and requests</h2>
      <p class="mt-3">You can update your display name and username in Settings. To request access to, correction of, or deletion of hosted information, email <a class="font-medium underline underline-offset-4" href="mailto:3icecreamsanwich@gmail.com?subject=Tracer%20privacy%20request">3icecreamsanwich@gmail.com</a> from the email address associated with your account. We may need to verify the request before acting on it.</p>
    </section>

    <section aria-labelledby="privacy-age">
      <h2 id="privacy-age" class="text-xl font-semibold text-slate-950 dark:text-white">Age requirements</h2>
      <p class="mt-3">Tracer is intended for people age 13 and older. A person under 13 must use the separate parent or guardian consent request flow; that flow does not create a child account until the request has been manually approved.</p>
    </section>

    <section aria-labelledby="privacy-changes">
      <h2 id="privacy-changes" class="text-xl font-semibold text-slate-950 dark:text-white">Changes</h2>
      <p class="mt-3">If Tracer’s data practices change, this page will be updated with a new date. Please review it when you return to the service.</p>
    </section>
  </PolicyPage>
</template>

<script setup lang="ts">
useHead({ title: 'Privacy Policy · Tracer' })
</script>
