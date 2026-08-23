import { curatedModelsByProvider, curatedProviders } from '../catalog'
import type { AiRegistryCatalog } from './types'

export function aiRegistryCatalog(): AiRegistryCatalog {
  return {
    providers: curatedProviders,
    modelsByProvider: curatedModelsByProvider
  }
}
