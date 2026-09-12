# Initial preview validation

Preview: https://tracer-app-preview.akatagunta.workers.dev

- Published September 11, 2026 (America/Los_Angeles).
- Current Worker version: `224f0e4c-dd22-41ce-b27a-92835abf1118`.
- Source: the release-branch commit that records this validation; the deployed
  application source matches it.
- Worker upload: 919.36 KiB, 174.12 KiB gzip. Startup initialization: 20 ms
  (this is not per-request CPU usage).
- All 320 unit tests passed across 72 files, including account/rate-binding and
  authenticated AI-proxy tests.
- 7 browser tests passed on the public preview.
  This covers persistence across reload/tabs, account isolation, phone layouts,
  unauthenticated API rejection, early request caps, deep links and asset MIME/cache
  headers for browser DB, SQLite WASM, PDF and OCR workers.
- An additional public-preview browser test confirms Google OAuth requests the
  preview `/auth/callback` URL. A designated account can sign in to the preview.
- Desktop static generation passed after the Create-page focus race fix.
- Landing repository builds all 19 pages with localized Open Tracer links;
  these changes are prepared locally and not deployed.
- Live Worker telemetry identified the initial AI failure before any provider
  response: workerd rejects Fetch API `redirect: "error"`. The proxy now uses
  manual redirect handling and converts every upstream 3xx response to a safe
  502 instead of following it. Prompts, provider keys, and request headers remain
  absent from diagnostic logs.

Not yet validated: real Google/email confirmation and token refresh, a complete
provider response rendered in the signed-in UI after the proxy correction,
upload extraction, classrooms/publication, real Safari/iOS,
representative CPU/request usage, and production custom-domain behavior.
Browser fixtures do not prove these flows. The designated account is authorized
for new disposable content only; no preexisting account content was modified.

Open prerequisites: GitHub environment secrets/variables and release access;
GitHub Models OAuth client ID (currently absent). No production Worker/domain or landing
release has been published. No paid upgrade was enabled.

Cloudflare platform references: [limits](https://developers.cloudflare.com/workers/platform/limits/)
and [pricing](https://developers.cloudflare.com/workers/platform/pricing/).
At validation time, Workers Free lists 100,000 requests/day, 10 ms CPU/request,
and 3 MB compressed code. Static asset requests are free. The bundle fits the
code limit; representative authenticated request CPU still needs measurement.
