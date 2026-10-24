import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const repository = '3icecreamsandwich/Tracer'
const channel = 'updater-beta'

export function validateBetaRelease(release, manifest) {
  if (release.isDraft || !release.isPrerelease || release.tagName === channel) {
    throw new Error('The beta feed requires a published versioned prerelease.')
  }
  if (`v${manifest.version}` !== release.tagName) {
    throw new Error('Manifest version does not match the release tag.')
  }
  if (!Number.isFinite(Date.parse(manifest.pub_date))) {
    throw new Error('The beta manifest needs a valid publication date.')
  }
  for (const [platform, extension] of [
    ['darwin-aarch64', '.app.tar.gz'],
    ['darwin-x86_64', '.app.tar.gz'],
    ['windows-x86_64', '.exe'],
    ['linux-x86_64', '.AppImage'],
  ]) {
    const entry = manifest.platforms?.[platform]
    const asset = release.assets.find(asset =>
      asset.apiUrl === entry?.url || asset.url === entry?.url
    )
    if (!entry?.signature?.trim() || !asset?.name.endsWith(extension)
      || !release.assets.some(candidate => candidate.name === `${asset.name}.sig`)) {
      throw new Error(`Missing signed release asset for ${platform}.`)
    }
  }
}

export function publishBetaFeed(tag) {
  if (!tag?.startsWith('v') || !tag.includes('-')) {
    throw new Error('Pass a versioned prerelease tag, such as v0.0.2-beta.')
  }
  const gh = (...args) => execFileSync('gh', args, { encoding: 'utf8' })
  const directory = mkdtempSync(join(tmpdir(), 'tracer-beta-feed-'))
  try {
    const release = JSON.parse(gh('release', 'view', tag, '--repo', repository,
      '--json', 'tagName,isDraft,isPrerelease,assets'))
    gh('release', 'download', tag, '--repo', repository, '--pattern', 'latest.json',
      '--dir', directory)
    const manifestPath = join(directory, 'latest.json')
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
    validateBetaRelease(release, manifest)

    // A missing channel is bootstrapped as a prerelease, never GitHub's stable latest.
    const releases = JSON.parse(gh('release', 'list', '--repo', repository,
      '--limit', '100', '--json', 'tagName,isDraft'))
    const existing = releases.find(release => release.tagName === channel)
    if (existing?.isDraft) throw new Error('The updater-beta channel must be published.')
    if (!existing) {
      gh('release', 'create', channel, '--repo', repository, '--prerelease',
        '--title', 'Tracer beta update feed', '--notes',
        'Updater manifest for beta builds. Installers are attached to versioned releases.')
    } else {
      const assets = JSON.parse(gh('release', 'view', channel, '--repo', repository,
        '--json', 'assets')).assets
      if (assets.some(asset => asset.name === 'latest.json')) {
        const currentDir = join(directory, 'current')
        gh('release', 'download', channel, '--repo', repository, '--pattern', 'latest.json',
          '--dir', currentDir)
        const current = JSON.parse(readFileSync(join(currentDir, 'latest.json'), 'utf8'))
        if (Date.parse(current.pub_date) > Date.parse(manifest.pub_date)) {
          throw new Error('Refusing to replace a newer beta feed with an older release.')
        }
      }
    }
    // Keep versioned URLs and signatures exactly as produced by Tauri.
    gh('release', 'upload', channel, manifestPath, '--repo', repository, '--clobber')
    console.log(`Beta update feed now serves ${manifest.version}.`)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishBetaFeed(process.argv[2])
}
