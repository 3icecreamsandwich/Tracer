# Initial production validation

Production: https://app.tracerquiz.com

- Published September 11, 2026 (America/Los_Angeles) from commit `4adf6d6`.
- Worker: `tracer-app`; version: `fb795f5a-10bd-45a1-b68a-772ba5a855e2`.
- Custom domain ID: `8aac18ffc40abb37b6f9677661418545121105bb`.
  Cloudflare created the proxied DNS record and issued the managed certificate.
- Worker upload: 919.36 KiB, 174.10 KiB gzip. Startup initialization: 32 ms
  (this is not per-request CPU usage).
- The Cloudflare production build completed and all 17 focused authenticated
  AI proxy, target allowlist, and server authentication tests passed.
- All 7 production browser tests passed in 51.7 seconds. They cover the OAuth
  callback target, body caps and API cache controls, deep links and emitted asset
  types, browser-library persistence across reloads and tabs, 320px/390px mobile
  layouts, unauthenticated API rejection, and browser data isolation on account
  switching.
- HTTPS returned 200 from the custom domain. The Supabase Google authorization
  endpoint accepted the exact production callback and redirected to Google with
  `https://app.tracerquiz.com/auth/callback` preserved.
- Cloudflare observability is enabled. Production smoke events identify the fixed
  API route category, status, and response-header latency without application log
  payloads containing bearer tokens, request bodies, or query strings.
- The account remains on its existing free plan. No paid feature or billing change
  was enabled.

The designated account validated the core application features on the matching
preview build before promotion. The automated production suite uses fixture
accounts and performs no writes to real Supabase account data.

The landing-page repository remains a separate release. Its prepared localized
Open Tracer links have not been deployed as part of this Worker launch.

Rollback commands and the initial-launch maintenance procedure are in
`docs/cloudflare-release.md`.
