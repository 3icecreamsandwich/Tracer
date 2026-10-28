import { BuiltinAiError } from '../../../src/composables/ai/builtin/types'
export type Candidate = { id: string; provider: string; model: string; key: string; group: string; rpm: number; rpd: number; tpm: number; tpd: number; concurrency: number; context: number; resetTimezone: string; verifiedUntil: string }
const providers: Record<string, { prefix: string; model: string }> = {
  groq: { prefix: 'GROQ_KEY_', model: 'openai/gpt-oss-20b' },
  ollama: { prefix: 'OLLAMA_CLOUD_KEY_', model: 'nemotron-3-nano:30b-cloud' },
  openrouter: { prefix: 'OPENROUTER_KEY_', model: 'nvidia/nemotron-3.5-lightning:free' },
  google: { prefix: 'GEMINI_KEY_', model: 'gemma-4-26b-a4b-it' },
  cloudflare: { prefix: '', model: '@cf/ibm-granite/granite-4.0-h-micro' },
}
export function gatewayConfig(env: Record<string, any>, userId: string, now = Date.now()) {
  const cohort = String(env.BUILTIN_AI_COHORT || '').split(',').map(x => x.trim())
  const enabled = env.BUILTIN_AI_ENABLED === '1' && (cohort.includes('*') || cohort.includes(userId))
  let manifest: any[] = []
  try { manifest = JSON.parse(env.BUILTIN_AI_CAPACITY || '[]') } catch { /* fail closed */ }
  if (!Array.isArray(manifest)) manifest = []
  const candidates: Candidate[] = []
  for (const entry of manifest) {
    const provider = providers[entry.provider]
    // Admission requires a dated operator verification of free capacity, model
    // availability, and all feature contracts. No undocumented default quotas.
    if (!provider || entry.freeVerified !== true || Date.parse(entry.verifiedUntil) <= now || !Number.isFinite(Date.parse(entry.verifiedUntil))) continue
    const model = entry.model || provider.model
    if (entry.provider === 'groq' && model !== provider.model || entry.provider === 'ollama' && model !== provider.model || entry.provider === 'openrouter' && model !== provider.model || entry.provider === 'cloudflare' && model !== provider.model) continue
    if (entry.provider === 'google' && !['gemma-3n-e4b-it', 'gemma-3n-e2b-it', provider.model].includes(model)) continue
    if (!['rpm','rpd','tpm','tpd','concurrency','context'].every(k => Number.isSafeInteger(entry[k]) && entry[k] > 0)) continue
    const ids = entry.provider === 'cloudflare' ? (env.AI ? ['CLOUDFLARE_AI_BINDING'] : []) : Object.keys(env).filter(k => new RegExp(`^${provider.prefix}\\d+$`).test(k) && typeof env[k] === 'string' && env[k].trim())
    for (const id of ids) {
      // Independent groups are opt-in, with explicit verified key IDs. Omitted
      // mappings conservatively share one provider quota group.
      if (entry.keyIds && (!Array.isArray(entry.keyIds) || !entry.keyIds.includes(id))) continue
      candidates.push({ id, provider: entry.provider, model, key: entry.provider === 'cloudflare' ? '' : env[id], group: `${entry.provider}:${entry.quotaGroup || 'shared'}`,
        rpm: entry.rpm, rpd: entry.rpd, tpm: entry.tpm, tpd: entry.tpd, concurrency: entry.concurrency, context: entry.context, resetTimezone: entry.provider === 'google' ? 'America/Los_Angeles' : 'UTC', verifiedUntil: entry.verifiedUntil })
    }
  }
  const seen = new Set<string>()
  const unique = candidates.filter(c => !seen.has(c.id) && Boolean(seen.add(c.id)))
  unique.sort((a,b) => a.id === 'GROQ_KEY_0' ? -1 : b.id === 'GROQ_KEY_0' ? 1 : a.id.localeCompare(b.id, undefined, { numeric: true }))
  // Conflicting definitions of a shared group must not overwrite each other
  // in accounting, or the largest manifest entry could inflate its allowance.
  const groups=new Map<string,string>()
  for(const c of candidates) {
    const signature=JSON.stringify([c.model,c.rpm,c.rpd,c.tpm,c.tpd,c.concurrency,c.context,c.verifiedUntil])
    if(groups.has(c.group) && groups.get(c.group)!==signature) return {enabled,candidates:[]}
    groups.set(c.group,signature)
  }
  const keyGroups=new Map<string,string>()
  for(const c of candidates) {
    if(keyGroups.has(c.id) && keyGroups.get(c.id)!==c.group) return {enabled,candidates:[]}
    keyGroups.set(c.id,c.group)
  }
  return { enabled, candidates: unique }
}
export function gatewayUnavailable(): never { throw new BuiltinAiError('unavailable', 'Built-in AI is temporarily unavailable. Try again later or switch to your own keys in Settings.', 503, 60) }
