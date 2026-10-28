import type { AppSettings } from '../../db/types'
import { BUILTIN_MODEL_ID,inferredAiMode } from './types'
export function effectiveAiSettings(settings:AppSettings):AppSettings {
  const aiMode=inferredAiMode(settings)
  return {...settings,aiMode,byokModelId:settings.defaultModelId===BUILTIN_MODEL_ID?null:settings.defaultModelId,
    byokFallbackModelIds:settings.fallbackModelIds.filter(id=>id!==BUILTIN_MODEL_ID),
    ...(aiMode==='builtin'?{defaultModelId:BUILTIN_MODEL_ID,fallbackModelIds:[]}:{}),
  }
}
