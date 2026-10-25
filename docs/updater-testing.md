# Testing beta desktop updates

The current beta app checks the persistent `updater-beta/latest.json` release
asset. The optional
`src-tauri/tauri.updater-test.conf.json` overlay instead checks the explicit
`v0.0.2-beta` release. It overrides only the endpoint; the base configuration's
version, public signing key, identifier, and installer settings are retained.

The test overlay is a fixed destination, not automatic discovery of future betas.
Change the tag in the overlay when testing another release.

## Check and download

```sh
bun run tauri:dev:update-test
```

The destination must be a published release (a prerelease is fine), containing
`latest.json` and the signed update assets it references. Draft releases are not
publicly downloadable. The destination version must be newer than the running
app; this overlay does not bypass version comparison or signature verification.

## Install and restart

Test installation from an installed release build, rather than the development
executable. Build version A with the test overlay before changing the source to
version B. For example, on macOS:

```sh
bun run tauri:build:update-test --bundles app,dmg
```

Supply the usual updater signing credentials when building. Install version A,
then build and publish version B (`v0.0.2-beta` for this overlay) using the release
workflow. Keep the GitHub release marked as a prerelease. The version in
`tauri.conf.json` must match the release tag without its leading `v`; keep the
Cargo package version aligned too.

Verify all platform builds and the manifest before publishing. The manifest's
asset URLs must point to the published version B assets. In installed version A,
check/download, cancel the restart once, then confirm and verify version B opens
with existing data intact. Repeat on each supported platform.

Normal `tauri:dev`, `tauri:build`, and the release workflow do not use the test
overlay. The release workflow embeds the beta feed for prerelease versions and
GitHub's stable latest endpoint for stable versions. The feed publisher runs when
a versioned prerelease is published, validates all platform assets, and copies its
manifest to `updater-beta` without altering signed URLs or signatures. The channel
release itself remains a prerelease, so stable clients never select it.

The originally distributed `0.0.2-beta` used the stable endpoint. Its embedded URL
cannot be changed remotely; install a build containing the beta-channel fix to
continue beta updates. Do not reset local data to fix this network error.

To seed or repair the channel after all assets are uploaded:

```sh
node scripts/releases/publish-beta-feed.mjs v0.0.2-beta
```

This requires authenticated GitHub CLI release-write access. It refuses drafts,
incomplete manifests, and replacing a feed with an earlier publication date.

If the destination tag has not been published or lacks `latest.json`, expect an
update-check error. Creating this configuration does not publish a release.

## Repair missing macOS updater assets

A DMG is a manual installer, not the archive consumed by the updater. macOS
release builds must include `--bundles app,dmg` to generate the signed
`.app.tar.gz` archive. The universal archive must be listed for both
`darwin-aarch64` and `darwin-x86_64` (or their `-app` variants) in `latest.json`.

The Desktop Release workflow supports manual dispatch with an existing `tag`,
`platform=macos`, and `published=true` for an already published release. It checks
out that tag, rebuilds the universal app, merges the macOS manifest entries, and
validates both architectures. Windows and Linux assets are retained. Leave
`published=false` when rebuilding an existing draft release.

Set `verify_only=true` to validate already uploaded macOS assets without compiling
again. Validation resolves each manifest URL against release metadata, supporting
both GitHub asset API URLs and direct browser download URLs.

## macOS Keychain after updating

Tracer reads its vault credential from the macOS login Keychain at startup.
Ad-hoc signed builds can be treated as a different application after an update,
causing macOS to request authorization again. A stable Developer ID signing
identity and designated requirement should be used for distributed builds.
Updater artifact signing is separate from Apple application signing. Do not
delete Keychain entries or disable credential protection to suppress this prompt.
