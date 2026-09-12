import { defineEventHandler, createError } from 'file:///Users/xun-xia/Development/tracer/node_modules/@nuxt/nitro-server/node_modules/h3/dist/index.mjs';
import { r as readWebJson } from '../../../_/web-body.mjs';
import { a as authenticatedWebClient } from '../../../_/web-auth.mjs';
import '../../../nitro/nitro.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/destr/dist/index.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/nitropack/node_modules/ufo/dist/index.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'node:fs/promises';
import 'node:path';
import 'file:///Users/xun-xia/Development/tracer/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/ohash/dist/index.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/klona/dist/index.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/defu/dist/defu.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/scule/dist/index.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/unctx/dist/index.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/nitropack/node_modules/defu/dist/defu.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/radix3/dist/index.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/@nuxt/nitro-server/node_modules/ufo/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/xun-xia/Development/tracer/node_modules/pathe/dist/index.mjs';
import 'file:///Users/xun-xia/Development/tracer/node_modules/@supabase/supabase-js/dist/index.mjs';

const credentials_post = defineEventHandler(async (event) => {
  var _a;
  const client = await authenticatedWebClient(event);
  const body = await readWebJson(event, 64 * 1024);
  const ids = ["openai", "anthropic", "gemini", "ollama_cloud", "openai_compat"];
  if (body == null ? void 0 : body.deleteId) {
    if (!ids.includes(body.deleteId)) throw createError({ statusCode: 400, statusMessage: "Unknown provider." });
    const { error: error2 } = await client.rpc("delete_tracer_user_api_key", { requested_provider_id: body.deleteId });
    if (error2) throw createError({ statusCode: 502, statusMessage: "Could not remove provider key." });
    return { savedApiKeyIds: [] };
  }
  const keys = {};
  for (const id of ids) {
    const value = (_a = body == null ? void 0 : body.apiKeys) == null ? void 0 : _a[id];
    if (value !== void 0 && (typeof value !== "string" || value.length > 8192)) throw createError({ statusCode: 400, statusMessage: "Invalid provider key." });
    if (value == null ? void 0 : value.trim()) keys[id] = value.trim();
  }
  if (!Object.keys(keys).length) throw createError({ statusCode: 400, statusMessage: "Enter a provider key." });
  const { error } = await client.rpc("save_tracer_user_api_keys", { requested_keys: keys });
  if (error) throw createError({ statusCode: 502, statusMessage: "Could not save provider keys." });
  return { savedApiKeyIds: Object.keys(keys), savedOpenAiCompatConfig: false };
});

export { credentials_post as default };
//# sourceMappingURL=credentials.post.mjs.map
