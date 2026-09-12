# Initial preview validation

Preview: https://tracer-app-preview.akatagunta.workers.dev

- Published September 11, 2026 (America/Los_Angeles).
- Worker version: `0db061d6-91c7-4a3f-a919-2d3be23e5166`.
- Source: deployment implementation on top of `f787d1e`; see the commit adding
  this record. No application source changed between build and preview testing.
- Worker upload: 918.88 KiB, 173.97 KiB gzip. Startup initialization: 21 ms
  (this is not per-request CPU usage).
- All 318 unit tests passed across 72 files, including account/rate-binding tests.
- 6 browser tests passed on local workerd and all 6 passed on the public preview.
  This covers persistence across reload/tabs, account isolation, phone layouts,
  unauthenticated API rejection, early request caps, deep links and asset MIME/cache
  headers for browser DB, SQLite WASM, PDF and OCR workers.
- Desktop static generation passed after the Create-page focus race fix.
- Landing repository builds all 19 pages with localized Open Tracer links;
  these changes are prepared locally and not deployed.

Not yet validated: real Google/email confirmation and token refresh, provider
generation/streaming, upload extraction, classrooms/publication, real Safari/iOS,
representative CPU/request usage, and production custom-domain behavior.
Browser fixtures do not prove these flows. The designated account is authorized
for new disposable content only; no preexisting account content was modified.

Open prerequisites: Supabase redirect configuration access; designated-account
browser sign-in; GitHub environment secrets/variables and release access; GitHub
Models OAuth client ID (currently absent). No production Worker/domain or landing
release has been published. No paid upgrade was enabled.

Cloudflare platform references: [limits](https://developers.cloudflare.com/workers/platform/limits/)
and [pricing](https://developers.cloudflare.com/workers/platform/pricing/).
At validation time, Workers Free lists 100,000 requests/day, 10 ms CPU/request,
and 3 MB compressed code. Static asset requests are free. The bundle fits the
code limit; representative authenticated request CPU still needs measurement.
