export type GenerateSourceLimits = { pdfPages: number; images: number }
export const GENERATE_PLAN_LIMITS = {
  free: { pdfPages: 15, images: 10 },
  plus: { pdfPages: 25, images: 15 },
  pro: { pdfPages: 50, images: 30 }
} as const

export const MAX_GENERATE_PDF_PAGES = 15
export const MAX_GENERATE_IMAGES = 10

export function assertGenerateSourceLimits(input: { pdfPages: number; imageCount: number }, limits: GenerateSourceLimits = GENERATE_PLAN_LIMITS.free) {
  if (input.imageCount > limits.images) {
    throw new Error(`Too many images selected. Max is ${limits.images}; selected files contain ${input.imageCount} images.`)
  }

  if (input.pdfPages > limits.pdfPages) {
    throw new Error(`PDF page limit exceeded. Max is ${limits.pdfPages} pages total; selected PDFs contain ${input.pdfPages} pages.`)
  }
}
