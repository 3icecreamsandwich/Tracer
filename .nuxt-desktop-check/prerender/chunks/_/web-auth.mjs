import { u as useRuntimeConfig } from '../nitro/nitro.mjs';
import { createClient } from 'file:///Users/xun-xia/Development/tracer/node_modules/@supabase/supabase-js/dist/index.mjs';
import { setHeader, getHeader, createError } from 'file:///Users/xun-xia/Development/tracer/node_modules/@nuxt/nitro-server/node_modules/h3/dist/index.mjs';

function webBindings(event) {
  var _a;
  return (_a = event.context.cloudflare) == null ? void 0 : _a.env;
}
function webRuntimeConfig(event) {
  var _a, _b, _c, _d;
  const config = useRuntimeConfig(event);
  const env = webBindings(event);
  return {
    supabaseUrl: (_a = env == null ? void 0 : env.NUXT_SUPABASE_URL) != null ? _a : config.supabaseUrl,
    supabasePublishableKey: (_b = env == null ? void 0 : env.NUXT_SUPABASE_PUBLISHABLE_KEY) != null ? _b : config.supabasePublishableKey,
    githubOauthClientId: (_c = env == null ? void 0 : env.NUXT_GITHUB_OAUTH_CLIENT_ID) != null ? _c : config.githubOauthClientId,
    webAiCompatibleOrigin: (_d = env == null ? void 0 : env.NUXT_WEB_AI_COMPATIBLE_ORIGIN) != null ? _d : config.webAiCompatibleOrigin
  };
}

const requests = /* @__PURE__ */ new Map();
async function authenticatedWebClient(event) {
  var _a;
  setHeader(event, "Cache-Control", "private, no-store");
  const config = webRuntimeConfig(event);
  const authorization = getHeader(event, "authorization");
  if (!(authorization == null ? void 0 : authorization.startsWith("Bearer "))) throw createError({ statusCode: 401, statusMessage: "Sign in to Tracer." });
  if (!config.supabaseUrl || !config.supabasePublishableKey) throw createError({ statusCode: 503, statusMessage: "Account services are not configured." });
  const client = createClient(config.supabaseUrl, config.supabasePublishableKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
  const { data, error } = await client.auth.getUser(authorization.slice(7));
  if (error || !data.user) throw createError({ statusCode: 401, statusMessage: "Your session expired. Sign in again." });
  const bindings = webBindings(event);
  if (bindings) {
    if (!bindings.WEB_RATE_LIMITER) throw createError({ statusCode: 503, statusMessage: "Account services are not configured." });
    const { success } = await bindings.WEB_RATE_LIMITER.limit({ key: data.user.id });
    if (!success) throw createError({ statusCode: 429, statusMessage: "Too many requests. Wait a minute and retry." });
    return client;
  }
  const now = Date.now();
  for (const [id, value] of requests) if (now - value.start > 6e4) requests.delete(id);
  const rate = (_a = requests.get(data.user.id)) != null ? _a : { start: now, count: 0 };
  rate.count++;
  requests.set(data.user.id, rate);
  if (rate.count > 120) throw createError({ statusCode: 429, statusMessage: "Too many requests. Wait a minute and retry." });
  return client;
}
async function readWebProviderKeys(event) {
  const client = await authenticatedWebClient(event);
  const { data, error } = await client.rpc("list_tracer_user_api_keys");
  if (error) throw createError({ statusCode: 502, statusMessage: "Could not access your saved provider keys." });
  return Object.fromEntries((data != null ? data : []).map((row) => [row.provider_id, row.api_key]));
}

export { authenticatedWebClient as a, readWebProviderKeys as r, webRuntimeConfig as w };
//# sourceMappingURL=web-auth.mjs.map
