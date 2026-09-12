import { getHeader, createError, getRequestWebStream } from 'file:///Users/xun-xia/Development/tracer/node_modules/@nuxt/nitro-server/node_modules/h3/dist/index.mjs';

class BodyTooLarge extends Error {
}
async function readBoundedBody(stream, limit) {
  const reader = stream == null ? void 0 : stream.getReader();
  if (!reader) return new Uint8Array();
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > limit) {
        await reader.cancel();
        throw new BodyTooLarge("Request too large.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

async function readWebJson(event, limit) {
  var _a, _b, _c, _d;
  if (((_a = getHeader(event, "content-type")) == null ? void 0 : _a.split(";")[0].trim()) !== "application/json") {
    throw createError({ statusCode: 415, statusMessage: "JSON is required." });
  }
  const tooLarge = () => createError({ statusCode: 413, statusMessage: "Request too large." });
  if (Number(getHeader(event, "content-length")) > limit) throw tooLarge();
  if (((_b = event.context) == null ? void 0 : _b.cloudflare) || ((_c = event.web) == null ? void 0 : _c.request)) {
    try {
      const bytes2 = await readBoundedBody((_d = getRequestWebStream(event)) != null ? _d : null, limit);
      return JSON.parse(new TextDecoder().decode(bytes2));
    } catch (error) {
      if (error instanceof BodyTooLarge) throw tooLarge();
      throw createError({ statusCode: 400, statusMessage: "Invalid JSON." });
    }
  }
  const bytes = await new Promise((resolve, reject) => {
    const chunks = [];
    let length = 0;
    let failed = false;
    const request = event.node.req;
    request.on("data", (chunk) => {
      if (failed) return;
      length += chunk.length;
      if (length > limit) {
        failed = true;
        chunks.length = 0;
        reject(tooLarge());
      } else chunks.push(chunk);
    });
    request.once("end", () => {
      if (!failed) resolve(Buffer.concat(chunks, length));
    });
    request.once("error", reject);
    request.once("aborted", () => reject(createError({ statusCode: 400, statusMessage: "Request interrupted." })));
  });
  try {
    return JSON.parse(bytes.toString("utf8"));
  } catch {
    throw createError({ statusCode: 400, statusMessage: "Invalid JSON." });
  }
}

export { readWebJson as r };
//# sourceMappingURL=web-body.mjs.map
