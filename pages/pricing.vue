<template>
  <main class="mx-auto max-w-6xl px-5 py-10 font-medium sm:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h1 class="text-3xl font-bold tracking-tight">Subscriptions are coming to Tracer.</h1>
      <p class="mt-3 text-slate-600 dark:text-slate-300">Here is an early look at pricing and features.</p>
    </div>

    <div class="mt-7 rounded-xl border border-amber-300 bg-amber-50 px-5 py-3 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100" role="status">
      <p class="font-semibold">Not available yet</p>
    </div>

    <section class="mt-8 grid gap-5 lg:grid-cols-3" aria-label="Planned subscription plans">
      <article class="tracer-panel flex flex-col p-6">
        <h2 class="mt-1 text-2xl font-semibold">Free</h2>
        <p class="mt-3 text-3xl font-bold">$0 <span class="text-base font-medium text-slate-500">/ month</span></p>
        <ul class="mt-6 flex-1 space-y-3 text-sm text-slate-700 dark:text-slate-200">
          <li>Unlimited AI with your own provider key</li>
          <li>1 course fully unlocked</li>
          <li>Unlimited core flashcards and games</li>
          <li>Standard study diagnostics</li>
          <li>Basic sets only</li>
        </ul>
        <UButton color="primary" variant="soft" class="mt-7 justify-center" disabled>Not available yet</UButton>
      </article>

      <article class="tracer-panel relative flex flex-col border-orange-400 p-6 shadow-sm">
        <span class="absolute right-5 top-5 -rotate-6 rounded-full bg-[#fff1c9] px-3 py-1 text-xs font-bold text-slate-950 shadow-sm ring-1 ring-[#e5ab40]/50">
          Recommended
        </span>
        <h2 class="text-2xl font-semibold">Tracer Go</h2>
        <p class="mt-3 text-3xl font-bold">$5.99 <span class="text-base font-medium text-slate-500">/ month</span></p>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">$39.99 / year (about $3.33 / month).</p>
        <ul class="mt-6 flex-1 space-y-3 text-sm text-slate-700 dark:text-slate-200">
          <li>About <strong>200 AI generations</strong> each month</li>
          <li>About <strong>1,000 AI chat messages</strong> each month</li>
          <li>3 courses fully unlocked</li>
          <li>Unlimited core flashcards and games</li>
          <li>Basic performance insights</li>
          <li>Expanded guides and problem sets</li>
          <li>Go badge, profile customization, and study-tips newsletter</li>
        </ul>
        <UButton color="primary" variant="soft" class="mt-7 justify-center bg-orange-600 text-white hover:bg-orange-700" disabled>Not available yet</UButton>
      </article>

      <article class="tracer-panel flex flex-col p-6">
        <h2 class="text-2xl font-semibold">Tracer Plus</h2>
        <p class="mt-3 text-3xl font-bold">$9.99 <span class="text-base font-medium text-slate-500">/ month</span></p>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">$59.99 / year (about $4.99 / month).</p>
        <ul class="mt-6 flex-1 space-y-3 text-sm text-slate-700 dark:text-slate-200">
          <li>About <strong>750 AI generations</strong> each month</li>
          <li>About <strong>5,000 AI chat messages</strong> each month</li>
          <li>Unlimited courses</li>
          <li>Unlimited core flashcards and games</li>
          <li>Comprehensive analytics</li>
          <li>Full access to study materials</li>
          <li>Pro badge, themes, Pomodoro timer, profile customization, and study-tips newsletter</li>
        </ul>
        <UButton color="primary" variant="soft" class="mt-7 justify-center" disabled>Not available yet</UButton>
      </article>
    </section>
  </main>
</template>
