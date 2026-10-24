import { useTracerDb } from './db'
import { initializeCloudLibrary } from './cloud-library/migrate'

/** Compatibility entry point. Imports legacy device data once, then only refreshes cloud caches. */
export async function syncPrivateSets(): Promise<boolean> {
  await initializeCloudLibrary(await useTracerDb())
  return true
}
