# Built-in AI operations

Built-in AI uses the same authenticated gateway from web and desktop. The
server flag defaults off, and credentials alone never enable a provider.
Existing BYOK preferences and keys remain separate from the shared pool.

## Server configuration

Provision these as runtime secrets/bindings in each environment, rather than
putting values in Wrangler vars, Vite settings, GitHub build arguments, or app
bundles:

- `BUILTIN_AI_ENABLED=1` and `BUILTIN_AI_COHORT`: comma-separated account UUIDs;
  use `*` only after the staging and cohort checks pass.
- `SUPABASE_SERVICE_ROLE_KEY`: server-only Supabase credential; normal clients
  cannot invoke the accounting facade. Account identity is validated using the
  user's token before constructing this independent privileged client.
- Numbered provider secrets: `GROQ_KEY_0`, `OLLAMA_CLOUD_KEY_0`,
  `OPENROUTER_KEY_0`, `GEMINI_KEY_0`, and additional numbered keys as needed.
- `AI`: optional Workers AI binding. The broad
  `CLOUDFLARE_WORKERS_KEY_0_SUPER` token is deliberately never used.
- `BUILTIN_AI_CAPACITY`: JSON array of dated, verified quota-group entries.

An entry has the following shape (numbers are illustrative, NOT verified free
allowances; do not deploy this example as capacity):

```json
{
  "provider": "groq",
  "freeVerified": true,
  "verifiedUntil": "2026-10-28T00:00:00Z",
  "rpm": 3,
  "rpd": 30,
  "tpm": 10000,
  "tpd": 100000,
  "concurrency": 1,
  "context": 8192
}
```

Supported provider names: `groq`, `ollama`, `openrouter`, `google`, `cloudflare`.
Model defaults are defined in `server/utils/ai/config.ts`. Google may explicitly
select `gemma-3n-e4b-it` or `gemma-3n-e2b-it` if the account API actually serves
it; otherwise use the documented Gemma 4 default. All other defaults are pinned.

Keys share a provider quota group unless an entry explicitly supplies both
`quotaGroup` and `keyIds`. Only use separate groups after verifying independent
provider quotas. An exhausted shared group cools down as a whole. A 401 disables
that key; a 403/404 cools down its model access. To rotate a disabled key, replace
its secret and clear its disabled flag using a privileged, audited database
operation before retesting it. Do not add another group merely to evade limits.

Verify free capacity in the provider's actual account/project console, including
other consumers of that quota, hard spend limits, and the entire request/token
window. Configure conservative ceilings below the provider's free allocation;
never attest `freeVerified` on an account that can silently bill beyond it.
Cloudflare binding usage must likewise be restricted to a verified free budget.
No credits are purchased, no paid fallback models are selected, and no unknown
free capacity is guessed. Expired attestations disable admission.

`bun --bun scripts/ai/check-models.ts` performs read-only model inventory using
local `.env` credentials and prints no secrets. Inventory is not a quota or
feature-contract verification. Test all operations in staging before publishing
an attestation.

## Deployment order

1. Apply the new Supabase migration in an isolated staging project/branch and
   verify the role permissions and transactional accounting tests. Do not
   reconcile or overwrite older migration history.
2. Deploy the gateway with the flag off. Set server secrets and verified capacity,
   then enable only staging account UUIDs in `BUILTIN_AI_COHORT`.
3. Exercise all operations from production-built web and a native desktop build
   against the actual staging gateway. Verify fallback and monthly accounting
   across both clients; compare live provider quota usage with reservations.
4. Apply the reviewed migration to production, deploy disabled, enable a small
   cohort, and inspect sanitized action events before setting cohort `*`.

Desktop defaults to `https://app.tracerquiz.com`; staging builds set the public
`VITE_TRACER_AI_GATEWAY_URL` to the staging gateway origin. Requests use native
HTTP with the signed-in user's bearer token; browsers use same-origin fetch.
The public variable contains only a gateway URL, never a key.

Rollback by setting `BUILTIN_AI_ENABLED=0`; BYOK and local study behavior remain
available. Keep the additive database schema so old clients and recovery records
continue to work. Paid accounts have the same 65 actions until a separate policy
is implemented.

## Accounting and checks

The service-only RPC owns monthly counters, request reservations, quota windows,
session affinity, and pressure state. Reservations expire after five minutes;
requests have a 180-second overall deadline. Results are accessible only through
an owner-scoped status endpoint for ten minutes. Scheduled maintenance removes
expired payloads and releases crashed reservations; lazy cleanup also runs on
accounting calls.

One successful operation costs one action, including retries and format repairs.
A partially delivered answer costs one action and remains visible. Failed or
cancelled requests with no usable output release their reservation. Built-in
file generation accepts one bounded operation rather than silently creating
multiple charged batches. Requests that cannot fit are rejected without trimming.

Run `bun --bun x vitest run`, `bun --bun run build`,
`bun --bun run build:cloudflare`, and `git diff --check`. PostgreSQL accounting
tests run the migration in PGlite, including concurrency submissions and
cross-role denial. PGlite does not replace testing applied SQL against staging
Supabase or live request isolation across deployed Worker instances.

## Repeatable local integration checks

The local harness runs the actual production Nitro routes and PostgreSQL migration
with simulated provider responses and authentication. It uses only fixture keys
and replaces inherited provider credentials before starting. It does not contact
live providers or production Supabase.

```sh
bun --bun run build
PORT=3101 HOST=127.0.0.1 bun --bun tests/e2e/fixtures/builtin-gateway.ts
# Separate terminal:
TRACER_TEST_BUILTIN=1 TRACER_TEST_BASE_URL=http://127.0.0.1:3101 bun --bun x playwright test --config playwright.web-app.config.ts tests/e2e/web-app/builtin-ai.spec.ts
```

Repeat with `TRACER_TEST_ENGINE=webkit`. Existing BYOK UI tests remain in
`tests/e2e/web-app/ai-reliability.spec.ts`.

For native UI checks, keep the harness running and start these in separate
terminals:

```sh
VITE_SUPABASE_URL='' VITE_SUPABASE_PUBLISHABLE_KEY='' VITE_TRACER_AI_GATEWAY_URL=http://127.0.0.1:3101 TRACER_BUILD_DIR=.nuxt-native-builtin-test bun --bun node_modules/nuxt/bin/nuxt.mjs dev --extends ./tests/e2e/desktop/builtin-fixture --host 127.0.0.1 --port 3102
bun --bun run tauri dev --no-watch --config tests/e2e/desktop/builtin-fixture/tauri.conf.json
```

This app has its own identifier and native SQLite data, simulated authentication,
and no personal API keys. Gateway requests use the actual Tauri HTTP plugin.
The localhost permission exists only in its test configuration. Use the toolbar
links to check Settings, Chat, Fact Check in Edit, PDF generation, and explicit
Practice grading. The normal Save action must use local grading. The native
balance must agree with `/api/ai/usage` for the fixture account.

## Diagnosing unavailable keys

Numbered local keys alone do not activate built-in AI. The server also needs the
feature flag, account cohort, dated verified capacity, service-role accounting
credential, and applied migration described above. Settings reports incomplete
activation/accounting separately from provider or transport failures. A public
website response at a desktop gateway URL is a deployment configuration error,
not a partially delivered AI answer.

For an explicitly authorized live smoke test with a tiny synthetic prompt, run
`bun --env-file=.env scripts/ai/probe-live.ts byok-fallback builtin-groq builtin-ollama builtin-openrouter builtin-google`.
This prints only success, answer length, attempted providers, elapsed time and
error names. It does not activate shared capacity or prove a free quota. The
fallback probe uses an eight-second first-answer deadline to reproduce a slow
primary without a long wait; normal application routing retains its deadline.

Other settings are account preferences shared by both AI modes. Enabling Hybrid
Practice opts into generating extra questions when starting practice, with one
built-in action per run. Local answer grading remains automatic and free;
explicit AI grading is separate.

The isolated Supabase project is now provisioned. See
[AI staging verification](ai-staging-verification.md) for the applied migrations,
the Supabase safe-update compatibility fix, live evidence, and repeatable local
commands. The isolated public staging Worker is deployed; production enablement
remains a separate rollout step.

OpenRouter built-in inference now pins `nvidia/nemotron-3.5-lightning:free`. Live
verification showed that `openrouter/free` can return safety classification
instead of an assistant answer, so the random router is rejected by admission.
This does not change users’ explicit BYOK model choices.
