export type VaultSecretErrorShape = {
  code: string
  message: string
}

export function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

export function toVaultSecretError(err: unknown): VaultSecretErrorShape {
  if (isRecord(err) && typeof err.code === 'string' && typeof err.message === 'string') {
    return { code: err.code, message: err.message }
  }
  if (err instanceof Error) return { code: 'unknown', message: err.message }
  return { code: 'unknown', message: typeof err === 'string' ? err : 'Unexpected error' }
}

export class VaultSecretError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = 'VaultSecretError'
    this.code = code
  }
}
