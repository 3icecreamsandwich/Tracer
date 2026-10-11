/**
 * Keep study images responsive without changing small files or SVGs. The
 * original stays on the user's device until they choose to save the set.
 */
export async function optimizeTermImage(file: File, mimeType: string): Promise<{ dataUrl: string; mimeType: string }> {
  if (mimeType === 'image/svg+xml' || file.size <= 750_000 || typeof document === 'undefined') {
    return { dataUrl: await fileToDataUrl(file, mimeType), mimeType }
  }

  try {
    const sourceUrl = URL.createObjectURL(file)
    const image = new Image()
    try {
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve()
        image.onerror = () => reject(new Error('Image could not be read'))
        image.src = sourceUrl
      })
      const longestSide = Math.max(image.naturalWidth, image.naturalHeight)
      const scale = longestSide > 2000 ? 2000 / longestSide : 1
      const canvas = document.createElement('canvas')
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))
      const context = canvas.getContext('2d')
      if (!context) throw new Error('Image optimization is unavailable')
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      const output = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.85))
      if (!output) throw new Error('Image optimization failed')
      return { dataUrl: await fileToDataUrl(output, 'image/webp'), mimeType: 'image/webp' }
    } finally {
      URL.revokeObjectURL(sourceUrl)
    }
  } catch {
    // A file that a browser cannot transcode remains usable as originally chosen.
    return { dataUrl: await fileToDataUrl(file, mimeType), mimeType }
  }
}

async function fileToDataUrl(file: Blob, mimeType: string): Promise<string> {
  const buffer = await file.arrayBuffer()
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return `data:${mimeType};base64,${btoa(binary)}`
}
