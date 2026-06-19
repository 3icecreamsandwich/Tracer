export function assertGenerateSourceLimits(input: { pdfPages: number; imageCount: number }) {
  if (input.imageCount > 10) {
    throw new Error(`Too many images selected. Max is 10; selected files contain ${input.imageCount} images.`)
  }

  if (input.pdfPages > 10) {
    throw new Error(`PDF page limit exceeded. Max is 10 pages total; selected PDFs contain ${input.pdfPages} pages.`)
  }
}
