# Smart Review test results — 2026-09-04

Tested the current working tree, including its pre-existing uncommitted global-setting changes. The initial testing pass left application code unchanged; the follow-up fix below updates both flashcard viewers.

## Follow-up fix

Both viewers now rebuild an empty saved filter session from the currently eligible cards when it is reopened. Nonempty sessions retain their existing order, answers, and progress.

The follow-up production build and `git diff --check` also passed.

The two previously failing browser regressions now pass. They also verify that answering one newly ready card, switching filters, and returning preserves the remaining card and does not count either answer twice. The two existing ready-card ordering/completion tests also pass, confirming that completed nonempty sessions still show Results when revisited. All 23 focused unit tests passed again. The remaining browser scenarios below describe the initial testing pass and were not rerun for this narrowly scoped fix.

## Results

- **23 focused unit tests passed** across seven files. Seven newly added scheduler tests cover 15-minute / 45-minute / next-day learning steps, subsequent interval growth, due-time boundaries, missed-answer reset, persistence, user/set isolation, legacy migration, invalid timestamps/JSON, unavailable storage, and bounded scheduling over 150 reviews.
- **10 browser scenarios passed; 2 regression scenarios failed.** Eight passing scheduling scenarios cover both embedded and fullscreen views: graduation and cross-view persistence, ready-card ordering and stable completion, clock-driven readiness, and Smart Review off. The existing ordinary flashcard-run and global-settings scenarios also passed.
- **Manual in-app browser checks passed** for enabling Smart Review, showing category counts, correct/missed answer progression, and the next-review message in both layouts.
- **Production build and `git diff --check` passed.**

## Fixed bug: previously empty Ready session remains empty

Reproduced in both `/set/demo?mode=flashcards` and `/set/demo-flashcards`:

1. Enable Smart Review and answer both cards correctly.
2. Select **Review now (0)**, then switch to **All (2)**.
3. Advance the browser clock 16 minutes.
4. Select **Ready now (2)**.

Before the fix, the viewer displayed **0/0** and **No cards**, despite the selected filter showing **Ready now (2)**. After the fix, the two ready cards can be reviewed.

`setReviewFilter` previously restored the saved empty `order` without checking for newly ready cards. The affected restoration starts at `pages/set/[id].vue:3975` and `pages/set/[id]-flashcards.vue:870`; it now starts a fresh configured run when the saved order is empty. Regression coverage is the passing `refreshes a previously empty ready filter after cards become due` test in `tests/e2e/web/smart-review-scheduling.spec.ts`, parameterized for both views.

## Additional observations

- Immediately after answering, the next-review label can show **16 min** for an actual 15-minute interval. The label compares the new deadline with a clock refreshed every 30 seconds. Advancing through that refresh produces **15 min**; persisted deadlines were correct.
- Fullscreen web preview always constructs the fixed `demo` set, whereas embedded preview honors the URL's set ID. Navigating from a custom preview set to fullscreen therefore appears to lose its local Smart Review selection. Normal `/set/demo` cross-view persistence passed. This is a web-preview fixture limitation; desktop behavior was not inferred from it.
- The pre-existing settings browser test inspected a menu item after toggling closed its menu. The test now reopens the menu before asserting the unchecked state, and passes.

## Environment and reproduction

Unit command:

```sh
bun x vitest run tests/unit/spaced-repetition.test.ts tests/unit/smart-review-settings.test.ts tests/unit/flashcard-mastery.test.ts tests/unit/flashcard-run.test.ts tests/unit/db-flashcard-autosave-roundtrip.test.ts tests/unit/sql-migrations.test.ts tests/unit/app-local-cache.test.ts --maxWorkers=1
```

The standard Playwright configuration expects Google Chrome, which is absent on this machine. Tests instead used the installed Helium Chromium browser with an isolated temporary profile and the existing server at `http://127.0.0.1:3000`. Helium exited between browser contexts, so scenarios were run individually with `--grep`, using `/tmp/tracer-smart-review.playwright.config.ts`. No browser was installed and no personal browser profile was used.

Example regression command for this machine:

```sh
bun x playwright test --config=/tmp/tracer-smart-review.playwright.config.ts tests/e2e/web/smart-review-scheduling.spec.ts --grep 'embedded: refreshes'
```

Browser evidence is under `/tmp/tracer-smart-review-results/`. On a machine with Chrome installed, use the normal repository Playwright configuration.

UI checks used the running Nuxt web preview, not the packaged Tauri app. Native desktop WebDriver is unsupported by this repository's macOS harness. SQLite migration/settings persistence was tested separately in unit tests; native signed-in startup and real elapsed-day desktop persistence remain unverified.
