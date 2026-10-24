# Cloud-authoritative library

Signed-in clients read and write sets, study guides, folders, library ordering and
personal preferences through `src/composables/cloud-library`. Supabase is the
source of truth. A server acknowledgement is required for a successful edit.
The old SQLite repositories are retained explicitly as legacy/import tools;
SQLite is no longer the source of editable library content for configured clients.
Unconfigured development/demo environments retain the local repository behavior.

## Reads and writes

- IndexedDB stores disposable, account-scoped summaries and opened set contents.
  Cached reads render immediately. Summaries and opened details revalidate after
  30 seconds; Dashboard entry explicitly refreshes summaries in the background.
- Dashboard summary queries exclude terms and study-guide bodies and page in
  batches of 500. Opening an item fetches its body. Concurrent reads coalesce.
- Mutations send one changed record, require the expected server revision, and
  update memory only after acknowledgement. Disposable disk-cache writes run in
  the background and never delay a confirmed save. Storage connections and reads
  have bounded waits; failed connections can recover on the next access.
  Editor revisions belong to the draft,
  so refreshing another view cannot silently authorize a stale editor overwrite.
- Editing requires connectivity. Unsaved editor drafts are persisted separately
  from acknowledged content and restored after reload; a stale recovered draft
  must resolve its revision conflict before it can replace cloud content.
- Deletes retain server tombstones. Device import cannot resurrect them.
- Device lock/update/window settings and credentials remain device-specific.
  Existing study progress, starred cards, linked-folder paths and saved chats
  still use device storage; local set-ID anchors preserve their foreign keys.
  These records are not yet cross-device cloud data.

## Migration and rollout

Apply `supabase/migrations/20261018232117_cloud_authoritative_library.sql` before
shipping updated web or desktop clients. It adds owner-isolated library records,
a security-invoker summary view, revision-checked writes and an insert-only import
RPC. It copies existing cloud private sets/guides without deleting the old table.
No production migration is performed merely by building the app.

On first access, each device/account imports its existing SQLite sets, guides,
folders, ordering and personal preferences in batches of at most 100 records.
Existing cloud content wins. Divergent device sets/guides become labelled recovery
copies. Original SQLite content remains available for recovery. A durable SQLite
receipt is written only after every batch succeeds; clearing the disposable cache
does not cause an old library to be imported again. Failed batches can be retried.

Deploy web and updated desktop builds together and require users to update old
clients: old clients still write `private_sets`, while new clients use
`cloud_library_items`. There is intentionally no ongoing two-way synchronization
between those APIs. Retain legacy tables/data through the rollout; do not delete
local originals or the old cloud table as part of deploying this migration.

## Validation

`tests/unit/cloud-library.test.ts` covers cached reads, cloud acknowledgement,
revision conflicts, account isolation, deletion and complete collection caching.
`tests/unit/private-set-sync.test.ts` covers one-time import, failure retries,
batching and concurrent startup. `tests/db/cloud-library.sql` runs transactionally
against a migrated local Supabase/Postgres database and rolls back its fixtures.
It checks RLS, anonymous denial, summary projection, conflicts, recovery imports
and tombstones. Browser coverage in `tests/e2e/web-app/library.spec.ts` exercises
Edit navigation, cloud saves, reloads/tabs and failed-save draft recovery against
a mocked server without real user accounts or production writes.

Validation in this implementation session: production Nuxt build and diff checks
passed; three mocked-server browser flows passed (save/reload/tab continuity,
failed-save recovery, fresh-device continuity). The SQL migration and transactional
assertions passed in embedded PostgreSQL (PGlite), including existing-cloud backfill.
A fake IndexedDB check verified persistence after clearing memory and owner isolation.
The full Vitest run had 409 passing tests and two existing Settings-related failures:
`db-flashcard-autosave-roundtrip` omits the automatic-updates migration in its fixture,
and `streamlined-copy` expects a Settings description absent from the current
working-tree Settings page. Additional import-receipt coverage passed separately.
Installed desktop behavior and frontend deployment remain unverified.

The backend migration was subsequently applied to the configured Tracer Supabase
project on 2026-10-18 after a dev client reported a Dashboard load failure. Its local
filename matches the recorded remote migration version.
