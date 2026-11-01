# AI stability changes, October 31, 2026

Production database and Worker changes are applied. Both new migrations were
recorded using the official Supabase CLI repair workflow with the local versions.

- Removed per-account burst and concurrent-action admission caps. Monthly 65-action
  accounting, idempotency, input/output bounds and provider quota reservations remain.
- Explicitly finalize streaming generators on disconnect; aborted reads cancel the
  reader, and client cancellation does not cool down a healthy provider.
- Return an admission acknowledgement before provider I/O. Provider first-text and
  idle deadlines are 30 seconds, within the 180-second overall action deadline.
  Completed chat text no longer waits behind word-reveal animations.
- Revalidate an expired operator-enabled pinned OpenRouter free model using its
  catalog price, context capacity and key free quota. Checks are deduplicated for
  60 seconds and fail closed. No paid fallback or unverified provider is enabled.
- Deduplicate capacity synchronization per configuration for 60 seconds; cleanup
  of expired private results and sessions runs in bounded maintenance batches.
  Expired leases do not count against usable capacity or account reservations.
- Apply existing math repair to the default Markdown renderer as well as cards.
  This improves shared rendering consistency; the specific reported transient
  red-LaTeX case has not been reproduced in the native app.
- Change cloud-library revision conflicts from SQLSTATE 40001 to PT409. The former
  is a retryable transaction serialization error; a stale revision cannot be
  repaired by retrying the same transaction. Client compatibility accepts both
  codes and preserves the draft.

## Verification

- 560 unit tests in 105 files passed, including PostgreSQL-backed conflict,
  admission, recovery, reader cancellation and free-capacity tests.
- Five Chromium and five WebKit built-in-AI integration flows passed with the
  local real gateway/PostgreSQL fixture and controlled provider/auth transport.
- Node and Cloudflare production builds passed.
- Four live provider operations passed with synthetic content. Generation needed
  one internal format repair within the original action.
- Production and staging AI functions were checked; production migration history
  includes 20261101044013 and 20261101044158. The latter affects only production's
  cloud-library schema, absent from the isolated AI-only staging project.
- Production logs had 86,178 stale-revision conflict errors over the preceding day.
  The cumulative session-setup counter rose about 805,000 across the earlier sample
  interval and only 45 across a later interval after the conflict fix. Intervals
  differ; these are supporting evidence, not a direct CPU measurement. Dashboard
  CPU recovery still needs observation.
- Native Tracer was not running; the UI automation attempt to open it timed out.
  No new native end-to-end success is claimed.

Only the previously verified provider is enabled. Rotating sibling credentials
must not bypass shared provider quotas. No per-minute account limit remains;
provider exhaustion can still cause temporary unavailability. The 65-action
monthly allowance remains unchanged.
