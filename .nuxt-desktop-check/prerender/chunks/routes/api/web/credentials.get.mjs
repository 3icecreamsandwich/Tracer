import { defineEventHandler } from 'file:///Users/xun-xia/Development/tracer/node_modules/@nuxt/nitro-server/node_modules/h3/dist/index.mjs';
import { r as readWebProviderKeys } from '../../../_/web-auth.mjs';
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

const credentials_get = defineEventHandler(async (event) => {
  const keys = await readWebProviderKeys(event);
  return Object.fromEntries(["openai", "anthropic", "gemini", "ollama_cloud", "openai_compat"].map((id) => [id, Boolean(keys[id])]));
});

export { credentials_get as default };
//# sourceMappingURL=credentials.get.mjs.map
