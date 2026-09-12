import { defineEventHandler, createError, setResponseStatus, setHeader, sendStream } from 'file:///Users/xun-xia/Development/tracer/node_modules/@nuxt/nitro-server/node_modules/h3/dist/index.mjs';
import { a as authenticatedWebClient, w as webRuntimeConfig } from '../../../_/web-auth.mjs';
import { r as readWebJson } from '../../../_/web-body.mjs';
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

function resolveWebAiTarget(raw, method, compatibleOrigin = "") {
  let url;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || url.username || url.password || url.port || url.hash) return null;
  const path = url.pathname;
  if (url.hostname === "api.openai.com" && method === "POST" && ["/v1/responses", "/v1/chat/completions"].includes(path)) return { provider: "openai", url };
  if (url.hostname === "api.anthropic.com" && method === "POST" && path === "/v1/messages") return { provider: "anthropic", url };
  if (url.hostname === "generativelanguage.googleapis.com" && method === "POST" && /^\/v1beta\/models\/[a-zA-Z0-9._-]+:(streamGenerateContent|generateContent)$/.test(path)) return { provider: "gemini", url };
  if (url.hostname === "ollama.com" && (method === "POST" && ["/api/chat", "/api/generate"].includes(path) || method === "GET" && path === "/api/tags")) return { provider: "ollama_cloud", url };
  if (url.hostname === "models.github.ai" && (method === "GET" && path === "/catalog/models" || method === "POST" && path === "/inference/chat/completions")) return { provider: "github", url };
  if (url.hostname === "github.com" && method === "POST" && ["/login/device/code", "/login/oauth/access_token"].includes(path)) return { provider: "github", url, oauth: true };
  if (compatibleOrigin && url.origin === compatibleOrigin && method === "POST" && /^\/(?:v1\/)?chat\/completions$/.test(path)) return { provider: "openai_compat", url };
  return null;
}

const ai_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e;
  const client = await authenticatedWebClient(event);
  const config = webRuntimeConfig(event);
  const body = await readWebJson(event, 5 * 1024 * 1024);
  if (typeof (body == null ? void 0 : body.url) !== "string" || typeof (body == null ? void 0 : body.body) !== "string" || body.body.length > 4 * 1024 * 1024) {
    throw createError({ statusCode: 400, statusMessage: "Invalid AI request or source too large." });
  }
  const target = resolveWebAiTarget(body.url, body.method, config.webAiCompatibleOrigin);
  if (!target) throw createError({ statusCode: 400, statusMessage: "This endpoint is not enabled for web AI. Choose a cloud provider in Settings." });
  const headers = new Headers({ "Content-Type": "application/json" });
  let upstreamBody = body.body;
  for (const name of ["accept", "anthropic-version", "anthropic-beta", "x-github-api-version"]) {
    if (typeof ((_a = body.headers) == null ? void 0 : _a[name]) === "string") headers.set(name, body.headers[name]);
  }
  if (target.oauth) {
    const params = new URLSearchParams(body.body);
    if (!config.githubOauthClientId || params.get("client_id") !== config.githubOauthClientId) {
      throw createError({ statusCode: 400, statusMessage: "GitHub Models is not configured for this deployment." });
    }
    if (target.url.pathname.endsWith("/code")) upstreamBody = new URLSearchParams({ client_id: params.get("client_id"), scope: "models:read" }).toString();
    else {
      if (params.get("grant_type") !== "urn:ietf:params:oauth:grant-type:device_code" || !params.get("device_code")) throw createError({ statusCode: 400, statusMessage: "Invalid device authorization." });
      upstreamBody = new URLSearchParams({ client_id: params.get("client_id"), device_code: params.get("device_code"), grant_type: params.get("grant_type") }).toString();
    }
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    headers.set("Accept", "application/json");
  } else {
    let key;
    if (target.provider === "github") key = typeof body.githubToken === "string" && body.githubToken.length <= 8192 ? body.githubToken : void 0;
    else {
      const { data, error } = await client.rpc("list_tracer_user_api_keys");
      if (error) throw createError({ statusCode: 502, statusMessage: "Could not access your provider key." });
      key = (_b = data == null ? void 0 : data.find((row) => row.provider_id === target.provider)) == null ? void 0 : _b.api_key;
    }
    if (!key) throw createError({ statusCode: 400, statusMessage: "Add a key for this provider in Settings." });
    target.url.searchParams.delete("key");
    if (target.provider === "anthropic") headers.set("x-api-key", key);
    else if (target.provider === "gemini") headers.set("x-goog-api-key", key);
    else headers.set("Authorization", `Bearer ${key}`);
  }
  let response;
  try {
    response = await fetch(target.url, {
      method: body.method,
      headers,
      body: body.method === "GET" ? void 0 : upstreamBody,
      redirect: "error",
      signal: ((_d = (_c = event.context.cloudflare) == null ? void 0 : _c.request) == null ? void 0 : _d.signal) ? AbortSignal.any([event.context.cloudflare.request.signal, AbortSignal.timeout(18e4)]) : AbortSignal.timeout(18e4)
    });
  } catch {
    throw createError({ statusCode: 502, statusMessage: "The AI provider could not be reached. Try again." });
  }
  setResponseStatus(event, response.status);
  setHeader(event, "Content-Type", (_e = response.headers.get("content-type")) != null ? _e : "application/json");
  setHeader(event, "X-Accel-Buffering", "no");
  if (!response.ok) return { error: { message: `The AI provider returned ${response.status}. Check its key and quota in Settings.` } };
  return response.body ? sendStream(event, response.body) : "";
});

export { ai_post as default };
//# sourceMappingURL=ai.post.mjs.map
