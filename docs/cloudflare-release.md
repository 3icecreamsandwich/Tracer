# Cloudflare release guide

Tracer shares one application between desktop and web. Release from
`3icecreamsandwich/tracer`; leave the `tracerlandpage` Pages project and
`3icecreamsandwich/tracer-www` repository separate. Both Workers use `/`.

## Account setup

Use account `ebb46f6b87971427afbdb712784fcdd7`. Preview is
`https://tracer-app-preview.akatagunta.workers.dev`; production is
`https://app.tracerquiz.com`. These addresses are intended targets, not evidence
that a deployment exists.

1. Create GitHub environments `preview` and `production` in the release repository.
   Restrict production to `main` and configure a required reviewer if available.
2. Store a scoped Cloudflare token as the `CLOUDFLARE_API_TOKEN` environment secret.
   It needs Workers Scripts Edit for this account. Manage the custom domain through
   the connected Cloudflare account separately; CI does not need DNS edit access.
   Connector authorization is not a Wrangler or GitHub Actions credential.
3. Set environment variables `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_PUBLISHABLE_KEY` to the existing Tracer project values
   (`qhxvznvummjtypytcxlw`). Set `VITE_GITHUB_OAUTH_CLIENT_ID` for GitHub Models.
   Optionally set `NUXT_WEB_AI_COMPATIBLE_ORIGIN` to one trusted HTTPS origin.
   These identifiers are public. Never supply a service-role key or provider key.
   Provider credentials continue to be read through the signed-in user's Vault RPC.
4. In Supabase Auth URL Configuration, preserve all existing redirects and add:
   - `https://tracer-app-preview.akatagunta.workers.dev/auth/callback`
   - `https://app.tracerquiz.com/auth/callback`
   Verify email confirmation templates honor the requested redirect and retain
   desktop/landing behavior. Test Google, email confirmation, refresh, and expiry.

For a local build, public values can come from `.env`. Run:

```sh
bun install --frozen-lockfile
bun run build:cloudflare
bun x wrangler deploy --config .wrangler/tracer.json --dry-run
bun run test:e2e:cloudflare
```

The build creates `.output-cloudflare` and ignored `.wrangler/tracer.json` with
the public configuration resolved. Rebuild before deploying; do not deploy the
unresolved root configuration. `bun run preview:cloudflare` runs local workerd.
For an authorized local release, sign in with `bun x wrangler login`, then use
`bun run deploy:cloudflare:preview` or `bun run deploy:cloudflare:production`.

## Release gates

Pull requests run unit tests, the Cloudflare build/dry-run, Chromium tests against
workerd, and desktop static generation. Every push to `main` in
`3icecreamsandwich/tracer` runs the same checks and automatically deploys the
tested commit to production after they pass. Production releases are serialized.
The workflow can also be manually dispatched from `main` to deploy either preview
or production. It records the commit and Cloudflare Worker version in its summary
and release-log artifact. Use the preview target for authenticated release checks
before merging changes that materially affect production behavior.

Automated browser tests use fake account responses, with no real account writes
or provider charges. Complete and record these checks on the deployed preview
with a designated test account before launching production:

- Set creation/editing/reload, multiple tabs, sign-out and account switching.
- 320px/390px and desktop layouts; real Safari/iOS device operation.
- Google/email sign-in, confirmation callbacks, token refresh and expired sessions.
- Upload extraction (PDF/images/OCR), generation, synthesis, chat, streaming,
  cancellation, provider errors and timeouts.
- Classroom permissions and explicit publication with disposable test content.
- Unauthorized requests, oversized requests, blocked provider destinations,
  verified-account rate limiting, and no credentials in responses/logs.
- Worker CPU and request usage under representative traffic against the account's
  current free limits; compressed Worker size from Wrangler's dry-run output.
  Do not enable a paid upgrade. If limits prevent launch, stop and report the need.

The rate binding allows approximately 120 requests per minute per verified account.
It is local abuse protection, not a globally exact quota or billing counter.
The wrapper bounds bodies before Nitro buffers them: 5 MiB for AI and 64 KiB for
other requests. Static fingerprinted assets are immutable; authenticated API
responses are private/no-store. All app responses are excluded from indexing.
Application log payloads contain only a fixed route category, status, and milliseconds
until response headers; they do not record bearer tokens, bodies, or query strings.
Cloudflare may attach request URL metadata to these records. Keep credentials out
of API URLs, and inspect platform metadata as well as application payloads during QA.
Streaming time is not included in this latency figure.

Run the same automated suite against the deployed preview using
`TRACER_TEST_BASE_URL=https://tracer-app-preview.akatagunta.workers.dev/ bun run test:e2e:cloudflare`.
Keep the local build available for checking emitted asset filenames. This suite
still uses fixture accounts; it does not replace the authenticated manual checks.

## Public launch

1. Deploy the validated commit to `tracer-app`.
2. Attach `app.tracerquiz.com` as its Worker custom domain in the existing zone.
   Do not alter the apex Pages assignment. Verify DNS, HTTPS, callback routes,
   deep links, APIs and SQLite/PDF/OCR assets through the public address.
3. Repeat authenticated smoke checks and record Worker version, commit, date,
   test results, and observed limits in the release record.
4. Only then deploy localized **Open Tracer** navigation links in `tracer-www`.
   Browser-local sets are not automatically uploaded or synchronized with desktop.

## Rollback

List versions with `bun x wrangler versions list --config .wrangler/tracer.json
--env production`. Roll back to a recorded known-good version:

```sh
bun x wrangler rollback VERSION_ID --config .wrangler/tracer.json --env production
```

Verify app/auth/API behavior after rollback. This reverts Worker code, not browser
databases or Supabase data. Do not reverse database migrations as part of this step.

If the initial launch has no good prior version, remove the landing link and set
`TRACER_MAINTENANCE` to `1` on the production Worker to serve a temporary 503.
For a code deployment, change that value in the generated production config
before deploying. Rebuilding resets it to the source configuration (`0`); review
this deliberately before restoring service. Static assets can still be served
while application routes display maintenance. Keep the custom domain attached.
