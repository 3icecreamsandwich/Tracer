export const MAX_GENERATE_PDF_PAGES = 50
export const MAX_GENERATE_IMAGES = 10

export function assertGenerateSourceLimits(input: { pdfPages: number; imageCount: number }) {
  if (input.imageCount > MAX_GENERATE_IMAGES) {
    throw new Error(`Too many images selected. Max is ${MAX_GENERATE_IMAGES}; selected files contain ${input.imageCount} images.`)
  }

  if (input.pdfPages > MAX_GENERATE_PDF_PAGES) {
    throw new Error(`PDF page limit exceeded. Max is ${MAX_GENERATE_PDF_PAGES} pages total; selected PDFs contain ${input.pdfPages} pages.`)
  }
}
