import { mapConcurrent } from './concurrency'
import { loadGeneratePlan } from './subscription'
import { assertGenerateSourceLimits, GENERATE_PLAN_LIMITS } from './source-extraction/limits'
import { getPdfPageCount } from './source-extraction/pdf-adapter'
import type { GenerateSourceFile } from './source-extraction/types'

export async function assertGenerateFileLimits(files: GenerateSourceFile[]) {
  const limits = GENERATE_PLAN_LIMITS[await loadGeneratePlan()]
  const imageCount = files.filter((file) => file.kind === 'image').length
  assertGenerateSourceLimits({ pdfPages: 0, imageCount }, limits)
  const counts = await mapConcurrent(files.filter((file) => file.kind === 'pdf'), 2,
    (source) => getPdfPageCount(source.file))
  assertGenerateSourceLimits({ pdfPages: counts.reduce((sum, count) => sum + count, 0), imageCount }, limits)
}
