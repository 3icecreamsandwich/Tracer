# AI staging verification

Environment: `tracer-ai-test` (`incejztkdiregaaxltiv`). Production `Tracer`
(`qhxvznvummjtypytcxlw`) was not migrated or enabled by this rollout.

## Applied migrations

- `20261027040922_builtin_ai_gateway`
- `20261028041453_builtin_ai_safe_capacity_sync`

The follow-up migration adds a `WHERE enabled=true` condition to capacity sync.
The real Supabase API role enables safe-update protection and rejected the
previous unqualified update with SQLSTATE `21000`. This was not reproduced by
PGlite or the privileged migration connection. The fix was verified through the
actual server credential and authenticated gateway before inference tests.
Migration history versions match the checked-in filenames.

## Verified checks

- Real PostgreSQL accounting: reservation, duplicate/concurrent admission,
  exactly-once charging, refunds, crash recovery, monthly rollover, owner
  isolation, result expiry, invalid credentials and shared quota cooldown.
- Six simultaneous submissions using separate database calls created exactly
  one reservation and returned five duplicate refusals. Synthetic concurrency
  records were removed; the other SQL checks roll back their changes.
- All six private tables have RLS enabled. Anonymous/authenticated roles cannot
  select from them or execute the accounting facade. The server role can call
  the facade. Supabase's informational `RLS Enabled No Policy` notices are
  intentional default-deny behavior, not a request to add client access:
  [linter explanation](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy).
- Public Cloudflare HTTPS gateway, real Auth, accounting and provider inference:
  Chat, Fact Check, generation and explicit AI grading completed and charged
  exactly four additional actions (the repeatable matrix ended at 14 used,
  51 remaining on its test account).
  Duplicate POSTs and cross-account recovery were denied; owner recovery worked.
- A production-built web browser showed a real AI answer and the updated balance.
  Its unrelated library/classroom rows are controlled fixtures; Auth and AI
  endpoints, provider calls and accounting are not mocked.
- The isolated native app returned “Water has the chemical formula H₂O” using
  the native HTTP plugin and the public staging Worker. Settings showed the
  second test account's shared server balance, 57 of 65 actions remaining,
  and the compact AI card with a Configure AI modal and shared Other settings.
  All four native feature UI flows were also exercised against controlled
  fixtures earlier; the final live native public-HTTPS check covered chat and
  allowance, not a second live four-feature native matrix.
- All 550 unit tests in 102 files passed. Standard Node and Cloudflare production
  builds passed. The latest credential audit checked 1,546 generated client/native
  files against 20 credential names and found no shared credential leaks.

OpenRouter's authenticated key endpoint reported 49 free requests remaining out
of 50, with zero credit usage when setup ran. Staging now pins
`nvidia/nemotron-3.5-lightning:free`, verified at zero prompt/completion pricing; no paid model or
paid fallback is configured. Other providers remain disabled until their free
allocation is verified. The temporary attestation expires after 24 hours.
The random `openrouter/free` router returned safety-classifier output during
remote verification, so it is no longer eligible for built-in inference.
See [pinned free model](https://openrouter.ai/nvidia/nemotron-3.5-lightning:free) and
[quota API](https://openrouter.ai/docs/api_reference/limits).

## Local staging commands

`.env.ai-staging.local` is ignored by Git and holds the staging server key. Keep
it private. It targets the test project, not production. The provider keys remain
in the existing server-only `.env`; no secret is copied into frontend variables.

```sh
bun --env-file=.env --bun scripts/ai/staging/check-contracts.ts
bun --env-file=.env --env-file=.env.ai-staging.local scripts/ai/staging/setup.ts
bun --env-file=.env.ai-staging.local --bun node_modules/nuxt/bin/nuxt.mjs build --extends ./tests/e2e/staging
bun --env-file=.env --env-file=.env.ai-staging.local scripts/ai/staging/server.ts
bun --bun scripts/ai/staging/smoke.ts
TRACER_LIVE_STAGING=1 bun --bun x playwright test --config playwright.ai-staging.config.ts
```

The server binds only `127.0.0.1:3111`, admits only two synthetic test accounts,
and requires the real staging token. Setup creates test users without sending
email. Session files are private and expire normally; never commit them.
`setup.ts` verifies the server key, anonymous mutation denial and available free
quota before creating fixtures. `diagnose.ts` performs accounting diagnostics
without printing credentials. Live tests respect the admission retry delay;
repeating a smoke run consumes another four successful actions.

The separate public staging Worker is deployed at
https://tracer-ai-test.akatagunta.workers.dev. Production is not enabled.
The Worker admits only the two synthetic accounts and targets only the test database.

## Public staging Worker

The dedicated Worker configuration is `wrangler.ai-staging.jsonc`, with no
production routes or environments. `build-worker.ts` generates an isolated
Cloudflare bundle and a config with inference disabled. Its public variables
contain only the staging URL and publishable key. Deployment uploads only the
staging server key, the OpenRouter key, the two-account cohort and the verified
capacity manifest as Worker secrets, then enables that cohort.

```sh
bun x wrangler login
bun --env-file=.env.ai-staging.local --bun scripts/ai/staging/build-worker.ts
bun --env-file=.env --env-file=.env.ai-staging.local scripts/ai/staging/deploy-worker.ts
```

The deployed URL is written to `/tmp/tracer-ai-staging/deployment.json`.
Set `TRACER_AI_STAGING_GATEWAY_URL` to that URL when running `smoke.ts` or the
Playwright config to verify the deployed transport. Both reject a production URL.
Cloudflare login was renewed before deployment. The staging Worker has no
production routes and no production database credential.

The pinned-model change is covered by a regression that rejects the random router,
known safety classifiers and the paid variant. Refresh free model availability and
quota with `refresh.ts --capacity` before redeploying an expired attestation.

Gemma’s free upstream returned 429 during verification. The final staging model
is Nemotron 3.5 Lightning (free), which passed all four canonical feature contracts
through the installed adapters before attestation. Hidden reasoning is disabled
so the answer fits the existing output caps, including 256 tokens for grading.

Live grading also exposed `<Yes>:` presentation in an otherwise usable response.
The shared grade-format normalizer preserves a definite Yes/No verdict, folds
harmless formatting, and rejects conflicting verdicts. The strict parser still
rejects ambiguous output; server repairs remain bounded to the original action.
