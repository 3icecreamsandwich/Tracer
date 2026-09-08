# Tracer web app

The desktop and web apps are two targets of this repository. Pages, components,
study logic, SQL migrations, account services, classroom services and explicit
publication flows are shared. Make feature changes here and validate both targets;
do not copy the app into the landing-page repository.

## Development

Install dependencies with `bun install`, then run `bun --bun run dev:web` (port 3001).
The ordinary browser target is the real app. Set `VITE_TRACER_WEB_PREVIEW=1` only
for the old screenshot/demo workflow. `/set/demo` remains a demonstration route.
Desktop development continues to use `bun run tauri:dev`.

Use the same `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` as desktop.
These are public client configuration, never a service-role key. The web server
verifies the user's bearer token and accesses the existing API-key Vault RPCs as
that user. Saved provider keys remain on the server; only presence flags reach
the browser. GitHub Models also requires `VITE_GITHUB_OAUTH_CLIENT_ID`.

## Hosting at app.tracerquiz.com

`app.tracerquiz.com` is a subdomain and uses the default `/` base path. Keep the
landing page at `tracerquiz.com` in its current project and link to the app.

1. Build with `bun --bun run build:web` using the configuration above.
2. Deploy the complete `.output` directory to a Node-compatible host and run
   `node .output/server/index.mjs`. Supply the same Supabase configuration at
   runtime (or `NUXT_SUPABASE_URL` and `NUXT_SUPABASE_PUBLISHABLE_KEY`).
3. Point the app subdomain at that deployment and enable HTTPS. Browser storage
   uses Web Locks, IndexedDB and a Web Worker and needs a modern secure browser.
4. Add `https://app.tracerquiz.com/auth/callback` to Supabase's allowed redirect
   URLs, preserving desktop and landing-page redirects. Add the local development
   callback URL when testing sign-in locally.
5. Preserve streaming for `/api/web/ai`; disable proxy buffering and allow at
   least 180 seconds for AI responses. Apply request/rate limits at the gateway
   as well as the app's per-process limits. Do not cache authenticated API routes.

This target needs its server routes; a static-only `nuxt generate` deployment
cannot provide cloud AI. Desktop's static generation remains separate.

For deployment under a directory, set `NUXT_APP_BASE_URL=/app/` **at build time
and runtime** and allow the corresponding `/app/auth/callback` redirect. Browser
storage and API URLs are scoped to that base path. Moving origins or base paths
does not migrate browser-local libraries.

OpenAI-compatible endpoints are optional: set `NUXT_WEB_AI_COMPATIBLE_ORIGIN`
to a trusted HTTPS provider origin on the server. Arbitrary endpoints, loopback
addresses and local models are not enabled on the web.

## Data and feature behavior

Accounts, roles, published sets and classrooms use the existing Supabase project.
Each signed-in account gets its own browser-local SQLite database. The database
runs in a worker and persists changed pages in IndexedDB, with cross-tab locking.
Desktop continues to use native SQLite. New sets and study progress are not
automatically uploaded or synchronized between devices. Browser data can be lost
if site storage is cleared; explicit existing publication remains available.

Web creation uses file uploads and cloud AI. Native folder watching, local models
and the desktop vault/startup lock remain desktop capabilities. Responsive shared
pages use compact controls, mobile gutters, safe-area spacing and touch targets.

## Validation

Run `bun x vitest run`, `bun --bun run build:web`, and
`bun x playwright test --config playwright.web-app.config.ts` after installing
Playwright Chromium. Repeat the browser suite with `TRACER_TEST_BASE_PATH=/app/`
to check directory hosting. The browser suite uses fake account responses and
does not charge AI providers or write to real accounts. Live OAuth, provider
streaming and classroom permissions need staging checks with configured accounts
before public launch. Test the native build for shared changes too.

To test the production server instead of Vite, build first and run the browser
suite with `TRACER_TEST_PRODUCTION=1`. Its base-path setting must match the build.
If desktop development is running concurrently, use
`TRACER_BUILD_DIR=.nuxt-web-build bun --bun run build:web` to isolate build files.

Current automated coverage includes creating/editing sets, persisted flashcard
progress across reloads/tabs, account-isolated libraries, mobile layouts at 320px
and 390px, unauthorized API access, request limits and safe provider forwarding.
Large-library performance and real Safari/iOS device behavior remain staging QA.
