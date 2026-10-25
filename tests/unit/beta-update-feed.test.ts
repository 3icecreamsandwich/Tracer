import { describe, expect, it } from 'vitest'
import { validateBetaRelease } from '../../scripts/releases/publish-beta-feed.mjs'

function fixture() {
  const release = { tagName: 'v0.0.2-beta', isDraft: false, isPrerelease: true, assets: [] as any[] }
  const manifest = { version: '0.0.2-beta', pub_date: '2026-10-24T23:00:00Z', platforms: {} as Record<string, any> }
  for (const [platform, name] of [
    ['darwin-aarch64', 'Tracer_universal.app.tar.gz'],
    ['darwin-x86_64', 'Tracer_universal.app.tar.gz'],
    ['windows-x86_64', 'Tracer_setup.exe'],
    ['linux-x86_64', 'Tracer.AppImage'],
  ]) {
    const apiUrl = `https://api.github.com/repos/3icecreamsandwich/Tracer/releases/assets/${platform}`
    const url = `https://github.com/3icecreamsandwich/Tracer/releases/download/v0.0.2-beta/${name}`
    release.assets.push({ name, apiUrl, url }, { name: `${name}.sig` })
    manifest.platforms[platform] = { url: apiUrl, signature: 'signed-content' }
  }
  return { release, manifest }
}

describe('beta updater feed', () => {
  it('accepts GitHub API asset URLs for both Mac architectures', () => {
    const { release, manifest } = fixture()
    expect(() => validateBetaRelease(release, manifest)).not.toThrow()
  })

  it('also accepts direct download URLs', () => {
    const { release, manifest } = fixture()
    for (const entry of Object.values(manifest.platforms)) {
      entry.url = release.assets.find(asset => asset.apiUrl === entry.url)!.url
    }
    expect(() => validateBetaRelease(release, manifest)).not.toThrow()
  })

  it('rejects drafts, stable releases, and version mismatches', () => {
    const { release, manifest } = fixture()
    expect(() => validateBetaRelease({ ...release, isDraft: true }, manifest)).toThrow()
    expect(() => validateBetaRelease({ ...release, isPrerelease: false }, manifest)).toThrow()
    expect(() => validateBetaRelease(release, { ...manifest, version: '0.0.3-beta' })).toThrow()
  })

  it('does not publish a partial manifest', () => {
    const { release, manifest } = fixture()
    delete manifest.platforms['darwin-aarch64']
    expect(() => validateBetaRelease(release, manifest)).toThrow('darwin-aarch64')
  })

  it('requires a signature and its published asset', () => {
    const { release, manifest } = fixture()
    manifest.platforms['windows-x86_64'].signature = ''
    expect(() => validateBetaRelease(release, manifest)).toThrow('windows-x86_64')
    const fresh = fixture()
    fresh.release.assets = fresh.release.assets.filter(asset => !asset.name.endsWith('.sig'))
    expect(() => validateBetaRelease(fresh.release, fresh.manifest)).toThrow()
  })
})
