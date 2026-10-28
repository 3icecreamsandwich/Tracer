import type { BrowserContext } from '@playwright/test'

/** Account-scoped fake server; each browser context gets an independent cloud. */
export async function installCloudLibraryFixture(context: BrowserContext, owner: string, rows = new Map<string, any>()) {
  const requests: string[] = []
  let rejectWrites = false
  await context.route('**/rest/v1/**cloud_library**', async route => {
    const request = route.request()
    const url = new URL(request.url())
    requests.push(url.pathname)
    const input = request.postDataJSON()
    const rowOwner = url.searchParams.get('owner_id')?.replace(/^eq\./, '') || owner
    if (url.pathname.endsWith('/rpc/import_cloud_library_items')) {
      for (const item of input.items) {
        const key = `${owner}:${item.kind}:${item.id}`
        if (!rows.has(key)) rows.set(key, { ...item, owner_id: owner, revision: 1, deleted: false })
      }
      return route.fulfill({ headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET, POST, OPTIONS" }, json: null })
    }
    if (url.pathname.endsWith('/rpc/save_cloud_library_item')) {
      if (rejectWrites) return route.fulfill({ headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET, POST, OPTIONS" }, status: 503, json: { message: 'Cloud unavailable' } })
      const key = `${owner}:${input.item_kind}:${input.item_id}`
      const current = rows.get(key)
      if ((current?.revision ?? 0) !== input.expected_revision) return route.fulfill({ headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET, POST, OPTIONS" }, status: 409, json: { code: '40001', message: 'Revision conflict' } })
      const saved = { owner_id: owner, kind: input.item_kind, id: input.item_id, payload: input.item_payload, revision: (current?.revision ?? 0) + 1, deleted: input.item_deleted }
      rows.set(key, saved)
      return route.fulfill({ headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET, POST, OPTIONS" }, json: saved })
    }
    const kind = url.searchParams.get('kind')?.replace(/^eq\./, '')
    const id = url.searchParams.get('id')?.replace(/^eq\./, '')
    let data = [...rows.values()].filter(row => row.owner_id === rowOwner && (!kind || row.kind === kind) && (!id || row.id === id))
    if (url.pathname.endsWith('/cloud_library_summaries')) {
      data = structuredClone(data)
      for (const row of data) {
        if (row.kind === 'set') { row.payload.cardCount = row.payload.terms.length; delete row.payload.terms }
        if (row.kind === 'guide') delete row.payload.markdown
      }
      return route.fulfill({ headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET, POST, OPTIONS" }, json: data })
    }
    return route.fulfill({ headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET, POST, OPTIONS" }, json: data[0] ?? null })
  })
  return { rows, requests, failWrites: (fail: boolean) => { rejectWrites = fail } }
}
