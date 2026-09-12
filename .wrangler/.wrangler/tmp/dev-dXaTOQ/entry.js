var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn2, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
  } catch (e5) {
    throw err = [e5], e5;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
  }
});

// ../node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// ../.output-cloudflare/server/chunks/_/shared.esm-bundler.mjs
function escapeHtml(t5) {
  const a4 = "" + t5, c4 = e.exec(a4);
  if (!c4) return a4;
  let s3, n3, o5 = "", r4 = 0;
  for (n3 = c4.index; n3 < a4.length; n3++) {
    switch (a4.charCodeAt(n3)) {
      case 34:
        s3 = "&quot;";
        break;
      case 38:
        s3 = "&amp;";
        break;
      case 39:
        s3 = "&#39;";
        break;
      case 60:
        s3 = "&lt;";
        break;
      case 62:
        s3 = "&gt;";
        break;
      default:
        continue;
    }
    r4 !== n3 && (o5 += a4.slice(r4, n3)), r4 = n3 + 1, o5 += s3;
  }
  return r4 !== n3 ? o5 + a4.slice(r4, n3) : o5;
}
var isFunction, isSymbol, e;
var init_shared_esm_bundler = __esm({
  "../.output-cloudflare/server/chunks/_/shared.esm-bundler.mjs"() {
    init_modules_watch_stub();
    isFunction = /* @__PURE__ */ __name((e5) => "function" == typeof e5, "isFunction");
    isSymbol = /* @__PURE__ */ __name((e5) => "symbol" == typeof e5, "isSymbol");
    e = /["'&<>]/;
    __name(escapeHtml, "escapeHtml");
  }
});

// ../.output-cloudflare/server/chunks/_/error-500.mjs
var error_500_exports = {};
__export(error_500_exports, {
  template: () => template
});
var t, template;
var init_error_500 = __esm({
  "../.output-cloudflare/server/chunks/_/error-500.mjs"() {
    init_modules_watch_stub();
    init_shared_esm_bundler();
    t = { appName: "Nuxt", status: 500, statusText: "Internal server error", description: "This page is temporarily unavailable.", refresh: "Refresh this page" };
    template = /* @__PURE__ */ __name((r4) => (r4 = { ...t, ...r4 }, '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(r4.status) + " - " + escapeHtml(r4.statusText) + " | " + escapeHtml(r4.appName) + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1,minimum-scale=1" name="viewport"><script>!function(){let e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(let e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(let t of e)if("childList"===t.type)for(let e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;let r=function(e){let r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),r.credentials="use-credentials"===e.crossOrigin?"include":"anonymous"===e.crossOrigin?"omit":"same-origin",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{box-sizing:border-box;border-style:solid;border-width:0;border-color:var(--un-default-border-color,#e5e7eb)}:after,:before{--un-content:""}html{-webkit-text-size-adjust:100%;tab-size:4;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 #0000;--un-ring-shadow:0 0 #0000;--un-shadow-inset: ;--un-shadow:0 0 #0000;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:#93c5fd80;--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (width>=640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class="antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide"><div class="max-w-520px text-center"><h1 class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]">` + escapeHtml(r4.status) + '</h1><h2 class="font-semibold mb-2 sm:text-3xl text-2xl">' + escapeHtml(r4.statusText) + '</h2><p class="mb-4 px-2 text-[#64748B] text-md">' + escapeHtml(r4.description) + "</p></div></body></html>"), "template");
  }
});

// ../.output-cloudflare/server/chunks/virtual/precomputed.mjs
var precomputed_exports = {};
__export(precomputed_exports, {
  default: () => e2
});
var e2, a, f, t2, r, o, s, i, l, _, T, X, p, u, K, c, n, d, w, g, B, S, D, j, R, C, m, y, M, h, I, x, F, z, N, A, k, q, v, O, P, U, Z, E, Y, W, J, b, L, V, G, H, Q, $, ee, ae, fe, te, re, oe, se, ie, le, _e, Te, Xe, pe, ue, Ke, ce, ne, de, we, ge, Be, Se, De, je, Re, Ce, me, ye, Me, he, Ie, xe, Fe, ze, Ne, Ae, ke, qe, ve, Oe, Pe, Ue, Ze, Ee, Ye, We, Je, be, Le, Ve, Ge, He, Qe, $e, ea, aa, fa, ta, ra, oa, sa, ia, la, _a, Ta, Xa, pa, ua, Ka, ca, na, da, wa, ga, Ba, Sa, Da, ja, Ra, Ca, ma, ya, Ma, ha, Ia, xa, Fa, za, Na, Aa, ka, qa, va, Oa, Pa, Ua, Za, Ea, Ya, Wa, Ja, ba, La, Va, Ga, Ha;
var init_precomputed = __esm({
  "../.output-cloudflare/server/chunks/virtual/precomputed.mjs"() {
    init_modules_watch_stub();
    e2 = { dependencies: { "_C0FnF6B9.js": { scripts: {}, styles: {}, preload: { "_C0FnF6B9.js": a = { resourceType: "script", module: true, prefetch: true, preload: true, file: "C0FnF6B9.js", name: "rolldown-runtime" } }, prefetch: {} }, "_DuqgYnXA.js": { scripts: {}, styles: {}, preload: { "_DuqgYnXA.js": f = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DuqgYnXA.js", name: "preload-helper" } }, prefetch: {} }, "_DNaw6KYU.js": { scripts: {}, styles: {}, preload: { "_DNaw6KYU.js": t2 = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DNaw6KYU.js", name: "core" } }, prefetch: {} }, "_BSPB2cL8.js": { scripts: {}, styles: {}, preload: { "_BSPB2cL8.js": r = { resourceType: "script", module: true, prefetch: true, preload: true, file: "BSPB2cL8.js", name: "tauri" } }, prefetch: {} }, "_3i8JKPp4.js": { scripts: {}, styles: {}, preload: { "_3i8JKPp4.js": s = { resourceType: "script", module: true, prefetch: true, preload: true, file: "3i8JKPp4.js", name: "db", imports: ["_DuqgYnXA.js", "_BSPB2cL8.js", "_DNaw6KYU.js"], dynamicImports: o = ["src/composables/db/browser.ts"] }, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_DNaw6KYU.js": t2 }, prefetch: {} }, "_DNESoGCl.js": { scripts: {}, styles: {}, preload: { "_DNESoGCl.js": i = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DNESoGCl.js", name: "sql" } }, prefetch: {} }, "_D9X70ea_.js": { scripts: {}, styles: {}, preload: { "_D9X70ea_.js": l = { resourceType: "script", module: true, prefetch: true, preload: true, file: "D9X70ea_.js", name: "settings.repo" } }, prefetch: {} }, "_CoT1qCUq.js": { scripts: {}, styles: {}, preload: { "_CoT1qCUq.js": _ = { resourceType: "script", module: true, prefetch: true, preload: true, file: "CoT1qCUq.js", name: "runtime-core.esm-bundler" } }, prefetch: {} }, "_DOQDXZsa.js": { scripts: {}, styles: {}, preload: { "_DOQDXZsa.js": T = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DOQDXZsa.js", name: "nuxt", imports: ["_CoT1qCUq.js"] }, "_CoT1qCUq.js": _ }, prefetch: {} }, "_C1OZectE.js": { scripts: {}, styles: {}, preload: { "_C1OZectE.js": X = { resourceType: "script", module: true, prefetch: true, preload: true, file: "C1OZectE.js", name: "error", imports: ["_DOQDXZsa.js", "_CoT1qCUq.js"] }, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _ }, prefetch: {} }, "_C7y-hBT4.js": { scripts: {}, styles: {}, preload: { "_C7y-hBT4.js": p = { resourceType: "script", module: true, prefetch: true, preload: true, file: "C7y-hBT4.js", name: "web", imports: ["_BSPB2cL8.js"] }, "_BSPB2cL8.js": r }, prefetch: {} }, "_BTtBPxxM.js": { scripts: {}, styles: {}, preload: { "_BTtBPxxM.js": u = { resourceType: "script", module: true, prefetch: true, preload: true, file: "BTtBPxxM.js", name: "profile.repo", imports: ["_DNESoGCl.js"] }, "_DNESoGCl.js": i }, prefetch: {} }, "_D1CiTnQp.js": { scripts: {}, styles: {}, preload: { "_D1CiTnQp.js": K = { resourceType: "script", module: true, prefetch: true, preload: true, file: "D1CiTnQp.js", name: "language", imports: ["_CoT1qCUq.js", "_C7y-hBT4.js", "_3i8JKPp4.js", "_D9X70ea_.js"] }, "_CoT1qCUq.js": _, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_D9X70ea_.js": l }, prefetch: {} }, "node_modules/nuxt/dist/app/entry.js": { scripts: { "node_modules/nuxt/dist/app/entry.js": n = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DIckivU5.js", name: "entry", src: "node_modules/nuxt/dist/app/entry.js", isEntry: true, imports: ["_DOQDXZsa.js", "_CoT1qCUq.js", "_C1OZectE.js", "_DuqgYnXA.js", "_BSPB2cL8.js", "_C7y-hBT4.js", "_DNaw6KYU.js", "_3i8JKPp4.js", "_DNESoGCl.js", "_BTtBPxxM.js", "_D9X70ea_.js", "_D1CiTnQp.js"], dynamicImports: c = ["_B-D7dJ5g.js", "components/FloatingPageChat.vue", "_D33Hiyx4.js", "_-WKEmQhb.js", "node_modules/nuxt/dist/app/components/error-404.vue", "node_modules/nuxt/dist/app/components/error-500.vue"], css: ["entry.DpS-p5p_.css"], assets: ["KaTeX_AMS-Regular.BQhdFMY1.woff2", "KaTeX_AMS-Regular.DMm9YOAa.woff", "KaTeX_AMS-Regular.DRggAlZN.ttf", "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2", "KaTeX_Caligraphic-Bold.BEiXGLvX.woff", "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf", "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2", "KaTeX_Caligraphic-Regular.CTRA-rTL.woff", "KaTeX_Caligraphic-Regular.wX97UBjC.ttf", "KaTeX_Fraktur-Bold.CL6g_b3V.woff2", "KaTeX_Fraktur-Bold.BsDP51OF.woff", "KaTeX_Fraktur-Bold.BdnERNNW.ttf", "KaTeX_Fraktur-Regular.CTYiF6lA.woff2", "KaTeX_Fraktur-Regular.Dxdc4cR9.woff", "KaTeX_Fraktur-Regular.CB_wures.ttf", "KaTeX_Main-Bold.Cx986IdX.woff2", "KaTeX_Main-Bold.Jm3AIy58.woff", "KaTeX_Main-Bold.waoOVXN0.ttf", "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2", "KaTeX_Main-BoldItalic.SpSLRI95.woff", "KaTeX_Main-BoldItalic.DzxPMmG6.ttf", "KaTeX_Main-Italic.NWA7e6Wa.woff2", "KaTeX_Main-Italic.BMLOBm91.woff", "KaTeX_Main-Italic.3WenGoN9.ttf", "KaTeX_Main-Regular.B22Nviop.woff2", "KaTeX_Main-Regular.Dr94JaBh.woff", "KaTeX_Main-Regular.ypZvNtVU.ttf", "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2", "KaTeX_Math-BoldItalic.iY-2wyZ7.woff", "KaTeX_Math-BoldItalic.B3XSjfu4.ttf", "KaTeX_Math-Italic.t53AETM-.woff2", "KaTeX_Math-Italic.DA0__PXp.woff", "KaTeX_Math-Italic.flOr_0UB.ttf", "KaTeX_SansSerif-Bold.D1sUS0GD.woff2", "KaTeX_SansSerif-Bold.DbIhKOiC.woff", "KaTeX_SansSerif-Bold.CFMepnvq.ttf", "KaTeX_SansSerif-Italic.C3H0VqGB.woff2", "KaTeX_SansSerif-Italic.DN2j7dab.woff", "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf", "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2", "KaTeX_SansSerif-Regular.CS6fqUqJ.woff", "KaTeX_SansSerif-Regular.BNo7hRIc.ttf", "KaTeX_Script-Regular.D3wIWfF6.woff2", "KaTeX_Script-Regular.D5yQViql.woff", "KaTeX_Script-Regular.C5JkGWo-.ttf", "KaTeX_Size1-Regular.mCD8mA8B.woff2", "KaTeX_Size1-Regular.C195tn64.woff", "KaTeX_Size1-Regular.Dbsnue_I.ttf", "KaTeX_Size2-Regular.Dy4dx90m.woff2", "KaTeX_Size2-Regular.oD1tc_U0.woff", "KaTeX_Size2-Regular.B7gKUWhC.ttf", "KaTeX_Size3-Regular.CTq5MqoE.woff", "KaTeX_Size3-Regular.DgpXs0kz.ttf", "KaTeX_Size4-Regular.Dl5lxZxV.woff2", "KaTeX_Size4-Regular.BF-4gkZK.woff", "KaTeX_Size4-Regular.DWFBv043.ttf", "KaTeX_Typewriter-Regular.CO6r4hn1.woff2", "KaTeX_Typewriter-Regular.C0xS9mPB.woff", "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf"] } }, styles: { "entry.DpS-p5p_.css": d = { file: "entry.DpS-p5p_.css", resourceType: "style", prefetch: true, preload: true } }, preload: { "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w = { file: "KaTeX_AMS-Regular.BQhdFMY1.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_AMS-Regular.DMm9YOAa.woff": g = { file: "KaTeX_AMS-Regular.DMm9YOAa.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_AMS-Regular.DRggAlZN.ttf": B = { file: "KaTeX_AMS-Regular.DRggAlZN.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S = { file: "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D = { file: "KaTeX_Caligraphic-Bold.BEiXGLvX.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j = { file: "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R = { file: "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C = { file: "KaTeX_Caligraphic-Regular.CTRA-rTL.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m = { file: "KaTeX_Caligraphic-Regular.wX97UBjC.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y = { file: "KaTeX_Fraktur-Bold.CL6g_b3V.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M = { file: "KaTeX_Fraktur-Bold.BsDP51OF.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h = { file: "KaTeX_Fraktur-Bold.BdnERNNW.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I = { file: "KaTeX_Fraktur-Regular.CTYiF6lA.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x = { file: "KaTeX_Fraktur-Regular.Dxdc4cR9.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_Fraktur-Regular.CB_wures.ttf": F = { file: "KaTeX_Fraktur-Regular.CB_wures.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_Main-Bold.Cx986IdX.woff2": z = { file: "KaTeX_Main-Bold.Cx986IdX.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_Main-Bold.Jm3AIy58.woff": N = { file: "KaTeX_Main-Bold.Jm3AIy58.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_Main-Bold.waoOVXN0.ttf": A = { file: "KaTeX_Main-Bold.waoOVXN0.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k = { file: "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q = { file: "KaTeX_Main-BoldItalic.SpSLRI95.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v = { file: "KaTeX_Main-BoldItalic.DzxPMmG6.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O = { file: "KaTeX_Main-Italic.NWA7e6Wa.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_Main-Italic.BMLOBm91.woff": P = { file: "KaTeX_Main-Italic.BMLOBm91.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_Main-Italic.3WenGoN9.ttf": U = { file: "KaTeX_Main-Italic.3WenGoN9.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_Main-Regular.B22Nviop.woff2": Z = { file: "KaTeX_Main-Regular.B22Nviop.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_Main-Regular.Dr94JaBh.woff": E = { file: "KaTeX_Main-Regular.Dr94JaBh.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y = { file: "KaTeX_Main-Regular.ypZvNtVU.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W = { file: "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J = { file: "KaTeX_Math-BoldItalic.iY-2wyZ7.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b = { file: "KaTeX_Math-BoldItalic.B3XSjfu4.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_Math-Italic.t53AETM-.woff2": L = { file: "KaTeX_Math-Italic.t53AETM-.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_Math-Italic.DA0__PXp.woff": V = { file: "KaTeX_Math-Italic.DA0__PXp.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_Math-Italic.flOr_0UB.ttf": G = { file: "KaTeX_Math-Italic.flOr_0UB.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H = { file: "KaTeX_SansSerif-Bold.D1sUS0GD.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q = { file: "KaTeX_SansSerif-Bold.DbIhKOiC.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $ = { file: "KaTeX_SansSerif-Bold.CFMepnvq.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee = { file: "KaTeX_SansSerif-Italic.C3H0VqGB.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae = { file: "KaTeX_SansSerif-Italic.DN2j7dab.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe = { file: "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te = { file: "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re = { file: "KaTeX_SansSerif-Regular.CS6fqUqJ.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe = { file: "KaTeX_SansSerif-Regular.BNo7hRIc.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_Script-Regular.D3wIWfF6.woff2": se = { file: "KaTeX_Script-Regular.D3wIWfF6.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_Script-Regular.D5yQViql.woff": ie = { file: "KaTeX_Script-Regular.D5yQViql.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_Script-Regular.C5JkGWo-.ttf": le = { file: "KaTeX_Script-Regular.C5JkGWo-.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e = { file: "KaTeX_Size1-Regular.mCD8mA8B.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_Size1-Regular.C195tn64.woff": Te = { file: "KaTeX_Size1-Regular.C195tn64.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe = { file: "KaTeX_Size1-Regular.Dbsnue_I.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe = { file: "KaTeX_Size2-Regular.Dy4dx90m.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue = { file: "KaTeX_Size2-Regular.oD1tc_U0.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke = { file: "KaTeX_Size2-Regular.B7gKUWhC.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce = { file: "KaTeX_Size3-Regular.CTq5MqoE.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne = { file: "KaTeX_Size3-Regular.DgpXs0kz.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de = { file: "KaTeX_Size4-Regular.Dl5lxZxV.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_Size4-Regular.BF-4gkZK.woff": we = { file: "KaTeX_Size4-Regular.BF-4gkZK.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_Size4-Regular.DWFBv043.ttf": ge = { file: "KaTeX_Size4-Regular.DWFBv043.ttf", resourceType: "font", mimeType: "font/ttf" }, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be = { file: "KaTeX_Typewriter-Regular.CO6r4hn1.woff2", resourceType: "font", mimeType: "font/woff2" }, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se = { file: "KaTeX_Typewriter-Regular.C0xS9mPB.woff", resourceType: "font", mimeType: "font/woff" }, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De = { file: "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf", resourceType: "font", mimeType: "font/ttf" } } }, "_-WKEmQhb.js": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "_-WKEmQhb.js": Re = { resourceType: "script", module: true, prefetch: true, preload: true, file: "-WKEmQhb.js", name: "sync", imports: ["_C0FnF6B9.js", "_DuqgYnXA.js", "_DNaw6KYU.js", "_3i8JKPp4.js", "_DNESoGCl.js", "_D9X70ea_.js", "node_modules/nuxt/dist/app/entry.js"], dynamicImports: je = ["_58j6fSHb.js", "_DmwaeKks.js", "src/composables/generate/linked-folders/scan.ts", "src/composables/generate/file-limits.ts", "_Bwbix4wE.js"] }, "_C0FnF6B9.js": a, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_BSPB2cL8.js": r, "_DNESoGCl.js": i, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_C7y-hBT4.js": p, "_BTtBPxxM.js": u, "_D1CiTnQp.js": K }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "_BuNPglMN.js": { scripts: {}, styles: {}, preload: { "_BuNPglMN.js": Ce = { resourceType: "script", module: true, prefetch: true, preload: true, file: "BuNPglMN.js", name: "readable-stream" } }, prefetch: {} }, "__I7zX1hp.js": { scripts: {}, styles: {}, preload: { "__I7zX1hp.js": ye = { resourceType: "script", module: true, prefetch: true, preload: true, file: "_I7zX1hp.js", name: "pdf-adapter", imports: ["_DuqgYnXA.js", "_BuNPglMN.js"], dynamicImports: me = ["node_modules/pdfjs-dist/build/pdf.mjs", "node_modules/pdfjs-dist/build/pdf.worker.mjs?url"] }, "_DuqgYnXA.js": f, "_BuNPglMN.js": Ce }, prefetch: {} }, "_58j6fSHb.js": { scripts: {}, styles: {}, preload: { "_58j6fSHb.js": he = { resourceType: "script", module: true, prefetch: true, preload: true, file: "58j6fSHb.js", name: "source-extraction", imports: ["_C0FnF6B9.js", "_DuqgYnXA.js", "__I7zX1hp.js", "_BuNPglMN.js"], dynamicImports: Me = ["node_modules/tesseract.js/src/index.js", "node_modules/tesseract.js/dist/worker.min.js?url"] }, "_C0FnF6B9.js": a, "_DuqgYnXA.js": f, "__I7zX1hp.js": ye, "_BuNPglMN.js": Ce }, prefetch: {} }, "_DUEfs9ab.js": { scripts: {}, styles: {}, preload: { "_DUEfs9ab.js": Ie = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DUEfs9ab.js", name: "random" } }, prefetch: {} }, "_CYOK9Egh.js": { scripts: {}, styles: {}, preload: { "_CYOK9Egh.js": xe = { resourceType: "script", module: true, prefetch: true, preload: true, file: "CYOK9Egh.js", name: "flashcard-run", imports: ["_DUEfs9ab.js"] }, "_DUEfs9ab.js": Ie }, prefetch: {} }, "_BEppUSYT.js": { scripts: {}, styles: {}, preload: { "_BEppUSYT.js": Fe = { resourceType: "script", module: true, prefetch: true, preload: true, file: "BEppUSYT.js", name: "presentation", imports: ["_3i8JKPp4.js"] }, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_DNaw6KYU.js": t2 }, prefetch: {} }, "_CIxQqB1T.js": { scripts: {}, styles: {}, preload: { "_CIxQqB1T.js": ze = { resourceType: "script", module: true, prefetch: true, preload: true, file: "CIxQqB1T.js", name: "interval", imports: ["_C1OZectE.js"] }, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _ }, prefetch: {} }, "_DKEvlRFT.js": { scripts: {}, styles: {}, preload: { "_DKEvlRFT.js": Ne = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DKEvlRFT.js", name: "chat-reveal-unit" } }, prefetch: {} }, "_Ca1NHEsT.js": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "_Ca1NHEsT.js": Ae = { resourceType: "script", module: true, prefetch: true, preload: true, file: "Ca1NHEsT.js", name: "chat-reveal", imports: ["node_modules/nuxt/dist/app/entry.js", "_CIxQqB1T.js", "_DKEvlRFT.js"], assets: ["chat.DDXhWmJw.png"] }, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K, "_CIxQqB1T.js": ze, "_DKEvlRFT.js": Ne }, prefetch: { "chat.DDXhWmJw.png": ke = { file: "chat.DDXhWmJw.png", resourceType: "image", prefetch: true, mimeType: "image/png" }, "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "_BgTQkGHw.js": { scripts: {}, styles: { "MarkdownRenderer.CEk2HVtF.css": qe = { file: "MarkdownRenderer.CEk2HVtF.css", resourceType: "style", prefetch: true, preload: true }, "entry.DpS-p5p_.css": d }, preload: { "_BgTQkGHw.js": ve = { resourceType: "script", module: true, prefetch: true, preload: true, file: "BgTQkGHw.js", name: "MarkdownRenderer", imports: ["_C0FnF6B9.js", "_CoT1qCUq.js", "node_modules/nuxt/dist/app/entry.js"], css: ["MarkdownRenderer.CEk2HVtF.css"] }, "MarkdownRenderer.CEk2HVtF.css": qe, "_C0FnF6B9.js": a, "_CoT1qCUq.js": _, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_C1OZectE.js": X, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K }, prefetch: { "MarkdownRenderer.CEk2HVtF.css": qe, "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "_BaPl6vKy.js": { scripts: {}, styles: {}, preload: { "_BaPl6vKy.js": Oe = { resourceType: "script", module: true, prefetch: true, preload: true, file: "BaPl6vKy.js", name: "createLucideIcon", imports: ["_CoT1qCUq.js"] }, "_CoT1qCUq.js": _ }, prefetch: {} }, "_C4juBKIn.js": { scripts: {}, styles: {}, preload: { "_C4juBKIn.js": Pe = { resourceType: "script", module: true, prefetch: true, preload: true, file: "C4juBKIn.js", name: "pencil", imports: ["_BaPl6vKy.js"] }, "_BaPl6vKy.js": Oe, "_CoT1qCUq.js": _ }, prefetch: {} }, "_W5zwDZH1.js": { scripts: {}, styles: {}, preload: { "_W5zwDZH1.js": Ue = { resourceType: "script", module: true, prefetch: true, preload: true, file: "W5zwDZH1.js", name: "AppIcon", imports: ["_CoT1qCUq.js", "_BaPl6vKy.js", "_C4juBKIn.js"] }, "_CoT1qCUq.js": _, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe }, prefetch: {} }, "_omrco8F4.js": { scripts: {}, styles: {}, preload: { "_omrco8F4.js": Ze = { resourceType: "script", module: true, prefetch: true, preload: true, file: "omrco8F4.js", name: "AppDialog", imports: ["_CoT1qCUq.js", "_W5zwDZH1.js"] }, "_CoT1qCUq.js": _, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe }, prefetch: {} }, "_Cu-FIESN.js": { scripts: {}, styles: {}, preload: { "_Cu-FIESN.js": Ee = { resourceType: "script", module: true, prefetch: true, preload: true, file: "Cu-FIESN.js", name: "errors" } }, prefetch: {} }, "_ymJ5NHXU.js": { scripts: {}, styles: {}, preload: { "_ymJ5NHXU.js": Ye = { resourceType: "script", module: true, prefetch: true, preload: true, file: "ymJ5NHXU.js", name: "tsv" } }, prefetch: {} }, "_KiLc3yVa.js": { scripts: {}, styles: {}, preload: { "_KiLc3yVa.js": Je = { resourceType: "script", module: true, prefetch: true, preload: true, file: "KiLc3yVa.js", name: "lock", imports: ["_DuqgYnXA.js", "_BSPB2cL8.js", "_DNaw6KYU.js", "_3i8JKPp4.js"], dynamicImports: We = ["src/composables/db/browser.ts"] }, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s }, prefetch: {} }, "_DHWHPuxT.js": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "_DHWHPuxT.js": be = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DHWHPuxT.js", name: "AiErrorModal", imports: ["_CoT1qCUq.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_omrco8F4.js", "_Cu-FIESN.js", "_ymJ5NHXU.js", "_58j6fSHb.js", "_KiLc3yVa.js"] }, "_CoT1qCUq.js": _, "_D1CiTnQp.js": K, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_C1OZectE.js": X, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_omrco8F4.js": Ze, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_Cu-FIESN.js": Ee, "_ymJ5NHXU.js": Ye, "_58j6fSHb.js": he, "_C0FnF6B9.js": a, "__I7zX1hp.js": ye, "_BuNPglMN.js": Ce, "_KiLc3yVa.js": Je }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "_CwHFm-oR.js": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "_CwHFm-oR.js": Le = { resourceType: "script", module: true, prefetch: true, preload: true, file: "CwHFm-oR.js", name: "AppButton", imports: ["_CoT1qCUq.js", "node_modules/nuxt/dist/app/entry.js"] }, "_CoT1qCUq.js": _, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_C1OZectE.js": X, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "_lyDHIuzO.js": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "_lyDHIuzO.js": Ge = { resourceType: "script", module: true, prefetch: true, preload: true, file: "lyDHIuzO.js", name: "published-sets", imports: ["_DuqgYnXA.js", "_BSPB2cL8.js", "node_modules/nuxt/dist/app/entry.js"], dynamicImports: Ve = ["_CenSu9pQ.js"] }, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "_DNV-kwhi.js": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "_DNV-kwhi.js": He = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DNV-kwhi.js", name: "generator", imports: ["_CoT1qCUq.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_DUEfs9ab.js"] }, "_CoT1qCUq.js": _, "_D1CiTnQp.js": K, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_C1OZectE.js": X, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_DUEfs9ab.js": Ie }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "_CJR9iA_2.js": { scripts: {}, styles: {}, preload: { "_CJR9iA_2.js": $e = { resourceType: "script", module: true, prefetch: true, preload: true, file: "CJR9iA_2.js", name: "written-answer-grader", imports: ["_DuqgYnXA.js", "_DUEfs9ab.js"], dynamicImports: Qe = ["_DH04fbtw.js"] }, "_DuqgYnXA.js": f, "_DUEfs9ab.js": Ie }, prefetch: {} }, "_DAEfPZzO.js": { scripts: {}, styles: {}, preload: { "_DAEfPZzO.js": aa = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DAEfPZzO.js", name: "chat", imports: ["_C0FnF6B9.js", "_DuqgYnXA.js", "_DKEvlRFT.js"], dynamicImports: ea = ["_DH04fbtw.js"] }, "_C0FnF6B9.js": a, "_DuqgYnXA.js": f, "_DKEvlRFT.js": Ne }, prefetch: {} }, "_BP61iLYe.js": { scripts: {}, styles: {}, preload: { "_BP61iLYe.js": ta = { resourceType: "script", module: true, prefetch: true, preload: true, file: "BP61iLYe.js", name: "assignment-progress", imports: ["_DuqgYnXA.js"], dynamicImports: fa = ["_DJIE5NFf.js"] }, "_DuqgYnXA.js": f }, prefetch: {} }, "_BkOLPXZH.js": { scripts: {}, styles: {}, preload: { "_BkOLPXZH.js": ra = { resourceType: "script", module: true, prefetch: true, preload: true, file: "BkOLPXZH.js", name: "spaced-repetition" } }, prefetch: {} }, "_B-D7dJ5g.js": { scripts: {}, styles: { "_id_.Bfli5g0z.css": oa = { file: "_id_.Bfli5g0z.css", resourceType: "style", prefetch: true, preload: true }, "entry.DpS-p5p_.css": d, "MarkdownRenderer.CEk2HVtF.css": qe }, preload: { "_B-D7dJ5g.js": ia = { resourceType: "script", module: true, prefetch: true, preload: true, file: "B-D7dJ5g.js", name: "_id_", imports: ["_C0FnF6B9.js", "_CoT1qCUq.js", "_C1OZectE.js", "_DuqgYnXA.js", "_BSPB2cL8.js", "_C7y-hBT4.js", "_3i8JKPp4.js", "_DNESoGCl.js", "_CYOK9Egh.js", "_-WKEmQhb.js", "_BEppUSYT.js", "_D9X70ea_.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_Ca1NHEsT.js", "_CIxQqB1T.js", "_BgTQkGHw.js", "_W5zwDZH1.js", "_omrco8F4.js", "_DHWHPuxT.js", "_KiLc3yVa.js", "_CwHFm-oR.js", "_lyDHIuzO.js", "_DNV-kwhi.js", "_DUEfs9ab.js", "_CJR9iA_2.js", "_DAEfPZzO.js", "_BP61iLYe.js", "_BkOLPXZH.js"], dynamicImports: sa = ["_DJIE5NFf.js", "_Bwbix4wE.js", "_DH04fbtw.js"], css: ["_id_.Bfli5g0z.css"], assets: ["flashcards.ICvZV-Vm.png", "study-guide.BA6NWRPA.png", "practice.DslxcpkH.png", "match.ARkrkEri.png"] }, "_id_.Bfli5g0z.css": oa, "_C0FnF6B9.js": a, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_3i8JKPp4.js": s, "_DNaw6KYU.js": t2, "_DNESoGCl.js": i, "_CYOK9Egh.js": xe, "_DUEfs9ab.js": Ie, "_-WKEmQhb.js": Re, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_BTtBPxxM.js": u, "_D1CiTnQp.js": K, "_BEppUSYT.js": Fe, "_Ca1NHEsT.js": Ae, "_CIxQqB1T.js": ze, "_DKEvlRFT.js": Ne, "_BgTQkGHw.js": ve, "MarkdownRenderer.CEk2HVtF.css": qe, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_omrco8F4.js": Ze, "_DHWHPuxT.js": be, "_Cu-FIESN.js": Ee, "_ymJ5NHXU.js": Ye, "_58j6fSHb.js": he, "__I7zX1hp.js": ye, "_BuNPglMN.js": Ce, "_KiLc3yVa.js": Je, "_CwHFm-oR.js": Le, "_lyDHIuzO.js": Ge, "_DNV-kwhi.js": He, "_CJR9iA_2.js": $e, "_DAEfPZzO.js": aa, "_BP61iLYe.js": ta, "_BkOLPXZH.js": ra }, prefetch: { "_id_.Bfli5g0z.css": oa, "flashcards.ICvZV-Vm.png": la = { file: "flashcards.ICvZV-Vm.png", resourceType: "image", prefetch: true, mimeType: "image/png" }, "study-guide.BA6NWRPA.png": _a = { file: "study-guide.BA6NWRPA.png", resourceType: "image", prefetch: true, mimeType: "image/png" }, "practice.DslxcpkH.png": Ta = { file: "practice.DslxcpkH.png", resourceType: "image", prefetch: true, mimeType: "image/png" }, "match.ARkrkEri.png": Xa = { file: "match.ARkrkEri.png", resourceType: "image", prefetch: true, mimeType: "image/png" }, "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De, "chat.DDXhWmJw.png": ke, "MarkdownRenderer.CEk2HVtF.css": qe } }, "_id_.Bfli5g0z.css": { scripts: {}, styles: {}, preload: { "_id_.Bfli5g0z.css": oa }, prefetch: {} }, "flashcards.ICvZV-Vm.png": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "study-guide.BA6NWRPA.png": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "practice.DslxcpkH.png": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "match.ARkrkEri.png": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "_DDi7BBYG.js": { scripts: {}, styles: {}, preload: { "_DDi7BBYG.js": pa = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DDi7BBYG.js", name: "dist" } }, prefetch: {} }, "_DMK6l-5U.js": { scripts: {}, styles: {}, preload: { "_DMK6l-5U.js": ua = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DMK6l-5U.js", name: "catalog" } }, prefetch: {} }, "_ChRZzNTs.js": { scripts: {}, styles: {}, preload: { "_ChRZzNTs.js": Ka = { resourceType: "script", module: true, prefetch: true, preload: true, file: "ChRZzNTs.js", name: "catalog", imports: ["_DMK6l-5U.js"] }, "_DMK6l-5U.js": ua }, prefetch: {} }, "_DakktQPo.js": { scripts: {}, styles: {}, preload: { "_DakktQPo.js": na = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DakktQPo.js", name: "http", imports: ["_DuqgYnXA.js", "_BSPB2cL8.js", "_DNaw6KYU.js", "_BuNPglMN.js"], dynamicImports: ca = ["src/composables/platform/web-api.ts"] }, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_DNaw6KYU.js": t2, "_BuNPglMN.js": Ce }, prefetch: {} }, "_P4frLxaI.js": { scripts: {}, styles: {}, preload: { "_P4frLxaI.js": wa = { resourceType: "script", module: true, prefetch: true, preload: true, file: "P4frLxaI.js", name: "credentials", imports: ["_DuqgYnXA.js", "_BSPB2cL8.js", "_C7y-hBT4.js", "_DNaw6KYU.js"], dynamicImports: da = ["src/composables/ai/credentials/web.ts"] }, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2 }, prefetch: {} }, "_D33Hiyx4.js": { scripts: {}, styles: {}, preload: { "_D33Hiyx4.js": Ba = { resourceType: "script", module: true, prefetch: true, preload: true, file: "D33Hiyx4.js", name: "connection-status", imports: ["_C0FnF6B9.js", "_CoT1qCUq.js", "_DuqgYnXA.js", "_DakktQPo.js", "_P4frLxaI.js"], dynamicImports: ga = ["_CenSu9pQ.js"] }, "_C0FnF6B9.js": a, "_CoT1qCUq.js": _, "_DuqgYnXA.js": f, "_DakktQPo.js": na, "_BSPB2cL8.js": r, "_DNaw6KYU.js": t2, "_BuNPglMN.js": Ce, "_P4frLxaI.js": wa, "_C7y-hBT4.js": p }, prefetch: {} }, "_Bwbix4wE.js": { scripts: {}, styles: {}, preload: { "_Bwbix4wE.js": Sa = { resourceType: "script", module: true, prefetch: true, preload: true, file: "Bwbix4wE.js", name: "registry", imports: ["_C0FnF6B9.js", "_DDi7BBYG.js", "_Cu-FIESN.js", "_DMK6l-5U.js", "_ChRZzNTs.js", "_DakktQPo.js", "_P4frLxaI.js", "_D33Hiyx4.js"] }, "_C0FnF6B9.js": a, "_DDi7BBYG.js": pa, "_Cu-FIESN.js": Ee, "_DMK6l-5U.js": ua, "_ChRZzNTs.js": Ka, "_DakktQPo.js": na, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_DNaw6KYU.js": t2, "_BuNPglMN.js": Ce, "_P4frLxaI.js": wa, "_C7y-hBT4.js": p, "_D33Hiyx4.js": Ba, "_CoT1qCUq.js": _ }, prefetch: {} }, "_DH04fbtw.js": { scripts: {}, styles: {}, preload: { "_DH04fbtw.js": Da = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DH04fbtw.js", name: "dist", imports: ["_C0FnF6B9.js", "_DDi7BBYG.js"] }, "_C0FnF6B9.js": a, "_DDi7BBYG.js": pa }, prefetch: {} }, "_BMF2dx8Y.js": { scripts: {}, styles: { "entry.DpS-p5p_.css": d, "MarkdownRenderer.CEk2HVtF.css": qe }, preload: { "_BMF2dx8Y.js": ja = { resourceType: "script", module: true, prefetch: true, preload: true, file: "BMF2dx8Y.js", name: "use-fact-check", imports: ["_CoT1qCUq.js", "_C7y-hBT4.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_DKEvlRFT.js", "_BgTQkGHw.js", "_Bwbix4wE.js", "_DH04fbtw.js", "_omrco8F4.js", "_DHWHPuxT.js"] }, "_CoT1qCUq.js": _, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_D1CiTnQp.js": K, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_C1OZectE.js": X, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_DKEvlRFT.js": Ne, "_BgTQkGHw.js": ve, "MarkdownRenderer.CEk2HVtF.css": qe, "_C0FnF6B9.js": a, "_Bwbix4wE.js": Sa, "_DDi7BBYG.js": pa, "_Cu-FIESN.js": Ee, "_DMK6l-5U.js": ua, "_ChRZzNTs.js": Ka, "_DakktQPo.js": na, "_BuNPglMN.js": Ce, "_P4frLxaI.js": wa, "_D33Hiyx4.js": Ba, "_DH04fbtw.js": Da, "_omrco8F4.js": Ze, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_DHWHPuxT.js": be, "_ymJ5NHXU.js": Ye, "_58j6fSHb.js": he, "__I7zX1hp.js": ye, "_KiLc3yVa.js": Je }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De, "MarkdownRenderer.CEk2HVtF.css": qe } }, "MarkdownRenderer.CEk2HVtF.css": { scripts: {}, styles: {}, preload: { "MarkdownRenderer.CEk2HVtF.css": qe }, prefetch: {} }, "_Bqe5OFuP.js": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "_Bqe5OFuP.js": Ra = { resourceType: "script", module: true, prefetch: true, preload: true, file: "Bqe5OFuP.js", name: "ResetTracerDialog", imports: ["_CoT1qCUq.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_omrco8F4.js"] }, "_CoT1qCUq.js": _, "_D1CiTnQp.js": K, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_C1OZectE.js": X, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_omrco8F4.js": Ze, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "_ByWL3V-x.js": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "_ByWL3V-x.js": Ca = { resourceType: "script", module: true, prefetch: true, preload: true, file: "ByWL3V-x.js", name: "composables", imports: ["_DOQDXZsa.js", "_CoT1qCUq.js", "node_modules/nuxt/dist/app/entry.js"] }, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_C1OZectE.js": X, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "_C1bbhg3s.js": { scripts: {}, styles: {}, preload: { "_C1bbhg3s.js": ma = { resourceType: "script", module: true, prefetch: true, preload: true, file: "C1bbhg3s.js", name: "SetIcon", imports: ["_CoT1qCUq.js", "_BaPl6vKy.js"] }, "_CoT1qCUq.js": _, "_BaPl6vKy.js": Oe }, prefetch: {} }, "_CLXvOnT1.js": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "_CLXvOnT1.js": ya = { resourceType: "script", module: true, prefetch: true, preload: true, file: "CLXvOnT1.js", name: "ClassCodeDialog", imports: ["_CoT1qCUq.js", "_D1CiTnQp.js", "_omrco8F4.js", "_CwHFm-oR.js"] }, "_CoT1qCUq.js": _, "_D1CiTnQp.js": K, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_D9X70ea_.js": l, "_omrco8F4.js": Ze, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_CwHFm-oR.js": Le, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_C1OZectE.js": X, "_DNESoGCl.js": i, "_BTtBPxxM.js": u }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "_CNs_Ozdc.js": { scripts: {}, styles: {}, preload: { "_CNs_Ozdc.js": Ma = { resourceType: "script", module: true, prefetch: true, preload: true, file: "CNs_Ozdc.js", name: "composables" } }, prefetch: {} }, "_CTjMpgdN.js": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "_CTjMpgdN.js": ha = { resourceType: "script", module: true, prefetch: true, preload: true, file: "CTjMpgdN.js", name: "subscription", imports: ["node_modules/nuxt/dist/app/entry.js"] }, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "chat.DDXhWmJw.png": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "_CenSu9pQ.js": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "_CenSu9pQ.js": xa = { resourceType: "script", module: true, prefetch: true, preload: true, file: "CenSu9pQ.js", name: "session", imports: ["_C0FnF6B9.js", "_DuqgYnXA.js", "_BSPB2cL8.js", "_DNaw6KYU.js", "node_modules/nuxt/dist/app/entry.js"], dynamicImports: Ia = ["_Cx9_0Zxu.js"] }, "_C0FnF6B9.js": a, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_DNaw6KYU.js": t2, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_C7y-hBT4.js": p, "_3i8JKPp4.js": s, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "_Cmyvdx_-.js": { scripts: {}, styles: {}, preload: { "_Cmyvdx_-.js": Fa = { resourceType: "script", module: true, prefetch: true, preload: true, file: "Cmyvdx_-.js", name: "github-oauth", imports: ["_BSPB2cL8.js", "_DNaw6KYU.js", "_DakktQPo.js"] }, "_BSPB2cL8.js": r, "_DNaw6KYU.js": t2, "_DakktQPo.js": na, "_DuqgYnXA.js": f, "_BuNPglMN.js": Ce }, prefetch: {} }, "_CtVf1DiR.js": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "_CtVf1DiR.js": za = { resourceType: "script", module: true, prefetch: true, preload: true, file: "CtVf1DiR.js", name: "auth", imports: ["_C0FnF6B9.js", "_BSPB2cL8.js", "_C7y-hBT4.js", "_DNaw6KYU.js", "_3i8JKPp4.js", "_BTtBPxxM.js", "node_modules/nuxt/dist/app/entry.js", "_KiLc3yVa.js", "_DakktQPo.js", "_Cmyvdx_-.js", "_CenSu9pQ.js"] }, "_C0FnF6B9.js": a, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_BTtBPxxM.js": u, "_DNESoGCl.js": i, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_D9X70ea_.js": l, "_D1CiTnQp.js": K, "_KiLc3yVa.js": Je, "_DakktQPo.js": na, "_BuNPglMN.js": Ce, "_Cmyvdx_-.js": Fa, "_CenSu9pQ.js": xa }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "_Cx9_0Zxu.js": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "_Cx9_0Zxu.js": Aa = { resourceType: "script", module: true, prefetch: true, preload: true, file: "Cx9_0Zxu.js", name: "cloud-provider-keys", imports: ["_C0FnF6B9.js", "_DuqgYnXA.js", "_BSPB2cL8.js", "_3i8JKPp4.js", "_D9X70ea_.js", "node_modules/nuxt/dist/app/entry.js", "_DMK6l-5U.js", "_P4frLxaI.js"], dynamicImports: Na = ["src/composables/ai/credentials/web.ts", "src/composables/db/browser.ts"] }, "_C0FnF6B9.js": a, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DNaw6KYU.js": t2, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_C7y-hBT4.js": p, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D1CiTnQp.js": K, "_DMK6l-5U.js": ua, "_P4frLxaI.js": wa }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "_Cy6QaPw7.js": { scripts: {}, styles: {}, preload: { "_Cy6QaPw7.js": ka = { resourceType: "script", module: true, prefetch: true, preload: true, file: "Cy6QaPw7.js", name: "concurrency" } }, prefetch: {} }, "_DClUiGwA.js": { scripts: {}, styles: {}, preload: { "_DClUiGwA.js": qa = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DClUiGwA.js", name: "CreateModeIcon", imports: ["_CoT1qCUq.js", "_BaPl6vKy.js", "_C4juBKIn.js"] }, "_CoT1qCUq.js": _, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe }, prefetch: {} }, "_DJIE5NFf.js": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "_DJIE5NFf.js": va = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DJIE5NFf.js", name: "classrooms", imports: ["_C0FnF6B9.js", "_3i8JKPp4.js", "node_modules/nuxt/dist/app/entry.js", "_CenSu9pQ.js"] }, "_C0FnF6B9.js": a, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_DNaw6KYU.js": t2, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_C7y-hBT4.js": p, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K, "_CenSu9pQ.js": xa }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "_DmwaeKks.js": { scripts: {}, styles: {}, preload: { "_DmwaeKks.js": Oa = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DmwaeKks.js", name: "generate", imports: ["_C0FnF6B9.js", "_DH04fbtw.js", "_ymJ5NHXU.js", "_58j6fSHb.js"] }, "_C0FnF6B9.js": a, "_DH04fbtw.js": Da, "_DDi7BBYG.js": pa, "_ymJ5NHXU.js": Ye, "_58j6fSHb.js": he, "_DuqgYnXA.js": f, "__I7zX1hp.js": ye, "_BuNPglMN.js": Ce }, prefetch: {} }, "_MarkdownRenderer.CEk2HVtF.css": { scripts: {}, styles: {}, preload: { "_MarkdownRenderer.CEk2HVtF.css": { resourceType: "style", prefetch: true, preload: true, file: "MarkdownRenderer.CEk2HVtF.css", src: "_MarkdownRenderer.CEk2HVtF.css" } }, prefetch: {} }, "__id_.Bfli5g0z.css": { scripts: {}, styles: {}, preload: { "__id_.Bfli5g0z.css": { resourceType: "style", prefetch: true, preload: true, file: "_id_.Bfli5g0z.css", src: "__id_.Bfli5g0z.css" } }, prefetch: {} }, "assets/icons/study-modes/chat.png": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "assets/icons/study-modes/flashcards.png": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "assets/icons/study-modes/match.png": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "assets/icons/study-modes/practice.png": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "assets/icons/study-modes/study-guide.png": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "components/FloatingPageChat.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "components/FloatingPageChat.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "DfU9rPl0.js", name: "FloatingPageChat", src: "components/FloatingPageChat.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_DuqgYnXA.js", "_C7y-hBT4.js", "_3i8JKPp4.js", "_D9X70ea_.js", "node_modules/nuxt/dist/app/entry.js", "_Ca1NHEsT.js"], dynamicImports: Pa = ["_BgTQkGHw.js", "_Bwbix4wE.js", "_DAEfPZzO.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_DuqgYnXA.js": f, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DNaw6KYU.js": t2, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D1CiTnQp.js": K, "_Ca1NHEsT.js": Ae, "_CIxQqB1T.js": ze, "_DKEvlRFT.js": Ne }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De, "chat.DDXhWmJw.png": ke } }, "node_modules/katex/dist/fonts/KaTeX_AMS-Regular.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_AMS-Regular.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_AMS-Regular.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Caligraphic-Bold.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Caligraphic-Regular.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Fraktur-Bold.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Fraktur-Bold.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Fraktur-Bold.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Fraktur-Regular.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Fraktur-Regular.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Fraktur-Regular.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Main-Bold.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Main-Bold.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Main-Bold.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Main-BoldItalic.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Main-BoldItalic.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Main-BoldItalic.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Main-Italic.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Main-Italic.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Main-Italic.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Main-Regular.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Main-Regular.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Main-Regular.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Math-BoldItalic.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Math-BoldItalic.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Math-BoldItalic.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Math-Italic.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Math-Italic.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Math-Italic.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Bold.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Bold.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Bold.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Italic.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Italic.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Italic.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Regular.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Regular.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Regular.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Script-Regular.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Script-Regular.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Script-Regular.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Size1-Regular.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Size1-Regular.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Size1-Regular.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Size2-Regular.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Size2-Regular.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Size2-Regular.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Size3-Regular.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Size3-Regular.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Size4-Regular.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Size4-Regular.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Size4-Regular.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Typewriter-Regular.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Typewriter-Regular.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/katex/dist/fonts/KaTeX_Typewriter-Regular.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/nuxt/dist/app/components/error-404.vue": { scripts: {}, styles: { "error-404.C3wqHTJz.css": Ua = { file: "error-404.C3wqHTJz.css", resourceType: "style", prefetch: true, preload: true }, "entry.DpS-p5p_.css": d }, preload: { "node_modules/nuxt/dist/app/components/error-404.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "Bif3aajk.js", name: "error-404", src: "node_modules/nuxt/dist/app/components/error-404.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_ByWL3V-x.js", "node_modules/nuxt/dist/app/entry.js"], css: ["error-404.C3wqHTJz.css"] }, "error-404.C3wqHTJz.css": Ua, "_CoT1qCUq.js": _, "_ByWL3V-x.js": Ca, "_DOQDXZsa.js": T, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_C1OZectE.js": X, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K }, prefetch: { "error-404.C3wqHTJz.css": Ua, "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "error-404.C3wqHTJz.css": { scripts: {}, styles: {}, preload: { "error-404.C3wqHTJz.css": Ua }, prefetch: {} }, "node_modules/nuxt/dist/app/components/error-500.vue": { scripts: {}, styles: { "error-500.D6rBzoDj.css": Za = { file: "error-500.D6rBzoDj.css", resourceType: "style", prefetch: true, preload: true }, "entry.DpS-p5p_.css": d }, preload: { "node_modules/nuxt/dist/app/components/error-500.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "DXug_GbP.js", name: "error-500", src: "node_modules/nuxt/dist/app/components/error-500.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_ByWL3V-x.js", "node_modules/nuxt/dist/app/entry.js"], css: ["error-500.D6rBzoDj.css"] }, "error-500.D6rBzoDj.css": Za, "_CoT1qCUq.js": _, "_ByWL3V-x.js": Ca, "_DOQDXZsa.js": T, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_C1OZectE.js": X, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K }, prefetch: { "error-500.D6rBzoDj.css": Za, "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "error-500.D6rBzoDj.css": { scripts: {}, styles: {}, preload: { "error-500.D6rBzoDj.css": Za }, prefetch: {} }, "entry.DpS-p5p_.css": { scripts: {}, styles: {}, preload: { "entry.DpS-p5p_.css": d }, prefetch: {} }, "KaTeX_AMS-Regular.BQhdFMY1.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_AMS-Regular.DMm9YOAa.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_AMS-Regular.DRggAlZN.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Fraktur-Bold.BsDP51OF.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Fraktur-Regular.CB_wures.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Main-Bold.Cx986IdX.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Main-Bold.Jm3AIy58.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Main-Bold.waoOVXN0.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Main-BoldItalic.SpSLRI95.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Main-Italic.NWA7e6Wa.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Main-Italic.BMLOBm91.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Main-Italic.3WenGoN9.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Main-Regular.B22Nviop.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Main-Regular.Dr94JaBh.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Main-Regular.ypZvNtVU.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Math-Italic.t53AETM-.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Math-Italic.DA0__PXp.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Math-Italic.flOr_0UB.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_SansSerif-Italic.DN2j7dab.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Script-Regular.D3wIWfF6.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Script-Regular.D5yQViql.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Script-Regular.C5JkGWo-.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Size1-Regular.mCD8mA8B.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Size1-Regular.C195tn64.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Size1-Regular.Dbsnue_I.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Size2-Regular.Dy4dx90m.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Size2-Regular.oD1tc_U0.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Size2-Regular.B7gKUWhC.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Size3-Regular.CTq5MqoE.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Size3-Regular.DgpXs0kz.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Size4-Regular.BF-4gkZK.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Size4-Regular.DWFBv043.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": { scripts: {}, styles: {}, preload: {}, prefetch: {} }, "node_modules/pdfjs-dist/build/pdf.mjs": { scripts: {}, styles: {}, preload: { "node_modules/pdfjs-dist/build/pdf.mjs": { resourceType: "script", module: true, prefetch: true, preload: true, file: "z4myVNlC.js", name: "pdf", src: "node_modules/pdfjs-dist/build/pdf.mjs", isDynamicEntry: true, imports: ["_DuqgYnXA.js"] }, "_DuqgYnXA.js": f }, prefetch: {} }, "node_modules/pdfjs-dist/build/pdf.worker.mjs": { scripts: {}, styles: {}, preload: { "node_modules/pdfjs-dist/build/pdf.worker.mjs": { resourceType: "script", module: true, prefetch: true, preload: true, file: "pdf.worker.TGcf_-kp.mjs", src: "node_modules/pdfjs-dist/build/pdf.worker.mjs" } }, prefetch: {} }, "node_modules/pdfjs-dist/build/pdf.worker.mjs?url": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "node_modules/pdfjs-dist/build/pdf.worker.mjs?url": { resourceType: "script", module: true, prefetch: true, preload: true, file: "BtC09ozt.js", name: "pdf.worker", src: "node_modules/pdfjs-dist/build/pdf.worker.mjs?url", isDynamicEntry: true, imports: ["node_modules/nuxt/dist/app/entry.js"], assets: ["pdf.worker.TGcf_-kp.mjs"] }, "pdf.worker.TGcf_-kp.mjs": Ea = { file: "pdf.worker.TGcf_-kp.mjs", resourceType: "script", module: true, prefetch: true, preload: true }, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K }, prefetch: { "pdf.worker.TGcf_-kp.mjs": Ea, "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "pdf.worker.TGcf_-kp.mjs": { scripts: {}, styles: {}, preload: { "pdf.worker.TGcf_-kp.mjs": Ea }, prefetch: {} }, "node_modules/tesseract.js/dist/worker.min.js": { scripts: {}, styles: {}, preload: { "node_modules/tesseract.js/dist/worker.min.js": { resourceType: "script", module: true, prefetch: true, preload: true, file: "worker.min.32WLk7pY.js", src: "node_modules/tesseract.js/dist/worker.min.js" } }, prefetch: {} }, "node_modules/tesseract.js/dist/worker.min.js?url": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "node_modules/tesseract.js/dist/worker.min.js?url": { resourceType: "script", module: true, prefetch: true, preload: true, file: "Bz0bHmaK.js", name: "worker.min", src: "node_modules/tesseract.js/dist/worker.min.js?url", isDynamicEntry: true, imports: ["node_modules/nuxt/dist/app/entry.js"], assets: ["worker.min.32WLk7pY.js"] }, "worker.min.32WLk7pY.js": Ya = { file: "worker.min.32WLk7pY.js", resourceType: "script", module: true, prefetch: true, preload: true }, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K }, prefetch: { "worker.min.32WLk7pY.js": Ya, "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "worker.min.32WLk7pY.js": { scripts: {}, styles: {}, preload: { "worker.min.32WLk7pY.js": Ya }, prefetch: {} }, "node_modules/tesseract.js/src/index.js": { scripts: {}, styles: {}, preload: { "node_modules/tesseract.js/src/index.js": { resourceType: "script", module: true, prefetch: true, preload: true, file: "Dd1vPuSX.js", name: "src", src: "node_modules/tesseract.js/src/index.js", isDynamicEntry: true, imports: ["_C0FnF6B9.js"] }, "_C0FnF6B9.js": a }, prefetch: {} }, "pages/auth/callback.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "pages/auth/callback.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "B8DElJvO.js", name: "callback", src: "pages/auth/callback.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C7y-hBT4.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_CNs_Ozdc.js"] }, "_CoT1qCUq.js": _, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_D1CiTnQp.js": K, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_C1OZectE.js": X, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_CNs_Ozdc.js": Ma }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "pages/create/basic.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d, "MarkdownRenderer.CEk2HVtF.css": qe }, preload: { "pages/create/basic.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "BTJ8lpNB.js", name: "basic", src: "pages/create/basic.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_3i8JKPp4.js", "_BTtBPxxM.js", "_D9X70ea_.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_omrco8F4.js", "_DHWHPuxT.js", "_ymJ5NHXU.js", "_KiLc3yVa.js", "_BMF2dx8Y.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_DNaw6KYU.js": t2, "_BTtBPxxM.js": u, "_DNESoGCl.js": i, "_D9X70ea_.js": l, "_D1CiTnQp.js": K, "_C7y-hBT4.js": p, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_omrco8F4.js": Ze, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_DHWHPuxT.js": be, "_Cu-FIESN.js": Ee, "_ymJ5NHXU.js": Ye, "_58j6fSHb.js": he, "_C0FnF6B9.js": a, "__I7zX1hp.js": ye, "_BuNPglMN.js": Ce, "_KiLc3yVa.js": Je, "_BMF2dx8Y.js": ja, "_DKEvlRFT.js": Ne, "_BgTQkGHw.js": ve, "MarkdownRenderer.CEk2HVtF.css": qe, "_Bwbix4wE.js": Sa, "_DDi7BBYG.js": pa, "_DMK6l-5U.js": ua, "_ChRZzNTs.js": Ka, "_DakktQPo.js": na, "_P4frLxaI.js": wa, "_D33Hiyx4.js": Ba, "_DH04fbtw.js": Da }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De, "MarkdownRenderer.CEk2HVtF.css": qe } }, "pages/create/generate.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "pages/create/generate.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "3iSiVjmt.js", name: "generate", src: "pages/create/generate.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_BSPB2cL8.js", "_C7y-hBT4.js", "_DNaw6KYU.js", "_3i8JKPp4.js", "_-WKEmQhb.js", "_BTtBPxxM.js", "_D9X70ea_.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_Bwbix4wE.js", "_W5zwDZH1.js", "_omrco8F4.js", "_DHWHPuxT.js", "__I7zX1hp.js", "_58j6fSHb.js", "_KiLc3yVa.js", "_CTjMpgdN.js", "_DmwaeKks.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_-WKEmQhb.js": Re, "_C0FnF6B9.js": a, "_DNESoGCl.js": i, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_BTtBPxxM.js": u, "_D1CiTnQp.js": K, "_Bwbix4wE.js": Sa, "_DDi7BBYG.js": pa, "_Cu-FIESN.js": Ee, "_DMK6l-5U.js": ua, "_ChRZzNTs.js": Ka, "_DakktQPo.js": na, "_BuNPglMN.js": Ce, "_P4frLxaI.js": wa, "_D33Hiyx4.js": Ba, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_omrco8F4.js": Ze, "_DHWHPuxT.js": be, "_ymJ5NHXU.js": Ye, "_58j6fSHb.js": he, "__I7zX1hp.js": ye, "_KiLc3yVa.js": Je, "_CTjMpgdN.js": ha, "_DmwaeKks.js": Oa, "_DH04fbtw.js": Da }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "pages/create/synthesize.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "pages/create/synthesize.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "lVNn4F3S.js", name: "synthesize", src: "pages/create/synthesize.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_BSPB2cL8.js", "_C7y-hBT4.js", "_3i8JKPp4.js", "_BTtBPxxM.js", "_D9X70ea_.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_Bwbix4wE.js", "_DH04fbtw.js", "_W5zwDZH1.js", "_DHWHPuxT.js", "_ymJ5NHXU.js", "_KiLc3yVa.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_BTtBPxxM.js": u, "_DNESoGCl.js": i, "_D9X70ea_.js": l, "_D1CiTnQp.js": K, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_Bwbix4wE.js": Sa, "_C0FnF6B9.js": a, "_DDi7BBYG.js": pa, "_Cu-FIESN.js": Ee, "_DMK6l-5U.js": ua, "_ChRZzNTs.js": Ka, "_DakktQPo.js": na, "_BuNPglMN.js": Ce, "_P4frLxaI.js": wa, "_D33Hiyx4.js": Ba, "_DH04fbtw.js": Da, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_DHWHPuxT.js": be, "_omrco8F4.js": Ze, "_ymJ5NHXU.js": Ye, "_58j6fSHb.js": he, "__I7zX1hp.js": ye, "_KiLc3yVa.js": Je }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "pages/first-run.vue": { scripts: {}, styles: { "first-run.xoV6d82S.css": Wa = { file: "first-run.xoV6d82S.css", resourceType: "style", prefetch: true, preload: true }, "entry.DpS-p5p_.css": d }, preload: { "pages/first-run.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "YSTTKXwf.js", name: "first-run", src: "pages/first-run.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_BSPB2cL8.js", "_C7y-hBT4.js", "_3i8JKPp4.js", "_BTtBPxxM.js", "_D9X70ea_.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_CIxQqB1T.js", "_CNs_Ozdc.js", "_W5zwDZH1.js", "_KiLc3yVa.js", "_Bqe5OFuP.js", "_CenSu9pQ.js", "_CtVf1DiR.js", "_Cx9_0Zxu.js"], css: ["first-run.xoV6d82S.css"] }, "first-run.xoV6d82S.css": Wa, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_BTtBPxxM.js": u, "_DNESoGCl.js": i, "_D9X70ea_.js": l, "_D1CiTnQp.js": K, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_CIxQqB1T.js": ze, "_CNs_Ozdc.js": Ma, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_KiLc3yVa.js": Je, "_Bqe5OFuP.js": Ra, "_omrco8F4.js": Ze, "_CenSu9pQ.js": xa, "_C0FnF6B9.js": a, "_CtVf1DiR.js": za, "_DakktQPo.js": na, "_BuNPglMN.js": Ce, "_Cmyvdx_-.js": Fa, "_Cx9_0Zxu.js": Aa, "_DMK6l-5U.js": ua, "_P4frLxaI.js": wa }, prefetch: { "first-run.xoV6d82S.css": Wa, "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "first-run.xoV6d82S.css": { scripts: {}, styles: {}, preload: { "first-run.xoV6d82S.css": Wa }, prefetch: {} }, "pages/index.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "pages/index.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "C0-rP3Ca.js", name: "pages", src: "pages/index.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_C7y-hBT4.js", "_3i8JKPp4.js", "_DNESoGCl.js", "_BTtBPxxM.js", "_D9X70ea_.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_W5zwDZH1.js", "_omrco8F4.js", "_KiLc3yVa.js", "_DClUiGwA.js", "_C1bbhg3s.js", "_CwHFm-oR.js", "_lyDHIuzO.js", "_DJIE5NFf.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_omrco8F4.js": Ze, "_KiLc3yVa.js": Je, "_DClUiGwA.js": qa, "_C1bbhg3s.js": ma, "_CwHFm-oR.js": Le, "_lyDHIuzO.js": Ge, "_DJIE5NFf.js": va, "_C0FnF6B9.js": a, "_CenSu9pQ.js": xa }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "pages/public-sets/[id].vue": { scripts: {}, styles: { "_id_.Bfli5g0z.css": oa, "entry.DpS-p5p_.css": d, "MarkdownRenderer.CEk2HVtF.css": qe }, preload: { "pages/public-sets/[id].vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "DR0b2V_-.js", name: "_id_", src: "pages/public-sets/[id].vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_B-D7dJ5g.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_B-D7dJ5g.js": ia, "_id_.Bfli5g0z.css": oa, "_C0FnF6B9.js": a, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_3i8JKPp4.js": s, "_DNaw6KYU.js": t2, "_DNESoGCl.js": i, "_CYOK9Egh.js": xe, "_DUEfs9ab.js": Ie, "_-WKEmQhb.js": Re, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_BTtBPxxM.js": u, "_D1CiTnQp.js": K, "_BEppUSYT.js": Fe, "_Ca1NHEsT.js": Ae, "_CIxQqB1T.js": ze, "_DKEvlRFT.js": Ne, "_BgTQkGHw.js": ve, "MarkdownRenderer.CEk2HVtF.css": qe, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_omrco8F4.js": Ze, "_DHWHPuxT.js": be, "_Cu-FIESN.js": Ee, "_ymJ5NHXU.js": Ye, "_58j6fSHb.js": he, "__I7zX1hp.js": ye, "_BuNPglMN.js": Ce, "_KiLc3yVa.js": Je, "_CwHFm-oR.js": Le, "_lyDHIuzO.js": Ge, "_DNV-kwhi.js": He, "_CJR9iA_2.js": $e, "_DAEfPZzO.js": aa, "_BP61iLYe.js": ta, "_BkOLPXZH.js": ra }, prefetch: { "_id_.Bfli5g0z.css": oa, "flashcards.ICvZV-Vm.png": la, "study-guide.BA6NWRPA.png": _a, "practice.DslxcpkH.png": Ta, "match.ARkrkEri.png": Xa, "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De, "chat.DDXhWmJw.png": ke, "MarkdownRenderer.CEk2HVtF.css": qe } }, "pages/public-sets/index.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "pages/public-sets/index.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "Dq033PX3.js", name: "public-sets", src: "pages/public-sets/index.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_W5zwDZH1.js", "_CwHFm-oR.js", "_lyDHIuzO.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_D1CiTnQp.js": K, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_CwHFm-oR.js": Le, "_lyDHIuzO.js": Ge }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "pages/set/[id]-flashcards.vue": { scripts: {}, styles: { "_id_-flashcards.Brokb39F.css": Ja = { file: "_id_-flashcards.Brokb39F.css", resourceType: "style", prefetch: true, preload: true }, "entry.DpS-p5p_.css": d, "MarkdownRenderer.CEk2HVtF.css": qe }, preload: { "pages/set/[id]-flashcards.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "bsfWI-nE.js", name: "_id_-flashcards", src: "pages/set/[id]-flashcards.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_C7y-hBT4.js", "_3i8JKPp4.js", "_CYOK9Egh.js", "_D9X70ea_.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_CIxQqB1T.js", "_BgTQkGHw.js", "_CNs_Ozdc.js", "_KiLc3yVa.js", "_BP61iLYe.js", "_BkOLPXZH.js"], css: ["_id_-flashcards.Brokb39F.css"] }, "_id_-flashcards.Brokb39F.css": Ja, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_CYOK9Egh.js": xe, "_DUEfs9ab.js": Ie, "_D9X70ea_.js": l, "_D1CiTnQp.js": K, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_CIxQqB1T.js": ze, "_BgTQkGHw.js": ve, "MarkdownRenderer.CEk2HVtF.css": qe, "_C0FnF6B9.js": a, "_CNs_Ozdc.js": Ma, "_KiLc3yVa.js": Je, "_BP61iLYe.js": ta, "_BkOLPXZH.js": ra }, prefetch: { "_id_-flashcards.Brokb39F.css": Ja, "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De, "MarkdownRenderer.CEk2HVtF.css": qe } }, "_id_-flashcards.Brokb39F.css": { scripts: {}, styles: {}, preload: { "_id_-flashcards.Brokb39F.css": Ja }, prefetch: {} }, "pages/set/[id]-learn.vue": { scripts: {}, styles: { "_id_-learn.DqGQqNXT.css": ba = { file: "_id_-learn.DqGQqNXT.css", resourceType: "style", prefetch: true, preload: true }, "entry.DpS-p5p_.css": d, "MarkdownRenderer.CEk2HVtF.css": qe }, preload: { "pages/set/[id]-learn.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "BfMudgLE.js", name: "_id_-learn", src: "pages/set/[id]-learn.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_DuqgYnXA.js", "_C7y-hBT4.js", "_3i8JKPp4.js", "_BEppUSYT.js", "_BTtBPxxM.js", "_D9X70ea_.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_BgTQkGHw.js", "_CNs_Ozdc.js", "_DHWHPuxT.js", "_KiLc3yVa.js", "_DUEfs9ab.js", "_CJR9iA_2.js", "_BP61iLYe.js"], dynamicImports: La = ["_Bwbix4wE.js", "_DH04fbtw.js"], css: ["_id_-learn.DqGQqNXT.css"] }, "_id_-learn.DqGQqNXT.css": ba, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_DuqgYnXA.js": f, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DNaw6KYU.js": t2, "_BEppUSYT.js": Fe, "_BTtBPxxM.js": u, "_DNESoGCl.js": i, "_D9X70ea_.js": l, "_D1CiTnQp.js": K, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_BgTQkGHw.js": ve, "MarkdownRenderer.CEk2HVtF.css": qe, "_C0FnF6B9.js": a, "_CNs_Ozdc.js": Ma, "_DHWHPuxT.js": be, "_omrco8F4.js": Ze, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_Cu-FIESN.js": Ee, "_ymJ5NHXU.js": Ye, "_58j6fSHb.js": he, "__I7zX1hp.js": ye, "_BuNPglMN.js": Ce, "_KiLc3yVa.js": Je, "_DUEfs9ab.js": Ie, "_CJR9iA_2.js": $e, "_BP61iLYe.js": ta }, prefetch: { "_id_-learn.DqGQqNXT.css": ba, "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De, "MarkdownRenderer.CEk2HVtF.css": qe } }, "_id_-learn.DqGQqNXT.css": { scripts: {}, styles: {}, preload: { "_id_-learn.DqGQqNXT.css": ba }, prefetch: {} }, "pages/set/[id]-match.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d, "MarkdownRenderer.CEk2HVtF.css": qe }, preload: { "pages/set/[id]-match.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "yGYSWVbr.js", name: "_id_-match", src: "pages/set/[id]-match.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_DuqgYnXA.js", "_C7y-hBT4.js", "_3i8JKPp4.js", "_BTtBPxxM.js", "_D9X70ea_.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_BgTQkGHw.js", "_CNs_Ozdc.js", "_KiLc3yVa.js", "_DNV-kwhi.js", "_DUEfs9ab.js", "_BP61iLYe.js"], dynamicImports: Va = ["_DJIE5NFf.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_DuqgYnXA.js": f, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DNaw6KYU.js": t2, "_BTtBPxxM.js": u, "_DNESoGCl.js": i, "_D9X70ea_.js": l, "_D1CiTnQp.js": K, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_BgTQkGHw.js": ve, "MarkdownRenderer.CEk2HVtF.css": qe, "_C0FnF6B9.js": a, "_CNs_Ozdc.js": Ma, "_KiLc3yVa.js": Je, "_DNV-kwhi.js": He, "_DUEfs9ab.js": Ie, "_BP61iLYe.js": ta }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De, "MarkdownRenderer.CEk2HVtF.css": qe } }, "pages/set/[id]-test.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d, "MarkdownRenderer.CEk2HVtF.css": qe }, preload: { "pages/set/[id]-test.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "CYWUEkeD.js", name: "_id_-test", src: "pages/set/[id]-test.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_BSPB2cL8.js", "_C7y-hBT4.js", "_DNaw6KYU.js", "_3i8JKPp4.js", "_BTtBPxxM.js", "_D9X70ea_.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_BgTQkGHw.js", "_Bwbix4wE.js", "_CNs_Ozdc.js", "_omrco8F4.js", "_DHWHPuxT.js", "_KiLc3yVa.js", "_CJR9iA_2.js", "_BP61iLYe.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_BTtBPxxM.js": u, "_DNESoGCl.js": i, "_D9X70ea_.js": l, "_D1CiTnQp.js": K, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_BgTQkGHw.js": ve, "MarkdownRenderer.CEk2HVtF.css": qe, "_C0FnF6B9.js": a, "_Bwbix4wE.js": Sa, "_DDi7BBYG.js": pa, "_Cu-FIESN.js": Ee, "_DMK6l-5U.js": ua, "_ChRZzNTs.js": Ka, "_DakktQPo.js": na, "_BuNPglMN.js": Ce, "_P4frLxaI.js": wa, "_D33Hiyx4.js": Ba, "_CNs_Ozdc.js": Ma, "_omrco8F4.js": Ze, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_DHWHPuxT.js": be, "_ymJ5NHXU.js": Ye, "_58j6fSHb.js": he, "__I7zX1hp.js": ye, "_KiLc3yVa.js": Je, "_CJR9iA_2.js": $e, "_DUEfs9ab.js": Ie, "_BP61iLYe.js": ta }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De, "MarkdownRenderer.CEk2HVtF.css": qe } }, "pages/set/[id]/edit/index.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d, "MarkdownRenderer.CEk2HVtF.css": qe }, preload: { "pages/set/[id]/edit/index.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "Y6CevI7H.js", name: "edit", src: "pages/set/[id]/edit/index.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_C7y-hBT4.js", "_3i8JKPp4.js", "_BTtBPxxM.js", "_D9X70ea_.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_W5zwDZH1.js", "_omrco8F4.js", "_DHWHPuxT.js", "_ymJ5NHXU.js", "_KiLc3yVa.js", "_BMF2dx8Y.js", "_C1bbhg3s.js", "_CwHFm-oR.js", "_lyDHIuzO.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_BTtBPxxM.js": u, "_DNESoGCl.js": i, "_D9X70ea_.js": l, "_D1CiTnQp.js": K, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_omrco8F4.js": Ze, "_DHWHPuxT.js": be, "_Cu-FIESN.js": Ee, "_ymJ5NHXU.js": Ye, "_58j6fSHb.js": he, "_C0FnF6B9.js": a, "__I7zX1hp.js": ye, "_BuNPglMN.js": Ce, "_KiLc3yVa.js": Je, "_BMF2dx8Y.js": ja, "_DKEvlRFT.js": Ne, "_BgTQkGHw.js": ve, "MarkdownRenderer.CEk2HVtF.css": qe, "_Bwbix4wE.js": Sa, "_DDi7BBYG.js": pa, "_DMK6l-5U.js": ua, "_ChRZzNTs.js": Ka, "_DakktQPo.js": na, "_P4frLxaI.js": wa, "_D33Hiyx4.js": Ba, "_DH04fbtw.js": Da, "_C1bbhg3s.js": ma, "_CwHFm-oR.js": Le, "_lyDHIuzO.js": Ge }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De, "MarkdownRenderer.CEk2HVtF.css": qe } }, "pages/set/[id]/results.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "pages/set/[id]/results.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "xAeXSfFd.js", name: "results", src: "pages/set/[id]/results.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_D1CiTnQp.js": K, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DNESoGCl.js": i, "_BTtBPxxM.js": u }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "pages/settings.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "pages/settings.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "DqAPr7Mw.js", name: "settings", src: "pages/settings.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_DuqgYnXA.js", "_BSPB2cL8.js", "_C7y-hBT4.js", "_3i8JKPp4.js", "_BTtBPxxM.js", "_D9X70ea_.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_W5zwDZH1.js", "_omrco8F4.js", "_KiLc3yVa.js", "_ChRZzNTs.js", "_D33Hiyx4.js", "_Bqe5OFuP.js", "_Cmyvdx_-.js", "_DJIE5NFf.js", "_BkOLPXZH.js"], dynamicImports: Ga = ["src/composables/ai/provider-settings.ts", "_CenSu9pQ.js", "_CtVf1DiR.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_3i8JKPp4.js": s, "_DNaw6KYU.js": t2, "_BTtBPxxM.js": u, "_DNESoGCl.js": i, "_D9X70ea_.js": l, "_D1CiTnQp.js": K, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_omrco8F4.js": Ze, "_KiLc3yVa.js": Je, "_ChRZzNTs.js": Ka, "_DMK6l-5U.js": ua, "_D33Hiyx4.js": Ba, "_C0FnF6B9.js": a, "_DakktQPo.js": na, "_BuNPglMN.js": Ce, "_P4frLxaI.js": wa, "_Bqe5OFuP.js": Ra, "_Cmyvdx_-.js": Fa, "_DJIE5NFf.js": va, "_CenSu9pQ.js": xa, "_BkOLPXZH.js": ra }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "pages/student/classes/[id].vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "pages/student/classes/[id].vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "CSvmdMId.js", name: "_id_", src: "pages/student/classes/[id].vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_C1bbhg3s.js", "_CwHFm-oR.js", "_DJIE5NFf.js", "_BP61iLYe.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_D1CiTnQp.js": K, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_C1bbhg3s.js": ma, "_BaPl6vKy.js": Oe, "_CwHFm-oR.js": Le, "_DJIE5NFf.js": va, "_C0FnF6B9.js": a, "_CenSu9pQ.js": xa, "_BP61iLYe.js": ta }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "pages/study-guide/[setId].vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d, "MarkdownRenderer.CEk2HVtF.css": qe }, preload: { "pages/study-guide/[setId].vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "BrCCkkvX.js", name: "_setId_", src: "pages/study-guide/[setId].vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_BSPB2cL8.js", "_C7y-hBT4.js", "_3i8JKPp4.js", "_BTtBPxxM.js", "_D9X70ea_.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_BgTQkGHw.js", "_KiLc3yVa.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_BTtBPxxM.js": u, "_DNESoGCl.js": i, "_D9X70ea_.js": l, "_D1CiTnQp.js": K, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_BgTQkGHw.js": ve, "MarkdownRenderer.CEk2HVtF.css": qe, "_C0FnF6B9.js": a, "_KiLc3yVa.js": Je }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De, "MarkdownRenderer.CEk2HVtF.css": qe } }, "pages/teacher/classes/[id]/assign.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "pages/teacher/classes/[id]/assign.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "C3_xuxG1.js", name: "assign", src: "pages/teacher/classes/[id]/assign.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_3i8JKPp4.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_DClUiGwA.js", "_C1bbhg3s.js", "_CwHFm-oR.js", "_DJIE5NFf.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_BSPB2cL8.js": r, "_DNaw6KYU.js": t2, "_D1CiTnQp.js": K, "_C7y-hBT4.js": p, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_DClUiGwA.js": qa, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_C1bbhg3s.js": ma, "_CwHFm-oR.js": Le, "_DJIE5NFf.js": va, "_C0FnF6B9.js": a, "_CenSu9pQ.js": xa }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "pages/teacher/classes/[id]/index.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "pages/teacher/classes/[id]/index.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "Bip-Hqa3.js", name: "_id_", src: "pages/teacher/classes/[id]/index.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_CwHFm-oR.js", "_DJIE5NFf.js", "_CLXvOnT1.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_D1CiTnQp.js": K, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_CwHFm-oR.js": Le, "_DJIE5NFf.js": va, "_C0FnF6B9.js": a, "_CenSu9pQ.js": xa, "_CLXvOnT1.js": ya, "_omrco8F4.js": Ze, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "pages/teacher/classes/[id]/manage.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "pages/teacher/classes/[id]/manage.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "DtNPzvWu.js", name: "manage", src: "pages/teacher/classes/[id]/manage.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_omrco8F4.js", "_C1bbhg3s.js", "_CwHFm-oR.js", "_DJIE5NFf.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_D1CiTnQp.js": K, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_omrco8F4.js": Ze, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_C1bbhg3s.js": ma, "_CwHFm-oR.js": Le, "_DJIE5NFf.js": va, "_C0FnF6B9.js": a, "_CenSu9pQ.js": xa }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "pages/teacher/index.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "pages/teacher/index.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "BANQB8Nb.js", name: "teacher", src: "pages/teacher/index.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_omrco8F4.js", "_C1bbhg3s.js", "_CwHFm-oR.js", "_DJIE5NFf.js", "_CLXvOnT1.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_D1CiTnQp.js": K, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_omrco8F4.js": Ze, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe, "_C1bbhg3s.js": ma, "_CwHFm-oR.js": Le, "_DJIE5NFf.js": va, "_C0FnF6B9.js": a, "_CenSu9pQ.js": xa, "_CLXvOnT1.js": ya }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "pages/unlock.vue": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "pages/unlock.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "Cwhw7OVi.js", name: "unlock", src: "pages/unlock.vue", isDynamicEntry: true, imports: ["_CoT1qCUq.js", "_C1OZectE.js", "_D1CiTnQp.js", "node_modules/nuxt/dist/app/entry.js", "_CNs_Ozdc.js", "_KiLc3yVa.js", "_Bqe5OFuP.js"] }, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DOQDXZsa.js": T, "_D1CiTnQp.js": K, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_3i8JKPp4.js": s, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_CNs_Ozdc.js": Ma, "_KiLc3yVa.js": Je, "_Bqe5OFuP.js": Ra, "_omrco8F4.js": Ze, "_W5zwDZH1.js": Ue, "_BaPl6vKy.js": Oe, "_C4juBKIn.js": Pe }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "src/composables/platform/web-api.ts": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "src/composables/platform/web-api.ts": Ha = { resourceType: "script", module: true, prefetch: true, preload: true, file: "D4Qf99be.js", name: "web-api", src: "src/composables/platform/web-api.ts", isDynamicEntry: true, imports: ["_C7y-hBT4.js", "node_modules/nuxt/dist/app/entry.js"] }, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "src/composables/ai/credentials/web.ts": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "src/composables/ai/credentials/web.ts": { resourceType: "script", module: true, prefetch: true, preload: true, file: "DZyAFy_C.js", name: "web", src: "src/composables/ai/credentials/web.ts", isDynamicEntry: true, imports: ["_C7y-hBT4.js", "_P4frLxaI.js", "src/composables/platform/web-api.ts"] }, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "_P4frLxaI.js": wa, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "src/composables/platform/web-api.ts": Ha, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_3i8JKPp4.js": s, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "src/composables/ai/provider-settings.ts": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "src/composables/ai/provider-settings.ts": { resourceType: "script", module: true, prefetch: true, preload: true, file: "CY_WsQ5S.js", name: "provider-settings", src: "src/composables/ai/provider-settings.ts", isDynamicEntry: true, imports: ["_BSPB2cL8.js", "_P4frLxaI.js", "_Cx9_0Zxu.js"] }, "_BSPB2cL8.js": r, "_P4frLxaI.js": wa, "_DuqgYnXA.js": f, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2, "_Cx9_0Zxu.js": Aa, "_C0FnF6B9.js": a, "_3i8JKPp4.js": s, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D1CiTnQp.js": K, "_DMK6l-5U.js": ua }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "src/composables/db/browser.ts": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "src/composables/db/browser.ts": { resourceType: "script", module: true, prefetch: true, preload: true, file: "D3eL2sTE.js", name: "browser", src: "src/composables/db/browser.ts", isDynamicEntry: true, imports: ["_C7y-hBT4.js", "node_modules/nuxt/dist/app/entry.js"] }, "_C7y-hBT4.js": p, "_BSPB2cL8.js": r, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "src/composables/generate/file-limits.ts": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "src/composables/generate/file-limits.ts": { resourceType: "script", module: true, prefetch: true, preload: true, file: "CkxMmgaC.js", name: "file-limits", src: "src/composables/generate/file-limits.ts", isDynamicEntry: true, imports: ["__I7zX1hp.js", "_CTjMpgdN.js", "_Cy6QaPw7.js"] }, "__I7zX1hp.js": ye, "_DuqgYnXA.js": f, "_BuNPglMN.js": Ce, "_CTjMpgdN.js": ha, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_BSPB2cL8.js": r, "_C7y-hBT4.js": p, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_DNESoGCl.js": i, "_BTtBPxxM.js": u, "_D9X70ea_.js": l, "_D1CiTnQp.js": K, "_Cy6QaPw7.js": ka }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } }, "src/composables/generate/linked-folders/scan.ts": { scripts: {}, styles: { "entry.DpS-p5p_.css": d }, preload: { "src/composables/generate/linked-folders/scan.ts": { resourceType: "script", module: true, prefetch: true, preload: true, file: "8x4ij3rf.js", name: "scan", src: "src/composables/generate/linked-folders/scan.ts", isDynamicEntry: true, imports: ["_-WKEmQhb.js", "_Cy6QaPw7.js"] }, "_-WKEmQhb.js": Re, "_C0FnF6B9.js": a, "_DuqgYnXA.js": f, "_DNaw6KYU.js": t2, "_3i8JKPp4.js": s, "_BSPB2cL8.js": r, "_DNESoGCl.js": i, "_D9X70ea_.js": l, "node_modules/nuxt/dist/app/entry.js": n, "entry.DpS-p5p_.css": d, "_DOQDXZsa.js": T, "_CoT1qCUq.js": _, "_C1OZectE.js": X, "_C7y-hBT4.js": p, "_BTtBPxxM.js": u, "_D1CiTnQp.js": K, "_Cy6QaPw7.js": ka }, prefetch: { "entry.DpS-p5p_.css": d, "KaTeX_AMS-Regular.BQhdFMY1.woff2": w, "KaTeX_AMS-Regular.DMm9YOAa.woff": g, "KaTeX_AMS-Regular.DRggAlZN.ttf": B, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": S, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": D, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": j, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": R, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": C, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": m, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": y, "KaTeX_Fraktur-Bold.BsDP51OF.woff": M, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": h, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": I, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": x, "KaTeX_Fraktur-Regular.CB_wures.ttf": F, "KaTeX_Main-Bold.Cx986IdX.woff2": z, "KaTeX_Main-Bold.Jm3AIy58.woff": N, "KaTeX_Main-Bold.waoOVXN0.ttf": A, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": k, "KaTeX_Main-BoldItalic.SpSLRI95.woff": q, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": v, "KaTeX_Main-Italic.NWA7e6Wa.woff2": O, "KaTeX_Main-Italic.BMLOBm91.woff": P, "KaTeX_Main-Italic.3WenGoN9.ttf": U, "KaTeX_Main-Regular.B22Nviop.woff2": Z, "KaTeX_Main-Regular.Dr94JaBh.woff": E, "KaTeX_Main-Regular.ypZvNtVU.ttf": Y, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": W, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": J, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": b, "KaTeX_Math-Italic.t53AETM-.woff2": L, "KaTeX_Math-Italic.DA0__PXp.woff": V, "KaTeX_Math-Italic.flOr_0UB.ttf": G, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": H, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": Q, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": $, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": ee, "KaTeX_SansSerif-Italic.DN2j7dab.woff": ae, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": fe, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": te, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": re, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": oe, "KaTeX_Script-Regular.D3wIWfF6.woff2": se, "KaTeX_Script-Regular.D5yQViql.woff": ie, "KaTeX_Script-Regular.C5JkGWo-.ttf": le, "KaTeX_Size1-Regular.mCD8mA8B.woff2": _e, "KaTeX_Size1-Regular.C195tn64.woff": Te, "KaTeX_Size1-Regular.Dbsnue_I.ttf": Xe, "KaTeX_Size2-Regular.Dy4dx90m.woff2": pe, "KaTeX_Size2-Regular.oD1tc_U0.woff": ue, "KaTeX_Size2-Regular.B7gKUWhC.ttf": Ke, "KaTeX_Size3-Regular.CTq5MqoE.woff": ce, "KaTeX_Size3-Regular.DgpXs0kz.ttf": ne, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": de, "KaTeX_Size4-Regular.BF-4gkZK.woff": we, "KaTeX_Size4-Regular.DWFBv043.ttf": ge, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": Be, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": Se, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": De } } }, entrypoints: ["node_modules/nuxt/dist/app/entry.js"], modules: { "_-WKEmQhb.js": { file: "-WKEmQhb.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: je }, "_3i8JKPp4.js": { file: "3i8JKPp4.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: o }, "_58j6fSHb.js": { file: "58j6fSHb.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: Me }, "_B-D7dJ5g.js": { file: "B-D7dJ5g.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: sa }, "_id_.Bfli5g0z.css": { file: "_id_.Bfli5g0z.css", resourceType: "style", mimeType: void 0, module: void 0 }, "flashcards.ICvZV-Vm.png": { file: "flashcards.ICvZV-Vm.png", resourceType: "image", mimeType: "image/png", module: void 0 }, "study-guide.BA6NWRPA.png": { file: "study-guide.BA6NWRPA.png", resourceType: "image", mimeType: "image/png", module: void 0 }, "practice.DslxcpkH.png": { file: "practice.DslxcpkH.png", resourceType: "image", mimeType: "image/png", module: void 0 }, "match.ARkrkEri.png": { file: "match.ARkrkEri.png", resourceType: "image", mimeType: "image/png", module: void 0 }, "_BEppUSYT.js": { file: "BEppUSYT.js", resourceType: "script", mimeType: void 0, module: true }, "_BMF2dx8Y.js": { file: "BMF2dx8Y.js", resourceType: "script", mimeType: void 0, module: true }, "_BP61iLYe.js": { file: "BP61iLYe.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: fa }, "_BSPB2cL8.js": { file: "BSPB2cL8.js", resourceType: "script", mimeType: void 0, module: true }, "_BTtBPxxM.js": { file: "BTtBPxxM.js", resourceType: "script", mimeType: void 0, module: true }, "_BaPl6vKy.js": { file: "BaPl6vKy.js", resourceType: "script", mimeType: void 0, module: true }, "_BgTQkGHw.js": { file: "BgTQkGHw.js", resourceType: "script", mimeType: void 0, module: true }, "MarkdownRenderer.CEk2HVtF.css": { file: "MarkdownRenderer.CEk2HVtF.css", resourceType: "style", mimeType: void 0, module: void 0 }, "_BkOLPXZH.js": { file: "BkOLPXZH.js", resourceType: "script", mimeType: void 0, module: true }, "_Bqe5OFuP.js": { file: "Bqe5OFuP.js", resourceType: "script", mimeType: void 0, module: true }, "_BuNPglMN.js": { file: "BuNPglMN.js", resourceType: "script", mimeType: void 0, module: true }, "_Bwbix4wE.js": { file: "Bwbix4wE.js", resourceType: "script", mimeType: void 0, module: true }, "_ByWL3V-x.js": { file: "ByWL3V-x.js", resourceType: "script", mimeType: void 0, module: true }, "_C0FnF6B9.js": { file: "C0FnF6B9.js", resourceType: "script", mimeType: void 0, module: true }, "_C1OZectE.js": { file: "C1OZectE.js", resourceType: "script", mimeType: void 0, module: true }, "_C1bbhg3s.js": { file: "C1bbhg3s.js", resourceType: "script", mimeType: void 0, module: true }, "_C4juBKIn.js": { file: "C4juBKIn.js", resourceType: "script", mimeType: void 0, module: true }, "_C7y-hBT4.js": { file: "C7y-hBT4.js", resourceType: "script", mimeType: void 0, module: true }, "_CIxQqB1T.js": { file: "CIxQqB1T.js", resourceType: "script", mimeType: void 0, module: true }, "_CJR9iA_2.js": { file: "CJR9iA_2.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: Qe }, "_CLXvOnT1.js": { file: "CLXvOnT1.js", resourceType: "script", mimeType: void 0, module: true }, "_CNs_Ozdc.js": { file: "CNs_Ozdc.js", resourceType: "script", mimeType: void 0, module: true }, "_CTjMpgdN.js": { file: "CTjMpgdN.js", resourceType: "script", mimeType: void 0, module: true }, "_CYOK9Egh.js": { file: "CYOK9Egh.js", resourceType: "script", mimeType: void 0, module: true }, "_Ca1NHEsT.js": { file: "Ca1NHEsT.js", resourceType: "script", mimeType: void 0, module: true }, "chat.DDXhWmJw.png": { file: "chat.DDXhWmJw.png", resourceType: "image", mimeType: "image/png", module: void 0 }, "_CenSu9pQ.js": { file: "CenSu9pQ.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: Ia }, "_ChRZzNTs.js": { file: "ChRZzNTs.js", resourceType: "script", mimeType: void 0, module: true }, "_Cmyvdx_-.js": { file: "Cmyvdx_-.js", resourceType: "script", mimeType: void 0, module: true }, "_CoT1qCUq.js": { file: "CoT1qCUq.js", resourceType: "script", mimeType: void 0, module: true }, "_CtVf1DiR.js": { file: "CtVf1DiR.js", resourceType: "script", mimeType: void 0, module: true }, "_Cu-FIESN.js": { file: "Cu-FIESN.js", resourceType: "script", mimeType: void 0, module: true }, "_CwHFm-oR.js": { file: "CwHFm-oR.js", resourceType: "script", mimeType: void 0, module: true }, "_Cx9_0Zxu.js": { file: "Cx9_0Zxu.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: Na }, "_Cy6QaPw7.js": { file: "Cy6QaPw7.js", resourceType: "script", mimeType: void 0, module: true }, "_D1CiTnQp.js": { file: "D1CiTnQp.js", resourceType: "script", mimeType: void 0, module: true }, "_D33Hiyx4.js": { file: "D33Hiyx4.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: ga }, "_D9X70ea_.js": { file: "D9X70ea_.js", resourceType: "script", mimeType: void 0, module: true }, "_DAEfPZzO.js": { file: "DAEfPZzO.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: ea }, "_DClUiGwA.js": { file: "DClUiGwA.js", resourceType: "script", mimeType: void 0, module: true }, "_DDi7BBYG.js": { file: "DDi7BBYG.js", resourceType: "script", mimeType: void 0, module: true }, "_DH04fbtw.js": { file: "DH04fbtw.js", resourceType: "script", mimeType: void 0, module: true }, "_DHWHPuxT.js": { file: "DHWHPuxT.js", resourceType: "script", mimeType: void 0, module: true }, "_DJIE5NFf.js": { file: "DJIE5NFf.js", resourceType: "script", mimeType: void 0, module: true }, "_DKEvlRFT.js": { file: "DKEvlRFT.js", resourceType: "script", mimeType: void 0, module: true }, "_DMK6l-5U.js": { file: "DMK6l-5U.js", resourceType: "script", mimeType: void 0, module: true }, "_DNESoGCl.js": { file: "DNESoGCl.js", resourceType: "script", mimeType: void 0, module: true }, "_DNV-kwhi.js": { file: "DNV-kwhi.js", resourceType: "script", mimeType: void 0, module: true }, "_DNaw6KYU.js": { file: "DNaw6KYU.js", resourceType: "script", mimeType: void 0, module: true }, "_DOQDXZsa.js": { file: "DOQDXZsa.js", resourceType: "script", mimeType: void 0, module: true }, "_DUEfs9ab.js": { file: "DUEfs9ab.js", resourceType: "script", mimeType: void 0, module: true }, "_DakktQPo.js": { file: "DakktQPo.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: ca }, "_DmwaeKks.js": { file: "DmwaeKks.js", resourceType: "script", mimeType: void 0, module: true }, "_DuqgYnXA.js": { file: "DuqgYnXA.js", resourceType: "script", mimeType: void 0, module: true }, "_KiLc3yVa.js": { file: "KiLc3yVa.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: We }, "_MarkdownRenderer.CEk2HVtF.css": { file: "MarkdownRenderer.CEk2HVtF.css", resourceType: "style", mimeType: void 0, module: void 0 }, "_P4frLxaI.js": { file: "P4frLxaI.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: da }, "_W5zwDZH1.js": { file: "W5zwDZH1.js", resourceType: "script", mimeType: void 0, module: true }, "__I7zX1hp.js": { file: "_I7zX1hp.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: me }, "__id_.Bfli5g0z.css": { file: "_id_.Bfli5g0z.css", resourceType: "style", mimeType: void 0, module: void 0 }, "_lyDHIuzO.js": { file: "lyDHIuzO.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: Ve }, "_omrco8F4.js": { file: "omrco8F4.js", resourceType: "script", mimeType: void 0, module: true }, "_ymJ5NHXU.js": { file: "ymJ5NHXU.js", resourceType: "script", mimeType: void 0, module: true }, "assets/icons/study-modes/chat.png": { file: "chat.DDXhWmJw.png", resourceType: "image", mimeType: "image/png", module: void 0 }, "assets/icons/study-modes/flashcards.png": { file: "flashcards.ICvZV-Vm.png", resourceType: "image", mimeType: "image/png", module: void 0 }, "assets/icons/study-modes/match.png": { file: "match.ARkrkEri.png", resourceType: "image", mimeType: "image/png", module: void 0 }, "assets/icons/study-modes/practice.png": { file: "practice.DslxcpkH.png", resourceType: "image", mimeType: "image/png", module: void 0 }, "assets/icons/study-modes/study-guide.png": { file: "study-guide.BA6NWRPA.png", resourceType: "image", mimeType: "image/png", module: void 0 }, "components/FloatingPageChat.vue": { file: "DfU9rPl0.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: Pa }, "node_modules/katex/dist/fonts/KaTeX_AMS-Regular.ttf": { file: "KaTeX_AMS-Regular.DRggAlZN.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_AMS-Regular.woff": { file: "KaTeX_AMS-Regular.DMm9YOAa.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_AMS-Regular.woff2": { file: "KaTeX_AMS-Regular.BQhdFMY1.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Caligraphic-Bold.ttf": { file: "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff": { file: "KaTeX_Caligraphic-Bold.BEiXGLvX.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff2": { file: "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Caligraphic-Regular.ttf": { file: "KaTeX_Caligraphic-Regular.wX97UBjC.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff": { file: "KaTeX_Caligraphic-Regular.CTRA-rTL.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff2": { file: "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Fraktur-Bold.ttf": { file: "KaTeX_Fraktur-Bold.BdnERNNW.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Fraktur-Bold.woff": { file: "KaTeX_Fraktur-Bold.BsDP51OF.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Fraktur-Bold.woff2": { file: "KaTeX_Fraktur-Bold.CL6g_b3V.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Fraktur-Regular.ttf": { file: "KaTeX_Fraktur-Regular.CB_wures.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Fraktur-Regular.woff": { file: "KaTeX_Fraktur-Regular.Dxdc4cR9.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Fraktur-Regular.woff2": { file: "KaTeX_Fraktur-Regular.CTYiF6lA.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Main-Bold.ttf": { file: "KaTeX_Main-Bold.waoOVXN0.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Main-Bold.woff": { file: "KaTeX_Main-Bold.Jm3AIy58.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Main-Bold.woff2": { file: "KaTeX_Main-Bold.Cx986IdX.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Main-BoldItalic.ttf": { file: "KaTeX_Main-BoldItalic.DzxPMmG6.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Main-BoldItalic.woff": { file: "KaTeX_Main-BoldItalic.SpSLRI95.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Main-BoldItalic.woff2": { file: "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Main-Italic.ttf": { file: "KaTeX_Main-Italic.3WenGoN9.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Main-Italic.woff": { file: "KaTeX_Main-Italic.BMLOBm91.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Main-Italic.woff2": { file: "KaTeX_Main-Italic.NWA7e6Wa.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Main-Regular.ttf": { file: "KaTeX_Main-Regular.ypZvNtVU.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Main-Regular.woff": { file: "KaTeX_Main-Regular.Dr94JaBh.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Main-Regular.woff2": { file: "KaTeX_Main-Regular.B22Nviop.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Math-BoldItalic.ttf": { file: "KaTeX_Math-BoldItalic.B3XSjfu4.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Math-BoldItalic.woff": { file: "KaTeX_Math-BoldItalic.iY-2wyZ7.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Math-BoldItalic.woff2": { file: "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Math-Italic.ttf": { file: "KaTeX_Math-Italic.flOr_0UB.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Math-Italic.woff": { file: "KaTeX_Math-Italic.DA0__PXp.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Math-Italic.woff2": { file: "KaTeX_Math-Italic.t53AETM-.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Bold.ttf": { file: "KaTeX_SansSerif-Bold.CFMepnvq.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Bold.woff": { file: "KaTeX_SansSerif-Bold.DbIhKOiC.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Bold.woff2": { file: "KaTeX_SansSerif-Bold.D1sUS0GD.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Italic.ttf": { file: "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Italic.woff": { file: "KaTeX_SansSerif-Italic.DN2j7dab.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Italic.woff2": { file: "KaTeX_SansSerif-Italic.C3H0VqGB.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Regular.ttf": { file: "KaTeX_SansSerif-Regular.BNo7hRIc.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Regular.woff": { file: "KaTeX_SansSerif-Regular.CS6fqUqJ.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_SansSerif-Regular.woff2": { file: "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Script-Regular.ttf": { file: "KaTeX_Script-Regular.C5JkGWo-.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Script-Regular.woff": { file: "KaTeX_Script-Regular.D5yQViql.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Script-Regular.woff2": { file: "KaTeX_Script-Regular.D3wIWfF6.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Size1-Regular.ttf": { file: "KaTeX_Size1-Regular.Dbsnue_I.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Size1-Regular.woff": { file: "KaTeX_Size1-Regular.C195tn64.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Size1-Regular.woff2": { file: "KaTeX_Size1-Regular.mCD8mA8B.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Size2-Regular.ttf": { file: "KaTeX_Size2-Regular.B7gKUWhC.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Size2-Regular.woff": { file: "KaTeX_Size2-Regular.oD1tc_U0.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Size2-Regular.woff2": { file: "KaTeX_Size2-Regular.Dy4dx90m.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Size3-Regular.ttf": { file: "KaTeX_Size3-Regular.DgpXs0kz.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Size3-Regular.woff": { file: "KaTeX_Size3-Regular.CTq5MqoE.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Size4-Regular.ttf": { file: "KaTeX_Size4-Regular.DWFBv043.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Size4-Regular.woff": { file: "KaTeX_Size4-Regular.BF-4gkZK.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Size4-Regular.woff2": { file: "KaTeX_Size4-Regular.Dl5lxZxV.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Typewriter-Regular.ttf": { file: "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Typewriter-Regular.woff": { file: "KaTeX_Typewriter-Regular.C0xS9mPB.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "node_modules/katex/dist/fonts/KaTeX_Typewriter-Regular.woff2": { file: "KaTeX_Typewriter-Regular.CO6r4hn1.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "node_modules/nuxt/dist/app/components/error-404.vue": { file: "Bif3aajk.js", resourceType: "script", mimeType: void 0, module: true }, "error-404.C3wqHTJz.css": { file: "error-404.C3wqHTJz.css", resourceType: "style", mimeType: void 0, module: void 0 }, "node_modules/nuxt/dist/app/components/error-500.vue": { file: "DXug_GbP.js", resourceType: "script", mimeType: void 0, module: true }, "error-500.D6rBzoDj.css": { file: "error-500.D6rBzoDj.css", resourceType: "style", mimeType: void 0, module: void 0 }, "node_modules/nuxt/dist/app/entry.js": { file: "DIckivU5.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: c }, "entry.DpS-p5p_.css": { file: "entry.DpS-p5p_.css", resourceType: "style", mimeType: void 0, module: void 0 }, "KaTeX_AMS-Regular.BQhdFMY1.woff2": { file: "KaTeX_AMS-Regular.BQhdFMY1.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_AMS-Regular.DMm9YOAa.woff": { file: "KaTeX_AMS-Regular.DMm9YOAa.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_AMS-Regular.DRggAlZN.ttf": { file: "KaTeX_AMS-Regular.DRggAlZN.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": { file: "KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_Caligraphic-Bold.BEiXGLvX.woff": { file: "KaTeX_Caligraphic-Bold.BEiXGLvX.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": { file: "KaTeX_Caligraphic-Bold.ATXxdsX0.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": { file: "KaTeX_Caligraphic-Regular.Di6jR-x-.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_Caligraphic-Regular.CTRA-rTL.woff": { file: "KaTeX_Caligraphic-Regular.CTRA-rTL.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_Caligraphic-Regular.wX97UBjC.ttf": { file: "KaTeX_Caligraphic-Regular.wX97UBjC.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_Fraktur-Bold.CL6g_b3V.woff2": { file: "KaTeX_Fraktur-Bold.CL6g_b3V.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_Fraktur-Bold.BsDP51OF.woff": { file: "KaTeX_Fraktur-Bold.BsDP51OF.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_Fraktur-Bold.BdnERNNW.ttf": { file: "KaTeX_Fraktur-Bold.BdnERNNW.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_Fraktur-Regular.CTYiF6lA.woff2": { file: "KaTeX_Fraktur-Regular.CTYiF6lA.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_Fraktur-Regular.Dxdc4cR9.woff": { file: "KaTeX_Fraktur-Regular.Dxdc4cR9.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_Fraktur-Regular.CB_wures.ttf": { file: "KaTeX_Fraktur-Regular.CB_wures.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_Main-Bold.Cx986IdX.woff2": { file: "KaTeX_Main-Bold.Cx986IdX.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_Main-Bold.Jm3AIy58.woff": { file: "KaTeX_Main-Bold.Jm3AIy58.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_Main-Bold.waoOVXN0.ttf": { file: "KaTeX_Main-Bold.waoOVXN0.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": { file: "KaTeX_Main-BoldItalic.DxDJ3AOS.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_Main-BoldItalic.SpSLRI95.woff": { file: "KaTeX_Main-BoldItalic.SpSLRI95.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_Main-BoldItalic.DzxPMmG6.ttf": { file: "KaTeX_Main-BoldItalic.DzxPMmG6.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_Main-Italic.NWA7e6Wa.woff2": { file: "KaTeX_Main-Italic.NWA7e6Wa.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_Main-Italic.BMLOBm91.woff": { file: "KaTeX_Main-Italic.BMLOBm91.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_Main-Italic.3WenGoN9.ttf": { file: "KaTeX_Main-Italic.3WenGoN9.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_Main-Regular.B22Nviop.woff2": { file: "KaTeX_Main-Regular.B22Nviop.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_Main-Regular.Dr94JaBh.woff": { file: "KaTeX_Main-Regular.Dr94JaBh.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_Main-Regular.ypZvNtVU.ttf": { file: "KaTeX_Main-Regular.ypZvNtVU.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": { file: "KaTeX_Math-BoldItalic.CZnvNsCZ.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_Math-BoldItalic.iY-2wyZ7.woff": { file: "KaTeX_Math-BoldItalic.iY-2wyZ7.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_Math-BoldItalic.B3XSjfu4.ttf": { file: "KaTeX_Math-BoldItalic.B3XSjfu4.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_Math-Italic.t53AETM-.woff2": { file: "KaTeX_Math-Italic.t53AETM-.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_Math-Italic.DA0__PXp.woff": { file: "KaTeX_Math-Italic.DA0__PXp.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_Math-Italic.flOr_0UB.ttf": { file: "KaTeX_Math-Italic.flOr_0UB.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_SansSerif-Bold.D1sUS0GD.woff2": { file: "KaTeX_SansSerif-Bold.D1sUS0GD.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_SansSerif-Bold.DbIhKOiC.woff": { file: "KaTeX_SansSerif-Bold.DbIhKOiC.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_SansSerif-Bold.CFMepnvq.ttf": { file: "KaTeX_SansSerif-Bold.CFMepnvq.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_SansSerif-Italic.C3H0VqGB.woff2": { file: "KaTeX_SansSerif-Italic.C3H0VqGB.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_SansSerif-Italic.DN2j7dab.woff": { file: "KaTeX_SansSerif-Italic.DN2j7dab.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": { file: "KaTeX_SansSerif-Italic.YYjJ1zSn.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": { file: "KaTeX_SansSerif-Regular.DDBCnlJ7.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_SansSerif-Regular.CS6fqUqJ.woff": { file: "KaTeX_SansSerif-Regular.CS6fqUqJ.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_SansSerif-Regular.BNo7hRIc.ttf": { file: "KaTeX_SansSerif-Regular.BNo7hRIc.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_Script-Regular.D3wIWfF6.woff2": { file: "KaTeX_Script-Regular.D3wIWfF6.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_Script-Regular.D5yQViql.woff": { file: "KaTeX_Script-Regular.D5yQViql.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_Script-Regular.C5JkGWo-.ttf": { file: "KaTeX_Script-Regular.C5JkGWo-.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_Size1-Regular.mCD8mA8B.woff2": { file: "KaTeX_Size1-Regular.mCD8mA8B.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_Size1-Regular.C195tn64.woff": { file: "KaTeX_Size1-Regular.C195tn64.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_Size1-Regular.Dbsnue_I.ttf": { file: "KaTeX_Size1-Regular.Dbsnue_I.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_Size2-Regular.Dy4dx90m.woff2": { file: "KaTeX_Size2-Regular.Dy4dx90m.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_Size2-Regular.oD1tc_U0.woff": { file: "KaTeX_Size2-Regular.oD1tc_U0.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_Size2-Regular.B7gKUWhC.ttf": { file: "KaTeX_Size2-Regular.B7gKUWhC.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_Size3-Regular.CTq5MqoE.woff": { file: "KaTeX_Size3-Regular.CTq5MqoE.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_Size3-Regular.DgpXs0kz.ttf": { file: "KaTeX_Size3-Regular.DgpXs0kz.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_Size4-Regular.Dl5lxZxV.woff2": { file: "KaTeX_Size4-Regular.Dl5lxZxV.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_Size4-Regular.BF-4gkZK.woff": { file: "KaTeX_Size4-Regular.BF-4gkZK.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_Size4-Regular.DWFBv043.ttf": { file: "KaTeX_Size4-Regular.DWFBv043.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "KaTeX_Typewriter-Regular.CO6r4hn1.woff2": { file: "KaTeX_Typewriter-Regular.CO6r4hn1.woff2", resourceType: "font", mimeType: "font/woff2", module: void 0 }, "KaTeX_Typewriter-Regular.C0xS9mPB.woff": { file: "KaTeX_Typewriter-Regular.C0xS9mPB.woff", resourceType: "font", mimeType: "font/woff", module: void 0 }, "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": { file: "KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf", resourceType: "font", mimeType: "font/ttf", module: void 0 }, "node_modules/pdfjs-dist/build/pdf.mjs": { file: "z4myVNlC.js", resourceType: "script", mimeType: void 0, module: true }, "node_modules/pdfjs-dist/build/pdf.worker.mjs": { file: "pdf.worker.TGcf_-kp.mjs", resourceType: "script", mimeType: void 0, module: true }, "node_modules/pdfjs-dist/build/pdf.worker.mjs?url": { file: "BtC09ozt.js", resourceType: "script", mimeType: void 0, module: true }, "pdf.worker.TGcf_-kp.mjs": { file: "pdf.worker.TGcf_-kp.mjs", resourceType: "script", mimeType: void 0, module: true }, "node_modules/tesseract.js/dist/worker.min.js": { file: "worker.min.32WLk7pY.js", resourceType: "script", mimeType: void 0, module: true }, "node_modules/tesseract.js/dist/worker.min.js?url": { file: "Bz0bHmaK.js", resourceType: "script", mimeType: void 0, module: true }, "worker.min.32WLk7pY.js": { file: "worker.min.32WLk7pY.js", resourceType: "script", mimeType: void 0, module: true }, "node_modules/tesseract.js/src/index.js": { file: "Dd1vPuSX.js", resourceType: "script", mimeType: void 0, module: true }, "pages/auth/callback.vue": { file: "B8DElJvO.js", resourceType: "script", mimeType: void 0, module: true }, "pages/create/basic.vue": { file: "BTJ8lpNB.js", resourceType: "script", mimeType: void 0, module: true }, "pages/create/generate.vue": { file: "3iSiVjmt.js", resourceType: "script", mimeType: void 0, module: true }, "pages/create/synthesize.vue": { file: "lVNn4F3S.js", resourceType: "script", mimeType: void 0, module: true }, "pages/first-run.vue": { file: "YSTTKXwf.js", resourceType: "script", mimeType: void 0, module: true }, "first-run.xoV6d82S.css": { file: "first-run.xoV6d82S.css", resourceType: "style", mimeType: void 0, module: void 0 }, "pages/index.vue": { file: "C0-rP3Ca.js", resourceType: "script", mimeType: void 0, module: true }, "pages/public-sets/[id].vue": { file: "DR0b2V_-.js", resourceType: "script", mimeType: void 0, module: true }, "pages/public-sets/index.vue": { file: "Dq033PX3.js", resourceType: "script", mimeType: void 0, module: true }, "pages/set/[id]-flashcards.vue": { file: "bsfWI-nE.js", resourceType: "script", mimeType: void 0, module: true }, "_id_-flashcards.Brokb39F.css": { file: "_id_-flashcards.Brokb39F.css", resourceType: "style", mimeType: void 0, module: void 0 }, "pages/set/[id]-learn.vue": { file: "BfMudgLE.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: La }, "_id_-learn.DqGQqNXT.css": { file: "_id_-learn.DqGQqNXT.css", resourceType: "style", mimeType: void 0, module: void 0 }, "pages/set/[id]-match.vue": { file: "yGYSWVbr.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: Va }, "pages/set/[id]-test.vue": { file: "CYWUEkeD.js", resourceType: "script", mimeType: void 0, module: true }, "pages/set/[id]/edit/index.vue": { file: "Y6CevI7H.js", resourceType: "script", mimeType: void 0, module: true }, "pages/set/[id]/results.vue": { file: "xAeXSfFd.js", resourceType: "script", mimeType: void 0, module: true }, "pages/settings.vue": { file: "DqAPr7Mw.js", resourceType: "script", mimeType: void 0, module: true, dynamicImports: Ga }, "pages/student/classes/[id].vue": { file: "CSvmdMId.js", resourceType: "script", mimeType: void 0, module: true }, "pages/study-guide/[setId].vue": { file: "BrCCkkvX.js", resourceType: "script", mimeType: void 0, module: true }, "pages/teacher/classes/[id]/assign.vue": { file: "C3_xuxG1.js", resourceType: "script", mimeType: void 0, module: true }, "pages/teacher/classes/[id]/index.vue": { file: "Bip-Hqa3.js", resourceType: "script", mimeType: void 0, module: true }, "pages/teacher/classes/[id]/manage.vue": { file: "DtNPzvWu.js", resourceType: "script", mimeType: void 0, module: true }, "pages/teacher/index.vue": { file: "BANQB8Nb.js", resourceType: "script", mimeType: void 0, module: true }, "pages/unlock.vue": { file: "Cwhw7OVi.js", resourceType: "script", mimeType: void 0, module: true }, "src/composables/ai/credentials/web.ts": { file: "DZyAFy_C.js", resourceType: "script", mimeType: void 0, module: true }, "src/composables/ai/provider-settings.ts": { file: "CY_WsQ5S.js", resourceType: "script", mimeType: void 0, module: true }, "src/composables/db/browser.ts": { file: "D3eL2sTE.js", resourceType: "script", mimeType: void 0, module: true }, "src/composables/generate/file-limits.ts": { file: "CkxMmgaC.js", resourceType: "script", mimeType: void 0, module: true }, "src/composables/generate/linked-folders/scan.ts": { file: "8x4ij3rf.js", resourceType: "script", mimeType: void 0, module: true }, "src/composables/platform/web-api.ts": { file: "D4Qf99be.js", resourceType: "script", mimeType: void 0, module: true } } };
  }
});

// ../.output-cloudflare/server/chunks/virtual/_virtual_spa-template.mjs
var virtual_spa_template_exports = {};
__export(virtual_spa_template_exports, {
  template: () => o2
});
var o2;
var init_virtual_spa_template = __esm({
  "../.output-cloudflare/server/chunks/virtual/_virtual_spa-template.mjs"() {
    init_modules_watch_stub();
    o2 = "";
  }
});

// ../.output-cloudflare/server/chunks/routes/renderer.mjs
var renderer_exports = {};
__export(renderer_exports, {
  default: () => Ae2
});
import { Buffer as y2 } from "node:buffer";
import "node:process";
import "cloudflare:workers";
import "node:events";
import "node:timers";
function createUnhead(e5, t5 = {}) {
  const r4 = !t5.document, n3 = /* @__PURE__ */ new Map(), s3 = { _entryCount: 1, _h: 0, plugins: /* @__PURE__ */ new Map(), resolvedOptions: t5, ssr: r4, entries: n3, hooks: void 0, render: /* @__PURE__ */ __name(() => e5(s3), "render"), use: /* @__PURE__ */ __name((e6) => (function(e7, t6) {
    if ("function" == typeof t6 && t6.key && e7.plugins.has(t6.key)) return;
    const r5 = "function" == typeof t6 ? t6(e7) : t6, n4 = r5.key || String(e7.plugins.size + 1);
    if (!e7.plugins.get(n4)) {
      e7.plugins.set(n4, r5);
      for (const t7 in r5.hooks || {}) e7.hooks?.hook(t7, r5.hooks[t7]);
    }
  })(s3, e6), "use"), push(e6, t6) {
    const o5 = t6?._index ?? s3._entryCount++, i4 = t6 ? { ...t6 } : {};
    delete i4.head, delete i4.onRendered, delete i4._index;
    const a4 = { _i: o5, input: e6, options: i4 };
    n3.set(o5, a4);
    return { _i: o5, dispose() {
      n3.delete(o5);
    }, patch(e7) {
      r4 ? (a4.input = e7, delete a4._tags) : a4._pending = e7, n3.has(o5) || n3.set(o5, a4);
    } };
  } };
  return t5.init?.forEach((e6) => e6 && s3.push(e6)), s3;
}
function isUnsafeKey(e5) {
  return "__proto__" === e5 || "constructor" === e5 || "prototype" === e5;
}
function callHooks(e5, t5, r4, n3) {
  for (let s3 = r4; s3 < e5.length; s3 += 1) try {
    const r5 = n3 ? n3.run(() => e5[s3](...t5)) : e5[s3](...t5);
    if (r5 && "function" == typeof r5.then) return Promise.resolve(r5).then(() => callHooks(e5, t5, s3 + 1, n3));
  } catch (e6) {
    return Promise.reject(e6);
  }
}
function callHook(e5, t5, r4) {
  const n3 = e5.hooks?._hooks?.[t5];
  if (n3?.length) return e5.hooks?.callHook(t5, r4);
}
function isMetaArrayDupeKey(e5) {
  const t5 = e5.indexOf(":");
  if (-1 === t5) return false;
  const r4 = e5.slice(t5 + 1);
  return A2.has(r4) || r4.startsWith("og:image:") || r4.startsWith("og:video:") || r4.startsWith("og:audio:") || r4.startsWith("twitter:image:");
}
function dedupeKey(e5) {
  const { props: t5, tag: r4, key: n3 } = e5;
  if (T2.has(r4)) return r4;
  if ("link" === r4) {
    if ("canonical" === t5.rel) return "canonical";
    if ("alternate" === t5.rel && t5.hreflang) return `alternate:${t5.hreflang}`;
  }
  if (t5.charset) return "charset";
  if ("meta" === r4) for (const e6 of R2) {
    const r5 = t5[e6];
    if (void 0 !== r5) return `meta:${r5}${"string" == typeof r5 && r5.includes(":") || P2.test(r5) || !n3 ? "" : `:key:${n3}`}`;
  }
  return n3 ? `${r4}:key:${n3}` : t5.id ? `${r4}:id:${t5.id}` : "link" === r4 && t5.rel && t5.href ? `link:${t5.rel}:${t5.href}` : _2.has(r4) && (e5.textContent || e5.innerHTML) ? `${r4}:content:${e5.textContent || e5.innerHTML}` : void 0;
}
function hashTag(e5) {
  const t5 = e5._h || e5._d || e5.textContent || e5.innerHTML;
  if (t5) return t5;
  const r4 = Object.keys(e5.props).sort();
  let n3 = `${e5.tag}:`, s3 = "";
  for (const t6 of r4) n3 += `${s3}${t6}:${String(e5.props[t6])}`, s3 = ",";
  return n3;
}
function walkResolver(e5, t5, r4) {
  if ("_resolver" === r4) return e5;
  "function" != typeof e5 || r4 && ("titleTemplate" === r4 || r4.startsWith("on")) || (e5 = e5());
  const n3 = t5 ? t5(r4, e5) : e5;
  if (Array.isArray(n3)) {
    let e6;
    for (let r5 = 0; r5 < n3.length; r5++) {
      const s3 = walkResolver(n3[r5], t5);
      e6 ? e6[r5] = s3 : s3 !== n3[r5] && (e6 = n3.slice(0, r5), e6[r5] = s3);
    }
    return e6 || n3;
  }
  if (n3?.constructor === Object) {
    let e6;
    for (const r5 in n3) {
      const s3 = isUnsafeKey(r5), o5 = s3 ? void 0 : walkResolver(n3[r5], t5, r5);
      if (!e6 && (s3 || o5 !== n3[r5])) {
        e6 = {};
        for (const t6 in n3) {
          if (t6 === r5) break;
          e6[t6] = n3[t6];
        }
      }
      e6 && !s3 && (e6[r5] = o5);
    }
    return e6 || n3;
  }
  return n3;
}
function normalizeStyleClassProps(e5, t5) {
  const r4 = "style" === e5, n3 = r4 ? /* @__PURE__ */ new Map() : /* @__PURE__ */ new Set(), add = /* @__PURE__ */ __name((e6) => {
    if (e6) if (r4) {
      const t6 = e6.indexOf(":");
      t6 > 0 && n3.set(e6.slice(0, t6).trim(), e6.slice(t6 + 1).trim());
    } else e6.split(" ").forEach((e7) => e7 && n3.add(e7));
  }, "add");
  if ("string" == typeof t5) (r4 ? t5.split(";") : [t5]).forEach(add);
  else if (Array.isArray(t5)) t5.forEach(add);
  else if (t5 && "object" == typeof t5) for (const e6 in t5) {
    const s3 = t5[e6];
    s3 && "false" !== s3 && (r4 ? n3.set(e6.trim(), String(s3)) : add(e6));
  }
  return n3;
}
function resolveHeadInput(e5, t5) {
  let r4;
  return t5.length && (r4 = /* @__PURE__ */ __name((e6, r5) => {
    for (let n3 = 0; n3 < t5.length; n3++) r5 = t5[n3](e6, r5);
    return r5;
  }, "r"), e5 = r4(void 0, e5)), walkResolver(e5, r4);
}
function normalizeTag(e5, t5) {
  const r4 = (function(e6, t6) {
    if (e6.props = e6.props || {}, !t6) return e6;
    if ("templateParams" === e6.tag) return e6.props = t6, e6;
    const r5 = w2.has(e6.tag) || "htmlAttrs" === e6.tag || "bodyAttrs" === e6.tag;
    for (const n3 in t6) {
      if (isUnsafeKey(n3)) continue;
      const s3 = n3.startsWith("data-"), o5 = r5 && !k2.has(n3), i4 = o5 && !s3 ? n3.toLowerCase() : n3;
      if (o5 && (!i4 || j2.test(i4))) continue;
      const a4 = t6[n3];
      if (null === a4) e6.props[i4] = null;
      else if ("class" === n3 || "style" === n3) e6.props[n3] = normalizeStyleClassProps(n3, a4);
      else if (k2.has(n3)) if ("textContent" !== n3 && "innerHTML" !== n3 || "object" != typeof a4) e6[n3] = a4;
      else {
        const r6 = t6.type || "application/json";
        (r6.endsWith("json") || "speculationrules" === r6 || "importmap" === r6) && (e6.props.type = r6, e6[n3] = JSON.stringify(a4));
      }
      else if (void 0 !== a4) {
        const t7 = String(a4), r6 = "meta" === e6.tag && "content" === i4;
        e6.props[i4] = "true" === t7 || "" === t7 ? !s3 && !r6 || t7 : !a4 && s3 && "false" === t7 ? "false" : a4;
      }
    }
    return e6;
  })({ tag: e5, props: {} }, "object" == typeof t5 && "function" != typeof t5 ? t5 : { ["script" === e5 || "noscript" === e5 || "style" === e5 ? "innerHTML" : "textContent"]: t5 });
  if (r4.key && b2.has(r4.tag) && (r4.props["data-hid"] = r4._h = r4.key), "script" === r4.tag && "object" == typeof r4.innerHTML && (r4.innerHTML = JSON.stringify(r4.innerHTML), r4.props.type = r4.props.type || "application/json"), Array.isArray(r4.props.content)) {
    const e6 = [];
    for (const t6 of r4.props.content) e6.push({ ...r4, props: { ...r4.props, content: t6 } });
    return e6;
  }
  return r4;
}
function pushNormalizedTag(e5, t5) {
  if (Array.isArray(t5)) for (const r4 of t5) e5.push(r4);
  else e5.push(t5);
}
function normalizeEntryToTags(e5, t5) {
  if (!e5) return [];
  "function" == typeof e5 && (e5 = e5()), e5 = resolveHeadInput(e5, t5);
  const r4 = [];
  for (const t6 in e5) {
    const n3 = e5[t6];
    if (void 0 !== n3) if (Array.isArray(n3)) for (const e6 of n3) pushNormalizedTag(r4, normalizeTag(t6, e6));
    else pushNormalizedTag(r4, normalizeTag(t6, n3));
  }
  return r4;
}
function isEmptyProps(e5) {
  for (const t5 in e5) return false;
  return true;
}
function syncEntryHookCache(e5, t5) {
  const r4 = (t5["entries:resolve"]?.length || 0) + (t5["entries:normalize"]?.length || 0);
  if (e5._h !== r4) {
    e5._h = r4;
    for (const t6 of e5.entries.values()) delete t6._tags;
  }
}
function cloneTagsInPlace(e5) {
  for (let t5 = 0; t5 < e5.length; t5++) {
    const r4 = e5[t5], n3 = { ...r4.props };
    n3.class instanceof Set && (n3.class = new Set(n3.class)), n3.style instanceof Map && (n3.style = new Map(n3.style)), e5[t5] = { ...r4, props: n3 };
  }
}
function resolveTags(e5, t5) {
  const r4 = t5?.tagWeight ?? e5.resolvedOptions._tagWeight ?? DEFAULT_TAG_WEIGHT, n3 = { tagMap: /* @__PURE__ */ new Map(), tags: [] }, s3 = e5.hooks?._hooks || {};
  syncEntryHookCache(e5, s3);
  for (const t6 of e5.entries.values()) void 0 !== t6._pending && (t6.input = t6._pending, delete t6._pending, delete t6._tags, delete t6._precomputedTags);
  let o5;
  (s3["entries:resolve"]?.length || s3["entries:normalize"]?.length) && (o5 = [...e5.entries.values()], s3["entries:resolve"]?.length && callHook(e5, "entries:resolve", { entries: o5, ...n3 })), syncEntryHookCache(e5, s3);
  for (const t6 of o5 || e5.entries.values()) {
    let o6 = t6._tags;
    if (!o6) if (!t6._precomputedTags || r4 !== e5.resolvedOptions._tagWeight || s3["entries:normalize"]?.length || s3["entries:resolve"]?.length || t6.options && !isEmptyProps(t6.options)) {
      if (o6 = normalizeEntryToTags(t6.input, e5.resolvedOptions.propResolvers || []), t6.options && !isEmptyProps(t6.options)) for (const e6 of o6) Object.assign(e6, t6.options);
      if (s3["entries:normalize"]?.length) {
        const r5 = { tags: o6, entry: t6 };
        callHook(e5, "entries:normalize", r5), o6 = r5.tags;
      }
      for (let e6 = 0; e6 < o6.length; e6++) {
        const n4 = o6[e6];
        n4._w = r4(n4), n4._p = (t6._i << 10) + e6, n4._d = dedupeKey(n4), n4._d || (n4._h = hashTag(n4));
      }
      t6._tags = o6;
    } else o6 = t6._precomputedTags;
    n3.tags.push(...o6);
  }
  for (const e6 in s3) if (s3[e6]?.length && x2.test(e6)) {
    cloneTagsInPlace(n3.tags);
    break;
  }
  const i4 = (function(e6) {
    let t6 = false;
    for (const r5 of e6.tags.sort(sortTags$1)) {
      const n4 = r5._d || hashTag(r5);
      if (!n4) continue;
      const s4 = e6.tagMap.get(n4);
      if (s4) if ("merge" === (r5.tagDuplicateStrategy || (v2.has(r5.tag) ? "merge" : null) || (r5.key && r5.key === s4.key ? "merge" : null))) {
        const t7 = { ...s4.props };
        for (const e7 in r5.props) t7[e7] = "style" === e7 ? new Map([...s4.props.style || /* @__PURE__ */ new Map(), ...r5.props[e7]]) : "class" === e7 ? /* @__PURE__ */ new Set([...s4.props.class || [], ...r5.props[e7]]) : r5.props[e7];
        e6.tagMap.set(n4, { ...r5, props: t7 });
      } else r5._p >> 10 == s4._p >> 10 && "meta" === r5.tag && isMetaArrayDupeKey(n4) ? (e6.tagMap.set(n4, Object.assign([...Array.isArray(s4) ? s4 : [s4], r5], r5)), t6 = true) : (r5._w === s4._w ? r5._p > s4._p : r5._w < s4._w) && e6.tagMap.set(n4, r5);
      else e6.tagMap.set(n4, r5);
    }
    return t6;
  })(n3);
  return (function(e6, t6) {
    const r5 = e6.tagMap.get("title"), n4 = e6.tagMap.get("titleTemplate");
    if (t6._title = r5?.textContent, !n4) return;
    const s4 = n4.textContent;
    if (t6._titleTemplate = s4, !s4) return;
    let o6 = "function" == typeof s4 ? s4(r5?.textContent) : s4;
    "string" != typeof o6 || t6.plugins.has("template-params") || (o6 = o6.replace("%s", r5?.textContent || "")), r5 ? null === o6 ? e6.tagMap.delete("title") : e6.tagMap.set("title", { ...r5, textContent: o6 }) : e6.tagMap.set("titleTemplate", { ...n4, tag: "title", textContent: o6 });
  })(n3, e5), (function(e6, t6) {
    const r5 = e6.tags;
    let n4 = 0;
    for (const t7 of e6.tagMap.values()) if (Array.isArray(t7)) for (const e7 of t7) r5[n4++] = e7;
    else r5[n4++] = t7;
    r5.length = n4, t6 && r5.sort(sortTags$1);
  })(n3, i4), callHook(e5, "tags:beforeResolve", n3), callHook(e5, "tags:resolve", n3), callHook(e5, "tags:afterResolve", n3), (function(e6) {
    let t6 = 0;
    for (let r5 of e6) {
      const { innerHTML: n4, tag: s4, props: o6 } = r5;
      if ($2.has(s4) && (!isEmptyProps(o6) || hasContent(n4) || hasContent(r5.textContent)) && ("meta" !== s4 || hasContent(o6.content) || o6["http-equiv"] || o6.charset)) {
        if ("script" === s4 && (n4 || r5.textContent)) {
          const e7 = String(o6.type), t7 = e7.endsWith("json") || "importmap" === e7 || "speculationrules" === e7, escape = /* @__PURE__ */ __name((e8) => t7 ? ("string" == typeof e8 ? e8 : JSON.stringify(e8)).replace(L2, "\\u003C") : "string" == typeof e8 ? e8.replace(C2, "<\\/script") : e8, "escape");
          r5 = { ...r5 }, n4 && (r5.innerHTML = escape(n4)), r5.textContent && (r5.textContent = escape(r5.textContent)), r5._d = dedupeKey(r5);
        }
        e6[t6++] = r5;
      }
    }
    return e6.length = t6, e6;
  })(n3.tags);
}
function capoTagWeight(e5) {
  if ("number" == typeof e5.tagPriority) return e5.tagPriority;
  let t5 = 100;
  const r4 = S2[e5.tagPriority] || 0;
  if ("base" === e5.tag) t5 = -10;
  else if ("title" === e5.tag) t5 = 10;
  else if ("meta" === e5.tag) t5 = "content-security-policy" === e5.props["http-equiv"] ? -30 : e5.props.charset ? -20 : "viewport" === e5.props.name ? -15 : t5;
  else if ("link" === e5.tag && e5.props.rel) {
    const r5 = e5.props.rel;
    t5 = "preconnect" === r5 ? 20 : "stylesheet" === r5 ? 60 : "preload" === r5 || "modulepreload" === r5 ? 70 : "prefetch" === r5 || "dns-prefetch" === r5 || "prerender" === r5 ? 90 : t5;
  } else if ("script" === e5.tag) {
    const r5 = "string" == typeof e5.props.type ? e5.props.type : "", n3 = r5.endsWith("json");
    "importmap" === r5 ? t5 = 25 : "speculationrules" === r5 ? t5 = 90 : isTruthy(e5.props.async) ? t5 = 30 : e5.props.src && !isTruthy(e5.props.defer) && "module" !== r5 && !n3 || (e5.innerHTML || e5.textContent) && !n3 ? t5 = 50 : (isTruthy(e5.props.defer) && e5.props.src || "module" === r5) && (t5 = 80);
  } else "style" === e5.tag && (t5 = e5.innerHTML && /@import/.test(e5.innerHTML) ? 40 : 60);
  return (t5 || 100) + r4;
}
function encodeAttribute(e5) {
  const t5 = "string" == typeof e5 ? e5 : String(e5);
  return t5.includes('"') ? t5.replace(U2, "&quot;") : t5;
}
function propsToString(e5) {
  let t5 = "";
  for (const r4 in e5) {
    if (!Object.hasOwn(e5, r4) || !r4 || j2.test(r4)) continue;
    let n3 = e5[r4];
    if ("string" != typeof n3) {
      if ("class" === r4) {
        let e6 = "";
        for (const t6 of n3) e6 += e6 ? ` ${t6}` : t6;
        n3 = e6;
      } else if ("style" === r4) {
        let e6 = "";
        for (const [t6, r5] of n3) e6 += e6 ? `;${t6}:${r5}` : `${t6}:${r5}`;
        n3 = e6;
      }
    }
    false !== n3 && null !== n3 && (t5 += true === n3 ? ` ${r4}` : ` ${r4}="${encodeAttribute(n3)}"`);
  }
  return t5;
}
function tagToString(e5) {
  const t5 = propsToString(e5.props), r4 = `<${e5.tag}${t5}>`;
  if (m3.has(e5.tag)) return r4;
  if (!_2.has(e5.tag)) return `${r4}</${e5.tag}>`;
  let n3 = String(e5.textContent ?? e5.innerHTML ?? "");
  return n3 = "title" === e5.tag ? n3.replace(M2, (e6) => E2[e6]) : n3.replace(D2[e5.tag] ||= new RegExp(`</${e5.tag}`, "gi"), `<\\/${e5.tag}`), `${r4}${n3}</${e5.tag}>`;
}
function ssrRenderTags(e5, t5) {
  const r4 = { htmlAttrs: {}, bodyAttrs: {}, tags: { head: "", bodyClose: "", bodyOpen: "" } }, n3 = t5?.omitLineBreaks ? "" : "\n";
  for (const t6 of e5) {
    if ("htmlAttrs" === t6.tag || "bodyAttrs" === t6.tag) {
      Object.assign(r4[t6.tag], t6.props);
      continue;
    }
    const e6 = tagToString(t6), s3 = t6.tagPosition || "head";
    r4.tags[s3] += r4.tags[s3] ? `${n3}${e6}` : e6;
  }
  return { headTags: r4.tags.head, bodyTags: r4.tags.bodyClose, bodyTagsOpen: r4.tags.bodyOpen, htmlAttrs: propsToString(r4.htmlAttrs), bodyAttrs: propsToString(r4.bodyAttrs) };
}
function createServerRenderer(e5 = {}) {
  return (t5) => {
    const r4 = { shouldRender: true };
    if (callHook(t5, "ssr:beforeRender", r4), !r4.shouldRender) return ssrRenderTags([]);
    const n3 = { tags: e5.resolvedTags || resolveTags(t5, { tagWeight: e5.tagWeight ?? capoTagWeight }), options: { ...e5 } };
    callHook(t5, "ssr:render", n3);
    const s3 = ssrRenderTags(n3.tags, n3.options), o5 = { tags: n3.tags, html: s3 };
    return callHook(t5, "ssr:rendered", o5), o5.html;
  };
}
function createHead$1(e5 = {}) {
  const t5 = e5.tagWeight || capoTagWeight, r4 = createUnhead(createServerRenderer({ tagWeight: t5, omitLineBreaks: e5.omitLineBreaks }), { _tagWeight: t5, document: false, experimentalStreamKey: e5.experimentalStreamKey, propResolvers: [...e5.propResolvers || [], I2], init: [e5.disableDefaults ? void 0 : H2, ...e5.init || []] });
  if (!e5.disableDefaults && !e5.tagWeight && !e5.propResolvers?.some((e6) => !e6._static)) {
    const e6 = r4.entries.get(1);
    e6 && (e6._precomputedTags = (function() {
      if (!z2) {
        z2 = normalizeEntryToTags(H2, []);
        for (let e7 = 0; e7 < z2.length; e7++) {
          const t6 = z2[e7];
          t6._w = capoTagWeight(t6), t6._p = 1024 + e7, t6._d = dedupeKey(t6), t6._d || (t6._h = hashTag(t6));
        }
      }
      return z2;
    })());
  }
  return r4.hooks = (function(e6) {
    const t6 = new O2();
    for (const r5 in e6 || {}) t6.hook(r5, e6[r5]);
    return t6;
  })(e5.hooks), e5.plugins?.forEach((e6) => r4.use(e6)), r4;
}
function isRef(e5) {
  return !!e5 && true === e5.__v_isRef;
}
function toValue(e5) {
  return isFunction(e5) ? e5() : isRef(t5 = e5) ? t5.value : t5;
  var t5;
}
function defineHeadPlugin(e5, t5) {
  return t5 && "function" == typeof e5 && (e5.key = t5), e5;
}
function processTemplateParams(e5, t5, r4, n3 = false) {
  if ("string" != typeof e5 || !e5.includes("%")) return e5;
  let s3 = e5;
  try {
    s3 = decodeURI(e5);
  } catch {
  }
  const o5 = s3.match(q2);
  if (!o5) return e5;
  const i4 = e5.includes(Z2);
  return e5 = e5.replace(q2, (e6) => {
    if (e6 === Z2 || !o5.includes(e6)) return e6;
    const r5 = (function(e7, t6, r6 = false) {
      let n4;
      if ("s" === t6 || "pageTitle" === t6) n4 = e7.pageTitle;
      else if (t6.includes(".")) {
        const r7 = t6.indexOf(".");
        n4 = e7[t6.substring(0, r7)]?.[t6.substring(r7 + 1)];
      } else n4 = e7[t6];
      if (void 0 !== n4) return r6 ? (n4 || "").replace(B2, "\\\\").replace(W2, "\\u003C").replace(F2, '\\"') : n4 || "";
    })(t5, e6.slice(1), n3);
    return void 0 !== r5 ? r5 : e6;
  }).trim(), i4 && (e5 = e5.split(Z2).map((e6) => e6.trim()).filter((e6) => "" !== e6).join(r4 ? ` ${r4} ` : " ")), e5;
}
function isThenable(e5) {
  return "function" == typeof e5?.then;
}
function walkArrayPromises(e5, t5) {
  if (t5 === e5.length) return;
  if (256 === t5) {
    const r5 = new Array(e5.length);
    let n4 = false;
    for (; t5 < e5.length; t5++) {
      const s3 = walkPromises(e5[t5]);
      r5[t5] = s3, n4 ||= isThenable(s3);
    }
    return n4 ? r5 : void 0;
  }
  const r4 = walkPromises(e5[t5]);
  if (isThenable(r4)) {
    const n4 = new Array(e5.length);
    n4[t5] = r4;
    for (let r5 = t5 + 1; r5 < e5.length; r5++) n4[r5] = walkPromises(e5[r5]);
    return n4;
  }
  const n3 = walkArrayPromises(e5, t5 + 1);
  return n3 && (n3[t5] = r4), n3;
}
function walkObjectPromises(e5, t5, r4) {
  if (r4 === t5.length) return;
  if (256 === r4) {
    const n4 = new Array(t5.length);
    let s4 = false;
    for (; r4 < t5.length; r4++) {
      const o5 = walkPromises(e5[t5[r4]]);
      n4[r4] = o5, s4 ||= isThenable(o5);
    }
    return s4 ? n4 : void 0;
  }
  const n3 = walkPromises(e5[t5[r4]]);
  if (isThenable(n3)) {
    const s4 = new Array(t5.length);
    s4[r4] = n3;
    for (let n4 = r4 + 1; n4 < t5.length; n4++) s4[n4] = walkPromises(e5[t5[n4]]);
    return s4;
  }
  const s3 = walkObjectPromises(e5, t5, r4 + 1);
  return s3 && (s3[r4] = n3), s3;
}
function walkPromises(e5) {
  if ("function" == typeof e5) return e5;
  if (isThenable(e5)) return Promise.resolve(e5).then(walkPromises);
  if (Array.isArray(e5)) {
    const t5 = walkArrayPromises(e5, 0);
    return t5 ? Promise.all(t5) : e5;
  }
  if (e5?.constructor === Object) {
    const t5 = Object.keys(e5), r4 = walkObjectPromises(e5, t5, 0);
    if (r4) return Promise.all(r4).then((e6) => Object.fromEntries(t5.map((t6, r5) => [t6, e6[r5]])));
  }
  return e5;
}
function processIfNeeded(e5, t5, r4, n3 = false) {
  return "string" == typeof e5 && e5.includes("%") ? processTemplateParams(e5, t5, r4, n3) : e5;
}
function createHead(e5 = {}) {
  const t5 = createHead$1({ ...e5, propResolvers: [N2] });
  return t5.install = (function(e6) {
    return { install(t6) {
      t6.config.globalProperties.$unhead = e6, t6.config.globalProperties.$head = e6, t6.provide("usehead", e6);
    } }.install;
  })(t5), t5;
}
function createSSRContext(r4) {
  return { url: (function(e5) {
    const r5 = e5.indexOf("?");
    return -1 === r5 ? encodePath(e5) : encodePath(e5.slice(0, r5)) + e5.slice(r5);
  })(r4.path), event: r4, runtimeConfig: useRuntimeConfig(r4), noSSR: true, head: createHead(Y2), error: false, nuxt: void 0, payload: {}, "~payloadReducers": /* @__PURE__ */ Object.create(null), modules: /* @__PURE__ */ new Set() };
}
function buildAssetsURL(...t5) {
  return joinRelativeURL(publicAssetsURL(), useRuntimeConfig().app.buildAssetsDir, ...t5);
}
function publicAssetsURL(...t5) {
  const n3 = useRuntimeConfig().app, s3 = n3.cdnURL || n3.baseURL;
  return t5.length ? joinRelativeURL(s3, ...t5) : s3;
}
function withLeadingSlash(e5 = "") {
  return (function(e6 = "") {
    return e6.startsWith("/");
  })(e5) ? e5 : "/" + e5;
}
function getModuleDependencies(e5, t5) {
  if (t5._dependencies[e5]) return t5._dependencies[e5];
  const r4 = t5._dependencies[e5] = { scripts: {}, styles: {}, preload: {}, prefetch: {} };
  if (!t5.manifest) return r4;
  const n3 = t5.manifest[e5];
  if (!n3) return r4;
  n3.file && (r4.preload[e5] = n3, (n3.isEntry || n3.sideEffects) && (r4.scripts[e5] = n3));
  for (const e6 of n3.css || []) r4.styles[e6] = r4.preload[e6] = r4.prefetch[e6] = t5.manifest[e6];
  for (const e6 of n3.assets || []) r4.preload[e6] = r4.prefetch[e6] = t5.manifest[e6];
  if (n3.imports) for (const e6 of n3.imports) {
    const n4 = getModuleDependencies(e6, t5);
    Object.assign(r4.styles, n4.styles), Object.assign(r4.preload, n4.preload), Object.assign(r4.prefetch, n4.prefetch);
  }
  const s3 = {};
  for (const e6 in r4.preload) {
    const t6 = r4.preload[e6];
    t6.preload && (s3[e6] = t6);
  }
  return r4.preload = s3, r4;
}
function getRequestDependencies(e5, t5, r4) {
  const n3 = r4?.exclude ? new Set(r4.exclude) : void 0, s3 = n3 && n3.size > 0;
  if (!s3 && e5._requestDependencies) return e5._requestDependencies;
  let o5;
  const i4 = e5.modules || e5._registeredComponents;
  if (s3) {
    o5 = /* @__PURE__ */ new Set();
    for (const e6 of t5._entrypoints) n3.has(e6) || o5.add(e6);
    if (i4) for (const e6 of i4) n3.has(e6) || o5.add(e6);
  } else if (o5 = new Set(t5._entrypoints), i4) for (const e6 of i4) o5.add(e6);
  const a4 = (function(e6, t6) {
    const r5 = t6._dependencySetsCacheSize, n4 = r5 > 0;
    let s4 = "";
    if (n4) {
      if (e6.size <= 1) for (const t7 of e6) s4 = t7;
      else s4 = [...e6].sort().join(",");
      const n5 = t6._dependencySets.get(s4);
      if (void 0 !== n5) return t6._dependencySets.size >= r5 && (t6._dependencySets.delete(s4), t6._dependencySets.set(s4, n5)), n5;
    }
    const o6 = { scripts: {}, styles: {}, preload: {}, prefetch: {} };
    for (const r6 of e6) {
      const e7 = getModuleDependencies(r6, t6);
      Object.assign(o6.scripts, e7.scripts), Object.assign(o6.styles, e7.styles), Object.assign(o6.preload, e7.preload), Object.assign(o6.prefetch, e7.prefetch);
      const n5 = t6.manifest?.[r6]?.dynamicImports || t6.precomputed?.modules[r6]?.dynamicImports;
      if (n5) for (const e8 of n5) {
        const r7 = getModuleDependencies(e8, t6);
        Object.assign(o6.prefetch, r7.scripts), Object.assign(o6.prefetch, r7.styles), Object.assign(o6.prefetch, r7.preload);
      }
    }
    const i5 = o6.preload, a5 = o6.styles, c4 = {};
    for (const e7 in o6.prefetch) {
      const t7 = o6.prefetch[e7];
      !t7.prefetch || e7 in i5 || e7 in a5 || (c4[e7] = t7);
    }
    o6.prefetch = c4;
    const l4 = {};
    for (const e7 in i5) e7 in a5 || (l4[e7] = i5[e7]);
    if (o6.preload = l4, n4 && (t6._dependencySets.set(s4, o6), t6._dependencySets.size > r5)) {
      const e7 = t6._dependencySets.keys().next().value;
      void 0 !== e7 && t6._dependencySets.delete(e7);
    }
    return o6;
  })(o5, t5);
  return s3 || (e5._requestDependencies = a4), a4;
}
function getRenderedOutputs(e5, t5) {
  let r4 = e5._renderedCache.get(t5);
  return r4 || (r4 = {}, e5._renderedCache.set(t5, r4)), r4;
}
function renderStyles(e5, t5) {
  const r4 = getRequestDependencies(e5, t5), n3 = getRenderedOutputs(t5, r4);
  if (void 0 !== n3.styles) return n3.styles;
  const { styles: s3 } = r4;
  let o5 = "";
  for (const e6 in s3) {
    const r5 = s3[e6];
    o5 += `<link rel="stylesheet" href="${t5.buildAssetsURL(r5.file)}" crossorigin>`;
  }
  return n3.styles = o5, o5;
}
function renderResourceHints(e5, t5, r4) {
  const n3 = getRequestDependencies(e5, t5, r4), s3 = getRenderedOutputs(t5, n3);
  if (void 0 !== s3.hints) return s3.hints;
  const { preload: o5, prefetch: i4 } = n3;
  let a4 = "";
  for (const e6 in o5) {
    const r5 = o5[e6], n4 = t5.buildAssetsURL(r5.file), s4 = r5.module ? "modulepreload" : "preload", i5 = "style" === r5.resourceType || "font" === r5.resourceType || "script" === r5.resourceType || r5.module ? " crossorigin" : "";
    r5.resourceType && r5.mimeType ? a4 += `<link rel="${s4}" as="${r5.resourceType}" type="${r5.mimeType}"${i5} href="${n4}">` : r5.resourceType ? a4 += `<link rel="${s4}" as="${r5.resourceType}"${i5} href="${n4}">` : a4 += `<link rel="${s4}"${i5} href="${n4}">`;
  }
  for (const e6 in i4) {
    const r5 = i4[e6], n4 = t5.buildAssetsURL(r5.file), s4 = "style" === r5.resourceType || "font" === r5.resourceType || "script" === r5.resourceType || r5.module ? " crossorigin" : "";
    r5.resourceType && r5.mimeType ? a4 += `<link rel="prefetch" as="${r5.resourceType}" type="${r5.mimeType}"${s4} href="${n4}">` : r5.resourceType ? a4 += `<link rel="prefetch" as="${r5.resourceType}"${s4} href="${n4}">` : a4 += `<link rel="prefetch"${s4} href="${n4}">`;
  }
  return s3.hints = a4, a4;
}
function renderResourceHeaders(e5, t5, r4) {
  const n3 = getRequestDependencies(e5, t5, r4), s3 = getRenderedOutputs(t5, n3);
  if (void 0 !== s3.headerLink) return { link: s3.headerLink };
  const { preload: o5, prefetch: i4 } = n3, a4 = [];
  for (const e6 in o5) {
    const r5 = o5[e6];
    let n4 = `<${t5.buildAssetsURL(r5.file).replace(X2, encodeURIComponent)}>; rel="${r5.module ? "modulepreload" : "preload"}"`;
    r5.resourceType && (n4 += `; as="${r5.resourceType}"`), r5.mimeType && (n4 += `; type="${r5.mimeType}"`), ("style" === r5.resourceType || "font" === r5.resourceType || "script" === r5.resourceType || r5.module) && (n4 += "; crossorigin"), a4.push(n4);
  }
  for (const e6 in i4) {
    const r5 = i4[e6];
    let n4 = `<${t5.buildAssetsURL(r5.file).replace(X2, encodeURIComponent)}>; rel="prefetch"`;
    r5.resourceType && (n4 += `; as="${r5.resourceType}"`), r5.mimeType && (n4 += `; type="${r5.mimeType}"`), ("style" === r5.resourceType || "font" === r5.resourceType || "script" === r5.resourceType || r5.module) && (n4 += "; crossorigin"), a4.push(n4);
  }
  return s3.headerLink = a4.join(", "), { link: s3.headerLink };
}
function renderScripts(e5, t5) {
  const r4 = getRequestDependencies(e5, t5), n3 = getRenderedOutputs(t5, r4);
  if (void 0 !== n3.scripts) return n3.scripts;
  const { scripts: s3 } = r4;
  let o5 = "";
  for (const e6 in s3) {
    const r5 = s3[e6];
    r5.module ? o5 += `<script type="module" src="${t5.buildAssetsURL(r5.file)}" crossorigin><\/script>` : o5 += `<script src="${t5.buildAssetsURL(r5.file)}" defer crossorigin><\/script>`;
  }
  return n3.scripts = o5, o5;
}
function createRenderer(e5, t5) {
  const r4 = (function({ manifest: e6, precomputed: t6, buildAssetsURL: r5, dependencySetsCacheSize: n3 }) {
    if (!e6 && !t6) throw new Error("Either manifest or precomputed data must be provided");
    const s3 = { buildAssetsURL: r5 || withLeadingSlash, manifest: e6, precomputed: t6, updateManifest, _dependencies: {}, _dependencySets: /* @__PURE__ */ new Map(), _dependencySetsCacheSize: "number" == typeof n3 && Number.isFinite(n3) && n3 > 0 ? Math.floor(n3) : void 0 === n3 ? 1e3 : 0, _entrypoints: [], _renderedCache: /* @__PURE__ */ new WeakMap() };
    function updateManifest(e7) {
      s3.manifest = e7, s3._dependencies = {}, s3._dependencySets.clear(), s3._renderedCache = /* @__PURE__ */ new WeakMap();
      const t7 = [];
      for (const r6 in e7) e7[r6].isEntry && t7.push(r6);
      s3._entrypoints = t7;
    }
    __name(updateManifest, "updateManifest");
    return t6 ? (s3._dependencies = t6.dependencies, s3._entrypoints = t6.entrypoints) : e6 && updateManifest(e6), s3;
  })(t5);
  return { rendererContext: r4, async renderToString(n3) {
    n3._registeredComponents = n3._registeredComponents || /* @__PURE__ */ new Set();
    const s3 = await (await Promise.resolve(e5).then((e6) => "default" in e6 ? e6.default : e6))(n3), wrap = /* @__PURE__ */ __name((e6) => () => e6(n3, r4), "wrap");
    return { html: await t5.renderToString(s3, n3), renderResourceHeaders: wrap(renderResourceHeaders), renderResourceHints: wrap(renderResourceHints), renderStyles: wrap(renderStyles), renderScripts: wrap(renderScripts) };
  } };
}
function is_primitive(e5) {
  return null === e5 || "object" != typeof e5 && "function" != typeof e5;
}
function is_plain_object(e5) {
  const t5 = Object.getPrototypeOf(e5);
  return t5 === Object.prototype || null === t5 || null === Object.getPrototypeOf(t5) || Object.getOwnPropertyNames(t5).sort().join("\0") === se2;
}
function get_type(e5) {
  return Object.prototype.toString.call(e5).slice(8, -1);
}
function get_escaped_char(e5) {
  switch (e5) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return e5 < " " ? `\\u${e5.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(e5) {
  let t5 = "", r4 = 0;
  const n3 = e5.length;
  for (let s3 = 0; s3 < n3; s3 += 1) {
    const n4 = get_escaped_char(e5[s3]);
    n4 && (t5 += e5.slice(r4, s3) + n4, r4 = s3 + 1);
  }
  return `"${0 === r4 ? e5 : t5 + e5.slice(r4)}"`;
}
function enumerable_symbols(e5) {
  return Object.getOwnPropertySymbols(e5).filter((t5) => Object.getOwnPropertyDescriptor(e5, t5).enumerable);
}
function stringify_key(e5) {
  return oe2.test(e5) ? "." + e5 : "[" + JSON.stringify(e5) + "]";
}
function is_valid_array_index_string(e5) {
  if (0 === e5.length) return false;
  if (e5.length > 1 && 48 === e5.charCodeAt(0)) return false;
  for (let t6 = 0; t6 < e5.length; t6++) {
    const r4 = e5.charCodeAt(t6);
    if (r4 < 48 || r4 > 57) return false;
  }
  return t5 = +e5, !(!Number.isInteger(t5) || t5 < 0 || t5 > 4294967294);
  var t5;
}
function valid_array_indices(e5) {
  const t5 = Object.keys(e5);
  return t5.length = (function(e6) {
    for (var t6 = e6.length - 1; t6 >= 0 && !is_valid_array_index_string(e6[t6]); t6--) ;
    return t6 + 1;
  })(t5), t5;
}
function uneval(e5, t5) {
  const r4 = /* @__PURE__ */ new Map(), n3 = [], s3 = /* @__PURE__ */ new Map();
  !(/* @__PURE__ */ __name(function walk(t6) {
    if (is_primitive(t6)) {
      if ("symbol" == typeof t6) throw new DevalueError("Cannot stringify a Symbol primitive", n3, t6, e5);
    } else {
      if (r4.has(t6)) return void r4.set(t6, r4.get(t6) + 1);
      if (r4.set(t6, 1), "function" == typeof t6) throw new DevalueError("Cannot stringify a function", n3, t6, e5);
      switch (get_type(t6)) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
        case "URL":
        case "URLSearchParams":
        case "ArrayBuffer":
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          return;
        case "Array":
          t6.forEach((e6, t7) => {
            n3.push(`[${t7}]`), walk(e6), n3.pop();
          });
          break;
        case "Set":
          Array.from(t6).forEach(walk);
          break;
        case "Map":
          for (const [e6, r5] of t6) n3.push(`.get(${is_primitive(e6) ? stringify_primitive$1(e6) : "..."})`), walk(e6), walk(r5), n3.pop();
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Float16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array":
        case "DataView":
          return void walk(t6.buffer);
        default:
          if (!is_plain_object(t6)) throw new DevalueError("Cannot stringify arbitrary non-POJOs", n3, t6, e5);
          if (enumerable_symbols(t6).length > 0) throw new DevalueError("Cannot stringify POJOs with symbolic keys", n3, t6, e5);
          for (const r5 of Object.keys(t6)) {
            if ("__proto__" === r5) throw new DevalueError("Cannot stringify objects with __proto__ keys", n3, t6, e5);
            n3.push(stringify_key(r5)), walk(t6[r5]), n3.pop();
          }
      }
    }
  }, "walk"))(e5);
  const o5 = /* @__PURE__ */ new Map();
  function stringify3(e6) {
    if (o5.has(e6)) return o5.get(e6);
    if (is_primitive(e6)) return stringify_primitive$1(e6);
    if (s3.has(e6)) return s3.get(e6);
    const t6 = get_type(e6);
    switch (t6) {
      case "Number":
      case "String":
      case "Boolean":
      case "BigInt":
        return `Object(${stringify3(e6.valueOf())})`;
      case "RegExp":
        const { source: r5, flags: n4 } = e6;
        return n4 ? `new RegExp(${stringify_string(r5)},"${n4}")` : `new RegExp(${stringify_string(r5)})`;
      case "Date":
        return `new Date(${e6.getTime()})`;
      case "URL":
        return `new URL(${stringify_string(e6.toString())})`;
      case "URLSearchParams":
        return `new URLSearchParams(${stringify_string(e6.toString())})`;
      case "Array": {
        let t7 = false, r6 = "[";
        for (let n5 = 0; n5 < e6.length; n5 += 1) if (n5 > 0 && (r6 += ","), Object.hasOwn(e6, n5)) r6 += stringify3(e6[n5]);
        else if (!t7) {
          const r7 = valid_array_indices(e6), n6 = r7.length, s5 = String(e6.length).length;
          if (e6.length + 2 > 25 + s5 + n6 * (s5 + 2)) {
            const t8 = r7.map((t9) => `${t9}:${stringify3(e6[t9])}`).join(",");
            return `Object.assign(Array(${e6.length}),{${t8}})`;
          }
          t7 = true;
        }
        return r6 + (0 === e6.length || e6.length - 1 in e6 ? "" : ",") + "]";
      }
      case "Set":
      case "Map":
        return `new ${t6}([${Array.from(e6).map(stringify3).join(",")}])`;
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Float16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array": {
        let r6 = `new ${t6}`;
        if (o5.has(e6.buffer) ? r6 += `(${stringify3(e6.buffer)})` : r6 += `([${stringify_typed_array_elements(t6, e6.buffer)}])`, e6.byteLength !== e6.buffer.byteLength) {
          const t7 = e6.byteOffset / e6.BYTES_PER_ELEMENT;
          r6 += `.subarray(${t7},${t7 + e6.length})`;
        }
        return r6;
      }
      case "DataView": {
        let t7 = "new DataView";
        return o5.has(e6.buffer) ? t7 += `(${stringify3(e6.buffer)}` : t7 += `(new Uint8Array([${new Uint8Array(e6.buffer)}]).buffer`, e6.byteLength !== e6.buffer.byteLength && (t7 += `,${e6.byteOffset},${e6.byteLength}`), t7 + ")";
      }
      case "ArrayBuffer":
        return `new Uint8Array([${new Uint8Array(e6).toString()}]).buffer`;
      case "Temporal.Duration":
      case "Temporal.Instant":
      case "Temporal.PlainDate":
      case "Temporal.PlainTime":
      case "Temporal.PlainDateTime":
      case "Temporal.PlainMonthDay":
      case "Temporal.PlainYearMonth":
      case "Temporal.ZonedDateTime":
        return `${t6}.from(${stringify_string(e6.toString())})`;
      default:
        const s4 = Object.keys(e6), i5 = s4.map((t7) => `${(function(e7) {
          return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(e7) ? e7 : escape_unsafe_chars(JSON.stringify(e7));
        })(t7)}:${stringify3(e6[t7])}`).join(",");
        return null === Object.getPrototypeOf(e6) ? s4.length > 0 ? `{${i5},__proto__:null}` : "{__proto__:null}" : `{${i5}}`;
    }
  }
  __name(stringify3, "stringify");
  Array.from(r4).filter((e6) => e6[1] > 1).sort((e6, t6) => t6[1] - e6[1]).forEach((e6, t6) => {
    o5.set(e6[0], (function(e7) {
      let t7 = "";
      do {
        t7 = ie2[e7 % 54] + t7, e7 = ~~(e7 / 54) - 1;
      } while (e7 >= 0);
      return ce2.test(t7) ? `${t7}0` : t7;
    })(t6));
  });
  const i4 = stringify3(e5);
  if (o5.size) {
    const e6 = [], t6 = [], r5 = [], n4 = [];
    o5.forEach((i5, a5) => {
      if (e6.push(i5), s3.has(a5)) return void r5.push(s3.get(a5));
      if (is_primitive(a5)) return void r5.push(stringify_primitive$1(a5));
      const c4 = get_type(a5);
      switch (c4) {
        case "Number":
        case "String":
        case "Boolean":
        case "BigInt":
          r5.push(`Object(${stringify3(a5.valueOf())})`);
          break;
        case "RegExp":
          const { source: e7, flags: s4 } = a5, l4 = s4 ? `new RegExp(${stringify_string(e7)},"${s4}")` : `new RegExp(${stringify_string(e7)})`;
          r5.push(l4);
          break;
        case "Date":
          r5.push(`new Date(${a5.getTime()})`);
          break;
        case "URL":
          r5.push(`new URL(${stringify_string(a5.toString())})`);
          break;
        case "URLSearchParams":
          r5.push(`new URLSearchParams(${stringify_string(a5.toString())})`);
          break;
        case "Array":
          r5.push(`Array(${a5.length})`), a5.forEach((e8, r6) => {
            t6.push(`${i5}[${r6}]=${stringify3(e8)}`);
          });
          break;
        case "Set": {
          r5.push("new Set");
          const e8 = Array.from(a5).map((e9) => `.add(${stringify3(e9)})`);
          e8.length > 0 && t6.push(i5 + e8.join(""));
          break;
        }
        case "Map": {
          r5.push("new Map");
          const e8 = Array.from(a5).map(([e9, t7]) => `.set(${stringify3(e9)}, ${stringify3(t7)})`);
          e8.length > 0 && t6.push(i5 + e8.join(""));
          break;
        }
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Float16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array": {
          let e8 = `new ${c4}`;
          if (o5.has(a5.buffer) ? e8 += `(${stringify3(a5.buffer)})` : e8 += `([${stringify_typed_array_elements(c4, a5.buffer)}])`, a5.byteLength !== a5.buffer.byteLength) {
            const t7 = a5.byteOffset / a5.BYTES_PER_ELEMENT;
            e8 += `.subarray(${t7},${t7 + a5.length})`;
          }
          r5.push("{}"), n4.push(`${i5}=${e8}`);
          break;
        }
        case "DataView": {
          let e8 = "new DataView";
          o5.has(a5.buffer) ? e8 += `(${stringify3(a5.buffer)}` : e8 += `(new Uint8Array([${new Uint8Array(a5.buffer)}]).buffer`, a5.byteLength !== a5.buffer.byteLength && (e8 += `,${a5.byteOffset},${a5.byteLength}`), e8 += ")", r5.push("{}"), n4.push(`${i5}=${e8}`);
          break;
        }
        case "ArrayBuffer":
          r5.push(`new Uint8Array([${new Uint8Array(a5)}]).buffer`);
          break;
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          r5.push(`${c4}.from(${stringify_string(a5.toString())})`);
          break;
        default:
          r5.push(null === Object.getPrototypeOf(a5) ? "Object.create(null)" : "{}"), Object.keys(a5).forEach((e8) => {
            t6.push(`${i5}${(function(e9) {
              return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(e9) ? `.${e9}` : `[${escape_unsafe_chars(JSON.stringify(e9))}]`;
            })(e8)}=${stringify3(a5[e8])}`);
          });
      }
    }), t6.push(`return ${i4}`);
    const a4 = [...n4, ...t6].join(";");
    return e6.length > 65534 ? `(function(){var[${e6.join(",")}]=arguments[0];${a4}}([${r5.join(",")}]))` : `(function(${e6.join(",")}){${a4}}(${r5.join(",")}))`;
  }
  return i4;
}
function stringify_typed_array_elements(e5, t5) {
  const r4 = new globalThis[e5](t5);
  return "BigInt64Array" === e5 || "BigUint64Array" === e5 ? Array.from(r4, (e6) => `${e6}n`).join(",") : r4 instanceof Float32Array || r4 instanceof Float64Array || "undefined" != typeof Float16Array && r4 instanceof Float16Array ? Array.from(r4, (e6) => Object.is(e6, -0) ? "-0" : `${e6}`).join(",") : r4.toString();
}
function escape_unsafe_char(e5) {
  return ne2[e5] || e5;
}
function escape_unsafe_chars(e5) {
  return e5.replace(ae2, escape_unsafe_char);
}
function stringify_primitive$1(e5) {
  const t5 = typeof e5;
  if ("string" === t5) return stringify_string(e5);
  if (void 0 === e5) return "void 0";
  if (0 === e5 && 1 / e5 < 0) return "-0";
  const r4 = String(e5);
  return "number" === t5 ? r4.replace(/^(-)?0\./, "$1.") : "bigint" === t5 ? e5 + "n" : r4;
}
function stringify(e5, t5, r4) {
  const n3 = (function(e6, t6, r5) {
    const n4 = (a4 = ye2, a4), s3 = [], o5 = /* @__PURE__ */ new Map(), i4 = [];
    var a4;
    if (r5) for (const e7 of Object.getOwnPropertyNames(r5)) i4.push({ key: e7, fn: r5[e7] });
    const c4 = [];
    let l4 = 0;
    function flatten(e7, r6) {
      const a5 = n4.typeOf(e7);
      if ("undefined" === a5) return -1;
      let p5;
      if ("number" === a5) {
        if (p5 = n4.toPrimitive(e7), Number.isNaN(p5)) return -3;
        if (p5 === 1 / 0) return -4;
        if (p5 === -1 / 0) return -5;
        if (0 === p5 && 1 / p5 < 0) return -6;
      }
      const f4 = n4.identify(e7);
      if (o5.has(f4)) return o5.get(f4);
      r6 ??= l4++, o5.set(f4, r6);
      for (const { key: t7, fn: n5 } of i4) {
        const o6 = n5(e7);
        if (o6) return s3[r6] = `["${t7}",${flatten(o6)}]`, r6;
      }
      if ("function" === a5) throw new DevalueError("Cannot stringify a function", c4, e7, t6);
      if ("symbol" === a5) throw new DevalueError("Cannot stringify a Symbol primitive", c4, e7, t6);
      let u4 = "";
      if ("object" !== a5) u4 = stringify_primitive("number" === a5 ? p5 : n4.toPrimitive(e7));
      else {
        if (n4.isThenable(e7)) throw new DevalueError("Cannot stringify a Promise or thenable \u2014 use stringifyAsync instead", c4, e7, t6);
        {
          const r7 = n4.tagOf(e7);
          switch (r7) {
            case "Number":
            case "String":
            case "Boolean":
            case "BigInt":
              u4 = `["Object",${flatten(n4.unbox(e7))}]`;
              break;
            case "Date":
              u4 = `["Date","${n4.toISOString(e7)}"]`;
              break;
            case "URL":
              u4 = `["URL",${stringify_string(n4.toStringValue(e7))}]`;
              break;
            case "URLSearchParams":
              u4 = `["URLSearchParams",${stringify_string(n4.toStringValue(e7))}]`;
              break;
            case "RegExp":
              const { source: s4, flags: o6 } = n4.regExpInfo(e7);
              u4 = o6 ? `["RegExp",${stringify_string(s4)},"${o6}"]` : `["RegExp",${stringify_string(s4)}]`;
              break;
            case "Array": {
              let t7 = false;
              const r8 = n4.lengthOf(e7);
              u4 = "[";
              for (let s5 = 0; s5 < r8; s5 += 1) if (s5 > 0 && (u4 += ","), n4.hasOwn(e7, s5)) c4.push(`[${s5}]`), u4 += flatten(n4.get(e7, s5)), c4.pop();
              else if (t7) u4 += -2;
              else {
                const s6 = n4.indicesOf(e7), o7 = s6.length, i5 = String(r8).length;
                if (3 * (r8 - o7) > 4 + i5 + o7 * (i5 + 1)) {
                  u4 = "[-7," + r8;
                  for (let t8 = 0; t8 < s6.length; t8++) {
                    const r9 = s6[t8];
                    c4.push(`[${r9}]`), u4 += "," + r9 + "," + flatten(n4.get(e7, r9)), c4.pop();
                  }
                  break;
                }
                t7 = true, u4 += -2;
              }
              u4 += "]";
              break;
            }
            case "Set":
              u4 = '["Set"';
              for (const t7 of n4.valuesOf(e7)) u4 += `,${flatten(t7)}`;
              u4 += "]";
              break;
            case "Map":
              u4 = '["Map"';
              for (const [t7, r8] of n4.entriesOf(e7)) {
                const e8 = n4.typeOf(t7), s5 = "object" !== e8 && "function" !== e8 && "symbol" !== e8;
                c4.push(`.get(${s5 ? stringify_primitive(n4.toPrimitive(t7)) : "..."})`), u4 += `,${flatten(t7)},${flatten(r8)}`, c4.pop();
              }
              u4 += "]";
              break;
            case "Int8Array":
            case "Uint8Array":
            case "Uint8ClampedArray":
            case "Int16Array":
            case "Uint16Array":
            case "Float16Array":
            case "Int32Array":
            case "Uint32Array":
            case "Float32Array":
            case "Float64Array":
            case "BigInt64Array":
            case "BigUint64Array": {
              const t7 = n4.viewInfo(e7);
              u4 = '["' + r7 + '",' + flatten(t7.buffer), t7.byteLength !== t7.bufferByteLength && (u4 += `,${t7.byteOffset},${t7.length}`), u4 += "]";
              break;
            }
            case "DataView": {
              const t7 = n4.viewInfo(e7);
              u4 = '["' + r7 + '",' + flatten(t7.buffer), t7.byteLength !== t7.bufferByteLength && (u4 += `,${t7.byteOffset},${t7.byteLength}`), u4 += "]";
              break;
            }
            case "ArrayBuffer":
              u4 = `["ArrayBuffer","${fe2(n4.toArrayBuffer(e7))}"]`;
              break;
            case "Temporal.Duration":
            case "Temporal.Instant":
            case "Temporal.PlainDate":
            case "Temporal.PlainTime":
            case "Temporal.PlainDateTime":
            case "Temporal.PlainMonthDay":
            case "Temporal.PlainYearMonth":
            case "Temporal.ZonedDateTime":
              u4 = `["${r7}",${stringify_string(n4.toStringValue(e7))}]`;
              break;
            default: {
              const r8 = n4.shapeOf(e7);
              if ("not-plain" === r8.kind) throw new DevalueError("Cannot stringify arbitrary non-POJOs", c4, e7, t6);
              if ("symbol-keys" === r8.kind) throw new DevalueError("Cannot stringify POJOs with symbolic keys", c4, e7, t6);
              if ("null-proto" === r8.kind) {
                u4 = '["null"';
                for (const s5 of r8.keys) {
                  if ("__proto__" === s5) throw new DevalueError("Cannot stringify objects with __proto__ keys", c4, e7, t6);
                  c4.push(stringify_key(s5)), u4 += `,${stringify_string(s5)},${flatten(n4.get(e7, s5))}`, c4.pop();
                }
                u4 += "]";
              } else {
                u4 = "{";
                let s5 = false;
                for (const o7 of r8.keys) {
                  if ("__proto__" === o7) throw new DevalueError("Cannot stringify objects with __proto__ keys", c4, e7, t6);
                  s5 && (u4 += ","), s5 = true, c4.push(stringify_key(o7)), u4 += `${stringify_string(o7)}:${flatten(n4.get(e7, o7))}`, c4.pop();
                }
                u4 += "}";
              }
            }
          }
        }
      }
      return s3[r6] = u4, r6;
    }
    __name(flatten, "flatten");
    const p4 = flatten(t6);
    return p4 < 0 ? `${p4}` : s3;
  })(0, e5, t5);
  return "string" == typeof n3 ? n3 : `[${n3.join(",")}]`;
}
function stringify_primitive(e5) {
  const t5 = typeof e5;
  return "string" === t5 ? stringify_string(e5) : void 0 === e5 ? (-1).toString() : 0 === e5 && 1 / e5 < 0 ? (-6).toString() : "bigint" === t5 ? `["BigInt","${e5}"]` : String(e5);
}
function renderPayloadJsonScript(e5) {
  const t5 = { type: "application/json", innerHTML: e5.data ? (r4 = stringify(e5.data, e5.ssrContext["~payloadReducers"]), r4.replaceAll("/", "\\u002F")) : "", "data-nuxt-data": "nuxt-app", "data-ssr": false };
  var r4;
  t5.id = "__NUXT_DATA__", e5.src && (t5["data-src"] = e5.src);
  return [t5, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${uneval(e5.ssrContext.config)}` }];
}
function cwd() {
  return void 0 !== m2 && "function" == typeof m2.cwd ? m2.cwd().replace(/\\/g, "/") : "/";
}
function normalizeChunks(e5) {
  const t5 = [];
  for (const r4 of e5) {
    const e6 = r4?.trim();
    e6 && t5.push(e6);
  }
  return t5;
}
function joinTags(e5) {
  return e5.join("");
}
function joinAttrs(e5) {
  return 0 === e5.length ? "" : " " + e5.join(" ");
}
function renderHTMLDocument(e5) {
  return `<!DOCTYPE html><html${joinAttrs(e5.htmlAttrs)}><head>${joinTags(e5.head)}</head><body${joinAttrs(e5.bodyAttrs)}>${joinTags(e5.bodyPrepend)}${joinTags(e5.body)}${joinTags(e5.bodyAppend)}</body></html>`;
}
function stripInlineOnlyPayloadFields(e5) {
  if (!e5.prefetchLinks) return e5;
  const { prefetchLinks: t5, ...r4 } = e5;
  return r4;
}
var h2, m3, b2, _2, w2, $2, T2, k2, v2, A2, S2, hasContent, O2, P2, R2, j2, L2, C2, sortTags$1, DEFAULT_TAG_WEIGHT, x2, isTruthy, U2, M2, D2, E2, H2, I2, z2, N2, B2, W2, F2, q2, Z2, sortTags, formatKey, J2, V2, K2, Y2, X2, G2, Q2, ee2, te2, re2, ne2, DevalueError, se2, oe2, ie2, ae2, ce2, le2, pe2, fe2, ue2, ge2, de2, ye2, he2, me2, be2, _e2, we2, resolve, isAbsolute, $e2, Te2, ke2, ve2, Ae2;
var init_renderer = __esm({
  "../.output-cloudflare/server/chunks/routes/renderer.mjs"() {
    init_modules_watch_stub();
    init_nitro();
    init_shared_esm_bundler();
    h2 = false;
    __name(createUnhead, "createUnhead");
    m3 = /* @__PURE__ */ new Set(["meta", "link", "base"]);
    b2 = /* @__PURE__ */ new Set(["link", "style", "script", "noscript"]);
    _2 = /* @__PURE__ */ new Set(["title", "titleTemplate", "script", "style", "noscript"]);
    w2 = /* @__PURE__ */ new Set(["base", "meta", "link", "style", "script", "noscript"]);
    $2 = /* @__PURE__ */ new Set(["title", "base", "htmlAttrs", "bodyAttrs", "meta", "link", "style", "script", "noscript"]);
    T2 = /* @__PURE__ */ new Set(["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"]);
    k2 = /* @__PURE__ */ new Set(["key", "tagPosition", "tagPriority", "tagDuplicateStrategy", "innerHTML", "textContent", "processTemplateParams"]);
    v2 = /* @__PURE__ */ new Set(["templateParams", "htmlAttrs", "bodyAttrs"]);
    A2 = /* @__PURE__ */ new Set(["theme-color", "google-site-verification", "author", "og:locale:alternate", "og:image", "og:video", "og:audio", "article:author", "article:tag", "book:author", "book:tag", "twitter:image"]);
    S2 = { critical: -8, high: -1, low: 2 };
    hasContent = /* @__PURE__ */ __name((e5) => "number" == typeof e5 ? Number.isFinite(e5) : e5, "hasContent");
    __name(isUnsafeKey, "isUnsafeKey");
    __name(callHooks, "callHooks");
    O2 = class {
      static {
        __name(this, "O");
      }
      _hooks;
      constructor() {
        this._hooks = {};
      }
      hook(e5, t5) {
        return e5 && "function" == typeof t5 ? (this._hooks[e5] = this._hooks[e5] || [], this._hooks[e5].push(t5), () => {
          t5 && (this.removeHook(e5, t5), t5 = void 0);
        }) : () => {
        };
      }
      removeHook(e5, t5) {
        const r4 = this._hooks[e5];
        if (r4) {
          const n3 = r4.indexOf(t5);
          -1 !== n3 && r4.splice(n3, 1), 0 === r4.length && (this._hooks[e5] = void 0);
        }
      }
      callHook(e5, ...t5) {
        const r4 = this._hooks[e5];
        if (r4 && 0 !== r4.length) return callHooks(r4, t5, 0);
      }
    };
    __name(callHook, "callHook");
    P2 = /^(?:viewport|description|keywords|robots)$/;
    R2 = ["name", "property", "http-equiv"];
    __name(isMetaArrayDupeKey, "isMetaArrayDupeKey");
    __name(dedupeKey, "dedupeKey");
    __name(hashTag, "hashTag");
    __name(walkResolver, "walkResolver");
    j2 = /[\s"'<>/=\x00-\x1F\x7F]/;
    __name(normalizeStyleClassProps, "normalizeStyleClassProps");
    __name(resolveHeadInput, "resolveHeadInput");
    __name(normalizeTag, "normalizeTag");
    __name(pushNormalizedTag, "pushNormalizedTag");
    __name(normalizeEntryToTags, "normalizeEntryToTags");
    L2 = /</g;
    C2 = /<\/script/g;
    sortTags$1 = /* @__PURE__ */ __name((e5, t5) => e5._w === t5._w ? e5._p - t5._p : e5._w - t5._w, "sortTags$1");
    DEFAULT_TAG_WEIGHT = /* @__PURE__ */ __name(() => 100, "DEFAULT_TAG_WEIGHT");
    __name(isEmptyProps, "isEmptyProps");
    x2 = /^tags:|:render/;
    __name(syncEntryHookCache, "syncEntryHookCache");
    __name(cloneTagsInPlace, "cloneTagsInPlace");
    __name(resolveTags, "resolveTags");
    isTruthy = /* @__PURE__ */ __name((e5) => "" === e5 || true === e5, "isTruthy");
    __name(capoTagWeight, "capoTagWeight");
    U2 = /"/g;
    __name(encodeAttribute, "encodeAttribute");
    __name(propsToString, "propsToString");
    M2 = /[&<>"'/]/g;
    D2 = {};
    E2 = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "/": "&#x2F;" };
    __name(tagToString, "tagToString");
    __name(ssrRenderTags, "ssrRenderTags");
    __name(createServerRenderer, "createServerRenderer");
    H2 = { htmlAttrs: { lang: "en" }, meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }] };
    I2 = Object.assign((e5, t5) => e5 && e5.startsWith("on") && "function" == typeof t5 ? `this.dataset.${e5}fired = true` : t5, { _static: true });
    __name(createHead$1, "createHead$1");
    __name(isRef, "isRef");
    __name(toValue, "toValue");
    new Set(Object.getOwnPropertyNames(Symbol).filter((e5) => "arguments" !== e5 && "caller" !== e5).map((e5) => Symbol[e5]).filter(isSymbol));
    N2 = Object.assign((e5, t5) => isRef(t5) ? toValue(t5) : t5, { _static: true });
    __name(defineHeadPlugin, "defineHeadPlugin");
    B2 = /\\/g;
    W2 = /</g;
    F2 = /"/g;
    q2 = /%\w+(?:\.\w+)?/g;
    Z2 = "%separator";
    __name(processTemplateParams, "processTemplateParams");
    sortTags = /* @__PURE__ */ __name((e5, t5) => e5._w === t5._w ? e5._p - t5._p : e5._w - t5._w, "sortTags");
    formatKey = /* @__PURE__ */ __name((e5) => e5.includes(":key") ? e5 : e5.split(":").join(":key:"), "formatKey");
    J2 = defineHeadPlugin({ key: "aliasSorting", hooks: { "tags:resolve": /* @__PURE__ */ __name((e5) => {
      let t5 = false;
      for (const r4 of e5.tags) {
        const n3 = r4.tagPriority;
        if (!n3) continue;
        const s3 = String(n3);
        if (s3.startsWith("before:")) {
          const n4 = formatKey(s3.slice(7)), o5 = e5.tagMap.get(n4);
          o5 && ("number" == typeof o5.tagPriority && (r4.tagPriority = o5.tagPriority), r4._p = o5._p - 1, t5 = true);
        } else if (s3.startsWith("after:")) {
          const n4 = formatKey(s3.slice(6)), o5 = e5.tagMap.get(n4);
          o5 && ("number" == typeof o5.tagPriority && (r4.tagPriority = o5.tagPriority), r4._p = o5._p + 1, t5 = true);
        }
      }
      t5 && (e5.tags = e5.tags.sort(sortTags));
    }, "tags:resolve") } });
    __name(isThenable, "isThenable");
    __name(walkArrayPromises, "walkArrayPromises");
    __name(walkObjectPromises, "walkObjectPromises");
    __name(walkPromises, "walkPromises");
    V2 = { meta: "content", link: "href", htmlAttrs: "lang" };
    K2 = ["innerHTML", "textContent"];
    __name(processIfNeeded, "processIfNeeded");
    __name(createHead, "createHead");
    Y2 = { disableDefaults: true, plugins: [defineHeadPlugin({ key: "deprecations", hooks: { "entries:normalize": /* @__PURE__ */ __name(({ tags: e5 }) => {
      for (const t5 of e5) t5.props.children && (t5.innerHTML = t5.props.children, delete t5.props.children), t5.props.hid && (t5.key = t5.props.hid, delete t5.props.hid), t5.props.vmid && (t5.key = t5.props.vmid, delete t5.props.vmid), "body" in t5.props && (t5.props.body && (t5.tagPosition = "bodyClose"), delete t5.props.body), null != t5.props.renderPriority && (t5.tagPriority = t5.props.renderPriority, delete t5.props.renderPriority);
    }, "entries:normalize") } }), defineHeadPlugin((e5) => {
      const t5 = /* @__PURE__ */ new WeakMap();
      return { key: "promises", hooks: { "entries:resolve": /* @__PURE__ */ __name((r4) => {
        for (let n3 = r4.entries.length - 1; n3 >= 0; n3--) {
          const s3 = r4.entries[n3], o5 = s3.input;
          if (t5.get(s3) === o5) {
            r4.entries.splice(n3, 1);
            continue;
          }
          const i4 = walkPromises(o5);
          isThenable(i4) ? (t5.set(s3, o5), r4.entries.splice(n3, 1), Promise.resolve(i4).then((r5) => {
            t5.get(s3) === o5 && (t5.delete(s3), s3.input = r5, delete s3._tags, e5.invalidate?.());
          }, () => {
            t5.get(s3) === o5 && t5.delete(s3);
          })) : t5.delete(s3);
        }
      }, "entries:resolve") } };
    }, "promises"), defineHeadPlugin((e5) => ({ key: "template-params", hooks: { "tags:resolve": /* @__PURE__ */ __name(({ tagMap: t5, tags: r4 }) => {
      const n3 = t5.get("templateParams")?.props || {}, s3 = n3.separator || "|";
      delete n3.separator, n3.pageTitle = processIfNeeded(n3.pageTitle || e5._title || "", n3, s3);
      for (const e6 of r4) {
        if (false === e6.processTemplateParams) continue;
        const t6 = V2[e6.tag];
        if (t6 && "string" == typeof e6.props[t6]) e6.props[t6] = processIfNeeded(e6.props[t6], n3, s3);
        else if (e6.processTemplateParams || "titleTemplate" === e6.tag || "title" === e6.tag) for (const t7 of K2) "string" == typeof e6[t7] && (e6[t7] = processIfNeeded(e6[t7], n3, s3, "script" === e6.tag && "string" == typeof e6.props.type && e6.props.type.endsWith("json")));
      }
      e5._templateParams = n3, e5._separator = s3;
    }, "tags:resolve"), "tags:afterResolve": /* @__PURE__ */ __name(({ tagMap: t5 }) => {
      const r4 = t5.get("title");
      r4?.textContent && false !== r4.processTemplateParams && (r4.textContent = processIfNeeded(r4.textContent, e5._templateParams, e5._separator));
    }, "tags:afterResolve") } }), "template-params"), J2] };
    __name(createSSRContext, "createSSRContext");
    __name(buildAssetsURL, "buildAssetsURL");
    __name(publicAssetsURL, "publicAssetsURL");
    __name(withLeadingSlash, "withLeadingSlash");
    __name(getModuleDependencies, "getModuleDependencies");
    __name(getRequestDependencies, "getRequestDependencies");
    __name(getRenderedOutputs, "getRenderedOutputs");
    __name(renderStyles, "renderStyles");
    __name(renderResourceHints, "renderResourceHints");
    X2 = /[^\0-\u007F]+/g;
    __name(renderResourceHeaders, "renderResourceHeaders");
    __name(renderScripts, "renderScripts");
    __name(createRenderer, "createRenderer");
    G2 = { meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" }], link: [], style: [], script: [], noscript: [] };
    Q2 = { id: "teleports" };
    ee2 = { id: "__nuxt-loader" };
    globalThis.__buildAssetsURL = buildAssetsURL, globalThis.__publicAssetsURL = publicAssetsURL;
    te2 = `<div${propsToString({ id: "__nuxt" })}>`;
    re2 = /* @__PURE__ */ (function(e5) {
      let t5 = null;
      return () => (null === t5 && (t5 = e5().catch((e6) => {
        throw t5 = null, e6;
      })), t5);
    })(async () => {
      const t5 = await Promise.resolve().then(() => (init_precomputed(), precomputed_exports)).then((e5) => "default" in e5 ? e5.default : e5).then((e5) => "function" == typeof e5 ? e5() : e5), r4 = await Promise.resolve().then(() => (init_virtual_spa_template(), virtual_spa_template_exports)).then((e5) => e5.template).catch(() => "").then((e5) => {
        {
          const t6 = `<div${propsToString(ee2)}>`;
          return te2 + "</div>" + (e5 ? t6 + e5 + "</div>" : "");
        }
      }), n3 = createRenderer(() => () => {
      }, { precomputed: t5, manifest: void 0, renderToString: /* @__PURE__ */ __name(() => r4, "renderToString"), buildAssetsURL }), s3 = await n3.renderToString({});
      return { rendererContext: n3.rendererContext, renderToString: /* @__PURE__ */ __name((t6) => {
        const r5 = useRuntimeConfig(t6.event);
        return t6.modules ||= /* @__PURE__ */ new Set(), t6.payload.serverRendered = false, t6.config = { public: r5.public, app: r5.app }, Promise.resolve(s3);
      }, "renderToString") };
    });
    ne2 = { "<": "\\u003C", "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t", "\u2028": "\\u2028", "\u2029": "\\u2029" };
    DevalueError = class extends Error {
      static {
        __name(this, "DevalueError");
      }
      constructor(e5, t5, r4, n3) {
        super(e5), this.name = "DevalueError", this.path = t5.join(""), this.value = r4, this.root = n3;
      }
    };
    __name(is_primitive, "is_primitive");
    se2 = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
    __name(is_plain_object, "is_plain_object");
    __name(get_type, "get_type");
    __name(get_escaped_char, "get_escaped_char");
    __name(stringify_string, "stringify_string");
    __name(enumerable_symbols, "enumerable_symbols");
    oe2 = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
    __name(stringify_key, "stringify_key");
    __name(is_valid_array_index_string, "is_valid_array_index_string");
    __name(valid_array_indices, "valid_array_indices");
    ie2 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    ae2 = /[<\b\f\n\r\t\0\u2028\u2029]/g;
    ce2 = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
    __name(uneval, "uneval");
    __name(stringify_typed_array_elements, "stringify_typed_array_elements");
    __name(escape_unsafe_char, "escape_unsafe_char");
    __name(escape_unsafe_chars, "escape_unsafe_chars");
    __name(stringify_primitive$1, "stringify_primitive$1");
    le2 = "function" == typeof Uint8Array.fromBase64;
    pe2 = "object" == typeof m2 && void 0 !== m2.versions?.node;
    fe2 = le2 ? function(e5) {
      return new Uint8Array(e5).toBase64();
    } : pe2 ? function(e5) {
      return y2.from(e5).toString("base64");
    } : function(e5) {
      const t5 = new Uint8Array(e5);
      let r4 = "";
      for (let e6 = 0; e6 < t5.length; e6 += 32768) {
        const n3 = t5.subarray(e6, e6 + 32768);
        r4 += String.fromCharCode.apply(null, n3);
      }
      return btoa(r4);
    };
    ue2 = Object.freeze({ kind: "not-plain" });
    ge2 = Object.freeze({ kind: "symbol-keys" });
    de2 = { identify: /* @__PURE__ */ __name((e5) => e5, "identify"), typeOf: /* @__PURE__ */ __name((e5) => null === e5 ? "null" : typeof e5, "typeOf"), toPrimitive: /* @__PURE__ */ __name((e5) => e5, "toPrimitive"), tagOf: /* @__PURE__ */ __name((e5) => get_type(e5), "tagOf"), isThenable: /* @__PURE__ */ __name((e5) => "function" == typeof e5.then, "isThenable"), toPromise: /* @__PURE__ */ __name((e5) => Promise.resolve(e5), "toPromise"), unbox: /* @__PURE__ */ __name((e5) => e5.valueOf(), "unbox"), toISOString: /* @__PURE__ */ __name((e5) => isNaN(e5.getDate()) ? "" : e5.toISOString(), "toISOString"), toStringValue: /* @__PURE__ */ __name((e5) => e5.toString(), "toStringValue"), regExpInfo: /* @__PURE__ */ __name((e5) => ({ source: e5.source, flags: e5.flags }), "regExpInfo"), valuesOf: /* @__PURE__ */ __name((e5) => e5, "valuesOf"), entriesOf: /* @__PURE__ */ __name((e5) => e5, "entriesOf"), viewInfo: /* @__PURE__ */ __name((e5) => ({ buffer: e5.buffer, byteOffset: e5.byteOffset, byteLength: e5.byteLength, length: e5.length, bufferByteLength: e5.buffer.byteLength }), "viewInfo"), toArrayBuffer: /* @__PURE__ */ __name((e5) => e5, "toArrayBuffer"), lengthOf: /* @__PURE__ */ __name((e5) => e5.length, "lengthOf"), hasOwn: /* @__PURE__ */ __name((e5, t5) => Object.hasOwn(e5, t5), "hasOwn"), indicesOf: /* @__PURE__ */ __name((e5) => valid_array_indices(e5), "indicesOf"), shapeOf: /* @__PURE__ */ __name((e5) => is_plain_object(e5) ? enumerable_symbols(e5).length > 0 ? ge2 : { kind: null === Object.getPrototypeOf(e5) ? "null-proto" : "plain", keys: Object.keys(e5) } : ue2, "shapeOf"), get: /* @__PURE__ */ __name((e5, t5) => e5[t5], "get") };
    ye2 = Object.freeze(de2);
    __name(stringify, "stringify");
    __name(stringify_primitive, "stringify_primitive");
    __name(renderPayloadJsonScript, "renderPayloadJsonScript");
    he2 = { omitLineBreaks: true };
    me2 = "DIckivU5.js";
    be2 = /^[A-Za-z]:\//;
    _e2 = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
    we2 = /^\/([A-Za-z]:)?$/;
    __name(cwd, "cwd");
    resolve = /* @__PURE__ */ __name(function(...e5) {
      let t5 = "", r4 = false;
      for (let n3 = (e5 = e5.map((e6) => (function(e7 = "") {
        return e7 ? e7.replace(/\\/g, "/").replace(be2, (e8) => e8.toUpperCase()) : e7;
      })(e6))).length - 1; n3 >= -1 && !r4; n3--) {
        const s3 = n3 >= 0 ? e5[n3] : cwd();
        s3 && 0 !== s3.length && (t5 = `${s3}/${t5}`, r4 = isAbsolute(s3));
      }
      return t5 = (function(e6, t6) {
        let r5 = "", n3 = 0, s3 = -1, o5 = 0, i4 = null;
        for (let a4 = 0; a4 <= e6.length; ++a4) {
          if (a4 < e6.length) i4 = e6[a4];
          else {
            if ("/" === i4) break;
            i4 = "/";
          }
          if ("/" === i4) {
            if (s3 === a4 - 1 || 1 === o5) ;
            else if (2 === o5) {
              if (r5.length < 2 || 2 !== n3 || "." !== r5[r5.length - 1] || "." !== r5[r5.length - 2]) {
                if (r5.length > 2) {
                  const e7 = r5.lastIndexOf("/");
                  -1 === e7 ? (r5 = "", n3 = 0) : (r5 = r5.slice(0, e7), n3 = r5.length - 1 - r5.lastIndexOf("/")), s3 = a4, o5 = 0;
                  continue;
                }
                if (r5.length > 0) {
                  r5 = "", n3 = 0, s3 = a4, o5 = 0;
                  continue;
                }
              }
              t6 && (r5 += r5.length > 0 ? "/.." : "..", n3 = 2);
            } else r5.length > 0 ? r5 += `/${e6.slice(s3 + 1, a4)}` : r5 = e6.slice(s3 + 1, a4), n3 = a4 - s3 - 1;
            s3 = a4, o5 = 0;
          } else "." === i4 && -1 !== o5 ? ++o5 : o5 = -1;
        }
        return r5;
      })(t5, !r4), r4 && !isAbsolute(t5) ? `/${t5}` : t5.length > 0 ? t5 : ".";
    }, "resolve");
    isAbsolute = /* @__PURE__ */ __name(function(e5) {
      return _e2.test(e5);
    }, "isAbsolute");
    globalThis.__buildAssetsURL = buildAssetsURL, globalThis.__publicAssetsURL = publicAssetsURL;
    $e2 = !!Q2.id;
    Te2 = $e2 ? `<div${propsToString(Q2)}>` : "";
    ke2 = $e2 ? "</div>" : "";
    Ae2 = defineRenderHandler((e5) => {
      const t5 = e5.path.startsWith("/__nuxt_error") ? getQuery$1(e5) : null;
      if (t5 && !("__unenv__" in e5.node.req)) throw createError({ status: 404, statusText: "Page Not Found: /__nuxt_error", message: "Page Not Found: /__nuxt_error" });
      return (async function(e6, t6) {
        const r4 = useNitroApp(), n3 = createSSRContext(e6);
        if (n3.head.push(G2), t6) {
          const e7 = t6.status || t6.statusCode;
          if (e7 && (t6.status = t6.statusCode = Number.parseInt(e7)), "string" == typeof t6.data) try {
            t6.data = destr(t6.data);
          } catch {
          }
          !(function(e8, t7) {
            e8.error = true, e8.payload = { error: t7 }, e8.url = t7.url;
          })(n3, t6);
        }
        const s3 = getRouteRules(e6);
        false === s3.ssr && (n3.noSSR = true);
        n3.noSSR;
        const o5 = await re2(), i4 = { canStream: h2, prefersStream: false };
        await r4.hooks.callHook("render:route", i4, { event: e6 });
        const g4 = await o5.renderToString(n3).catch(async (e7) => {
          if ((n3["~renderResponse"] || n3._renderResponse) && "skipping render" === e7.message) return {};
          const r5 = !t6 && n3.payload?.error || e7;
          throw await n3.nuxt?.hooks.callHook("app:error", r5), r5;
        }), d5 = [];
        if (await n3.nuxt?.hooks.callHook("app:rendered", { ssrContext: n3, renderResult: g4 }), n3["~renderResponse"] || n3._renderResponse) return n3["~renderResponse"] || n3._renderResponse;
        if (n3.payload?.error && !t6) throw n3.payload.error;
        const y5 = s3.noScripts, { styles: m5, scripts: b5 } = getRequestDependencies(n3, o5.rendererContext);
        if (!y5) {
          let t7 = ve2;
          t7 || (t7 = buildAssetsURL(me2), n3.runtimeConfig.app.cdnURL || /^(?:\/|\.+\/)/.test(t7) ? ve2 = t7 : (t7 = (function(e7, t8) {
            const r5 = resolve(e7).replace(we2, "$1").split("/"), n4 = resolve(t8).replace(we2, "$1").split("/");
            if (":" === n4[0][1] && ":" === r5[0][1] && r5[0] !== n4[0]) return n4.join("/");
            const s4 = [...r5];
            for (const e8 of s4) {
              if (n4[0] !== e8) break;
              r5.shift(), n4.shift();
            }
            return [...r5.map(() => ".."), ...n4].join("/");
          })(e6.path.replace(/\/[^/]+$/, "/"), joinURL$2("/", t7)), /^(?:\/|\.+\/)/.test(t7) || (t7 = `./${t7}`))), n3.head.push({ script: [{ type: "importmap", innerHTML: { imports: { "#entry": t7 } } }] });
        }
        d5.length && n3.head.push({ style: d5 });
        const _5 = [];
        for (const e7 of Object.values(m5)) _5.push({ rel: "stylesheet", href: o5.rendererContext.buildAssetsURL(e7.file), crossorigin: "" });
        _5.length && n3.head.push({ link: _5 });
        if (!y5) {
          const e7 = n3["~lazyHydratedModules"]?.size ? { exclude: n3["~lazyHydratedModules"] } : void 0, t7 = new Set(_5.map((e8) => e8.href));
          for (const e8 of n3["~neverHydratedModules"] ?? []) {
            const r6 = o5.rendererContext.manifest?.[e8]?.file;
            r6 && t7.add(o5.rendererContext.buildAssetsURL(r6));
          }
          const r5 = [];
          for (const s4 of (function(e8, t8, r6) {
            const { preload: n4 } = getRequestDependencies(e8, t8, r6), s5 = [];
            for (const e9 in n4) {
              const r7 = n4[e9];
              s5.push({ rel: r7.module ? "modulepreload" : "preload", as: r7.resourceType, type: r7.mimeType ?? null, crossorigin: "style" === r7.resourceType || "font" === r7.resourceType || "script" === r7.resourceType || r7.module ? "" : null, href: t8.buildAssetsURL(r7.file) });
            }
            return s5;
          })(n3, o5.rendererContext, e7)) t7.has(s4.href) || r5.push(s4);
          for (const s4 of (function(e8, t8, r6) {
            const { prefetch: n4 } = getRequestDependencies(e8, t8, r6), s5 = [];
            for (const e9 in n4) {
              const r7 = n4[e9];
              s5.push({ rel: "prefetch", as: r7.resourceType, type: r7.mimeType ?? null, crossorigin: "style" === r7.resourceType || "font" === r7.resourceType || "script" === r7.resourceType || r7.module ? "" : null, href: t8.buildAssetsURL(r7.file) });
            }
            return s5;
          })(n3, o5.rendererContext, e7)) t7.has(s4.href) || r5.push(s4);
          n3.head.push({ link: r5 }), n3.head.push({ script: renderPayloadJsonScript({ ssrContext: n3, data: stripInlineOnlyPayloadFields(n3.payload) }) }, { tagPosition: "bodyClose", tagPriority: "high" });
        }
        if (!s3.noScripts) {
          const e7 = "head";
          n3.head.push({ script: Object.values(b5).map((t7) => ({ type: t7.module ? "module" : null, src: o5.rendererContext.buildAssetsURL(t7.file), defer: !t7.module || null, tagPosition: e7, crossorigin: "" })) });
        }
        const { headTags: w5, bodyTags: $5, bodyTagsOpen: T5, htmlAttrs: k5, bodyAttrs: v5 } = (S5 = n3.head, O5 = he2, createServerRenderer(O5)(S5)), A5 = { htmlAttrs: k5 ? [k5] : [], head: normalizeChunks([w5]), bodyAttrs: v5 ? [v5] : [], bodyPrepend: normalizeChunks([T5, n3.teleports?.body]), body: [g4.html, Te2 + ($e2 ? joinTags([n3.teleports?.[`#${Q2.id}`]]) : "") + ke2], bodyAppend: [$5] };
        var S5, O5;
        return await r4.hooks.callHook("render:html", A5, { event: e6 }), { body: renderHTMLDocument(A5), statusCode: getResponseStatus(e6), statusMessage: getResponseStatusText(e6), headers: { "content-type": "text/html;charset=utf-8", "x-powered-by": "Nuxt" } };
      })(e5, t5);
    });
    __name(normalizeChunks, "normalizeChunks");
    __name(joinTags, "joinTags");
    __name(joinAttrs, "joinAttrs");
    __name(renderHTMLDocument, "renderHTMLDocument");
    __name(stripInlineOnlyPayloadFields, "stripInlineOnlyPayloadFields");
  }
});

// ../.output-cloudflare/server/chunks/_/web-auth.mjs
import { Buffer as n2 } from "node:buffer";
function webBindings(e5) {
  var t5;
  return null == (t5 = e5.context.cloudflare) ? void 0 : t5.env;
}
function webRuntimeConfig(t5) {
  var r4, s3, n3, i4;
  const o5 = useRuntimeConfig(t5), a4 = webBindings(t5);
  return { supabaseUrl: null != (r4 = null == a4 ? void 0 : a4.NUXT_SUPABASE_URL) ? r4 : o5.supabaseUrl, supabasePublishableKey: null != (s3 = null == a4 ? void 0 : a4.NUXT_SUPABASE_PUBLISHABLE_KEY) ? s3 : o5.supabasePublishableKey, githubOauthClientId: null != (n3 = null == a4 ? void 0 : a4.NUXT_GITHUB_OAUTH_CLIENT_ID) ? n3 : o5.githubOauthClientId, webAiCompatibleOrigin: null != (i4 = null == a4 ? void 0 : a4.NUXT_WEB_AI_COMPATIBLE_ORIGIN) ? i4 : o5.webAiCompatibleOrigin };
}
function getDefaultExportFromNamespaceIfNotNamed(e5) {
  return e5 && Object.prototype.hasOwnProperty.call(e5, "default") && 1 === Object.keys(e5).length ? e5.default : e5;
}
function __extends(e5, t5) {
  if ("function" != typeof t5 && null !== t5) throw new TypeError("Class extends value " + String(t5) + " is not a constructor or null");
  function __() {
    this.constructor = e5;
  }
  __name(__, "__");
  extendStatics(e5, t5), e5.prototype = null === t5 ? Object.create(t5) : (__.prototype = t5.prototype, new __());
}
function __rest(e5, t5) {
  var r4 = {};
  for (var s3 in e5) Object.prototype.hasOwnProperty.call(e5, s3) && t5.indexOf(s3) < 0 && (r4[s3] = e5[s3]);
  if (null != e5 && "function" == typeof Object.getOwnPropertySymbols) {
    var n3 = 0;
    for (s3 = Object.getOwnPropertySymbols(e5); n3 < s3.length; n3++) t5.indexOf(s3[n3]) < 0 && Object.prototype.propertyIsEnumerable.call(e5, s3[n3]) && (r4[s3[n3]] = e5[s3[n3]]);
  }
  return r4;
}
function __decorate(e5, t5, r4, s3) {
  var n3, i4 = arguments.length, o5 = i4 < 3 ? t5 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t5, r4) : s3;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o5 = Reflect.decorate(e5, t5, r4, s3);
  else for (var a4 = e5.length - 1; a4 >= 0; a4--) (n3 = e5[a4]) && (o5 = (i4 < 3 ? n3(o5) : i4 > 3 ? n3(t5, r4, o5) : n3(t5, r4)) || o5);
  return i4 > 3 && o5 && Object.defineProperty(t5, r4, o5), o5;
}
function __param(e5, t5) {
  return function(r4, s3) {
    t5(r4, s3, e5);
  };
}
function __esDecorate(e5, t5, r4, s3, n3, i4) {
  function accept(e6) {
    if (void 0 !== e6 && "function" != typeof e6) throw new TypeError("Function expected");
    return e6;
  }
  __name(accept, "accept");
  for (var o5, a4 = s3.kind, l4 = "getter" === a4 ? "get" : "setter" === a4 ? "set" : "value", c4 = !t5 && e5 ? s3.static ? e5 : e5.prototype : null, u4 = t5 || (c4 ? Object.getOwnPropertyDescriptor(c4, s3.name) : {}), h5 = false, d5 = r4.length - 1; d5 >= 0; d5--) {
    var p4 = {};
    for (var f4 in s3) p4[f4] = "access" === f4 ? {} : s3[f4];
    for (var f4 in s3.access) p4.access[f4] = s3.access[f4];
    p4.addInitializer = function(e6) {
      if (h5) throw new TypeError("Cannot add initializers after decoration has completed");
      i4.push(accept(e6 || null));
    };
    var g4 = (0, r4[d5])("accessor" === a4 ? { get: u4.get, set: u4.set } : u4[l4], p4);
    if ("accessor" === a4) {
      if (void 0 === g4) continue;
      if (null === g4 || "object" != typeof g4) throw new TypeError("Object expected");
      (o5 = accept(g4.get)) && (u4.get = o5), (o5 = accept(g4.set)) && (u4.set = o5), (o5 = accept(g4.init)) && n3.unshift(o5);
    } else (o5 = accept(g4)) && ("field" === a4 ? n3.unshift(o5) : u4[l4] = o5);
  }
  c4 && Object.defineProperty(c4, s3.name, u4), h5 = true;
}
function __runInitializers(e5, t5, r4) {
  for (var s3 = arguments.length > 2, n3 = 0; n3 < t5.length; n3++) r4 = s3 ? t5[n3].call(e5, r4) : t5[n3].call(e5);
  return s3 ? r4 : void 0;
}
function __propKey(e5) {
  return "symbol" == typeof e5 ? e5 : "".concat(e5);
}
function __setFunctionName(e5, t5, r4) {
  return "symbol" == typeof t5 && (t5 = t5.description ? "[".concat(t5.description, "]") : ""), Object.defineProperty(e5, "name", { configurable: true, value: r4 ? "".concat(r4, " ", t5) : t5 });
}
function __metadata(e5, t5) {
  if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(e5, t5);
}
function __awaiter(e5, t5, r4, s3) {
  return new (r4 || (r4 = Promise))(function(n3, i4) {
    function fulfilled(e6) {
      try {
        step(s3.next(e6));
      } catch (e7) {
        i4(e7);
      }
    }
    __name(fulfilled, "fulfilled");
    function rejected(e6) {
      try {
        step(s3.throw(e6));
      } catch (e7) {
        i4(e7);
      }
    }
    __name(rejected, "rejected");
    function step(e6) {
      var t6;
      e6.done ? n3(e6.value) : (t6 = e6.value, t6 instanceof r4 ? t6 : new r4(function(e7) {
        e7(t6);
      })).then(fulfilled, rejected);
    }
    __name(step, "step");
    step((s3 = s3.apply(e5, t5 || [])).next());
  });
}
function __generator(e5, t5) {
  var r4, s3, n3, i4 = { label: 0, sent: /* @__PURE__ */ __name(function() {
    if (1 & n3[0]) throw n3[1];
    return n3[1];
  }, "sent"), trys: [], ops: [] }, o5 = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
  return o5.next = verb(0), o5.throw = verb(1), o5.return = verb(2), "function" == typeof Symbol && (o5[Symbol.iterator] = function() {
    return this;
  }), o5;
  function verb(a4) {
    return function(l4) {
      return (function(a5) {
        if (r4) throw new TypeError("Generator is already executing.");
        for (; o5 && (o5 = 0, a5[0] && (i4 = 0)), i4; ) try {
          if (r4 = 1, s3 && (n3 = 2 & a5[0] ? s3.return : a5[0] ? s3.throw || ((n3 = s3.return) && n3.call(s3), 0) : s3.next) && !(n3 = n3.call(s3, a5[1])).done) return n3;
          switch (s3 = 0, n3 && (a5 = [2 & a5[0], n3.value]), a5[0]) {
            case 0:
            case 1:
              n3 = a5;
              break;
            case 4:
              return i4.label++, { value: a5[1], done: false };
            case 5:
              i4.label++, s3 = a5[1], a5 = [0];
              continue;
            case 7:
              a5 = i4.ops.pop(), i4.trys.pop();
              continue;
            default:
              if (!(n3 = i4.trys, (n3 = n3.length > 0 && n3[n3.length - 1]) || 6 !== a5[0] && 2 !== a5[0])) {
                i4 = 0;
                continue;
              }
              if (3 === a5[0] && (!n3 || a5[1] > n3[0] && a5[1] < n3[3])) {
                i4.label = a5[1];
                break;
              }
              if (6 === a5[0] && i4.label < n3[1]) {
                i4.label = n3[1], n3 = a5;
                break;
              }
              if (n3 && i4.label < n3[2]) {
                i4.label = n3[2], i4.ops.push(a5);
                break;
              }
              n3[2] && i4.ops.pop(), i4.trys.pop();
              continue;
          }
          a5 = t5.call(e5, i4);
        } catch (e6) {
          a5 = [6, e6], s3 = 0;
        } finally {
          r4 = n3 = 0;
        }
        if (5 & a5[0]) throw a5[1];
        return { value: a5[0] ? a5[1] : void 0, done: true };
      })([a4, l4]);
    };
  }
  __name(verb, "verb");
}
function __exportStar(e5, t5) {
  for (var r4 in e5) "default" === r4 || Object.prototype.hasOwnProperty.call(t5, r4) || c2(t5, e5, r4);
}
function __values(e5) {
  var t5 = "function" == typeof Symbol && Symbol.iterator, r4 = t5 && e5[t5], s3 = 0;
  if (r4) return r4.call(e5);
  if (e5 && "number" == typeof e5.length) return { next: /* @__PURE__ */ __name(function() {
    return e5 && s3 >= e5.length && (e5 = void 0), { value: e5 && e5[s3++], done: !e5 };
  }, "next") };
  throw new TypeError(t5 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(e5, t5) {
  var r4 = "function" == typeof Symbol && e5[Symbol.iterator];
  if (!r4) return e5;
  var s3, n3, i4 = r4.call(e5), o5 = [];
  try {
    for (; (void 0 === t5 || t5-- > 0) && !(s3 = i4.next()).done; ) o5.push(s3.value);
  } catch (e6) {
    n3 = { error: e6 };
  } finally {
    try {
      s3 && !s3.done && (r4 = i4.return) && r4.call(i4);
    } finally {
      if (n3) throw n3.error;
    }
  }
  return o5;
}
function __spread() {
  for (var e5 = [], t5 = 0; t5 < arguments.length; t5++) e5 = e5.concat(__read(arguments[t5]));
  return e5;
}
function __spreadArrays() {
  for (var e5 = 0, t5 = 0, r4 = arguments.length; t5 < r4; t5++) e5 += arguments[t5].length;
  var s3 = Array(e5), n3 = 0;
  for (t5 = 0; t5 < r4; t5++) for (var i4 = arguments[t5], o5 = 0, a4 = i4.length; o5 < a4; o5++, n3++) s3[n3] = i4[o5];
  return s3;
}
function __spreadArray(e5, t5, r4) {
  if (r4 || 2 === arguments.length) for (var s3, n3 = 0, i4 = t5.length; n3 < i4; n3++) !s3 && n3 in t5 || (s3 || (s3 = Array.prototype.slice.call(t5, 0, n3)), s3[n3] = t5[n3]);
  return e5.concat(s3 || Array.prototype.slice.call(t5));
}
function __await(e5) {
  return this instanceof __await ? (this.v = e5, this) : new __await(e5);
}
function __asyncGenerator(e5, t5, r4) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var s3, n3 = r4.apply(e5, t5 || []), i4 = [];
  return s3 = Object.create(("function" == typeof AsyncIterator ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", function(e6) {
    return function(t6) {
      return Promise.resolve(t6).then(e6, reject);
    };
  }), s3[Symbol.asyncIterator] = function() {
    return this;
  }, s3;
  function verb(e6, t6) {
    n3[e6] && (s3[e6] = function(t7) {
      return new Promise(function(r5, s4) {
        i4.push([e6, t7, r5, s4]) > 1 || resume(e6, t7);
      });
    }, t6 && (s3[e6] = t6(s3[e6])));
  }
  __name(verb, "verb");
  function resume(e6, t6) {
    try {
      (r5 = n3[e6](t6)).value instanceof __await ? Promise.resolve(r5.value.v).then(fulfill, reject) : settle(i4[0][2], r5);
    } catch (e7) {
      settle(i4[0][3], e7);
    }
    var r5;
  }
  __name(resume, "resume");
  function fulfill(e6) {
    resume("next", e6);
  }
  __name(fulfill, "fulfill");
  function reject(e6) {
    resume("throw", e6);
  }
  __name(reject, "reject");
  function settle(e6, t6) {
    e6(t6), i4.shift(), i4.length && resume(i4[0][0], i4[0][1]);
  }
  __name(settle, "settle");
}
function __asyncDelegator(e5) {
  var t5, r4;
  return t5 = {}, verb("next"), verb("throw", function(e6) {
    throw e6;
  }), verb("return"), t5[Symbol.iterator] = function() {
    return this;
  }, t5;
  function verb(s3, n3) {
    t5[s3] = e5[s3] ? function(t6) {
      return (r4 = !r4) ? { value: __await(e5[s3](t6)), done: false } : n3 ? n3(t6) : t6;
    } : n3;
  }
  __name(verb, "verb");
}
function __asyncValues(e5) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t5, r4 = e5[Symbol.asyncIterator];
  return r4 ? r4.call(e5) : (e5 = __values(e5), t5 = {}, verb("next"), verb("throw"), verb("return"), t5[Symbol.asyncIterator] = function() {
    return this;
  }, t5);
  function verb(r5) {
    t5[r5] = e5[r5] && function(t6) {
      return new Promise(function(s3, n3) {
        (function(e6, t7, r6, s4) {
          Promise.resolve(s4).then(function(t8) {
            e6({ value: t8, done: r6 });
          }, t7);
        })(s3, n3, (t6 = e5[r5](t6)).done, t6.value);
      });
    };
  }
  __name(verb, "verb");
}
function __makeTemplateObject(e5, t5) {
  return Object.defineProperty ? Object.defineProperty(e5, "raw", { value: t5 }) : e5.raw = t5, e5;
}
function __importStar(e5) {
  if (e5 && e5.__esModule) return e5;
  var t5 = {};
  if (null != e5) for (var r4 = ownKeys$3(e5), s3 = 0; s3 < r4.length; s3++) "default" !== r4[s3] && c2(t5, e5, r4[s3]);
  return u2(t5, e5), t5;
}
function __importDefault(e5) {
  return e5 && e5.__esModule ? e5 : { default: e5 };
}
function __classPrivateFieldGet(e5, t5, r4, s3) {
  if ("a" === r4 && !s3) throw new TypeError("Private accessor was defined without a getter");
  if ("function" == typeof t5 ? e5 !== t5 || !s3 : !t5.has(e5)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return "m" === r4 ? s3 : "a" === r4 ? s3.call(e5) : s3 ? s3.value : t5.get(e5);
}
function __classPrivateFieldSet(e5, t5, r4, s3, n3) {
  if ("m" === s3) throw new TypeError("Private method is not writable");
  if ("a" === s3 && !n3) throw new TypeError("Private accessor was defined without a setter");
  if ("function" == typeof t5 ? e5 !== t5 || !n3 : !t5.has(e5)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return "a" === s3 ? n3.call(e5, r4) : n3 ? n3.value = r4 : t5.set(e5, r4), r4;
}
function __classPrivateFieldIn(e5, t5) {
  if (null === t5 || "object" != typeof t5 && "function" != typeof t5) throw new TypeError("Cannot use 'in' operator on non-object");
  return "function" == typeof e5 ? t5 === e5 : e5.has(t5);
}
function __addDisposableResource(e5, t5, r4) {
  if (null != t5) {
    if ("object" != typeof t5 && "function" != typeof t5) throw new TypeError("Object expected.");
    var s3, n3;
    if (r4) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      s3 = t5[Symbol.asyncDispose];
    }
    if (void 0 === s3) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      s3 = t5[Symbol.dispose], r4 && (n3 = s3);
    }
    if ("function" != typeof s3) throw new TypeError("Object not disposable.");
    n3 && (s3 = /* @__PURE__ */ __name(function() {
      try {
        n3.call(this);
      } catch (e6) {
        return Promise.reject(e6);
      }
    }, "s")), e5.stack.push({ value: t5, dispose: s3, async: r4 });
  } else r4 && e5.stack.push({ async: true });
  return t5;
}
function __disposeResources(e5) {
  function fail(t6) {
    e5.error = e5.hasError ? new h3(t6, e5.error, "An error was suppressed during disposal.") : t6, e5.hasError = true;
  }
  __name(fail, "fail");
  var t5, r4 = 0;
  return (/* @__PURE__ */ __name(function next() {
    for (; t5 = e5.stack.pop(); ) try {
      if (!t5.async && 1 === r4) return r4 = 0, e5.stack.push(t5), Promise.resolve().then(next);
      if (t5.dispose) {
        var s3 = t5.dispose.call(t5.value);
        if (t5.async) return r4 |= 2, Promise.resolve(s3).then(next, function(e6) {
          return fail(e6), next();
        });
      } else r4 |= 1;
    } catch (e6) {
      fail(e6);
    }
    if (1 === r4) return e5.hasError ? Promise.reject(e5.error) : Promise.resolve();
    if (e5.hasError) throw e5.error;
  }, "next"))();
}
function __rewriteRelativeImportExtension(e5, t5) {
  return "string" == typeof e5 && /^\.\.?\//.test(e5) ? e5.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(e6, r4, s3, n3, i4) {
    return r4 ? t5 ? ".jsx" : ".js" : !s3 || n3 && i4 ? s3 + n3 + "." + i4.toLowerCase() + "js" : e6;
  }) : e5;
}
function _typeof$2(e5) {
  return (_typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e6) {
    return typeof e6;
  } : function(e6) {
    return e6 && "function" == typeof Symbol && e6.constructor === Symbol && e6 !== Symbol.prototype ? "symbol" : typeof e6;
  })(e5);
}
function toPropertyKey$2(e5) {
  var t5 = (function(e6, t6) {
    if ("object" != _typeof$2(e6) || !e6) return e6;
    var r4 = e6[Symbol.toPrimitive];
    if (void 0 !== r4) {
      var s3 = r4.call(e6, t6);
      if ("object" != _typeof$2(s3)) return s3;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === t6 ? String : Number)(e6);
  })(e5, "string");
  return "symbol" == _typeof$2(t5) ? t5 : t5 + "";
}
function _defineProperty$2(e5, t5, r4) {
  return (t5 = toPropertyKey$2(t5)) in e5 ? Object.defineProperty(e5, t5, { value: r4, enumerable: true, configurable: true, writable: true }) : e5[t5] = r4, e5;
}
function ownKeys$2(e5, t5) {
  var r4 = Object.keys(e5);
  if (Object.getOwnPropertySymbols) {
    var s3 = Object.getOwnPropertySymbols(e5);
    t5 && (s3 = s3.filter(function(t6) {
      return Object.getOwnPropertyDescriptor(e5, t6).enumerable;
    })), r4.push.apply(r4, s3);
  }
  return r4;
}
function _objectSpread2$2(e5) {
  for (var t5 = 1; t5 < arguments.length; t5++) {
    var r4 = null != arguments[t5] ? arguments[t5] : {};
    t5 % 2 ? ownKeys$2(Object(r4), true).forEach(function(t6) {
      _defineProperty$2(e5, t6, r4[t6]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e5, Object.getOwnPropertyDescriptors(r4)) : ownKeys$2(Object(r4)).forEach(function(t6) {
      Object.defineProperty(e5, t6, Object.getOwnPropertyDescriptor(r4, t6));
    });
  }
  return e5;
}
function sleep(e5, t5) {
  return new Promise((r4) => {
    if (null == t5 ? void 0 : t5.aborted) return void r4();
    const s3 = setTimeout(() => {
      null == t5 || t5.removeEventListener("abort", onAbort), r4();
    }, e5);
    function onAbort() {
      clearTimeout(s3), r4();
    }
    __name(onAbort, "onAbort");
    null == t5 || t5.addEventListener("abort", onAbort);
  });
}
function shouldRetry(e5, t5, r4, s3) {
  return !(!s3 || r4 >= 3) && (!!v3.includes(e5) && !!w3.includes(t5));
}
function requireWebsocketFactory() {
  if (T3) return j3;
  T3 = 1, Object.defineProperty(j3, "__esModule", { value: true }), j3.WebSocketFactory = void 0;
  class WebSocketFactory {
    static {
      __name(this, "WebSocketFactory");
    }
    constructor() {
    }
    static detectEnvironment() {
      var e5;
      if ("undefined" != typeof WebSocket) return { type: "native", wsConstructor: WebSocket };
      const t5 = globalThis;
      if ("undefined" != typeof globalThis && void 0 !== t5.WebSocket) return { type: "native", wsConstructor: t5.WebSocket };
      const r4 = void 0 !== o3 ? o3 : void 0;
      if (r4 && void 0 !== r4.WebSocket) return { type: "native", wsConstructor: r4.WebSocket };
      if ("undefined" != typeof globalThis && void 0 !== t5.WebSocketPair && void 0 === globalThis.WebSocket) return { type: "cloudflare", error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.", workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime." };
      if ("undefined" != typeof globalThis && t5.EdgeRuntime || "undefined" != typeof navigator && (null === (e5 = "Cloudflare-Workers") || void 0 === e5 ? void 0 : e5.includes("Vercel-Edge"))) return { type: "unsupported", error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.", workaround: "Use serverless functions or a different deployment target for WebSocket functionality." };
      const s3 = globalThis.process;
      if (s3) {
        const e6 = s3.versions;
        if (e6 && e6.node) return { type: "unsupported", error: "Node.js detected but native WebSocket not found.", workaround: "Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option." };
      }
      return { type: "unsupported", error: "Unknown JavaScript runtime without WebSocket support.", workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation." };
    }
    static getWebSocketConstructor() {
      const e5 = this.detectEnvironment();
      if (e5.wsConstructor) return e5.wsConstructor;
      let t5 = e5.error || "WebSocket not supported in this environment.";
      throw e5.workaround && (t5 += `

Suggested solution: ${e5.workaround}`), new Error(t5);
    }
    static isWebSocketSupported() {
      try {
        return "native" === this.detectEnvironment().type;
      } catch (e5) {
        return false;
      }
    }
  }
  return j3.WebSocketFactory = WebSocketFactory, j3.default = WebSocketFactory, j3;
}
function requireVersion$1() {
  return N3 || (N3 = 1, Object.defineProperty(U3, "__esModule", { value: true }), U3.version = void 0, U3.version = "2.112.3"), U3;
}
function requireConstants$1() {
  return $3 || ($3 = 1, (function(e5) {
    Object.defineProperty(e5, "__esModule", { value: true }), e5.CONNECTION_STATE = e5.TRANSPORTS = e5.CHANNEL_EVENTS = e5.CHANNEL_STATES = e5.SOCKET_STATES = e5.MAX_PUSH_BUFFER_SIZE = e5.WS_CLOSE_NORMAL = e5.DEFAULT_TIMEOUT = e5.VERSION = e5.DEFAULT_VSN = e5.VSN_2_0_0 = e5.VSN_1_0_0 = e5.DEFAULT_VERSION = void 0;
    const t5 = requireVersion$1();
    e5.DEFAULT_VERSION = `realtime-js/${t5.version}`, e5.VSN_1_0_0 = "1.0.0", e5.VSN_2_0_0 = "2.0.0", e5.DEFAULT_VSN = e5.VSN_2_0_0, e5.VERSION = t5.version, e5.DEFAULT_TIMEOUT = 1e4, e5.WS_CLOSE_NORMAL = 1e3, e5.MAX_PUSH_BUFFER_SIZE = 100, e5.SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 }, e5.CHANNEL_STATES = { closed: "closed", errored: "errored", joined: "joined", joining: "joining", leaving: "leaving" }, e5.CHANNEL_EVENTS = { close: "phx_close", error: "phx_error", join: "phx_join", reply: "phx_reply", leave: "phx_leave", access_token: "access_token" }, e5.TRANSPORTS = { websocket: "websocket" }, e5.CONNECTION_STATE = { connecting: "connecting", open: "open", closing: "closing", closed: "closed" };
  })(L3)), L3;
}
function requireSerializer() {
  if (x3) return D3;
  x3 = 1, Object.defineProperty(D3, "__esModule", { value: true });
  return D3.default = class {
    constructor(e5) {
      this.HEADER_LENGTH = 1, this.USER_BROADCAST_PUSH_META_LENGTH = 6, this.KINDS = { userBroadcastPush: 3, userBroadcast: 4 }, this.BINARY_ENCODING = 0, this.JSON_ENCODING = 1, this.BROADCAST_EVENT = "broadcast", this.allowedMetadataKeys = [], this.allowedMetadataKeys = null != e5 ? e5 : [];
    }
    encode(e5, t5) {
      if (e5.event === this.BROADCAST_EVENT && !(e5.payload instanceof ArrayBuffer) && "string" == typeof e5.payload.event) return t5(this._binaryEncodeUserBroadcastPush(e5));
      let r4 = [e5.join_ref, e5.ref, e5.topic, e5.event, e5.payload];
      return t5(JSON.stringify(r4));
    }
    _binaryEncodeUserBroadcastPush(e5) {
      var t5;
      return this._isArrayBuffer(null === (t5 = e5.payload) || void 0 === t5 ? void 0 : t5.payload) ? this._encodeBinaryUserBroadcastPush(e5) : this._encodeJsonUserBroadcastPush(e5);
    }
    _encodeBinaryUserBroadcastPush(e5) {
      var t5, r4;
      const s3 = null !== (r4 = null === (t5 = e5.payload) || void 0 === t5 ? void 0 : t5.payload) && void 0 !== r4 ? r4 : new ArrayBuffer(0);
      return this._encodeUserBroadcastPush(e5, this.BINARY_ENCODING, s3);
    }
    _encodeJsonUserBroadcastPush(e5) {
      var t5, r4;
      const s3 = null !== (r4 = null === (t5 = e5.payload) || void 0 === t5 ? void 0 : t5.payload) && void 0 !== r4 ? r4 : {}, n3 = new TextEncoder().encode(JSON.stringify(s3)).buffer;
      return this._encodeUserBroadcastPush(e5, this.JSON_ENCODING, n3);
    }
    _encodeUserBroadcastPush(e5, t5, r4) {
      var s3, n3;
      const i4 = new TextEncoder(), o5 = i4.encode(e5.topic), a4 = i4.encode(null !== (s3 = e5.ref) && void 0 !== s3 ? s3 : ""), l4 = i4.encode(null !== (n3 = e5.join_ref) && void 0 !== n3 ? n3 : ""), c4 = i4.encode(e5.payload.event), u4 = this.allowedMetadataKeys ? this._pick(e5.payload, this.allowedMetadataKeys) : {}, h5 = i4.encode(0 === Object.keys(u4).length ? "" : JSON.stringify(u4));
      if (l4.length > 255) throw new Error(`joinRef length ${l4.length} exceeds maximum of 255`);
      if (a4.length > 255) throw new Error(`ref length ${a4.length} exceeds maximum of 255`);
      if (o5.length > 255) throw new Error(`topic length ${o5.length} exceeds maximum of 255`);
      if (c4.length > 255) throw new Error(`userEvent length ${c4.length} exceeds maximum of 255`);
      if (h5.length > 255) throw new Error(`metadata length ${h5.length} exceeds maximum of 255`);
      const d5 = this.USER_BROADCAST_PUSH_META_LENGTH + l4.length + a4.length + o5.length + c4.length + h5.length, p4 = new ArrayBuffer(this.HEADER_LENGTH + d5), f4 = new DataView(p4), g4 = new Uint8Array(p4);
      let _5 = 0;
      f4.setUint8(_5++, this.KINDS.userBroadcastPush), f4.setUint8(_5++, l4.length), f4.setUint8(_5++, a4.length), f4.setUint8(_5++, o5.length), f4.setUint8(_5++, c4.length), f4.setUint8(_5++, h5.length), f4.setUint8(_5++, t5), g4.set(l4, _5), _5 += l4.length, g4.set(a4, _5), _5 += a4.length, g4.set(o5, _5), _5 += o5.length, g4.set(c4, _5), _5 += c4.length, g4.set(h5, _5), _5 += h5.length;
      var y5 = new Uint8Array(p4.byteLength + r4.byteLength);
      return y5.set(new Uint8Array(p4), 0), y5.set(new Uint8Array(r4), p4.byteLength), y5.buffer;
    }
    decode(e5, t5) {
      if (this._isArrayBuffer(e5)) {
        return t5(this._binaryDecode(e5));
      }
      if ("string" == typeof e5) {
        const r4 = JSON.parse(e5), [s3, n3, i4, o5, a4] = r4;
        return t5({ join_ref: s3, ref: n3, topic: i4, event: o5, payload: a4 });
      }
      return t5({});
    }
    _binaryDecode(e5) {
      const t5 = new DataView(e5), r4 = t5.getUint8(0), s3 = new TextDecoder();
      if (r4 === this.KINDS.userBroadcast) return this._decodeUserBroadcast(e5, t5, s3);
    }
    _decodeUserBroadcast(e5, t5, r4) {
      const s3 = t5.getUint8(1), n3 = t5.getUint8(2), i4 = t5.getUint8(3), o5 = t5.getUint8(4);
      let a4 = this.HEADER_LENGTH + 4;
      const l4 = r4.decode(e5.slice(a4, a4 + s3));
      a4 += s3;
      const c4 = r4.decode(e5.slice(a4, a4 + n3));
      a4 += n3;
      const u4 = r4.decode(e5.slice(a4, a4 + i4));
      a4 += i4;
      const h5 = e5.slice(a4, e5.byteLength), d5 = o5 === this.JSON_ENCODING ? JSON.parse(r4.decode(h5)) : h5, p4 = { type: this.BROADCAST_EVENT, event: c4, payload: d5 };
      return i4 > 0 && (p4.meta = JSON.parse(u4)), { join_ref: null, ref: null, topic: l4, event: this.BROADCAST_EVENT, payload: p4 };
    }
    _isArrayBuffer(e5) {
      var t5;
      return e5 instanceof ArrayBuffer || "ArrayBuffer" === (null === (t5 = null == e5 ? void 0 : e5.constructor) || void 0 === t5 ? void 0 : t5.name);
    }
    _pick(e5, t5) {
      return e5 && "object" == typeof e5 ? Object.fromEntries(Object.entries(e5).filter(([e6]) => t5.includes(e6))) : {};
    }
  }, D3;
}
function requireTransformers() {
  return q3 || (q3 = 1, (function(e5) {
    var t5;
    Object.defineProperty(e5, "__esModule", { value: true }), e5.httpEndpointURL = e5.toTimestampString = e5.toArray = e5.toJson = e5.toNumber = e5.toBoolean = e5.convertCell = e5.convertColumn = e5.convertChangeData = e5.PostgresTypes = void 0, (function(e6) {
      e6.abstime = "abstime", e6.bool = "bool", e6.date = "date", e6.daterange = "daterange", e6.float4 = "float4", e6.float8 = "float8", e6.int2 = "int2", e6.int4 = "int4", e6.int4range = "int4range", e6.int8 = "int8", e6.int8range = "int8range", e6.json = "json", e6.jsonb = "jsonb", e6.money = "money", e6.numeric = "numeric", e6.oid = "oid", e6.reltime = "reltime", e6.text = "text", e6.time = "time", e6.timestamp = "timestamp", e6.timestamptz = "timestamptz", e6.timetz = "timetz", e6.tsrange = "tsrange", e6.tstzrange = "tstzrange";
    })(t5 || (e5.PostgresTypes = t5 = {}));
    e5.convertChangeData = (t6, r4, s3 = {}) => {
      var n3;
      const i4 = null !== (n3 = s3.skipTypes) && void 0 !== n3 ? n3 : [];
      return r4 ? Object.keys(r4).reduce((s4, n4) => (s4[n4] = (0, e5.convertColumn)(n4, t6, r4, i4), s4), {}) : {};
    };
    e5.convertColumn = (t6, r4, s3, n3) => {
      const i4 = r4.find((e6) => e6.name === t6), o5 = null == i4 ? void 0 : i4.type, a4 = s3[t6];
      return o5 && !n3.includes(o5) ? (0, e5.convertCell)(o5, a4) : noop(a4);
    };
    e5.convertCell = (r4, s3) => {
      if ("_" === r4.charAt(0)) {
        const t6 = r4.slice(1, r4.length);
        return (0, e5.toArray)(s3, t6);
      }
      switch (r4) {
        case t5.bool:
          return (0, e5.toBoolean)(s3);
        case t5.float4:
        case t5.float8:
        case t5.int2:
        case t5.int4:
        case t5.int8:
        case t5.numeric:
        case t5.oid:
          return (0, e5.toNumber)(s3);
        case t5.json:
        case t5.jsonb:
          return (0, e5.toJson)(s3);
        case t5.timestamp:
          return (0, e5.toTimestampString)(s3);
        case t5.abstime:
        case t5.date:
        case t5.daterange:
        case t5.int4range:
        case t5.int8range:
        case t5.money:
        case t5.reltime:
        case t5.text:
        case t5.time:
        case t5.timestamptz:
        case t5.timetz:
        case t5.tsrange:
        case t5.tstzrange:
        default:
          return noop(s3);
      }
    };
    const noop = /* @__PURE__ */ __name((e6) => e6, "noop");
    e5.toBoolean = (e6) => {
      switch (e6) {
        case "t":
          return true;
        case "f":
          return false;
        default:
          return e6;
      }
    };
    e5.toNumber = (e6) => {
      if ("string" == typeof e6) {
        const t6 = parseFloat(e6);
        if (!Number.isNaN(t6)) return t6;
      }
      return e6;
    };
    e5.toJson = (e6) => {
      if ("string" == typeof e6) try {
        return JSON.parse(e6);
      } catch (t6) {
        return e6;
      }
      return e6;
    };
    e5.toArray = (t6, r4) => {
      if ("string" != typeof t6) return t6;
      const s3 = t6.length - 1, n3 = t6[s3];
      if ("{" === t6[0] && "}" === n3) {
        let n4;
        const i4 = t6.slice(1, s3);
        try {
          n4 = JSON.parse("[" + i4 + "]");
        } catch (e6) {
          n4 = i4 ? i4.split(",") : [];
        }
        return n4.map((t7) => (0, e5.convertCell)(r4, t7));
      }
      return t6;
    };
    e5.toTimestampString = (e6) => "string" == typeof e6 ? e6.replace(" ", "T") : e6;
    e5.httpEndpointURL = (e6) => {
      const t6 = new URL(e6);
      return t6.protocol = t6.protocol.replace(/^ws/i, "http"), t6.pathname = t6.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, ""), "" === t6.pathname || "/" === t6.pathname ? t6.pathname = "/api/broadcast" : t6.pathname = t6.pathname + "/api/broadcast", t6.href;
    };
  })(F3)), F3;
}
function requirePresenceAdapter() {
  if (_e3) return K3;
  _e3 = 1, Object.defineProperty(K3, "__esModule", { value: true });
  const e5 = ge3;
  class PresenceAdapter {
    static {
      __name(this, "PresenceAdapter");
    }
    constructor(t5, r4) {
      const s3 = (function(e6) {
        return (null == e6 ? void 0 : e6.events) && { events: e6.events };
      })(r4);
      this.presence = new e5.Presence(t5.getChannel(), s3), this.presence.onJoin((e6, r5, s4) => {
        const n3 = PresenceAdapter.onJoinPayload(e6, r5, s4);
        t5.getChannel().trigger("presence", n3);
      }), this.presence.onLeave((e6, r5, s4) => {
        const n3 = PresenceAdapter.onLeavePayload(e6, r5, s4);
        t5.getChannel().trigger("presence", n3);
      }), this.presence.onSync(() => {
        t5.getChannel().trigger("presence", { event: "sync" });
      });
    }
    get state() {
      return PresenceAdapter.transformState(this.presence.state);
    }
    static transformState(e6) {
      return e6 = (function(e7) {
        return JSON.parse(JSON.stringify(e7));
      })(e6), Object.getOwnPropertyNames(e6).reduce((t5, r4) => {
        const s3 = e6[r4];
        return t5[r4] = transformState(s3), t5;
      }, {});
    }
    static onJoinPayload(e6, t5, r4) {
      return { event: "join", key: e6, currentPresences: parseCurrentPresences(t5), newPresences: transformState(r4) };
    }
    static onLeavePayload(e6, t5, r4) {
      return { event: "leave", key: e6, currentPresences: parseCurrentPresences(t5), leftPresences: transformState(r4) };
    }
  }
  function transformState(e6) {
    return e6.metas.map((e7) => {
      const t5 = Object.getOwnPropertyDescriptors(e7), r4 = Object.defineProperties({}, t5);
      return r4.presence_ref = r4.phx_ref, delete r4.phx_ref, delete r4.phx_ref_prev, r4;
    });
  }
  __name(transformState, "transformState");
  function parseCurrentPresences(e6) {
    return (null == e6 ? void 0 : e6.metas) ? transformState(e6) : [];
  }
  __name(parseCurrentPresences, "parseCurrentPresences");
  return K3.default = PresenceAdapter, K3;
}
function requireRealtimePresence() {
  if (ye3) return M3;
  ye3 = 1, Object.defineProperty(M3, "__esModule", { value: true }), M3.REALTIME_PRESENCE_LISTEN_EVENTS = void 0;
  const e5 = p2.__importDefault(requirePresenceAdapter());
  var t5;
  !(function(e6) {
    e6.SYNC = "sync", e6.JOIN = "join", e6.LEAVE = "leave";
  })(t5 || (M3.REALTIME_PRESENCE_LISTEN_EVENTS = t5 = {}));
  return M3.default = class {
    get state() {
      return this.presenceAdapter.state;
    }
    constructor(t6, r4) {
      this.channel = t6, this.presenceAdapter = new e5.default(this.channel.channelAdapter, r4);
    }
  }, M3;
}
function requireNormalizeChannelError() {
  if (me3) return be3;
  return me3 = 1, Object.defineProperty(be3, "__esModule", { value: true }), be3.normalizeChannelError = function(e5) {
    if (e5 instanceof Error) return e5;
    if ("string" == typeof e5) return new Error(e5);
    if (e5 && "object" == typeof e5) {
      const t5 = e5;
      if ("number" == typeof t5.code) {
        const r4 = "string" == typeof t5.reason && t5.reason ? ` (${t5.reason})` : "";
        return new Error(`socket closed: ${t5.code}${r4}`, { cause: e5 });
      }
      return new Error("channel error: transport failure", { cause: e5 });
    }
    return new Error("channel error: connection lost");
  }, be3;
}
function requireChannelAdapter() {
  if (we3) return ve3;
  we3 = 1, Object.defineProperty(ve3, "__esModule", { value: true });
  const e5 = requireConstants$1();
  return ve3.default = class {
    constructor(e6, t5, r4) {
      const s3 = (n3 = r4, { config: Object.assign({ broadcast: { ack: false, self: false }, presence: { key: "", enabled: false }, private: false }, n3.config) });
      var n3;
      this.channel = e6.getSocket().channel(t5, s3), this.socket = e6;
    }
    get state() {
      return this.channel.state;
    }
    set state(e6) {
      this.channel.state = e6;
    }
    get joinedOnce() {
      return this.channel.joinedOnce;
    }
    get joinPush() {
      return this.channel.joinPush;
    }
    get rejoinTimer() {
      return this.channel.rejoinTimer;
    }
    on(e6, t5) {
      return this.channel.on(e6, t5);
    }
    off(e6, t5) {
      this.channel.off(e6, t5);
    }
    subscribe(e6) {
      return this.channel.join(e6);
    }
    unsubscribe(e6) {
      return this.channel.leave(e6);
    }
    teardown() {
      this.channel.teardown();
    }
    onClose(e6) {
      this.channel.onClose(e6);
    }
    onError(e6) {
      return this.channel.onError(e6);
    }
    push(t5, r4, s3) {
      let n3;
      try {
        n3 = this.channel.push(t5, r4, s3);
      } catch (e6) {
        throw new Error(`tried to push '${t5}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`);
      }
      if (this.channel.pushBuffer.length > e5.MAX_PUSH_BUFFER_SIZE) {
        const e6 = this.channel.pushBuffer.shift();
        e6.cancelTimeout(), this.socket.log("channel", `discarded push due to buffer overflow: ${e6.event}`, e6.payload());
      }
      return n3;
    }
    updateJoinPayload(e6) {
      const t5 = this.channel.joinPush.payload();
      this.channel.joinPush.payload = () => Object.assign(Object.assign({}, t5), e6);
    }
    canPush() {
      return this.socket.isConnected() && this.state === e5.CHANNEL_STATES.joined;
    }
    isJoined() {
      return this.state === e5.CHANNEL_STATES.joined;
    }
    isJoining() {
      return this.state === e5.CHANNEL_STATES.joining;
    }
    isClosed() {
      return this.state === e5.CHANNEL_STATES.closed;
    }
    isLeaving() {
      return this.state === e5.CHANNEL_STATES.leaving;
    }
    updateFilterBindings(e6) {
      this.channel.filterBindings = e6;
    }
    updatePayloadTransform(e6) {
      this.channel.onMessage = e6;
    }
    getChannel() {
      return this.channel;
    }
  }, ve3;
}
function requireRealtimePostgresFilterBuilder() {
  if (Ee2) return Ae3;
  Ee2 = 1, Object.defineProperty(Ae3, "__esModule", { value: true }), Ae3.postgresChangesFilter = Ae3.RealtimePostgresFilterBuilder = void 0;
  const e5 = /[,()"\\]/, serializeScalar = /* @__PURE__ */ __name((t6) => {
    const r4 = null === t6 ? "null" : String(t6);
    return ((t7) => e5.test(t7) || t7 !== t7.trim())(r4) ? ((e6) => `"${e6.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`)(r4) : r4;
  }, "serializeScalar"), serialize = /* @__PURE__ */ __name((e6, t6) => {
    if ("in" === e6) {
      const e7 = Array.isArray(t6) ? t6 : [t6];
      if (0 === e7.length) throw new Error("Realtime `in` filter requires at least one value.");
      return `in.(${Array.from(new Set(e7)).map((e8) => serializeScalar(e8)).join(",")})`;
    }
    return "is" === e6 ? `is.${((e7) => null === e7 ? "null" : String(e7))(t6)}` : `${e6}.${serializeScalar(t6)}`;
  }, "serialize");
  let t5 = class {
    static {
      __name(this, "t");
    }
    constructor() {
      this.filters = [];
    }
    add(e6, t6, r4, s3 = false) {
      const n3 = s3 ? "not." : "";
      return this.filters.push(`${e6}=${n3}${serialize(t6, r4)}`), this;
    }
    eq(e6, t6) {
      return this.add(e6, "eq", t6);
    }
    neq(e6, t6) {
      return this.add(e6, "neq", t6);
    }
    gt(e6, t6) {
      return this.add(e6, "gt", t6);
    }
    gte(e6, t6) {
      return this.add(e6, "gte", t6);
    }
    lt(e6, t6) {
      return this.add(e6, "lt", t6);
    }
    lte(e6, t6) {
      return this.add(e6, "lte", t6);
    }
    in(e6, t6) {
      return this.add(e6, "in", t6);
    }
    like(e6, t6) {
      return this.add(e6, "like", t6);
    }
    ilike(e6, t6) {
      return this.add(e6, "ilike", t6);
    }
    match(e6, t6) {
      return this.add(e6, "match", t6);
    }
    imatch(e6, t6) {
      return this.add(e6, "imatch", t6);
    }
    is(e6, t6) {
      return this.add(e6, "is", t6);
    }
    isDistinct(e6, t6) {
      return this.add(e6, "isdistinct", t6);
    }
    not(e6, t6, r4) {
      return this.add(e6, t6, r4, true);
    }
    build() {
      return this.filters.join(",");
    }
    toString() {
      return this.build();
    }
  };
  Ae3.RealtimePostgresFilterBuilder = t5;
  return Ae3.postgresChangesFilter = () => new t5(), Ae3;
}
function requireRealtimeChannel() {
  return Se2 || (Se2 = 1, (function(e5) {
    Object.defineProperty(e5, "__esModule", { value: true }), e5.REALTIME_CHANNEL_STATES = e5.REALTIME_SUBSCRIBE_STATES = e5.REALTIME_LISTEN_TYPES = e5.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = e5.postgresChangesFilter = e5.RealtimePostgresFilterBuilder = void 0;
    const t5 = p2, r4 = requireConstants$1(), s3 = t5.__importDefault(requireRealtimePresence()), n3 = t5.__importStar(requireTransformers()), i4 = requireTransformers(), o5 = requireNormalizeChannelError(), a4 = t5.__importDefault(requireChannelAdapter()), l4 = requireRealtimePostgresFilterBuilder();
    var c4, u4, h5, d5 = requireRealtimePostgresFilterBuilder();
    Object.defineProperty(e5, "RealtimePostgresFilterBuilder", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return d5.RealtimePostgresFilterBuilder;
    }, "get") }), Object.defineProperty(e5, "postgresChangesFilter", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return d5.postgresChangesFilter;
    }, "get") }), (function(e6) {
      e6.ALL = "*", e6.INSERT = "INSERT", e6.UPDATE = "UPDATE", e6.DELETE = "DELETE";
    })(c4 || (e5.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = c4 = {})), (function(e6) {
      e6.BROADCAST = "broadcast", e6.PRESENCE = "presence", e6.POSTGRES_CHANGES = "postgres_changes", e6.SYSTEM = "system";
    })(u4 || (e5.REALTIME_LISTEN_TYPES = u4 = {})), (function(e6) {
      e6.SUBSCRIBED = "SUBSCRIBED", e6.TIMED_OUT = "TIMED_OUT", e6.CLOSED = "CLOSED", e6.CHANNEL_ERROR = "CHANNEL_ERROR";
    })(h5 || (e5.REALTIME_SUBSCRIBE_STATES = h5 = {})), e5.REALTIME_CHANNEL_STATES = r4.CHANNEL_STATES;
    class RealtimeChannel {
      static {
        __name(this, "RealtimeChannel");
      }
      get state() {
        return this.channelAdapter.state;
      }
      set state(e6) {
        this.channelAdapter.state = e6;
      }
      get joinedOnce() {
        return this.channelAdapter.joinedOnce;
      }
      get timeout() {
        return this.socket.timeout;
      }
      get joinPush() {
        return this.channelAdapter.joinPush;
      }
      get rejoinTimer() {
        return this.channelAdapter.rejoinTimer;
      }
      constructor(e6, t6 = { config: {} }, r5) {
        var n4, o6;
        if (this.topic = e6, this.params = t6, this.socket = r5, this.bindings = {}, this.subTopic = e6.replace(/^realtime:/i, ""), this.params.config = Object.assign({ broadcast: { ack: false, self: false }, presence: { key: "", enabled: false }, private: false }, t6.config), this.channelAdapter = new a4.default(this.socket.socketAdapter, e6, this.params), this.presence = new s3.default(this), this._onClose(() => {
          this.socket._remove(this);
        }), this._updateFilterTransform(), this.broadcastEndpointURL = (0, i4.httpEndpointURL)(this.socket.socketAdapter.endPointURL()), this.private = this.params.config.private || false, !this.private && (null === (o6 = null === (n4 = this.params.config) || void 0 === n4 ? void 0 : n4.broadcast) || void 0 === o6 ? void 0 : o6.replay)) throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`);
      }
      subscribe(e6, t6 = this.timeout) {
        var s4, n4, i5;
        if (this.socket.isConnected() || this.socket.connect(), this.channelAdapter.isClosed()) {
          const { config: { broadcast: a5, presence: l5, private: c5 } } = this.params, d6 = null !== (n4 = null === (s4 = this.bindings.postgres_changes) || void 0 === s4 ? void 0 : s4.map((e7) => e7.filter)) && void 0 !== n4 ? n4 : [], p4 = !!this.bindings[u4.PRESENCE] && this.bindings[u4.PRESENCE].length > 0 || true === (null === (i5 = this.params.config.presence) || void 0 === i5 ? void 0 : i5.enabled), f4 = {}, g4 = { broadcast: a5, presence: Object.assign(Object.assign({}, l5), { enabled: p4 }), postgres_changes: d6, private: c5 };
          this.socket.accessTokenValue && (f4.access_token = this.socket.accessTokenValue), this._onError((t7) => {
            null == e6 || e6(h5.CHANNEL_ERROR, (0, o5.normalizeChannelError)(t7));
          }), this._onClose(() => null == e6 ? void 0 : e6(h5.CLOSED)), this.updateJoinPayload(Object.assign({ config: g4 }, f4)), this._updateFilterMessage(), this.channelAdapter.subscribe(t6).receive("ok", async ({ postgres_changes: t7 }) => {
            this.socket._isManualToken() || this.socket.setAuth(), void 0 !== t7 ? this._updatePostgresBindings(t7, e6) : null == e6 || e6(h5.SUBSCRIBED);
          }).receive("error", (t7) => {
            this.state = r4.CHANNEL_STATES.errored;
            const s5 = Object.values(t7).join(", ") || "error";
            null == e6 || e6(h5.CHANNEL_ERROR, new Error(s5, { cause: t7 }));
          }).receive("timeout", () => {
            null == e6 || e6(h5.TIMED_OUT);
          });
        }
        return this;
      }
      _updatePostgresBindings(e6, t6) {
        var s4;
        const n4 = this.bindings.postgres_changes, i5 = null !== (s4 = null == n4 ? void 0 : n4.length) && void 0 !== s4 ? s4 : 0, o6 = [];
        for (let s5 = 0; s5 < i5; s5++) {
          const i6 = n4[s5], { filter: { event: a5, schema: l5, table: c5, filter: u5 } } = i6, d6 = e6 && e6[s5];
          if (!(d6 && d6.event === a5 && RealtimeChannel.isFilterValueEqual(d6.schema, l5) && RealtimeChannel.isFilterValueEqual(d6.table, c5) && RealtimeChannel.isFilterValueEqual(d6.filter, u5))) return this.unsubscribe(), this.state = r4.CHANNEL_STATES.errored, void (null == t6 || t6(h5.CHANNEL_ERROR, new Error("mismatch between server and client bindings for postgres changes")));
          o6.push(Object.assign(Object.assign({}, i6), { id: d6.id }));
        }
        this.bindings.postgres_changes = o6, this.state != r4.CHANNEL_STATES.errored && t6 && t6(h5.SUBSCRIBED);
      }
      presenceState() {
        return this.presence.state;
      }
      async track(e6, t6 = {}) {
        return await this.send({ type: "presence", event: "track", payload: e6 }, t6);
      }
      async untrack(e6 = {}) {
        return await this.send({ type: "presence", event: "untrack" }, e6);
      }
      on(e6, t6, r5) {
        const s4 = this.channelAdapter.isJoined() || this.channelAdapter.isJoining(), n4 = e6 === u4.PRESENCE || e6 === u4.POSTGRES_CHANGES;
        if (s4 && n4) throw this.socket.log("channel", `cannot add \`${e6}\` callbacks for ${this.topic} after \`subscribe()\`.`), new Error(`cannot add \`${e6}\` callbacks for ${this.topic} after \`subscribe()\`.`);
        return this._on(e6, t6, r5);
      }
      async httpSend(e6, t6, r5 = {}) {
        var s4;
        if (null == t6) return Promise.reject(new Error("Payload is required for httpSend()"));
        const n4 = t6 instanceof ArrayBuffer || ArrayBuffer.isView(t6), i5 = { apikey: this.socket.apiKey ? this.socket.apiKey : "", "Content-Type": n4 ? "application/octet-stream" : "application/json" };
        this.socket.accessTokenValue && (i5.Authorization = `Bearer ${this.socket.accessTokenValue}`);
        const o6 = new URL(this.broadcastEndpointURL);
        o6.pathname += `/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e6)}`, this.private && o6.searchParams.set("private", "true");
        const a5 = { method: "POST", headers: i5, body: n4 ? t6 : JSON.stringify(t6) }, l5 = await this._fetchWithTimeout(o6.toString(), a5, null !== (s4 = r5.timeout) && void 0 !== s4 ? s4 : this.timeout);
        if (202 === l5.status) return { success: true };
        if (404 === l5.status) return Promise.reject(new Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));
        let c5 = l5.statusText;
        try {
          const e7 = await l5.json();
          c5 = e7.error || e7.message || c5;
        } catch (e7) {
        }
        return Promise.reject(new Error(c5));
      }
      async send(e6, t6 = {}) {
        var r5, s4;
        if (this.channelAdapter.canPush() || "broadcast" !== e6.type) return new Promise((r6) => {
          var s5, n4, i5;
          const o6 = this.channelAdapter.push(e6.type, e6, t6.timeout || this.timeout);
          "broadcast" !== e6.type || (null === (i5 = null === (n4 = null === (s5 = this.params) || void 0 === s5 ? void 0 : s5.config) || void 0 === n4 ? void 0 : n4.broadcast) || void 0 === i5 ? void 0 : i5.ack) || r6("ok"), o6.receive("ok", () => r6("ok")), o6.receive("error", () => r6("error")), o6.receive("timeout", () => r6("timed out"));
        });
        {
          console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");
          const { event: n4, payload: i5 } = e6, o6 = { apikey: this.socket.apiKey ? this.socket.apiKey : "", "Content-Type": "application/json" };
          this.socket.accessTokenValue && (o6.Authorization = `Bearer ${this.socket.accessTokenValue}`);
          const a5 = { method: "POST", headers: o6, body: JSON.stringify({ messages: [{ topic: this.subTopic, event: n4, payload: i5, private: this.private }] }) };
          try {
            const e7 = await this._fetchWithTimeout(this.broadcastEndpointURL, a5, null !== (r5 = t6.timeout) && void 0 !== r5 ? r5 : this.timeout);
            return await (null === (s4 = e7.body) || void 0 === s4 ? void 0 : s4.cancel()), e7.ok ? "ok" : "error";
          } catch (e7) {
            return e7 instanceof Error && "AbortError" === e7.name ? "timed out" : "error";
          }
        }
      }
      updateJoinPayload(e6) {
        this.channelAdapter.updateJoinPayload(e6);
      }
      async unsubscribe(e6 = this.timeout) {
        return new Promise((t6) => {
          this.channelAdapter.unsubscribe(e6).receive("ok", () => t6("ok")).receive("timeout", () => t6("timed out")).receive("error", () => t6("error"));
        });
      }
      teardown() {
        this.channelAdapter.teardown();
      }
      async _fetchWithTimeout(e6, t6, r5) {
        const s4 = new AbortController(), n4 = setTimeout(() => s4.abort(), r5), i5 = await this.socket.fetch(e6, Object.assign(Object.assign({}, t6), { signal: s4.signal }));
        return clearTimeout(n4), i5;
      }
      _on(e6, t6, r5) {
        var s4;
        const n4 = e6.toLocaleLowerCase(), i5 = null == t6 ? void 0 : t6.filter;
        if ((i5 instanceof l4.RealtimePostgresFilterBuilder || "object" == typeof i5 && null !== i5 && "function" == typeof i5.build) && (t6 = Object.assign(Object.assign({}, t6), { filter: i5.build() })), n4 === u4.POSTGRES_CHANGES) {
          if (null === (s4 = this.bindings[n4]) || void 0 === s4 ? void 0 : s4.find((e7) => RealtimeChannel.isSamePostgresFilter(e7.filter, t6))) return this.socket.log("error", `duplicate \`postgres_changes\` binding for ${this.topic} ignored`, t6), this;
        }
        const o6 = this.channelAdapter.on(e6, r5), a5 = { type: n4, filter: t6, callback: r5, ref: o6 };
        return this.bindings[n4] ? this.bindings[n4].push(a5) : this.bindings[n4] = [a5], this._updateFilterMessage(), this;
      }
      _onClose(e6) {
        this.channelAdapter.onClose(e6);
      }
      _onError(e6) {
        this.channelAdapter.onError(e6);
      }
      _updateFilterMessage() {
        this.channelAdapter.updateFilterBindings((e6, t6, r5) => {
          var s4, n4, i5, o6, a5, l5, c5;
          const u5 = e6.event.toLocaleLowerCase();
          if (this._notThisChannelEvent(u5, r5)) return false;
          const h6 = null === (s4 = this.bindings[u5]) || void 0 === s4 ? void 0 : s4.find((t7) => t7.ref === e6.ref);
          if (!h6) return true;
          if (["broadcast", "presence", "postgres_changes"].includes(u5)) {
            if ("id" in h6) {
              const e7 = h6.id, r6 = null === (n4 = h6.filter) || void 0 === n4 ? void 0 : n4.event;
              return e7 && (null === (i5 = t6.ids) || void 0 === i5 ? void 0 : i5.includes(e7)) && ("*" === r6 || (null == r6 ? void 0 : r6.toLocaleLowerCase()) === (null === (o6 = t6.data) || void 0 === o6 ? void 0 : o6.type.toLocaleLowerCase()));
            }
            {
              const e7 = null === (l5 = null === (a5 = null == h6 ? void 0 : h6.filter) || void 0 === a5 ? void 0 : a5.event) || void 0 === l5 ? void 0 : l5.toLocaleLowerCase();
              return "*" === e7 || e7 === (null === (c5 = null == t6 ? void 0 : t6.event) || void 0 === c5 ? void 0 : c5.toLocaleLowerCase());
            }
          }
          return h6.type.toLocaleLowerCase() === u5;
        });
      }
      _notThisChannelEvent(e6, t6) {
        const { close: s4, error: n4, leave: i5, join: o6 } = r4.CHANNEL_EVENTS;
        return t6 && [s4, n4, i5, o6].includes(e6) && t6 !== this.joinPush.ref;
      }
      _updateFilterTransform() {
        this.channelAdapter.updatePayloadTransform((e6, t6, r5) => {
          if ("object" == typeof t6 && "ids" in t6) {
            const e7 = t6.data, { schema: r6, table: s4, commit_timestamp: n4, type: i5, errors: o6 } = e7, a5 = { schema: r6, table: s4, commit_timestamp: n4, eventType: i5, new: {}, old: {}, errors: o6 };
            return Object.assign(Object.assign({}, a5), this._getPayloadRecords(e7));
          }
          return t6;
        });
      }
      copyBindings(e6) {
        if (this.joinedOnce) throw new Error("cannot copy bindings into joined channel");
        for (const t6 in e6.bindings) for (const r5 of e6.bindings[t6]) this._on(r5.type, r5.filter, r5.callback);
      }
      static isFilterValueEqual(e6, t6) {
        return (null != e6 ? e6 : void 0) === (null != t6 ? t6 : void 0);
      }
      static isSamePostgresFilter(e6, t6) {
        var r5, s4, n4, i5;
        const o6 = null !== (s4 = null === (r5 = null == e6 ? void 0 : e6.select) || void 0 === r5 ? void 0 : r5.join()) && void 0 !== s4 ? s4 : void 0, a5 = null !== (i5 = null === (n4 = null == t6 ? void 0 : t6.select) || void 0 === n4 ? void 0 : n4.join()) && void 0 !== i5 ? i5 : void 0;
        return (null == e6 ? void 0 : e6.event) === (null == t6 ? void 0 : t6.event) && RealtimeChannel.isFilterValueEqual(null == e6 ? void 0 : e6.schema, null == t6 ? void 0 : t6.schema) && RealtimeChannel.isFilterValueEqual(null == e6 ? void 0 : e6.table, null == t6 ? void 0 : t6.table) && RealtimeChannel.isFilterValueEqual(null == e6 ? void 0 : e6.filter, null == t6 ? void 0 : t6.filter) && o6 === a5;
      }
      _getPayloadRecords(e6) {
        const t6 = { new: {}, old: {} };
        return "INSERT" !== e6.type && "UPDATE" !== e6.type || (t6.new = n3.convertChangeData(e6.columns, e6.record)), "UPDATE" !== e6.type && "DELETE" !== e6.type || (t6.old = n3.convertChangeData(e6.columns, e6.old_record)), t6;
      }
    }
    e5.default = RealtimeChannel;
  })(B3)), B3;
}
function requireSocketAdapter() {
  if (ke3) return Re2;
  ke3 = 1, Object.defineProperty(Re2, "__esModule", { value: true });
  const e5 = ge3, t5 = requireConstants$1();
  return Re2.default = class {
    constructor(t6, r4) {
      this.socket = new e5.Socket(t6, r4);
    }
    get timeout() {
      return this.socket.timeout;
    }
    get endPoint() {
      return this.socket.endPoint;
    }
    get transport() {
      return this.socket.transport;
    }
    get heartbeatIntervalMs() {
      return this.socket.heartbeatIntervalMs;
    }
    get heartbeatCallback() {
      return this.socket.heartbeatCallback;
    }
    set heartbeatCallback(e6) {
      this.socket.heartbeatCallback = e6;
    }
    get heartbeatTimer() {
      return this.socket.heartbeatTimer;
    }
    get pendingHeartbeatRef() {
      return this.socket.pendingHeartbeatRef;
    }
    get reconnectTimer() {
      return this.socket.reconnectTimer;
    }
    get vsn() {
      return this.socket.vsn;
    }
    get encode() {
      return this.socket.encode;
    }
    get decode() {
      return this.socket.decode;
    }
    get reconnectAfterMs() {
      return this.socket.reconnectAfterMs;
    }
    get sendBuffer() {
      return this.socket.sendBuffer;
    }
    get stateChangeCallbacks() {
      return this.socket.stateChangeCallbacks;
    }
    connect() {
      this.socket.connect();
    }
    disconnect(e6, t6, r4, s3 = 1e4) {
      return new Promise((n3) => {
        setTimeout(() => n3("timeout"), s3), this.socket.disconnect(() => {
          e6(), n3("ok");
        }, t6, r4);
      });
    }
    push(e6) {
      this.socket.push(e6);
    }
    log(e6, t6, r4) {
      this.socket.log(e6, t6, r4);
    }
    makeRef() {
      return this.socket.makeRef();
    }
    onOpen(e6) {
      this.socket.onOpen(e6);
    }
    onClose(e6) {
      this.socket.onClose(e6);
    }
    onError(e6) {
      this.socket.onError(e6);
    }
    onMessage(e6) {
      this.socket.onMessage(e6);
    }
    isConnected() {
      return this.socket.isConnected();
    }
    isConnecting() {
      return this.socket.connectionState() == t5.CONNECTION_STATE.connecting;
    }
    isDisconnecting() {
      return this.socket.connectionState() == t5.CONNECTION_STATE.closing;
    }
    connectionState() {
      return this.socket.connectionState();
    }
    endPointURL() {
      return this.socket.endPointURL();
    }
    sendHeartbeat() {
      this.socket.sendHeartbeat();
    }
    getSocket() {
      return this.socket;
    }
  }, Re2;
}
function requireRealtimeClient() {
  if (Te3) return I3;
  Te3 = 1, Object.defineProperty(I3, "__esModule", { value: true });
  const e5 = p2, t5 = e5.__importDefault(requireWebsocketFactory()), r4 = requireConstants$1(), s3 = e5.__importDefault(requireSerializer()), n3 = requireTransformers(), i4 = e5.__importDefault(requireRealtimeChannel()), o5 = e5.__importDefault(requireSocketAdapter()), a4 = 25e3, l4 = [1e3, 2e3, 5e3, 1e4];
  function resolveSessionStorage() {
    try {
      if ("undefined" != typeof globalThis && globalThis.sessionStorage) return globalThis.sessionStorage;
    } catch (e6) {
    }
    return /* @__PURE__ */ (function() {
      const e6 = /* @__PURE__ */ new Map();
      return { get length() {
        return e6.size;
      }, clear() {
        e6.clear();
      }, getItem: /* @__PURE__ */ __name((t6) => e6.has(t6) ? e6.get(t6) : null, "getItem"), key(t6) {
        var r5;
        return null !== (r5 = Array.from(e6.keys())[t6]) && void 0 !== r5 ? r5 : null;
      }, removeItem(t6) {
        e6.delete(t6);
      }, setItem(t6, r5) {
        e6.set(t6, String(r5));
      } };
    })();
  }
  __name(resolveSessionStorage, "resolveSessionStorage");
  return I3.default = class {
    get endPoint() {
      return this.socketAdapter.endPoint;
    }
    get timeout() {
      return this.socketAdapter.timeout;
    }
    get transport() {
      return this.socketAdapter.transport;
    }
    get heartbeatCallback() {
      return this.socketAdapter.heartbeatCallback;
    }
    get heartbeatIntervalMs() {
      return this.socketAdapter.heartbeatIntervalMs;
    }
    get heartbeatTimer() {
      return this.worker ? this._workerHeartbeatTimer : this.socketAdapter.heartbeatTimer;
    }
    get pendingHeartbeatRef() {
      return this.worker ? this._pendingWorkerHeartbeatRef : this.socketAdapter.pendingHeartbeatRef;
    }
    get reconnectTimer() {
      return this.socketAdapter.reconnectTimer;
    }
    get vsn() {
      return this.socketAdapter.vsn;
    }
    get encode() {
      return this.socketAdapter.encode;
    }
    get decode() {
      return this.socketAdapter.decode;
    }
    get reconnectAfterMs() {
      return this.socketAdapter.reconnectAfterMs;
    }
    get sendBuffer() {
      return this.socketAdapter.sendBuffer;
    }
    get stateChangeCallbacks() {
      return this.socketAdapter.stateChangeCallbacks;
    }
    constructor(e6, t6) {
      var r5;
      if (this.channels = new Array(), this.accessTokenValue = null, this.accessToken = null, this.apiKey = null, this.httpEndpoint = "", this.headers = {}, this.params = {}, this.ref = 0, this.serializer = new s3.default(), this._manuallySetToken = false, this._authPromise = null, this._authGeneration = 0, this._workerHeartbeatTimer = void 0, this._pendingWorkerHeartbeatRef = null, this._pendingDisconnectTimer = null, this._disconnectOnEmptyChannelsAfterMs = 0, this._resolveFetch = (e7) => e7 ? (...t7) => e7(...t7) : (...e8) => fetch(...e8), !(null === (r5 = null == t6 ? void 0 : t6.params) || void 0 === r5 ? void 0 : r5.apikey)) throw new Error("API key is required to connect to Realtime");
      this.apiKey = t6.params.apikey;
      const i5 = this._initializeOptions(t6);
      this.socketAdapter = new o5.default(e6, i5), this.httpEndpoint = (0, n3.httpEndpointURL)(e6), this.fetch = this._resolveFetch(null == t6 ? void 0 : t6.fetch);
    }
    connect() {
      if (!(this.isConnecting() || this.isDisconnecting() || this.isConnected())) {
        this.accessToken && !this._authPromise && this._setAuthSafely("connect"), this._setupConnectionHandlers();
        try {
          this.socketAdapter.connect();
        } catch (e6) {
          const t6 = e6.message;
          throw new Error(`WebSocket not available: ${t6}`);
        }
        this._handleNodeJsRaceCondition();
      }
    }
    endpointURL() {
      return this.socketAdapter.endPointURL();
    }
    async disconnect(e6, t6) {
      return this._cancelPendingDisconnect(), this.isDisconnecting() ? "ok" : await this.socketAdapter.disconnect(() => {
        clearInterval(this._workerHeartbeatTimer), this._terminateWorker();
      }, e6, t6);
    }
    getChannels() {
      return this.channels;
    }
    async removeChannel(e6) {
      const t6 = await e6.unsubscribe();
      return "ok" === t6 && e6.teardown(), t6;
    }
    async removeAllChannels() {
      const e6 = this.channels.map(async (e7) => {
        const t7 = await e7.unsubscribe();
        return e7.teardown(), t7;
      }), t6 = await Promise.all(e6);
      return await this.disconnect(), t6;
    }
    log(e6, t6, r5) {
      this.socketAdapter.log(e6, t6, r5);
    }
    connectionState() {
      return this.socketAdapter.connectionState() || r4.CONNECTION_STATE.closed;
    }
    isConnected() {
      return this.socketAdapter.isConnected();
    }
    isConnecting() {
      return this.socketAdapter.isConnecting();
    }
    isDisconnecting() {
      return this.socketAdapter.isDisconnecting();
    }
    channel(e6, t6 = { config: {} }) {
      const r5 = `realtime:${e6}`, s4 = this.getChannels().find((e7) => e7.topic === r5);
      if (s4) return s4;
      {
        const r6 = new i4.default(`realtime:${e6}`, t6, this);
        return this._cancelPendingDisconnect(), this.channels.push(r6), r6;
      }
    }
    push(e6) {
      this.socketAdapter.push(e6);
    }
    async setAuth(e6 = null) {
      const t6 = ++this._authGeneration, r5 = this._performAuth(e6, t6);
      t6 === this._authGeneration && (this._authPromise = r5);
      try {
        await r5;
      } finally {
        this._authPromise === r5 && (this._authPromise = null);
      }
    }
    _isManualToken() {
      return this._manuallySetToken;
    }
    async sendHeartbeat() {
      this.socketAdapter.sendHeartbeat();
    }
    onHeartbeat(e6) {
      this.socketAdapter.heartbeatCallback = this._wrapHeartbeatCallback(e6);
    }
    _makeRef() {
      return this.socketAdapter.makeRef();
    }
    _remove(e6) {
      this.channels = this.channels.filter((t6) => t6.topic !== e6.topic), 0 === this.channels.length && (this.log("transport", "no channels remaining, scheduling disconnect"), this._schedulePendingDisconnect());
    }
    _schedulePendingDisconnect() {
      if (this._cancelPendingDisconnect(), 0 === this._disconnectOnEmptyChannelsAfterMs) return this.log("transport", "disconnecting immediately - no channels"), void this.disconnect();
      this._pendingDisconnectTimer = setTimeout(() => {
        this._pendingDisconnectTimer = null, 0 === this.channels.length && (this.log("transport", "deferred disconnect fired - no channels, disconnecting"), this.disconnect());
      }, this._disconnectOnEmptyChannelsAfterMs), this.log("transport", `deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`);
    }
    _cancelPendingDisconnect() {
      null !== this._pendingDisconnectTimer && (this.log("transport", "pending disconnect cancelled - channel activity detected"), clearTimeout(this._pendingDisconnectTimer), this._pendingDisconnectTimer = null);
    }
    async _performAuth(e6, t6) {
      let s4, n4 = false;
      if (e6) s4 = e6, n4 = true;
      else if (this.accessToken) try {
        s4 = await this.accessToken();
      } catch (e7) {
        this.log("error", "Error fetching access token from callback", e7), s4 = this.accessTokenValue;
      }
      else s4 = this.accessTokenValue;
      t6 === this._authGeneration && (this.accessToken ? this._manuallySetToken = false : n4 && (this._manuallySetToken = true), this.accessTokenValue != s4 && (this.accessTokenValue = s4, this.channels.forEach((e7) => {
        const t7 = { access_token: s4, version: r4.DEFAULT_VERSION };
        e7.updateJoinPayload(t7), e7.joinedOnce && e7.channelAdapter.isJoined() && e7.channelAdapter.push(r4.CHANNEL_EVENTS.access_token, { access_token: s4 });
      })));
    }
    async _waitForAuthIfNeeded() {
      this._authPromise && await this._authPromise;
    }
    _setAuthSafely(e6 = "general") {
      this._isManualToken() || this.setAuth().catch((t6) => {
        this.log("error", `Error setting auth in ${e6}`, t6);
      });
    }
    _setupConnectionHandlers() {
      this.socketAdapter.onOpen(() => {
        (this._authPromise || (this.accessToken && !this.accessTokenValue ? this.setAuth() : Promise.resolve())).catch((e6) => {
          this.log("error", "error waiting for auth on connect", e6);
        }), this.worker && !this.workerRef && this._startWorkerHeartbeat();
      }), this.socketAdapter.onClose(() => {
        this.worker && this.workerRef && this._terminateWorker();
      }), this.socketAdapter.onMessage((e6) => {
        e6.ref && e6.ref === this._pendingWorkerHeartbeatRef && (this._pendingWorkerHeartbeatRef = null);
      });
    }
    _handleNodeJsRaceCondition() {
      this.socketAdapter.isConnected() && this.socketAdapter.getSocket().onConnOpen();
    }
    _wrapHeartbeatCallback(e6) {
      return (t6, r5) => {
        "disconnected" !== t6 && ("sent" == t6 && this._setAuthSafely(), e6 && e6(t6, r5));
      };
    }
    _startWorkerHeartbeat() {
      this.workerUrl ? this.log("worker", `starting worker for from ${this.workerUrl}`) : this.log("worker", "starting default worker");
      const e6 = this._workerObjectUrl(this.workerUrl);
      this.workerRef = new Worker(e6), this.workerRef.onerror = (e7) => {
        this.log("worker", "worker error", e7.message), this._terminateWorker(), this.disconnect();
      }, this.workerRef.onmessage = (e7) => {
        "keepAlive" === e7.data.event && this.sendHeartbeat();
      }, this.workerRef.postMessage({ event: "start", interval: this.heartbeatIntervalMs });
    }
    _terminateWorker() {
      this.workerRef && (this.log("worker", "terminating worker"), this.workerRef.terminate(), this.workerRef = void 0);
    }
    _workerObjectUrl(e6) {
      let t6;
      if (e6) t6 = e6;
      else {
        const e7 = new Blob(['\n  addEventListener("message", (e) => {\n    if (e.data.event === "start") {\n      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);\n    }\n  });'], { type: "application/javascript" });
        t6 = URL.createObjectURL(e7);
      }
      return t6;
    }
    _initializeOptions(e6) {
      var s4, n4, i5, o6, c4, u4, h5, d5, p4, f4, g4, _5;
      this.worker = null !== (s4 = null == e6 ? void 0 : e6.worker) && void 0 !== s4 && s4, this.accessToken = null !== (n4 = null == e6 ? void 0 : e6.accessToken) && void 0 !== n4 ? n4 : null;
      const y5 = {};
      let m5, b5;
      y5.timeout = null !== (i5 = null == e6 ? void 0 : e6.timeout) && void 0 !== i5 ? i5 : r4.DEFAULT_TIMEOUT, y5.heartbeatIntervalMs = null !== (o6 = null == e6 ? void 0 : e6.heartbeatIntervalMs) && void 0 !== o6 ? o6 : a4, this._disconnectOnEmptyChannelsAfterMs = null !== (c4 = null == e6 ? void 0 : e6.disconnectOnEmptyChannelsAfterMs) && void 0 !== c4 ? c4 : 2 * (null !== (u4 = null == e6 ? void 0 : e6.heartbeatIntervalMs) && void 0 !== u4 ? u4 : a4), y5.transport = null !== (h5 = null == e6 ? void 0 : e6.transport) && void 0 !== h5 ? h5 : t5.default.getWebSocketConstructor(), y5.params = null == e6 ? void 0 : e6.params, y5.logger = null == e6 ? void 0 : e6.logger, y5.heartbeatCallback = this._wrapHeartbeatCallback(null == e6 ? void 0 : e6.heartbeatCallback), y5.sessionStorage = null !== (d5 = null == e6 ? void 0 : e6.sessionStorage) && void 0 !== d5 ? d5 : resolveSessionStorage(), y5.reconnectAfterMs = null !== (p4 = null == e6 ? void 0 : e6.reconnectAfterMs) && void 0 !== p4 ? p4 : (e7) => l4[e7 - 1] || 1e4;
      const w5 = null !== (f4 = null == e6 ? void 0 : e6.vsn) && void 0 !== f4 ? f4 : r4.DEFAULT_VSN;
      switch (w5) {
        case r4.VSN_1_0_0:
          m5 = /* @__PURE__ */ __name((e7, t6) => t6(JSON.stringify(e7)), "m"), b5 = /* @__PURE__ */ __name((e7, t6) => t6(JSON.parse(e7)), "b");
          break;
        case r4.VSN_2_0_0:
          m5 = this.serializer.encode.bind(this.serializer), b5 = this.serializer.decode.bind(this.serializer);
          break;
        default:
          throw new Error(`Unsupported serializer version: ${y5.vsn}`);
      }
      return y5.vsn = w5, y5.encode = null !== (g4 = null == e6 ? void 0 : e6.encode) && void 0 !== g4 ? g4 : m5, y5.decode = null !== (_5 = null == e6 ? void 0 : e6.decode) && void 0 !== _5 ? _5 : b5, y5.beforeReconnect = this._reconnectAuth.bind(this), ((null == e6 ? void 0 : e6.logLevel) || (null == e6 ? void 0 : e6.log_level)) && (this.logLevel = e6.logLevel || e6.log_level, y5.params = Object.assign(Object.assign({}, y5.params), { log_level: this.logLevel })), this.worker && (this.workerUrl = null == e6 ? void 0 : e6.workerUrl, y5.autoSendHeartbeat = !this.worker), y5;
    }
    async _reconnectAuth() {
      await this._waitForAuthIfNeeded(), this.isConnected() || this.connect();
    }
  }, I3;
}
function createFetchClient(e5) {
  const t5 = e5.fetchImpl ?? globalThis.fetch;
  return { async request({ method: r4, path: s3, query: n3, body: i4, headers: o5 }) {
    const a4 = (function(e6, t6, r5) {
      const s4 = new URL(t6, e6);
      if (r5) for (const [e7, t7] of Object.entries(r5)) void 0 !== t7 && s4.searchParams.set(e7, t7);
      return s4.toString();
    })(e5.baseUrl, s3, n3), l4 = await (async function(e6) {
      return e6 && "none" !== e6.type ? "bearer" === e6.type ? { Authorization: `Bearer ${e6.token}` } : "header" === e6.type ? { [e6.name]: e6.value } : "custom" === e6.type ? await e6.getHeaders() : {} : {};
    })(e5.auth), c4 = await t5(a4, { method: r4, headers: { ...i4 ? { "Content-Type": "application/json" } : {}, ...l4, ...o5 }, body: i4 ? JSON.stringify(i4) : void 0 }), u4 = await c4.text(), h5 = (c4.headers.get("content-type") || "").includes("application/json"), d5 = h5 && u4 ? JSON.parse(u4) : u4;
    if (!c4.ok) {
      const e6 = h5 ? d5 : void 0, t6 = e6?.error;
      throw new Oe2(t6?.message ?? `Request failed with status ${c4.status}`, { status: c4.status, icebergType: t6?.type, icebergCode: t6?.code, details: e6 });
    }
    return { status: c4.status, headers: c4.headers, data: d5 };
  } };
}
function namespaceToPath(e5) {
  return e5.join("");
}
function namespaceToPath2(e5) {
  return e5.join("");
}
function _typeof$1(e5) {
  return (_typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e6) {
    return typeof e6;
  } : function(e6) {
    return e6 && "function" == typeof Symbol && e6.constructor === Symbol && e6 !== Symbol.prototype ? "symbol" : typeof e6;
  })(e5);
}
function toPropertyKey$1(e5) {
  var t5 = (function(e6, t6) {
    if ("object" != _typeof$1(e6) || !e6) return e6;
    var r4 = e6[Symbol.toPrimitive];
    if (void 0 !== r4) {
      var s3 = r4.call(e6, t6);
      if ("object" != _typeof$1(s3)) return s3;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === t6 ? String : Number)(e6);
  })(e5, "string");
  return "symbol" == _typeof$1(t5) ? t5 : t5 + "";
}
function _defineProperty$1(e5, t5, r4) {
  return (t5 = toPropertyKey$1(t5)) in e5 ? Object.defineProperty(e5, t5, { value: r4, enumerable: true, configurable: true, writable: true }) : e5[t5] = r4, e5;
}
function ownKeys$1(e5, t5) {
  var r4 = Object.keys(e5);
  if (Object.getOwnPropertySymbols) {
    var s3 = Object.getOwnPropertySymbols(e5);
    t5 && (s3 = s3.filter(function(t6) {
      return Object.getOwnPropertyDescriptor(e5, t6).enumerable;
    })), r4.push.apply(r4, s3);
  }
  return r4;
}
function _objectSpread2$1(e5) {
  for (var t5 = 1; t5 < arguments.length; t5++) {
    var r4 = null != arguments[t5] ? arguments[t5] : {};
    t5 % 2 ? ownKeys$1(Object(r4), true).forEach(function(t6) {
      _defineProperty$1(e5, t6, r4[t6]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e5, Object.getOwnPropertyDescriptors(r4)) : ownKeys$1(Object(r4)).forEach(function(t6) {
      Object.defineProperty(e5, t6, Object.getOwnPropertyDescriptor(r4, t6));
    });
  }
  return e5;
}
function isStorageError(e5) {
  return "object" == typeof e5 && null !== e5 && "__isStorageError" in e5;
}
function setHeader(e5, t5, r4) {
  const s3 = _objectSpread2$1({}, e5), n3 = t5.toLowerCase();
  for (const e6 of Object.keys(s3)) e6.toLowerCase() === n3 && delete s3[e6];
  return s3[n3] = r4, s3;
}
async function _handleRequest(e5, t5, r4, s3, n3, i4, o5) {
  return new Promise((a4, l4) => {
    e5(r4, _getRequestParams(t5, s3, n3, i4)).then((e6) => {
      if (!e6.ok) throw e6;
      if (null == s3 ? void 0 : s3.noResolveJson) return e6;
      if ("vectors" === o5) {
        const t6 = e6.headers.get("content-type");
        if ("0" === e6.headers.get("content-length") || 204 === e6.status) return {};
        if (!t6 || !t6.includes("application/json")) return {};
      }
      return e6.json();
    }).then((e6) => a4(e6)).catch((e6) => (async (e7, t6, r5, s4) => {
      if (null !== e7 && "object" == typeof e7 && "json" in e7 && "function" == typeof e7.json) {
        const r6 = e7;
        let n4 = parseInt(String(r6.status), 10);
        Number.isFinite(n4) || (n4 = 500), r6.json().then((e8) => {
          const r7 = (null == e8 ? void 0 : e8.statusCode) || (null == e8 ? void 0 : e8.code) || n4 + "";
          t6(new Ne2(_getErrorMessage(e8), n4, r7, s4, null == e8 ? void 0 : e8.code));
        }).catch(() => {
          const e8 = n4 + "";
          t6(new Ne2(r6.statusText || `HTTP ${n4} error`, n4, e8, s4));
        });
      } else t6(new $e3(_getErrorMessage(e7), e7, s4));
    })(e6, l4, 0, o5));
  });
}
function createFetchApi(e5 = "storage") {
  return { get: /* @__PURE__ */ __name(async (t5, r4, s3, n3) => _handleRequest(t5, "GET", r4, s3, n3, void 0, e5), "get"), post: /* @__PURE__ */ __name(async (t5, r4, s3, n3, i4) => _handleRequest(t5, "POST", r4, n3, i4, s3, e5), "post"), put: /* @__PURE__ */ __name(async (t5, r4, s3, n3, i4) => _handleRequest(t5, "PUT", r4, n3, i4, s3, e5), "put"), head: /* @__PURE__ */ __name(async (t5, r4, s3, n3) => _handleRequest(t5, "HEAD", r4, _objectSpread2$1(_objectSpread2$1({}, s3), {}, { noResolveJson: true }), n3, void 0, e5), "head"), remove: /* @__PURE__ */ __name(async (t5, r4, s3, n3, i4) => _handleRequest(t5, "DELETE", r4, n3, i4, s3, e5), "remove") };
}
function requireVersion() {
  return Xe2 || (Xe2 = 1, Object.defineProperty(dt, "__esModule", { value: true }), dt.version = void 0, dt.version = "2.112.3"), dt;
}
function requireConstants() {
  return Qe2 || (Qe2 = 1, (function(e5) {
    Object.defineProperty(e5, "__esModule", { value: true }), e5.JWKS_TTL = e5.PKCE_MAX_CONCURRENT_FLOWS = e5.PKCE_FLOW_ID_PARAM = e5.BASE64URL_REGEX = e5.API_VERSIONS = e5.API_VERSION_HEADER_NAME = e5.NETWORK_FAILURE = e5.DEFAULT_HEADERS = e5.AUDIENCE = e5.STORAGE_KEY = e5.GOTRUE_URL = e5.REFRESH_FAILURE_COOLDOWN_MS = e5.EXPIRY_MARGIN_MS = e5.AUTO_REFRESH_TICK_THRESHOLD = e5.AUTO_REFRESH_TICK_DURATION_MS = void 0;
    const t5 = requireVersion();
    e5.AUTO_REFRESH_TICK_DURATION_MS = 3e4, e5.AUTO_REFRESH_TICK_THRESHOLD = 3, e5.EXPIRY_MARGIN_MS = e5.AUTO_REFRESH_TICK_THRESHOLD * e5.AUTO_REFRESH_TICK_DURATION_MS, e5.REFRESH_FAILURE_COOLDOWN_MS = 2 * e5.AUTO_REFRESH_TICK_DURATION_MS, e5.GOTRUE_URL = "http://localhost:9999", e5.STORAGE_KEY = "supabase.auth.token", e5.AUDIENCE = "", e5.DEFAULT_HEADERS = { "X-Client-Info": `gotrue-js/${t5.version}` }, e5.NETWORK_FAILURE = { MAX_RETRIES: 10, RETRY_INTERVAL: 2 }, e5.API_VERSION_HEADER_NAME = "X-Supabase-Api-Version", e5.API_VERSIONS = { "2024-01-01": { timestamp: Date.parse("2024-01-01T00:00:00.0Z"), name: "2024-01-01" } }, e5.BASE64URL_REGEX = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i, e5.PKCE_FLOW_ID_PARAM = "sb_flow_id", e5.PKCE_MAX_CONCURRENT_FLOWS = 5, e5.JWKS_TTL = 6e5;
  })(ht)), ht;
}
function requireErrors() {
  if (pt) return gt;
  pt = 1, Object.defineProperty(gt, "__esModule", { value: true }), gt.AuthInvalidJwtError = gt.AuthWeakPasswordError = gt.AuthRefreshDiscardedError = gt.AuthRetryableFetchError = gt.AuthPKCECodeVerifierMissingError = gt.AuthPKCEGrantCodeExchangeError = gt.AuthImplicitGrantRedirectError = gt.AuthInvalidCredentialsError = gt.AuthInvalidTokenResponseError = gt.AuthSessionMissingError = gt.CustomAuthError = gt.AuthUnknownError = gt.AuthApiError = gt.AuthError = void 0, gt.isAuthError = isAuthError, gt.isAuthApiError = function(e5) {
    return isAuthError(e5) && "AuthApiError" === e5.name;
  }, gt.isAuthSessionMissingError = function(e5) {
    return isAuthError(e5) && "AuthSessionMissingError" === e5.name;
  }, gt.isAuthImplicitGrantRedirectError = function(e5) {
    return isAuthError(e5) && "AuthImplicitGrantRedirectError" === e5.name;
  }, gt.isAuthPKCECodeVerifierMissingError = function(e5) {
    return isAuthError(e5) && "AuthPKCECodeVerifierMissingError" === e5.name;
  }, gt.isAuthRetryableFetchError = function(e5) {
    return isAuthError(e5) && "AuthRetryableFetchError" === e5.name;
  }, gt.isAuthRefreshDiscardedError = function(e5) {
    return isAuthError(e5) && "AuthRefreshDiscardedError" === e5.name;
  }, gt.isAuthWeakPasswordError = function(e5) {
    return isAuthError(e5) && "AuthWeakPasswordError" === e5.name;
  };
  class AuthError extends Error {
    static {
      __name(this, "AuthError");
    }
    constructor(e5, t5, r4) {
      super(e5), this.__isAuthError = true, this.name = "AuthError", this.status = t5, this.code = r4;
    }
    toJSON() {
      return { name: this.name, message: this.message, status: this.status, code: this.code };
    }
  }
  function isAuthError(e5) {
    return "object" == typeof e5 && null !== e5 && "__isAuthError" in e5;
  }
  __name(isAuthError, "isAuthError");
  gt.AuthError = AuthError;
  gt.AuthApiError = class extends AuthError {
    constructor(e5, t5, r4) {
      super(e5, t5, r4), this.name = "AuthApiError", this.status = t5, this.code = r4;
    }
  };
  gt.AuthUnknownError = class extends AuthError {
    constructor(e5, t5) {
      super(e5), this.name = "AuthUnknownError", this.originalError = t5;
    }
  };
  class CustomAuthError extends AuthError {
    static {
      __name(this, "CustomAuthError");
    }
    constructor(e5, t5, r4, s3) {
      super(e5, r4, s3), this.name = t5, this.status = r4;
    }
  }
  gt.CustomAuthError = CustomAuthError;
  gt.AuthSessionMissingError = class extends CustomAuthError {
    constructor() {
      super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
    }
  };
  gt.AuthInvalidTokenResponseError = class extends CustomAuthError {
    constructor() {
      super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
    }
  };
  gt.AuthInvalidCredentialsError = class extends CustomAuthError {
    constructor(e5) {
      super(e5, "AuthInvalidCredentialsError", 400, void 0);
    }
  };
  gt.AuthImplicitGrantRedirectError = class extends CustomAuthError {
    constructor(e5, t5 = null) {
      super(e5, "AuthImplicitGrantRedirectError", 500, void 0), this.details = null, this.details = t5;
    }
    toJSON() {
      return Object.assign(Object.assign({}, super.toJSON()), { details: this.details });
    }
  };
  gt.AuthPKCEGrantCodeExchangeError = class extends CustomAuthError {
    constructor(e5, t5 = null) {
      super(e5, "AuthPKCEGrantCodeExchangeError", 500, void 0), this.details = null, this.details = t5;
    }
    toJSON() {
      return Object.assign(Object.assign({}, super.toJSON()), { details: this.details });
    }
  };
  gt.AuthPKCECodeVerifierMissingError = class extends CustomAuthError {
    constructor() {
      super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.", "AuthPKCECodeVerifierMissingError", 400, "pkce_code_verifier_not_found");
    }
  };
  gt.AuthRetryableFetchError = class extends CustomAuthError {
    constructor(e5, t5) {
      super(e5, "AuthRetryableFetchError", t5, void 0);
    }
  };
  gt.AuthRefreshDiscardedError = class extends CustomAuthError {
    constructor(e5 = "Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)") {
      super(e5, "AuthRefreshDiscardedError", 409, void 0);
    }
  };
  gt.AuthWeakPasswordError = class extends CustomAuthError {
    constructor(e5, t5, r4) {
      super(e5, "AuthWeakPasswordError", t5, "weak_password"), this.reasons = r4;
    }
    toJSON() {
      return Object.assign(Object.assign({}, super.toJSON()), { reasons: this.reasons });
    }
  };
  return gt.AuthInvalidJwtError = class extends CustomAuthError {
    constructor(e5) {
      super(e5, "AuthInvalidJwtError", 400, "invalid_jwt");
    }
  }, gt;
}
function requireBase64url() {
  if (_t) return bt;
  _t = 1, Object.defineProperty(bt, "__esModule", { value: true }), bt.byteToBase64URL = byteToBase64URL, bt.byteFromBase64URL = byteFromBase64URL, bt.stringToBase64URL = function(e6) {
    const t6 = [], emitter = /* @__PURE__ */ __name((e7) => {
      t6.push(e7);
    }, "emitter"), r5 = { queue: 0, queuedBits: 0 };
    return stringToUTF8(e6, (e7) => {
      byteToBase64URL(e7, r5, emitter);
    }), byteToBase64URL(null, r5, emitter), t6.join("");
  }, bt.stringFromBase64URL = function(e6) {
    const t6 = [], utf8Emit = /* @__PURE__ */ __name((e7) => {
      t6.push(String.fromCodePoint(e7));
    }, "utf8Emit"), r5 = { utf8seq: 0, codepoint: 0 }, s3 = { queue: 0, queuedBits: 0 }, byteEmit = /* @__PURE__ */ __name((e7) => {
      stringFromUTF8(e7, r5, utf8Emit);
    }, "byteEmit");
    for (let t7 = 0; t7 < e6.length; t7 += 1) byteFromBase64URL(e6.charCodeAt(t7), s3, byteEmit);
    return t6.join("");
  }, bt.codepointToUTF8 = codepointToUTF8, bt.stringToUTF8 = stringToUTF8, bt.stringFromUTF8 = stringFromUTF8, bt.base64UrlToUint8Array = function(e6) {
    const t6 = [], r5 = { queue: 0, queuedBits: 0 }, onByte = /* @__PURE__ */ __name((e7) => {
      t6.push(e7);
    }, "onByte");
    for (let t7 = 0; t7 < e6.length; t7 += 1) byteFromBase64URL(e6.charCodeAt(t7), r5, onByte);
    return new Uint8Array(t6);
  }, bt.stringToUint8Array = function(e6) {
    const t6 = [];
    return stringToUTF8(e6, (e7) => t6.push(e7)), new Uint8Array(t6);
  }, bt.bytesToBase64URL = function(e6) {
    const t6 = [], r5 = { queue: 0, queuedBits: 0 }, onChar = /* @__PURE__ */ __name((e7) => {
      t6.push(e7);
    }, "onChar");
    return e6.forEach((e7) => byteToBase64URL(e7, r5, onChar)), byteToBase64URL(null, r5, onChar), t6.join("");
  };
  const e5 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), t5 = " 	\n\r=".split(""), r4 = (() => {
    const r5 = new Array(128);
    for (let e6 = 0; e6 < r5.length; e6 += 1) r5[e6] = -1;
    for (let e6 = 0; e6 < t5.length; e6 += 1) r5[t5[e6].charCodeAt(0)] = -2;
    for (let t6 = 0; t6 < e5.length; t6 += 1) r5[e5[t6].charCodeAt(0)] = t6;
    return r5;
  })();
  function byteToBase64URL(t6, r5, s3) {
    if (null !== t6) for (r5.queue = r5.queue << 8 | t6, r5.queuedBits += 8; r5.queuedBits >= 6; ) {
      const t7 = r5.queue >> r5.queuedBits - 6 & 63;
      s3(e5[t7]), r5.queuedBits -= 6;
    }
    else if (r5.queuedBits > 0) for (r5.queue = r5.queue << 6 - r5.queuedBits, r5.queuedBits = 6; r5.queuedBits >= 6; ) {
      const t7 = r5.queue >> r5.queuedBits - 6 & 63;
      s3(e5[t7]), r5.queuedBits -= 6;
    }
  }
  __name(byteToBase64URL, "byteToBase64URL");
  function byteFromBase64URL(e6, t6, s3) {
    const n3 = r4[e6];
    if (!(n3 > -1)) {
      if (-2 === n3) return;
      throw new Error(`Invalid Base64-URL character "${String.fromCharCode(e6)}"`);
    }
    for (t6.queue = t6.queue << 6 | n3, t6.queuedBits += 6; t6.queuedBits >= 8; ) s3(t6.queue >> t6.queuedBits - 8 & 255), t6.queuedBits -= 8;
  }
  __name(byteFromBase64URL, "byteFromBase64URL");
  function codepointToUTF8(e6, t6) {
    if (!(e6 <= 127)) {
      if (e6 <= 2047) return t6(192 | e6 >> 6), void t6(128 | 63 & e6);
      if (e6 <= 65535) return t6(224 | e6 >> 12), t6(128 | e6 >> 6 & 63), void t6(128 | 63 & e6);
      if (e6 <= 1114111) return t6(240 | e6 >> 18), t6(128 | e6 >> 12 & 63), t6(128 | e6 >> 6 & 63), void t6(128 | 63 & e6);
      throw new Error(`Unrecognized Unicode codepoint: ${e6.toString(16)}`);
    }
    t6(e6);
  }
  __name(codepointToUTF8, "codepointToUTF8");
  function stringToUTF8(e6, t6) {
    for (let r5 = 0; r5 < e6.length; r5 += 1) {
      let s3 = e6.charCodeAt(r5);
      if (s3 > 55295 && s3 <= 56319) {
        const t7 = 1024 * (s3 - 55296) & 65535;
        s3 = 65536 + (e6.charCodeAt(r5 + 1) - 56320 & 65535 | t7), r5 += 1;
      }
      codepointToUTF8(s3, t6);
    }
  }
  __name(stringToUTF8, "stringToUTF8");
  function stringFromUTF8(e6, t6, r5) {
    if (0 === t6.utf8seq) {
      if (e6 <= 127) return void r5(e6);
      for (let r6 = 1; r6 < 6; r6 += 1) if (!(e6 >> 7 - r6 & 1)) {
        t6.utf8seq = r6;
        break;
      }
      if (2 === t6.utf8seq) t6.codepoint = 31 & e6;
      else if (3 === t6.utf8seq) t6.codepoint = 15 & e6;
      else {
        if (4 !== t6.utf8seq) throw new Error("Invalid UTF-8 sequence");
        t6.codepoint = 7 & e6;
      }
      t6.utf8seq -= 1;
    } else if (t6.utf8seq > 0) {
      if (e6 <= 127) throw new Error("Invalid UTF-8 sequence");
      t6.codepoint = t6.codepoint << 6 | 63 & e6, t6.utf8seq -= 1, 0 === t6.utf8seq && r5(t6.codepoint);
    }
  }
  __name(stringFromUTF8, "stringFromUTF8");
  return bt;
}
function requireHelpers() {
  return yt || (yt = 1, (function(e5) {
    Object.defineProperty(e5, "__esModule", { value: true }), e5.pkceVerifierSlotKey = e5.Deferred = e5.removeItemAsync = e5.getItemAsync = e5.setItemAsync = e5.looksLikeFetchResponse = e5.resolveFetch = e5.supportsLocalStorage = e5.isBrowser = void 0, e5.expiresAt = function(e6) {
      return Math.round(Date.now() / 1e3) + e6;
    }, e5.generateCallbackId = function() {
      return /* @__PURE__ */ Symbol("auth-callback");
    }, e5.parseParametersFromURL = function(e6) {
      const t6 = {}, r5 = new URL(e6);
      if (r5.hash && "#" === r5.hash[0]) try {
        new URLSearchParams(r5.hash.substring(1)).forEach((e7, r6) => {
          t6[r6] = e7;
        });
      } catch (e7) {
      }
      return r5.searchParams.forEach((e7, r6) => {
        t6[r6] = e7;
      }), t6;
    }, e5.decodeJWT = function(e6) {
      const n4 = e6.split(".");
      if (3 !== n4.length) throw new r4.AuthInvalidJwtError("Invalid JWT structure");
      for (let e7 = 0; e7 < n4.length; e7++) if (!t5.BASE64URL_REGEX.test(n4[e7])) throw new r4.AuthInvalidJwtError("JWT not in base64url format");
      return { header: JSON.parse((0, s3.stringFromBase64URL)(n4[0])), payload: JSON.parse((0, s3.stringFromBase64URL)(n4[1])), signature: (0, s3.base64UrlToUint8Array)(n4[2]), raw: { header: n4[0], payload: n4[1] } };
    }, e5.sleep = async function(e6) {
      return await new Promise((t6) => {
        setTimeout(() => t6(null), e6);
      });
    }, e5.retryable = function(e6, t6) {
      return new Promise((r5, s4) => {
        (async () => {
          for (let n4 = 0; n4 < 1 / 0; n4++) try {
            const s5 = await e6(n4);
            if (!t6(n4, null, s5)) return void r5(s5);
          } catch (e7) {
            if (!t6(n4, e7)) return void s4(e7);
          }
        })();
      });
    }, e5.generatePKCEVerifier = generatePKCEVerifier, e5.generatePKCEChallenge = generatePKCEChallenge, e5.validatePKCEFlowId = validatePKCEFlowId, e5.generatePKCEFlowId = generatePKCEFlowId, e5.storePKCEVerifier = storePKCEVerifier, e5.retrievePKCEVerifier = async function(t6, r5, s4) {
      if (s4) {
        const n5 = await (0, e5.getItemAsync)(t6, (0, e5.pkceVerifierSlotKey)(r5, s4));
        return { verifier: "string" == typeof n5 ? n5 : null, flowId: s4 };
      }
      const n4 = await (0, e5.getItemAsync)(t6, `${r5}-code-verifier`);
      return { verifier: "string" == typeof n4 ? n4 : null, flowId: null };
    }, e5.removePKCEVerifier = async function(t6, r5, s4) {
      const n4 = `${r5}-code-verifier`;
      if (!s4) return void await (0, e5.removeItemAsync)(t6, n4);
      const i5 = (0, e5.pkceVerifierSlotKey)(r5, s4), o6 = await (0, e5.getItemAsync)(t6, i5);
      await (0, e5.removeItemAsync)(t6, i5);
      const a5 = await getPKCEFlowIndex(t6, r5), l4 = a5.filter((e6) => e6 !== s4);
      l4.length !== a5.length && (l4.length > 0 ? await (0, e5.setItemAsync)(t6, pkceFlowIndexKey(r5), l4) : await (0, e5.removeItemAsync)(t6, pkceFlowIndexKey(r5)));
      null != o6 && o6 === await (0, e5.getItemAsync)(t6, n4) && await (0, e5.removeItemAsync)(t6, n4);
    }, e5.removeAllPKCEVerifiers = async function(t6, r5) {
      const s4 = await getPKCEFlowIndex(t6, r5);
      for (const n4 of s4) await (0, e5.removeItemAsync)(t6, (0, e5.pkceVerifierSlotKey)(r5, n4));
      await (0, e5.removeItemAsync)(t6, pkceFlowIndexKey(r5)), await (0, e5.removeItemAsync)(t6, `${r5}-code-verifier`);
    }, e5.appendFlowIdToRedirectTo = function(e6, r5) {
      const s4 = e6.indexOf("#");
      let n4 = -1 === s4 ? e6 : e6.slice(0, s4);
      const i5 = -1 === s4 ? "" : e6.slice(s4), o6 = n4.indexOf("?");
      if (-1 !== o6) {
        const e7 = n4.slice(0, o6), r6 = n4.slice(o6 + 1).split("&").filter((e8) => "" !== e8 && e8 !== t5.PKCE_FLOW_ID_PARAM && !e8.startsWith(`${t5.PKCE_FLOW_ID_PARAM}=`));
        n4 = r6.length > 0 ? `${e7}?${r6.join("&")}` : e7;
      }
      const a5 = n4.includes("?") ? "&" : "?";
      return `${n4}${a5}${t5.PKCE_FLOW_ID_PARAM}=${encodeURIComponent(r5)}${i5}`;
    }, e5.getCodeChallengeAndMethod = async function(e6, t6, r5 = false, s4) {
      const n4 = generatePKCEVerifier();
      let i5 = n4;
      r5 && (i5 += "/recovery");
      const o6 = generatePKCEFlowId();
      await storePKCEVerifier(e6, t6, o6, i5, s4);
      const a5 = await generatePKCEChallenge(n4);
      return [a5, n4 === a5 ? "plain" : "s256", o6];
    }, e5.parseResponseAPIVersion = function(e6) {
      const r5 = e6.headers.get(t5.API_VERSION_HEADER_NAME);
      if (!r5) return null;
      if (!r5.match(o5)) return null;
      try {
        return /* @__PURE__ */ new Date(`${r5}T00:00:00.0Z`);
      } catch (e7) {
        return null;
      }
    }, e5.validateExp = function(e6) {
      if (!e6) throw new Error("Missing exp claim");
      const t6 = Math.floor(Date.now() / 1e3);
      if (e6 <= t6) throw new Error("JWT has expired");
    }, e5.getAlgorithm = function(e6) {
      switch (e6) {
        case "RS256":
          return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
        case "ES256":
          return { name: "ECDSA", namedCurve: "P-256", hash: { name: "SHA-256" } };
        default:
          throw new Error("Invalid alg claim");
      }
    }, e5.validateUUID = function(e6) {
      if (!a4.test(e6)) throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not");
    }, e5.assertPasskeyExperimentalEnabled = function(e6) {
      if (!e6.passkey) throw new Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).");
    }, e5.userNotAvailableProxy = function() {
      return new Proxy({}, { get: /* @__PURE__ */ __name((e6, t6) => {
        if ("__isUserNotAvailableProxy" === t6) return true;
        if ("symbol" == typeof t6) {
          const e7 = t6.toString();
          if ("Symbol(Symbol.toPrimitive)" === e7 || "Symbol(Symbol.toStringTag)" === e7 || "Symbol(util.inspect.custom)" === e7) return;
        }
        throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t6}" property of the session object is not supported. Please use getUser() instead.`);
      }, "get"), set: /* @__PURE__ */ __name((e6, t6) => {
        throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t6}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
      }, "set"), deleteProperty: /* @__PURE__ */ __name((e6, t6) => {
        throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t6}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
      }, "deleteProperty") });
    }, e5.insecureUserWarningProxy = function(e6, t6) {
      return new Proxy(e6, { get: /* @__PURE__ */ __name((e7, r5, s4) => {
        if ("__isInsecureUserWarningProxy" === r5) return true;
        if ("symbol" == typeof r5) {
          const t7 = r5.toString();
          if ("Symbol(Symbol.toPrimitive)" === t7 || "Symbol(Symbol.toStringTag)" === t7 || "Symbol(util.inspect.custom)" === t7 || "Symbol(nodejs.util.inspect.custom)" === t7) return Reflect.get(e7, r5, s4);
        }
        return t6.value || "string" != typeof r5 || (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), t6.value = true), Reflect.get(e7, r5, s4);
      }, "get") });
    }, e5.deepClone = function(e6) {
      return JSON.parse(JSON.stringify(e6));
    };
    const t5 = requireConstants(), r4 = requireErrors(), s3 = requireBase64url();
    e5.isBrowser = () => false;
    const n3 = { tested: false, writable: false };
    e5.supportsLocalStorage = () => {
      if (!(0, e5.isBrowser)()) return false;
      try {
        if ("object" != typeof globalThis.localStorage) return false;
      } catch (e6) {
        return false;
      }
      if (n3.tested) return n3.writable;
      const t6 = `lswt-${Math.random()}${Math.random()}`;
      try {
        globalThis.localStorage.setItem(t6, t6), globalThis.localStorage.removeItem(t6), n3.tested = true, n3.writable = true;
      } catch (e6) {
        n3.tested = true, n3.writable = false;
      }
      return n3.writable;
    };
    e5.resolveFetch = (e6) => e6 ? (...t6) => e6(...t6) : (...e7) => fetch(...e7);
    e5.looksLikeFetchResponse = (e6) => "object" == typeof e6 && null !== e6 && "status" in e6 && "ok" in e6 && "json" in e6 && "function" == typeof e6.json;
    e5.setItemAsync = async (e6, t6, r5) => {
      await e6.setItem(t6, JSON.stringify(r5));
    };
    e5.getItemAsync = async (e6, t6) => {
      const r5 = await e6.getItem(t6);
      if (!r5) return null;
      try {
        return JSON.parse(r5);
      } catch (e7) {
        return null;
      }
    };
    e5.removeItemAsync = async (e6, t6) => {
      await e6.removeItem(t6);
    };
    class Deferred {
      static {
        __name(this, "Deferred");
      }
      constructor() {
        this.promise = new Deferred.promiseConstructor((e6, t6) => {
          this.resolve = e6, this.reject = t6;
        });
      }
    }
    function dec2hex(e6) {
      return ("0" + e6.toString(16)).substr(-2);
    }
    __name(dec2hex, "dec2hex");
    function generatePKCEVerifier() {
      const e6 = new Uint32Array(56);
      if ("undefined" == typeof crypto) {
        const e7 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~", t6 = e7.length;
        let r5 = "";
        for (let s4 = 0; s4 < 56; s4++) r5 += e7.charAt(Math.floor(Math.random() * t6));
        return r5;
      }
      return crypto.getRandomValues(e6), Array.from(e6, dec2hex).join("");
    }
    __name(generatePKCEVerifier, "generatePKCEVerifier");
    async function generatePKCEChallenge(e6) {
      if (!("undefined" != typeof crypto && void 0 !== crypto.subtle && "undefined" != typeof TextEncoder)) return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), e6;
      const t6 = await (async function(e7) {
        const t7 = new TextEncoder().encode(e7), r5 = await crypto.subtle.digest("SHA-256", t7), s4 = new Uint8Array(r5);
        return Array.from(s4).map((e8) => String.fromCharCode(e8)).join("");
      })(e6);
      return btoa(t6).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
    __name(generatePKCEChallenge, "generatePKCEChallenge");
    e5.Deferred = Deferred, Deferred.promiseConstructor = Promise;
    const i4 = /^[a-zA-Z0-9_-]{8,64}$/;
    function validatePKCEFlowId(e6) {
      return "string" == typeof e6 && i4.test(e6) ? e6 : null;
    }
    __name(validatePKCEFlowId, "validatePKCEFlowId");
    function generatePKCEFlowId() {
      if ("undefined" != typeof crypto && "function" == typeof crypto.getRandomValues) {
        const e7 = new Uint8Array(16);
        return crypto.getRandomValues(e7), Array.from(e7, dec2hex).join("");
      }
      let e6 = "";
      for (let t6 = 0; t6 < 32; t6++) e6 += Math.floor(16 * Math.random()).toString(16);
      return e6;
    }
    __name(generatePKCEFlowId, "generatePKCEFlowId");
    e5.pkceVerifierSlotKey = (e6, t6) => `${e6}-flow-${t6}-code-verifier`;
    const pkceFlowIndexKey = /* @__PURE__ */ __name((e6) => `${e6}-flows-code-verifier`, "pkceFlowIndexKey");
    async function getPKCEFlowIndex(t6, r5) {
      const s4 = await (0, e5.getItemAsync)(t6, pkceFlowIndexKey(r5));
      return Array.isArray(s4) ? s4.filter((e6) => null !== validatePKCEFlowId(e6)) : [];
    }
    __name(getPKCEFlowIndex, "getPKCEFlowIndex");
    async function storePKCEVerifier(r5, s4, n4, i5, o6) {
      await (0, e5.setItemAsync)(r5, (0, e5.pkceVerifierSlotKey)(s4, n4), i5);
      const a5 = (await getPKCEFlowIndex(r5, s4)).filter((e6) => e6 !== n4);
      for (a5.push(n4); a5.length > t5.PKCE_MAX_CONCURRENT_FLOWS; ) {
        const t6 = a5.shift();
        await (0, e5.removeItemAsync)(r5, (0, e5.pkceVerifierSlotKey)(s4, t6)), null == o6 || o6(t6);
      }
      await (0, e5.setItemAsync)(r5, pkceFlowIndexKey(s4), a5), await (0, e5.setItemAsync)(r5, `${s4}-code-verifier`, i5);
    }
    __name(storePKCEVerifier, "storePKCEVerifier");
    const o5 = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
    const a4 = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  })(ft)), ft;
}
function requireFetch() {
  if (mt) return ut;
  mt = 1, Object.defineProperty(ut, "__esModule", { value: true }), ut.handleError = handleError, ut._request = async function(e6, r5, n4, i4) {
    var o5;
    const a4 = Object.assign({}, null == i4 ? void 0 : i4.headers);
    a4[t5.API_VERSION_HEADER_NAME] || (a4[t5.API_VERSION_HEADER_NAME] = t5.API_VERSIONS["2024-01-01"].name);
    (null == i4 ? void 0 : i4.jwt) && (a4.Authorization = `Bearer ${i4.jwt}`);
    const l4 = null !== (o5 = null == i4 ? void 0 : i4.query) && void 0 !== o5 ? o5 : {};
    (null == i4 ? void 0 : i4.redirectTo) && (l4.redirect_to = i4.redirectTo);
    const c4 = Object.keys(l4).length ? "?" + new URLSearchParams(l4).toString() : "", u4 = await (async function(e7, t6, r6, n5, i5, o6) {
      const a5 = _getRequestParams2(t6, n5, i5, o6);
      let l5;
      try {
        l5 = await e7(r6, Object.assign({}, a5));
      } catch (e8) {
        throw new s3.AuthRetryableFetchError(_getErrorMessage2(e8), 0);
      }
      l5.ok || await handleError(l5);
      if (null == n5 ? void 0 : n5.noResolveJson) return l5;
      try {
        return await l5.json();
      } catch (e8) {
        await handleError(e8);
      }
    })(e6, r5, n4 + c4, { headers: a4, noResolveJson: null == i4 ? void 0 : i4.noResolveJson }, {}, null == i4 ? void 0 : i4.body);
    return (null == i4 ? void 0 : i4.xform) ? null == i4 ? void 0 : i4.xform(u4) : { data: Object.assign({}, u4), error: null };
  }, ut._sessionResponse = _sessionResponse, ut._sessionResponsePassword = function(e6) {
    const t6 = _sessionResponse(e6);
    !t6.error && e6.weak_password && "object" == typeof e6.weak_password && Array.isArray(e6.weak_password.reasons) && e6.weak_password.reasons.length && e6.weak_password.message && "string" == typeof e6.weak_password.message && e6.weak_password.reasons.reduce((e7, t7) => e7 && "string" == typeof t7, true) && (t6.data.weak_password = e6.weak_password);
    return t6;
  }, ut._userResponse = function(e6) {
    var t6;
    return { data: { user: null !== (t6 = e6.user) && void 0 !== t6 ? t6 : e6 }, error: null };
  }, ut._ssoResponse = function(e6) {
    return { data: e6, error: null };
  }, ut._generateLinkResponse = function(t6) {
    const { action_link: r5, email_otp: s4, hashed_token: n4, redirect_to: i4, verification_type: o5 } = t6, a4 = e5.__rest(t6, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]), l4 = { action_link: r5, email_otp: s4, hashed_token: n4, redirect_to: i4, verification_type: o5 }, c4 = Object.assign({}, a4);
    return { data: { properties: l4, user: c4 }, error: null };
  }, ut._noResolveJsonResponse = function(e6) {
    return e6;
  };
  const e5 = p2, t5 = requireConstants(), r4 = requireHelpers(), s3 = requireErrors(), _getErrorMessage2 = /* @__PURE__ */ __name((e6) => {
    if ("object" == typeof e6 && null !== e6) {
      const t6 = e6;
      if ("string" == typeof t6.msg) return t6.msg;
      if ("string" == typeof t6.message) return t6.message;
      if ("string" == typeof t6.error_description) return t6.error_description;
      if ("string" == typeof t6.error) return t6.error;
    }
    return JSON.stringify(e6);
  }, "_getErrorMessage"), n3 = [500, 501, 502, 503, 504, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530];
  async function handleError(e6) {
    var i4;
    if (!(0, r4.looksLikeFetchResponse)(e6)) throw new s3.AuthRetryableFetchError(_getErrorMessage2(e6), 0);
    let o5, a4;
    try {
      o5 = await e6.json();
    } catch (t6) {
      if (n3.includes(e6.status)) throw new s3.AuthRetryableFetchError(e6.statusText || `HTTP ${e6.status}`, e6.status);
      throw new s3.AuthUnknownError(_getErrorMessage2(t6), t6);
    }
    if (n3.includes(e6.status)) throw new s3.AuthRetryableFetchError(_getErrorMessage2(o5), e6.status);
    const l4 = (0, r4.parseResponseAPIVersion)(e6);
    if (l4 && l4.getTime() >= t5.API_VERSIONS["2024-01-01"].timestamp && "object" == typeof o5 && o5 && "string" == typeof o5.code ? a4 = o5.code : "object" == typeof o5 && o5 && "string" == typeof o5.error_code && (a4 = o5.error_code), a4) {
      if ("weak_password" === a4) throw new s3.AuthWeakPasswordError(_getErrorMessage2(o5), e6.status, (null === (i4 = o5.weak_password) || void 0 === i4 ? void 0 : i4.reasons) || []);
      if ("session_not_found" === a4) throw new s3.AuthSessionMissingError();
    } else if ("object" == typeof o5 && o5 && "object" == typeof o5.weak_password && o5.weak_password && Array.isArray(o5.weak_password.reasons) && o5.weak_password.reasons.length && o5.weak_password.reasons.reduce((e7, t6) => e7 && "string" == typeof t6, true)) throw new s3.AuthWeakPasswordError(_getErrorMessage2(o5), e6.status, o5.weak_password.reasons);
    throw new s3.AuthApiError(_getErrorMessage2(o5), e6.status || 500, a4);
  }
  __name(handleError, "handleError");
  const _getRequestParams2 = /* @__PURE__ */ __name((e6, t6, r5, s4) => {
    const n4 = { method: e6, headers: (null == t6 ? void 0 : t6.headers) || {} };
    return "GET" === e6 ? n4 : (n4.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, null == t6 ? void 0 : t6.headers), n4.body = JSON.stringify(s4), Object.assign(Object.assign({}, n4), r5));
  }, "_getRequestParams");
  function _sessionResponse(e6) {
    var t6;
    let s4 = null;
    (function(e7) {
      return !!e7.access_token && !!e7.refresh_token && !!e7.expires_in;
    })(e6) && (s4 = Object.assign({}, e6), e6.expires_at || (s4.expires_at = (0, r4.expiresAt)(e6.expires_in)));
    return { data: { session: s4, user: null !== (t6 = e6.user) && void 0 !== t6 ? t6 : "string" == typeof (null == e6 ? void 0 : e6.id) ? e6 : null }, error: null };
  }
  __name(_sessionResponse, "_sessionResponse");
  return ut;
}
function requireTypes() {
  return wt || (wt = 1, Object.defineProperty(Et, "__esModule", { value: true }), Et.SIGN_OUT_SCOPES = void 0, Et.SIGN_OUT_SCOPES = ["global", "local", "others"]), Et;
}
function requireGoTrueAdminApi() {
  if (vt) return ct;
  vt = 1, Object.defineProperty(ct, "__esModule", { value: true });
  const e5 = p2, t5 = requireFetch(), r4 = requireHelpers(), s3 = requireTypes(), n3 = requireErrors();
  return ct.default = class {
    constructor({ url: e6 = "", headers: t6 = {}, fetch: s4, experimental: n4 }) {
      this.url = e6, this.headers = t6, this.fetch = (0, r4.resolveFetch)(s4), this.experimental = null != n4 ? n4 : {}, this.mfa = { listFactors: this._listFactors.bind(this), deleteFactor: this._deleteFactor.bind(this) }, this.oauth = { listClients: this._listOAuthClients.bind(this), createClient: this._createOAuthClient.bind(this), getClient: this._getOAuthClient.bind(this), updateClient: this._updateOAuthClient.bind(this), deleteClient: this._deleteOAuthClient.bind(this), regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this) }, this.customProviders = { listProviders: this._listCustomProviders.bind(this), createProvider: this._createCustomProvider.bind(this), getProvider: this._getCustomProvider.bind(this), updateProvider: this._updateCustomProvider.bind(this), deleteProvider: this._deleteCustomProvider.bind(this) }, this.passkey = { listPasskeys: this._adminListPasskeys.bind(this), deletePasskey: this._adminDeletePasskey.bind(this) };
    }
    async signOut(e6, r5 = s3.SIGN_OUT_SCOPES[0]) {
      if (s3.SIGN_OUT_SCOPES.indexOf(r5) < 0) throw new Error(`@supabase/auth-js: Parameter scope must be one of ${s3.SIGN_OUT_SCOPES.join(", ")}`);
      try {
        return await (0, t5._request)(this.fetch, "POST", `${this.url}/logout?scope=${r5}`, { headers: this.headers, jwt: e6, noResolveJson: true }), { data: null, error: null };
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: null, error: e7 };
        throw e7;
      }
    }
    async inviteUserByEmail(e6, r5 = {}) {
      try {
        return await (0, t5._request)(this.fetch, "POST", `${this.url}/invite`, { body: { email: e6, data: r5.data }, headers: this.headers, redirectTo: r5.redirectTo, xform: t5._userResponse });
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: { user: null }, error: e7 };
        throw e7;
      }
    }
    async generateLink(r5) {
      try {
        const { options: s4 } = r5, n4 = e5.__rest(r5, ["options"]), i4 = Object.assign(Object.assign({}, n4), s4);
        return "newEmail" in n4 && (i4.new_email = null == n4 ? void 0 : n4.newEmail, delete i4.newEmail), await (0, t5._request)(this.fetch, "POST", `${this.url}/admin/generate_link`, { body: i4, headers: this.headers, xform: t5._generateLinkResponse, redirectTo: null == s4 ? void 0 : s4.redirectTo });
      } catch (e6) {
        if ((0, n3.isAuthError)(e6)) return { data: { properties: null, user: null }, error: e6 };
        throw e6;
      }
    }
    async createUser(e6) {
      try {
        return await (0, t5._request)(this.fetch, "POST", `${this.url}/admin/users`, { body: e6, headers: this.headers, xform: t5._userResponse });
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: { user: null }, error: e7 };
        throw e7;
      }
    }
    async listUsers(e6) {
      var r5, s4, i4, o5, a4, l4, c4;
      try {
        const n4 = { nextPage: null, lastPage: 0, total: 0 }, u4 = await (0, t5._request)(this.fetch, "GET", `${this.url}/admin/users`, { headers: this.headers, noResolveJson: true, query: { page: null !== (s4 = null === (r5 = null == e6 ? void 0 : e6.page) || void 0 === r5 ? void 0 : r5.toString()) && void 0 !== s4 ? s4 : "", per_page: null !== (o5 = null === (i4 = null == e6 ? void 0 : e6.perPage) || void 0 === i4 ? void 0 : i4.toString()) && void 0 !== o5 ? o5 : "" }, xform: t5._noResolveJsonResponse });
        if (u4.error) throw u4.error;
        const h5 = await u4.json(), d5 = null !== (a4 = u4.headers.get("x-total-count")) && void 0 !== a4 ? a4 : 0, p4 = null !== (c4 = null === (l4 = u4.headers.get("link")) || void 0 === l4 ? void 0 : l4.split(",")) && void 0 !== c4 ? c4 : [];
        return p4.length > 0 && (p4.forEach((e7) => {
          const t6 = parseInt(e7.split(";")[0].split("=")[1].substring(0, 1)), r6 = JSON.parse(e7.split(";")[1].split("=")[1]);
          n4[`${r6}Page`] = t6;
        }), n4.total = parseInt(d5)), { data: Object.assign(Object.assign({}, h5), n4), error: null };
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: { users: [] }, error: e7 };
        throw e7;
      }
    }
    async getUserById(e6) {
      (0, r4.validateUUID)(e6);
      try {
        return await (0, t5._request)(this.fetch, "GET", `${this.url}/admin/users/${e6}`, { headers: this.headers, xform: t5._userResponse });
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: { user: null }, error: e7 };
        throw e7;
      }
    }
    async updateUserById(e6, s4) {
      (0, r4.validateUUID)(e6);
      try {
        return await (0, t5._request)(this.fetch, "PUT", `${this.url}/admin/users/${e6}`, { body: s4, headers: this.headers, xform: t5._userResponse });
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: { user: null }, error: e7 };
        throw e7;
      }
    }
    async deleteUser(e6, s4 = false) {
      (0, r4.validateUUID)(e6);
      try {
        return await (0, t5._request)(this.fetch, "DELETE", `${this.url}/admin/users/${e6}`, { headers: this.headers, body: { should_soft_delete: s4 }, xform: t5._userResponse });
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: { user: null }, error: e7 };
        throw e7;
      }
    }
    async _listFactors(e6) {
      (0, r4.validateUUID)(e6.userId);
      try {
        const { data: r5, error: s4 } = await (0, t5._request)(this.fetch, "GET", `${this.url}/admin/users/${e6.userId}/factors`, { headers: this.headers, xform: /* @__PURE__ */ __name((e7) => ({ data: { factors: e7 }, error: null }), "xform") });
        return { data: r5, error: s4 };
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: null, error: e7 };
        throw e7;
      }
    }
    async _deleteFactor(e6) {
      (0, r4.validateUUID)(e6.userId), (0, r4.validateUUID)(e6.id);
      try {
        return { data: await (0, t5._request)(this.fetch, "DELETE", `${this.url}/admin/users/${e6.userId}/factors/${e6.id}`, { headers: this.headers }), error: null };
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: null, error: e7 };
        throw e7;
      }
    }
    async _listOAuthClients(e6) {
      var r5, s4, i4, o5, a4, l4, c4;
      try {
        const n4 = { nextPage: null, lastPage: 0, total: 0 }, u4 = await (0, t5._request)(this.fetch, "GET", `${this.url}/admin/oauth/clients`, { headers: this.headers, noResolveJson: true, query: { page: null !== (s4 = null === (r5 = null == e6 ? void 0 : e6.page) || void 0 === r5 ? void 0 : r5.toString()) && void 0 !== s4 ? s4 : "", per_page: null !== (o5 = null === (i4 = null == e6 ? void 0 : e6.perPage) || void 0 === i4 ? void 0 : i4.toString()) && void 0 !== o5 ? o5 : "" }, xform: t5._noResolveJsonResponse });
        if (u4.error) throw u4.error;
        const h5 = await u4.json(), d5 = null !== (a4 = u4.headers.get("x-total-count")) && void 0 !== a4 ? a4 : 0, p4 = null !== (c4 = null === (l4 = u4.headers.get("link")) || void 0 === l4 ? void 0 : l4.split(",")) && void 0 !== c4 ? c4 : [];
        return p4.length > 0 && (p4.forEach((e7) => {
          const t6 = parseInt(e7.split(";")[0].split("=")[1].substring(0, 1)), r6 = JSON.parse(e7.split(";")[1].split("=")[1]);
          n4[`${r6}Page`] = t6;
        }), n4.total = parseInt(d5)), { data: Object.assign(Object.assign({}, h5), n4), error: null };
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: { clients: [] }, error: e7 };
        throw e7;
      }
    }
    async _createOAuthClient(e6) {
      try {
        return await (0, t5._request)(this.fetch, "POST", `${this.url}/admin/oauth/clients`, { body: e6, headers: this.headers, xform: /* @__PURE__ */ __name((e7) => ({ data: e7, error: null }), "xform") });
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: null, error: e7 };
        throw e7;
      }
    }
    async _getOAuthClient(e6) {
      try {
        return await (0, t5._request)(this.fetch, "GET", `${this.url}/admin/oauth/clients/${e6}`, { headers: this.headers, xform: /* @__PURE__ */ __name((e7) => ({ data: e7, error: null }), "xform") });
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: null, error: e7 };
        throw e7;
      }
    }
    async _updateOAuthClient(e6, r5) {
      try {
        return await (0, t5._request)(this.fetch, "PUT", `${this.url}/admin/oauth/clients/${e6}`, { body: r5, headers: this.headers, xform: /* @__PURE__ */ __name((e7) => ({ data: e7, error: null }), "xform") });
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: null, error: e7 };
        throw e7;
      }
    }
    async _deleteOAuthClient(e6) {
      try {
        return await (0, t5._request)(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${e6}`, { headers: this.headers, noResolveJson: true }), { data: null, error: null };
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: null, error: e7 };
        throw e7;
      }
    }
    async _regenerateOAuthClientSecret(e6) {
      try {
        return await (0, t5._request)(this.fetch, "POST", `${this.url}/admin/oauth/clients/${e6}/regenerate_secret`, { headers: this.headers, xform: /* @__PURE__ */ __name((e7) => ({ data: e7, error: null }), "xform") });
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: null, error: e7 };
        throw e7;
      }
    }
    async _listCustomProviders(e6) {
      try {
        const r5 = {};
        return (null == e6 ? void 0 : e6.type) && (r5.type = e6.type), await (0, t5._request)(this.fetch, "GET", `${this.url}/admin/custom-providers`, { headers: this.headers, query: r5, xform: /* @__PURE__ */ __name((e7) => {
          var t6;
          return { data: { providers: null !== (t6 = null == e7 ? void 0 : e7.providers) && void 0 !== t6 ? t6 : [] }, error: null };
        }, "xform") });
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: { providers: [] }, error: e7 };
        throw e7;
      }
    }
    async _createCustomProvider(e6) {
      try {
        return await (0, t5._request)(this.fetch, "POST", `${this.url}/admin/custom-providers`, { body: e6, headers: this.headers, xform: /* @__PURE__ */ __name((e7) => ({ data: e7, error: null }), "xform") });
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: null, error: e7 };
        throw e7;
      }
    }
    async _getCustomProvider(e6) {
      try {
        return await (0, t5._request)(this.fetch, "GET", `${this.url}/admin/custom-providers/${e6}`, { headers: this.headers, xform: /* @__PURE__ */ __name((e7) => ({ data: e7, error: null }), "xform") });
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: null, error: e7 };
        throw e7;
      }
    }
    async _updateCustomProvider(e6, r5) {
      try {
        return await (0, t5._request)(this.fetch, "PUT", `${this.url}/admin/custom-providers/${e6}`, { body: r5, headers: this.headers, xform: /* @__PURE__ */ __name((e7) => ({ data: e7, error: null }), "xform") });
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: null, error: e7 };
        throw e7;
      }
    }
    async _deleteCustomProvider(e6) {
      try {
        return await (0, t5._request)(this.fetch, "DELETE", `${this.url}/admin/custom-providers/${e6}`, { headers: this.headers, noResolveJson: true }), { data: null, error: null };
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: null, error: e7 };
        throw e7;
      }
    }
    async _adminListPasskeys(e6) {
      (0, r4.assertPasskeyExperimentalEnabled)(this.experimental), (0, r4.validateUUID)(e6.userId);
      try {
        return await (0, t5._request)(this.fetch, "GET", `${this.url}/admin/users/${e6.userId}/passkeys`, { headers: this.headers, xform: /* @__PURE__ */ __name((e7) => ({ data: e7, error: null }), "xform") });
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: null, error: e7 };
        throw e7;
      }
    }
    async _adminDeletePasskey(e6) {
      (0, r4.assertPasskeyExperimentalEnabled)(this.experimental), (0, r4.validateUUID)(e6.userId), (0, r4.validateUUID)(e6.passkeyId);
      try {
        return await (0, t5._request)(this.fetch, "DELETE", `${this.url}/admin/users/${e6.userId}/passkeys/${e6.passkeyId}`, { headers: this.headers, noResolveJson: true }), { data: null, error: null };
      } catch (e7) {
        if ((0, n3.isAuthError)(e7)) return { data: null, error: e7 };
        throw e7;
      }
    }
  }, ct;
}
function requireLocalStorage() {
  if (St) return kt;
  return St = 1, Object.defineProperty(kt, "__esModule", { value: true }), kt.memoryLocalStorageAdapter = function(e5 = {}) {
    return { getItem: /* @__PURE__ */ __name((t5) => e5[t5] || null, "getItem"), setItem: /* @__PURE__ */ __name((t5, r4) => {
      e5[t5] = r4;
    }, "setItem"), removeItem: /* @__PURE__ */ __name((t5) => {
      delete e5[t5];
    }, "removeItem") };
  }, kt;
}
function requireLocks() {
  return Tt || (Tt = 1, (function(e5) {
    Object.defineProperty(e5, "__esModule", { value: true }), e5.ProcessLockAcquireTimeoutError = e5.NavigatorLockAcquireTimeoutError = e5.LockAcquireTimeoutError = e5.internals = void 0, e5.navigatorLock = async function(t6, r5, s3) {
      e5.internals.debug && console.log("@supabase/gotrue-js: navigatorLock: acquire lock", t6, r5);
      const n3 = new globalThis.AbortController();
      let i4;
      r5 > 0 && (i4 = setTimeout(() => {
        n3.abort(), e5.internals.debug && console.log("@supabase/gotrue-js: navigatorLock acquire timed out", t6);
      }, r5));
      await Promise.resolve();
      try {
        return await globalThis.navigator.locks.request(t6, 0 === r5 ? { mode: "exclusive", ifAvailable: true } : { mode: "exclusive", signal: n3.signal }, async (n4) => {
          if (!n4) {
            if (0 === r5) throw e5.internals.debug && console.log("@supabase/gotrue-js: navigatorLock: not immediately available", t6), new NavigatorLockAcquireTimeoutError(`Acquiring an exclusive Navigator LockManager lock "${t6}" immediately failed`);
            if (e5.internals.debug) try {
              const e6 = await globalThis.navigator.locks.query();
              console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(e6, null, "  "));
            } catch (e6) {
              console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", e6);
            }
            return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"), clearTimeout(i4), await s3();
          }
          clearTimeout(i4), e5.internals.debug && console.log("@supabase/gotrue-js: navigatorLock: acquired", t6, n4.name);
          try {
            return await s3();
          } finally {
            e5.internals.debug && console.log("@supabase/gotrue-js: navigatorLock: released", t6, n4.name);
          }
        });
      } catch (o5) {
        if (r5 > 0 && clearTimeout(i4), null !== o5 && "object" == typeof o5 && "name" in o5 && "AbortError" === o5.name && r5 > 0) {
          if (n3.signal.aborted) return e5.internals.debug && console.log("@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock", t6), console.warn(`@supabase/gotrue-js: Lock "${t6}" was not released within ${r5}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`), await Promise.resolve().then(() => globalThis.navigator.locks.request(t6, { mode: "exclusive", steal: true }, async (r6) => {
            if (!r6) return console.warn("@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true"), await s3();
            e5.internals.debug && console.log("@supabase/gotrue-js: navigatorLock: recovered (stolen)", t6, r6.name);
            try {
              return await s3();
            } finally {
              e5.internals.debug && console.log("@supabase/gotrue-js: navigatorLock: released (stolen)", t6, r6.name);
            }
          }));
          throw e5.internals.debug && console.log("@supabase/gotrue-js: navigatorLock: lock was stolen by another request", t6), new NavigatorLockAcquireTimeoutError(`Lock "${t6}" was released because another request stole it`);
        }
        throw o5;
      }
    }, e5.processLock = async function(e6, t6, s3) {
      var n3;
      const i4 = null !== (n3 = r4[e6]) && void 0 !== n3 ? n3 : Promise.resolve(), o5 = (async () => {
        try {
          return await i4, null;
        } catch (e7) {
          return null;
        }
      })(), a4 = (async () => {
        let r5 = null;
        try {
          const s4 = t6 >= 0 ? new Promise((s5, n4) => {
            r5 = setTimeout(() => {
              console.warn(`@supabase/gotrue-js: Lock "${e6}" acquisition timed out after ${t6}ms. This may be caused by another operation holding the lock. Consider increasing lockAcquireTimeout or checking for stuck operations.`), n4(new ProcessLockAcquireTimeoutError(`Acquiring process lock with name "${e6}" timed out`));
            }, t6);
          }) : null;
          await Promise.race([o5, s4].filter((e7) => e7)), null !== r5 && clearTimeout(r5);
        } catch (e7) {
          if (null !== r5 && clearTimeout(r5), e7 instanceof LockAcquireTimeoutError) throw e7;
        }
        return await s3();
      })();
      return r4[e6] = (async () => {
        try {
          return await a4;
        } catch (e7) {
          if (e7 instanceof LockAcquireTimeoutError) {
            try {
              await i4;
            } catch (e8) {
            }
            return null;
          }
          throw e7;
        }
      })(), await a4;
    };
    const t5 = requireHelpers();
    e5.internals = { debug: !!(globalThis && (0, t5.supportsLocalStorage)() && globalThis.localStorage && "true" === globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")) };
    class LockAcquireTimeoutError extends Error {
      static {
        __name(this, "LockAcquireTimeoutError");
      }
      constructor(e6) {
        super(e6), this.isAcquireTimeout = true;
      }
    }
    e5.LockAcquireTimeoutError = LockAcquireTimeoutError;
    class NavigatorLockAcquireTimeoutError extends LockAcquireTimeoutError {
      static {
        __name(this, "NavigatorLockAcquireTimeoutError");
      }
    }
    e5.NavigatorLockAcquireTimeoutError = NavigatorLockAcquireTimeoutError;
    class ProcessLockAcquireTimeoutError extends LockAcquireTimeoutError {
      static {
        __name(this, "ProcessLockAcquireTimeoutError");
      }
    }
    e5.ProcessLockAcquireTimeoutError = ProcessLockAcquireTimeoutError;
    const r4 = {};
  })(Rt)), Rt;
}
function requirePolyfills() {
  if (Ot) return Pt;
  return Ot = 1, Object.defineProperty(Pt, "__esModule", { value: true }), Pt.polyfillGlobalThis = function() {
    if ("object" == typeof globalThis) return;
    try {
      Object.defineProperty(Object.prototype, "__magic__", { get: /* @__PURE__ */ __name(function() {
        return this;
      }, "get"), configurable: true }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__;
    } catch (e5) {
      "undefined" != typeof self && (self.globalThis = self);
    }
  }, Pt;
}
function requireEthereum() {
  if (Ct) return It;
  function getAddress(e5) {
    if (!/^0x[a-fA-F0-9]{40}$/.test(e5)) throw new Error(`@supabase/auth-js: Address "${e5}" is invalid.`);
    return e5.toLowerCase();
  }
  __name(getAddress, "getAddress");
  return Ct = 1, Object.defineProperty(It, "__esModule", { value: true }), It.getAddress = getAddress, It.fromHex = function(e5) {
    return parseInt(e5, 16);
  }, It.toHex = function(e5) {
    const t5 = new TextEncoder().encode(e5);
    return "0x" + Array.from(t5, (e6) => e6.toString(16).padStart(2, "0")).join("");
  }, It.createSiweMessage = function(e5) {
    var t5;
    const { chainId: r4, domain: s3, expirationTime: n3, issuedAt: i4 = /* @__PURE__ */ new Date(), nonce: o5, notBefore: a4, requestId: l4, resources: c4, scheme: u4, uri: h5, version: d5 } = e5;
    if (!Number.isInteger(r4)) throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r4}`);
    if (!s3) throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');
    if (o5 && o5.length < 8) throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${o5}`);
    if (!h5) throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');
    if ("1" !== d5) throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d5}`);
    if (null === (t5 = e5.statement) || void 0 === t5 ? void 0 : t5.includes("\n")) throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e5.statement}`);
    const p4 = getAddress(e5.address), f4 = u4 ? `${u4}://${s3}` : s3, g4 = e5.statement ? `${e5.statement}
` : "", _5 = `${f4} wants you to sign in with your Ethereum account:
${p4}

${g4}`;
    let y5 = `URI: ${h5}
Version: ${d5}
Chain ID: ${r4}${o5 ? `
Nonce: ${o5}` : ""}
Issued At: ${i4.toISOString()}`;
    n3 && (y5 += `
Expiration Time: ${n3.toISOString()}`);
    a4 && (y5 += `
Not Before: ${a4.toISOString()}`);
    l4 && (y5 += `
Request ID: ${l4}`);
    if (c4) {
      let e6 = "\nResources:";
      for (const t6 of c4) {
        if (!t6 || "string" != typeof t6) throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${t6}`);
        e6 += `
- ${t6}`;
      }
      y5 += e6;
    }
    return `${_5}
${y5}`;
  }, It;
}
function requireWebauthn_errors() {
  if (jt) return Ut;
  jt = 1, Object.defineProperty(Ut, "__esModule", { value: true }), Ut.WebAuthnUnknownError = Ut.WebAuthnError = void 0, Ut.isWebAuthnError = function(e6) {
    return "object" == typeof e6 && null !== e6 && "__isWebAuthnError" in e6;
  }, Ut.identifyRegistrationError = function({ error: t5, options: r4 }) {
    var s3, n3, i4;
    const { publicKey: o5 } = r4;
    if (!o5) throw Error("options was missing required publicKey property");
    if ("AbortError" === t5.name) {
      if (r4.signal instanceof AbortSignal) return new WebAuthnError({ message: "Registration ceremony was sent an abort signal", code: "ERROR_CEREMONY_ABORTED", cause: t5 });
    } else if ("ConstraintError" === t5.name) {
      if (true === (null === (s3 = o5.authenticatorSelection) || void 0 === s3 ? void 0 : s3.requireResidentKey)) return new WebAuthnError({ message: "Discoverable credentials were required but no available authenticator supported it", code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT", cause: t5 });
      if ("conditional" === r4.mediation && "required" === (null === (n3 = o5.authenticatorSelection) || void 0 === n3 ? void 0 : n3.userVerification)) return new WebAuthnError({ message: "User verification was required during automatic registration but it could not be performed", code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE", cause: t5 });
      if ("required" === (null === (i4 = o5.authenticatorSelection) || void 0 === i4 ? void 0 : i4.userVerification)) return new WebAuthnError({ message: "User verification was required but no available authenticator supported it", code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT", cause: t5 });
    } else {
      if ("InvalidStateError" === t5.name) return new WebAuthnError({ message: "The authenticator was previously registered", code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED", cause: t5 });
      if ("NotAllowedError" === t5.name) return new WebAuthnError({ message: t5.message, code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: t5 });
      if ("NotSupportedError" === t5.name) {
        return 0 === o5.pubKeyCredParams.filter((e6) => "public-key" === e6.type).length ? new WebAuthnError({ message: 'No entry in pubKeyCredParams was of type "public-key"', code: "ERROR_MALFORMED_PUBKEYCREDPARAMS", cause: t5 }) : new WebAuthnError({ message: "No available authenticator supported any of the specified pubKeyCredParams algorithms", code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG", cause: t5 });
      }
      if ("SecurityError" === t5.name) {
        const r5 = window.location.hostname;
        if (!(0, e5.isValidDomain)(r5)) return new WebAuthnError({ message: `${window.location.hostname} is an invalid domain`, code: "ERROR_INVALID_DOMAIN", cause: t5 });
        if (o5.rp.id !== r5) return new WebAuthnError({ message: `The RP ID "${o5.rp.id}" is invalid for this domain`, code: "ERROR_INVALID_RP_ID", cause: t5 });
      } else if ("TypeError" === t5.name) {
        if (o5.user.id.byteLength < 1 || o5.user.id.byteLength > 64) return new WebAuthnError({ message: "User ID was not between 1 and 64 characters", code: "ERROR_INVALID_USER_ID_LENGTH", cause: t5 });
      } else if ("UnknownError" === t5.name) return new WebAuthnError({ message: "The authenticator was unable to process the specified options, or could not create a new credential", code: "ERROR_AUTHENTICATOR_GENERAL_ERROR", cause: t5 });
    }
    return new WebAuthnError({ message: "a Non-Webauthn related error has occurred", code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: t5 });
  }, Ut.identifyAuthenticationError = function({ error: t5, options: r4 }) {
    const { publicKey: s3 } = r4;
    if (!s3) throw Error("options was missing required publicKey property");
    if ("AbortError" === t5.name) {
      if (r4.signal instanceof AbortSignal) return new WebAuthnError({ message: "Authentication ceremony was sent an abort signal", code: "ERROR_CEREMONY_ABORTED", cause: t5 });
    } else {
      if ("NotAllowedError" === t5.name) return new WebAuthnError({ message: t5.message, code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: t5 });
      if ("SecurityError" === t5.name) {
        const r5 = window.location.hostname;
        if (!(0, e5.isValidDomain)(r5)) return new WebAuthnError({ message: `${window.location.hostname} is an invalid domain`, code: "ERROR_INVALID_DOMAIN", cause: t5 });
        if (s3.rpId !== r5) return new WebAuthnError({ message: `The RP ID "${s3.rpId}" is invalid for this domain`, code: "ERROR_INVALID_RP_ID", cause: t5 });
      } else if ("UnknownError" === t5.name) return new WebAuthnError({ message: "The authenticator was unable to process the specified options, or could not create a new assertion signature", code: "ERROR_AUTHENTICATOR_GENERAL_ERROR", cause: t5 });
    }
    return new WebAuthnError({ message: "a Non-Webauthn related error has occurred", code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: t5 });
  };
  const e5 = requireWebauthn();
  class WebAuthnError extends Error {
    static {
      __name(this, "WebAuthnError");
    }
    constructor({ message: e6, code: t5, cause: r4, name: s3 }) {
      var n3;
      super(e6, { cause: r4 }), this.__isWebAuthnError = true, this.name = null !== (n3 = null != s3 ? s3 : r4 instanceof Error ? r4.name : void 0) && void 0 !== n3 ? n3 : "Unknown Error", this.code = t5;
    }
    toJSON() {
      return { name: this.name, message: this.message, code: this.code };
    }
  }
  Ut.WebAuthnError = WebAuthnError;
  return Ut.WebAuthnUnknownError = class extends WebAuthnError {
    constructor(e6, t5) {
      super({ code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: t5, message: e6 }), this.name = "WebAuthnUnknownError", this.originalError = t5;
    }
  }, Ut;
}
function requireWebauthn() {
  return Nt || (Nt = 1, (function(e5) {
    Object.defineProperty(e5, "__esModule", { value: true }), e5.WebAuthnApi = e5.DEFAULT_REQUEST_OPTIONS = e5.DEFAULT_CREATION_OPTIONS = e5.webAuthnAbortService = e5.WebAuthnAbortService = e5.identifyAuthenticationError = e5.identifyRegistrationError = e5.isWebAuthnError = e5.WebAuthnError = void 0, e5.deserializeCredentialCreationOptions = function(e6) {
      if (!e6) throw new Error("Credential creation options are required");
      if ("undefined" != typeof PublicKeyCredential && "parseCreationOptionsFromJSON" in PublicKeyCredential && "function" == typeof PublicKeyCredential.parseCreationOptionsFromJSON) return PublicKeyCredential.parseCreationOptionsFromJSON(e6);
      const { challenge: s4, user: n4, excludeCredentials: i5 } = e6, o5 = t5.__rest(e6, ["challenge", "user", "excludeCredentials"]), a4 = (0, r4.base64UrlToUint8Array)(s4).buffer, l4 = Object.assign(Object.assign({}, n4), { id: (0, r4.base64UrlToUint8Array)(n4.id).buffer }), c4 = Object.assign(Object.assign({}, o5), { challenge: a4, user: l4 });
      if (i5 && i5.length > 0) {
        c4.excludeCredentials = new Array(i5.length);
        for (let e7 = 0; e7 < i5.length; e7++) {
          const t6 = i5[e7];
          c4.excludeCredentials[e7] = Object.assign(Object.assign({}, t6), { id: (0, r4.base64UrlToUint8Array)(t6.id).buffer, type: t6.type || "public-key", transports: t6.transports });
        }
      }
      return c4;
    }, e5.deserializeCredentialRequestOptions = function(e6) {
      if (!e6) throw new Error("Credential request options are required");
      if ("undefined" != typeof PublicKeyCredential && "parseRequestOptionsFromJSON" in PublicKeyCredential && "function" == typeof PublicKeyCredential.parseRequestOptionsFromJSON) return PublicKeyCredential.parseRequestOptionsFromJSON(e6);
      const { challenge: s4, allowCredentials: n4 } = e6, i5 = t5.__rest(e6, ["challenge", "allowCredentials"]), o5 = (0, r4.base64UrlToUint8Array)(s4).buffer, a4 = Object.assign(Object.assign({}, i5), { challenge: o5 });
      if (n4 && n4.length > 0) {
        a4.allowCredentials = new Array(n4.length);
        for (let e7 = 0; e7 < n4.length; e7++) {
          const t6 = n4[e7];
          a4.allowCredentials[e7] = Object.assign(Object.assign({}, t6), { id: (0, r4.base64UrlToUint8Array)(t6.id).buffer, type: t6.type || "public-key", transports: t6.transports });
        }
      }
      return a4;
    }, e5.serializeCredentialCreationResponse = function(e6) {
      var t6;
      if ("toJSON" in e6 && "function" == typeof e6.toJSON) return e6.toJSON();
      const s4 = e6;
      return { id: e6.id, rawId: e6.id, response: { attestationObject: (0, r4.bytesToBase64URL)(new Uint8Array(e6.response.attestationObject)), clientDataJSON: (0, r4.bytesToBase64URL)(new Uint8Array(e6.response.clientDataJSON)) }, type: "public-key", clientExtensionResults: e6.getClientExtensionResults(), authenticatorAttachment: null !== (t6 = s4.authenticatorAttachment) && void 0 !== t6 ? t6 : void 0 };
    }, e5.serializeCredentialRequestResponse = function(e6) {
      var t6;
      if ("toJSON" in e6 && "function" == typeof e6.toJSON) return e6.toJSON();
      const s4 = e6, n4 = e6.getClientExtensionResults(), i5 = e6.response;
      return { id: e6.id, rawId: e6.id, response: { authenticatorData: (0, r4.bytesToBase64URL)(new Uint8Array(i5.authenticatorData)), clientDataJSON: (0, r4.bytesToBase64URL)(new Uint8Array(i5.clientDataJSON)), signature: (0, r4.bytesToBase64URL)(new Uint8Array(i5.signature)), userHandle: i5.userHandle ? (0, r4.bytesToBase64URL)(new Uint8Array(i5.userHandle)) : void 0 }, type: "public-key", clientExtensionResults: n4, authenticatorAttachment: null !== (t6 = s4.authenticatorAttachment) && void 0 !== t6 ? t6 : void 0 };
    }, e5.isValidDomain = function(e6) {
      return "localhost" === e6 || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e6);
    }, e5.browserSupportsWebAuthn = browserSupportsWebAuthn, e5.createCredential = createCredential, e5.getCredential = getCredential, e5.mergeCredentialCreationOptions = mergeCredentialCreationOptions, e5.mergeCredentialRequestOptions = mergeCredentialRequestOptions;
    const t5 = p2, r4 = requireBase64url(), s3 = requireErrors(), n3 = requireHelpers(), i4 = requireWebauthn_errors();
    Object.defineProperty(e5, "identifyAuthenticationError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return i4.identifyAuthenticationError;
    }, "get") }), Object.defineProperty(e5, "identifyRegistrationError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return i4.identifyRegistrationError;
    }, "get") }), Object.defineProperty(e5, "isWebAuthnError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return i4.isWebAuthnError;
    }, "get") }), Object.defineProperty(e5, "WebAuthnError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return i4.WebAuthnError;
    }, "get") });
    class WebAuthnAbortService {
      static {
        __name(this, "WebAuthnAbortService");
      }
      createNewAbortSignal() {
        if (this.controller) {
          const e7 = new Error("Cancelling existing WebAuthn API call for new one");
          e7.name = "AbortError", this.controller.abort(e7);
        }
        const e6 = new AbortController();
        return this.controller = e6, e6.signal;
      }
      cancelCeremony() {
        if (this.controller) {
          const e6 = new Error("Manually cancelling existing WebAuthn API call");
          e6.name = "AbortError", this.controller.abort(e6), this.controller = void 0;
        }
      }
    }
    function browserSupportsWebAuthn() {
      var e6, t6;
      return !!((0, n3.isBrowser)() && "PublicKeyCredential" in window && window.PublicKeyCredential && "credentials" in navigator && "function" == typeof (null === (e6 = null === navigator || void 0 === navigator ? void 0 : navigator.credentials) || void 0 === e6 ? void 0 : e6.create) && "function" == typeof (null === (t6 = null === navigator || void 0 === navigator ? void 0 : navigator.credentials) || void 0 === t6 ? void 0 : t6.get));
    }
    __name(browserSupportsWebAuthn, "browserSupportsWebAuthn");
    async function createCredential(e6) {
      try {
        const t6 = await navigator.credentials.create(e6);
        return t6 ? t6 instanceof PublicKeyCredential ? { data: t6, error: null } : { data: null, error: new i4.WebAuthnUnknownError("Browser returned unexpected credential type", t6) } : { data: null, error: new i4.WebAuthnUnknownError("Empty credential response", t6) };
      } catch (t6) {
        return { data: null, error: (0, i4.identifyRegistrationError)({ error: t6, options: e6 }) };
      }
    }
    __name(createCredential, "createCredential");
    async function getCredential(e6) {
      try {
        const t6 = await navigator.credentials.get(e6);
        return t6 ? t6 instanceof PublicKeyCredential ? { data: t6, error: null } : { data: null, error: new i4.WebAuthnUnknownError("Browser returned unexpected credential type", t6) } : { data: null, error: new i4.WebAuthnUnknownError("Empty credential response", t6) };
      } catch (t6) {
        return { data: null, error: (0, i4.identifyAuthenticationError)({ error: t6, options: e6 }) };
      }
    }
    __name(getCredential, "getCredential");
    function deepMerge(...e6) {
      const isObject = /* @__PURE__ */ __name((e7) => null !== e7 && "object" == typeof e7 && !Array.isArray(e7), "isObject"), isArrayBufferLike = /* @__PURE__ */ __name((e7) => e7 instanceof ArrayBuffer || ArrayBuffer.isView(e7), "isArrayBufferLike"), t6 = {};
      for (const r5 of e6) if (r5) for (const e7 in r5) {
        const s4 = r5[e7];
        if (void 0 !== s4) if (Array.isArray(s4)) t6[e7] = s4;
        else if (isArrayBufferLike(s4)) t6[e7] = s4;
        else if (isObject(s4)) {
          const r6 = t6[e7];
          isObject(r6) ? t6[e7] = deepMerge(r6, s4) : t6[e7] = deepMerge(s4);
        } else t6[e7] = s4;
      }
      return t6;
    }
    __name(deepMerge, "deepMerge");
    function mergeCredentialCreationOptions(t6, r5) {
      return deepMerge(e5.DEFAULT_CREATION_OPTIONS, t6, r5 || {});
    }
    __name(mergeCredentialCreationOptions, "mergeCredentialCreationOptions");
    function mergeCredentialRequestOptions(t6, r5) {
      return deepMerge(e5.DEFAULT_REQUEST_OPTIONS, t6, r5 || {});
    }
    __name(mergeCredentialRequestOptions, "mergeCredentialRequestOptions");
    e5.WebAuthnAbortService = WebAuthnAbortService, e5.webAuthnAbortService = new WebAuthnAbortService(), e5.DEFAULT_CREATION_OPTIONS = { hints: ["security-key"], authenticatorSelection: { authenticatorAttachment: "cross-platform", requireResidentKey: false, userVerification: "preferred", residentKey: "discouraged" }, attestation: "direct" }, e5.DEFAULT_REQUEST_OPTIONS = { userVerification: "preferred", hints: ["security-key"], attestation: "direct" };
    e5.WebAuthnApi = class {
      constructor(e6) {
        this.client = e6, this.enroll = this._enroll.bind(this), this.challenge = this._challenge.bind(this), this.verify = this._verify.bind(this), this.authenticate = this._authenticate.bind(this), this.register = this._register.bind(this);
      }
      async _enroll(e6) {
        return this.client.mfa.enroll(Object.assign(Object.assign({}, e6), { factorType: "webauthn" }));
      }
      async _challenge({ factorId: t6, webauthn: r5, friendlyName: n4, signal: i5 }, o5) {
        var a4;
        try {
          const { data: s4, error: l4 } = await this.client.mfa.challenge({ factorId: t6, webauthn: r5 });
          if (!s4) return { data: null, error: l4 };
          const c4 = null != i5 ? i5 : e5.webAuthnAbortService.createNewAbortSignal();
          if ("create" === s4.webauthn.type) {
            const { user: e6 } = s4.webauthn.credential_options.publicKey;
            if (!e6.name) {
              const t7 = n4;
              if (t7) e6.name = `${e6.id}:${t7}`;
              else {
                const t8 = (await this.client.getUser()).data.user, r6 = (null === (a4 = null == t8 ? void 0 : t8.user_metadata) || void 0 === a4 ? void 0 : a4.name) || (null == t8 ? void 0 : t8.email) || (null == t8 ? void 0 : t8.id) || "User";
                e6.name = `${e6.id}:${r6}`;
              }
            }
            e6.displayName || (e6.displayName = e6.name);
          }
          switch (s4.webauthn.type) {
            case "create": {
              const e6 = mergeCredentialCreationOptions(s4.webauthn.credential_options.publicKey, null == o5 ? void 0 : o5.create), { data: r6, error: n5 } = await createCredential({ publicKey: e6, signal: c4 });
              return r6 ? { data: { factorId: t6, challengeId: s4.id, webauthn: { type: s4.webauthn.type, credential_response: r6 } }, error: null } : { data: null, error: n5 };
            }
            case "request": {
              const e6 = mergeCredentialRequestOptions(s4.webauthn.credential_options.publicKey, null == o5 ? void 0 : o5.request), { data: r6, error: n5 } = await getCredential(Object.assign(Object.assign({}, s4.webauthn.credential_options), { publicKey: e6, signal: c4 }));
              return r6 ? { data: { factorId: t6, challengeId: s4.id, webauthn: { type: s4.webauthn.type, credential_response: r6 } }, error: null } : { data: null, error: n5 };
            }
          }
        } catch (e6) {
          return (0, s3.isAuthError)(e6) ? { data: null, error: e6 } : { data: null, error: new s3.AuthUnknownError("Unexpected error in challenge", e6) };
        }
      }
      async _verify({ challengeId: e6, factorId: t6, webauthn: r5 }) {
        return this.client.mfa.verify({ factorId: t6, challengeId: e6, webauthn: r5 });
      }
      async _authenticate({ factorId: e6, webauthn: { rpId: t6, rpOrigins: r5, signal: n4 } = {} }, i5) {
        if (!t6) return { data: null, error: new s3.AuthError("rpId is required for WebAuthn authentication") };
        try {
          if (!browserSupportsWebAuthn()) return { data: null, error: new s3.AuthUnknownError("Browser does not support WebAuthn", null) };
          const { data: o5, error: a4 } = await this.challenge({ factorId: e6, webauthn: { rpId: t6, rpOrigins: r5 }, signal: n4 }, { request: i5 });
          if (!o5) return { data: null, error: a4 };
          const { webauthn: l4 } = o5;
          return this._verify({ factorId: e6, challengeId: o5.challengeId, webauthn: { type: l4.type, rpId: t6, rpOrigins: r5, credential_response: l4.credential_response } });
        } catch (e7) {
          return (0, s3.isAuthError)(e7) ? { data: null, error: e7 } : { data: null, error: new s3.AuthUnknownError("Unexpected error in authenticate", e7) };
        }
      }
      async _register({ friendlyName: e6, webauthn: { rpId: t6, rpOrigins: r5, signal: n4 } = {} }, i5) {
        if (!t6) return { data: null, error: new s3.AuthError("rpId is required for WebAuthn registration") };
        try {
          if (!browserSupportsWebAuthn()) return { data: null, error: new s3.AuthUnknownError("Browser does not support WebAuthn", null) };
          const { data: o5, error: a4 } = await this._enroll({ friendlyName: e6 });
          if (!o5) return await this.client.mfa.listFactors().then((t7) => {
            var r6;
            return null === (r6 = t7.data) || void 0 === r6 ? void 0 : r6.all.find((t8) => "webauthn" === t8.factor_type && t8.friendly_name === e6 && "unverified" !== t8.status);
          }).then((e7) => e7 ? this.client.mfa.unenroll({ factorId: null == e7 ? void 0 : e7.id }) : void 0), { data: null, error: a4 };
          const { data: l4, error: c4 } = await this._challenge({ factorId: o5.id, friendlyName: o5.friendly_name, webauthn: { rpId: t6, rpOrigins: r5 }, signal: n4 }, { create: i5 });
          return l4 ? this._verify({ factorId: o5.id, challengeId: l4.challengeId, webauthn: { rpId: t6, rpOrigins: r5, type: l4.webauthn.type, credential_response: l4.webauthn.credential_response } }) : { data: null, error: c4 };
        } catch (e7) {
          return (0, s3.isAuthError)(e7) ? { data: null, error: e7 } : { data: null, error: new s3.AuthUnknownError("Unexpected error in register", e7) };
        }
      }
    };
  })(Lt)), Lt;
}
function requireGoTrueClient() {
  if ($t) return At;
  $t = 1, Object.defineProperty(At, "__esModule", { value: true });
  const e5 = p2.__importDefault(requireGoTrueAdminApi()), t5 = requireConstants(), r4 = requireErrors(), s3 = requireFetch(), n3 = requireHelpers(), i4 = requireLocalStorage(), o5 = requireLocks(), a4 = requirePolyfills(), l4 = requireVersion(), c4 = requireBase64url(), u4 = requireEthereum(), h5 = requireWebauthn();
  (0, a4.polyfillGlobalThis)();
  const d5 = { url: t5.GOTRUE_URL, storageKey: t5.STORAGE_KEY, autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, headers: t5.DEFAULT_HEADERS, flowType: "implicit", debug: false, hasCustomAuthorizationHeader: false, throwOnError: false, lockAcquireTimeout: 5e3, skipAutoInitialize: false, experimental: {} }, f4 = {};
  let g4 = class GoTrueClient {
    static {
      __name(this, "GoTrueClient");
    }
    get jwks() {
      var e6, t6;
      return null !== (t6 = null === (e6 = f4[this.storageKey]) || void 0 === e6 ? void 0 : e6.jwks) && void 0 !== t6 ? t6 : { keys: [] };
    }
    set jwks(e6) {
      f4[this.storageKey] = Object.assign(Object.assign({}, f4[this.storageKey]), { jwks: e6 });
    }
    get jwks_cached_at() {
      var e6, t6;
      return null !== (t6 = null === (e6 = f4[this.storageKey]) || void 0 === e6 ? void 0 : e6.cachedAt) && void 0 !== t6 ? t6 : Number.MIN_SAFE_INTEGER;
    }
    set jwks_cached_at(e6) {
      f4[this.storageKey] = Object.assign(Object.assign({}, f4[this.storageKey]), { cachedAt: e6 });
    }
    constructor(t6) {
      var r5, s4, o6;
      this.userStorage = null, this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.autoRefreshTickTimeout = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.lastRefreshFailure = null, this._sessionRemovalEpoch = 0, this.initializePromise = null, this._pendingInitNotifications = null, this.detectSessionInUrl = true, this.hasCustomAuthorizationHeader = false, this.suppressGetSessionWarning = false, this.lock = null, this.lockAcquired = false, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log;
      const a5 = Object.assign(Object.assign({}, d5), t6);
      if (this.storageKey = a5.storageKey, this.instanceID = null !== (r5 = GoTrueClient.nextInstanceID[this.storageKey]) && void 0 !== r5 ? r5 : 0, GoTrueClient.nextInstanceID[this.storageKey] = this.instanceID + 1, this.logDebugMessages = !!a5.debug, "function" == typeof a5.debug && (this.logger = a5.debug), this.instanceID > 0 && (0, n3.isBrowser)()) {
        const e6 = `${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;
        console.warn(e6), this.logDebugMessages && console.trace(e6);
      }
      if (this.persistSession = a5.persistSession, this.autoRefreshToken = a5.autoRefreshToken, this.experimental = null !== (s4 = a5.experimental) && void 0 !== s4 ? s4 : {}, this.admin = new e5.default({ url: a5.url, headers: a5.headers, fetch: a5.fetch, experimental: this.experimental }), this.url = a5.url, this.headers = a5.headers, this.fetch = (0, n3.resolveFetch)(a5.fetch), this.detectSessionInUrl = a5.detectSessionInUrl, this.flowType = a5.flowType, this.hasCustomAuthorizationHeader = a5.hasCustomAuthorizationHeader, this.throwOnError = a5.throwOnError, this.lockAcquireTimeout = a5.lockAcquireTimeout, null != a5.lock && (this.lock = a5.lock), this.jwks || (this.jwks = { keys: [] }, this.jwks_cached_at = Number.MIN_SAFE_INTEGER), this.mfa = { verify: this._verify.bind(this), enroll: this._enroll.bind(this), unenroll: this._unenroll.bind(this), challenge: this._challenge.bind(this), listFactors: this._listFactors.bind(this), challengeAndVerify: this._challengeAndVerify.bind(this), getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this), webauthn: new h5.WebAuthnApi(this) }, this.oauth = { getAuthorizationDetails: this._getAuthorizationDetails.bind(this), approveAuthorization: this._approveAuthorization.bind(this), denyAuthorization: this._denyAuthorization.bind(this), listGrants: this._listOAuthGrants.bind(this), revokeGrant: this._revokeOAuthGrant.bind(this) }, this.passkey = { startRegistration: this._startPasskeyRegistration.bind(this), verifyRegistration: this._verifyPasskeyRegistration.bind(this), startAuthentication: this._startPasskeyAuthentication.bind(this), verifyAuthentication: this._verifyPasskeyAuthentication.bind(this), list: this._listPasskeys.bind(this), update: this._updatePasskey.bind(this), delete: this._deletePasskey.bind(this) }, this.persistSession ? (a5.storage ? this.storage = a5.storage : (0, n3.supportsLocalStorage)() ? this.storage = globalThis.localStorage : (this.memoryStorage = {}, this.storage = (0, i4.memoryLocalStorageAdapter)(this.memoryStorage)), a5.userStorage && (this.userStorage = a5.userStorage)) : (this.memoryStorage = {}, this.storage = (0, i4.memoryLocalStorageAdapter)(this.memoryStorage)), (0, n3.isBrowser)() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
        try {
          this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
        } catch (e6) {
          console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e6);
        }
        null === (o6 = this.broadcastChannel) || void 0 === o6 || o6.addEventListener("message", async (e6) => {
          this._debug("received broadcast notification from other tab or client", e6), "TOKEN_REFRESHED" !== e6.data.event && "SIGNED_IN" !== e6.data.event || (this.lastRefreshFailure = null);
          try {
            await this._notifyAllSubscribers(e6.data.event, e6.data.session, false);
          } catch (e7) {
            this._debug("#broadcastChannel", "error", e7);
          }
        });
      }
      a5.skipAutoInitialize || this.initialize().catch((e6) => {
        this._debug("#initialize()", "error", e6);
      });
    }
    isThrowOnErrorEnabled() {
      return this.throwOnError;
    }
    _returnResult(e6) {
      if (this.throwOnError && e6 && e6.error) throw e6.error;
      return e6;
    }
    _logPrefix() {
      return `GoTrueClient@${this.storageKey}:${this.instanceID} (${l4.version}) ${(/* @__PURE__ */ new Date()).toISOString()}`;
    }
    _debug(...e6) {
      return this.logDebugMessages && this.logger(this._logPrefix(), ...e6), this;
    }
    async initialize() {
      var e6;
      if (this.initializePromise) return await this.initializePromise;
      this._pendingInitNotifications = [], this.initializePromise = (async () => null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._initialize()) : await this._initialize())();
      const t6 = await this.initializePromise, r5 = null !== (e6 = this._pendingInitNotifications) && void 0 !== e6 ? e6 : [];
      this._pendingInitNotifications = null;
      for (const e7 of r5) await this._notifyAllSubscribers(e7.event, e7.session, e7.broadcast);
      return t6;
    }
    async _initialize() {
      var e6;
      try {
        let t6 = {}, s4 = "none";
        if ((0, n3.isBrowser)() && (t6 = (0, n3.parseParametersFromURL)(window.location.href), this._isImplicitGrantCallback(t6) ? s4 = "implicit" : await this._isPKCECallback(t6) && (s4 = "pkce")), (0, n3.isBrowser)() && this.detectSessionInUrl && "none" !== s4) {
          const { data: n4, error: i5 } = await this._getSessionFromURL(t6, s4);
          if (i5) {
            if (this._debug("#_initialize()", "error detecting session from URL", i5), (0, r4.isAuthImplicitGrantRedirectError)(i5)) {
              const t7 = null === (e6 = i5.details) || void 0 === e6 ? void 0 : e6.code;
              if ("identity_already_exists" === t7 || "identity_not_found" === t7 || "single_identity_not_deletable" === t7) return { error: i5 };
            }
            return { error: i5 };
          }
          const { session: o6, redirectType: a5 } = n4;
          return this._debug("#_initialize()", "detected session in URL", o6, "redirect type", a5), await this._saveSession(o6), setTimeout(async () => {
            "recovery" === a5 ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", o6) : await this._notifyAllSubscribers("SIGNED_IN", o6);
          }, 0), { error: null };
        }
        return await this._recoverAndRefresh(), { error: null };
      } catch (e7) {
        return (0, r4.isAuthError)(e7) ? this._returnResult({ error: e7 }) : this._returnResult({ error: new r4.AuthUnknownError("Unexpected error during initialization", e7) });
      } finally {
        await this._handleVisibilityChange(), this._debug("#_initialize()", "end");
      }
    }
    async signInAnonymously(e6) {
      var t6, n4, i5;
      try {
        const r5 = await (0, s3._request)(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { data: null !== (n4 = null === (t6 = null == e6 ? void 0 : e6.options) || void 0 === t6 ? void 0 : t6.data) && void 0 !== n4 ? n4 : {}, gotrue_meta_security: { captcha_token: null === (i5 = null == e6 ? void 0 : e6.options) || void 0 === i5 ? void 0 : i5.captchaToken } }, xform: s3._sessionResponse }), { data: o6, error: a5 } = r5;
        if (a5 || !o6) return this._returnResult({ data: { user: null, session: null }, error: a5 });
        const l5 = o6.session, c5 = o6.user;
        return o6.session && (await this._saveSession(o6.session), await this._notifyAllSubscribers("SIGNED_IN", l5)), this._returnResult({ data: { user: c5, session: l5 }, error: null });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: { user: null, session: null }, error: e7 });
        throw e7;
      }
    }
    async signUp(e6) {
      var t6, i5, o6;
      let a5 = null;
      try {
        let l5;
        if ("email" in e6) {
          const { email: r5, password: n4, options: i6 } = e6;
          let o7 = null, c6 = null;
          "pkce" === this.flowType && ([o7, c6, a5] = await this._getCodeChallengeAndMethod()), l5 = await (0, s3._request)(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, redirectTo: this._maybeAppendFlowIdToRedirect(null == i6 ? void 0 : i6.emailRedirectTo, a5), body: { email: r5, password: n4, data: null !== (t6 = null == i6 ? void 0 : i6.data) && void 0 !== t6 ? t6 : {}, gotrue_meta_security: { captcha_token: null == i6 ? void 0 : i6.captchaToken }, code_challenge: o7, code_challenge_method: c6 }, xform: s3._sessionResponse });
        } else {
          if (!("phone" in e6)) throw new r4.AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
          {
            const { phone: t7, password: r5, options: n4 } = e6;
            l5 = await (0, s3._request)(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { phone: t7, password: r5, data: null !== (i5 = null == n4 ? void 0 : n4.data) && void 0 !== i5 ? i5 : {}, channel: null !== (o6 = null == n4 ? void 0 : n4.channel) && void 0 !== o6 ? o6 : "sms", gotrue_meta_security: { captcha_token: null == n4 ? void 0 : n4.captchaToken } }, xform: s3._sessionResponse });
          }
        }
        const { data: c5, error: u5 } = l5;
        if (u5 || !c5) return await (0, n3.removePKCEVerifier)(this.storage, this.storageKey, a5), this._returnResult({ data: { user: null, session: null }, error: u5 });
        const h6 = c5.session, d6 = c5.user;
        return c5.session && (await this._saveSession(c5.session), await this._notifyAllSubscribers("SIGNED_IN", h6)), this._returnResult({ data: { user: d6, session: h6 }, error: null });
      } catch (e7) {
        if (await (0, n3.removePKCEVerifier)(this.storage, this.storageKey, a5), (0, r4.isAuthError)(e7)) return this._returnResult({ data: { user: null, session: null }, error: e7 });
        throw e7;
      }
    }
    async signInWithPassword(e6) {
      try {
        let t6;
        if ("email" in e6) {
          const { email: r5, password: n5, options: i6 } = e6;
          t6 = await (0, s3._request)(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { email: r5, password: n5, gotrue_meta_security: { captcha_token: null == i6 ? void 0 : i6.captchaToken } }, xform: s3._sessionResponsePassword });
        } else {
          if (!("phone" in e6)) throw new r4.AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
          {
            const { phone: r5, password: n5, options: i6 } = e6;
            t6 = await (0, s3._request)(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { phone: r5, password: n5, gotrue_meta_security: { captcha_token: null == i6 ? void 0 : i6.captchaToken } }, xform: s3._sessionResponsePassword });
          }
        }
        const { data: n4, error: i5 } = t6;
        if (i5) return this._returnResult({ data: { user: null, session: null }, error: i5 });
        if (!n4 || !n4.session || !n4.user) {
          const e7 = new r4.AuthInvalidTokenResponseError();
          return this._returnResult({ data: { user: null, session: null }, error: e7 });
        }
        return n4.session && (await this._saveSession(n4.session), await this._notifyAllSubscribers("SIGNED_IN", n4.session)), this._returnResult({ data: Object.assign({ user: n4.user, session: n4.session }, n4.weak_password ? { weakPassword: n4.weak_password } : null), error: i5 });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: { user: null, session: null }, error: e7 });
        throw e7;
      }
    }
    async signInWithOAuth(e6) {
      var t6, r5, s4, n4;
      return await this._handleProviderSignIn(e6.provider, { redirectTo: null === (t6 = e6.options) || void 0 === t6 ? void 0 : t6.redirectTo, scopes: null === (r5 = e6.options) || void 0 === r5 ? void 0 : r5.scopes, queryParams: null === (s4 = e6.options) || void 0 === s4 ? void 0 : s4.queryParams, skipBrowserRedirect: null === (n4 = e6.options) || void 0 === n4 ? void 0 : n4.skipBrowserRedirect });
    }
    async exchangeCodeForSession(e6, t6) {
      return await this.initializePromise, null != this.lock ? this._acquireLock(this.lockAcquireTimeout, async () => this._exchangeCodeForSession(e6, t6)) : this._exchangeCodeForSession(e6, t6);
    }
    async signInWithWeb3(e6) {
      const { chain: t6 } = e6;
      switch (t6) {
        case "ethereum":
          return await this.signInWithEthereum(e6);
        case "solana":
          return await this.signInWithSolana(e6);
        default:
          throw new Error(`@supabase/auth-js: Unsupported chain "${t6}"`);
      }
    }
    async signInWithEthereum(e6) {
      var t6, i5, o6, a5, l5, c5, h6, d6, p4, f5, g5;
      let _5, y5;
      if ("message" in e6) _5 = e6.message, y5 = e6.signature;
      else {
        const { chain: r5, wallet: s4, statement: f6, options: g6 } = e6;
        let m5;
        if ((0, n3.isBrowser)()) if ("object" == typeof s4) m5 = s4;
        else {
          const e7 = window;
          if (!("ethereum" in e7) || "object" != typeof e7.ethereum || !("request" in e7.ethereum) || "function" != typeof e7.ethereum.request) throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.");
          m5 = e7.ethereum;
        }
        else {
          if ("object" != typeof s4 || !(null == g6 ? void 0 : g6.url)) throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
          m5 = s4;
        }
        const b5 = new URL(null !== (t6 = null == g6 ? void 0 : g6.url) && void 0 !== t6 ? t6 : window.location.href), w5 = await m5.request({ method: "eth_requestAccounts" }).then((e7) => e7).catch(() => {
          throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid");
        });
        if (!w5 || 0 === w5.length) throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");
        const v5 = (0, u4.getAddress)(w5[0]);
        let E5 = null === (i5 = null == g6 ? void 0 : g6.signInWithEthereum) || void 0 === i5 ? void 0 : i5.chainId;
        if (!E5) {
          const e7 = await m5.request({ method: "eth_chainId" });
          E5 = (0, u4.fromHex)(e7);
        }
        const S5 = { domain: b5.host, address: v5, statement: f6, uri: b5.href, version: "1", chainId: E5, nonce: null === (o6 = null == g6 ? void 0 : g6.signInWithEthereum) || void 0 === o6 ? void 0 : o6.nonce, issuedAt: null !== (l5 = null === (a5 = null == g6 ? void 0 : g6.signInWithEthereum) || void 0 === a5 ? void 0 : a5.issuedAt) && void 0 !== l5 ? l5 : /* @__PURE__ */ new Date(), expirationTime: null === (c5 = null == g6 ? void 0 : g6.signInWithEthereum) || void 0 === c5 ? void 0 : c5.expirationTime, notBefore: null === (h6 = null == g6 ? void 0 : g6.signInWithEthereum) || void 0 === h6 ? void 0 : h6.notBefore, requestId: null === (d6 = null == g6 ? void 0 : g6.signInWithEthereum) || void 0 === d6 ? void 0 : d6.requestId, resources: null === (p4 = null == g6 ? void 0 : g6.signInWithEthereum) || void 0 === p4 ? void 0 : p4.resources };
        _5 = (0, u4.createSiweMessage)(S5), y5 = await m5.request({ method: "personal_sign", params: [(0, u4.toHex)(_5), v5] });
      }
      try {
        const { data: t7, error: n4 } = await (0, s3._request)(this.fetch, "POST", `${this.url}/token?grant_type=web3`, { headers: this.headers, body: Object.assign({ chain: "ethereum", message: _5, signature: y5 }, (null === (f5 = e6.options) || void 0 === f5 ? void 0 : f5.captchaToken) ? { gotrue_meta_security: { captcha_token: null === (g5 = e6.options) || void 0 === g5 ? void 0 : g5.captchaToken } } : null), xform: s3._sessionResponse });
        if (n4) throw n4;
        if (!t7 || !t7.session || !t7.user) {
          const e7 = new r4.AuthInvalidTokenResponseError();
          return this._returnResult({ data: { user: null, session: null }, error: e7 });
        }
        return t7.session && (await this._saveSession(t7.session), await this._notifyAllSubscribers("SIGNED_IN", t7.session)), this._returnResult({ data: Object.assign({}, t7), error: n4 });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: { user: null, session: null }, error: e7 });
        throw e7;
      }
    }
    async signInWithSolana(e6) {
      var t6, i5, o6, a5, l5, u5, h6, d6, p4, f5, g5, _5;
      let y5, m5;
      if ("message" in e6) y5 = e6.message, m5 = e6.signature;
      else {
        const { chain: r5, wallet: s4, statement: c5, options: g6 } = e6;
        let _6;
        if ((0, n3.isBrowser)()) if ("object" == typeof s4) _6 = s4;
        else {
          const e7 = window;
          if (!("solana" in e7) || "object" != typeof e7.solana || !("signIn" in e7.solana && "function" == typeof e7.solana.signIn || "signMessage" in e7.solana && "function" == typeof e7.solana.signMessage)) throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.");
          _6 = e7.solana;
        }
        else {
          if ("object" != typeof s4 || !(null == g6 ? void 0 : g6.url)) throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
          _6 = s4;
        }
        const b5 = new URL(null !== (t6 = null == g6 ? void 0 : g6.url) && void 0 !== t6 ? t6 : window.location.href);
        if ("signIn" in _6 && _6.signIn) {
          const e7 = await _6.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, null == g6 ? void 0 : g6.signInWithSolana), { version: "1", domain: b5.host, uri: b5.href }), c5 ? { statement: c5 } : null));
          let t7;
          if (Array.isArray(e7) && e7[0] && "object" == typeof e7[0]) t7 = e7[0];
          else {
            if (!(e7 && "object" == typeof e7 && "signedMessage" in e7 && "signature" in e7)) throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
            t7 = e7;
          }
          if (!("signedMessage" in t7 && "signature" in t7 && ("string" == typeof t7.signedMessage || t7.signedMessage instanceof Uint8Array) && t7.signature instanceof Uint8Array)) throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
          y5 = "string" == typeof t7.signedMessage ? t7.signedMessage : new TextDecoder().decode(t7.signedMessage), m5 = t7.signature;
        } else {
          if (!("signMessage" in _6 && "function" == typeof _6.signMessage && "publicKey" in _6 && "object" == typeof _6 && _6.publicKey && "toBase58" in _6.publicKey && "function" == typeof _6.publicKey.toBase58)) throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
          y5 = [`${b5.host} wants you to sign in with your Solana account:`, _6.publicKey.toBase58(), ...c5 ? ["", c5, ""] : [""], "Version: 1", `URI: ${b5.href}`, `Issued At: ${null !== (o6 = null === (i5 = null == g6 ? void 0 : g6.signInWithSolana) || void 0 === i5 ? void 0 : i5.issuedAt) && void 0 !== o6 ? o6 : (/* @__PURE__ */ new Date()).toISOString()}`, ...(null === (a5 = null == g6 ? void 0 : g6.signInWithSolana) || void 0 === a5 ? void 0 : a5.notBefore) ? [`Not Before: ${g6.signInWithSolana.notBefore}`] : [], ...(null === (l5 = null == g6 ? void 0 : g6.signInWithSolana) || void 0 === l5 ? void 0 : l5.expirationTime) ? [`Expiration Time: ${g6.signInWithSolana.expirationTime}`] : [], ...(null === (u5 = null == g6 ? void 0 : g6.signInWithSolana) || void 0 === u5 ? void 0 : u5.chainId) ? [`Chain ID: ${g6.signInWithSolana.chainId}`] : [], ...(null === (h6 = null == g6 ? void 0 : g6.signInWithSolana) || void 0 === h6 ? void 0 : h6.nonce) ? [`Nonce: ${g6.signInWithSolana.nonce}`] : [], ...(null === (d6 = null == g6 ? void 0 : g6.signInWithSolana) || void 0 === d6 ? void 0 : d6.requestId) ? [`Request ID: ${g6.signInWithSolana.requestId}`] : [], ...(null === (f5 = null === (p4 = null == g6 ? void 0 : g6.signInWithSolana) || void 0 === p4 ? void 0 : p4.resources) || void 0 === f5 ? void 0 : f5.length) ? ["Resources", ...g6.signInWithSolana.resources.map((e8) => `- ${e8}`)] : []].join("\n");
          const e7 = await _6.signMessage(new TextEncoder().encode(y5), "utf8");
          if (!(e7 && e7 instanceof Uint8Array)) throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
          m5 = e7;
        }
      }
      try {
        const { data: t7, error: n4 } = await (0, s3._request)(this.fetch, "POST", `${this.url}/token?grant_type=web3`, { headers: this.headers, body: Object.assign({ chain: "solana", message: y5, signature: (0, c4.bytesToBase64URL)(m5) }, (null === (g5 = e6.options) || void 0 === g5 ? void 0 : g5.captchaToken) ? { gotrue_meta_security: { captcha_token: null === (_5 = e6.options) || void 0 === _5 ? void 0 : _5.captchaToken } } : null), xform: s3._sessionResponse });
        if (n4) throw n4;
        if (!t7 || !t7.session || !t7.user) {
          const e7 = new r4.AuthInvalidTokenResponseError();
          return this._returnResult({ data: { user: null, session: null }, error: e7 });
        }
        return t7.session && (await this._saveSession(t7.session), await this._notifyAllSubscribers("SIGNED_IN", t7.session)), this._returnResult({ data: Object.assign({}, t7), error: n4 });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: { user: null, session: null }, error: e7 });
        throw e7;
      }
    }
    async _exchangeCodeForSession(e6, i5) {
      const o6 = null != (null == i5 ? void 0 : i5.flowId), a5 = o6 ? (0, n3.validatePKCEFlowId)(null == i5 ? void 0 : i5.flowId) : (0, n3.isBrowser)() ? (0, n3.validatePKCEFlowId)((0, n3.parseParametersFromURL)(window.location.href)[t5.PKCE_FLOW_ID_PARAM]) : null;
      o6 && !a5 && this._debug("#_exchangeCodeForSession()", "provided flowId is not a valid flow id", null == i5 ? void 0 : i5.flowId);
      const { verifier: l5, flowId: c5 } = o6 && !a5 ? { verifier: null, flowId: null } : await (0, n3.retrievePKCEVerifier)(this.storage, this.storageKey, a5), [u5, h6] = (null != l5 ? l5 : "").split("/");
      try {
        if (!u5 && "pkce" === this.flowType) throw new r4.AuthPKCECodeVerifierMissingError();
        const { data: t6, error: i6 } = await (0, s3._request)(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, { headers: this.headers, body: { auth_code: e6, code_verifier: u5 }, xform: s3._sessionResponse });
        if (await (0, n3.removePKCEVerifier)(this.storage, this.storageKey, c5), i6) throw i6;
        if (!t6 || !t6.session || !t6.user) {
          const e7 = new r4.AuthInvalidTokenResponseError();
          return this._returnResult({ data: { user: null, session: null, redirectType: null }, error: e7 });
        }
        return t6.session && (await this._saveSession(t6.session), await this._notifyAllSubscribers("recovery" === h6 ? "PASSWORD_RECOVERY" : "SIGNED_IN", t6.session)), this._returnResult({ data: Object.assign(Object.assign({}, t6), { redirectType: null != h6 ? h6 : null }), error: i6 });
      } catch (e7) {
        if (await (0, n3.removePKCEVerifier)(this.storage, this.storageKey, c5), (0, r4.isAuthError)(e7)) return this._returnResult({ data: { user: null, session: null, redirectType: null }, error: e7 });
        throw e7;
      }
    }
    async signInWithIdToken(e6) {
      try {
        const { options: t6, provider: n4, token: i5, access_token: o6, nonce: a5 } = e6, l5 = await (0, s3._request)(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, body: { provider: n4, id_token: i5, access_token: o6, nonce: a5, gotrue_meta_security: { captcha_token: null == t6 ? void 0 : t6.captchaToken } }, xform: s3._sessionResponse }), { data: c5, error: u5 } = l5;
        if (u5) return this._returnResult({ data: { user: null, session: null }, error: u5 });
        if (!c5 || !c5.session || !c5.user) {
          const e7 = new r4.AuthInvalidTokenResponseError();
          return this._returnResult({ data: { user: null, session: null }, error: e7 });
        }
        return c5.session && (await this._saveSession(c5.session), await this._notifyAllSubscribers("SIGNED_IN", c5.session)), this._returnResult({ data: c5, error: u5 });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: { user: null, session: null }, error: e7 });
        throw e7;
      }
    }
    async signInWithOtp(e6) {
      var t6, i5, o6, a5, l5;
      let c5 = null;
      try {
        if ("email" in e6) {
          const { email: r5, options: n4 } = e6;
          let o7 = null, a6 = null;
          "pkce" === this.flowType && ([o7, a6, c5] = await this._getCodeChallengeAndMethod());
          const { error: l6 } = await (0, s3._request)(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { email: r5, data: null !== (t6 = null == n4 ? void 0 : n4.data) && void 0 !== t6 ? t6 : {}, create_user: null === (i5 = null == n4 ? void 0 : n4.shouldCreateUser) || void 0 === i5 || i5, gotrue_meta_security: { captcha_token: null == n4 ? void 0 : n4.captchaToken }, code_challenge: o7, code_challenge_method: a6 }, redirectTo: this._maybeAppendFlowIdToRedirect(null == n4 ? void 0 : n4.emailRedirectTo, c5) });
          return this._returnResult({ data: { user: null, session: null }, error: l6 });
        }
        if ("phone" in e6) {
          const { phone: t7, options: r5 } = e6, { data: n4, error: i6 } = await (0, s3._request)(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { phone: t7, data: null !== (o6 = null == r5 ? void 0 : r5.data) && void 0 !== o6 ? o6 : {}, create_user: null === (a5 = null == r5 ? void 0 : r5.shouldCreateUser) || void 0 === a5 || a5, gotrue_meta_security: { captcha_token: null == r5 ? void 0 : r5.captchaToken }, channel: null !== (l5 = null == r5 ? void 0 : r5.channel) && void 0 !== l5 ? l5 : "sms" } });
          return this._returnResult({ data: { user: null, session: null, messageId: null == n4 ? void 0 : n4.message_id }, error: i6 });
        }
        throw new r4.AuthInvalidCredentialsError("You must provide either an email or phone number.");
      } catch (e7) {
        if (await (0, n3.removePKCEVerifier)(this.storage, this.storageKey, c5), (0, r4.isAuthError)(e7)) return this._returnResult({ data: { user: null, session: null }, error: e7 });
        throw e7;
      }
    }
    async verifyOtp(e6) {
      var t6, n4;
      try {
        let r5, i5;
        "options" in e6 && (r5 = null === (t6 = e6.options) || void 0 === t6 ? void 0 : t6.redirectTo, i5 = null === (n4 = e6.options) || void 0 === n4 ? void 0 : n4.captchaToken);
        const { data: o6, error: a5 } = await (0, s3._request)(this.fetch, "POST", `${this.url}/verify`, { headers: this.headers, body: Object.assign(Object.assign({}, e6), { gotrue_meta_security: { captcha_token: i5 } }), redirectTo: r5, xform: s3._sessionResponse });
        if (a5) throw a5;
        if (!o6) {
          throw new Error("An error occurred on token verification.");
        }
        const l5 = o6.session, c5 = o6.user;
        return (null == l5 ? void 0 : l5.access_token) && (await this._saveSession(l5), await this._notifyAllSubscribers("recovery" == e6.type ? "PASSWORD_RECOVERY" : "SIGNED_IN", l5)), this._returnResult({ data: { user: c5, session: l5 }, error: null });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: { user: null, session: null }, error: e7 });
        throw e7;
      }
    }
    async signInWithSSO(e6) {
      var t6, i5, o6, a5;
      let l5 = null;
      try {
        let r5 = null, c5 = null;
        "pkce" === this.flowType && ([r5, c5, l5] = await this._getCodeChallengeAndMethod());
        const u5 = await (0, s3._request)(this.fetch, "POST", `${this.url}/sso`, { body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e6 ? { provider_id: e6.providerId } : null), "domain" in e6 ? { domain: e6.domain } : null), { redirect_to: this._maybeAppendFlowIdToRedirect(null === (t6 = e6.options) || void 0 === t6 ? void 0 : t6.redirectTo, l5) }), (null === (i5 = null == e6 ? void 0 : e6.options) || void 0 === i5 ? void 0 : i5.captchaToken) ? { gotrue_meta_security: { captcha_token: e6.options.captchaToken } } : null), { skip_http_redirect: true, code_challenge: r5, code_challenge_method: c5 }), headers: this.headers, xform: s3._ssoResponse });
        return (null === (o6 = u5.data) || void 0 === o6 ? void 0 : o6.url) && (0, n3.isBrowser)() && !(null === (a5 = e6.options) || void 0 === a5 ? void 0 : a5.skipBrowserRedirect) && window.location.assign(u5.data.url), this._returnResult(u5);
      } catch (e7) {
        if (await (0, n3.removePKCEVerifier)(this.storage, this.storageKey, l5), (0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async reauthenticate() {
      return await this.initializePromise, null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._reauthenticate()) : await this._reauthenticate();
    }
    async _reauthenticate() {
      try {
        return await this._useSession(async (e6) => {
          const { data: { session: t6 }, error: n4 } = e6;
          if (n4) throw n4;
          if (!t6) throw new r4.AuthSessionMissingError();
          const { error: i5 } = await (0, s3._request)(this.fetch, "GET", `${this.url}/reauthenticate`, { headers: this.headers, jwt: t6.access_token });
          return this._returnResult({ data: { user: null, session: null }, error: i5 });
        });
      } catch (e6) {
        if ((0, r4.isAuthError)(e6)) return this._returnResult({ data: { user: null, session: null }, error: e6 });
        throw e6;
      }
    }
    async resend(e6) {
      let t6 = null;
      try {
        const i5 = `${this.url}/resend`;
        if ("email" in e6) {
          const { email: r5, type: o6, options: a5 } = e6;
          let l5 = null, c5 = null;
          "pkce" === this.flowType && ([l5, c5, t6] = await this._getCodeChallengeAndMethod());
          const { error: u5 } = await (0, s3._request)(this.fetch, "POST", i5, { headers: this.headers, body: { email: r5, type: o6, gotrue_meta_security: { captcha_token: null == a5 ? void 0 : a5.captchaToken }, code_challenge: l5, code_challenge_method: c5 }, redirectTo: this._maybeAppendFlowIdToRedirect(null == a5 ? void 0 : a5.emailRedirectTo, t6) });
          return u5 && await (0, n3.removePKCEVerifier)(this.storage, this.storageKey, t6), this._returnResult({ data: { user: null, session: null }, error: u5 });
        }
        if ("phone" in e6) {
          const { phone: t7, type: r5, options: n4 } = e6, { data: o6, error: a5 } = await (0, s3._request)(this.fetch, "POST", i5, { headers: this.headers, body: { phone: t7, type: r5, gotrue_meta_security: { captcha_token: null == n4 ? void 0 : n4.captchaToken } } });
          return this._returnResult({ data: { user: null, session: null, messageId: null == o6 ? void 0 : o6.message_id }, error: a5 });
        }
        throw new r4.AuthInvalidCredentialsError("You must provide either an email or phone number and a type");
      } catch (e7) {
        if (await (0, n3.removePKCEVerifier)(this.storage, this.storageKey, t6), (0, r4.isAuthError)(e7)) return this._returnResult({ data: { user: null, session: null }, error: e7 });
        throw e7;
      }
    }
    async getSession() {
      return await this.initializePromise, null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => this._useSession(async (e6) => e6)) : await this._useSession(async (e6) => e6);
    }
    async _acquireLock(e6, t6) {
      this._debug("#_acquireLock", "begin", e6);
      try {
        if (this.lockAcquired) {
          const e7 = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), r5 = (async () => (await e7, await t6()))();
          return this.pendingInLock.push((async () => {
            try {
              await r5;
            } catch (e8) {
            }
          })()), r5;
        }
        return await this.lock(`lock:${this.storageKey}`, e6, async () => {
          this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
          try {
            this.lockAcquired = true;
            const e7 = t6();
            for (this.pendingInLock.push((async () => {
              try {
                await e7;
              } catch (e8) {
              }
            })()), await e7; this.pendingInLock.length; ) {
              const e8 = [...this.pendingInLock];
              await Promise.all(e8), this.pendingInLock.splice(0, e8.length);
            }
            return await e7;
          } finally {
            this._debug("#_acquireLock", "lock released for storage key", this.storageKey), this.lockAcquired = false;
          }
        });
      } finally {
        this._debug("#_acquireLock", "end");
      }
    }
    async _useSession(e6) {
      this._debug("#_useSession", "begin");
      try {
        const t6 = await this.__loadSession();
        return await e6(t6);
      } finally {
        this._debug("#_useSession", "end");
      }
    }
    async __loadSession() {
      this._debug("#__loadSession()", "begin"), null == this.lock || this.lockAcquired || this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
      try {
        let e6 = null;
        const r5 = await (0, n3.getItemAsync)(this.storage, this.storageKey);
        if (this._debug("#getSession()", "session from storage", r5), null !== r5 && (this._isValidSession(r5) ? e6 = r5 : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !e6) return { data: { session: null }, error: null };
        const s4 = !!e6.expires_at && 1e3 * e6.expires_at - Date.now() < t5.EXPIRY_MARGIN_MS;
        if (this._debug("#__loadSession()", `session has${s4 ? "" : " not"} expired`, "expires_at", e6.expires_at), !s4) {
          if (this.userStorage) {
            const t6 = await (0, n3.getItemAsync)(this.userStorage, this.storageKey + "-user");
            (null == t6 ? void 0 : t6.user) ? e6.user = t6.user : e6.user = (0, n3.userNotAvailableProxy)();
          }
          if (this.storage.isServer && e6.user && !e6.user.__isUserNotAvailableProxy) {
            const t6 = { value: this.suppressGetSessionWarning };
            e6.user = (0, n3.insecureUserWarningProxy)(e6.user, t6), t6.value && (this.suppressGetSessionWarning = true);
          }
          return { data: { session: e6 }, error: null };
        }
        const { data: i5, error: o6 } = await this._callRefreshToken(e6.refresh_token);
        if (o6) {
          if (!!(e6.expires_at && 1e3 * e6.expires_at > Date.now())) {
            const t6 = await (0, n3.getItemAsync)(this.storage, this.storageKey);
            if (t6 && t6.refresh_token === e6.refresh_token) return this._returnResult({ data: { session: e6 }, error: null });
          }
          return this._returnResult({ data: { session: null }, error: o6 });
        }
        return this._returnResult({ data: { session: i5 }, error: null });
      } finally {
        this._debug("#__loadSession()", "end");
      }
    }
    async getUser(e6) {
      if (e6) return await this._getUser(e6);
      let t6;
      return await this.initializePromise, t6 = null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._getUser()) : await this._getUser(), t6.data.user && (this.suppressGetSessionWarning = true), t6;
    }
    async _getUser(e6) {
      try {
        return e6 ? await (0, s3._request)(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: e6, xform: s3._userResponse }) : await this._useSession(async (e7) => {
          var t6, n4, i5;
          const { data: o6, error: a5 } = e7;
          if (a5) throw a5;
          return (null === (t6 = o6.session) || void 0 === t6 ? void 0 : t6.access_token) || this.hasCustomAuthorizationHeader ? await (0, s3._request)(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: null !== (i5 = null === (n4 = o6.session) || void 0 === n4 ? void 0 : n4.access_token) && void 0 !== i5 ? i5 : void 0, xform: s3._userResponse }) : { data: { user: null }, error: new r4.AuthSessionMissingError() };
        });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return (0, r4.isAuthSessionMissingError)(e7) && await this._removeSession(), this._returnResult({ data: { user: null }, error: e7 });
        throw e7;
      }
    }
    async updateUser(e6, t6 = {}) {
      return await this.initializePromise, null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._updateUser(e6, t6)) : await this._updateUser(e6, t6);
    }
    async _updateUser(e6, t6 = {}) {
      let i5 = null;
      try {
        return await this._useSession(async (n4) => {
          const { data: o6, error: a5 } = n4;
          if (a5) throw a5;
          if (!o6.session) throw new r4.AuthSessionMissingError();
          const l5 = o6.session;
          let c5 = null, u5 = null;
          "pkce" === this.flowType && null != e6.email && ([c5, u5, i5] = await this._getCodeChallengeAndMethod());
          const { data: h6, error: d6 } = await (0, s3._request)(this.fetch, "PUT", `${this.url}/user`, { headers: this.headers, redirectTo: this._maybeAppendFlowIdToRedirect(null == t6 ? void 0 : t6.emailRedirectTo, i5), body: Object.assign(Object.assign({}, e6), { code_challenge: c5, code_challenge_method: u5 }), jwt: l5.access_token, xform: s3._userResponse });
          if (d6) throw d6;
          return l5.user = h6.user, await this._saveSession(l5), await this._notifyAllSubscribers("USER_UPDATED", l5), this._returnResult({ data: { user: l5.user }, error: null });
        });
      } catch (e7) {
        if (await (0, n3.removePKCEVerifier)(this.storage, this.storageKey, i5), (0, r4.isAuthError)(e7)) return this._returnResult({ data: { user: null }, error: e7 });
        throw e7;
      }
    }
    async setSession(e6) {
      return await this.initializePromise, null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._setSession(e6)) : await this._setSession(e6);
    }
    async _setSession(e6) {
      try {
        if (!e6.access_token || !e6.refresh_token) throw new r4.AuthSessionMissingError();
        const t6 = Date.now() / 1e3;
        let s4 = t6, i5 = true, o6 = null;
        const { payload: a5 } = (0, n3.decodeJWT)(e6.access_token);
        if (a5.exp && (s4 = a5.exp, i5 = s4 <= t6), i5) {
          const { data: t7, error: r5 } = await this._callRefreshToken(e6.refresh_token);
          if (r5) return this._returnResult({ data: { user: null, session: null }, error: r5 });
          if (!t7) return { data: { user: null, session: null }, error: null };
          o6 = t7;
        } else {
          const { data: r5, error: n4 } = await this._getUser(e6.access_token);
          if (n4) return this._returnResult({ data: { user: null, session: null }, error: n4 });
          o6 = { access_token: e6.access_token, refresh_token: e6.refresh_token, user: r5.user, token_type: "bearer", expires_in: s4 - t6, expires_at: s4 }, await this._saveSession(o6), await this._notifyAllSubscribers("SIGNED_IN", o6);
        }
        return this._returnResult({ data: { user: o6.user, session: o6 }, error: null });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: { session: null, user: null }, error: e7 });
        throw e7;
      }
    }
    async refreshSession(e6) {
      return await this.initializePromise, null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._refreshSession(e6)) : await this._refreshSession(e6);
    }
    async _refreshSession(e6) {
      try {
        return await this._useSession(async (t6) => {
          var s4;
          if (!e6) {
            const { data: r5, error: n5 } = t6;
            if (n5) throw n5;
            e6 = null !== (s4 = r5.session) && void 0 !== s4 ? s4 : void 0;
          }
          if (!(null == e6 ? void 0 : e6.refresh_token)) throw new r4.AuthSessionMissingError();
          const { data: n4, error: i5 } = await this._callRefreshToken(e6.refresh_token);
          return i5 ? this._returnResult({ data: { user: null, session: null }, error: i5 }) : n4 ? this._returnResult({ data: { user: n4.user, session: n4 }, error: null }) : this._returnResult({ data: { user: null, session: null }, error: null });
        });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: { user: null, session: null }, error: e7 });
        throw e7;
      }
    }
    async _getSessionFromURL(e6, s4) {
      var i5;
      try {
        if (!(0, n3.isBrowser)()) throw new r4.AuthImplicitGrantRedirectError("No browser detected.");
        if (e6.error || e6.error_description || e6.error_code) throw new r4.AuthImplicitGrantRedirectError(e6.error_description || "Error in URL with unspecified error_description", { error: e6.error || "unspecified_error", code: e6.error_code || "unspecified_code" });
        switch (s4) {
          case "implicit":
            if ("pkce" === this.flowType) throw new r4.AuthPKCEGrantCodeExchangeError("Not a valid PKCE flow url.");
            break;
          case "pkce":
            if ("implicit" === this.flowType) throw new r4.AuthImplicitGrantRedirectError("Not a valid implicit grant flow url.");
        }
        if ("pkce" === s4) {
          if (this._debug("#_initialize()", "begin", "is PKCE flow", true), !e6.code) throw new r4.AuthPKCEGrantCodeExchangeError("No code detected.");
          const { data: s5, error: n4 } = await this._exchangeCodeForSession(e6.code, { flowId: e6[t5.PKCE_FLOW_ID_PARAM] });
          if (n4) throw n4;
          const o7 = new URL(window.location.href);
          return o7.searchParams.delete("code"), o7.searchParams.delete(t5.PKCE_FLOW_ID_PARAM), window.history.replaceState(window.history.state, "", o7.toString()), { data: { session: s5.session, redirectType: null !== (i5 = s5.redirectType) && void 0 !== i5 ? i5 : null }, error: null };
        }
        const { provider_token: o6, provider_refresh_token: a5, access_token: l5, refresh_token: c5, expires_in: u5, expires_at: h6, token_type: d6 } = e6;
        if (!(l5 && u5 && c5 && d6)) throw new r4.AuthImplicitGrantRedirectError("No session defined in URL");
        const p4 = Math.round(Date.now() / 1e3), f5 = parseInt(u5);
        let g5 = p4 + f5;
        h6 && (g5 = parseInt(h6));
        const _5 = g5 - p4;
        1e3 * _5 <= t5.AUTO_REFRESH_TICK_DURATION_MS && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${_5}s, should have been closer to ${f5}s`);
        const y5 = g5 - f5;
        p4 - y5 >= 120 ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", y5, g5, p4) : p4 - y5 < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", y5, g5, p4);
        const { data: m5, error: b5 } = await this._getUser(l5);
        if (b5) throw b5;
        const w5 = { provider_token: o6, provider_refresh_token: a5, access_token: l5, expires_in: f5, expires_at: g5, refresh_token: c5, token_type: d6, user: m5.user };
        return window.location.hash = "", this._debug("#_getSessionFromURL()", "clearing window.location.hash"), this._returnResult({ data: { session: w5, redirectType: e6.type }, error: null });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: { session: null, redirectType: null }, error: e7 });
        throw e7;
      }
    }
    _isImplicitGrantCallback(e6) {
      return "function" == typeof this.detectSessionInUrl ? this.detectSessionInUrl(new URL(window.location.href), e6) : Boolean(e6.access_token || e6.error || e6.error_description || e6.error_code);
    }
    async _isPKCECallback(e6) {
      if (!e6.code) return false;
      const r5 = (0, n3.validatePKCEFlowId)(e6[t5.PKCE_FLOW_ID_PARAM]);
      if (r5 && await (0, n3.getItemAsync)(this.storage, (0, n3.pkceVerifierSlotKey)(this.storageKey, r5))) return true;
      return !!await (0, n3.getItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
    }
    async signOut(e6 = { scope: "global" }) {
      return await this.initializePromise, null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._signOut(e6)) : await this._signOut(e6);
    }
    async _signOut({ scope: e6 } = { scope: "global" }) {
      return await this._useSession(async (t6) => {
        var s4;
        const removeCurrentSession = /* @__PURE__ */ __name(async () => {
          await this._removeSession();
        }, "removeCurrentSession"), { data: n4, error: i5 } = t6;
        if (i5 && !(0, r4.isAuthSessionMissingError)(i5)) return this._returnResult({ error: i5 });
        const o6 = null === (s4 = n4.session) || void 0 === s4 ? void 0 : s4.access_token;
        if (o6) {
          const { error: t7 } = await this.admin.signOut(o6, e6);
          if (t7 && (!(0, r4.isAuthApiError)(t7) || 404 !== t7.status && 401 !== t7.status && 403 !== t7.status) && !(0, r4.isAuthSessionMissingError)(t7)) return "others" !== e6 && await removeCurrentSession(), this._returnResult({ error: t7 });
        }
        return "others" !== e6 && await removeCurrentSession(), this._returnResult({ error: null });
      });
    }
    onAuthStateChange(e6) {
      const t6 = (0, n3.generateCallbackId)(), r5 = { id: t6, callback: e6, unsubscribe: /* @__PURE__ */ __name(() => {
        this._debug("#unsubscribe()", "state change callback with id removed", t6), this.stateChangeEmitters.delete(t6);
      }, "unsubscribe") };
      return this._debug("#onAuthStateChange()", "registered callback with id", t6), this.stateChangeEmitters.set(t6, r5), (async () => {
        await this.initializePromise, null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => {
          this._emitInitialSession(t6);
        }) : await this._emitInitialSession(t6);
      })(), { data: { subscription: r5 } };
    }
    async _emitInitialSession(e6) {
      return await this._useSession(async (t6) => {
        var s4, n4;
        try {
          const { data: { session: r5 }, error: n5 } = t6;
          if (n5) throw n5;
          await (null === (s4 = this.stateChangeEmitters.get(e6)) || void 0 === s4 ? void 0 : s4.callback("INITIAL_SESSION", r5)), this._debug("INITIAL_SESSION", "callback id", e6, "session", r5);
        } catch (t7) {
          await (null === (n4 = this.stateChangeEmitters.get(e6)) || void 0 === n4 ? void 0 : n4.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e6, "error", t7), (0, r4.isAuthSessionMissingError)(t7) || (0, r4.isAuthRetryableFetchError)(t7) || (0, r4.isAuthApiError)(t7) && ("refresh_token_not_found" === t7.code || "refresh_token_already_used" === t7.code || "session_expired" === t7.code) ? console.warn(t7) : console.error(t7);
        }
      });
    }
    async resetPasswordForEmail(e6, t6 = {}) {
      let i5 = null, o6 = null, a5 = null;
      "pkce" === this.flowType && ([i5, o6, a5] = await this._getCodeChallengeAndMethod(true));
      try {
        return await (0, s3._request)(this.fetch, "POST", `${this.url}/recover`, { body: { email: e6, code_challenge: i5, code_challenge_method: o6, gotrue_meta_security: { captcha_token: t6.captchaToken } }, headers: this.headers, redirectTo: this._maybeAppendFlowIdToRedirect(t6.redirectTo, a5) });
      } catch (e7) {
        if (await (0, n3.removePKCEVerifier)(this.storage, this.storageKey, a5), (0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async getUserIdentities() {
      var e6;
      try {
        const { data: t6, error: r5 } = await this.getUser();
        if (r5) throw r5;
        return this._returnResult({ data: { identities: null !== (e6 = t6.user.identities) && void 0 !== e6 ? e6 : [] }, error: null });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async linkIdentity(e6) {
      return "token" in e6 ? this.linkIdentityIdToken(e6) : this.linkIdentityOAuth(e6);
    }
    async linkIdentityOAuth(e6) {
      var t6;
      let i5 = null;
      try {
        const { data: r5, error: o6 } = await this._useSession(async (t7) => {
          var r6, n4, o7, a5, l5;
          const { data: c5, error: u5 } = t7;
          if (u5) throw u5;
          const { url: h6, flowId: d6 } = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e6.provider, { redirectTo: null === (r6 = e6.options) || void 0 === r6 ? void 0 : r6.redirectTo, scopes: null === (n4 = e6.options) || void 0 === n4 ? void 0 : n4.scopes, queryParams: null === (o7 = e6.options) || void 0 === o7 ? void 0 : o7.queryParams, skipBrowserRedirect: true });
          return i5 = d6, await (0, s3._request)(this.fetch, "GET", h6, { headers: this.headers, jwt: null !== (l5 = null === (a5 = c5.session) || void 0 === a5 ? void 0 : a5.access_token) && void 0 !== l5 ? l5 : void 0 });
        });
        if (o6) throw o6;
        return (0, n3.isBrowser)() && !(null === (t6 = e6.options) || void 0 === t6 ? void 0 : t6.skipBrowserRedirect) && window.location.assign(null == r5 ? void 0 : r5.url), this._returnResult({ data: { provider: e6.provider, url: null == r5 ? void 0 : r5.url, flowId: i5 }, error: null });
      } catch (t7) {
        if ((0, r4.isAuthError)(t7)) return this._returnResult({ data: { provider: e6.provider, url: null, flowId: i5 }, error: t7 });
        throw t7;
      }
    }
    async linkIdentityIdToken(e6) {
      return await this._useSession(async (t6) => {
        var i5;
        try {
          const { error: n4, data: { session: o6 } } = t6;
          if (n4) throw n4;
          const { options: a5, provider: l5, token: c5, access_token: u5, nonce: h6 } = e6, d6 = await (0, s3._request)(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, jwt: null !== (i5 = null == o6 ? void 0 : o6.access_token) && void 0 !== i5 ? i5 : void 0, body: { provider: l5, id_token: c5, access_token: u5, nonce: h6, link_identity: true, gotrue_meta_security: { captcha_token: null == a5 ? void 0 : a5.captchaToken } }, xform: s3._sessionResponse }), { data: p4, error: f5 } = d6;
          return f5 ? this._returnResult({ data: { user: null, session: null }, error: f5 }) : p4 && p4.session && p4.user ? (p4.session && (await this._saveSession(p4.session), await this._notifyAllSubscribers("USER_UPDATED", p4.session)), this._returnResult({ data: p4, error: f5 })) : this._returnResult({ data: { user: null, session: null }, error: new r4.AuthInvalidTokenResponseError() });
        } catch (e7) {
          if (await (0, n3.removePKCEVerifier)(this.storage, this.storageKey, null), (0, r4.isAuthError)(e7)) return this._returnResult({ data: { user: null, session: null }, error: e7 });
          throw e7;
        }
      });
    }
    async unlinkIdentity(e6) {
      try {
        return await this._useSession(async (t6) => {
          var r5, n4;
          const { data: i5, error: o6 } = t6;
          if (o6) throw o6;
          return await (0, s3._request)(this.fetch, "DELETE", `${this.url}/user/identities/${e6.identity_id}`, { headers: this.headers, jwt: null !== (n4 = null === (r5 = i5.session) || void 0 === r5 ? void 0 : r5.access_token) && void 0 !== n4 ? n4 : void 0 });
        });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async _refreshAccessToken(e6) {
      const i5 = "#_refreshAccessToken()";
      this._debug(i5, "begin");
      try {
        const o6 = Date.now();
        return await (0, n3.retryable)(async (t6) => (t6 > 0 && await (0, n3.sleep)(200 * Math.pow(2, t6 - 1)), this._debug(i5, "refreshing attempt", t6), await (0, s3._request)(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, { body: { refresh_token: e6 }, headers: this.headers, xform: s3._sessionResponse })), (e7, s4) => {
          const n4 = 200 * Math.pow(2, e7);
          return s4 && (0, r4.isAuthRetryableFetchError)(s4) && Date.now() + n4 - o6 < t5.AUTO_REFRESH_TICK_DURATION_MS;
        });
      } catch (e7) {
        if (this._debug(i5, "error", e7), (0, r4.isAuthError)(e7)) return this._returnResult({ data: { session: null, user: null }, error: e7 });
        throw e7;
      } finally {
        this._debug(i5, "end");
      }
    }
    _isValidSession(e6) {
      return "object" == typeof e6 && null !== e6 && "access_token" in e6 && "refresh_token" in e6 && "expires_at" in e6;
    }
    async _handleProviderSignIn(e6, t6) {
      const { url: r5, flowId: s4 } = await this._getUrlForProvider(`${this.url}/authorize`, e6, { redirectTo: t6.redirectTo, scopes: t6.scopes, queryParams: t6.queryParams });
      return this._debug("#_handleProviderSignIn()", "provider", e6, "options", t6, "url", r5), (0, n3.isBrowser)() && !t6.skipBrowserRedirect && window.location.assign(r5), { data: { provider: e6, url: r5, flowId: s4 }, error: null };
    }
    async _recoverAndRefresh() {
      var e6, s4;
      const i5 = "#_recoverAndRefresh()";
      this._debug(i5, "begin");
      try {
        const o6 = await (0, n3.getItemAsync)(this.storage, this.storageKey);
        if (o6 && this.userStorage) {
          let t6 = await (0, n3.getItemAsync)(this.userStorage, this.storageKey + "-user");
          this.storage.isServer || !Object.is(this.storage, this.userStorage) || t6 || (t6 = { user: o6.user }, await (0, n3.setItemAsync)(this.userStorage, this.storageKey + "-user", t6)), o6.user = null !== (e6 = null == t6 ? void 0 : t6.user) && void 0 !== e6 ? e6 : (0, n3.userNotAvailableProxy)();
        } else if (o6 && !o6.user && !o6.user) {
          const e7 = await (0, n3.getItemAsync)(this.storage, this.storageKey + "-user");
          e7 && (null == e7 ? void 0 : e7.user) ? (o6.user = e7.user, await (0, n3.removeItemAsync)(this.storage, this.storageKey + "-user"), await (0, n3.setItemAsync)(this.storage, this.storageKey, o6)) : o6.user = (0, n3.userNotAvailableProxy)();
        }
        if (this._debug(i5, "session from storage", o6), !this._isValidSession(o6)) return this._debug(i5, "session is not valid"), void (null !== o6 && await this._removeSession());
        const a5 = 1e3 * (null !== (s4 = o6.expires_at) && void 0 !== s4 ? s4 : 1 / 0) - Date.now() < t5.EXPIRY_MARGIN_MS;
        if (this._debug(i5, `session has${a5 ? "" : " not"} expired with margin of ${t5.EXPIRY_MARGIN_MS}s`), a5) {
          if (this.autoRefreshToken && o6.refresh_token) {
            const { error: e7 } = await this._callRefreshToken(o6.refresh_token);
            e7 && ((0, r4.isAuthRefreshDiscardedError)(e7) ? this._debug(i5, "refresh discarded by commit guard", e7) : this._debug(i5, "refresh failed", e7));
          }
        } else if (o6.user && true === o6.user.__isUserNotAvailableProxy) try {
          const { data: e7, error: t6 } = await this._getUser(o6.access_token);
          !t6 && (null == e7 ? void 0 : e7.user) ? (o6.user = e7.user, await this._saveSession(o6), await this._notifyAllSubscribers("SIGNED_IN", o6)) : this._debug(i5, "could not get user data, skipping SIGNED_IN notification");
        } catch (e7) {
          console.error("Error getting user data:", e7), this._debug(i5, "error getting user data, skipping SIGNED_IN notification", e7);
        }
        else await this._notifyAllSubscribers("SIGNED_IN", o6);
      } catch (e7) {
        return this._debug(i5, "error", e7), void ((0, r4.isAuthRetryableFetchError)(e7) ? console.warn(e7) : console.error(e7));
      } finally {
        this._debug(i5, "end");
      }
    }
    async _callRefreshToken(e6) {
      var s4, i5;
      if (!e6) throw new r4.AuthSessionMissingError();
      if (this.refreshingDeferred) return this.refreshingDeferred.promise;
      if (this.lastRefreshFailure && this.lastRefreshFailure.refreshToken === e6 && Date.now() < this.lastRefreshFailure.expiresAt) return this._debug("#_callRefreshToken()", "returning cached failure (cooldown active)"), this.lastRefreshFailure.result;
      const o6 = "#_callRefreshToken()";
      this._debug(o6, "begin");
      try {
        this.refreshingDeferred = new n3.Deferred();
        const t6 = await (0, n3.getItemAsync)(this.storage, this.storageKey), { data: s5, error: i6 } = await this._refreshAccessToken(e6);
        if (i6) throw i6;
        if (!s5.session) throw new r4.AuthSessionMissingError();
        const a5 = await (0, n3.getItemAsync)(this.storage, this.storageKey);
        if (null !== t6 && (null === a5 || a5.refresh_token !== t6.refresh_token)) {
          this._debug(o6, "commit guard: storage changed since refresh started, discarding rotated tokens", { startedWith: "present", nowHolds: a5 ? "replaced" : "cleared" });
          const e7 = { data: null, error: new r4.AuthRefreshDiscardedError() };
          return this.refreshingDeferred.resolve(e7), e7;
        }
        const l5 = this._sessionRemovalEpoch;
        if (await this._saveSession(s5.session), this._sessionRemovalEpoch !== l5) {
          this._debug(o6, "commit guard (post-save): _removeSession ran during _saveSession, undoing write"), await (0, n3.removeItemAsync)(this.storage, this.storageKey), this.userStorage && await (0, n3.removeItemAsync)(this.userStorage, this.storageKey + "-user");
          const e7 = { data: null, error: new r4.AuthRefreshDiscardedError() };
          return this.refreshingDeferred.resolve(e7), e7;
        }
        await this._notifyAllSubscribers("TOKEN_REFRESHED", s5.session);
        const c5 = { data: s5.session, error: null };
        return this.lastRefreshFailure = null, this.refreshingDeferred.resolve(c5), c5;
      } catch (a5) {
        if (this._debug(o6, "error", a5), (0, r4.isAuthError)(a5)) {
          const i6 = { data: null, error: a5 };
          if (!(0, r4.isAuthRetryableFetchError)(a5)) {
            const e7 = await (0, n3.getItemAsync)(this.storage, this.storageKey);
            !!((null == e7 ? void 0 : e7.expires_at) && 1e3 * e7.expires_at > Date.now()) ? this._debug(o6, "proactive refresh failed, access token still valid \u2014 preserving session") : await this._removeSession();
          }
          return this.lastRefreshFailure = { refreshToken: e6, result: i6, expiresAt: Date.now() + t5.REFRESH_FAILURE_COOLDOWN_MS }, null === (s4 = this.refreshingDeferred) || void 0 === s4 || s4.resolve(i6), i6;
        }
        throw null === (i5 = this.refreshingDeferred) || void 0 === i5 || i5.reject(a5), a5;
      } finally {
        this.refreshingDeferred = null, this._debug(o6, "end");
      }
    }
    async _notifyAllSubscribers(e6, t6, r5 = true) {
      if (null !== this._pendingInitNotifications && r5) return void this._pendingInitNotifications.push({ event: e6, session: t6, broadcast: r5 });
      const s4 = `#_notifyAllSubscribers(${e6})`;
      this._debug(s4, "begin", t6, `broadcast = ${r5}`);
      try {
        this.broadcastChannel && r5 && this.broadcastChannel.postMessage({ event: e6, session: t6 });
        const s5 = [], n4 = Array.from(this.stateChangeEmitters.values()).map(async (r6) => {
          try {
            await r6.callback(e6, t6);
          } catch (e7) {
            s5.push(e7);
          }
        });
        if (await Promise.all(n4), s5.length > 0) {
          for (let e7 = 0; e7 < s5.length; e7 += 1) console.error(s5[e7]);
          throw s5[0];
        }
      } finally {
        this._debug(s4, "end");
      }
    }
    async _saveSession(e6) {
      this._debug("#_saveSession()", e6), this.suppressGetSessionWarning = true;
      const t6 = Object.assign({}, e6), r5 = t6.user && true === t6.user.__isUserNotAvailableProxy;
      if (this.userStorage) {
        !r5 && t6.user && await (0, n3.setItemAsync)(this.userStorage, this.storageKey + "-user", { user: t6.user });
        const e7 = Object.assign({}, t6);
        delete e7.user;
        const s4 = (0, n3.deepClone)(e7);
        await (0, n3.setItemAsync)(this.storage, this.storageKey, s4);
      } else {
        const e7 = (0, n3.deepClone)(t6);
        await (0, n3.setItemAsync)(this.storage, this.storageKey, e7);
      }
    }
    async _removeSession() {
      this._sessionRemovalEpoch += 1, this._debug("#_removeSession()"), this.lastRefreshFailure = null, this.suppressGetSessionWarning = false, await (0, n3.removeItemAsync)(this.storage, this.storageKey), await (0, n3.removeAllPKCEVerifiers)(this.storage, this.storageKey), await (0, n3.removeItemAsync)(this.storage, this.storageKey + "-user"), this.userStorage && await (0, n3.removeItemAsync)(this.userStorage, this.storageKey + "-user"), await this._notifyAllSubscribers("SIGNED_OUT", null);
    }
    _removeVisibilityChangedCallback() {
      this._debug("#_removeVisibilityChangedCallback()");
      const e6 = this.visibilityChangedCallback;
      this.visibilityChangedCallback = null;
      try {
        e6 && (0, n3.isBrowser)() && (null === window || void 0 === window ? void 0 : window.removeEventListener) && window.removeEventListener("visibilitychange", e6);
      } catch (e7) {
        console.error("removing visibilitychange callback failed", e7);
      }
    }
    async _startAutoRefresh() {
      await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
      const e6 = setInterval(() => this._autoRefreshTokenTick(), t5.AUTO_REFRESH_TICK_DURATION_MS);
      this.autoRefreshTicker = e6, e6 && "object" == typeof e6 && "function" == typeof e6.unref ? e6.unref() : "undefined" != typeof Deno && "function" == typeof Deno.unrefTimer && Deno.unrefTimer(e6);
      const r5 = setTimeout(async () => {
        await this.initializePromise, await this._autoRefreshTokenTick();
      }, 0);
      this.autoRefreshTickTimeout = r5, r5 && "object" == typeof r5 && "function" == typeof r5.unref ? r5.unref() : "undefined" != typeof Deno && "function" == typeof Deno.unrefTimer && Deno.unrefTimer(r5);
    }
    async _stopAutoRefresh() {
      this._debug("#_stopAutoRefresh()");
      const e6 = this.autoRefreshTicker;
      this.autoRefreshTicker = null, e6 && clearInterval(e6);
      const t6 = this.autoRefreshTickTimeout;
      this.autoRefreshTickTimeout = null, t6 && clearTimeout(t6);
    }
    async startAutoRefresh() {
      this._removeVisibilityChangedCallback(), await this._startAutoRefresh();
    }
    async stopAutoRefresh() {
      this._removeVisibilityChangedCallback(), await this._stopAutoRefresh();
    }
    async dispose() {
      var e6;
      this._removeVisibilityChangedCallback(), await this._stopAutoRefresh(), null === (e6 = this.broadcastChannel) || void 0 === e6 || e6.close(), this.broadcastChannel = null, this.stateChangeEmitters.clear();
    }
    async _autoRefreshTokenTick() {
      if (this._debug("#_autoRefreshTokenTick()", "begin"), null == this.lock) if (null === this.refreshingDeferred) try {
        const e6 = Date.now();
        try {
          await this._useSession(async (r5) => {
            const { data: { session: s4 } } = r5;
            if (!s4 || !s4.refresh_token || !s4.expires_at) return void this._debug("#_autoRefreshTokenTick()", "no session");
            const n4 = Math.floor((1e3 * s4.expires_at - e6) / t5.AUTO_REFRESH_TICK_DURATION_MS);
            this._debug("#_autoRefreshTokenTick()", `access token expires in ${n4} ticks, a tick lasts ${t5.AUTO_REFRESH_TICK_DURATION_MS}ms, refresh threshold is ${t5.AUTO_REFRESH_TICK_THRESHOLD} ticks`), n4 <= t5.AUTO_REFRESH_TICK_THRESHOLD && await this._callRefreshToken(s4.refresh_token);
          });
        } catch (e7) {
          console.error("Auto refresh tick failed with error. This is likely a transient error.", e7);
        }
      } finally {
        this._debug("#_autoRefreshTokenTick()", "end");
      }
      else this._debug("#_autoRefreshTokenTick()", "refresh already in flight, skipping");
      else try {
        await this._acquireLock(0, async () => {
          try {
            const e6 = Date.now();
            try {
              return await this._useSession(async (r5) => {
                const { data: { session: s4 } } = r5;
                if (!s4 || !s4.refresh_token || !s4.expires_at) return void this._debug("#_autoRefreshTokenTick()", "no session");
                const n4 = Math.floor((1e3 * s4.expires_at - e6) / t5.AUTO_REFRESH_TICK_DURATION_MS);
                this._debug("#_autoRefreshTokenTick()", `access token expires in ${n4} ticks, a tick lasts ${t5.AUTO_REFRESH_TICK_DURATION_MS}ms, refresh threshold is ${t5.AUTO_REFRESH_TICK_THRESHOLD} ticks`), n4 <= t5.AUTO_REFRESH_TICK_THRESHOLD && await this._callRefreshToken(s4.refresh_token);
              });
            } catch (e7) {
              console.error("Auto refresh tick failed with error. This is likely a transient error.", e7);
            }
          } finally {
            this._debug("#_autoRefreshTokenTick()", "end");
          }
        });
      } catch (e6) {
        if (!(e6 instanceof o5.LockAcquireTimeoutError)) throw e6;
        this._debug("auto refresh token tick lock not available");
      }
    }
    async _handleVisibilityChange() {
      if (this._debug("#_handleVisibilityChange()"), !(0, n3.isBrowser)() || !(null === window || void 0 === window ? void 0 : window.addEventListener)) return this.autoRefreshToken && this.startAutoRefresh(), false;
      try {
        this.visibilityChangedCallback = async () => {
          try {
            await this._onVisibilityChanged(false);
          } catch (e6) {
            this._debug("#visibilityChangedCallback", "error", e6);
          }
        }, null === window || void 0 === window || window.addEventListener("visibilitychange", this.visibilityChangedCallback), await this._onVisibilityChanged(true);
      } catch (e6) {
        console.error("_handleVisibilityChange", e6);
      }
    }
    async _onVisibilityChanged(e6) {
      const t6 = `#_onVisibilityChanged(${e6})`;
      if (this._debug(t6, "visibilityState", document.visibilityState), "visible" === document.visibilityState) {
        if (this.autoRefreshToken && this._startAutoRefresh(), !e6) if (await this.initializePromise, null != this.lock) await this._acquireLock(this.lockAcquireTimeout, async () => {
          "visible" === document.visibilityState ? await this._recoverAndRefresh() : this._debug(t6, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
        });
        else {
          if ("visible" !== document.visibilityState) return void this._debug(t6, "visibilityState is no longer visible, skipping recovery");
          await this._recoverAndRefresh();
        }
      } else "hidden" === document.visibilityState && this.autoRefreshToken && this._stopAutoRefresh();
    }
    async _getUrlForProvider(e6, t6, r5) {
      let s4 = null == r5 ? void 0 : r5.redirectTo, n4 = null, i5 = null, o6 = null;
      "pkce" === this.flowType && ([n4, i5, o6] = await this._getCodeChallengeAndMethod(), s4 = this._maybeAppendFlowIdToRedirect(s4, o6));
      const a5 = [`provider=${encodeURIComponent(t6)}`];
      if (s4 && a5.push(`redirect_to=${encodeURIComponent(s4)}`), (null == r5 ? void 0 : r5.scopes) && a5.push(`scopes=${encodeURIComponent(r5.scopes)}`), null != n4 && null != i5) {
        const e7 = new URLSearchParams({ code_challenge: `${encodeURIComponent(n4)}`, code_challenge_method: `${encodeURIComponent(i5)}` });
        a5.push(e7.toString());
      }
      if (null == r5 ? void 0 : r5.queryParams) {
        const e7 = new URLSearchParams(r5.queryParams);
        a5.push(e7.toString());
      }
      return (null == r5 ? void 0 : r5.skipBrowserRedirect) && a5.push(`skip_http_redirect=${r5.skipBrowserRedirect}`), { url: `${e6}?${a5.join("&")}`, flowId: o6 };
    }
    _maybeAppendFlowIdToRedirect(e6, t6) {
      return e6 && t6 && this.experimental.appendPkceFlowIdToRedirects ? (0, n3.appendFlowIdToRedirectTo)(e6, t6) : null != e6 ? e6 : void 0;
    }
    async _getCodeChallengeAndMethod(e6 = false) {
      return (0, n3.getCodeChallengeAndMethod)(this.storage, this.storageKey, e6, (e7) => this._debug("#_getCodeChallengeAndMethod()", "evicted oldest pending PKCE verifier slot", e7));
    }
    async _unenroll(e6) {
      try {
        return await this._useSession(async (t6) => {
          var r5;
          const { data: n4, error: i5 } = t6;
          return i5 ? this._returnResult({ data: null, error: i5 }) : await (0, s3._request)(this.fetch, "DELETE", `${this.url}/factors/${e6.factorId}`, { headers: this.headers, jwt: null === (r5 = null == n4 ? void 0 : n4.session) || void 0 === r5 ? void 0 : r5.access_token });
        });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async _enroll(e6) {
      try {
        return await this._useSession(async (t6) => {
          var r5, n4;
          const { data: i5, error: o6 } = t6;
          if (o6) return this._returnResult({ data: null, error: o6 });
          const a5 = Object.assign({ friendly_name: e6.friendlyName, factor_type: e6.factorType }, "phone" === e6.factorType ? { phone: e6.phone } : "totp" === e6.factorType ? { issuer: e6.issuer } : {}), { data: l5, error: c5 } = await (0, s3._request)(this.fetch, "POST", `${this.url}/factors`, { body: a5, headers: this.headers, jwt: null === (r5 = null == i5 ? void 0 : i5.session) || void 0 === r5 ? void 0 : r5.access_token });
          return c5 ? this._returnResult({ data: null, error: c5 }) : ("totp" === e6.factorType && "totp" === l5.type && (null === (n4 = null == l5 ? void 0 : l5.totp) || void 0 === n4 ? void 0 : n4.qr_code) && (l5.totp.qr_code = `data:image/svg+xml;utf-8,${l5.totp.qr_code}`), this._returnResult({ data: l5, error: null }));
        });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async _verify(e6) {
      const run = /* @__PURE__ */ __name(async () => {
        try {
          return await this._useSession(async (t6) => {
            var r5;
            const { data: n4, error: i5 } = t6;
            if (i5) return this._returnResult({ data: null, error: i5 });
            const o6 = Object.assign({ challenge_id: e6.challengeId }, "webauthn" in e6 ? { webauthn: Object.assign(Object.assign({}, e6.webauthn), { credential_response: "create" === e6.webauthn.type ? (0, h5.serializeCredentialCreationResponse)(e6.webauthn.credential_response) : (0, h5.serializeCredentialRequestResponse)(e6.webauthn.credential_response) }) } : { code: e6.code }), { data: a5, error: l5 } = await (0, s3._request)(this.fetch, "POST", `${this.url}/factors/${e6.factorId}/verify`, { body: o6, headers: this.headers, jwt: null === (r5 = null == n4 ? void 0 : n4.session) || void 0 === r5 ? void 0 : r5.access_token });
            return l5 ? this._returnResult({ data: null, error: l5 }) : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + a5.expires_in }, a5)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", a5), this._returnResult({ data: a5, error: l5 }));
          });
        } catch (e7) {
          if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
          throw e7;
        }
      }, "run");
      return null != this.lock ? this._acquireLock(this.lockAcquireTimeout, run) : run();
    }
    async _challenge(e6) {
      const run = /* @__PURE__ */ __name(async () => {
        try {
          return await this._useSession(async (t6) => {
            var r5;
            const { data: n4, error: i5 } = t6;
            if (i5) return this._returnResult({ data: null, error: i5 });
            const o6 = await (0, s3._request)(this.fetch, "POST", `${this.url}/factors/${e6.factorId}/challenge`, { body: e6, headers: this.headers, jwt: null === (r5 = null == n4 ? void 0 : n4.session) || void 0 === r5 ? void 0 : r5.access_token });
            if (o6.error) return o6;
            const { data: a5 } = o6;
            if ("webauthn" !== a5.type) return { data: a5, error: null };
            switch (a5.webauthn.type) {
              case "create":
                return { data: Object.assign(Object.assign({}, a5), { webauthn: Object.assign(Object.assign({}, a5.webauthn), { credential_options: Object.assign(Object.assign({}, a5.webauthn.credential_options), { publicKey: (0, h5.deserializeCredentialCreationOptions)(a5.webauthn.credential_options.publicKey) }) }) }), error: null };
              case "request":
                return { data: Object.assign(Object.assign({}, a5), { webauthn: Object.assign(Object.assign({}, a5.webauthn), { credential_options: Object.assign(Object.assign({}, a5.webauthn.credential_options), { publicKey: (0, h5.deserializeCredentialRequestOptions)(a5.webauthn.credential_options.publicKey) }) }) }), error: null };
            }
          });
        } catch (e7) {
          if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
          throw e7;
        }
      }, "run");
      return null != this.lock ? this._acquireLock(this.lockAcquireTimeout, run) : run();
    }
    async _challengeAndVerify(e6) {
      const { data: t6, error: r5 } = await this._challenge({ factorId: e6.factorId });
      return r5 ? this._returnResult({ data: null, error: r5 }) : await this._verify({ factorId: e6.factorId, challengeId: t6.id, code: e6.code });
    }
    async _listFactors() {
      var e6;
      const { data: { user: t6 }, error: r5 } = await this.getUser();
      if (r5) return { data: null, error: r5 };
      const s4 = { all: [], phone: [], totp: [], webauthn: [] };
      for (const r6 of null !== (e6 = null == t6 ? void 0 : t6.factors) && void 0 !== e6 ? e6 : []) s4.all.push(r6), "verified" === r6.status && s4[r6.factor_type].push(r6);
      return { data: s4, error: null };
    }
    async _getAuthenticatorAssuranceLevel(e6) {
      var t6, s4, i5, o6;
      if (e6) try {
        const { payload: r5 } = (0, n3.decodeJWT)(e6);
        let i6 = null;
        r5.aal && (i6 = r5.aal);
        let o7 = i6;
        const { data: { user: a6 }, error: l6 } = await this.getUser(e6);
        if (l6) return this._returnResult({ data: null, error: l6 });
        (null !== (s4 = null === (t6 = null == a6 ? void 0 : a6.factors) || void 0 === t6 ? void 0 : t6.filter((e7) => "verified" === e7.status)) && void 0 !== s4 ? s4 : []).length > 0 && (o7 = "aal2");
        return { data: { currentLevel: i6, nextLevel: o7, currentAuthenticationMethods: r5.amr || [] }, error: null };
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
      const { data: { session: a5 }, error: l5 } = await this.getSession();
      if (l5) return this._returnResult({ data: null, error: l5 });
      if (!a5) return { data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] }, error: null };
      const { payload: c5 } = (0, n3.decodeJWT)(a5.access_token);
      let u5 = null;
      c5.aal && (u5 = c5.aal);
      let h6 = u5;
      (null !== (o6 = null === (i5 = a5.user.factors) || void 0 === i5 ? void 0 : i5.filter((e7) => "verified" === e7.status)) && void 0 !== o6 ? o6 : []).length > 0 && (h6 = "aal2");
      return { data: { currentLevel: u5, nextLevel: h6, currentAuthenticationMethods: c5.amr || [] }, error: null };
    }
    async _getAuthorizationDetails(e6) {
      try {
        return await this._useSession(async (t6) => {
          const { data: { session: n4 }, error: i5 } = t6;
          return i5 ? this._returnResult({ data: null, error: i5 }) : n4 ? await (0, s3._request)(this.fetch, "GET", `${this.url}/oauth/authorizations/${e6}`, { headers: this.headers, jwt: n4.access_token, xform: /* @__PURE__ */ __name((e7) => ({ data: e7, error: null }), "xform") }) : this._returnResult({ data: null, error: new r4.AuthSessionMissingError() });
        });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async _approveAuthorization(e6, t6) {
      try {
        return await this._useSession(async (i5) => {
          const { data: { session: o6 }, error: a5 } = i5;
          if (a5) return this._returnResult({ data: null, error: a5 });
          if (!o6) return this._returnResult({ data: null, error: new r4.AuthSessionMissingError() });
          const l5 = await (0, s3._request)(this.fetch, "POST", `${this.url}/oauth/authorizations/${e6}/consent`, { headers: this.headers, jwt: o6.access_token, body: { action: "approve" }, xform: /* @__PURE__ */ __name((e7) => ({ data: e7, error: null }), "xform") });
          return l5.data && l5.data.redirect_url && (0, n3.isBrowser)() && !(null == t6 ? void 0 : t6.skipBrowserRedirect) && window.location.assign(l5.data.redirect_url), l5;
        });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async _denyAuthorization(e6, t6) {
      try {
        return await this._useSession(async (i5) => {
          const { data: { session: o6 }, error: a5 } = i5;
          if (a5) return this._returnResult({ data: null, error: a5 });
          if (!o6) return this._returnResult({ data: null, error: new r4.AuthSessionMissingError() });
          const l5 = await (0, s3._request)(this.fetch, "POST", `${this.url}/oauth/authorizations/${e6}/consent`, { headers: this.headers, jwt: o6.access_token, body: { action: "deny" }, xform: /* @__PURE__ */ __name((e7) => ({ data: e7, error: null }), "xform") });
          return l5.data && l5.data.redirect_url && (0, n3.isBrowser)() && !(null == t6 ? void 0 : t6.skipBrowserRedirect) && window.location.assign(l5.data.redirect_url), l5;
        });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async _listOAuthGrants() {
      try {
        return await this._useSession(async (e6) => {
          const { data: { session: t6 }, error: n4 } = e6;
          return n4 ? this._returnResult({ data: null, error: n4 }) : t6 ? await (0, s3._request)(this.fetch, "GET", `${this.url}/user/oauth/grants`, { headers: this.headers, jwt: t6.access_token, xform: /* @__PURE__ */ __name((e7) => ({ data: e7, error: null }), "xform") }) : this._returnResult({ data: null, error: new r4.AuthSessionMissingError() });
        });
      } catch (e6) {
        if ((0, r4.isAuthError)(e6)) return this._returnResult({ data: null, error: e6 });
        throw e6;
      }
    }
    async _revokeOAuthGrant(e6) {
      try {
        return await this._useSession(async (t6) => {
          const { data: { session: n4 }, error: i5 } = t6;
          return i5 ? this._returnResult({ data: null, error: i5 }) : n4 ? (await (0, s3._request)(this.fetch, "DELETE", `${this.url}/user/oauth/grants`, { headers: this.headers, jwt: n4.access_token, query: { client_id: e6.clientId }, noResolveJson: true }), { data: {}, error: null }) : this._returnResult({ data: null, error: new r4.AuthSessionMissingError() });
        });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async fetchJwk(e6, r5 = { keys: [] }) {
      let n4 = r5.keys.find((t6) => t6.kid === e6);
      if (n4) return n4;
      const i5 = Date.now();
      if (n4 = this.jwks.keys.find((t6) => t6.kid === e6), n4 && this.jwks_cached_at + t5.JWKS_TTL > i5) return n4;
      const { data: o6, error: a5 } = await (0, s3._request)(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, { headers: this.headers });
      if (a5) throw a5;
      return o6.keys && 0 !== o6.keys.length ? (this.jwks = o6, this.jwks_cached_at = i5, n4 = o6.keys.find((t6) => t6.kid === e6), n4 || null) : null;
    }
    async getClaims(e6, t6 = {}) {
      try {
        let s4 = e6;
        if (!s4) {
          const { data: e7, error: t7 } = await this.getSession();
          if (t7 || !e7.session) return this._returnResult({ data: null, error: t7 });
          s4 = e7.session.access_token;
        }
        const { header: i5, payload: o6, signature: a5, raw: { header: l5, payload: u5 } } = (0, n3.decodeJWT)(s4);
        if (!(null == t6 ? void 0 : t6.allowExpired)) try {
          (0, n3.validateExp)(o6.exp);
        } catch (e7) {
          throw new r4.AuthInvalidJwtError(e7 instanceof Error ? e7.message : "JWT validation failed");
        }
        const h6 = i5.alg && !i5.alg.startsWith("HS") && i5.kid && "crypto" in globalThis && "subtle" in globalThis.crypto ? await this.fetchJwk(i5.kid, (null == t6 ? void 0 : t6.keys) ? { keys: t6.keys } : null == t6 ? void 0 : t6.jwks) : null;
        if (!h6) {
          const { error: e7 } = await this.getUser(s4);
          if (e7) throw e7;
          return { data: { claims: o6, header: i5, signature: a5 }, error: null };
        }
        const d6 = (0, n3.getAlgorithm)(i5.alg), p4 = await crypto.subtle.importKey("jwk", h6, d6, true, ["verify"]);
        if (!await crypto.subtle.verify(d6, p4, a5, (0, c4.stringToUint8Array)(`${l5}.${u5}`))) throw new r4.AuthInvalidJwtError("Invalid JWT signature");
        return { data: { claims: o6, header: i5, signature: a5 }, error: null };
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async signInWithPasskey(e6) {
      var t6, s4, i5;
      (0, n3.assertPasskeyExperimentalEnabled)(this.experimental);
      try {
        if (!(0, h5.browserSupportsWebAuthn)()) return this._returnResult({ data: null, error: new r4.AuthUnknownError("Browser does not support WebAuthn", null) });
        const { data: n4, error: o6 } = await this._startPasskeyAuthentication({ options: { captchaToken: null === (t6 = null == e6 ? void 0 : e6.options) || void 0 === t6 ? void 0 : t6.captchaToken } });
        if (o6 || !n4) return this._returnResult({ data: null, error: o6 });
        const a5 = (0, h5.deserializeCredentialRequestOptions)(n4.options), l5 = null !== (i5 = null === (s4 = null == e6 ? void 0 : e6.options) || void 0 === s4 ? void 0 : s4.signal) && void 0 !== i5 ? i5 : h5.webAuthnAbortService.createNewAbortSignal(), { data: c5, error: u5 } = await (0, h5.getCredential)({ publicKey: a5, signal: l5 });
        if (u5 || !c5) return this._returnResult({ data: null, error: null != u5 ? u5 : new r4.AuthUnknownError("WebAuthn ceremony failed", null) });
        const d6 = (0, h5.serializeCredentialRequestResponse)(c5);
        return this._verifyPasskeyAuthentication({ challengeId: n4.challenge_id, credential: d6 });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async registerPasskey(e6) {
      var t6, s4;
      (0, n3.assertPasskeyExperimentalEnabled)(this.experimental);
      try {
        if (!(0, h5.browserSupportsWebAuthn)()) return this._returnResult({ data: null, error: new r4.AuthUnknownError("Browser does not support WebAuthn", null) });
        const { data: n4, error: i5 } = await this._startPasskeyRegistration();
        if (i5 || !n4) return this._returnResult({ data: null, error: i5 });
        const o6 = (0, h5.deserializeCredentialCreationOptions)(n4.options), a5 = null !== (s4 = null === (t6 = null == e6 ? void 0 : e6.options) || void 0 === t6 ? void 0 : t6.signal) && void 0 !== s4 ? s4 : h5.webAuthnAbortService.createNewAbortSignal(), { data: l5, error: c5 } = await (0, h5.createCredential)({ publicKey: o6, signal: a5 });
        if (c5 || !l5) return this._returnResult({ data: null, error: null != c5 ? c5 : new r4.AuthUnknownError("WebAuthn ceremony failed", null) });
        const u5 = (0, h5.serializeCredentialCreationResponse)(l5);
        return this._verifyPasskeyRegistration({ challengeId: n4.challenge_id, credential: u5 });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async _startPasskeyRegistration() {
      (0, n3.assertPasskeyExperimentalEnabled)(this.experimental);
      try {
        return await this._useSession(async (e6) => {
          const { data: { session: t6 }, error: n4 } = e6;
          if (n4) return this._returnResult({ data: null, error: n4 });
          if (!t6) return this._returnResult({ data: null, error: new r4.AuthSessionMissingError() });
          const { data: i5, error: o6 } = await (0, s3._request)(this.fetch, "POST", `${this.url}/passkeys/registration/options`, { headers: this.headers, jwt: t6.access_token, body: {} });
          return o6 ? this._returnResult({ data: null, error: o6 }) : this._returnResult({ data: i5, error: null });
        });
      } catch (e6) {
        if ((0, r4.isAuthError)(e6)) return this._returnResult({ data: null, error: e6 });
        throw e6;
      }
    }
    async _verifyPasskeyRegistration(e6) {
      (0, n3.assertPasskeyExperimentalEnabled)(this.experimental);
      try {
        return await this._useSession(async (t6) => {
          const { data: { session: n4 }, error: i5 } = t6;
          if (i5) return this._returnResult({ data: null, error: i5 });
          if (!n4) return this._returnResult({ data: null, error: new r4.AuthSessionMissingError() });
          const { data: o6, error: a5 } = await (0, s3._request)(this.fetch, "POST", `${this.url}/passkeys/registration/verify`, { headers: this.headers, jwt: n4.access_token, body: { challenge_id: e6.challengeId, credential: e6.credential } });
          return a5 ? this._returnResult({ data: null, error: a5 }) : this._returnResult({ data: o6, error: null });
        });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async _startPasskeyAuthentication(e6) {
      var t6;
      (0, n3.assertPasskeyExperimentalEnabled)(this.experimental);
      try {
        const { data: r5, error: n4 } = await (0, s3._request)(this.fetch, "POST", `${this.url}/passkeys/authentication/options`, { headers: this.headers, body: { gotrue_meta_security: { captcha_token: null === (t6 = null == e6 ? void 0 : e6.options) || void 0 === t6 ? void 0 : t6.captchaToken } } });
        return n4 ? this._returnResult({ data: null, error: n4 }) : this._returnResult({ data: r5, error: null });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async _verifyPasskeyAuthentication(e6) {
      (0, n3.assertPasskeyExperimentalEnabled)(this.experimental);
      try {
        const { data: t6, error: r5 } = await (0, s3._request)(this.fetch, "POST", `${this.url}/passkeys/authentication/verify`, { headers: this.headers, body: { challenge_id: e6.challengeId, credential: e6.credential }, xform: s3._sessionResponse });
        return r5 ? this._returnResult({ data: null, error: r5 }) : (t6.session && (await this._saveSession(t6.session), await this._notifyAllSubscribers("SIGNED_IN", t6.session)), this._returnResult({ data: t6, error: null }));
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async _listPasskeys() {
      (0, n3.assertPasskeyExperimentalEnabled)(this.experimental);
      try {
        return await this._useSession(async (e6) => {
          const { data: { session: t6 }, error: n4 } = e6;
          if (n4) return this._returnResult({ data: null, error: n4 });
          if (!t6) return this._returnResult({ data: null, error: new r4.AuthSessionMissingError() });
          const { data: i5, error: o6 } = await (0, s3._request)(this.fetch, "GET", `${this.url}/passkeys`, { headers: this.headers, jwt: t6.access_token, xform: /* @__PURE__ */ __name((e7) => ({ data: e7, error: null }), "xform") });
          return o6 ? this._returnResult({ data: null, error: o6 }) : this._returnResult({ data: i5, error: null });
        });
      } catch (e6) {
        if ((0, r4.isAuthError)(e6)) return this._returnResult({ data: null, error: e6 });
        throw e6;
      }
    }
    async _updatePasskey(e6) {
      (0, n3.assertPasskeyExperimentalEnabled)(this.experimental);
      try {
        return await this._useSession(async (t6) => {
          const { data: { session: n4 }, error: i5 } = t6;
          if (i5) return this._returnResult({ data: null, error: i5 });
          if (!n4) return this._returnResult({ data: null, error: new r4.AuthSessionMissingError() });
          const { data: o6, error: a5 } = await (0, s3._request)(this.fetch, "PATCH", `${this.url}/passkeys/${e6.passkeyId}`, { headers: this.headers, jwt: n4.access_token, body: { friendly_name: e6.friendlyName } });
          return a5 ? this._returnResult({ data: null, error: a5 }) : this._returnResult({ data: o6, error: null });
        });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
    async _deletePasskey(e6) {
      (0, n3.assertPasskeyExperimentalEnabled)(this.experimental);
      try {
        return await this._useSession(async (t6) => {
          const { data: { session: n4 }, error: i5 } = t6;
          if (i5) return this._returnResult({ data: null, error: i5 });
          if (!n4) return this._returnResult({ data: null, error: new r4.AuthSessionMissingError() });
          const { error: o6 } = await (0, s3._request)(this.fetch, "DELETE", `${this.url}/passkeys/${e6.passkeyId}`, { headers: this.headers, jwt: n4.access_token, noResolveJson: true });
          return o6 ? this._returnResult({ data: null, error: o6 }) : this._returnResult({ data: null, error: null });
        });
      } catch (e7) {
        if ((0, r4.isAuthError)(e7)) return this._returnResult({ data: null, error: e7 });
        throw e7;
      }
    }
  };
  return g4.nextInstanceID = {}, At.default = g4, At;
}
function requireAuthAdminApi() {
  if (xt) return Dt;
  xt = 1, Object.defineProperty(Dt, "__esModule", { value: true });
  const e5 = p2.__importDefault(requireGoTrueAdminApi()).default;
  return Dt.default = e5, Dt;
}
function requireAuthClient() {
  if (qt) return Ft;
  qt = 1, Object.defineProperty(Ft, "__esModule", { value: true });
  const e5 = p2.__importDefault(requireGoTrueClient()).default;
  return Ft.default = e5, Ft;
}
function matchStringTarget(e5, t5) {
  if (t5 === e5) return true;
  if (t5.startsWith("*.")) {
    const r4 = t5.slice(2);
    if (e5.endsWith(r4) && (e5 === r4 || e5.endsWith("." + r4))) return true;
  }
  return false;
}
function _typeof(e5) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e6) {
    return typeof e6;
  } : function(e6) {
    return e6 && "function" == typeof Symbol && e6.constructor === Symbol && e6 !== Symbol.prototype ? "symbol" : typeof e6;
  })(e5);
}
function toPropertyKey(e5) {
  var t5 = (function(e6, t6) {
    if ("object" != _typeof(e6) || !e6) return e6;
    var r4 = e6[Symbol.toPrimitive];
    if (void 0 !== r4) {
      var s3 = r4.call(e6, t6);
      if ("object" != _typeof(s3)) return s3;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === t6 ? String : Number)(e6);
  })(e5, "string");
  return "symbol" == _typeof(t5) ? t5 : t5 + "";
}
function _defineProperty(e5, t5, r4) {
  return (t5 = toPropertyKey(t5)) in e5 ? Object.defineProperty(e5, t5, { value: r4, enumerable: true, configurable: true, writable: true }) : e5[t5] = r4, e5;
}
function ownKeys(e5, t5) {
  var r4 = Object.keys(e5);
  if (Object.getOwnPropertySymbols) {
    var s3 = Object.getOwnPropertySymbols(e5);
    t5 && (s3 = s3.filter(function(t6) {
      return Object.getOwnPropertyDescriptor(e5, t6).enumerable;
    })), r4.push.apply(r4, s3);
  }
  return r4;
}
function _objectSpread2(e5) {
  for (var t5 = 1; t5 < arguments.length; t5++) {
    var r4 = null != arguments[t5] ? arguments[t5] : {};
    t5 % 2 ? ownKeys(Object(r4), true).forEach(function(t6) {
      _defineProperty(e5, t6, r4[t6]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e5, Object.getOwnPropertyDescriptors(r4)) : ownKeys(Object(r4)).forEach(function(t6) {
      Object.defineProperty(e5, t6, Object.getOwnPropertyDescriptor(r4, t6));
    });
  }
  return e5;
}
function normalizeTracePropagation(e5) {
  return "boolean" == typeof e5 ? { enabled: e5 } : e5;
}
async function authenticatedWebClient(e5) {
  var n3;
  nn(e5, "Cache-Control", "private, no-store");
  const i4 = webRuntimeConfig(e5), o5 = Ve2(e5, "authorization");
  if (!(null == o5 ? void 0 : o5.startsWith("Bearer "))) throw createError({ statusCode: 401, statusMessage: "Sign in to Tracer." });
  if (!i4.supabaseUrl || !i4.supabasePublishableKey) throw createError({ statusCode: 503, statusMessage: "Account services are not configured." });
  const a4 = (l4 = i4.supabaseUrl, c4 = i4.supabasePublishableKey, new tr(l4, c4, { global: { headers: { Authorization: o5 } }, auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }));
  var l4, c4;
  const { data: u4, error: h5 } = await a4.auth.getUser(o5.slice(7));
  if (h5 || !u4.user) throw createError({ statusCode: 401, statusMessage: "Your session expired. Sign in again." });
  const d5 = webBindings(e5);
  if (d5) {
    if (!d5.WEB_RATE_LIMITER) throw createError({ statusCode: 503, statusMessage: "Account services are not configured." });
    const { success: e6 } = await d5.WEB_RATE_LIMITER.limit({ key: u4.user.id });
    if (!e6) throw createError({ statusCode: 429, statusMessage: "Too many requests. Wait a minute and retry." });
    return a4;
  }
  const p4 = Date.now();
  for (const [e6, t5] of rr) p4 - t5.start > 6e4 && rr.delete(e6);
  const f4 = null != (n3 = rr.get(u4.user.id)) ? n3 : { start: p4, count: 0 };
  if (f4.count++, rr.set(u4.user.id, f4), f4.count > 120) throw createError({ statusCode: 429, statusMessage: "Too many requests. Wait a minute and retry." });
  return a4;
}
async function readWebProviderKeys(e5) {
  const t5 = await authenticatedWebClient(e5), { data: r4, error: n3 } = await t5.rpc("list_tracer_user_api_keys");
  if (n3) throw createError({ statusCode: 502, statusMessage: "Could not access your saved provider keys." });
  return Object.fromEntries((null != r4 ? r4 : []).map((e6) => [e6.provider_id, e6.api_key]));
}
var i2, o3, a2, l2, extendStatics, __assign, c2, u2, ownKeys$3, h3, d2, p2, f2, g2, _3, FunctionsError, y3, m4, b3, getRetryDelay, w3, v3, E3, S3, A3, k3, T3, R3, O3, P3, C3, I3, j3, N3, $3, L3, U3, x3, D3, q3, F3, B3, M3, K3, closure, W3, H3, V3, G3, J3, z3, Y3, X3, Q3, Z3, ee3, te3, re3, se3, ne3, ie3, oe3, ae3, le3, ce3, ue3, he3, de3, pe3, fe3, ge3, _e3, ye3, me3, be3, we3, ve3, Ee2, Se2, Ae3, ke3, Te3, Re2, Oe2, Pe2, Ce2, Ie2, je2, Ne2, $e3, recursiveToCamel, encodeStoragePath, _getErrorMessage, _getRequestParams, Le2, Ue2, xe2, De2, qe2, Fe2, Be2, Me2, Ke2, We2, He2, Ve3, Ge2, Je2, ze2, Ye2, Xe2, Qe2, Ze2, et, tt, rt, st, nt, it, ot, at, lt, ct, ut, ht, dt, pt, ft, gt, _t, yt, mt, bt, wt, vt, Et, St, At, kt, Tt, Rt, Ot, Pt, Ct, It, jt, Nt, $t, Lt, Ut, xt, Dt, qt, Ft, Bt, Mt, Kt, Wt, Ht, Vt, Gt, Jt, zt, Yt, isNewApiKey, Xt, fetchWithAuth, Qt, Zt, er, tr, rr;
var init_web_auth = __esm({
  "../.output-cloudflare/server/chunks/_/web-auth.mjs"() {
    init_modules_watch_stub();
    init_nitro();
    __name(webBindings, "webBindings");
    __name(webRuntimeConfig, "webRuntimeConfig");
    i2 = /* @__PURE__ */ Symbol.for("@supabase/supabase-js.traceContextExtractor");
    o3 = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    __name(getDefaultExportFromNamespaceIfNotNamed, "getDefaultExportFromNamespaceIfNotNamed");
    a2 = {};
    l2 = {};
    extendStatics = /* @__PURE__ */ __name(function(e5, t5) {
      return extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e6, t6) {
        e6.__proto__ = t6;
      } || function(e6, t6) {
        for (var r4 in t6) Object.prototype.hasOwnProperty.call(t6, r4) && (e6[r4] = t6[r4]);
      }, extendStatics(e5, t5);
    }, "extendStatics");
    __name(__extends, "__extends");
    __assign = /* @__PURE__ */ __name(function() {
      return __assign = Object.assign || function(e5) {
        for (var t5, r4 = 1, s3 = arguments.length; r4 < s3; r4++) for (var n3 in t5 = arguments[r4]) Object.prototype.hasOwnProperty.call(t5, n3) && (e5[n3] = t5[n3]);
        return e5;
      }, __assign.apply(this, arguments);
    }, "__assign");
    __name(__rest, "__rest");
    __name(__decorate, "__decorate");
    __name(__param, "__param");
    __name(__esDecorate, "__esDecorate");
    __name(__runInitializers, "__runInitializers");
    __name(__propKey, "__propKey");
    __name(__setFunctionName, "__setFunctionName");
    __name(__metadata, "__metadata");
    __name(__awaiter, "__awaiter");
    __name(__generator, "__generator");
    c2 = Object.create ? function(e5, t5, r4, s3) {
      void 0 === s3 && (s3 = r4);
      var n3 = Object.getOwnPropertyDescriptor(t5, r4);
      n3 && !("get" in n3 ? !t5.__esModule : n3.writable || n3.configurable) || (n3 = { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return t5[r4];
      }, "get") }), Object.defineProperty(e5, s3, n3);
    } : function(e5, t5, r4, s3) {
      void 0 === s3 && (s3 = r4), e5[s3] = t5[r4];
    };
    __name(__exportStar, "__exportStar");
    __name(__values, "__values");
    __name(__read, "__read");
    __name(__spread, "__spread");
    __name(__spreadArrays, "__spreadArrays");
    __name(__spreadArray, "__spreadArray");
    __name(__await, "__await");
    __name(__asyncGenerator, "__asyncGenerator");
    __name(__asyncDelegator, "__asyncDelegator");
    __name(__asyncValues, "__asyncValues");
    __name(__makeTemplateObject, "__makeTemplateObject");
    u2 = Object.create ? function(e5, t5) {
      Object.defineProperty(e5, "default", { enumerable: true, value: t5 });
    } : function(e5, t5) {
      e5.default = t5;
    };
    ownKeys$3 = /* @__PURE__ */ __name(function(e5) {
      return ownKeys$3 = Object.getOwnPropertyNames || function(e6) {
        var t5 = [];
        for (var r4 in e6) Object.prototype.hasOwnProperty.call(e6, r4) && (t5[t5.length] = r4);
        return t5;
      }, ownKeys$3(e5);
    }, "ownKeys$3");
    __name(__importStar, "__importStar");
    __name(__importDefault, "__importDefault");
    __name(__classPrivateFieldGet, "__classPrivateFieldGet");
    __name(__classPrivateFieldSet, "__classPrivateFieldSet");
    __name(__classPrivateFieldIn, "__classPrivateFieldIn");
    __name(__addDisposableResource, "__addDisposableResource");
    h3 = "function" == typeof SuppressedError ? SuppressedError : function(e5, t5, r4) {
      var s3 = new Error(r4);
      return s3.name = "SuppressedError", s3.error = e5, s3.suppressed = t5, s3;
    };
    __name(__disposeResources, "__disposeResources");
    __name(__rewriteRelativeImportExtension, "__rewriteRelativeImportExtension");
    d2 = { __extends, __assign, __rest, __decorate, __param, __esDecorate, __runInitializers, __propKey, __setFunctionName, __metadata, __awaiter, __generator, __createBinding: c2, __exportStar, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet, __classPrivateFieldIn, __addDisposableResource, __disposeResources, __rewriteRelativeImportExtension };
    p2 = getDefaultExportFromNamespaceIfNotNamed(Object.freeze(Object.defineProperty({ __proto__: null, __addDisposableResource, get __assign() {
      return __assign;
    }, __asyncDelegator, __asyncGenerator, __asyncValues, __await, __awaiter, __classPrivateFieldGet, __classPrivateFieldIn, __classPrivateFieldSet, __createBinding: c2, __decorate, __disposeResources, __esDecorate, __exportStar, __extends, __generator, __importDefault, __importStar, __makeTemplateObject, __metadata, __param, __propKey, __read, __rest, __rewriteRelativeImportExtension, __runInitializers, __setFunctionName, __spread, __spreadArray, __spreadArrays, __values, default: d2 }, Symbol.toStringTag, { value: "Module" })));
    f2 = {};
    Object.defineProperty(f2, "__esModule", { value: true }), f2.resolveFetch = void 0;
    f2.resolveFetch = (e5) => e5 ? (...t5) => e5(...t5) : (...e6) => fetch(...e6);
    _3 = {};
    Object.defineProperty(_3, "__esModule", { value: true }), _3.FunctionRegion = _3.FunctionsHttpError = _3.FunctionsRelayError = _3.FunctionsFetchError = _3.FunctionsError = void 0;
    FunctionsError = class extends Error {
      static {
        __name(this, "FunctionsError");
      }
      constructor(e5, t5 = "FunctionsError", r4) {
        super(e5), this.name = t5, this.context = r4;
      }
      toJSON() {
        return { name: this.name, message: this.message, context: this.context };
      }
    };
    _3.FunctionsError = FunctionsError;
    _3.FunctionsFetchError = class extends FunctionsError {
      constructor(e5) {
        super("Failed to send a request to the Edge Function", "FunctionsFetchError", e5);
      }
    };
    _3.FunctionsRelayError = class extends FunctionsError {
      constructor(e5) {
        super("Relay Error invoking the Edge Function", "FunctionsRelayError", e5);
      }
    };
    _3.FunctionsHttpError = class extends FunctionsError {
      constructor(e5) {
        super("Edge Function returned a non-2xx status code", "FunctionsHttpError", e5);
      }
    }, (function(e5) {
      e5.Any = "any", e5.ApNortheast1 = "ap-northeast-1", e5.ApNortheast2 = "ap-northeast-2", e5.ApSouth1 = "ap-south-1", e5.ApSoutheast1 = "ap-southeast-1", e5.ApSoutheast2 = "ap-southeast-2", e5.CaCentral1 = "ca-central-1", e5.EuCentral1 = "eu-central-1", e5.EuWest1 = "eu-west-1", e5.EuWest2 = "eu-west-2", e5.EuWest3 = "eu-west-3", e5.SaEast1 = "sa-east-1", e5.UsEast1 = "us-east-1", e5.UsWest1 = "us-west-1", e5.UsWest2 = "us-west-2";
    })(g2 || (_3.FunctionRegion = g2 = {})), Object.defineProperty(l2, "__esModule", { value: true }), l2.FunctionsClient = void 0;
    y3 = p2;
    m4 = f2;
    b3 = _3;
    l2.FunctionsClient = class {
      constructor(e5, { headers: t5 = {}, customFetch: r4, region: s3 = b3.FunctionRegion.Any } = {}) {
        this.url = e5, this.headers = t5, this.region = s3, this.fetch = (0, m4.resolveFetch)(r4);
      }
      setAuth(e5) {
        this.headers.Authorization = `Bearer ${e5}`;
      }
      invoke(e5) {
        return y3.__awaiter(this, arguments, void 0, function* (e6, t5 = {}) {
          var r4, s3;
          let n3, i4, o5;
          try {
            const { headers: s4, method: a4, body: l4, signal: c4, timeout: u4 } = t5;
            let h5 = {}, { region: d5 } = t5;
            d5 || (d5 = this.region);
            const p4 = new URL(`${this.url}/${e6}`);
            let f4;
            d5 && "any" !== d5 && (h5["x-region"] = d5, p4.searchParams.set("forceFunctionRegion", d5));
            const g4 = !!s4 && Object.keys(s4).some((e7) => "content-type" === e7.toLowerCase());
            l4 && !g4 ? "undefined" != typeof Blob && l4 instanceof Blob || l4 instanceof ArrayBuffer ? (h5["Content-Type"] = "application/octet-stream", f4 = l4) : "string" == typeof l4 ? (h5["Content-Type"] = "text/plain", f4 = l4) : "undefined" != typeof FormData && l4 instanceof FormData ? f4 = l4 : (h5["Content-Type"] = "application/json", f4 = JSON.stringify(l4)) : f4 = !l4 || "string" == typeof l4 || "undefined" != typeof Blob && l4 instanceof Blob || l4 instanceof ArrayBuffer || "undefined" != typeof FormData && l4 instanceof FormData ? l4 : JSON.stringify(l4);
            let _5 = c4;
            u4 && (i4 = new AbortController(), n3 = setTimeout(() => i4.abort(), u4), c4 ? (_5 = i4.signal, o5 = /* @__PURE__ */ __name(() => i4.abort(), "o"), c4.addEventListener("abort", o5)) : _5 = i4.signal);
            const y5 = yield this.fetch(p4.toString(), { method: a4 || "POST", headers: Object.assign(Object.assign(Object.assign({}, h5), this.headers), s4), body: f4, signal: _5 }).catch((e7) => {
              throw new b3.FunctionsFetchError(e7);
            }), m5 = y5.headers.get("x-relay-error");
            if (m5 && "true" === m5) throw new b3.FunctionsRelayError(y5);
            if (!y5.ok) throw new b3.FunctionsHttpError(y5);
            let w5, v5 = (null !== (r4 = y5.headers.get("Content-Type")) && void 0 !== r4 ? r4 : "text/plain").split(";")[0].trim().toLowerCase();
            return w5 = "application/json" === v5 ? yield y5.json() : "application/octet-stream" === v5 || "application/pdf" === v5 ? yield y5.blob() : "text/event-stream" === v5 ? y5 : "multipart/form-data" === v5 ? yield y5.formData() : yield y5.text(), { data: w5, error: null, response: y5 };
          } catch (e7) {
            return { data: null, error: e7, response: e7 instanceof b3.FunctionsHttpError || e7 instanceof b3.FunctionsRelayError ? e7.context : void 0 };
          } finally {
            n3 && clearTimeout(n3), o5 && (null === (s3 = t5.signal) || void 0 === s3 || s3.removeEventListener("abort", o5));
          }
        });
      }
    }, (function(e5) {
      Object.defineProperty(e5, "__esModule", { value: true }), e5.FunctionRegion = e5.FunctionsRelayError = e5.FunctionsHttpError = e5.FunctionsFetchError = e5.FunctionsError = e5.FunctionsClient = void 0;
      var t5 = l2;
      Object.defineProperty(e5, "FunctionsClient", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return t5.FunctionsClient;
      }, "get") });
      var r4 = _3;
      Object.defineProperty(e5, "FunctionsError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return r4.FunctionsError;
      }, "get") }), Object.defineProperty(e5, "FunctionsFetchError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return r4.FunctionsFetchError;
      }, "get") }), Object.defineProperty(e5, "FunctionsHttpError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return r4.FunctionsHttpError;
      }, "get") }), Object.defineProperty(e5, "FunctionsRelayError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return r4.FunctionsRelayError;
      }, "get") }), Object.defineProperty(e5, "FunctionRegion", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return r4.FunctionRegion;
      }, "get") });
    })(a2);
    getRetryDelay = /* @__PURE__ */ __name((e5) => Math.min(1e3 * 2 ** e5, 3e4), "getRetryDelay");
    w3 = [520, 503];
    v3 = ["GET", "HEAD", "OPTIONS"];
    E3 = class extends Error {
      static {
        __name(this, "E");
      }
      constructor(e5) {
        super(e5.message), this.name = "PostgrestError", this.details = e5.details, this.hint = e5.hint, this.code = e5.code;
      }
      toJSON() {
        return { name: this.name, message: this.message, details: this.details, hint: this.hint, code: this.code };
      }
    };
    __name(_typeof$2, "_typeof$2");
    __name(toPropertyKey$2, "toPropertyKey$2");
    __name(_defineProperty$2, "_defineProperty$2");
    __name(ownKeys$2, "ownKeys$2");
    __name(_objectSpread2$2, "_objectSpread2$2");
    __name(sleep, "sleep");
    __name(shouldRetry, "shouldRetry");
    S3 = class {
      static {
        __name(this, "S");
      }
      constructor(e5) {
        var t5, r4, s3, n3, i4;
        this.shouldThrowOnError = false, this.retryEnabled = true, this.method = e5.method, this.url = e5.url, this.headers = new Headers(e5.headers), this.schema = e5.schema, this.body = e5.body, this.shouldThrowOnError = null !== (t5 = e5.shouldThrowOnError) && void 0 !== t5 && t5, this.signal = e5.signal, this.isMaybeSingle = null !== (r4 = e5.isMaybeSingle) && void 0 !== r4 && r4, this.shouldStripNulls = null !== (s3 = e5.shouldStripNulls) && void 0 !== s3 && s3, this.urlLengthLimit = null !== (n3 = e5.urlLengthLimit) && void 0 !== n3 ? n3 : 8e3, this.retryEnabled = null === (i4 = e5.retry) || void 0 === i4 || i4, e5.fetch ? this.fetch = e5.fetch : this.fetch = fetch;
      }
      throwOnError() {
        return this.shouldThrowOnError = true, this;
      }
      stripNulls() {
        if ("text/csv" === this.headers.get("Accept")) throw new Error("stripNulls() cannot be used with csv()");
        return this.shouldStripNulls = true, this;
      }
      setHeader(e5, t5) {
        return this.headers = new Headers(this.headers), this.headers.set(e5, t5), this;
      }
      retry(e5) {
        return this.retryEnabled = e5, this;
      }
      then(e5, t5) {
        var r4 = this;
        if (void 0 === this.schema || (["GET", "HEAD"].includes(this.method) ? this.headers.set("Accept-Profile", this.schema) : this.headers.set("Content-Profile", this.schema)), "GET" !== this.method && "HEAD" !== this.method && this.headers.set("Content-Type", "application/json"), this.shouldStripNulls) {
          const e6 = this.headers.get("Accept");
          "application/vnd.pgrst.object+json" === e6 ? this.headers.set("Accept", "application/vnd.pgrst.object+json;nulls=stripped") : e6 && "application/json" !== e6 || this.headers.set("Accept", "application/vnd.pgrst.array+json;nulls=stripped");
        }
        const s3 = this.fetch;
        let n3 = (async () => {
          let e6 = 0;
          for (; ; ) {
            const i4 = {};
            let o5;
            r4.headers.forEach((e7, t7) => {
              i4[t7] = e7;
            }), e6 > 0 && (i4["X-Retry-Count"] = String(e6));
            try {
              o5 = await s3(r4.url.toString(), { method: r4.method, headers: i4, body: JSON.stringify(r4.body, (e7, t7) => "bigint" == typeof t7 ? t7.toString() : t7), signal: r4.signal });
            } catch (t7) {
              if ("AbortError" === (null == t7 ? void 0 : t7.name) || "ABORT_ERR" === (null == t7 ? void 0 : t7.code)) throw t7;
              if (!v3.includes(r4.method)) throw t7;
              if (r4.retryEnabled && e6 < 3) {
                const t8 = getRetryDelay(e6);
                e6++, await sleep(t8, r4.signal);
                continue;
              }
              throw t7;
            }
            if (shouldRetry(r4.method, o5.status, e6, r4.retryEnabled)) {
              var t6, n4;
              const s4 = null !== (t6 = null === (n4 = o5.headers) || void 0 === n4 ? void 0 : n4.get("Retry-After")) && void 0 !== t6 ? t6 : null, i5 = null !== s4 ? 1e3 * Math.max(0, parseInt(s4, 10) || 0) : getRetryDelay(e6);
              await o5.text(), e6++, await sleep(i5, r4.signal);
              continue;
            }
            return await r4.processResponse(o5);
          }
        })();
        return this.shouldThrowOnError || (n3 = n3.catch((e6) => {
          var t6;
          let r5 = "", s4 = "", n4 = "";
          const i4 = null == e6 ? void 0 : e6.cause;
          if (i4) {
            var o5, a4, l4, c4;
            const t7 = null !== (o5 = null == i4 ? void 0 : i4.message) && void 0 !== o5 ? o5 : "", s5 = null !== (a4 = null == i4 ? void 0 : i4.code) && void 0 !== a4 ? a4 : "";
            r5 = `${null !== (l4 = null == e6 ? void 0 : e6.name) && void 0 !== l4 ? l4 : "FetchError"}: ${null == e6 ? void 0 : e6.message}`, r5 += `

Caused by: ${null !== (c4 = null == i4 ? void 0 : i4.name) && void 0 !== c4 ? c4 : "Error"}: ${t7}`, s5 && (r5 += ` (${s5})`), (null == i4 ? void 0 : i4.stack) && (r5 += `
${i4.stack}`);
          } else {
            var u4;
            r5 = null !== (u4 = null == e6 ? void 0 : e6.stack) && void 0 !== u4 ? u4 : "";
          }
          const h5 = this.url.toString().length;
          return "AbortError" === (null == e6 ? void 0 : e6.name) || "ABORT_ERR" === (null == e6 ? void 0 : e6.code) ? (n4 = "", s4 = "Request was aborted (timeout or manual cancellation)", h5 > this.urlLengthLimit && (s4 += `. Note: Your request URL is ${h5} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)) : "HeadersOverflowError" !== (null == i4 ? void 0 : i4.name) && "UND_ERR_HEADERS_OVERFLOW" !== (null == i4 ? void 0 : i4.code) || (n4 = "", s4 = "HTTP headers exceeded server limits (typically 16KB)", h5 > this.urlLengthLimit && (s4 += `. Your request URL is ${h5} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)), { success: false, error: { message: `${null !== (t6 = null == e6 ? void 0 : e6.name) && void 0 !== t6 ? t6 : "FetchError"}: ${null == e6 ? void 0 : e6.message}`, details: r5, hint: s4, code: n4 }, data: null, count: null, status: 0, statusText: "" };
        })), n3.then(e5, t5);
      }
      async processResponse(e5) {
        var t5 = this;
        let r4 = null, s3 = null, n3 = null, i4 = e5.status, o5 = e5.statusText;
        if (e5.ok) {
          var a4, l4;
          if ("HEAD" !== t5.method) {
            var c4;
            const n4 = await e5.text();
            if ("" === n4) ;
            else if ("text/csv" === t5.headers.get("Accept")) s3 = n4;
            else if (t5.headers.get("Accept") && (null === (c4 = t5.headers.get("Accept")) || void 0 === c4 ? void 0 : c4.includes("application/vnd.pgrst.plan+text"))) s3 = n4;
            else try {
              s3 = JSON.parse(n4);
            } catch (e6) {
              if (r4 = { message: n4 }, s3 = null, t5.shouldThrowOnError) throw new E3({ message: n4, details: "", hint: "", code: "" });
            }
          }
          const h5 = null === (a4 = t5.headers.get("Prefer")) || void 0 === a4 ? void 0 : a4.match(/count=(exact|planned|estimated)/), d5 = null === (l4 = e5.headers.get("content-range")) || void 0 === l4 ? void 0 : l4.split("/");
          if (h5 && d5 && d5.length > 1 && (n3 = parseInt(d5[1])), t5.isMaybeSingle && Array.isArray(s3)) if (s3.length > 1) {
            var u4;
            if (r4 = { code: "PGRST116", details: `Results contain ${s3.length} rows, application/vnd.pgrst.object+json requires 1 row`, hint: null, message: "JSON object requested, multiple (or no) rows returned" }, s3 = null, n3 = null, i4 = 406, o5 = "Not Acceptable", t5.shouldThrowOnError) throw new E3(_objectSpread2$2(_objectSpread2$2({}, r4), {}, { hint: null !== (u4 = r4.hint) && void 0 !== u4 ? u4 : "" }));
          } else s3 = 1 === s3.length ? s3[0] : null;
        } else {
          const n4 = await e5.text();
          try {
            r4 = JSON.parse(n4), Array.isArray(r4) && 404 === e5.status && (s3 = [], r4 = null, i4 = 200, o5 = "OK");
          } catch (t6) {
            404 === e5.status && "" === n4 ? (i4 = 204, o5 = "No Content") : r4 = { message: n4 };
          }
          if (r4 && t5.shouldThrowOnError) throw new E3(r4);
        }
        return { success: null === r4, error: r4, data: s3, count: n3, status: i4, statusText: o5 };
      }
      returns() {
        return this;
      }
      overrideTypes() {
        return this;
      }
    };
    A3 = class extends S3 {
      static {
        __name(this, "A");
      }
      throwOnError() {
        return super.throwOnError();
      }
      select(e5) {
        let t5 = false;
        const r4 = (null != e5 ? e5 : "*").split("").map((e6) => /\s/.test(e6) && !t5 ? "" : ('"' === e6 && (t5 = !t5), e6)).join("");
        return this.url.searchParams.set("select", r4), this.headers.append("Prefer", "return=representation"), this;
      }
      order(e5, { ascending: t5 = true, nullsFirst: r4, foreignTable: s3, referencedTable: n3 = s3 } = {}) {
        const i4 = n3 ? `${n3}.order` : "order", o5 = this.url.searchParams.get(i4);
        return this.url.searchParams.set(i4, `${o5 ? `${o5},` : ""}${e5}.${t5 ? "asc" : "desc"}${void 0 === r4 ? "" : r4 ? ".nullsfirst" : ".nullslast"}`), this;
      }
      limit(e5, { foreignTable: t5, referencedTable: r4 = t5 } = {}) {
        const s3 = void 0 === r4 ? "limit" : `${r4}.limit`;
        return this.url.searchParams.set(s3, `${e5}`), this;
      }
      range(e5, t5, { foreignTable: r4, referencedTable: s3 = r4 } = {}) {
        const n3 = void 0 === s3 ? "offset" : `${s3}.offset`, i4 = void 0 === s3 ? "limit" : `${s3}.limit`;
        return this.url.searchParams.set(n3, `${e5}`), this.url.searchParams.set(i4, "" + (t5 - e5 + 1)), this;
      }
      abortSignal(e5) {
        return this.signal = e5, this;
      }
      single() {
        return this.headers.set("Accept", "application/vnd.pgrst.object+json"), this;
      }
      maybeSingle() {
        return this.isMaybeSingle = true, this;
      }
      csv() {
        return this.headers.set("Accept", "text/csv"), this;
      }
      geojson() {
        return this.headers.set("Accept", "application/geo+json"), this;
      }
      explain({ analyze: e5 = false, verbose: t5 = false, settings: r4 = false, buffers: s3 = false, wal: n3 = false, format: i4 = "text" } = {}) {
        var o5;
        const a4 = [e5 ? "analyze" : null, t5 ? "verbose" : null, r4 ? "settings" : null, s3 ? "buffers" : null, n3 ? "wal" : null].filter(Boolean).join("|"), l4 = null !== (o5 = this.headers.get("Accept")) && void 0 !== o5 ? o5 : "application/json";
        return this.headers.set("Accept", `application/vnd.pgrst.plan+${i4}; for="${l4}"; options=${a4};`), this;
      }
      rollback() {
        return this.headers.append("Prefer", "tx=rollback"), this;
      }
      returns() {
        return this;
      }
      maxAffected(e5) {
        return this.headers.append("Prefer", "handling=strict"), this.headers.append("Prefer", `max-affected=${e5}`), this;
      }
    };
    k3 = new RegExp("[,()]");
    R3 = class extends A3 {
      static {
        __name(this, "R");
      }
      throwOnError() {
        return super.throwOnError();
      }
      eq(e5, t5) {
        return this.url.searchParams.append(e5, `eq.${t5}`), this;
      }
      neq(e5, t5) {
        return this.url.searchParams.append(e5, `neq.${t5}`), this;
      }
      gt(e5, t5) {
        return this.url.searchParams.append(e5, `gt.${t5}`), this;
      }
      gte(e5, t5) {
        return this.url.searchParams.append(e5, `gte.${t5}`), this;
      }
      lt(e5, t5) {
        return this.url.searchParams.append(e5, `lt.${t5}`), this;
      }
      lte(e5, t5) {
        return this.url.searchParams.append(e5, `lte.${t5}`), this;
      }
      like(e5, t5) {
        return this.url.searchParams.append(e5, `like.${t5}`), this;
      }
      likeAllOf(e5, t5) {
        return this.url.searchParams.append(e5, `like(all).{${t5.join(",")}}`), this;
      }
      likeAnyOf(e5, t5) {
        return this.url.searchParams.append(e5, `like(any).{${t5.join(",")}}`), this;
      }
      ilike(e5, t5) {
        return this.url.searchParams.append(e5, `ilike.${t5}`), this;
      }
      ilikeAllOf(e5, t5) {
        return this.url.searchParams.append(e5, `ilike(all).{${t5.join(",")}}`), this;
      }
      ilikeAnyOf(e5, t5) {
        return this.url.searchParams.append(e5, `ilike(any).{${t5.join(",")}}`), this;
      }
      regexMatch(e5, t5) {
        return this.url.searchParams.append(e5, `match.${t5}`), this;
      }
      regexIMatch(e5, t5) {
        return this.url.searchParams.append(e5, `imatch.${t5}`), this;
      }
      is(e5, t5) {
        return this.url.searchParams.append(e5, `is.${t5}`), this;
      }
      isDistinct(e5, t5) {
        return this.url.searchParams.append(e5, `isdistinct.${t5}`), this;
      }
      in(e5, t5) {
        const r4 = Array.from(new Set(t5)).map((e6) => "string" == typeof e6 && k3.test(e6) ? `"${e6}"` : `${e6}`).join(",");
        return this.url.searchParams.append(e5, `in.(${r4})`), this;
      }
      notIn(e5, t5) {
        const r4 = Array.from(new Set(t5)).map((e6) => "string" == typeof e6 && k3.test(e6) ? `"${e6}"` : `${e6}`).join(",");
        return this.url.searchParams.append(e5, `not.in.(${r4})`), this;
      }
      contains(e5, t5) {
        return "string" == typeof t5 ? this.url.searchParams.append(e5, `cs.${t5}`) : Array.isArray(t5) ? this.url.searchParams.append(e5, `cs.{${t5.join(",")}}`) : this.url.searchParams.append(e5, `cs.${JSON.stringify(t5)}`), this;
      }
      containedBy(e5, t5) {
        return "string" == typeof t5 ? this.url.searchParams.append(e5, `cd.${t5}`) : Array.isArray(t5) ? this.url.searchParams.append(e5, `cd.{${t5.join(",")}}`) : this.url.searchParams.append(e5, `cd.${JSON.stringify(t5)}`), this;
      }
      rangeGt(e5, t5) {
        return this.url.searchParams.append(e5, `sr.${t5}`), this;
      }
      rangeGte(e5, t5) {
        return this.url.searchParams.append(e5, `nxl.${t5}`), this;
      }
      rangeLt(e5, t5) {
        return this.url.searchParams.append(e5, `sl.${t5}`), this;
      }
      rangeLte(e5, t5) {
        return this.url.searchParams.append(e5, `nxr.${t5}`), this;
      }
      rangeAdjacent(e5, t5) {
        return this.url.searchParams.append(e5, `adj.${t5}`), this;
      }
      overlaps(e5, t5) {
        return "string" == typeof t5 ? this.url.searchParams.append(e5, `ov.${t5}`) : this.url.searchParams.append(e5, `ov.{${t5.join(",")}}`), this;
      }
      textSearch(e5, t5, { config: r4, type: s3 } = {}) {
        let n3 = "";
        "plain" === s3 ? n3 = "pl" : "phrase" === s3 ? n3 = "ph" : "websearch" === s3 && (n3 = "w");
        const i4 = void 0 === r4 ? "" : `(${r4})`;
        return this.url.searchParams.append(e5, `${n3}fts${i4}.${t5}`), this;
      }
      match(e5) {
        return Object.entries(e5).filter(([e6, t5]) => void 0 !== t5).forEach(([e6, t5]) => {
          this.url.searchParams.append(e6, `eq.${t5}`);
        }), this;
      }
      not(e5, t5, r4) {
        return this.url.searchParams.append(e5, `not.${t5}.${r4}`), this;
      }
      or(e5, { foreignTable: t5, referencedTable: r4 = t5 } = {}) {
        const s3 = r4 ? `${r4}.or` : "or";
        return this.url.searchParams.append(s3, `(${e5})`), this;
      }
      filter(e5, t5, r4) {
        return this.url.searchParams.append(e5, `${t5}.${r4}`), this;
      }
    };
    O3 = class {
      static {
        __name(this, "O");
      }
      constructor(e5, { headers: t5 = {}, schema: r4, fetch: s3, urlLengthLimit: n3 = 8e3, retry: i4 }) {
        this.url = e5, this.headers = new Headers(t5), this.schema = r4, this.fetch = s3, this.urlLengthLimit = n3, this.retry = i4;
      }
      cloneRequestState() {
        return { url: new URL(this.url.toString()), headers: new Headers(this.headers) };
      }
      select(e5, t5) {
        const { head: r4 = false, count: s3 } = null != t5 ? t5 : {}, n3 = r4 ? "HEAD" : "GET";
        let i4 = false;
        const o5 = (null != e5 ? e5 : "*").split("").map((e6) => /\s/.test(e6) && !i4 ? "" : ('"' === e6 && (i4 = !i4), e6)).join(""), { url: a4, headers: l4 } = this.cloneRequestState();
        return a4.searchParams.set("select", o5), s3 && l4.append("Prefer", `count=${s3}`), new R3({ method: n3, url: a4, headers: l4, schema: this.schema, fetch: this.fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
      }
      insert(e5, { count: t5, defaultToNull: r4 = true } = {}) {
        var s3;
        const { url: n3, headers: i4 } = this.cloneRequestState();
        if (t5 && i4.append("Prefer", `count=${t5}`), r4 || i4.append("Prefer", "missing=default"), Array.isArray(e5)) {
          const t6 = e5.reduce((e6, t7) => e6.concat(Object.keys(t7)), []);
          if (t6.length > 0) {
            const e6 = [...new Set(t6)].map((e7) => `"${e7}"`);
            n3.searchParams.set("columns", e6.join(","));
          }
        }
        return new R3({ method: "POST", url: n3, headers: i4, schema: this.schema, body: e5, fetch: null !== (s3 = this.fetch) && void 0 !== s3 ? s3 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
      }
      upsert(e5, { onConflict: t5, ignoreDuplicates: r4 = false, count: s3, defaultToNull: n3 = true } = {}) {
        var i4;
        const { url: o5, headers: a4 } = this.cloneRequestState();
        if (a4.append("Prefer", `resolution=${r4 ? "ignore" : "merge"}-duplicates`), void 0 !== t5 && o5.searchParams.set("on_conflict", t5), s3 && a4.append("Prefer", `count=${s3}`), n3 || a4.append("Prefer", "missing=default"), Array.isArray(e5)) {
          const t6 = e5.reduce((e6, t7) => e6.concat(Object.keys(t7)), []);
          if (t6.length > 0) {
            const e6 = [...new Set(t6)].map((e7) => `"${e7}"`);
            o5.searchParams.set("columns", e6.join(","));
          }
        }
        return new R3({ method: "POST", url: o5, headers: a4, schema: this.schema, body: e5, fetch: null !== (i4 = this.fetch) && void 0 !== i4 ? i4 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
      }
      update(e5, { count: t5 } = {}) {
        var r4;
        const { url: s3, headers: n3 } = this.cloneRequestState();
        return t5 && n3.append("Prefer", `count=${t5}`), new R3({ method: "PATCH", url: s3, headers: n3, schema: this.schema, body: e5, fetch: null !== (r4 = this.fetch) && void 0 !== r4 ? r4 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
      }
      delete({ count: e5 } = {}) {
        var t5;
        const { url: r4, headers: s3 } = this.cloneRequestState();
        return e5 && s3.append("Prefer", `count=${e5}`), new R3({ method: "DELETE", url: r4, headers: s3, schema: this.schema, fetch: null !== (t5 = this.fetch) && void 0 !== t5 ? t5 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
      }
    };
    P3 = class PostgrestClient {
      static {
        __name(this, "PostgrestClient");
      }
      constructor(e5, { headers: t5 = {}, schema: r4, fetch: s3, timeout: n3, urlLengthLimit: i4 = 8e3, retry: o5 } = {}) {
        this.url = e5, this.headers = new Headers(t5), this.schemaName = r4, this.urlLengthLimit = i4;
        const a4 = null != s3 ? s3 : globalThis.fetch;
        this.fetch = void 0 !== n3 && n3 > 0 ? (e6, t6) => {
          const r5 = new AbortController(), s4 = setTimeout(() => r5.abort(), n3), i5 = null == t6 ? void 0 : t6.signal;
          if (i5) {
            if (i5.aborted) return clearTimeout(s4), a4(e6, t6);
            const abortHandler = /* @__PURE__ */ __name(() => {
              clearTimeout(s4), r5.abort();
            }, "abortHandler");
            return i5.addEventListener("abort", abortHandler, { once: true }), a4(e6, _objectSpread2$2(_objectSpread2$2({}, t6), {}, { signal: r5.signal })).finally(() => {
              clearTimeout(s4), i5.removeEventListener("abort", abortHandler);
            });
          }
          return a4(e6, _objectSpread2$2(_objectSpread2$2({}, t6), {}, { signal: r5.signal })).finally(() => clearTimeout(s4));
        } : a4, this.retry = o5;
      }
      from(e5) {
        if (!e5 || "string" != typeof e5 || "" === e5.trim()) throw new Error("Invalid relation name: relation must be a non-empty string.");
        return new O3(new URL(`${this.url}/${e5}`), { headers: new Headers(this.headers), schema: this.schemaName, fetch: this.fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
      }
      schema(e5) {
        return new PostgrestClient(this.url, { headers: this.headers, schema: e5, fetch: this.fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
      }
      rpc(e5, t5 = {}, { head: r4 = false, get: s3 = false, count: n3 } = {}) {
        var i4;
        let o5;
        const a4 = new URL(`${this.url}/rpc/${e5}`);
        let l4;
        const _isObject2 = /* @__PURE__ */ __name((e6) => null !== e6 && "object" == typeof e6 && (!Array.isArray(e6) || e6.some(_isObject2)), "_isObject"), c4 = r4 && Object.values(t5).some(_isObject2);
        c4 ? (o5 = "POST", l4 = t5) : r4 || s3 ? (o5 = r4 ? "HEAD" : "GET", Object.entries(t5).filter(([e6, t6]) => void 0 !== t6).map(([e6, t6]) => [e6, Array.isArray(t6) ? `{${t6.join(",")}}` : `${t6}`]).forEach(([e6, t6]) => {
          a4.searchParams.append(e6, t6);
        })) : (o5 = "POST", l4 = t5);
        const u4 = new Headers(this.headers);
        return c4 ? u4.set("Prefer", n3 ? `count=${n3},return=minimal` : "return=minimal") : n3 && u4.set("Prefer", `count=${n3}`), new R3({ method: o5, url: a4, headers: u4, schema: this.schemaName, body: l4, fetch: null !== (i4 = this.fetch) && void 0 !== i4 ? i4 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
      }
    };
    C3 = {};
    I3 = {};
    j3 = {};
    __name(requireWebsocketFactory, "requireWebsocketFactory");
    L3 = {};
    U3 = {};
    __name(requireVersion$1, "requireVersion$1");
    __name(requireConstants$1, "requireConstants$1");
    D3 = {};
    __name(requireSerializer, "requireSerializer");
    F3 = {};
    __name(requireTransformers, "requireTransformers");
    B3 = {};
    M3 = {};
    K3 = {};
    closure = /* @__PURE__ */ __name((e5) => {
      if ("function" == typeof e5) return e5;
      return function() {
        return e5;
      };
    }, "closure");
    W3 = ("undefined" != typeof self ? self : null) || globalThis;
    H3 = 0;
    V3 = 1;
    G3 = 2;
    J3 = 3;
    z3 = "closed";
    Y3 = "errored";
    X3 = "joined";
    Q3 = "joining";
    Z3 = "leaving";
    ee3 = "phx_close";
    te3 = "phx_error";
    re3 = "phx_join";
    se3 = "phx_reply";
    ne3 = "phx_leave";
    ie3 = "longpoll";
    oe3 = "websocket";
    ae3 = 4;
    le3 = "base64url.bearer.phx.";
    ce3 = class {
      static {
        __name(this, "ce");
      }
      constructor(e5, t5, r4, s3) {
        this.channel = e5, this.event = t5, this.payload = r4 || function() {
          return {};
        }, this.receivedResp = null, this.timeout = s3, this.timeoutTimer = null, this.recHooks = [], this.sent = false, this.ref = void 0;
      }
      resend(e5) {
        this.timeout = e5, this.reset(), this.send();
      }
      send() {
        this.hasReceived("timeout") || (this.startTimeout(), this.sent = true, this.channel.socket.push({ topic: this.channel.topic, event: this.event, payload: this.payload(), ref: this.ref, join_ref: this.channel.joinRef() }));
      }
      receive(e5, t5) {
        return this.hasReceived(e5) && t5(this.receivedResp.response), this.recHooks.push({ status: e5, callback: t5 }), this;
      }
      reset() {
        this.cancelRefEvent(), this.ref = null, this.refEvent = null, this.receivedResp = null, this.sent = false;
      }
      destroy() {
        this.cancelRefEvent(), this.cancelTimeout();
      }
      matchReceive({ status: e5, response: t5, _ref: r4 }) {
        this.recHooks.filter((t6) => t6.status === e5).forEach((e6) => e6.callback(t5));
      }
      cancelRefEvent() {
        this.refEvent && this.channel.off(this.refEvent);
      }
      cancelTimeout() {
        clearTimeout(this.timeoutTimer), this.timeoutTimer = null;
      }
      startTimeout() {
        this.timeoutTimer && this.cancelTimeout(), this.ref = this.channel.socket.makeRef(), this.refEvent = this.channel.replyEventName(this.ref), this.channel.on(this.refEvent, (e5) => {
          this.cancelRefEvent(), this.cancelTimeout(), this.receivedResp = e5, this.matchReceive(e5);
        }), this.timeoutTimer = setTimeout(() => {
          this.trigger("timeout", {});
        }, this.timeout);
      }
      hasReceived(e5) {
        return this.receivedResp && this.receivedResp.status === e5;
      }
      trigger(e5, t5) {
        this.channel.trigger(this.refEvent, { status: e5, response: t5 });
      }
    };
    ue3 = class {
      static {
        __name(this, "ue");
      }
      constructor(e5, t5) {
        this.callback = e5, this.timerCalc = t5, this.timer = void 0, this.tries = 0;
      }
      reset() {
        this.tries = 0, clearTimeout(this.timer);
      }
      scheduleTimeout() {
        clearTimeout(this.timer), this.timer = setTimeout(() => {
          this.tries = this.tries + 1, this.callback();
        }, this.timerCalc(this.tries + 1));
      }
    };
    he3 = class {
      static {
        __name(this, "he");
      }
      constructor(e5, t5, r4) {
        this.state = z3, this.topic = e5, this.params = closure(t5 || {}), this.socket = r4, this.bindings = [], this.bindingRef = 0, this.timeout = this.socket.timeout, this.joinedOnce = false, this.joinPush = new ce3(this, re3, this.params, this.timeout), this.pushBuffer = [], this.stateChangeRefs = [], this.rejoinTimer = new ue3(() => {
          this.socket.isConnected() && this.rejoin();
        }, this.socket.rejoinAfterMs), this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset())), this.stateChangeRefs.push(this.socket.onOpen(() => {
          this.rejoinTimer.reset(), this.isErrored() && this.rejoin();
        })), this.joinPush.receive("ok", () => {
          this.state = X3, this.rejoinTimer.reset(), this.pushBuffer.forEach((e6) => e6.send()), this.pushBuffer = [];
        }), this.joinPush.receive("error", (e6) => {
          this.state = Y3, this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, e6), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
        }), this.onClose(() => {
          this.rejoinTimer.reset(), this.socket.hasLogger() && this.socket.log("channel", `close ${this.topic}`), this.state = z3, this.socket.remove(this);
        }), this.onError((e6) => {
          this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, e6), this.isJoining() && this.joinPush.reset(), this.state = Y3, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
        }), this.joinPush.receive("timeout", () => {
          this.socket.hasLogger() && this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), new ce3(this, ne3, closure({}), this.timeout).send(), this.state = Y3, this.joinPush.reset(), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
        }), this.on(se3, (e6, t6) => {
          this.trigger(this.replyEventName(t6), e6);
        });
      }
      join(e5 = this.timeout) {
        if (this.joinedOnce) throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
        return this.timeout = e5, this.joinedOnce = true, this.rejoin(), this.joinPush;
      }
      teardown() {
        this.pushBuffer.forEach((e5) => e5.destroy()), this.pushBuffer = [], this.rejoinTimer.reset(), this.joinPush.destroy(), this.state = z3, this.bindings = [];
      }
      onClose(e5) {
        this.on(ee3, e5);
      }
      onError(e5) {
        return this.on(te3, (t5) => e5(t5));
      }
      on(e5, t5) {
        let r4 = this.bindingRef++;
        return this.bindings.push({ event: e5, ref: r4, callback: t5 }), r4;
      }
      off(e5, t5) {
        this.bindings = this.bindings.filter((r4) => !(r4.event === e5 && (void 0 === t5 || t5 === r4.ref)));
      }
      canPush() {
        return this.socket.isConnected() && this.isJoined();
      }
      push(e5, t5, r4 = this.timeout) {
        if (t5 = t5 || {}, !this.joinedOnce) throw new Error(`tried to push '${e5}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
        let s3 = new ce3(this, e5, function() {
          return t5;
        }, r4);
        return this.canPush() ? s3.send() : (s3.startTimeout(), this.pushBuffer.push(s3)), s3;
      }
      leave(e5 = this.timeout) {
        this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), this.state = Z3;
        let onClose = /* @__PURE__ */ __name(() => {
          this.socket.hasLogger() && this.socket.log("channel", `leave ${this.topic}`), this.trigger(ee3, "leave");
        }, "onClose"), t5 = new ce3(this, ne3, closure({}), e5);
        return t5.receive("ok", () => onClose()).receive("timeout", () => onClose()), t5.send(), this.canPush() || t5.trigger("ok", {}), t5;
      }
      onMessage(e5, t5, r4) {
        return t5;
      }
      filterBindings(e5, t5, r4) {
        return true;
      }
      isMember(e5, t5, r4, s3) {
        return this.topic === e5 && (!s3 || s3 === this.joinRef() || (this.socket.hasLogger() && this.socket.log("channel", "dropping outdated message", { topic: e5, event: t5, payload: r4, joinRef: s3 }), false));
      }
      joinRef() {
        return this.joinPush.ref;
      }
      rejoin(e5 = this.timeout) {
        this.isLeaving() || (this.socket.leaveOpenTopic(this.topic), this.state = Q3, this.joinPush.resend(e5));
      }
      trigger(e5, t5, r4, s3) {
        let n3 = this.onMessage(e5, t5, r4, s3);
        if (t5 && !n3) throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
        let i4 = this.bindings.filter((s4) => s4.event === e5 && this.filterBindings(s4, t5, r4));
        for (let e6 = 0; e6 < i4.length; e6++) {
          i4[e6].callback(n3, r4, s3 || this.joinRef());
        }
      }
      replyEventName(e5) {
        return `chan_reply_${e5}`;
      }
      isClosed() {
        return this.state === z3;
      }
      isErrored() {
        return this.state === Y3;
      }
      isJoined() {
        return this.state === X3;
      }
      isJoining() {
        return this.state === Q3;
      }
      isLeaving() {
        return this.state === Z3;
      }
    };
    de3 = class {
      static {
        __name(this, "de");
      }
      static request(e5, t5, r4, s3, n3, i4, o5) {
        if (W3.XDomainRequest) {
          let r5 = new W3.XDomainRequest();
          return this.xdomainRequest(r5, e5, t5, s3, n3, i4, o5);
        }
        if (W3.XMLHttpRequest) {
          let a4 = new W3.XMLHttpRequest();
          return this.xhrRequest(a4, e5, t5, r4, s3, n3, i4, o5);
        }
        if (W3.fetch && W3.AbortController) return this.fetchRequest(e5, t5, r4, s3, n3, i4, o5);
        throw new Error("No suitable XMLHttpRequest implementation found");
      }
      static fetchRequest(e5, t5, r4, s3, n3, i4, o5) {
        let a4 = { method: e5, headers: r4, body: s3 }, l4 = null;
        return n3 && (l4 = new AbortController(), setTimeout(() => l4.abort(), n3), a4.signal = l4.signal), W3.fetch(t5, a4).then((e6) => e6.text()).then((e6) => this.parseJSON(e6)).then((e6) => o5 && o5(e6)).catch((e6) => {
          "AbortError" === e6.name && i4 ? i4() : o5 && o5(null);
        }), l4;
      }
      static xdomainRequest(e5, t5, r4, s3, n3, i4, o5) {
        return e5.timeout = n3, e5.open(t5, r4), e5.onload = () => {
          let t6 = this.parseJSON(e5.responseText);
          o5 && o5(t6);
        }, i4 && (e5.ontimeout = i4), e5.onprogress = () => {
        }, e5.send(s3), e5;
      }
      static xhrRequest(e5, t5, r4, s3, n3, i4, o5, a4) {
        e5.open(t5, r4, true), e5.timeout = i4;
        for (let [t6, r5] of Object.entries(s3)) e5.setRequestHeader(t6, r5);
        return e5.onerror = () => a4 && a4(null), e5.onreadystatechange = () => {
          if (e5.readyState === ae3 && a4) {
            let t6 = this.parseJSON(e5.responseText);
            a4(t6);
          }
        }, o5 && (e5.ontimeout = o5), e5.send(n3), e5;
      }
      static parseJSON(e5) {
        if (!e5 || "" === e5) return null;
        try {
          return JSON.parse(e5);
        } catch {
          return console && console.log("failed to parse JSON response", e5), null;
        }
      }
      static serialize(e5, t5) {
        let r4 = [];
        for (var s3 in e5) {
          if (!Object.prototype.hasOwnProperty.call(e5, s3)) continue;
          let n3 = t5 ? `${t5}[${s3}]` : s3, i4 = e5[s3];
          "object" == typeof i4 ? r4.push(this.serialize(i4, n3)) : r4.push(encodeURIComponent(n3) + "=" + encodeURIComponent(i4));
        }
        return r4.join("&");
      }
      static appendParams(e5, t5) {
        if (0 === Object.keys(t5).length) return e5;
        let r4 = e5.match(/\?/) ? "&" : "?";
        return `${e5}${r4}${this.serialize(t5)}`;
      }
    };
    pe3 = class {
      static {
        __name(this, "pe");
      }
      constructor(e5, t5) {
        t5 && 2 === t5.length && t5[1].startsWith(le3) && (this.authToken = atob(t5[1].slice(21))), this.endPoint = null, this.token = null, this.skipHeartbeat = true, this.reqs = /* @__PURE__ */ new Set(), this.awaitingBatchAck = false, this.currentBatch = null, this.currentBatchTimer = null, this.batchBuffer = [], this.onopen = function() {
        }, this.onerror = function() {
        }, this.onmessage = function() {
        }, this.onclose = function() {
        }, this.pollEndpoint = this.normalizeEndpoint(e5), this.readyState = H3, setTimeout(() => this.poll(), 0);
      }
      normalizeEndpoint(e5) {
        return e5.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + oe3), "$1/" + ie3);
      }
      endpointURL() {
        return de3.appendParams(this.pollEndpoint, { token: this.token });
      }
      closeAndRetry(e5, t5, r4) {
        this.close(e5, t5, r4), this.readyState = H3;
      }
      ontimeout() {
        this.onerror("timeout"), this.closeAndRetry(1005, "timeout", false);
      }
      isActive() {
        return this.readyState === V3 || this.readyState === H3;
      }
      poll() {
        const e5 = { Accept: "application/json" };
        this.authToken && (e5["X-Phoenix-AuthToken"] = this.authToken), this.ajax("GET", e5, null, () => this.ontimeout(), (e6) => {
          if (e6) {
            var { status: t5, token: r4, messages: s3 } = e6;
            if (410 === t5 && null !== this.token) return this.onerror(410), void this.closeAndRetry(3410, "session_gone", false);
            this.token = r4;
          } else t5 = 0;
          switch (t5) {
            case 200:
              s3.forEach((e7) => {
                setTimeout(() => this.onmessage({ data: e7 }), 0);
              }), this.poll();
              break;
            case 204:
              this.poll();
              break;
            case 410:
              this.readyState = V3, this.onopen({}), this.poll();
              break;
            case 403:
              this.onerror(403), this.close(1008, "forbidden", false);
              break;
            case 0:
            case 500:
              this.onerror(500), this.closeAndRetry(1011, "internal server error", 500);
              break;
            default:
              throw new Error(`unhandled poll status ${t5}`);
          }
        });
      }
      send(e5) {
        "string" != typeof e5 && (e5 = ((e6) => {
          let t5 = "", r4 = new Uint8Array(e6), s3 = r4.byteLength;
          for (let e7 = 0; e7 < s3; e7++) t5 += String.fromCharCode(r4[e7]);
          return btoa(t5);
        })(e5)), this.currentBatch ? this.currentBatch.push(e5) : this.awaitingBatchAck ? this.batchBuffer.push(e5) : (this.currentBatch = [e5], this.currentBatchTimer = setTimeout(() => {
          this.batchSend(this.currentBatch), this.currentBatch = null;
        }, 0));
      }
      batchSend(e5, t5 = 0) {
        this.awaitingBatchAck = true;
        const r4 = t5 + 100, s3 = e5.slice(t5, r4);
        this.ajax("POST", { "Content-Type": "application/x-ndjson" }, s3.join("\n"), () => this.onerror("timeout"), (t6) => {
          t6 && 200 === t6.status ? r4 < e5.length ? this.batchSend(e5, r4) : this.batchBuffer.length > 0 ? (this.batchSend(this.batchBuffer), this.batchBuffer = []) : this.awaitingBatchAck = false : (this.awaitingBatchAck = false, this.onerror(t6 && t6.status), this.closeAndRetry(1011, "internal server error", false));
        });
      }
      close(e5, t5, r4) {
        for (let e6 of this.reqs) e6.abort();
        this.readyState = J3;
        let s3 = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code: e5, reason: t5, wasClean: r4 });
        this.batchBuffer = [], clearTimeout(this.currentBatchTimer), this.currentBatchTimer = null, "undefined" != typeof CloseEvent ? this.onclose(new CloseEvent("close", s3)) : this.onclose(s3);
      }
      ajax(e5, t5, r4, s3, n3) {
        let i4;
        i4 = de3.request(e5, this.endpointURL(), t5, r4, this.timeout, () => {
          this.reqs.delete(i4), s3();
        }, (e6) => {
          this.reqs.delete(i4), this.isActive() && n3(e6);
        }), this.reqs.add(i4);
      }
    };
    fe3 = { HEADER_LENGTH: 1, META_LENGTH: 4, KINDS: { push: 0, reply: 1, broadcast: 2 }, encode(e5, t5) {
      if (e5.payload.constructor === ArrayBuffer) return t5(this.binaryEncode(e5));
      {
        let r4 = [e5.join_ref, e5.ref, e5.topic, e5.event, e5.payload];
        return t5(JSON.stringify(r4));
      }
    }, decode(e5, t5) {
      if (e5.constructor === ArrayBuffer) return t5(this.binaryDecode(e5));
      {
        let [r4, s3, n3, i4, o5] = JSON.parse(e5);
        return t5({ join_ref: r4, ref: s3, topic: n3, event: i4, payload: o5 });
      }
    }, binaryEncode(e5) {
      let { join_ref: t5, ref: r4, event: s3, topic: n3, payload: i4 } = e5, o5 = new TextEncoder(), a4 = o5.encode(t5), l4 = o5.encode(r4), c4 = o5.encode(n3), u4 = o5.encode(s3);
      this.assertFieldSize(a4.byteLength, "join_ref"), this.assertFieldSize(l4.byteLength, "ref"), this.assertFieldSize(c4.byteLength, "topic"), this.assertFieldSize(u4.byteLength, "event");
      let h5 = this.META_LENGTH + a4.byteLength + l4.byteLength + c4.byteLength + u4.byteLength, d5 = new ArrayBuffer(this.HEADER_LENGTH + h5), p4 = new Uint8Array(d5), f4 = new DataView(d5), g4 = 0;
      f4.setUint8(g4++, this.KINDS.push), f4.setUint8(g4++, a4.byteLength), f4.setUint8(g4++, l4.byteLength), f4.setUint8(g4++, c4.byteLength), f4.setUint8(g4++, u4.byteLength), p4.set(a4, g4), g4 += a4.byteLength, p4.set(l4, g4), g4 += l4.byteLength, p4.set(c4, g4), g4 += c4.byteLength, p4.set(u4, g4), g4 += u4.byteLength;
      var _5 = new Uint8Array(d5.byteLength + i4.byteLength);
      return _5.set(p4, 0), _5.set(new Uint8Array(i4), d5.byteLength), _5.buffer;
    }, assertFieldSize(e5, t5) {
      if (e5 > 255) throw new Error(`unable to convert ${t5} to binary: must be less than or equal to 255 bytes, but is ${e5} bytes`);
    }, binaryDecode(e5) {
      let t5 = new DataView(e5), r4 = t5.getUint8(0), s3 = new TextDecoder();
      switch (r4) {
        case this.KINDS.push:
          return this.decodePush(e5, t5, s3);
        case this.KINDS.reply:
          return this.decodeReply(e5, t5, s3);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(e5, t5, s3);
      }
    }, decodePush(e5, t5, r4) {
      let s3 = t5.getUint8(1), n3 = t5.getUint8(2), i4 = t5.getUint8(3), o5 = this.HEADER_LENGTH + this.META_LENGTH - 1, a4 = r4.decode(e5.slice(o5, o5 + s3));
      o5 += s3;
      let l4 = r4.decode(e5.slice(o5, o5 + n3));
      o5 += n3;
      let c4 = r4.decode(e5.slice(o5, o5 + i4));
      return o5 += i4, { join_ref: a4, ref: null, topic: l4, event: c4, payload: e5.slice(o5, e5.byteLength) };
    }, decodeReply(e5, t5, r4) {
      let s3 = t5.getUint8(1), n3 = t5.getUint8(2), i4 = t5.getUint8(3), o5 = t5.getUint8(4), a4 = this.HEADER_LENGTH + this.META_LENGTH, l4 = r4.decode(e5.slice(a4, a4 + s3));
      a4 += s3;
      let c4 = r4.decode(e5.slice(a4, a4 + n3));
      a4 += n3;
      let u4 = r4.decode(e5.slice(a4, a4 + i4));
      a4 += i4;
      let h5 = r4.decode(e5.slice(a4, a4 + o5));
      a4 += o5;
      let d5 = e5.slice(a4, e5.byteLength);
      return { join_ref: l4, ref: c4, topic: u4, event: se3, payload: { status: h5, response: d5 } };
    }, decodeBroadcast(e5, t5, r4) {
      let s3 = t5.getUint8(1), n3 = t5.getUint8(2), i4 = this.HEADER_LENGTH + 2, o5 = r4.decode(e5.slice(i4, i4 + s3));
      i4 += s3;
      let a4 = r4.decode(e5.slice(i4, i4 + n3));
      return i4 += n3, { join_ref: null, ref: null, topic: o5, event: a4, payload: e5.slice(i4, e5.byteLength) };
    } };
    ge3 = getDefaultExportFromNamespaceIfNotNamed(Object.freeze(Object.defineProperty({ __proto__: null, Channel: he3, LongPoll: pe3, Presence: class _Presence {
      static {
        __name(this, "_Presence");
      }
      constructor(e5, t5 = {}) {
        let r4 = t5.events || { state: "presence_state", diff: "presence_diff" };
        this.state = /* @__PURE__ */ Object.create(null), this.pendingDiffs = [], this.channel = e5, this.joinRef = null, this.caller = { onJoin: /* @__PURE__ */ __name(function() {
        }, "onJoin"), onLeave: /* @__PURE__ */ __name(function() {
        }, "onLeave"), onSync: /* @__PURE__ */ __name(function() {
        }, "onSync") }, this.channel.on(r4.state, (e6) => {
          let { onJoin: t6, onLeave: r5, onSync: s3 } = this.caller;
          this.joinRef = this.channel.joinRef(), this.state = _Presence.syncState(this.state, e6, t6, r5), this.pendingDiffs.forEach((e7) => {
            this.state = _Presence.syncDiff(this.state, e7, t6, r5);
          }), this.pendingDiffs = [], s3();
        }), this.channel.on(r4.diff, (e6) => {
          let { onJoin: t6, onLeave: r5, onSync: s3 } = this.caller;
          this.inPendingSyncState() ? this.pendingDiffs.push(e6) : (this.state = _Presence.syncDiff(this.state, e6, t6, r5), s3());
        });
      }
      onJoin(e5) {
        this.caller.onJoin = e5;
      }
      onLeave(e5) {
        this.caller.onLeave = e5;
      }
      onSync(e5) {
        this.caller.onSync = e5;
      }
      list(e5) {
        return _Presence.list(this.state, e5);
      }
      inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel.joinRef();
      }
      static syncState(e5, t5, r4, s3) {
        let n3 = this.toNullProtoObj(this.clone(e5));
        t5 = this.toNullProtoObj(t5);
        let i4 = /* @__PURE__ */ Object.create(null), o5 = /* @__PURE__ */ Object.create(null);
        return this.map(n3, (e6, r5) => {
          t5[e6] || (o5[e6] = r5);
        }), this.map(t5, (e6, t6) => {
          let r5 = n3[e6];
          if (r5) {
            let s4 = t6.metas.map((e7) => e7.phx_ref), n4 = r5.metas.map((e7) => e7.phx_ref), a4 = t6.metas.filter((e7) => n4.indexOf(e7.phx_ref) < 0), l4 = r5.metas.filter((e7) => s4.indexOf(e7.phx_ref) < 0);
            a4.length > 0 && (i4[e6] = t6, i4[e6].metas = a4), l4.length > 0 && (o5[e6] = this.clone(r5), o5[e6].metas = l4);
          } else i4[e6] = t6;
        }), this.syncDiff(n3, { joins: i4, leaves: o5 }, r4, s3);
      }
      static syncDiff(e5, t5, r4, s3) {
        e5 = this.toNullProtoObj(e5);
        let { joins: n3, leaves: i4 } = this.clone(t5);
        return r4 || (r4 = /* @__PURE__ */ __name(function() {
        }, "r")), s3 || (s3 = /* @__PURE__ */ __name(function() {
        }, "s")), this.map(n3, (t6, s4) => {
          let n4 = e5[t6];
          if (e5[t6] = this.clone(s4), n4) {
            let r5 = e5[t6].metas.map((e6) => e6.phx_ref), s5 = n4.metas.filter((e6) => r5.indexOf(e6.phx_ref) < 0);
            e5[t6].metas.unshift(...s5);
          }
          r4(t6, n4, s4);
        }), this.map(i4, (t6, r5) => {
          let n4 = e5[t6];
          if (!n4) return;
          let i5 = r5.metas.map((e6) => e6.phx_ref);
          n4.metas = n4.metas.filter((e6) => i5.indexOf(e6.phx_ref) < 0), s3(t6, n4, r5), 0 === n4.metas.length && delete e5[t6];
        }), e5;
      }
      static list(e5, t5) {
        return t5 || (t5 = /* @__PURE__ */ __name(function(e6, t6) {
          return t6;
        }, "t")), this.map(e5, (e6, r4) => t5(e6, r4));
      }
      static map(e5, t5) {
        return Object.getOwnPropertyNames(e5).map((r4) => t5(r4, e5[r4]));
      }
      static toNullProtoObj(e5) {
        if (null === Object.getPrototypeOf(e5)) return e5;
        let t5 = /* @__PURE__ */ Object.create(null);
        return Object.getOwnPropertyNames(e5).forEach((r4) => {
          t5[r4] = e5[r4];
        }), t5;
      }
      static clone(e5) {
        return JSON.parse(JSON.stringify(e5));
      }
    }, Push: ce3, Serializer: fe3, Socket: class {
      static {
        __name(this, "Socket");
      }
      constructor(e5, t5 = {}) {
        this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }, this.channels = [], this.sendBuffer = [], this.ref = 0, this.fallbackRef = null, this.timeout = t5.timeout || 1e4, this.transport = t5.transport || W3.WebSocket || pe3, this.conn = void 0, this.primaryPassedHealthCheck = false, this.longPollFallbackMs = t5.longPollFallbackMs, this.fallbackTimer = null;
        let r4 = null;
        try {
          r4 = W3 && W3.sessionStorage;
        } catch {
        }
        this.sessionStore = t5.sessionStorage || r4, this.establishedConnections = 0, this.defaultEncoder = fe3.encode.bind(fe3), this.defaultDecoder = fe3.decode.bind(fe3), this.closeWasClean = true, this.disconnecting = false, this.binaryType = t5.binaryType || "arraybuffer", this.connectClock = 1, this.pageHidden = false, this.encode = void 0, this.decode = void 0, this.transport !== pe3 ? (this.encode = t5.encode || this.defaultEncoder, this.decode = t5.decode || this.defaultDecoder) : (this.encode = this.defaultEncoder, this.decode = this.defaultDecoder), this.heartbeatIntervalMs = t5.heartbeatIntervalMs || 3e4, this.autoSendHeartbeat = t5.autoSendHeartbeat ?? true, this.heartbeatCallback = t5.heartbeatCallback ?? (() => {
        }), this.rejoinAfterMs = (e6) => t5.rejoinAfterMs ? t5.rejoinAfterMs(e6) : [1e3, 2e3, 5e3][e6 - 1] || 1e4, this.reconnectAfterMs = (e6) => t5.reconnectAfterMs ? t5.reconnectAfterMs(e6) : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][e6 - 1] || 5e3, this.logger = t5.logger || null, !this.logger && t5.debug && (this.logger = (e6, t6, r5) => {
          console.log(`${e6}: ${t6}`, r5);
        }), this.longpollerTimeout = t5.longpollerTimeout || 2e4, this.params = closure(t5.params || {}), this.endPoint = `${e5}/${oe3}`, this.vsn = t5.vsn || "2.0.0", this.heartbeatTimeoutTimer = null, this.heartbeatTimer = null, this.heartbeatSentAt = null, this.pendingHeartbeatRef = null, this.reconnectTimer = new ue3(() => {
          if (this.pageHidden) return this.log("Not reconnecting as page is hidden!"), void this.teardown();
          this.teardown(async () => {
            t5.beforeReconnect && await t5.beforeReconnect(), this.connect();
          });
        }, this.reconnectAfterMs), this.authToken = t5.authToken && closure(t5.authToken);
      }
      getLongPollTransport() {
        return pe3;
      }
      replaceTransport(e5) {
        this.connectClock++, this.closeWasClean = true, clearTimeout(this.fallbackTimer), this.reconnectTimer.reset(), this.conn && (this.conn.close(), this.conn = null), this.transport = e5;
      }
      protocol() {
        return location.protocol.match(/^https/) ? "wss" : "ws";
      }
      endPointURL() {
        let e5 = de3.appendParams(de3.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
        return "/" !== e5.charAt(0) ? e5 : "/" === e5.charAt(1) ? `${this.protocol()}:${e5}` : `${this.protocol()}://${location.host}${e5}`;
      }
      disconnect(e5, t5, r4) {
        this.connectClock++, this.disconnecting = true, this.closeWasClean = true, clearTimeout(this.fallbackTimer), this.reconnectTimer.reset(), this.teardown(() => {
          this.disconnecting = false, e5 && e5();
        }, t5, r4);
      }
      connect(e5) {
        e5 && (console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"), this.params = closure(e5)), this.conn && !this.disconnecting || (this.longPollFallbackMs && this.transport !== pe3 ? this.connectWithFallback(pe3, this.longPollFallbackMs) : this.transportConnect());
      }
      log(e5, t5, r4) {
        this.logger && this.logger(e5, t5, r4);
      }
      hasLogger() {
        return null !== this.logger;
      }
      onOpen(e5) {
        let t5 = this.makeRef();
        return this.stateChangeCallbacks.open.push([t5, e5]), t5;
      }
      onClose(e5) {
        let t5 = this.makeRef();
        return this.stateChangeCallbacks.close.push([t5, e5]), t5;
      }
      onError(e5) {
        let t5 = this.makeRef();
        return this.stateChangeCallbacks.error.push([t5, e5]), t5;
      }
      onMessage(e5) {
        let t5 = this.makeRef();
        return this.stateChangeCallbacks.message.push([t5, e5]), t5;
      }
      onHeartbeat(e5) {
        this.heartbeatCallback = e5;
      }
      ping(e5) {
        if (!this.isConnected()) return false;
        let t5 = this.makeRef(), r4 = Date.now();
        this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: t5 });
        let s3 = this.onMessage((n3) => {
          n3.ref === t5 && (this.off([s3]), e5(Date.now() - r4));
        });
        return true;
      }
      transportName(e5) {
        return e5 === pe3 ? "LongPoll" : e5.name;
      }
      transportConnect() {
        let e5;
        this.connectClock++, this.closeWasClean = false, this.authToken && (e5 = ["phoenix", `${le3}${btoa(this.authToken()).replace(/=/g, "")}`]), this.conn = new this.transport(this.endPointURL(), e5), this.conn.binaryType = this.binaryType, this.conn.timeout = this.longpollerTimeout, this.conn.onopen = () => this.onConnOpen(), this.conn.onerror = (e6) => this.onConnError(e6), this.conn.onmessage = (e6) => this.onConnMessage(e6), this.conn.onclose = (e6) => this.onConnClose(e6);
      }
      getSession(e5) {
        return this.sessionStore && this.sessionStore.getItem(e5);
      }
      storeSession(e5, t5) {
        this.sessionStore && this.sessionStore.setItem(e5, t5);
      }
      connectWithFallback(e5, t5 = 2500) {
        clearTimeout(this.fallbackTimer);
        let r4, s3 = false, n3 = true, i4 = this.transportName(e5), fallback = /* @__PURE__ */ __name((t6) => {
          this.log("transport", `falling back to ${i4}...`, t6), this.off([void 0, r4]), n3 = false, this.replaceTransport(e5), this.transportConnect();
        }, "fallback");
        if (this.getSession(`phx:fallback:${i4}`)) return fallback("memorized");
        this.fallbackTimer = setTimeout(fallback, t5), r4 = this.onError((e6) => {
          this.log("transport", "error", e6), n3 && !s3 && (clearTimeout(this.fallbackTimer), fallback(e6));
        }), this.fallbackRef && this.off([this.fallbackRef]), this.fallbackRef = this.onOpen(() => {
          if (s3 = true, !n3) {
            let t6 = this.transportName(e5);
            return this.primaryPassedHealthCheck || this.storeSession(`phx:fallback:${t6}`, "true"), this.log("transport", `established ${t6} fallback`);
          }
          clearTimeout(this.fallbackTimer), this.fallbackTimer = setTimeout(fallback, t5), this.ping((e6) => {
            this.log("transport", "connected to primary after", e6), this.primaryPassedHealthCheck = true, clearTimeout(this.fallbackTimer);
          });
        }), this.transportConnect();
      }
      clearHeartbeats() {
        clearTimeout(this.heartbeatTimer), clearTimeout(this.heartbeatTimeoutTimer);
      }
      onConnOpen() {
        this.hasLogger() && this.log("transport", `connected to ${this.endPointURL()}`), this.closeWasClean = false, this.disconnecting = false, this.establishedConnections++, this.flushSendBuffer(), this.reconnectTimer.reset(), this.autoSendHeartbeat && this.resetHeartbeat(), this.triggerStateCallbacks("open");
      }
      heartbeatTimeout() {
        if (this.pendingHeartbeatRef) {
          this.pendingHeartbeatRef = null, this.heartbeatSentAt = null, this.hasLogger() && this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
          try {
            this.heartbeatCallback("timeout");
          } catch (e5) {
            this.log("error", "error in heartbeat callback", e5);
          }
          this.triggerChanError(new Error("heartbeat timeout")), this.closeWasClean = false, this.teardown(() => this.reconnectTimer.scheduleTimeout(), 1e3, "heartbeat timeout");
        }
      }
      resetHeartbeat() {
        this.conn && this.conn.skipHeartbeat || (this.pendingHeartbeatRef = null, this.clearHeartbeats(), this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs));
      }
      teardown(e5, t5, r4) {
        if (!this.conn) return e5 && e5();
        const s3 = this.conn;
        this.waitForBufferDone(s3, () => {
          t5 ? s3.close(t5, r4 || "") : s3.close(), this.waitForSocketClosed(s3, () => {
            this.conn === s3 && (this.conn.onopen = function() {
            }, this.conn.onerror = function() {
            }, this.conn.onmessage = function() {
            }, this.conn.onclose = function() {
            }, this.conn = null), e5 && e5();
          });
        });
      }
      waitForBufferDone(e5, t5, r4 = 1) {
        5 !== r4 && e5.bufferedAmount ? setTimeout(() => {
          this.waitForBufferDone(e5, t5, r4 + 1);
        }, 150 * r4) : t5();
      }
      waitForSocketClosed(e5, t5, r4 = 1) {
        5 !== r4 && e5.readyState !== J3 ? setTimeout(() => {
          this.waitForSocketClosed(e5, t5, r4 + 1);
        }, 150 * r4) : t5();
      }
      onConnClose(e5) {
        this.conn && (this.conn.onclose = () => {
        }), this.hasLogger() && this.log("transport", "close", e5), this.triggerChanError(e5), this.clearHeartbeats(), this.closeWasClean || this.reconnectTimer.scheduleTimeout(), this.triggerStateCallbacks("close", e5);
      }
      onConnError(e5) {
        this.hasLogger() && this.log("transport", "error", e5);
        let t5 = this.transport, r4 = this.establishedConnections;
        this.triggerStateCallbacks("error", e5, t5, r4), (t5 === this.transport || r4 > 0) && this.triggerChanError(e5);
      }
      triggerChanError(e5) {
        this.channels.forEach((t5) => {
          t5.isErrored() || t5.isLeaving() || t5.isClosed() || t5.trigger(te3, e5);
        });
      }
      connectionState() {
        switch (this.conn && this.conn.readyState) {
          case H3:
            return "connecting";
          case V3:
            return "open";
          case G3:
            return "closing";
          default:
            return "closed";
        }
      }
      isConnected() {
        return "open" === this.connectionState();
      }
      remove(e5) {
        this.off(e5.stateChangeRefs), this.channels = this.channels.filter((t5) => t5 !== e5);
      }
      off(e5) {
        for (let t5 in this.stateChangeCallbacks) this.stateChangeCallbacks[t5] = this.stateChangeCallbacks[t5].filter(([t6]) => -1 === e5.indexOf(t6));
      }
      channel(e5, t5 = {}) {
        let r4 = new he3(e5, t5, this);
        return this.channels.push(r4), r4;
      }
      push(e5) {
        if (this.hasLogger()) {
          let { topic: t5, event: r4, payload: s3, ref: n3, join_ref: i4 } = e5;
          this.log("push", `${t5} ${r4} (${i4}, ${n3})`, s3);
        }
        this.isConnected() ? this.encode(e5, (e6) => this.conn.send(e6)) : this.sendBuffer.push(() => this.encode(e5, (e6) => this.conn.send(e6)));
      }
      makeRef() {
        let e5 = this.ref + 1;
        return e5 === this.ref ? this.ref = 0 : this.ref = e5, this.ref.toString();
      }
      sendHeartbeat() {
        if (this.isConnected()) if (this.pendingHeartbeatRef) this.heartbeatTimeout();
        else {
          this.pendingHeartbeatRef = this.makeRef(), this.heartbeatSentAt = Date.now(), this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
          try {
            this.heartbeatCallback("sent");
          } catch (e5) {
            this.log("error", "error in heartbeat callback", e5);
          }
          this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
        }
        else try {
          this.heartbeatCallback("disconnected");
        } catch (e5) {
          this.log("error", "error in heartbeat callback", e5);
        }
      }
      flushSendBuffer() {
        this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e5) => e5()), this.sendBuffer = []);
      }
      onConnMessage(e5) {
        this.decode(e5.data, (e6) => {
          let { topic: t5, event: r4, payload: s3, ref: n3, join_ref: i4 } = e6;
          if (n3 && n3 === this.pendingHeartbeatRef) {
            const e7 = this.heartbeatSentAt ? Date.now() - this.heartbeatSentAt : void 0;
            this.clearHeartbeats();
            try {
              this.heartbeatCallback("ok" === s3.status ? "ok" : "error", e7);
            } catch (e8) {
              this.log("error", "error in heartbeat callback", e8);
            }
            this.pendingHeartbeatRef = null, this.heartbeatSentAt = null, this.autoSendHeartbeat && (this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs));
          }
          this.hasLogger() && this.log("receive", `${s3.status || ""} ${t5} ${r4} ${n3 && "(" + n3 + ")" || ""}`.trim(), s3);
          for (let e7 = 0; e7 < this.channels.length; e7++) {
            const o5 = this.channels[e7];
            o5.isMember(t5, r4, s3, i4) && o5.trigger(r4, s3, n3, i4);
          }
          this.triggerStateCallbacks("message", e6);
        });
      }
      triggerStateCallbacks(e5, ...t5) {
        try {
          this.stateChangeCallbacks[e5].forEach(([r4, s3]) => {
            try {
              s3(...t5);
            } catch (t6) {
              this.log("error", `error in ${e5} callback`, t6);
            }
          });
        } catch (t6) {
          this.log("error", `error triggering ${e5} callbacks`, t6);
        }
      }
      leaveOpenTopic(e5) {
        let t5 = this.channels.find((t6) => t6.topic === e5 && (t6.isJoined() || t6.isJoining()));
        t5 && (this.hasLogger() && this.log("transport", `leaving duplicate topic "${e5}"`), t5.leave());
      }
    }, Timer: ue3 }, Symbol.toStringTag, { value: "Module" })));
    __name(requirePresenceAdapter, "requirePresenceAdapter");
    __name(requireRealtimePresence, "requireRealtimePresence");
    be3 = {};
    __name(requireNormalizeChannelError, "requireNormalizeChannelError");
    ve3 = {};
    __name(requireChannelAdapter, "requireChannelAdapter");
    Ae3 = {};
    __name(requireRealtimePostgresFilterBuilder, "requireRealtimePostgresFilterBuilder");
    __name(requireRealtimeChannel, "requireRealtimeChannel");
    Re2 = {};
    __name(requireSocketAdapter, "requireSocketAdapter");
    __name(requireRealtimeClient, "requireRealtimeClient");
    !(function(e5) {
      Object.defineProperty(e5, "__esModule", { value: true }), e5.WebSocketFactory = e5.REALTIME_CHANNEL_STATES = e5.REALTIME_SUBSCRIBE_STATES = e5.REALTIME_PRESENCE_LISTEN_EVENTS = e5.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = e5.REALTIME_LISTEN_TYPES = e5.postgresChangesFilter = e5.RealtimePostgresFilterBuilder = e5.RealtimeClient = e5.RealtimeChannel = e5.RealtimePresence = void 0;
      const t5 = p2, r4 = t5.__importDefault(requireRealtimeClient());
      e5.RealtimeClient = r4.default;
      const s3 = t5.__importStar(requireRealtimeChannel());
      e5.RealtimeChannel = s3.default, Object.defineProperty(e5, "RealtimePostgresFilterBuilder", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return s3.RealtimePostgresFilterBuilder;
      }, "get") }), Object.defineProperty(e5, "postgresChangesFilter", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return s3.postgresChangesFilter;
      }, "get") }), Object.defineProperty(e5, "REALTIME_LISTEN_TYPES", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return s3.REALTIME_LISTEN_TYPES;
      }, "get") }), Object.defineProperty(e5, "REALTIME_POSTGRES_CHANGES_LISTEN_EVENT", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return s3.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
      }, "get") }), Object.defineProperty(e5, "REALTIME_SUBSCRIBE_STATES", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return s3.REALTIME_SUBSCRIBE_STATES;
      }, "get") }), Object.defineProperty(e5, "REALTIME_CHANNEL_STATES", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return s3.REALTIME_CHANNEL_STATES;
      }, "get") });
      const n3 = t5.__importStar(requireRealtimePresence());
      e5.RealtimePresence = n3.default, Object.defineProperty(e5, "REALTIME_PRESENCE_LISTEN_EVENTS", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return n3.REALTIME_PRESENCE_LISTEN_EVENTS;
      }, "get") });
      const i4 = t5.__importDefault(requireWebsocketFactory());
      e5.WebSocketFactory = i4.default;
    })(C3);
    Oe2 = class extends Error {
      static {
        __name(this, "Oe");
      }
      constructor(e5, t5) {
        super(e5), this.name = "IcebergError", this.status = t5.status, this.icebergType = t5.icebergType, this.icebergCode = t5.icebergCode, this.details = t5.details, this.isCommitStateUnknown = "CommitStateUnknownException" === t5.icebergType || [500, 502, 504].includes(t5.status) && true === t5.icebergType?.includes("CommitState");
      }
      isNotFound() {
        return 404 === this.status;
      }
      isConflict() {
        return 409 === this.status;
      }
      isAuthenticationTimeout() {
        return 419 === this.status;
      }
    };
    __name(createFetchClient, "createFetchClient");
    __name(namespaceToPath, "namespaceToPath");
    Pe2 = class {
      static {
        __name(this, "Pe");
      }
      constructor(e5, t5 = "") {
        this.client = e5, this.prefix = t5;
      }
      async listNamespaces(e5) {
        const t5 = e5 ? { parent: namespaceToPath(e5.namespace) } : void 0;
        return (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces`, query: t5 })).data.namespaces.map((e6) => ({ namespace: e6 }));
      }
      async createNamespace(e5, t5) {
        const r4 = { namespace: e5.namespace, properties: t5?.properties };
        return (await this.client.request({ method: "POST", path: `${this.prefix}/namespaces`, body: r4 })).data;
      }
      async dropNamespace(e5) {
        await this.client.request({ method: "DELETE", path: `${this.prefix}/namespaces/${namespaceToPath(e5.namespace)}` });
      }
      async loadNamespaceMetadata(e5) {
        return { properties: (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${namespaceToPath(e5.namespace)}` })).data.properties };
      }
      async namespaceExists(e5) {
        try {
          return await this.client.request({ method: "HEAD", path: `${this.prefix}/namespaces/${namespaceToPath(e5.namespace)}` }), true;
        } catch (e6) {
          if (e6 instanceof Oe2 && 404 === e6.status) return false;
          throw e6;
        }
      }
      async createNamespaceIfNotExists(e5, t5) {
        try {
          return await this.createNamespace(e5, t5);
        } catch (e6) {
          if (e6 instanceof Oe2 && 409 === e6.status) return;
          throw e6;
        }
      }
    };
    __name(namespaceToPath2, "namespaceToPath2");
    Ce2 = class {
      static {
        __name(this, "Ce");
      }
      constructor(e5, t5 = "", r4) {
        this.client = e5, this.prefix = t5, this.accessDelegation = r4;
      }
      async listTables(e5) {
        return (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${namespaceToPath2(e5.namespace)}/tables` })).data.identifiers;
      }
      async createTable(e5, t5) {
        const r4 = {};
        this.accessDelegation && (r4["X-Iceberg-Access-Delegation"] = this.accessDelegation);
        return (await this.client.request({ method: "POST", path: `${this.prefix}/namespaces/${namespaceToPath2(e5.namespace)}/tables`, body: t5, headers: r4 })).data.metadata;
      }
      async updateTable(e5, t5) {
        const r4 = await this.client.request({ method: "POST", path: `${this.prefix}/namespaces/${namespaceToPath2(e5.namespace)}/tables/${e5.name}`, body: t5 });
        return { "metadata-location": r4.data["metadata-location"], metadata: r4.data.metadata };
      }
      async dropTable(e5, t5) {
        await this.client.request({ method: "DELETE", path: `${this.prefix}/namespaces/${namespaceToPath2(e5.namespace)}/tables/${e5.name}`, query: { purgeRequested: String(t5?.purge ?? false) } });
      }
      async loadTable(e5) {
        const t5 = {};
        this.accessDelegation && (t5["X-Iceberg-Access-Delegation"] = this.accessDelegation);
        return (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${namespaceToPath2(e5.namespace)}/tables/${e5.name}`, headers: t5 })).data.metadata;
      }
      async tableExists(e5) {
        const t5 = {};
        this.accessDelegation && (t5["X-Iceberg-Access-Delegation"] = this.accessDelegation);
        try {
          return await this.client.request({ method: "HEAD", path: `${this.prefix}/namespaces/${namespaceToPath2(e5.namespace)}/tables/${e5.name}`, headers: t5 }), true;
        } catch (e6) {
          if (e6 instanceof Oe2 && 404 === e6.status) return false;
          throw e6;
        }
      }
      async createTableIfNotExists(e5, t5) {
        try {
          return await this.createTable(e5, t5);
        } catch (r4) {
          if (r4 instanceof Oe2 && 409 === r4.status) return await this.loadTable({ namespace: e5.namespace, name: t5.name });
          throw r4;
        }
      }
    };
    Ie2 = class {
      static {
        __name(this, "Ie");
      }
      constructor(e5) {
        let t5 = "v1";
        e5.catalogName && (t5 += `/${e5.catalogName}`);
        const r4 = e5.baseUrl.endsWith("/") ? e5.baseUrl : `${e5.baseUrl}/`;
        this.client = createFetchClient({ baseUrl: r4, auth: e5.auth, fetchImpl: e5.fetch }), this.accessDelegation = e5.accessDelegation?.join(","), this.namespaceOps = new Pe2(this.client, t5), this.tableOps = new Ce2(this.client, t5, this.accessDelegation);
      }
      async listNamespaces(e5) {
        return this.namespaceOps.listNamespaces(e5);
      }
      async createNamespace(e5, t5) {
        return this.namespaceOps.createNamespace(e5, t5);
      }
      async dropNamespace(e5) {
        await this.namespaceOps.dropNamespace(e5);
      }
      async loadNamespaceMetadata(e5) {
        return this.namespaceOps.loadNamespaceMetadata(e5);
      }
      async listTables(e5) {
        return this.tableOps.listTables(e5);
      }
      async createTable(e5, t5) {
        return this.tableOps.createTable(e5, t5);
      }
      async updateTable(e5, t5) {
        return this.tableOps.updateTable(e5, t5);
      }
      async dropTable(e5, t5) {
        await this.tableOps.dropTable(e5, t5);
      }
      async loadTable(e5) {
        return this.tableOps.loadTable(e5);
      }
      async namespaceExists(e5) {
        return this.namespaceOps.namespaceExists(e5);
      }
      async tableExists(e5) {
        return this.tableOps.tableExists(e5);
      }
      async createNamespaceIfNotExists(e5, t5) {
        return this.namespaceOps.createNamespaceIfNotExists(e5, t5);
      }
      async createTableIfNotExists(e5, t5) {
        return this.tableOps.createTableIfNotExists(e5, t5);
      }
    };
    __name(_typeof$1, "_typeof$1");
    __name(toPropertyKey$1, "toPropertyKey$1");
    __name(_defineProperty$1, "_defineProperty$1");
    __name(ownKeys$1, "ownKeys$1");
    __name(_objectSpread2$1, "_objectSpread2$1");
    je2 = class extends Error {
      static {
        __name(this, "je");
      }
      constructor(e5, t5 = "storage", r4, s3) {
        super(e5), this.__isStorageError = true, this.namespace = t5, this.name = "vectors" === t5 ? "StorageVectorsError" : "StorageError", this.status = r4, this.statusCode = s3;
      }
      toJSON() {
        return { name: this.name, message: this.message, status: this.status, statusCode: this.statusCode };
      }
    };
    __name(isStorageError, "isStorageError");
    Ne2 = class extends je2 {
      static {
        __name(this, "Ne");
      }
      constructor(e5, t5, r4, s3 = "storage", n3) {
        super(e5, s3, t5, r4), this.name = "vectors" === s3 ? "StorageVectorsApiError" : "StorageApiError", this.status = t5, this.statusCode = r4, this.code = n3;
      }
      toJSON() {
        return _objectSpread2$1(_objectSpread2$1({}, super.toJSON()), {}, { code: this.code });
      }
    };
    $e3 = class extends je2 {
      static {
        __name(this, "$e");
      }
      constructor(e5, t5, r4 = "storage") {
        super(e5, r4), this.name = "vectors" === r4 ? "StorageVectorsUnknownError" : "StorageUnknownError", this.originalError = t5;
      }
    };
    __name(setHeader, "setHeader");
    recursiveToCamel = /* @__PURE__ */ __name((e5) => {
      if (Array.isArray(e5)) return e5.map((e6) => recursiveToCamel(e6));
      if ("function" == typeof e5 || e5 !== Object(e5)) return e5;
      const t5 = {};
      return Object.entries(e5).forEach(([e6, r4]) => {
        const s3 = e6.replace(/([-_][a-z])/gi, (e7) => e7.toUpperCase().replace(/[-_]/g, ""));
        t5[s3] = recursiveToCamel(r4);
      }), t5;
    }, "recursiveToCamel");
    encodeStoragePath = /* @__PURE__ */ __name((e5) => e5.split("/").map(encodeURIComponent).join("/"), "encodeStoragePath");
    _getErrorMessage = /* @__PURE__ */ __name((e5) => {
      if ("object" == typeof e5 && null !== e5) {
        const t5 = e5;
        if ("string" == typeof t5.msg) return t5.msg;
        if ("string" == typeof t5.message) return t5.message;
        if ("string" == typeof t5.error_description) return t5.error_description;
        if ("string" == typeof t5.error) return t5.error;
        if ("object" == typeof t5.error && null !== t5.error) {
          const e6 = t5.error;
          if ("string" == typeof e6.message) return e6.message;
        }
      }
      return JSON.stringify(e5);
    }, "_getErrorMessage");
    _getRequestParams = /* @__PURE__ */ __name((e5, t5, r4, s3) => {
      const n3 = { method: e5, headers: (null == t5 ? void 0 : t5.headers) || {} };
      if ("GET" === e5 || "HEAD" === e5 || !s3) return _objectSpread2$1(_objectSpread2$1({}, n3), r4);
      if (((e6) => {
        if ("object" != typeof e6 || null === e6) return false;
        const t6 = Object.getPrototypeOf(e6);
        return !(null !== t6 && t6 !== Object.prototype && null !== Object.getPrototypeOf(t6) || Symbol.toStringTag in e6 || Symbol.iterator in e6);
      })(s3)) {
        var i4;
        const e6 = (null == t5 ? void 0 : t5.headers) || {};
        let r5;
        for (const [t6, s4] of Object.entries(e6)) "content-type" === t6.toLowerCase() && (r5 = s4);
        n3.headers = setHeader(e6, "Content-Type", null !== (i4 = r5) && void 0 !== i4 ? i4 : "application/json"), n3.body = JSON.stringify(s3);
      } else n3.body = s3;
      return (null == t5 ? void 0 : t5.duplex) && (n3.duplex = t5.duplex), _objectSpread2$1(_objectSpread2$1({}, n3), r4);
    }, "_getRequestParams");
    __name(_handleRequest, "_handleRequest");
    __name(createFetchApi, "createFetchApi");
    Le2 = createFetchApi("storage");
    ({ get: Ue2, post: xe2, put: De2, head: qe2, remove: Fe2 } = Le2);
    Be2 = createFetchApi("vectors");
    Me2 = class {
      static {
        __name(this, "Me");
      }
      constructor(e5, t5 = {}, r4, s3 = "storage") {
        var n3;
        this.shouldThrowOnError = false, this.url = e5, this.headers = (function(e6) {
          const t6 = {};
          for (const [r5, s4] of Object.entries(e6)) t6[r5.toLowerCase()] = s4;
          return t6;
        })(t5), this.fetch = (n3 = r4) ? (...e6) => n3(...e6) : (...e6) => fetch(...e6), this.namespace = s3;
      }
      throwOnError() {
        return this.shouldThrowOnError = true, this;
      }
      setHeader(e5, t5) {
        return this.headers = setHeader(this.headers, e5, t5), this;
      }
      async handleOperation(e5) {
        try {
          return { data: await e5(), error: null };
        } catch (e6) {
          if (this.shouldThrowOnError) throw e6;
          if (isStorageError(e6)) return { data: null, error: e6 };
          throw e6;
        }
      }
    };
    Ke2 = Symbol.toStringTag;
    We2 = class {
      static {
        __name(this, "We");
      }
      constructor(e5, t5) {
        this.downloadFn = e5, this.shouldThrowOnError = t5, this[Ke2] = "StreamDownloadBuilder", this.promise = null;
      }
      then(e5, t5) {
        return this.getPromise().then(e5, t5);
      }
      catch(e5) {
        return this.getPromise().catch(e5);
      }
      finally(e5) {
        return this.getPromise().finally(e5);
      }
      getPromise() {
        return this.promise || (this.promise = this.execute()), this.promise;
      }
      async execute() {
        try {
          return { data: (await this.downloadFn()).body, error: null };
        } catch (e5) {
          if (this.shouldThrowOnError) throw e5;
          if (isStorageError(e5)) return { data: null, error: e5 };
          throw e5;
        }
      }
    };
    He2 = Symbol.toStringTag;
    Ve3 = class {
      static {
        __name(this, "Ve");
      }
      constructor(e5, t5) {
        this.downloadFn = e5, this.shouldThrowOnError = t5, this[He2] = "BlobDownloadBuilder", this.promise = null;
      }
      asStream() {
        return new We2(this.downloadFn, this.shouldThrowOnError);
      }
      then(e5, t5) {
        return this.getPromise().then(e5, t5);
      }
      catch(e5) {
        return this.getPromise().catch(e5);
      }
      finally(e5) {
        return this.getPromise().finally(e5);
      }
      getPromise() {
        return this.promise || (this.promise = this.execute()), this.promise;
      }
      async execute() {
        try {
          return { data: await (await this.downloadFn()).blob(), error: null };
        } catch (e5) {
          if (this.shouldThrowOnError) throw e5;
          if (isStorageError(e5)) return { data: null, error: e5 };
          throw e5;
        }
      }
    };
    Ge2 = { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } };
    Je2 = { cacheControl: "3600", contentType: "text/plain;charset=UTF-8", upsert: false };
    ze2 = class extends Me2 {
      static {
        __name(this, "ze");
      }
      constructor(e5, t5 = {}, r4, s3) {
        super(e5, t5, s3, "storage"), this.bucketId = r4;
      }
      async uploadOrUpdate(e5, t5, r4, s3) {
        var n3 = this;
        return n3.handleOperation(async () => {
          let i4;
          const o5 = _objectSpread2$1(_objectSpread2$1({}, Je2), s3);
          let a4 = _objectSpread2$1(_objectSpread2$1({}, n3.headers), "POST" === e5 && { "x-upsert": String(o5.upsert) });
          const l4 = o5.metadata;
          if ("undefined" != typeof Blob && r4 instanceof Blob ? (i4 = new FormData(), i4.append("cacheControl", o5.cacheControl), l4 && i4.append("metadata", n3.encodeMetadata(l4)), i4.append("", r4)) : "undefined" != typeof FormData && r4 instanceof FormData ? (i4 = r4, i4.has("cacheControl") || i4.append("cacheControl", o5.cacheControl), l4 && !i4.has("metadata") && i4.append("metadata", n3.encodeMetadata(l4))) : (i4 = r4, a4["cache-control"] = `max-age=${o5.cacheControl}`, a4["content-type"] = o5.contentType, l4 && (a4["x-metadata"] = n3.toBase64(n3.encodeMetadata(l4))), ("undefined" != typeof ReadableStream && i4 instanceof ReadableStream || i4 && "object" == typeof i4 && "pipe" in i4 && "function" == typeof i4.pipe) && !o5.duplex && (o5.duplex = "half")), null == s3 ? void 0 : s3.headers) for (const [e6, t6] of Object.entries(s3.headers)) a4 = setHeader(a4, e6, t6);
          const c4 = n3._removeEmptyFolders(t5), u4 = n3._getFinalPath(c4), h5 = await ("PUT" == e5 ? De2 : xe2)(n3.fetch, `${n3.url}/object/${u4}`, i4, _objectSpread2$1({ headers: a4 }, (null == o5 ? void 0 : o5.duplex) ? { duplex: o5.duplex } : {}));
          return { path: c4, id: h5.Id, fullPath: h5.Key };
        });
      }
      async upload(e5, t5, r4) {
        return this.uploadOrUpdate("POST", e5, t5, r4);
      }
      async uploadToSignedUrl(e5, t5, r4, s3) {
        var n3 = this;
        const i4 = n3._removeEmptyFolders(e5), o5 = n3._getFinalPath(i4), a4 = new URL(n3.url + `/object/upload/sign/${o5}`);
        return a4.searchParams.set("token", t5), n3.handleOperation(async () => {
          let e6;
          const t6 = _objectSpread2$1(_objectSpread2$1({}, Je2), s3);
          let o6 = _objectSpread2$1(_objectSpread2$1({}, n3.headers), { "x-upsert": String(t6.upsert) });
          const l4 = t6.metadata;
          if ("undefined" != typeof Blob && r4 instanceof Blob ? (e6 = new FormData(), e6.append("cacheControl", t6.cacheControl), l4 && e6.append("metadata", n3.encodeMetadata(l4)), e6.append("", r4)) : "undefined" != typeof FormData && r4 instanceof FormData ? (e6 = r4, e6.has("cacheControl") || e6.append("cacheControl", t6.cacheControl), l4 && !e6.has("metadata") && e6.append("metadata", n3.encodeMetadata(l4))) : (e6 = r4, o6["cache-control"] = `max-age=${t6.cacheControl}`, o6["content-type"] = t6.contentType, l4 && (o6["x-metadata"] = n3.toBase64(n3.encodeMetadata(l4))), ("undefined" != typeof ReadableStream && e6 instanceof ReadableStream || e6 && "object" == typeof e6 && "pipe" in e6 && "function" == typeof e6.pipe) && !t6.duplex && (t6.duplex = "half")), null == s3 ? void 0 : s3.headers) for (const [e7, t7] of Object.entries(s3.headers)) o6 = setHeader(o6, e7, t7);
          return { path: i4, fullPath: (await De2(n3.fetch, a4.toString(), e6, _objectSpread2$1({ headers: o6 }, (null == t6 ? void 0 : t6.duplex) ? { duplex: t6.duplex } : {}))).Key };
        });
      }
      async createSignedUploadUrl(e5, t5) {
        var r4 = this;
        return r4.handleOperation(async () => {
          let s3 = r4._getFinalPath(e5);
          const n3 = _objectSpread2$1({}, r4.headers);
          (null == t5 ? void 0 : t5.upsert) && (n3["x-upsert"] = "true");
          const i4 = await xe2(r4.fetch, `${r4.url}/object/upload/sign/${s3}`, {}, { headers: n3 }), o5 = new URL(r4.url + i4.url), a4 = o5.searchParams.get("token");
          if (!a4) throw new je2("No token returned by API");
          return { signedUrl: o5.toString(), path: e5, token: a4 };
        });
      }
      async update(e5, t5, r4) {
        return this.uploadOrUpdate("PUT", e5, t5, r4);
      }
      async move(e5, t5, r4) {
        var s3 = this;
        return s3.handleOperation(async () => await xe2(s3.fetch, `${s3.url}/object/move`, { bucketId: s3.bucketId, sourceKey: e5, destinationKey: t5, destinationBucket: null == r4 ? void 0 : r4.destinationBucket }, { headers: s3.headers }));
      }
      async copy(e5, t5, r4) {
        var s3 = this;
        return s3.handleOperation(async () => ({ path: (await xe2(s3.fetch, `${s3.url}/object/copy`, { bucketId: s3.bucketId, sourceKey: e5, destinationKey: t5, destinationBucket: null == r4 ? void 0 : r4.destinationBucket }, { headers: s3.headers })).Key }));
      }
      async createSignedUrl(e5, t5, r4) {
        var s3 = this;
        return s3.handleOperation(async () => {
          let n3 = s3._getFinalPath(e5);
          const i4 = "object" == typeof (null == r4 ? void 0 : r4.transform) && null !== r4.transform && Object.keys(r4.transform).length > 0;
          let o5 = await xe2(s3.fetch, `${s3.url}/object/sign/${n3}`, _objectSpread2$1({ expiresIn: t5 }, i4 ? { transform: r4.transform } : {}), { headers: s3.headers });
          const a4 = new URLSearchParams();
          (null == r4 ? void 0 : r4.download) && a4.set("download", true === r4.download ? "" : r4.download), null != (null == r4 ? void 0 : r4.cacheNonce) && a4.set("cacheNonce", String(r4.cacheNonce));
          const l4 = a4.toString();
          return { signedUrl: encodeURI(`${s3.url}${o5.signedURL}${l4 ? `&${l4}` : ""}`) };
        });
      }
      async createSignedUrls(e5, t5, r4) {
        var s3 = this;
        return s3.handleOperation(async () => {
          const n3 = await xe2(s3.fetch, `${s3.url}/object/sign/${s3.bucketId}`, { expiresIn: t5, paths: e5 }, { headers: s3.headers }), i4 = new URLSearchParams();
          (null == r4 ? void 0 : r4.download) && i4.set("download", true === r4.download ? "" : r4.download), null != (null == r4 ? void 0 : r4.cacheNonce) && i4.set("cacheNonce", String(r4.cacheNonce));
          const o5 = i4.toString();
          return n3.map((e6) => _objectSpread2$1(_objectSpread2$1({}, e6), {}, { signedUrl: e6.signedURL ? encodeURI(`${s3.url}${e6.signedURL}${o5 ? `&${o5}` : ""}`) : null }));
        });
      }
      download(e5, t5, r4) {
        const s3 = "object" == typeof (null == t5 ? void 0 : t5.transform) && null !== t5.transform && Object.keys(t5.transform).length > 0 ? "render/image/authenticated" : "object", n3 = new URLSearchParams();
        (null == t5 ? void 0 : t5.transform) && this.applyTransformOptsToQuery(n3, t5.transform), null != (null == t5 ? void 0 : t5.cacheNonce) && n3.set("cacheNonce", String(t5.cacheNonce));
        const i4 = n3.toString(), o5 = this._getFinalPath(e5);
        return new Ve3(() => Ue2(this.fetch, `${this.url}/${s3}/${o5}${i4 ? `?${i4}` : ""}`, { headers: this.headers, noResolveJson: true }, r4), this.shouldThrowOnError);
      }
      async info(e5) {
        var t5 = this;
        const r4 = t5._getFinalPath(e5);
        return t5.handleOperation(async () => recursiveToCamel(await Ue2(t5.fetch, `${t5.url}/object/info/${r4}`, { headers: t5.headers })));
      }
      async exists(e5) {
        var t5 = this;
        const r4 = t5._getFinalPath(e5);
        try {
          return await qe2(t5.fetch, `${t5.url}/object/${r4}`, { headers: t5.headers }), { data: true, error: null };
        } catch (e6) {
          if (t5.shouldThrowOnError) throw e6;
          if (isStorageError(e6)) {
            var s3;
            const t6 = e6 instanceof Ne2 ? e6.status : e6 instanceof $e3 ? null === (s3 = e6.originalError) || void 0 === s3 ? void 0 : s3.status : void 0;
            if (void 0 !== t6 && [400, 404].includes(t6)) return { data: false, error: e6 };
          }
          throw e6;
        }
      }
      getPublicUrl(e5, t5) {
        const r4 = this._getFinalPath(e5), s3 = new URLSearchParams();
        (null == t5 ? void 0 : t5.download) && s3.set("download", true === t5.download ? "" : t5.download), (null == t5 ? void 0 : t5.transform) && this.applyTransformOptsToQuery(s3, t5.transform), null != (null == t5 ? void 0 : t5.cacheNonce) && s3.set("cacheNonce", String(t5.cacheNonce));
        const n3 = s3.toString(), i4 = "object" == typeof (null == t5 ? void 0 : t5.transform) && null !== t5.transform && Object.keys(t5.transform).length > 0 ? "render/image" : "object";
        return { data: { publicUrl: encodeURI(`${this.url}/${i4}/public/${r4}`) + (n3 ? `?${n3}` : "") } };
      }
      async remove(e5) {
        var t5 = this;
        return t5.handleOperation(async () => await Fe2(t5.fetch, `${t5.url}/object/${t5.bucketId}`, { prefixes: e5 }, { headers: t5.headers }));
      }
      async purgeCache(e5, t5, r4) {
        var s3 = this;
        return s3.handleOperation(async () => {
          const n3 = encodeStoragePath(s3._getFinalPath(e5)), i4 = new URLSearchParams();
          (null == t5 ? void 0 : t5.transformations) && i4.set("transformations", "true");
          const o5 = i4.toString();
          return await Fe2(s3.fetch, `${s3.url}/cdn/${n3}${o5 ? `?${o5}` : ""}`, {}, { headers: s3.headers }, r4);
        });
      }
      async list(e5, t5, r4) {
        var s3 = this;
        return s3.handleOperation(async () => {
          const n3 = (null == t5 ? void 0 : t5.sortBy) ? _objectSpread2$1(_objectSpread2$1({}, Ge2.sortBy), t5.sortBy) : Ge2.sortBy, i4 = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, Ge2), t5), {}, { sortBy: n3, prefix: e5 || "" });
          return await xe2(s3.fetch, `${s3.url}/object/list/${s3.bucketId}`, i4, { headers: s3.headers }, r4);
        });
      }
      async listV2(e5, t5) {
        var r4 = this;
        return r4.handleOperation(async () => {
          const s3 = _objectSpread2$1({}, e5);
          return await xe2(r4.fetch, `${r4.url}/object/list-v2/${r4.bucketId}`, s3, { headers: r4.headers }, t5);
        });
      }
      encodeMetadata(e5) {
        return JSON.stringify(e5);
      }
      toBase64(e5) {
        return void 0 !== n2 ? n2.from(e5).toString("base64") : btoa(e5);
      }
      _getFinalPath(e5) {
        return `${this.bucketId}/${e5.replace(/^\/+/, "")}`;
      }
      _removeEmptyFolders(e5) {
        return e5.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
      }
      applyTransformOptsToQuery(e5, t5) {
        return t5.width && e5.set("width", t5.width.toString()), t5.height && e5.set("height", t5.height.toString()), t5.resize && e5.set("resize", t5.resize), t5.format && e5.set("format", t5.format), t5.quality && e5.set("quality", t5.quality.toString()), e5;
      }
    };
    Ye2 = { "X-Client-Info": "storage-js/2.112.3" };
    Ze2 = class extends Me2 {
      static {
        __name(this, "Ze");
      }
      constructor(e5, t5 = {}, r4, s3) {
        const n3 = new URL(e5);
        (null == s3 ? void 0 : s3.useNewHostname) && /supabase\.(co|in|red)$/.test(n3.hostname) && !n3.hostname.includes("storage.supabase.") && (n3.hostname = n3.hostname.replace("supabase.", "storage.supabase."));
        super(n3.href.replace(/\/$/, ""), _objectSpread2$1(_objectSpread2$1({}, Ye2), t5), r4, "storage");
      }
      async listBuckets(e5) {
        var t5 = this;
        return t5.handleOperation(async () => {
          const r4 = t5.listBucketOptionsToQueryString(e5);
          return await Ue2(t5.fetch, `${t5.url}/bucket${r4}`, { headers: t5.headers });
        });
      }
      async getBucket(e5) {
        var t5 = this;
        return t5.handleOperation(async () => await Ue2(t5.fetch, `${t5.url}/bucket/${e5}`, { headers: t5.headers }));
      }
      async createBucket(e5, t5 = { public: false }) {
        var r4 = this;
        return r4.handleOperation(async () => await xe2(r4.fetch, `${r4.url}/bucket`, { id: e5, name: e5, type: t5.type, public: t5.public, file_size_limit: t5.fileSizeLimit, allowed_mime_types: t5.allowedMimeTypes }, { headers: r4.headers }));
      }
      async updateBucket(e5, t5) {
        var r4 = this;
        return r4.handleOperation(async () => await De2(r4.fetch, `${r4.url}/bucket/${e5}`, { id: e5, name: e5, public: t5.public, file_size_limit: t5.fileSizeLimit, allowed_mime_types: t5.allowedMimeTypes }, { headers: r4.headers }));
      }
      async emptyBucket(e5) {
        var t5 = this;
        return t5.handleOperation(async () => await xe2(t5.fetch, `${t5.url}/bucket/${e5}/empty`, {}, { headers: t5.headers }));
      }
      async deleteBucket(e5) {
        var t5 = this;
        return t5.handleOperation(async () => await Fe2(t5.fetch, `${t5.url}/bucket/${e5}`, {}, { headers: t5.headers }));
      }
      async purgeBucketCache(e5, t5, r4) {
        var s3 = this;
        return s3.handleOperation(async () => {
          const n3 = new URLSearchParams();
          (null == t5 ? void 0 : t5.transformations) && n3.set("transformations", "true");
          const i4 = n3.toString();
          return await Fe2(s3.fetch, `${s3.url}/cdn/${encodeStoragePath(e5)}${i4 ? `?${i4}` : ""}`, {}, { headers: s3.headers }, r4);
        });
      }
      listBucketOptionsToQueryString(e5) {
        const t5 = {};
        return e5 && ("limit" in e5 && (t5.limit = String(e5.limit)), "offset" in e5 && (t5.offset = String(e5.offset)), e5.search && (t5.search = e5.search), e5.sortColumn && (t5.sortColumn = e5.sortColumn), e5.sortOrder && (t5.sortOrder = e5.sortOrder)), Object.keys(t5).length > 0 ? "?" + new URLSearchParams(t5).toString() : "";
      }
    };
    et = class extends Me2 {
      static {
        __name(this, "et");
      }
      constructor(e5, t5 = {}, r4) {
        super(e5.replace(/\/$/, ""), _objectSpread2$1(_objectSpread2$1({}, Ye2), t5), r4, "storage");
      }
      async createBucket(e5) {
        var t5 = this;
        return t5.handleOperation(async () => await xe2(t5.fetch, `${t5.url}/bucket`, { name: e5 }, { headers: t5.headers }));
      }
      async listBuckets(e5) {
        var t5 = this;
        return t5.handleOperation(async () => {
          const r4 = new URLSearchParams();
          void 0 !== (null == e5 ? void 0 : e5.limit) && r4.set("limit", e5.limit.toString()), void 0 !== (null == e5 ? void 0 : e5.offset) && r4.set("offset", e5.offset.toString()), (null == e5 ? void 0 : e5.sortColumn) && r4.set("sortColumn", e5.sortColumn), (null == e5 ? void 0 : e5.sortOrder) && r4.set("sortOrder", e5.sortOrder), (null == e5 ? void 0 : e5.search) && r4.set("search", e5.search);
          const s3 = r4.toString(), n3 = s3 ? `${t5.url}/bucket?${s3}` : `${t5.url}/bucket`;
          return await Ue2(t5.fetch, n3, { headers: t5.headers });
        });
      }
      async deleteBucket(e5) {
        var t5 = this;
        return t5.handleOperation(async () => await Fe2(t5.fetch, `${t5.url}/bucket/${e5}`, {}, { headers: t5.headers }));
      }
      from(e5) {
        var t5 = this;
        if (!((e6) => !(!e6 || "string" != typeof e6) && !(0 === e6.length || e6.length > 100) && e6.trim() === e6 && !e6.includes("/") && !e6.includes("\\") && /^[\w!.\*'() &$@=;:+,?-]+$/.test(e6))(e5)) throw new je2("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");
        const r4 = new Ie2({ baseUrl: this.url, catalogName: e5, auth: { type: "custom", getHeaders: /* @__PURE__ */ __name(async () => t5.headers, "getHeaders") }, fetch: this.fetch }), s3 = this.shouldThrowOnError;
        return new Proxy(r4, { get(e6, t6) {
          const r5 = e6[t6];
          return "function" != typeof r5 ? r5 : async (...t7) => {
            try {
              return { data: await r5.apply(e6, t7), error: null };
            } catch (e7) {
              if (s3) throw e7;
              return { data: null, error: e7 };
            }
          };
        } });
      }
    };
    tt = class extends Me2 {
      static {
        __name(this, "tt");
      }
      constructor(e5, t5 = {}, r4) {
        super(e5.replace(/\/$/, ""), _objectSpread2$1(_objectSpread2$1({}, Ye2), {}, { "Content-Type": "application/json" }, t5), r4, "vectors");
      }
      async createIndex(e5) {
        var t5 = this;
        return t5.handleOperation(async () => await Be2.post(t5.fetch, `${t5.url}/CreateIndex`, e5, { headers: t5.headers }) || {});
      }
      async getIndex(e5, t5) {
        var r4 = this;
        return r4.handleOperation(async () => await Be2.post(r4.fetch, `${r4.url}/GetIndex`, { vectorBucketName: e5, indexName: t5 }, { headers: r4.headers }));
      }
      async listIndexes(e5) {
        var t5 = this;
        return t5.handleOperation(async () => await Be2.post(t5.fetch, `${t5.url}/ListIndexes`, e5, { headers: t5.headers }));
      }
      async deleteIndex(e5, t5) {
        var r4 = this;
        return r4.handleOperation(async () => await Be2.post(r4.fetch, `${r4.url}/DeleteIndex`, { vectorBucketName: e5, indexName: t5 }, { headers: r4.headers }) || {});
      }
    };
    rt = class extends Me2 {
      static {
        __name(this, "rt");
      }
      constructor(e5, t5 = {}, r4) {
        super(e5.replace(/\/$/, ""), _objectSpread2$1(_objectSpread2$1({}, Ye2), {}, { "Content-Type": "application/json" }, t5), r4, "vectors");
      }
      async putVectors(e5) {
        var t5 = this;
        if (e5.vectors.length < 1 || e5.vectors.length > 500) throw new Error("Vector batch size must be between 1 and 500 items");
        return t5.handleOperation(async () => await Be2.post(t5.fetch, `${t5.url}/PutVectors`, e5, { headers: t5.headers }) || {});
      }
      async getVectors(e5) {
        var t5 = this;
        return t5.handleOperation(async () => await Be2.post(t5.fetch, `${t5.url}/GetVectors`, e5, { headers: t5.headers }));
      }
      async listVectors(e5) {
        var t5 = this;
        if (void 0 !== e5.segmentCount) {
          if (e5.segmentCount < 1 || e5.segmentCount > 16) throw new Error("segmentCount must be between 1 and 16");
          if (void 0 !== e5.segmentIndex && (e5.segmentIndex < 0 || e5.segmentIndex >= e5.segmentCount)) throw new Error("segmentIndex must be between 0 and " + (e5.segmentCount - 1));
        }
        return t5.handleOperation(async () => await Be2.post(t5.fetch, `${t5.url}/ListVectors`, e5, { headers: t5.headers }));
      }
      async queryVectors(e5) {
        var t5 = this;
        return t5.handleOperation(async () => await Be2.post(t5.fetch, `${t5.url}/QueryVectors`, e5, { headers: t5.headers }));
      }
      async deleteVectors(e5) {
        var t5 = this;
        if (e5.keys.length < 1 || e5.keys.length > 500) throw new Error("Keys batch size must be between 1 and 500 items");
        return t5.handleOperation(async () => await Be2.post(t5.fetch, `${t5.url}/DeleteVectors`, e5, { headers: t5.headers }) || {});
      }
    };
    st = class extends Me2 {
      static {
        __name(this, "st");
      }
      constructor(e5, t5 = {}, r4) {
        super(e5.replace(/\/$/, ""), _objectSpread2$1(_objectSpread2$1({}, Ye2), {}, { "Content-Type": "application/json" }, t5), r4, "vectors");
      }
      async createBucket(e5) {
        var t5 = this;
        return t5.handleOperation(async () => await Be2.post(t5.fetch, `${t5.url}/CreateVectorBucket`, { vectorBucketName: e5 }, { headers: t5.headers }) || {});
      }
      async getBucket(e5) {
        var t5 = this;
        return t5.handleOperation(async () => await Be2.post(t5.fetch, `${t5.url}/GetVectorBucket`, { vectorBucketName: e5 }, { headers: t5.headers }));
      }
      async listBuckets(e5 = {}) {
        var t5 = this;
        return t5.handleOperation(async () => await Be2.post(t5.fetch, `${t5.url}/ListVectorBuckets`, e5, { headers: t5.headers }));
      }
      async deleteBucket(e5) {
        var t5 = this;
        return t5.handleOperation(async () => await Be2.post(t5.fetch, `${t5.url}/DeleteVectorBucket`, { vectorBucketName: e5 }, { headers: t5.headers }) || {});
      }
    };
    nt = class extends st {
      static {
        __name(this, "nt");
      }
      constructor(e5, t5 = {}) {
        super(e5, t5.headers || {}, t5.fetch);
      }
      from(e5) {
        return new it(this.url, this.headers, e5, this.fetch);
      }
      async createBucket(e5) {
        return (() => super.createBucket)().call(this, e5);
      }
      async getBucket(e5) {
        return (() => super.getBucket)().call(this, e5);
      }
      async listBuckets(e5 = {}) {
        return (() => super.listBuckets)().call(this, e5);
      }
      async deleteBucket(e5) {
        return (() => super.deleteBucket)().call(this, e5);
      }
    };
    it = class extends tt {
      static {
        __name(this, "it");
      }
      constructor(e5, t5, r4, s3) {
        super(e5, t5, s3), this.vectorBucketName = r4;
      }
      async createIndex(e5) {
        return (() => super.createIndex)().call(this, _objectSpread2$1(_objectSpread2$1({}, e5), {}, { vectorBucketName: this.vectorBucketName }));
      }
      async listIndexes(e5 = {}) {
        return (() => super.listIndexes)().call(this, _objectSpread2$1(_objectSpread2$1({}, e5), {}, { vectorBucketName: this.vectorBucketName }));
      }
      async getIndex(e5) {
        return (() => super.getIndex)().call(this, this.vectorBucketName, e5);
      }
      async deleteIndex(e5) {
        return (() => super.deleteIndex)().call(this, this.vectorBucketName, e5);
      }
      index(e5) {
        return new ot(this.url, this.headers, this.vectorBucketName, e5, this.fetch);
      }
    };
    ot = class extends rt {
      static {
        __name(this, "ot");
      }
      constructor(e5, t5, r4, s3, n3) {
        super(e5, t5, n3), this.vectorBucketName = r4, this.indexName = s3;
      }
      async putVectors(e5) {
        var t5 = this;
        return (() => super.putVectors)().call(t5, _objectSpread2$1(_objectSpread2$1({}, e5), {}, { vectorBucketName: t5.vectorBucketName, indexName: t5.indexName }));
      }
      async getVectors(e5) {
        var t5 = this;
        return (() => super.getVectors)().call(t5, _objectSpread2$1(_objectSpread2$1({}, e5), {}, { vectorBucketName: t5.vectorBucketName, indexName: t5.indexName }));
      }
      async listVectors(e5 = {}) {
        var t5 = this;
        return (() => super.listVectors)().call(t5, _objectSpread2$1(_objectSpread2$1({}, e5), {}, { vectorBucketName: t5.vectorBucketName, indexName: t5.indexName }));
      }
      async queryVectors(e5) {
        var t5 = this;
        return (() => super.queryVectors)().call(t5, _objectSpread2$1(_objectSpread2$1({}, e5), {}, { vectorBucketName: t5.vectorBucketName, indexName: t5.indexName }));
      }
      async deleteVectors(e5) {
        var t5 = this;
        return (() => super.deleteVectors)().call(t5, _objectSpread2$1(_objectSpread2$1({}, e5), {}, { vectorBucketName: t5.vectorBucketName, indexName: t5.indexName }));
      }
    };
    at = class extends Ze2 {
      static {
        __name(this, "at");
      }
      constructor(e5, t5 = {}, r4, s3) {
        super(e5, t5, r4, s3);
      }
      from(e5) {
        return new ze2(this.url, this.headers, e5, this.fetch);
      }
      get vectors() {
        return new nt(this.url + "/vector", { headers: this.headers, fetch: this.fetch });
      }
      get analytics() {
        return new et(this.url + "/iceberg", this.headers, this.fetch);
      }
    };
    lt = {};
    ct = {};
    ut = {};
    ht = {};
    dt = {};
    __name(requireVersion, "requireVersion");
    __name(requireConstants, "requireConstants");
    ft = {};
    gt = {};
    __name(requireErrors, "requireErrors");
    bt = {};
    __name(requireBase64url, "requireBase64url");
    __name(requireHelpers, "requireHelpers");
    __name(requireFetch, "requireFetch");
    Et = {};
    __name(requireTypes, "requireTypes");
    __name(requireGoTrueAdminApi, "requireGoTrueAdminApi");
    At = {};
    kt = {};
    __name(requireLocalStorage, "requireLocalStorage");
    Rt = {};
    __name(requireLocks, "requireLocks");
    Pt = {};
    __name(requirePolyfills, "requirePolyfills");
    It = {};
    __name(requireEthereum, "requireEthereum");
    Lt = {};
    Ut = {};
    __name(requireWebauthn_errors, "requireWebauthn_errors");
    __name(requireWebauthn, "requireWebauthn");
    __name(requireGoTrueClient, "requireGoTrueClient");
    Dt = {};
    __name(requireAuthAdminApi, "requireAuthAdminApi");
    Ft = {};
    __name(requireAuthClient, "requireAuthClient");
    !(function(e5) {
      Object.defineProperty(e5, "__esModule", { value: true }), e5.processLock = e5.lockInternals = e5.NavigatorLockAcquireTimeoutError = e5.navigatorLock = e5.AuthClient = e5.AuthAdminApi = e5.GoTrueClient = e5.GoTrueAdminApi = void 0;
      const t5 = p2, r4 = t5.__importDefault(requireGoTrueAdminApi());
      e5.GoTrueAdminApi = r4.default;
      const s3 = t5.__importDefault(requireGoTrueClient());
      e5.GoTrueClient = s3.default;
      const n3 = t5.__importDefault(requireAuthAdminApi());
      e5.AuthAdminApi = n3.default;
      const i4 = t5.__importDefault(requireAuthClient());
      e5.AuthClient = i4.default, t5.__exportStar(requireTypes(), e5), t5.__exportStar(requireErrors(), e5);
      var o5 = requireLocks();
      Object.defineProperty(e5, "navigatorLock", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return o5.navigatorLock;
      }, "get") }), Object.defineProperty(e5, "NavigatorLockAcquireTimeoutError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return o5.NavigatorLockAcquireTimeoutError;
      }, "get") }), Object.defineProperty(e5, "lockInternals", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return o5.internals;
      }, "get") }), Object.defineProperty(e5, "processLock", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return o5.processLock;
      }, "get") });
    })(lt);
    Mt = "";
    if ("undefined" != typeof Deno) Mt = "deno", Bt = null === (Kt = Deno.version) || void 0 === Kt ? void 0 : Kt.deno;
    else if ("undefined" != typeof document) Mt = "web";
    else if ("undefined" != typeof navigator && "ReactNative" === navigator.product) Mt = "react-native";
    else {
      Mt = "node";
      const e5 = globalThis.process;
      Bt = null == e5 || null === (Wt = e5.version) || void 0 === Wt ? void 0 : Wt.replace(/^v/, "");
    }
    Ht = [`runtime=${Mt}`];
    Bt && Ht.push(`runtime-version=${Bt}`);
    Vt = { headers: { "X-Client-Info": `supabase-js/2.112.3; ${Ht.join("; ")}` } };
    Gt = { schema: "public" };
    Jt = { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, flowType: "implicit" };
    zt = {};
    Yt = { enabled: false, respectSamplingDecision: true };
    __name(matchStringTarget, "matchStringTarget");
    __name(_typeof, "_typeof");
    __name(toPropertyKey, "toPropertyKey");
    __name(_defineProperty, "_defineProperty");
    __name(ownKeys, "ownKeys");
    __name(_objectSpread2, "_objectSpread2");
    isNewApiKey = /* @__PURE__ */ __name((e5) => e5.startsWith("sb_publishable_") || e5.startsWith("sb_secret_"), "isNewApiKey");
    Xt = /* @__PURE__ */ new Set();
    fetchWithAuth = /* @__PURE__ */ __name((e5, t5, r4, s3, n3, o5) => {
      const a4 = /* @__PURE__ */ ((e6) => e6 ? (...t6) => e6(...t6) : (...e7) => fetch(...e7))(s3), l4 = Headers, c4 = true === (null == n3 ? void 0 : n3.enabled), u4 = false !== (null == n3 ? void 0 : n3.respectSamplingDecision), h5 = c4 ? (function(e6) {
        const t6 = [];
        try {
          const r5 = new URL(e6);
          t6.push(r5.hostname);
        } catch (e7) {
        }
        return t6.push("*.supabase.co", "*.supabase.in"), t6.push("localhost", "127.0.0.1", "[::1]"), t6;
      })(t5) : null, d5 = !((null == o5 ? void 0 : o5.omitApiKeyAsBearer) && isNewApiKey(e5));
      return async (t6, s4) => {
        const n4 = await r4();
        let o6 = new l4(null == s4 ? void 0 : s4.headers);
        if (o6.has("apikey") || o6.set("apikey", e5), !o6.has("Authorization")) {
          const t7 = null != n4 ? n4 : d5 ? e5 : null;
          t7 && o6.set("Authorization", `Bearer ${t7}`);
        }
        if (h5) {
          const e6 = (function(e7, t7, r5) {
            const s5 = globalThis[i2];
            if (!s5) return Qt || (Qt = true, console.warn("@supabase/supabase-js: tracePropagation is enabled but the tracing runtime is not loaded, so trace headers will not be attached. Add `import '@supabase/supabase-js/tracing'` at your application entry point (requires the OpenTelemetry API package to be installed). The CDN/UMD build does not support trace propagation.")), null;
            if (!(function(e8, t8) {
              if (!e8 || !t8 || 0 === t8.length) return false;
              let r6;
              if (e8 instanceof URL) r6 = e8;
              else try {
                r6 = new URL(e8);
              } catch (e9) {
                return false;
              }
              for (const e9 of t8) try {
                if ("string" == typeof e9) {
                  if (matchStringTarget(r6.hostname, e9)) return true;
                } else if (e9 instanceof RegExp) {
                  if (e9.test(r6.hostname)) return true;
                } else if ("function" == typeof e9 && e9(r6)) return true;
              } catch (e10) {
                continue;
              }
              return false;
            })("string" == typeof e7 || e7 instanceof URL ? e7 : e7.url, t7)) return null;
            const n5 = s5();
            if (!n5 || !n5.traceparent) {
              var o7;
              if ((null == n5 || null === (o7 = n5.carrierKeys) || void 0 === o7 ? void 0 : o7.length) && !Zt) {
                Zt = true;
                const e8 = n5.carrierKeys.includes("sentry-trace") ? " Sentry detected: set `propagateTraceparent: true` in Sentry.init() to emit it." : " Configure your tracing SDK to emit W3C trace context on outgoing requests.";
                console.warn(`@supabase/supabase-js: tracePropagation is enabled and a tracing SDK is active, but its propagator wrote [${n5.carrierKeys.join(", ")}] and no W3C traceparent header, so trace headers will not be attached.` + e8);
              }
              return null;
            }
            if (r5) {
              const e8 = (function(e9) {
                if (!e9 || "string" != typeof e9) return null;
                const t8 = e9.split("-");
                if (4 !== t8.length) return null;
                const [r6, s6, n6, i4] = t8;
                if (2 !== r6.length || 32 !== s6.length || 16 !== n6.length || 2 !== i4.length) return null;
                const o8 = /^[0-9a-f]+$/i;
                return o8.test(r6) && o8.test(s6) && o8.test(n6) && o8.test(i4) ? "00000000000000000000000000000000" === s6 || "0000000000000000" === n6 ? null : { version: r6, traceId: s6, parentId: n6, traceFlags: i4, isSampled: !(1 & ~parseInt(i4, 16)) } : null;
              })(n5.traceparent);
              if (e8 && !e8.isSampled) return { traceparent: n5.traceparent };
            }
            return n5;
          })(t6, h5, u4);
          e6 && (e6.traceparent && !o6.has("traceparent") && o6.set("traceparent", e6.traceparent), e6.tracestate && !o6.has("tracestate") && o6.set("tracestate", e6.tracestate), e6.baggage && !o6.has("baggage") && o6.set("baggage", e6.baggage));
        }
        return a4(t6, _objectSpread2(_objectSpread2({}, s4), {}, { headers: o6 }));
      };
    }, "fetchWithAuth");
    Qt = false;
    Zt = false;
    __name(normalizeTracePropagation, "normalizeTracePropagation");
    er = class extends lt.AuthClient {
      static {
        __name(this, "er");
      }
      constructor(e5) {
        super(e5);
      }
    };
    tr = class {
      static {
        __name(this, "tr");
      }
      constructor(e5, t5, r4) {
        var s3, n3;
        this.supabaseUrl = e5, this.supabaseKey = t5;
        const i4 = (function(e6) {
          const t6 = null == e6 ? void 0 : e6.trim();
          if (!t6) throw new Error("supabaseUrl is required.");
          if (!t6.match(/^https?:\/\//i)) throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
          try {
            return new URL((r5 = t6).endsWith("/") ? r5 : r5 + "/");
          } catch (e7) {
            throw Error("Invalid supabaseUrl: Provided URL is malformed.");
          }
          var r5;
        })(e5);
        if (!t5) throw new Error("supabaseKey is required.");
        ((e6) => {
          var t6, r5;
          if (!e6.startsWith("sb_") || isNewApiKey(e6) || e6.startsWith("sb_temp_")) return;
          const s4 = null !== (t6 = null === (r5 = e6.match(/^sb_[a-zA-Z0-9]+_/)) || void 0 === r5 ? void 0 : r5[0]) && void 0 !== t6 ? t6 : "unknown";
          Xt.has(s4) || (Xt.add(s4), console.warn("@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type."));
        })(t5), this.realtimeUrl = new URL("realtime/v1", i4), this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws"), this.authUrl = new URL("auth/v1", i4), this.storageUrl = new URL("storage/v1", i4), this.functionsUrl = new URL("functions/v1", i4);
        const o5 = `sb-${i4.hostname.split(".")[0]}-auth-token`, a4 = (function(e6, t6) {
          var r5, s4, n4, i5, o6, a5;
          const { db: l5, auth: c4, realtime: u4, global: h5 } = e6, { db: d5, auth: p4, realtime: f4, global: g4 } = t6, _5 = normalizeTracePropagation(e6.tracePropagation), y5 = normalizeTracePropagation(t6.tracePropagation), m5 = { db: _objectSpread2(_objectSpread2({}, d5), l5), auth: _objectSpread2(_objectSpread2({}, p4), c4), realtime: _objectSpread2(_objectSpread2({}, f4), u4), storage: {}, global: _objectSpread2(_objectSpread2(_objectSpread2({}, g4), h5), {}, { headers: _objectSpread2(_objectSpread2({}, null !== (r5 = null == g4 ? void 0 : g4.headers) && void 0 !== r5 ? r5 : {}), null !== (s4 = null == h5 ? void 0 : h5.headers) && void 0 !== s4 ? s4 : {}) }), tracePropagation: { enabled: null !== (n4 = null !== (i5 = null == _5 ? void 0 : _5.enabled) && void 0 !== i5 ? i5 : null == y5 ? void 0 : y5.enabled) && void 0 !== n4 && n4, respectSamplingDecision: null === (o6 = null !== (a5 = null == _5 ? void 0 : _5.respectSamplingDecision) && void 0 !== a5 ? a5 : null == y5 ? void 0 : y5.respectSamplingDecision) || void 0 === o6 || o6 }, accessToken: /* @__PURE__ */ __name(async () => "", "accessToken") };
          return e6.accessToken ? m5.accessToken = e6.accessToken : delete m5.accessToken, m5;
        })(null != r4 ? r4 : {}, { db: Gt, realtime: zt, auth: _objectSpread2(_objectSpread2({}, Jt), {}, { storageKey: o5 }), global: Vt, tracePropagation: Yt });
        var l4;
        (this.settings = a4, this.storageKey = null !== (s3 = a4.auth.storageKey) && void 0 !== s3 ? s3 : "", this.headers = null !== (n3 = a4.global.headers) && void 0 !== n3 ? n3 : {}, a4.accessToken) ? (this.accessToken = a4.accessToken, this.auth = new Proxy({}, { get: /* @__PURE__ */ __name((e6, t6) => {
          throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t6)} is not possible`);
        }, "get") })) : this.auth = this._initSupabaseAuthClient(null !== (l4 = a4.auth) && void 0 !== l4 ? l4 : {}, this.headers, a4.global.fetch);
        this.fetch = fetchWithAuth(t5, e5, this._getSessionToken.bind(this), a4.global.fetch, a4.tracePropagation), this.functionsFetch = fetchWithAuth(t5, e5, this._getSessionToken.bind(this), a4.global.fetch, a4.tracePropagation, { omitApiKeyAsBearer: true }), this.realtime = this._initRealtimeClient(_objectSpread2({ headers: this.headers, accessToken: this._getAccessToken.bind(this), fetch: this.fetch }, a4.realtime)), this.accessToken && Promise.resolve(this.accessToken()).then((e6) => this.realtime.setAuth(e6)).catch((e6) => console.warn("Failed to set initial Realtime auth token:", e6)), this.rest = new P3(new URL("rest/v1", i4).href, { headers: this.headers, schema: a4.db.schema, fetch: this.fetch, timeout: a4.db.timeout, urlLengthLimit: a4.db.urlLengthLimit, retry: a4.db.retry }), this.storage = new at(this.storageUrl.href, this.headers, this.fetch, null == r4 ? void 0 : r4.storage), a4.accessToken || this._listenForAuthEvents();
      }
      get functions() {
        return new a2.FunctionsClient(this.functionsUrl.href, { headers: this.headers, customFetch: this.functionsFetch });
      }
      from(e5) {
        return this.rest.from(e5);
      }
      schema(e5) {
        return this.rest.schema(e5);
      }
      rpc(e5, t5 = {}, r4 = { head: false, get: false, count: void 0 }) {
        return this.rest.rpc(e5, t5, r4);
      }
      channel(e5, t5 = { config: {} }) {
        return this.realtime.channel(e5, t5);
      }
      getChannels() {
        return this.realtime.getChannels();
      }
      removeChannel(e5) {
        return this.realtime.removeChannel(e5);
      }
      removeAllChannels() {
        return this.realtime.removeAllChannels();
      }
      async _getSessionToken() {
        var e5, t5, r4 = this;
        if (r4.accessToken) return await r4.accessToken();
        const { data: s3 } = await r4.auth.getSession();
        return null !== (e5 = null === (t5 = s3.session) || void 0 === t5 ? void 0 : t5.access_token) && void 0 !== e5 ? e5 : null;
      }
      async _getAccessToken() {
        var e5;
        return null !== (e5 = await this._getSessionToken()) && void 0 !== e5 ? e5 : this.supabaseKey;
      }
      _initSupabaseAuthClient({ autoRefreshToken: e5, persistSession: t5, detectSessionInUrl: r4, storage: s3, userStorage: n3, storageKey: i4, flowType: o5, lock: a4, debug: l4, throwOnError: c4, experimental: u4, lockAcquireTimeout: h5, skipAutoInitialize: d5 }, p4, f4) {
        const g4 = { Authorization: `Bearer ${this.supabaseKey}`, apikey: `${this.supabaseKey}` };
        return new er({ url: this.authUrl.href, headers: _objectSpread2(_objectSpread2({}, g4), p4), storageKey: i4, autoRefreshToken: e5, persistSession: t5, detectSessionInUrl: r4, storage: s3, userStorage: n3, flowType: o5, lock: a4, debug: l4, throwOnError: c4, experimental: u4, fetch: f4, lockAcquireTimeout: h5, skipAutoInitialize: d5, hasCustomAuthorizationHeader: Object.keys(this.headers).some((e6) => "authorization" === e6.toLowerCase()) });
      }
      _initRealtimeClient(e5) {
        return new C3.RealtimeClient(this.realtimeUrl.href, _objectSpread2(_objectSpread2({}, e5), {}, { params: _objectSpread2(_objectSpread2({}, { apikey: this.supabaseKey }), null == e5 ? void 0 : e5.params) }));
      }
      _listenForAuthEvents() {
        return this.auth.onAuthStateChange((e5, t5) => {
          this._handleTokenChanged(e5, "CLIENT", null == t5 ? void 0 : t5.access_token);
        });
      }
      _handleTokenChanged(e5, t5, r4) {
        "TOKEN_REFRESHED" !== e5 && "SIGNED_IN" !== e5 && "INITIAL_SESSION" !== e5 || this.changedAccessToken === r4 ? "SIGNED_OUT" === e5 && (this.realtime.setAuth(), "STORAGE" == t5 && this.auth.signOut(), this.changedAccessToken = void 0) : (this.changedAccessToken = r4, this.realtime.setAuth(r4));
      }
    };
    (function() {
      if (void 0 !== globalThis.Deno) return false;
      const e5 = globalThis.process;
      if (!e5) return false;
      const t5 = e5.version;
      if (null == t5) return false;
      const r4 = t5.match(/^v(\d+)\./);
      return !!r4 && parseInt(r4[1], 10) <= 20;
    })() && console.warn("\u26A0\uFE0F  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715");
    rr = /* @__PURE__ */ new Map();
    __name(authenticatedWebClient, "authenticatedWebClient");
    __name(readWebProviderKeys, "readWebProviderKeys");
  }
});

// ../.output-cloudflare/server/chunks/_/web-body.mjs
import { Buffer as e3 } from "node:buffer";
async function readWebJson(s3, r4) {
  var a4, c4, i4, u4;
  if ("application/json" !== (null == (a4 = Ve2(s3, "content-type")) ? void 0 : a4.split(";")[0].trim())) throw createError({ statusCode: 415, statusMessage: "JSON is required." });
  const tooLarge = /* @__PURE__ */ __name(() => createError({ statusCode: 413, statusMessage: "Request too large." }), "tooLarge");
  if (Number(Ve2(s3, "content-length")) > r4) throw tooLarge();
  if ((null == (c4 = s3.context) ? void 0 : c4.cloudflare) || (null == (i4 = s3.web) ? void 0 : i4.request)) try {
    const e5 = await (async function(e6, t5) {
      const o5 = null == e6 ? void 0 : e6.getReader();
      if (!o5) return new Uint8Array();
      const n3 = [];
      let s4 = 0;
      try {
        for (; ; ) {
          const { value: e7, done: r6 } = await o5.read();
          if (r6) break;
          if (s4 += e7.byteLength, s4 > t5) throw await o5.cancel(), new BodyTooLarge("Request too large.");
          n3.push(e7);
        }
      } finally {
        o5.releaseLock();
      }
      const r5 = new Uint8Array(s4);
      let a5 = 0;
      for (const e7 of n3) r5.set(e7, a5), a5 += e7.byteLength;
      return r5;
    })(null != (u4 = getRequestWebStream(s3)) ? u4 : null, r4);
    return JSON.parse(new TextDecoder().decode(e5));
  } catch (e5) {
    if (e5 instanceof BodyTooLarge) throw tooLarge();
    throw createError({ statusCode: 400, statusMessage: "Invalid JSON." });
  }
  const l4 = await new Promise((t5, n3) => {
    const a5 = [];
    let c5 = 0, i5 = false;
    const u5 = s3.node.req;
    u5.on("data", (e5) => {
      i5 || (c5 += e5.length, c5 > r4 ? (i5 = true, a5.length = 0, n3(tooLarge())) : a5.push(e5));
    }), u5.once("end", () => {
      i5 || t5(e3.concat(a5, c5));
    }), u5.once("error", n3), u5.once("aborted", () => n3(createError({ statusCode: 400, statusMessage: "Request interrupted." })));
  });
  try {
    return JSON.parse(l4.toString("utf8"));
  } catch {
    throw createError({ statusCode: 400, statusMessage: "Invalid JSON." });
  }
}
var BodyTooLarge;
var init_web_body = __esm({
  "../.output-cloudflare/server/chunks/_/web-body.mjs"() {
    init_modules_watch_stub();
    init_nitro();
    BodyTooLarge = class extends Error {
      static {
        __name(this, "BodyTooLarge");
      }
    };
    __name(readWebJson, "readWebJson");
  }
});

// ../.output-cloudflare/server/chunks/routes/api/web/ai.post.mjs
var ai_post_exports = {};
__export(ai_post_exports, {
  default: () => d3
});
import "node:process";
import "cloudflare:workers";
import "node:events";
import "node:buffer";
import "node:timers";
var d3;
var init_ai_post = __esm({
  "../.output-cloudflare/server/chunks/routes/api/web/ai.post.mjs"() {
    init_modules_watch_stub();
    init_nitro();
    init_web_auth();
    init_web_body();
    d3 = defineEventHandler(async (e5) => {
      var d5, l4, c4, u4, p4;
      const h5 = await authenticatedWebClient(e5), g4 = webRuntimeConfig(e5), m5 = await readWebJson(e5, 5242880);
      if ("string" != typeof (null == m5 ? void 0 : m5.url) || "string" != typeof (null == m5 ? void 0 : m5.body) || m5.body.length > 4194304) throw createError({ statusCode: 400, statusMessage: "Invalid AI request or source too large." });
      const v5 = (function(e6, t5, o5 = "") {
        let a4;
        try {
          a4 = new URL(e6);
        } catch {
          return null;
        }
        if ("https:" !== a4.protocol || a4.username || a4.password || a4.port || a4.hash) return null;
        const i4 = a4.pathname;
        return "api.openai.com" === a4.hostname && "POST" === t5 && ["/v1/responses", "/v1/chat/completions"].includes(i4) ? { provider: "openai", url: a4 } : "api.anthropic.com" === a4.hostname && "POST" === t5 && "/v1/messages" === i4 ? { provider: "anthropic", url: a4 } : "generativelanguage.googleapis.com" === a4.hostname && "POST" === t5 && /^\/v1beta\/models\/[a-zA-Z0-9._-]+:(streamGenerateContent|generateContent)$/.test(i4) ? { provider: "gemini", url: a4 } : "ollama.com" === a4.hostname && ("POST" === t5 && ["/api/chat", "/api/generate"].includes(i4) || "GET" === t5 && "/api/tags" === i4) ? { provider: "ollama_cloud", url: a4 } : "models.github.ai" === a4.hostname && ("GET" === t5 && "/catalog/models" === i4 || "POST" === t5 && "/inference/chat/completions" === i4) ? { provider: "github", url: a4 } : "github.com" === a4.hostname && "POST" === t5 && ["/login/device/code", "/login/oauth/access_token"].includes(i4) ? { provider: "github", url: a4, oauth: true } : o5 && a4.origin === o5 && "POST" === t5 && /^\/(?:v1\/)?chat\/completions$/.test(i4) ? { provider: "openai_compat", url: a4 } : null;
      })(m5.url, m5.method, g4.webAiCompatibleOrigin);
      if (!v5) throw createError({ statusCode: 400, statusMessage: "This endpoint is not enabled for web AI. Choose a cloud provider in Settings." });
      const f4 = new Headers({ "Content-Type": "application/json" });
      let y5, b5 = m5.body;
      for (const e6 of ["accept", "anthropic-version", "anthropic-beta", "x-github-api-version"]) "string" == typeof (null == (d5 = m5.headers) ? void 0 : d5[e6]) && f4.set(e6, m5.headers[e6]);
      if (v5.oauth) {
        const e6 = new URLSearchParams(m5.body);
        if (!g4.githubOauthClientId || e6.get("client_id") !== g4.githubOauthClientId) throw createError({ statusCode: 400, statusMessage: "GitHub Models is not configured for this deployment." });
        if (v5.url.pathname.endsWith("/code")) b5 = new URLSearchParams({ client_id: e6.get("client_id"), scope: "models:read" }).toString();
        else {
          if ("urn:ietf:params:oauth:grant-type:device_code" !== e6.get("grant_type") || !e6.get("device_code")) throw createError({ statusCode: 400, statusMessage: "Invalid device authorization." });
          b5 = new URLSearchParams({ client_id: e6.get("client_id"), device_code: e6.get("device_code"), grant_type: e6.get("grant_type") }).toString();
        }
        f4.set("Content-Type", "application/x-www-form-urlencoded"), f4.set("Accept", "application/json");
      } else {
        let e6;
        if ("github" === v5.provider) e6 = "string" == typeof m5.githubToken && m5.githubToken.length <= 8192 ? m5.githubToken : void 0;
        else {
          const { data: o5, error: a4 } = await h5.rpc("list_tracer_user_api_keys");
          if (a4) throw createError({ statusCode: 502, statusMessage: "Could not access your provider key." });
          e6 = null == (l4 = null == o5 ? void 0 : o5.find((e7) => e7.provider_id === v5.provider)) ? void 0 : l4.api_key;
        }
        if (!e6) throw createError({ statusCode: 400, statusMessage: "Add a key for this provider in Settings." });
        v5.url.searchParams.delete("key"), "anthropic" === v5.provider ? f4.set("x-api-key", e6) : "gemini" === v5.provider ? f4.set("x-goog-api-key", e6) : f4.set("Authorization", `Bearer ${e6}`);
      }
      try {
        y5 = await fetch(v5.url, { method: m5.method, headers: f4, body: "GET" === m5.method ? void 0 : b5, redirect: "error", signal: (null == (u4 = null == (c4 = e5.context.cloudflare) ? void 0 : c4.request) ? void 0 : u4.signal) ? AbortSignal.any([e5.context.cloudflare.request.signal, AbortSignal.timeout(18e4)]) : AbortSignal.timeout(18e4) });
      } catch {
        throw createError({ statusCode: 502, statusMessage: "The AI provider could not be reached. Try again." });
      }
      return setResponseStatus(e5, y5.status), nn(e5, "Content-Type", null != (p4 = y5.headers.get("content-type")) ? p4 : "application/json"), nn(e5, "X-Accel-Buffering", "no"), y5.ok ? y5.body ? sendStream(e5, y5.body) : "" : { error: { message: `The AI provider returned ${y5.status}. Check its key and quota in Settings.` } };
    });
  }
});

// ../.output-cloudflare/server/chunks/routes/api/web/credentials.get.mjs
var credentials_get_exports = {};
__export(credentials_get_exports, {
  default: () => t3
});
import "node:process";
import "cloudflare:workers";
import "node:events";
import "node:buffer";
import "node:timers";
var t3;
var init_credentials_get = __esm({
  "../.output-cloudflare/server/chunks/routes/api/web/credentials.get.mjs"() {
    init_modules_watch_stub();
    init_nitro();
    init_web_auth();
    t3 = defineEventHandler(async (o5) => {
      const t5 = await readWebProviderKeys(o5);
      return Object.fromEntries(["openai", "anthropic", "gemini", "ollama_cloud", "openai_compat"].map((o6) => [o6, Boolean(t5[o6])]));
    });
  }
});

// ../.output-cloudflare/server/chunks/routes/api/web/credentials.post.mjs
var credentials_post_exports = {};
__export(credentials_post_exports, {
  default: () => r2
});
import "node:process";
import "cloudflare:workers";
import "node:events";
import "node:buffer";
import "node:timers";
var r2;
var init_credentials_post = __esm({
  "../.output-cloudflare/server/chunks/routes/api/web/credentials.post.mjs"() {
    init_modules_watch_stub();
    init_nitro();
    init_web_body();
    init_web_auth();
    r2 = defineEventHandler(async (e5) => {
      var r4;
      const a4 = await authenticatedWebClient(e5), i4 = await readWebJson(e5, 65536), d5 = ["openai", "anthropic", "gemini", "ollama_cloud", "openai_compat"];
      if (null == i4 ? void 0 : i4.deleteId) {
        if (!d5.includes(i4.deleteId)) throw createError({ statusCode: 400, statusMessage: "Unknown provider." });
        const { error: e6 } = await a4.rpc("delete_tracer_user_api_key", { requested_provider_id: i4.deleteId });
        if (e6) throw createError({ statusCode: 502, statusMessage: "Could not remove provider key." });
        return { savedApiKeyIds: [] };
      }
      const n3 = {};
      for (const e6 of d5) {
        const s3 = null == (r4 = null == i4 ? void 0 : i4.apiKeys) ? void 0 : r4[e6];
        if (void 0 !== s3 && ("string" != typeof s3 || s3.length > 8192)) throw createError({ statusCode: 400, statusMessage: "Invalid provider key." });
        (null == s3 ? void 0 : s3.trim()) && (n3[e6] = s3.trim());
      }
      if (!Object.keys(n3).length) throw createError({ statusCode: 400, statusMessage: "Enter a provider key." });
      const { error: p4 } = await a4.rpc("save_tracer_user_api_keys", { requested_keys: n3 });
      if (p4) throw createError({ statusCode: 502, statusMessage: "Could not save provider keys." });
      return { savedApiKeyIds: Object.keys(n3), savedOpenAiCompatConfig: false };
    });
  }
});

// ../.output-cloudflare/server/chunks/nitro/nitro.mjs
import t4 from "node:process";
import { env as e4 } from "cloudflare:workers";
import { EventEmitter as r3 } from "node:events";
import { Buffer as s2 } from "node:buffer";
import { setImmediate as a3, clearImmediate as c3 } from "node:timers";
function createNotImplementedError(t5) {
  return new Error(`[unenv] ${t5} is not implemented yet!`);
}
function notImplemented(t5) {
  return Object.assign(() => {
    throw createNotImplementedError(t5);
  }, { __unenv__: true });
}
function jsonParseTransform(t5, e5) {
  if (!("__proto__" === t5 || "constructor" === t5 && e5 && "object" == typeof e5 && "prototype" in e5)) return e5;
  !(function(t6) {
    console.warn(`[destr] Dropping "${t6}" key to prevent prototype pollution.`);
  })(t5);
}
function destr(t5, e5 = {}) {
  if ("string" != typeof t5) return t5;
  if ('"' === t5[0] && '"' === t5[t5.length - 1] && -1 === t5.indexOf("\\")) return t5.slice(1, -1);
  const r4 = t5.trim();
  if (r4.length <= 9) switch (r4.toLowerCase()) {
    case "true":
      return true;
    case "false":
      return false;
    case "undefined":
      return;
    case "null":
      return null;
    case "nan":
      return Number.NaN;
    case "infinity":
      return Number.POSITIVE_INFINITY;
    case "-infinity":
      return Number.NEGATIVE_INFINITY;
  }
  if (!Te4.test(t5)) {
    if (e5.strict) throw new SyntaxError("[destr] Invalid JSON");
    return t5;
  }
  try {
    if (je3.test(t5) || ze3.test(t5)) {
      if (e5.strict) throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(t5, jsonParseTransform);
    }
    return JSON.parse(t5);
  } catch (r5) {
    if (e5.strict) throw r5;
    return t5;
  }
}
function encode$2(t5) {
  return encodeURI("" + t5).replace(De3, "|");
}
function encodeQueryValue$2(t5) {
  return encode$2("string" == typeof t5 ? t5 : JSON.stringify(t5)).replace(Ze3, "%2B").replace(Ee3, "+").replace(we4, "%23").replace(ve4, "%26").replace(Be3, "`").replace(ke4, "^").replace(Ce3, "%2F");
}
function encodeQueryKey$2(t5) {
  return encodeQueryValue$2(t5).replace(Se3, "%3D");
}
function encodePath(t5) {
  return encode$2(t5).replace(we4, "%23").replace(Re3, "%3F").replace(Xe3, "%2F").replace(ve4, "%26").replace(Ze3, "%2B");
}
function decode$2(t5 = "") {
  try {
    return decodeURIComponent("" + t5);
  } catch {
    return "" + t5;
  }
}
function decodePath(t5) {
  return decode$2(t5.replace(Ke3, "%252F"));
}
function decodeQueryKey$2(t5) {
  return decode$2(t5.replace(Ze3, " "));
}
function decodeQueryValue$2(t5) {
  return decode$2(t5.replace(Ze3, " "));
}
function parseQuery$2(t5 = "") {
  const e5 = /* @__PURE__ */ Object.create(null);
  "?" === t5[0] && (t5 = t5.slice(1));
  for (const r4 of t5.split("&")) {
    const t6 = r4.match(/([^=]+)=?(.*)/) || [];
    if (t6.length < 2) continue;
    const s3 = decodeQueryKey$2(t6[1]);
    if ("__proto__" === s3 || "constructor" === s3) continue;
    const a4 = decodeQueryValue$2(t6[2] || "");
    void 0 === e5[s3] ? e5[s3] = a4 : Array.isArray(e5[s3]) ? e5[s3].push(a4) : e5[s3] = [e5[s3], a4];
  }
  return e5;
}
function stringifyQuery$2(t5) {
  return Object.keys(t5).filter((e5) => void 0 !== t5[e5]).map((e5) => {
    return r4 = e5, "number" != typeof (s3 = t5[e5]) && "boolean" != typeof s3 || (s3 = String(s3)), s3 ? Array.isArray(s3) ? s3.map((t6) => `${encodeQueryKey$2(r4)}=${encodeQueryValue$2(t6)}`).join("&") : `${encodeQueryKey$2(r4)}=${encodeQueryValue$2(s3)}` : encodeQueryKey$2(r4);
    var r4, s3;
  }).filter(Boolean).join("&");
}
function hasProtocol$2(t5, e5 = {}) {
  return "boolean" == typeof e5 && (e5 = { acceptRelative: e5 }), e5.strict ? Ae4.test(t5) : Ie3.test(t5) || !!e5.acceptRelative && Me3.test(t5);
}
function withoutTrailingSlash$2(t5 = "", e5) {
  return ((function(t6 = "") {
    return t6.endsWith("/");
  })(t5) ? t5.slice(0, -1) : t5) || "/";
}
function withTrailingSlash$2(t5 = "", e5) {
  return t5.endsWith("/") ? t5 : t5 + "/";
}
function withQuery$2(t5, e5) {
  const r4 = parseURL$2(t5), s3 = { ...parseQuery$2(r4.search), ...e5 };
  return r4.search = stringifyQuery$2(s3), (function(t6) {
    const e6 = t6.pathname || "", r5 = t6.search ? (t6.search.startsWith("?") ? "" : "?") + t6.search : "", s4 = t6.hash || "", a4 = t6.auth ? t6.auth + "@" : "", c4 = t6.host || "", u4 = t6.protocol || t6[Pe3] ? (t6.protocol || "") + "//" : "";
    return u4 + a4 + c4 + e6 + r5 + s4;
  })(r4);
}
function joinURL$2(t5, ...e5) {
  let r4 = t5 || "";
  for (const t6 of e5.filter((t7) => /* @__PURE__ */ (function(t8) {
    return t8 && "/" !== t8;
  })(t7))) if (r4) {
    const e6 = t6.replace(He3, "");
    r4 = withTrailingSlash$2(r4) + e6;
  } else r4 = t6;
  return r4;
}
function joinRelativeURL(...t5) {
  const e5 = /\/(?!\/)/, r4 = t5.filter(Boolean), s3 = [];
  let a4 = 0;
  for (const t6 of r4) if (t6 && "/" !== t6) {
    for (const [r5, c5] of t6.split(e5).entries()) if (c5 && "." !== c5) if (".." !== c5) 1 === r5 && s3[s3.length - 1]?.endsWith(":/") ? s3[s3.length - 1] += "/" + c5 : (s3.push(c5), a4++);
    else {
      if (1 === s3.length && hasProtocol$2(s3[0])) continue;
      s3.pop(), a4--;
    }
  }
  let c4 = s3.join("/");
  return a4 >= 0 ? r4[0]?.startsWith("/") && !c4.startsWith("/") ? c4 = "/" + c4 : r4[0]?.startsWith("./") && !c4.startsWith("./") && (c4 = "./" + c4) : c4 = "../".repeat(-1 * a4) + c4, r4[r4.length - 1]?.endsWith("/") && !c4.endsWith("/") && (c4 += "/"), c4;
}
function parseURL$2(t5 = "", e5) {
  const r4 = t5.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
  if (r4) {
    const [, t6, e6 = ""] = r4;
    return { protocol: t6.toLowerCase(), pathname: e6, href: t6 + e6, auth: "", host: "", search: "", hash: "" };
  }
  if (!hasProtocol$2(t5, { acceptRelative: true })) return parsePath$2(t5);
  const [, s3 = "", a4, c4 = ""] = t5.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, u4 = "", f4 = ""] = c4.match(/([^#/?]*)(.*)?/) || [];
  "file:" === s3 && (f4 = f4.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: d5, search: h5, hash: g4 } = parsePath$2(f4);
  return { protocol: s3.toLowerCase(), auth: a4 ? a4.slice(0, Math.max(0, a4.length - 1)) : "", host: u4, pathname: d5, search: h5, hash: g4, [Pe3]: !s3 };
}
function parsePath$2(t5 = "") {
  const [e5 = "", r4 = "", s3 = ""] = (t5.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return { pathname: e5, search: r4, hash: s3 };
}
function createRouter$1(t5 = {}) {
  const e5 = { options: t5, rootNode: createRadixNode(), staticRoutesMap: {} }, normalizeTrailingSlash = /* @__PURE__ */ __name((e6) => t5.strictTrailingSlash ? e6 : e6.replace(/\/$/, "") || "/", "normalizeTrailingSlash");
  if (t5.routes) for (const r4 in t5.routes) insert(e5, normalizeTrailingSlash(r4), t5.routes[r4]);
  return { ctx: e5, lookup: /* @__PURE__ */ __name((t6) => (function(t7, e6) {
    const r4 = t7.staticRoutesMap[e6];
    if (r4) return r4.data;
    const s3 = e6.split("/"), a4 = {};
    let c4 = false, u4 = null, f4 = t7.rootNode, d5 = null;
    for (let t8 = 0; t8 < s3.length; t8++) {
      const e7 = s3[t8];
      null !== f4.wildcardChildNode && (u4 = f4.wildcardChildNode, d5 = s3.slice(t8).join("/"));
      const r5 = f4.children.get(e7);
      if (void 0 === r5) {
        if (f4 && f4.placeholderChildren.length > 1) {
          const e8 = s3.length - t8;
          f4 = f4.placeholderChildren.find((t9) => t9.maxDepth === e8) || null;
        } else f4 = f4.placeholderChildren[0] || null;
        if (!f4) break;
        f4.paramName && (a4[f4.paramName] = e7), c4 = true;
      } else f4 = r5;
    }
    null !== f4 && null !== f4.data || null === u4 || (f4 = u4, a4[f4.paramName || "_"] = d5, c4 = true);
    if (!f4) return null;
    if (c4) return { ...f4.data, params: c4 ? a4 : void 0 };
    return f4.data;
  })(e5, normalizeTrailingSlash(t6)), "lookup"), insert: /* @__PURE__ */ __name((t6, r4) => insert(e5, normalizeTrailingSlash(t6), r4), "insert"), remove: /* @__PURE__ */ __name((t6) => (function(t7, e6) {
    let r4 = false;
    const s3 = e6.split("/");
    let a4 = t7.rootNode;
    for (const t8 of s3) if (a4 = a4.children.get(t8), !a4) return r4;
    if (a4.data) {
      const t8 = s3.at(-1) || "";
      a4.data = null, 0 === Object.keys(a4.children).length && a4.parent && (a4.parent.children.delete(t8), a4.parent.wildcardChildNode = null, a4.parent.placeholderChildren = []), r4 = true;
    }
    return r4;
  })(e5, normalizeTrailingSlash(t6)), "remove") };
}
function insert(t5, e5, r4) {
  let s3 = true;
  const a4 = e5.split("/");
  let c4 = t5.rootNode, u4 = 0;
  const f4 = [c4];
  for (const t6 of a4) {
    let e6;
    if (e6 = c4.children.get(t6)) c4 = e6;
    else {
      const r5 = getNodeType(t6);
      e6 = createRadixNode({ type: r5, parent: c4 }), c4.children.set(t6, e6), r5 === Oe3 ? (e6.paramName = "*" === t6 ? "_" + u4++ : t6.slice(1), c4.placeholderChildren.push(e6), s3 = false) : r5 === Ue3 && (c4.wildcardChildNode = e6, e6.paramName = t6.slice(3) || "_", s3 = false), f4.push(e6), c4 = e6;
    }
  }
  for (const [t6, e6] of f4.entries()) e6.maxDepth = Math.max(f4.length - t6, e6.maxDepth || 0);
  return c4.data = r4, true === s3 && (t5.staticRoutesMap[e5] = c4), c4;
}
function createRadixNode(t5 = {}) {
  return { type: t5.type || Ne3, maxDepth: 0, parent: t5.parent || null, children: /* @__PURE__ */ new Map(), data: t5.data || null, paramName: t5.paramName || null, wildcardChildNode: null, placeholderChildren: [] };
}
function getNodeType(t5) {
  return t5.startsWith("**") ? Ue3 : ":" === t5[0] || "*" === t5 ? Oe3 : Ne3;
}
function toRouteMatcher(t5) {
  return /* @__PURE__ */ (function(t6, e5) {
    return { ctx: { table: t6 }, matchAll: /* @__PURE__ */ __name((r4) => _matchRoutes(r4, t6, e5), "matchAll") };
  })(_routerNodeToTable("", t5.ctx.rootNode), t5.ctx.options.strictTrailingSlash);
}
function _matchRoutes(t5, e5, r4) {
  true !== r4 && t5.endsWith("/") && (t5 = t5.slice(0, -1) || "/");
  const s3 = [];
  for (const [r5, a5] of _sortRoutesMap(e5.wildcard)) (t5 === r5 || t5.startsWith(r5 + "/")) && s3.push(a5);
  for (const [r5, a5] of _sortRoutesMap(e5.dynamic)) if (t5.startsWith(r5 + "/")) {
    const e6 = "/" + t5.slice(r5.length).split("/").splice(2).join("/");
    s3.push(..._matchRoutes(e6, a5));
  }
  const a4 = e5.static.get(t5);
  return a4 && s3.push(a4), s3.filter(Boolean);
}
function _sortRoutesMap(t5) {
  return [...t5.entries()].sort((t6, e5) => t6[0].length - e5[0].length);
}
function _routerNodeToTable(t5, e5) {
  const r4 = { static: /* @__PURE__ */ new Map(), wildcard: /* @__PURE__ */ new Map(), dynamic: /* @__PURE__ */ new Map() };
  return (/* @__PURE__ */ __name(function _addNode(t6, e6) {
    if (t6) if (e6.type !== Ne3 || t6.includes("*") || t6.includes(":")) {
      if (e6.type === Ue3) r4.wildcard.set(t6.replace("/**", ""), e6.data);
      else if (e6.type === Oe3) {
        const s3 = _routerNodeToTable("", e6);
        return e6.data && s3.static.set("/", e6.data), void r4.dynamic.set(t6.replace(/\/\*|\/:\w+/, ""), s3);
      }
    } else e6.data && r4.static.set(t6, e6.data);
    for (const [r5, s3] of e6.children.entries()) _addNode(`${t6}/${r5}`.replace("//", "/"), s3);
  }, "_addNode"))(t5, e5), r4;
}
function o4(t5) {
  throw new Error(`${t5} is not implemented yet!`);
}
function p3(t5) {
  const e5 = {};
  for (const [r4, s3] of Object.entries(t5)) r4 && (e5[r4] = (Array.isArray(s3) ? s3 : [s3]).filter(Boolean));
  return e5;
}
function v4(t5 = {}) {
  if (t5 instanceof Headers) return t5;
  const e5 = new Headers();
  for (const [r4, s3] of Object.entries(t5)) if (void 0 !== s3) {
    if (Array.isArray(s3)) {
      for (const t6 of s3) e5.append(r4, String(t6));
      continue;
    }
    e5.set(r4, String(s3));
  }
  return e5;
}
async function b4(t5, e5) {
  const r4 = new y4(), s3 = new w4(r4);
  let a4;
  if (r4.url = e5.url?.toString() || "/", !r4.url.startsWith("/")) {
    const t6 = new URL(r4.url);
    a4 = t6.host, r4.url = t6.pathname + t6.search + t6.hash;
  }
  r4.method = e5.method || "GET", r4.headers = (function(t6 = {}) {
    const e6 = new Fe3(), r5 = Array.isArray(t6) || (function(t7) {
      return "function" == typeof t7?.entries;
    })(t6) ? t6 : Object.entries(t6);
    for (const [t7, s4] of r5) if (s4) {
      if (void 0 === e6[t7]) {
        e6[t7] = s4;
        continue;
      }
      e6[t7] = [...Array.isArray(e6[t7]) ? e6[t7] : [e6[t7]], ...Array.isArray(s4) ? s4 : [s4]];
    }
    return e6;
  })(e5.headers || {}), r4.headers.host || (r4.headers.host = e5.host || a4 || "localhost"), r4.connection.encrypted = r4.connection.encrypted || "https" === e5.protocol, r4.body = e5.body || null, r4.__unenv__ = e5.context, await t5(r4, s3);
  let c4 = s3._data;
  (Ye3.has(s3.statusCode) || "HEAD" === r4.method.toUpperCase()) && (c4 = null, delete s3._headers["content-length"]);
  const u4 = { status: s3.statusCode, statusText: s3.statusMessage, headers: s3._headers, body: c4 };
  return r4.destroy(), s3.destroy(), u4;
}
function hasProp(t5, e5) {
  try {
    return e5 in t5;
  } catch {
    return false;
  }
}
function createError(t5) {
  if ("string" == typeof t5) return new H3Error(t5);
  if (isError(t5)) return t5;
  const e5 = new H3Error(t5.message ?? t5.statusMessage ?? "", { cause: t5.cause || t5 });
  if (hasProp(t5, "stack")) try {
    Object.defineProperty(e5, "stack", { get: /* @__PURE__ */ __name(() => t5.stack, "get") });
  } catch {
    try {
      e5.stack = t5.stack;
    } catch {
    }
  }
  if (t5.data && (e5.data = t5.data), t5.statusCode ? e5.statusCode = sanitizeStatusCode(t5.statusCode, e5.statusCode) : t5.status && (e5.statusCode = sanitizeStatusCode(t5.status, e5.statusCode)), t5.statusMessage ? e5.statusMessage = t5.statusMessage : t5.statusText && (e5.statusMessage = t5.statusText), e5.statusMessage) {
    const t6 = e5.statusMessage;
    sanitizeStatusMessage(e5.statusMessage) !== t6 && console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.");
  }
  return void 0 !== t5.fatal && (e5.fatal = t5.fatal), void 0 !== t5.unhandled && (e5.unhandled = t5.unhandled), e5;
}
function isError(t5) {
  return true === t5?.constructor?.__h3_error__;
}
function getQuery$1(t5) {
  return parseQuery$2(parseURL$2(t5.path || "").search);
}
function getRequestHeaders(t5) {
  const e5 = {};
  for (const r4 in t5.node.req.headers) {
    const s3 = t5.node.req.headers[r4];
    e5[r4] = Array.isArray(s3) ? s3.filter(Boolean).join(", ") : s3;
  }
  return e5;
}
function getRequestHeader(t5, e5) {
  return getRequestHeaders(t5)[e5.toLowerCase()];
}
function readRawBody(t5, e5 = "utf8") {
  !(function(t6, e6) {
    if (!(function(t7, e7) {
      if ("string" == typeof e7) {
        if (t7.method === e7) return true;
      } else if (e7.includes(t7.method)) return true;
      return false;
    })(t6, e6)) throw createError({ statusCode: 405, statusMessage: "HTTP method is not allowed." });
  })(t5, Je3);
  const r4 = t5._requestBody || t5.web?.request?.body || t5.node.req[Qe3] || t5.node.req.rawBody || t5.node.req.body;
  if (r4) {
    const t6 = Promise.resolve(r4).then((t7) => s2.isBuffer(t7) ? t7 : "function" == typeof t7.pipeTo ? new Promise((e6, r5) => {
      const a5 = [];
      t7.pipeTo(new WritableStream({ write(t8) {
        a5.push(t8);
      }, close() {
        e6(s2.concat(a5));
      }, abort(t8) {
        r5(t8);
      } })).catch(r5);
    }) : "function" == typeof t7.pipe ? new Promise((e6, r5) => {
      const a5 = [];
      t7.on("data", (t8) => {
        a5.push(t8);
      }).on("end", () => {
        e6(s2.concat(a5));
      }).on("error", r5);
    }) : t7.constructor === Object ? s2.from(JSON.stringify(t7)) : t7 instanceof URLSearchParams ? s2.from(t7.toString()) : t7 instanceof FormData ? new Response(t7).bytes().then((t8) => s2.from(t8)) : s2.from(t7));
    return e5 ? t6.then((t7) => t7.toString(e5)) : t6;
  }
  if (!Number.parseInt(t5.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(String(t5.node.req.headers["transfer-encoding"] ?? ""))) return Promise.resolve(void 0);
  const a4 = t5.node.req[Qe3] = new Promise((e6, r5) => {
    const a5 = [];
    t5.node.req.on("error", (t6) => {
      r5(t6);
    }).on("data", (t6) => {
      a5.push(t6);
    }).on("end", () => {
      e6(s2.concat(a5));
    });
  });
  return e5 ? a4.then((t6) => t6.toString(e5)) : a4;
}
function getRequestWebStream(t5) {
  if (!Je3.includes(t5.method)) return;
  const e5 = t5.web?.request?.body || t5._requestBody;
  if (e5) return e5;
  return Qe3 in t5.node.req || "rawBody" in t5.node.req || "body" in t5.node.req || "__unenv__" in t5.node.req ? new ReadableStream({ async start(e6) {
    const r4 = await readRawBody(t5, false);
    r4 && e6.enqueue(r4), e6.close();
  } }) : new ReadableStream({ start: /* @__PURE__ */ __name((e6) => {
    t5.node.req.on("data", (t6) => {
      e6.enqueue(t6);
    }), t5.node.req.on("end", () => {
      e6.close();
    }), t5.node.req.on("error", (t6) => {
      e6.error(t6);
    });
  }, "start") });
}
function handleCacheHeaders(t5, e5) {
  const r4 = ["public", ...e5.cacheControls || []];
  let s3 = false;
  if (void 0 !== e5.maxAge && r4.push("max-age=" + +e5.maxAge, "s-maxage=" + +e5.maxAge), e5.modifiedTime) {
    const r5 = new Date(e5.modifiedTime), a4 = t5.node.req.headers["if-modified-since"];
    t5.node.res.setHeader("last-modified", r5.toUTCString()), a4 && new Date(a4) >= r5 && (s3 = true);
  }
  if (e5.etag) {
    t5.node.res.setHeader("etag", e5.etag);
    t5.node.req.headers["if-none-match"] === e5.etag && (s3 = true);
  }
  return t5.node.res.setHeader("cache-control", r4.join(", ")), !!s3 && (t5.node.res.statusCode = 304, t5.handled || t5.node.res.end(), true);
}
function sanitizeStatusMessage(t5 = "") {
  return t5.replace($e4, "");
}
function sanitizeStatusCode(t5, e5 = 200) {
  return t5 ? ("string" == typeof t5 && (t5 = Number.parseInt(t5, 10)), t5 < 100 || t5 > 999 ? e5 : t5) : e5;
}
function splitCookiesString(t5) {
  if (Array.isArray(t5)) return t5.flatMap((t6) => splitCookiesString(t6));
  if ("string" != typeof t5) return [];
  const e5 = [];
  let r4, s3, a4, c4, u4, f4 = 0;
  const skipWhitespace = /* @__PURE__ */ __name(() => {
    for (; f4 < t5.length && /\s/.test(t5.charAt(f4)); ) f4 += 1;
    return f4 < t5.length;
  }, "skipWhitespace"), notSpecialChar = /* @__PURE__ */ __name(() => (s3 = t5.charAt(f4), "=" !== s3 && ";" !== s3 && "," !== s3), "notSpecialChar");
  for (; f4 < t5.length; ) {
    for (r4 = f4, u4 = false; skipWhitespace(); ) if (s3 = t5.charAt(f4), "," === s3) {
      for (a4 = f4, f4 += 1, skipWhitespace(), c4 = f4; f4 < t5.length && notSpecialChar(); ) f4 += 1;
      f4 < t5.length && "=" === t5.charAt(f4) ? (u4 = true, f4 = c4, e5.push(t5.slice(r4, a4)), r4 = f4) : f4 = a4 + 1;
    } else f4 += 1;
    (!u4 || f4 >= t5.length) && e5.push(t5.slice(r4));
  }
  return e5;
}
function send(t5, e5, r4) {
  return r4 && (function(t6, e6) {
    e6 && 304 !== t6.node.res.statusCode && !t6.node.res.getHeader("content-type") && t6.node.res.setHeader("content-type", e6);
  })(t5, r4), new Promise((r5) => {
    tn(() => {
      t5.handled || t5.node.res.end(e5), r5();
    });
  });
}
function setResponseStatus(t5, e5, r4) {
  e5 && (t5.node.res.statusCode = sanitizeStatusCode(e5, t5.node.res.statusCode)), r4 && (t5.node.res.statusMessage = sanitizeStatusMessage(r4));
}
function getResponseStatus(t5) {
  return t5.node.res.statusCode;
}
function getResponseStatusText(t5) {
  return t5.node.res.statusMessage;
}
function setResponseHeaders(t5, e5) {
  for (const [r4, s3] of Object.entries(e5)) t5.node.res.setHeader(r4, s3);
}
function setResponseHeader(t5, e5, r4) {
  t5.node.res.setHeader(e5, r4);
}
function appendResponseHeader(t5, e5, r4) {
  let s3 = t5.node.res.getHeader(e5);
  s3 ? (Array.isArray(s3) || (s3 = [s3.toString()]), t5.node.res.setHeader(e5, [...s3, r4])) : t5.node.res.setHeader(e5, r4);
}
function sendStream(t5, e5) {
  if (!e5 || "object" != typeof e5) throw new Error("[h3] Invalid stream provided.");
  if (t5.node.res._data = e5, !t5.node.res.socket) return t5._handled = true, Promise.resolve();
  if (hasProp(e5, "pipeTo") && "function" == typeof e5.pipeTo) return e5.pipeTo(new WritableStream({ write(e6) {
    t5.node.res.write(e6);
  } })).then(() => {
    t5.node.res.end();
  });
  if (hasProp(e5, "pipe") && "function" == typeof e5.pipe) return new Promise((r4, s3) => {
    e5.pipe(t5.node.res), e5.on && (e5.on("end", () => {
      t5.node.res.end(), r4();
    }), e5.on("error", (t6) => {
      s3(t6);
    })), t5.node.res.on("close", () => {
      e5.abort && e5.abort();
    });
  });
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(t5, e5) {
  for (const [r4, s3] of e5.headers) "set-cookie" === r4 ? t5.node.res.appendHeader(r4, splitCookiesString(s3)) : t5.node.res.setHeader(r4, s3);
  if (e5.status && (t5.node.res.statusCode = sanitizeStatusCode(e5.status, t5.node.res.statusCode)), e5.statusText && (t5.node.res.statusMessage = sanitizeStatusMessage(e5.statusText)), e5.redirected && t5.node.res.setHeader("location", e5.url), e5.body) return sendStream(t5, e5.body);
  t5.node.res.end();
}
async function proxyRequest(t5, e5, r4 = {}) {
  let s3, a4;
  rn.has(t5.method) && (r4.streamRequest ? (s3 = getRequestWebStream(t5), a4 = "half") : s3 = await readRawBody(t5, false).catch(() => {
  }));
  const c4 = r4.fetchOptions?.method || t5.method, u4 = (function(t6, ...e6) {
    const r5 = e6.filter(Boolean);
    if (0 === r5.length) return t6;
    const s4 = new Headers(t6);
    for (const t7 of r5) {
      const e7 = Array.isArray(t7) ? t7 : "function" == typeof t7.entries ? t7.entries() : Object.entries(t7);
      for (const [t8, r6] of e7) void 0 !== r6 && s4.set(t8, r6);
    }
    return s4;
  })(getProxyRequestHeaders(t5, { host: e5.startsWith("/") }), r4.fetchOptions?.headers, r4.headers);
  return (async function(t6, e6, r5 = {}) {
    let s4;
    try {
      s4 = await _getFetch(r5.fetch)(e6, { headers: r5.headers, ignoreResponseError: true, ...r5.fetchOptions });
    } catch (t7) {
      throw createError({ status: 502, statusMessage: "Bad Gateway", cause: t7 });
    }
    t6.node.res.statusCode = sanitizeStatusCode(s4.status, t6.node.res.statusCode), t6.node.res.statusMessage = sanitizeStatusMessage(s4.statusText);
    const a5 = [];
    for (const [e7, r6] of s4.headers.entries()) "content-encoding" !== e7 && "content-length" !== e7 && ("set-cookie" !== e7 ? t6.node.res.setHeader(e7, r6) : a5.push(...splitCookiesString(r6)));
    a5.length > 0 && t6.node.res.setHeader("set-cookie", a5.map((t7) => (r5.cookieDomainRewrite && (t7 = rewriteCookieProperty(t7, r5.cookieDomainRewrite, "domain")), r5.cookiePathRewrite && (t7 = rewriteCookieProperty(t7, r5.cookiePathRewrite, "path")), t7)));
    r5.onResponse && await r5.onResponse(t6, s4);
    if (void 0 !== s4._data) return s4._data;
    if (t6.handled) return;
    if (false === r5.sendStream) {
      const e7 = new Uint8Array(await s4.arrayBuffer());
      return t6.node.res.end(e7);
    }
    if (s4.body) for await (const e7 of s4.body) t6.node.res.write(e7);
    return t6.node.res.end();
  })(t5, e5, { ...r4, fetchOptions: { method: c4, body: s3, duplex: a4, ...r4.fetchOptions, headers: u4 } });
}
function getProxyRequestHeaders(t5, e5) {
  const r4 = /* @__PURE__ */ Object.create(null), s3 = getRequestHeaders(t5);
  for (const t6 in s3) (!sn.has(t6) || "host" === t6 && e5?.host) && (r4[t6] = s3[t6]);
  return r4;
}
function fetchWithEvent(t5, e5, r4, s3) {
  return _getFetch(s3?.fetch)(e5, { ...r4, context: r4?.context || t5.context, headers: { ...getProxyRequestHeaders(t5, { host: "string" == typeof e5 && e5.startsWith("/") }), ...r4?.headers } });
}
function _getFetch(t5) {
  if (t5) return t5;
  if (globalThis.fetch) return globalThis.fetch;
  throw new Error("fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js.");
}
function rewriteCookieProperty(t5, e5, r4) {
  const s3 = "string" == typeof e5 ? { "*": e5 } : e5;
  return t5.replace(new RegExp(`(;\\s*${r4}=)([^;]+)`, "gi"), (t6, e6, r5) => {
    let a4;
    if (r5 in s3) a4 = s3[r5];
    else {
      if (!("*" in s3)) return t6;
      a4 = s3["*"];
    }
    return a4 ? e6 + a4 : "";
  });
}
function isEvent(t5) {
  return hasProp(t5, "__is_event__");
}
function createEvent(t5, e5) {
  return new H3Event(t5, e5);
}
function defineEventHandler(t5) {
  if ("function" == typeof t5) return t5.__is_handler__ = true, t5;
  const e5 = { onRequest: _normalizeArray(t5.onRequest), onBeforeResponse: _normalizeArray(t5.onBeforeResponse) }, _handler = /* @__PURE__ */ __name((r4) => (async function(t6, e6, r5) {
    if (r5.onRequest) {
      for (const e7 of r5.onRequest) if (await e7(t6), t6.handled) return;
    }
    const s3 = await e6(t6), a4 = { body: s3 };
    if (r5.onBeforeResponse) for (const e7 of r5.onBeforeResponse) await e7(t6, a4);
    return a4.body;
  })(r4, t5.handler, e5), "_handler");
  return _handler.__is_handler__ = true, _handler.__resolve__ = t5.handler.__resolve__, _handler.__websocket__ = t5.websocket, _handler;
}
function _normalizeArray(t5) {
  return t5 ? Array.isArray(t5) ? t5 : [t5] : void 0;
}
function toEventHandler(t5, e5, r4) {
  return t5;
}
function createApp(t5 = {}) {
  const e5 = [], r4 = (function(t6, e6) {
    const r5 = e6.debug ? 2 : void 0;
    return an(async (s4) => {
      s4.node.req.originalUrl = s4.node.req.originalUrl || s4.node.req.url || "/";
      const a5 = s4.node.req.url || "/", c5 = (function(t7) {
        const e7 = t7.indexOf("?"), r6 = -1 === e7 ? t7 : t7.slice(0, e7), s5 = -1 === e7 ? "" : t7.slice(e7);
        return (r6.includes("%25") ? decodePath(r6.replace(/%25/g, "%2525")) : decodePath(r6)) + s5;
      })(s4._path || a5);
      s4._path = c5;
      const u4 = c5 !== a5;
      let f4;
      e6.onRequest && await e6.onRequest(s4);
      for (const d5 of t6) {
        if (d5.route.length > 1) {
          if (!c5.startsWith(d5.route)) continue;
          f4 = c5.slice(d5.route.length) || "/";
        } else f4 = c5;
        if (d5.match && !d5.match(f4, s4)) continue;
        s4._path = f4, s4.node.req.url = u4 ? d5.route.length > 1 ? a5.slice(d5.route.length) || "/" : a5 : f4;
        const t7 = await d5.handler(s4), h5 = void 0 === t7 ? void 0 : await t7;
        if (void 0 !== h5) {
          const t8 = { body: h5 };
          return e6.onBeforeResponse && (s4._onBeforeResponseCalled = true, await e6.onBeforeResponse(s4, t8)), await handleHandlerResponse(s4, t8.body, r5), void (e6.onAfterResponse && (s4._onAfterResponseCalled = true, await e6.onAfterResponse(s4, t8)));
        }
        if (s4.handled) return void (e6.onAfterResponse && (s4._onAfterResponseCalled = true, await e6.onAfterResponse(s4, void 0)));
      }
      if (!s4.handled) throw createError({ statusCode: 404, statusMessage: `Cannot find any path matching ${s4.path || "/"}.` });
      e6.onAfterResponse && (s4._onAfterResponseCalled = true, await e6.onAfterResponse(s4, void 0));
    });
  })(e5, t5), s3 = /* @__PURE__ */ (function(t6) {
    return async (e6) => {
      let r5;
      for (const s4 of t6) {
        if ("/" === s4.route && !s4.handler.__resolve__) continue;
        if (!e6.startsWith(s4.route)) continue;
        if (r5 = e6.slice(s4.route.length) || "/", s4.match && !s4.match(r5, void 0)) continue;
        let t7 = { route: s4.route, handler: s4.handler };
        if (t7.handler.__resolve__) {
          const e7 = await t7.handler.__resolve__(r5);
          if (!e7) continue;
          t7 = { ...t7, ...e7, route: joinURL$2(t7.route || "/", e7.route || "/") };
        }
        return t7;
      }
    };
  })(e5);
  r4.__resolve__ = s3;
  const a4 = /* @__PURE__ */ (function(t6) {
    let e6;
    return () => (e6 || (e6 = t6()), e6);
  })(() => {
    return e6 = s3, { ...t5.websocket, async resolve(t6) {
      const r5 = t6.request?.url || t6.url || "/", { pathname: s4 } = "string" == typeof r5 ? parseURL$2(r5) : r5, a5 = await e6(s4);
      return a5?.handler?.__websocket__ || {};
    } };
    var e6;
  }), c4 = { use: /* @__PURE__ */ __name((t6, e6, r5) => use(c4, t6, e6, r5), "use"), resolve: s3, handler: r4, stack: e5, options: t5, get websocket() {
    return a4();
  } };
  return c4;
}
function use(t5, e5, r4, s3) {
  if (Array.isArray(e5)) for (const a4 of e5) use(t5, a4, r4, s3);
  else if (Array.isArray(r4)) for (const a4 of r4) use(t5, e5, a4, s3);
  else "string" == typeof e5 ? t5.stack.push(normalizeLayer({ ...s3, route: e5, handler: r4 })) : "function" == typeof e5 ? t5.stack.push(normalizeLayer({ ...r4, handler: e5 })) : t5.stack.push(normalizeLayer({ ...e5 }));
  return t5;
}
function normalizeLayer(t5) {
  let e5 = t5.handler;
  return e5.handler && (e5 = e5.handler), t5.lazy ? e5 = lazyEventHandler(e5) : (function(t6) {
    return hasProp(t6, "__is_handler__");
  })(e5) || (e5 = toEventHandler(e5, 0, t5.route)), { route: withoutTrailingSlash$2(t5.route), match: t5.match, handler: e5 };
}
function handleHandlerResponse(t5, e5, r4) {
  if (null === e5) return (function(t6, e6) {
    if (t6.handled) return;
    e6 || 200 === t6.node.res.statusCode || (e6 = t6.node.res.statusCode);
    const r5 = sanitizeStatusCode(e6, 204);
    204 === r5 && t6.node.res.removeHeader("content-length"), t6.node.res.writeHead(r5), t6.node.res.end();
  })(t5);
  if (e5) {
    if (a4 = e5, "undefined" != typeof Response && a4 instanceof Response) return sendWebResponse(t5, e5);
    if ((function(t6) {
      if (!t6 || "object" != typeof t6) return false;
      if ("function" == typeof t6.pipe) {
        if ("function" == typeof t6._read) return true;
        if ("function" == typeof t6.abort) return true;
      }
      return "function" == typeof t6.pipeTo;
    })(e5)) return sendStream(t5, e5);
    if (e5.buffer) return send(t5, e5);
    if (e5.arrayBuffer && "function" == typeof e5.arrayBuffer) return e5.arrayBuffer().then((r5) => send(t5, s2.from(r5), e5.type));
    if (e5 instanceof Error) throw createError(e5);
    if ("function" == typeof e5.end) return true;
  }
  var a4;
  const c4 = typeof e5;
  if ("string" === c4) return send(t5, e5, Ge3.html);
  if ("object" === c4 || "boolean" === c4 || "number" === c4) return send(t5, JSON.stringify(e5, void 0, r4), Ge3.json);
  if ("bigint" === c4) return send(t5, e5.toString(), Ge3.json);
  throw createError({ statusCode: 500, statusMessage: `[h3] Cannot send ${c4} as response.` });
}
function toNodeListener(t5) {
  return async function(e5, r4) {
    const s3 = createEvent(e5, r4);
    try {
      await t5.handler(s3);
    } catch (e6) {
      const r5 = createError(e6);
      if (isError(e6) || (r5.unhandled = true), setResponseStatus(s3, r5.statusCode, r5.statusMessage), t5.options.onError && await t5.options.onError(r5, s3), s3.handled) return;
      (r5.unhandled || r5.fatal) && console.error("[h3]", r5.fatal ? "[fatal]" : "[unhandled]", r5), t5.options.onBeforeResponse && !s3._onBeforeResponseCalled && await t5.options.onBeforeResponse(s3, { body: r5 }), await (function(t6, e7, r6) {
        if (t6.handled) return;
        const s4 = isError(e7) ? e7 : createError(e7), a4 = { statusCode: s4.statusCode, statusMessage: s4.statusMessage, stack: [], data: s4.data };
        if (r6 && (a4.stack = (s4.stack || "").split("\n").map((t7) => t7.trim())), t6.handled) return;
        setResponseStatus(t6, Number.parseInt(s4.statusCode), s4.statusMessage), t6.node.res.setHeader("content-type", Ge3.json), t6.node.res.end(JSON.stringify(a4, void 0, 2));
      })(s3, r5, !!t5.options.debug), t5.options.onAfterResponse && !s3._onAfterResponseCalled && await t5.options.onAfterResponse(s3, { body: r5 });
    }
  };
}
function flatHooks(t5, e5 = {}, r4) {
  for (const s3 in t5) {
    const a4 = t5[s3], c4 = r4 ? `${r4}:${s3}` : s3;
    "object" == typeof a4 && null !== a4 ? flatHooks(a4, e5, c4) : "function" == typeof a4 && (e5[c4] = a4);
  }
  return e5;
}
function serialTaskCaller(t5, e5) {
  const r4 = e5.shift(), s3 = un(r4);
  return t5.reduce((t6, r5) => t6.then(() => s3.run(() => r5(...e5))), Promise.resolve());
}
function parallelTaskCaller(t5, e5) {
  const r4 = e5.shift(), s3 = un(r4);
  return Promise.all(t5.map((t6) => s3.run(() => t6(...e5))));
}
function callEachWith(t5, e5) {
  for (const r4 of [...t5]) r4(e5);
}
function encodeQueryValue$1(t5) {
  return (e5 = "string" == typeof t5 ? t5 : JSON.stringify(t5), encodeURI("" + e5).replace(_n, "|")).replace(gn, "%2B").replace(bn, "+").replace(ln, "%23").replace(fn, "%26").replace(xn, "`").replace(mn, "^").replace(dn, "%2F");
  var e5;
}
function encodeQueryKey$1(t5) {
  return encodeQueryValue$1(t5).replace(hn, "%3D");
}
function decode$1(t5 = "") {
  try {
    return decodeURIComponent("" + t5);
  } catch {
    return "" + t5;
  }
}
function decodeQueryKey$1(t5) {
  return decode$1(t5.replace(gn, " "));
}
function decodeQueryValue$1(t5) {
  return decode$1(t5.replace(gn, " "));
}
function parseQuery$1(t5 = "") {
  const e5 = /* @__PURE__ */ Object.create(null);
  "?" === t5[0] && (t5 = t5.slice(1));
  for (const r4 of t5.split("&")) {
    const t6 = r4.match(/([^=]+)=?(.*)/) || [];
    if (t6.length < 2) continue;
    const s3 = decodeQueryKey$1(t6[1]);
    if ("__proto__" === s3 || "constructor" === s3) continue;
    const a4 = decodeQueryValue$1(t6[2] || "");
    void 0 === e5[s3] ? e5[s3] = a4 : Array.isArray(e5[s3]) ? e5[s3].push(a4) : e5[s3] = [e5[s3], a4];
  }
  return e5;
}
function stringifyQuery$1(t5) {
  return Object.keys(t5).filter((e5) => void 0 !== t5[e5]).map((e5) => {
    return r4 = e5, "number" != typeof (s3 = t5[e5]) && "boolean" != typeof s3 || (s3 = String(s3)), s3 ? Array.isArray(s3) ? s3.map((t6) => `${encodeQueryKey$1(r4)}=${encodeQueryValue$1(t6)}`).join("&") : `${encodeQueryKey$1(r4)}=${encodeQueryValue$1(s3)}` : encodeQueryKey$1(r4);
    var r4, s3;
  }).filter(Boolean).join("&");
}
function hasProtocol$1(t5, e5 = {}) {
  return "boolean" == typeof e5 && (e5 = { acceptRelative: e5 }), e5.strict ? yn.test(t5) : jn.test(t5) || !!e5.acceptRelative && zn.test(t5);
}
function withTrailingSlash$1(t5 = "", e5) {
  return t5.endsWith("/") ? t5 : t5 + "/";
}
function withBase(t5, e5) {
  if (!(r4 = e5) || "/" === r4 || hasProtocol$1(t5)) return t5;
  var r4;
  const s3 = (function(t6 = "") {
    return ((function(t7 = "") {
      return t7.endsWith("/");
    })(t6) ? t6.slice(0, -1) : t6) || "/";
  })(e5);
  if (t5.startsWith(s3)) {
    const e6 = t5[s3.length];
    if (!e6 || "/" === e6 || "?" === e6) return t5;
  }
  return (function(t6, ...e6) {
    let r5 = t6 || "";
    for (const t7 of e6.filter((t8) => /* @__PURE__ */ (function(t9) {
      return t9 && "/" !== t9;
    })(t8))) if (r5) {
      const e7 = t7.replace(Tn, "");
      r5 = withTrailingSlash$1(r5) + e7;
    } else r5 = t7;
    return r5;
  })(s3, t5);
}
function withQuery$1(t5, e5) {
  const r4 = (function(t6 = "") {
    const e6 = t6.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
    if (e6) {
      const [, t7, r6 = ""] = e6;
      return { protocol: t7.toLowerCase(), pathname: r6, href: t7 + r6, auth: "", host: "", search: "", hash: "" };
    }
    if (!hasProtocol$1(t6, { acceptRelative: true })) return parsePath$1(t6);
    const [, r5 = "", s4, a4 = ""] = t6.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
    let [, c4 = "", u4 = ""] = a4.match(/([^#/?]*)(.*)?/) || [];
    "file:" === r5 && (u4 = u4.replace(/\/(?=[A-Za-z]:)/, ""));
    const { pathname: f4, search: d5, hash: h5 } = parsePath$1(u4);
    return { protocol: r5.toLowerCase(), auth: s4 ? s4.slice(0, Math.max(0, s4.length - 1)) : "", host: c4, pathname: f4, search: d5, hash: h5, [wn]: !r5 };
  })(t5), s3 = { ...parseQuery$1(r4.search), ...e5 };
  return r4.search = stringifyQuery$1(s3), (function(t6) {
    const e6 = t6.pathname || "", r5 = t6.search ? (t6.search.startsWith("?") ? "" : "?") + t6.search : "", s4 = t6.hash || "", a4 = t6.auth ? t6.auth + "@" : "", c4 = t6.host || "", u4 = t6.protocol || t6[wn] ? (t6.protocol || "") + "//" : "";
    return u4 + a4 + c4 + e6 + r5 + s4;
  })(r4);
}
function parsePath$1(t5 = "") {
  const [e5 = "", r4 = "", s3 = ""] = (t5.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return { pathname: e5, search: r4, hash: s3 };
}
function isPayloadMethod(t5 = "GET") {
  return vn.has(t5.toUpperCase());
}
function resolveFetchOptions(t5, e5, r4, s3) {
  const a4 = (function(t6, e6, r5) {
    if (!e6) return new r5(t6);
    const s4 = new r5(e6);
    if (t6) for (const [e7, a5] of Symbol.iterator in t6 || Array.isArray(t6) ? t6 : new r5(t6)) s4.set(e7, a5);
    return s4;
  })(e5?.headers ?? t5?.headers, r4?.headers, s3);
  let c4;
  return (r4?.query || r4?.params || e5?.params || e5?.query) && (c4 = { ...r4?.params, ...r4?.query, ...e5?.params, ...e5?.query }), { ...r4, ...e5, query: c4, params: c4, headers: a4 };
}
async function callHooks2(t5, e5) {
  if (e5) if (Array.isArray(e5)) for (const r4 of e5) await r4(t5);
  else await e5(t5);
}
function createFetch(t5 = {}) {
  const { fetch: e5 = globalThis.fetch, Headers: r4 = globalThis.Headers, AbortController: s3 = globalThis.AbortController } = t5;
  async function onError(t6) {
    const e6 = t6.error && "AbortError" === t6.error.name && !t6.options.timeout || false;
    if (false !== t6.options.retry && !e6) {
      let e7;
      e7 = "number" == typeof t6.options.retry ? t6.options.retry : isPayloadMethod(t6.options.method) ? 0 : 1;
      const r6 = t6.response && t6.response.status || 500;
      if (e7 > 0 && (Array.isArray(t6.options.retryStatusCodes) ? t6.options.retryStatusCodes.includes(r6) : Rn.has(r6))) {
        const r7 = "function" == typeof t6.options.retryDelay ? t6.options.retryDelay(t6) : t6.options.retryDelay || 0;
        return r7 > 0 && await new Promise((t7) => setTimeout(t7, r7)), $fetchRaw(t6.request, { ...t6.options, retry: e7 - 1 });
      }
    }
    const r5 = (function(t7) {
      const e7 = t7.error?.message || t7.error?.toString() || "", r6 = t7.request?.method || t7.options?.method || "GET", s4 = t7.request?.url || String(t7.request) || "/", a4 = `[${r6}] ${JSON.stringify(s4)}`, c4 = t7.response ? `${t7.response.status} ${t7.response.statusText}` : "<no response>", u4 = new FetchError(`${a4}: ${c4}${e7 ? ` ${e7}` : ""}`, t7.error ? { cause: t7.error } : void 0);
      for (const e8 of ["request", "options", "response"]) Object.defineProperty(u4, e8, { get: /* @__PURE__ */ __name(() => t7[e8], "get") });
      for (const [e8, r7] of [["data", "_data"], ["status", "status"], ["statusCode", "status"], ["statusText", "statusText"], ["statusMessage", "statusText"]]) Object.defineProperty(u4, e8, { get: /* @__PURE__ */ __name(() => t7.response && t7.response[r7], "get") });
      return u4;
    })(t6);
    throw Error.captureStackTrace && Error.captureStackTrace(r5, $fetchRaw), r5;
  }
  __name(onError, "onError");
  const $fetchRaw = /* @__PURE__ */ __name(async function(a4, c4 = {}) {
    const u4 = { request: a4, options: resolveFetchOptions(a4, c4, t5.defaults, r4), response: void 0, error: void 0 };
    if (u4.options.method && (u4.options.method = u4.options.method.toUpperCase()), u4.options.onRequest && (await callHooks2(u4, u4.options.onRequest), u4.options.headers instanceof r4 || (u4.options.headers = new r4(u4.options.headers || {}))), "string" == typeof u4.request && (u4.options.baseURL && (u4.request = withBase(u4.request, u4.options.baseURL)), u4.options.query && (u4.request = withQuery$1(u4.request, u4.options.query), delete u4.options.query), "query" in u4.options && delete u4.options.query, "params" in u4.options && delete u4.options.params), u4.options.body && isPayloadMethod(u4.options.method)) if ((function(t6) {
      if (void 0 === t6) return false;
      const e6 = typeof t6;
      return "string" === e6 || "number" === e6 || "boolean" === e6 || null === e6 || "object" === e6 && (!!Array.isArray(t6) || !t6.buffer && !(t6 instanceof FormData || t6 instanceof URLSearchParams) && (t6.constructor && "Object" === t6.constructor.name || "function" == typeof t6.toJSON));
    })(u4.options.body)) {
      const t6 = u4.options.headers.get("content-type");
      "string" != typeof u4.options.body && (u4.options.body = "application/x-www-form-urlencoded" === t6 ? new URLSearchParams(u4.options.body).toString() : JSON.stringify(u4.options.body)), t6 || u4.options.headers.set("content-type", "application/json"), u4.options.headers.has("accept") || u4.options.headers.set("accept", "application/json");
    } else ("pipeTo" in u4.options.body && "function" == typeof u4.options.body.pipeTo || "function" == typeof u4.options.body.pipe) && ("duplex" in u4.options || (u4.options.duplex = "half"));
    let f4;
    if (!u4.options.signal && u4.options.timeout) {
      const t6 = new s3();
      f4 = setTimeout(() => {
        const e6 = new Error("[TimeoutError]: The operation was aborted due to timeout");
        e6.name = "TimeoutError", e6.code = 23, t6.abort(e6);
      }, u4.options.timeout), u4.options.signal = t6.signal;
    }
    try {
      u4.response = await e5(u4.request, u4.options);
    } catch (t6) {
      return u4.error = t6, u4.options.onRequestError && await callHooks2(u4, u4.options.onRequestError), await onError(u4);
    } finally {
      f4 && clearTimeout(f4);
    }
    if ((u4.response.body || u4.response._bodyInit) && !Zn.has(u4.response.status) && "HEAD" !== u4.options.method) {
      const t6 = (u4.options.parseResponse ? "json" : u4.options.responseType) || (function(t7 = "") {
        if (!t7) return "json";
        const e6 = t7.split(";").shift() || "";
        return Sn.test(e6) ? "json" : "text/event-stream" === e6 ? "stream" : Cn.has(e6) || e6.startsWith("text/") ? "text" : "blob";
      })(u4.response.headers.get("content-type") || "");
      switch (t6) {
        case "json": {
          const t7 = await u4.response.text(), e6 = u4.options.parseResponse || destr;
          u4.response._data = e6(t7);
          break;
        }
        case "stream":
          u4.response._data = u4.response.body || u4.response._bodyInit;
          break;
        default:
          u4.response._data = await u4.response[t6]();
      }
    }
    return u4.options.onResponse && await callHooks2(u4, u4.options.onResponse), !u4.options.ignoreResponseError && u4.response.status >= 400 && u4.response.status < 600 ? (u4.options.onResponseError && await callHooks2(u4, u4.options.onResponseError), await onError(u4)) : u4.response;
  }, "$fetchRaw"), $fetch = /* @__PURE__ */ __name(async function(t6, e6) {
    return (await $fetchRaw(t6, e6))._data;
  }, "$fetch");
  return $fetch.raw = $fetchRaw, $fetch.native = (...t6) => e5(...t6), $fetch.create = (e6 = {}, r5 = {}) => createFetch({ ...t5, ...r5, defaults: { ...t5.defaults, ...r5.defaults, ...e6 } }), $fetch;
}
function encodeQueryValue(t5) {
  return (e5 = "string" == typeof t5 ? t5 : JSON.stringify(t5), encodeURI("" + e5).replace(Nn, "|")).replace(Mn, "%2B").replace(Un, "+").replace(Kn, "%23").replace(Xn, "%26").replace(Pn, "`").replace(Hn, "^").replace(An, "%2F");
  var e5;
}
function encodeQueryKey(t5) {
  return encodeQueryValue(t5).replace(In, "%3D");
}
function decode(t5 = "") {
  try {
    return decodeURIComponent("" + t5);
  } catch {
    return "" + t5;
  }
}
function decodeQueryKey(t5) {
  return decode(t5.replace(Mn, " "));
}
function decodeQueryValue(t5) {
  return decode(t5.replace(Mn, " "));
}
function parseQuery(t5 = "") {
  const e5 = /* @__PURE__ */ Object.create(null);
  "?" === t5[0] && (t5 = t5.slice(1));
  for (const r4 of t5.split("&")) {
    const t6 = r4.match(/([^=]+)=?(.*)/) || [];
    if (t6.length < 2) continue;
    const s3 = decodeQueryKey(t6[1]);
    if ("__proto__" === s3 || "constructor" === s3) continue;
    const a4 = decodeQueryValue(t6[2] || "");
    void 0 === e5[s3] ? e5[s3] = a4 : Array.isArray(e5[s3]) ? e5[s3].push(a4) : e5[s3] = [e5[s3], a4];
  }
  return e5;
}
function stringifyQuery(t5) {
  return Object.keys(t5).filter((e5) => void 0 !== t5[e5]).map((e5) => {
    return r4 = e5, "number" != typeof (s3 = t5[e5]) && "boolean" != typeof s3 || (s3 = String(s3)), s3 ? Array.isArray(s3) ? s3.map((t6) => `${encodeQueryKey(r4)}=${encodeQueryValue(t6)}`).join("&") : `${encodeQueryKey(r4)}=${encodeQueryValue(s3)}` : encodeQueryKey(r4);
    var r4, s3;
  }).filter(Boolean).join("&");
}
function withTrailingSlash(t5 = "", e5) {
  return t5.endsWith("/") ? t5 : t5 + "/";
}
function withoutBase(t5, e5) {
  if (!(r4 = e5) || "/" === r4) return t5;
  var r4;
  const s3 = (function(t6 = "") {
    return ((function(t7 = "") {
      return t7.endsWith("/");
    })(t6) ? t6.slice(0, -1) : t6) || "/";
  })(e5);
  if (!t5.startsWith(s3)) return t5;
  const a4 = t5[s3.length];
  if (a4 && "/" !== a4 && "?" !== a4) return t5;
  return "/" + t5.slice(s3.length).replace(/^\/+/, "");
}
function withQuery(t5, e5) {
  const r4 = parseURL(t5), s3 = { ...parseQuery(r4.search), ...e5 };
  return r4.search = stringifyQuery(s3), (function(t6) {
    const e6 = t6.pathname || "", r5 = t6.search ? (t6.search.startsWith("?") ? "" : "?") + t6.search : "", s4 = t6.hash || "", a4 = t6.auth ? t6.auth + "@" : "", c4 = t6.host || "", u4 = t6.protocol || t6[Fn] ? (t6.protocol || "") + "//" : "";
    return u4 + a4 + c4 + e6 + r5 + s4;
  })(r4);
}
function getQuery(t5) {
  return parseQuery(parseURL(t5).search);
}
function joinURL(t5, ...e5) {
  let r4 = t5 || "";
  for (const t6 of e5.filter((t7) => /* @__PURE__ */ (function(t8) {
    return t8 && "/" !== t8;
  })(t7))) if (r4) {
    const e6 = t6.replace(Ln, "");
    r4 = withTrailingSlash(r4) + e6;
  } else r4 = t6;
  return r4;
}
function parseURL(t5 = "", e5) {
  const r4 = t5.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
  if (r4) {
    const [, t6, e6 = ""] = r4;
    return { protocol: t6.toLowerCase(), pathname: e6, href: t6 + e6, auth: "", host: "", search: "", hash: "" };
  }
  if (!(function(t6, e6 = {}) {
    return "boolean" == typeof e6 && (e6 = { acceptRelative: e6 }), e6.strict ? On.test(t6) : qn.test(t6) || !!e6.acceptRelative && Wn.test(t6);
  })(t5, { acceptRelative: true })) return parsePath(t5);
  const [, s3 = "", a4, c4 = ""] = t5.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, u4 = "", f4 = ""] = c4.match(/([^#/?]*)(.*)?/) || [];
  "file:" === s3 && (f4 = f4.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: d5, search: h5, hash: g4 } = parsePath(f4);
  return { protocol: s3.toLowerCase(), auth: a4 ? a4.slice(0, Math.max(0, a4.length - 1)) : "", host: u4, pathname: d5, search: h5, hash: g4, [Fn]: !s3 };
}
function parsePath(t5 = "") {
  const [e5 = "", r4 = "", s3 = ""] = (t5.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return { pathname: e5, search: r4, hash: s3 };
}
function asyncCall(t5, ...e5) {
  try {
    return (r4 = t5(...e5)) && "function" == typeof r4.then ? r4 : Promise.resolve(r4);
  } catch (t6) {
    return Promise.reject(t6);
  }
  var r4;
}
function stringify2(t5) {
  if (/* @__PURE__ */ (function(t6) {
    const e5 = typeof t6;
    return null === t6 || "object" !== e5 && "function" !== e5;
  })(t5)) return String(t5);
  if ((function(t6) {
    const e5 = Object.getPrototypeOf(t6);
    return !e5 || e5.isPrototypeOf(Object);
  })(t5) || Array.isArray(t5)) return JSON.stringify(t5);
  if ("function" == typeof t5.toJSON) return stringify2(t5.toJSON());
  throw new Error("[unstorage] Cannot stringify value!");
}
function serializeRaw(t5) {
  return "string" == typeof t5 ? t5 : Yn + (function(t6) {
    if (globalThis.Buffer) return s2.from(t6).toString("base64");
    return globalThis.btoa(String.fromCodePoint(...t6));
  })(t5);
}
function deserializeRaw(t5) {
  return "string" != typeof t5 ? t5 : t5.startsWith(Yn) ? (function(t6) {
    if (globalThis.Buffer) return s2.from(t6, "base64");
    return Uint8Array.from(globalThis.atob(t6), (t7) => t7.codePointAt(0));
  })(t5.slice(7)) : t5;
}
function normalizeKey$1(t5) {
  return t5 && t5.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...t5) {
  return normalizeKey$1(t5.join(":"));
}
function normalizeBaseKey(t5) {
  return (t5 = normalizeKey$1(t5)) ? t5 + ":" : "";
}
function watch(t5, e5, r4) {
  return t5.watch ? t5.watch((t6, s3) => e5(t6, r4 + s3)) : () => {
  };
}
async function dispose(t5) {
  "function" == typeof t5.dispose && await asyncCall(t5.dispose);
}
function useStorage(t5 = "") {
  return t5 ? (function(t6, e5) {
    if (!(e5 = normalizeBaseKey(e5))) return t6;
    const r4 = { ...t6 };
    for (const s3 of Vn) r4[s3] = (r5 = "", ...a4) => t6[s3](e5 + r5, ...a4);
    return r4.getKeys = (r5 = "", ...s3) => t6.getKeys(e5 + r5, ...s3).then((t7) => t7.map((t8) => t8.slice(e5.length))), r4.keys = r4.getKeys, r4.getItems = async (r5, s3) => {
      const a4 = r5.map((t7) => "string" == typeof t7 ? e5 + t7 : { ...t7, key: e5 + t7.key });
      return (await t6.getItems(a4, s3)).map((t7) => ({ key: t7.key.slice(e5.length), value: t7.value }));
    }, r4.setItems = async (r5, s3) => {
      const a4 = r5.map((t7) => ({ key: e5 + t7.key, value: t7.value, options: t7.options }));
      return t6.setItems(a4, s3);
    }, r4;
  })(Gn, t5) : Gn;
}
function hash(t5) {
  return (function(t6) {
    return new k4().finalize(t6).toBase64();
  })("string" == typeof t5 ? t5 : (function(t6) {
    const e5 = new nr();
    return e5.dispatch(t6), e5.buff;
  })(t5)).replace(/[-_]/g, "").slice(0, 10);
}
function defineCachedFunction(t5, e5 = {}) {
  e5 = { name: "_", base: "/cache", swr: true, maxAge: 1, ...e5 };
  const r4 = {}, s3 = e5.group || "nitro/functions", a4 = e5.name || t5.name || "_", c4 = e5.integrity || hash([t5, e5]), u4 = e5.validate || ((t6) => void 0 !== t6.value);
  return async (...f4) => {
    if (await e5.shouldBypassCache?.(...f4)) return t5(...f4);
    const d5 = await (e5.getKey || getKey)(...f4), h5 = await e5.shouldInvalidateCache?.(...f4), g4 = await (async function(t6, f5, d6, h6) {
      const g5 = [e5.base, s3, a4, t6 + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
      let m6 = await useStorage().getItem(g5).catch((t7) => {
        console.error("[cache] Cache read error.", t7), useNitroApp().captureError(t7, { event: h6, tags: ["cache"] });
      }) || {};
      if ("object" != typeof m6) {
        m6 = {};
        const t7 = new Error("Malformed data read from cache.");
        console.error("[cache]", t7), useNitroApp().captureError(t7, { event: h6, tags: ["cache"] });
      }
      const x5 = 1e3 * (e5.maxAge ?? 0);
      x5 && (m6.expires = Date.now() + x5);
      const _5 = d6 || m6.integrity !== c4 || x5 && Date.now() - (m6.mtime || 0) > x5 || false === u4(m6), j5 = _5 ? (async () => {
        const s4 = r4[t6];
        s4 || (void 0 !== m6.value && (e5.staleMaxAge || 0) >= 0 && false === e5.swr && (m6.value = void 0, m6.integrity = void 0, m6.mtime = void 0, m6.expires = void 0), r4[t6] = Promise.resolve(f5()));
        try {
          m6.value = await r4[t6];
        } catch (e6) {
          throw s4 || delete r4[t6], e6;
        }
        if (!s4 && (m6.mtime = Date.now(), m6.integrity = c4, delete r4[t6], false !== u4(m6))) {
          let t7;
          e5.maxAge && !e5.swr && (t7 = { ttl: e5.maxAge });
          const r5 = useStorage().setItem(g5, m6, t7).catch((t8) => {
            console.error("[cache] Cache write error.", t8), useNitroApp().captureError(t8, { event: h6, tags: ["cache"] });
          });
          h6?.waitUntil && h6.waitUntil(r5);
        }
      })() : Promise.resolve();
      return void 0 === m6.value ? await j5 : _5 && h6 && h6.waitUntil && h6.waitUntil(j5), e5.swr && false !== u4(m6) ? (j5.catch((t7) => {
        console.error("[cache] SWR handler error.", t7), useNitroApp().captureError(t7, { event: h6, tags: ["cache"] });
      }), m6) : j5.then(() => m6);
    })(d5, () => t5(...f4), h5, f4[0] && isEvent(f4[0]) ? f4[0] : void 0);
    let m5 = g4.value;
    return e5.transform && (m5 = await e5.transform(g4, ...f4) || m5), m5;
  };
}
function getKey(...t5) {
  return t5.length > 0 ? hash(t5) : "";
}
function escapeKey(t5) {
  return String(t5).replace(/\W/g, "");
}
function cloneWithProxy(t5, e5) {
  return new Proxy(t5, { get: /* @__PURE__ */ __name((t6, r4, s3) => r4 in e5 ? e5[r4] : Reflect.get(t6, r4, s3), "get"), set: /* @__PURE__ */ __name((t6, r4, s3, a4) => r4 in e5 ? (e5[r4] = s3, true) : Reflect.set(t6, r4, s3, a4), "set") });
}
function klona(t5) {
  if ("object" != typeof t5) return t5;
  var e5, r4, s3 = Object.prototype.toString.call(t5);
  if ("[object Object]" === s3) {
    if (t5.constructor !== Object && "function" == typeof t5.constructor) for (e5 in r4 = new t5.constructor(), t5) t5.hasOwnProperty(e5) && r4[e5] !== t5[e5] && (r4[e5] = klona(t5[e5]));
    else for (e5 in r4 = {}, t5) "__proto__" === e5 ? Object.defineProperty(r4, e5, { value: klona(t5[e5]), configurable: true, enumerable: true, writable: true }) : r4[e5] = klona(t5[e5]);
    return r4;
  }
  if ("[object Array]" === s3) {
    for (e5 = t5.length, r4 = Array(e5); e5--; ) r4[e5] = klona(t5[e5]);
    return r4;
  }
  return "[object Set]" === s3 ? (r4 = /* @__PURE__ */ new Set(), t5.forEach(function(t6) {
    r4.add(klona(t6));
  }), r4) : "[object Map]" === s3 ? (r4 = /* @__PURE__ */ new Map(), t5.forEach(function(t6, e6) {
    r4.set(klona(e6), klona(t6));
  }), r4) : "[object Date]" === s3 ? /* @__PURE__ */ new Date(+t5) : "[object RegExp]" === s3 ? ((r4 = new RegExp(t5.source, t5.flags)).lastIndex = t5.lastIndex, r4) : "[object DataView]" === s3 ? new t5.constructor(klona(t5.buffer)) : "[object ArrayBuffer]" === s3 ? t5.slice(0) : "Array]" === s3.slice(-6) ? new t5.constructor(t5) : t5;
}
function isPlainObject$1(t5) {
  if (null === t5 || "object" != typeof t5) return false;
  const e5 = Object.getPrototypeOf(t5);
  return (null === e5 || e5 === Object.prototype || null === Object.getPrototypeOf(e5)) && (!(Symbol.iterator in t5) && (!(Symbol.toStringTag in t5) || "[object Module]" === Object.prototype.toString.call(t5)));
}
function _defu$1(t5, e5, r4 = ".", s3) {
  if (!isPlainObject$1(e5)) return _defu$1(t5, {}, r4, s3);
  const a4 = Object.assign({}, e5);
  for (const e6 in t5) {
    if ("__proto__" === e6 || "constructor" === e6) continue;
    const c4 = t5[e6];
    null != c4 && (s3 && s3(a4, e6, c4, r4) || (Array.isArray(c4) && Array.isArray(a4[e6]) ? a4[e6] = [...c4, ...a4[e6]] : isPlainObject$1(c4) && isPlainObject$1(a4[e6]) ? a4[e6] = _defu$1(c4, a4[e6], (r4 ? `${r4}.` : "") + e6.toString(), s3) : a4[e6] = c4));
  }
  return a4;
}
function isUppercase(t5 = "") {
  if (!ir.test(t5)) return t5 !== t5.toLowerCase();
}
function kebabCase(t5, e5) {
  return t5 ? (Array.isArray(t5) ? t5 : (function(t6) {
    const e6 = or, r4 = [];
    if (!t6 || "string" != typeof t6) return r4;
    let s3, a4, c4 = "";
    for (const u4 of t6) {
      const t7 = e6.includes(u4);
      if (true === t7) {
        r4.push(c4), c4 = "", s3 = void 0;
        continue;
      }
      const f4 = isUppercase(u4);
      if (false === a4) {
        if (false === s3 && true === f4) {
          r4.push(c4), c4 = u4, s3 = f4;
          continue;
        }
        if (true === s3 && false === f4 && c4.length > 1) {
          const t8 = c4.at(-1);
          r4.push(c4.slice(0, Math.max(0, c4.length - 1))), c4 = t8 + u4, s3 = f4;
          continue;
        }
      }
      c4 += u4, s3 = f4, a4 = t7;
    }
    return r4.push(c4), r4;
  })(t5)).map((t6) => t6.toLowerCase()).join(e5) : "";
}
function getEnv(t5, e5) {
  const r4 = (s3 = t5, kebabCase(s3 || "", "_")).toUpperCase();
  var s3;
  return destr(m2.env[e5.prefix + r4] ?? m2.env[e5.altPrefix + r4]);
}
function _isObject(t5) {
  return "object" == typeof t5 && !Array.isArray(t5);
}
function applyEnv(t5, e5, r4 = "") {
  for (const s3 in t5) {
    const a4 = r4 ? `${r4}_${s3}` : s3, c4 = getEnv(a4, e5);
    _isObject(t5[s3]) ? _isObject(c4) ? (t5[s3] = { ...t5[s3], ...c4 }, applyEnv(t5[s3], e5, a4)) : void 0 === c4 ? applyEnv(t5[s3], e5, a4) : t5[s3] = c4 ?? t5[s3] : t5[s3] = c4 ?? t5[s3], e5.envExpansion && "string" == typeof t5[s3] && (t5[s3] = _expandFromEnv(t5[s3]));
  }
  return t5;
}
function _expandFromEnv(t5) {
  return t5.replace(cr, (t6, e5) => m2.env[e5] || t6);
}
function useRuntimeConfig(t5) {
  if (!t5) return lr;
  if (t5.context.nitro.runtimeConfig) return t5.context.nitro.runtimeConfig;
  const e5 = klona(ur);
  return applyEnv(e5, pr), t5.context.nitro.runtimeConfig = e5, e5;
}
function _deepFreeze(t5) {
  const e5 = Object.getOwnPropertyNames(t5);
  for (const r4 of e5) {
    const e6 = t5[r4];
    e6 && "object" == typeof e6 && _deepFreeze(e6);
  }
  return Object.freeze(t5);
}
function isPlainObject(t5) {
  if (null === t5 || "object" != typeof t5) return false;
  const e5 = Object.getPrototypeOf(t5);
  return (null === e5 || e5 === Object.prototype || null === Object.getPrototypeOf(e5)) && (!(Symbol.iterator in t5) && (!(Symbol.toStringTag in t5) || "[object Module]" === Object.prototype.toString.call(t5)));
}
function _defu(t5, e5, r4 = ".", s3) {
  if (!isPlainObject(e5)) return _defu(t5, {}, r4, s3);
  const a4 = { ...e5 };
  for (const e6 of Object.keys(t5)) {
    if ("__proto__" === e6 || "constructor" === e6) continue;
    const c4 = t5[e6];
    null != c4 && (s3 && s3(a4, e6, c4, r4) || (Array.isArray(c4) && Array.isArray(a4[e6]) ? a4[e6] = [...c4, ...a4[e6]] : isPlainObject(c4) && isPlainObject(a4[e6]) ? a4[e6] = _defu(c4, a4[e6], (r4 ? `${r4}.` : "") + e6.toString(), s3) : a4[e6] = c4));
  }
  return a4;
}
function isPathInScope(t5, e5) {
  let r4;
  try {
    const e6 = t5.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    r4 = new URL(e6, "http://_").pathname;
  } catch {
    return false;
  }
  return !e5 || r4 === e5 || r4.startsWith(e5 + "/");
}
function createRouteRulesHandler(t5) {
  return an((e5) => {
    const r4 = getRouteRules(e5);
    if (r4.headers && en(e5, r4.headers), r4.redirect) {
      let t6 = r4.redirect.to;
      if (t6.endsWith("/**")) {
        let s3 = e5.path;
        const a4 = r4.redirect._redirectStripBase;
        if (a4) {
          if (!isPathInScope(e5.path.split("?")[0], a4)) throw createError({ statusCode: 400 });
          s3 = withoutBase(s3, a4);
        } else s3.startsWith("//") && (s3 = s3.replace(/^\/+/, "/"));
        t6 = joinURL(t6.slice(0, -3), s3);
      } else if (e5.path.includes("?")) {
        t6 = withQuery(t6, getQuery(e5.path));
      }
      return (function(t7, e6, r5 = 302) {
        return t7.node.res.statusCode = sanitizeStatusCode(r5, t7.node.res.statusCode), t7.node.res.setHeader("location", e6), send(t7, `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${e6.replace(/"/g, "%22")}"></head></html>`, Ge3.html);
      })(e5, t6, r4.redirect.statusCode);
    }
    if (r4.proxy) {
      let s3 = r4.proxy.to;
      if (s3.endsWith("/**")) {
        let t6 = e5.path;
        const a4 = r4.proxy._proxyStripBase;
        if (a4) {
          if (!isPathInScope(e5.path.split("?")[0], a4)) throw createError({ statusCode: 400 });
          t6 = withoutBase(t6, a4);
        } else t6.startsWith("//") && (t6 = t6.replace(/^\/+/, "/"));
        s3 = joinURL(s3.slice(0, -3), t6);
      } else if (e5.path.includes("?")) {
        s3 = withQuery(s3, getQuery(e5.path));
      }
      return proxyRequest(e5, s3, { fetch: t5.localFetch, ...r4.proxy });
    }
  });
}
function getRouteRules(t5) {
  return t5.context._nitro = t5.context._nitro || {}, t5.context._nitro.routeRules || (t5.context._nitro.routeRules = getRouteRulesForPath(withoutBase(t5.path.split("?")[0], useRuntimeConfig().app.baseURL))), t5.context._nitro.routeRules;
}
function getRouteRulesForPath(t5) {
  return xr({}, ..._r.matchAll(t5).reverse());
}
function joinHeaders(t5) {
  return Array.isArray(t5) ? t5.join(", ") : String(t5);
}
function normalizeCookieHeader(t5 = "") {
  return splitCookiesString(joinHeaders(t5));
}
function normalizeCookieHeaders(t5) {
  const e5 = new Headers();
  for (const [r4, s3] of t5) if ("set-cookie" === r4) for (const t6 of normalizeCookieHeader(s3)) e5.append("set-cookie", t6);
  else e5.set(r4, joinHeaders(s3));
  return e5;
}
function hasReqHeader(t5, e5, r4) {
  const s3 = getRequestHeader(t5, e5);
  return !(!s3 || "string" != typeof s3 || !s3.toLowerCase().includes(r4));
}
function defaultHandler(t5, e5, r4) {
  const s3 = t5.unhandled || t5.fatal, a4 = t5.statusCode || 500, c4 = t5.statusMessage || "Server Error", u4 = (function(t6, e6 = {}) {
    const r5 = (function(t7, e7 = {}) {
      if (e7.xForwardedHost) {
        const e8 = t7.node.req.headers["x-forwarded-host"], r6 = (e8 || "").split(",").shift()?.trim();
        if (r6) return r6;
      }
      return t7.node.req.headers.host || "localhost";
    })(t6, e6), s4 = (function(t7, e7 = {}) {
      return false !== e7.xForwardedProto && "https" === t7.node.req.headers["x-forwarded-proto"] || t7.node.req.connection?.encrypted ? "https" : "http";
    })(t6, e6), a5 = (t6.node.req.originalUrl || t6.path).replace(/^[/\\]+/g, "/");
    return new URL(a5, `${s4}://${r5}`);
  })(e5, { xForwardedHost: true, xForwardedProto: true });
  if (404 === a4) {
    const t6 = "/";
    if (/^\/[^/]/.test(t6) && !u4.pathname.startsWith(t6)) {
      return { status: 302, statusText: "Found", headers: { location: `${t6}${u4.pathname.slice(1)}${u4.search}` }, body: "Redirecting..." };
    }
  }
  if (s3 && !r4?.silent) {
    const r5 = [t5.unhandled && "[unhandled]", t5.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${r5} [${e5.method}] ${u4}
`, t5);
  }
  const f4 = { "content-type": "application/json", "x-content-type-options": "nosniff", "x-frame-options": "DENY", "referrer-policy": "no-referrer", "content-security-policy": "script-src 'none'; frame-ancestors 'none';" };
  setResponseStatus(e5, a4, c4), 404 !== a4 && (function(t6, e6) {
    return t6.node.res.getHeader(e6);
  })(e5, "cache-control") || (f4["cache-control"] = "no-cache");
  return { status: a4, statusText: c4, headers: f4, body: { error: true, url: u4.href, statusCode: a4, statusMessage: c4, message: s3 ? "Server Error" : t5.message, data: s3 ? void 0 : t5.data } };
}
function useNitroApp() {
  return Tr;
}
function defineRenderHandler(t5) {
  const e5 = useRuntimeConfig();
  return an(async (r4) => {
    const s3 = useNitroApp(), a4 = { event: r4, render: t5, response: void 0 };
    if (await s3.hooks.callHook("render:before", a4), !a4.response) {
      if (r4.path === `${e5.app.baseURL}favicon.ico`) return setResponseHeader(r4, "Content-Type", "image/x-icon"), send(r4, "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
      if (a4.response = await a4.render(r4), !a4.response) {
        const t6 = getResponseStatus(r4);
        return setResponseStatus(r4, 200 === t6 ? 500 : t6), send(r4, "No response returned from render handler: " + r4.path);
      }
    }
    return await s3.hooks.callHook("render:response", a4.response, a4), a4.response.headers && setResponseHeaders(r4, a4.response.headers), (a4.response.statusCode || a4.response.statusMessage) && setResponseStatus(r4, a4.response.statusCode, a4.response.statusMessage), a4.response.body;
  });
}
var ReadStream, WriteStream, u3, Process, f3, d4, _getEnv, h4, g3, m2, x4, _4, j4, z4, T4, C4, S4, R4, Z4, B4, D4, E4, K4, X4, I4, M4, H4, P4, N4, U4, O4, q4, W4, L4, F4, Y4, V4, Q4, J4, G4, $4, tt2, et2, nt2, rt2, st2, at2, it2, ot2, ct2, ut2, pt2, lt2, ft2, dt2, ht2, gt2, mt2, xt2, _t2, bt2, yt2, jt2, zt2, Tt2, wt2, vt2, Ct2, St2, Rt2, Zt2, kt2, Bt2, Dt2, Et2, Kt2, Xt2, At2, It2, Mt2, Ht2, Pt2, Nt2, Ut2, Ot2, qt2, Wt2, Lt2, Ft2, Yt2, Vt2, Qt2, Jt2, Gt2, $t2, te4, ee4, ne4, re4, se4, ae4, ie4, oe4, ce4, ue4, pe4, le4, fe4, de4, he4, ge4, me4, xe3, _e4, be4, ye4, je3, ze3, Te4, we4, ve4, Ce3, Se3, Re3, Ze3, ke4, Be3, De3, Ee3, Ke3, Xe3, Ae4, Ie3, Me3, He3, Pe3, Ne3, Ue3, Oe3, i3, qe3, We3, Le3, A4, y4, w4, Fe3, Ye3, H3Error, Ve2, Qe3, Je3, Ge3, $e4, tn, en, nn, rn, sn, H3Event, an, lazyEventHandler, on, cn, un, Hookable, pn, ln, fn, dn, hn, gn, mn, xn, _n, bn, yn, jn, zn, Tn, wn, FetchError, vn, Cn, Sn, Rn, Zn, kn, Bn, Dn, En, Kn, Xn, An, In, Mn, Hn, Pn, Nn, Un, On, qn, Wn, Ln, Fn, Yn, Vn, memory, Qn, normalizeKey, Jn, Gn, $n, tr2, er2, k4, l3, nr, cachedEventHandler, rr2, sr, ar, ir, or, cr, ur, pr, lr, fr, dr, hr, gr, mr, xr, _r, br, yr, jr, _lazy_dLCGg7, zr, Tr, wr, vr, Cr;
var init_nitro = __esm({
  "../.output-cloudflare/server/chunks/nitro/nitro.mjs"() {
    init_modules_watch_stub();
    "global" in globalThis || (globalThis.global = globalThis);
    ReadStream = class {
      static {
        __name(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(t5) {
        this.fd = t5;
      }
      setRawMode(t5) {
        return this.isRaw = t5, this;
      }
    };
    WriteStream = class {
      static {
        __name(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(t5) {
        this.fd = t5;
      }
      clearLine(t5, e5) {
        return e5 && e5(), false;
      }
      clearScreenDown(t5) {
        return t5 && t5(), false;
      }
      cursorTo(t5, e5, r4) {
        return r4 && "function" == typeof r4 && r4(), false;
      }
      moveCursor(t5, e5, r4) {
        return r4 && r4(), false;
      }
      getColorDepth(t5) {
        return 1;
      }
      hasColors(t5, e5) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(t5, e5, r4) {
        t5 instanceof Uint8Array && (t5 = new TextDecoder().decode(t5));
        try {
          console.log(t5);
        } catch {
        }
        return r4 && "function" == typeof r4 && r4(), false;
      }
    };
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    u3 = "22.14.0";
    Process = class _Process extends r3 {
      static {
        __name(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(t5) {
        super(), this.env = t5.env, this.hrtime = t5.hrtime, this.nextTick = t5.nextTick;
        for (const t6 of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(r3.prototype)]) {
          const e5 = this[t6];
          "function" == typeof e5 && (this[t6] = e5.bind(this));
        }
      }
      emitWarning(t5, e5, r4) {
        console.warn(`${r4 ? `[${r4}] ` : ""}${e5 ? `${e5}: ` : ""}${t5}`);
      }
      emit(...t5) {
        return super.emit(...t5);
      }
      listeners(t5) {
        return super.listeners(t5);
      }
      #t;
      #e;
      #n;
      get stdin() {
        return this.#t ??= new ReadStream(0);
      }
      get stdout() {
        return this.#e ??= new WriteStream(1);
      }
      get stderr() {
        return this.#n ??= new WriteStream(2);
      }
      #r = "/";
      chdir(t5) {
        this.#r = t5;
      }
      cwd() {
        return this.#r;
      }
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return `v${u3}`;
      }
      get versions() {
        return { node: u3 };
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      ref() {
      }
      unref() {
      }
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      permission = { has: notImplemented("process.permission.has") };
      report = { directory: "", filename: "", signal: "SIGUSR2", compact: false, reportOnFatalError: false, reportOnSignal: false, reportOnUncaughtException: false, getReport: notImplemented("process.report.getReport"), writeReport: notImplemented("process.report.writeReport") };
      finalization = { register: notImplemented("process.finalization.register"), unregister: notImplemented("process.finalization.unregister"), registerBeforeExit: notImplemented("process.finalization.registerBeforeExit") };
      memoryUsage = Object.assign(() => ({ arrayBuffers: 0, rss: 0, external: 0, heapTotal: 0, heapUsed: 0 }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
      mainModule = void 0;
      domain = void 0;
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
    f3 = /* @__PURE__ */ Object.create(null);
    d4 = globalThis.process;
    _getEnv = /* @__PURE__ */ __name((t5) => globalThis.__env__ || d4?.env || (t5 ? f3 : globalThis), "_getEnv");
    h4 = new Proxy(f3, { get: /* @__PURE__ */ __name((t5, e5) => _getEnv()[e5] ?? f3[e5], "get"), has: /* @__PURE__ */ __name((t5, e5) => e5 in _getEnv() || e5 in f3, "has"), set: /* @__PURE__ */ __name((t5, e5, r4) => (_getEnv(true)[e5] = r4, true), "set"), deleteProperty: /* @__PURE__ */ __name((t5, e5) => (delete _getEnv(true)[e5], true), "deleteProperty"), ownKeys() {
      const t5 = _getEnv();
      return Object.keys(t5);
    }, getOwnPropertyDescriptor(t5, e5) {
      const r4 = _getEnv();
      if (e5 in r4) return { value: r4[e5], writable: true, enumerable: true, configurable: true };
    } });
    g3 = Object.assign(function(t5) {
      const e5 = Date.now(), r4 = Math.trunc(e5 / 1e3), s3 = e5 % 1e3 * 1e6;
      if (t5) {
        let e6 = r4 - t5[0], a4 = s3 - t5[0];
        return a4 < 0 && (e6 -= 1, a4 = 1e9 + a4), [e6, a4];
      }
      return [r4, s3];
    }, { bigint: /* @__PURE__ */ __name(function() {
      return BigInt(1e6 * Date.now());
    }, "bigint") });
    globalThis.__env__ = e4;
    m2 = new Process({ env: h4, hrtime: g3, nextTick: t4.nextTick });
    for (const e5 of ["exit", "getBuiltinModule", "platform"]) e5 in t4 && (m2[e5] = t4[e5]);
    t4.features && Object.defineProperty(m2, "features", { get: /* @__PURE__ */ __name(() => t4.features, "get") });
    ({ abort: x4, addListener: _4, allowedNodeEnvironmentFlags: j4, hasUncaughtExceptionCaptureCallback: z4, setUncaughtExceptionCaptureCallback: T4, loadEnvFile: C4, sourceMapsEnabled: S4, arch: R4, argv: Z4, argv0: B4, chdir: D4, config: E4, connected: K4, constrainedMemory: X4, availableMemory: I4, cpuUsage: M4, cwd: H4, debugPort: P4, dlopen: N4, disconnect: U4, emit: O4, emitWarning: q4, env: W4, eventNames: L4, execArgv: F4, execPath: Y4, exit: V4, finalization: Q4, features: J4, getBuiltinModule: G4, getActiveResourcesInfo: $4, getMaxListeners: tt2, hrtime: et2, kill: nt2, listeners: rt2, listenerCount: st2, memoryUsage: at2, nextTick: it2, on: ot2, off: ct2, once: ut2, pid: pt2, platform: lt2, ppid: ft2, prependListener: dt2, prependOnceListener: ht2, rawListeners: gt2, release: mt2, removeAllListeners: xt2, removeListener: _t2, report: bt2, resourceUsage: yt2, setMaxListeners: jt2, setSourceMapsEnabled: zt2, stderr: Tt2, stdin: wt2, stdout: vt2, title: Ct2, umask: St2, uptime: Rt2, version: Zt2, versions: kt2, domain: Bt2, initgroups: Dt2, moduleLoadList: Et2, reallyExit: Kt2, openStdin: Xt2, assert: At2, binding: It2, send: Mt2, exitCode: Ht2, channel: Pt2, getegid: Nt2, geteuid: Ut2, getgid: Ot2, getgroups: qt2, getuid: Wt2, setegid: Lt2, seteuid: Ft2, setgid: Yt2, setgroups: Vt2, setuid: Qt2, permission: Jt2, mainModule: Gt2, _events: $t2, _eventsCount: te4, _exiting: ee4, _maxListeners: ne4, _debugEnd: re4, _debugProcess: se4, _fatalException: ae4, _getActiveHandles: ie4, _getActiveRequests: oe4, _kill: ce4, _preload_modules: ue4, _rawDebug: pe4, _startProfilerIdleNotifier: le4, _stopProfilerIdleNotifier: fe4, _tickCallback: de4, _disconnect: he4, _handleQueue: ge4, _pendingMessage: me4, _channel: xe3, _send: _e4, _linkedBinding: be4 } = m2);
    ye4 = globalThis.process;
    globalThis.process = ye4 ? new Proxy(ye4, { get: /* @__PURE__ */ __name((t5, e5, r4) => Reflect.has(t5, e5) ? Reflect.get(t5, e5, r4) : Reflect.get(m2, e5, r4), "get") }) : m2, globalThis.Buffer || (globalThis.Buffer = s2), globalThis.setImmediate || (globalThis.setImmediate = a3), globalThis.clearImmediate || (globalThis.clearImmediate = c3);
    je3 = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
    ze3 = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
    Te4 = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
    __name(jsonParseTransform, "jsonParseTransform");
    __name(destr, "destr");
    we4 = /#/g;
    ve4 = /&/g;
    Ce3 = /\//g;
    Se3 = /=/g;
    Re3 = /\?/g;
    Ze3 = /\+/g;
    ke4 = /%5e/gi;
    Be3 = /%60/gi;
    De3 = /%7c/gi;
    Ee3 = /%20/gi;
    Ke3 = /%2f/gi;
    Xe3 = /%252f/gi;
    __name(encode$2, "encode$2");
    __name(encodeQueryValue$2, "encodeQueryValue$2");
    __name(encodeQueryKey$2, "encodeQueryKey$2");
    __name(encodePath, "encodePath");
    __name(decode$2, "decode$2");
    __name(decodePath, "decodePath");
    __name(decodeQueryKey$2, "decodeQueryKey$2");
    __name(decodeQueryValue$2, "decodeQueryValue$2");
    __name(parseQuery$2, "parseQuery$2");
    __name(stringifyQuery$2, "stringifyQuery$2");
    Ae4 = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
    Ie3 = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
    Me3 = /^([/\\]\s*){2,}[^/\\]/;
    He3 = /^\.?\//;
    __name(hasProtocol$2, "hasProtocol$2");
    __name(withoutTrailingSlash$2, "withoutTrailingSlash$2");
    __name(withTrailingSlash$2, "withTrailingSlash$2");
    __name(withQuery$2, "withQuery$2");
    __name(joinURL$2, "joinURL$2");
    __name(joinRelativeURL, "joinRelativeURL");
    Pe3 = /* @__PURE__ */ Symbol.for("ufo:protocolRelative");
    __name(parseURL$2, "parseURL$2");
    __name(parsePath$2, "parsePath$2");
    Ne3 = 0;
    Ue3 = 1;
    Oe3 = 2;
    __name(createRouter$1, "createRouter$1");
    __name(insert, "insert");
    __name(createRadixNode, "createRadixNode");
    __name(getNodeType, "getNodeType");
    __name(toRouteMatcher, "toRouteMatcher");
    __name(_matchRoutes, "_matchRoutes");
    __name(_sortRoutesMap, "_sortRoutesMap");
    __name(_routerNodeToTable, "_routerNodeToTable");
    __name(o4, "o");
    i3 = class _i extends r3 {
      static {
        __name(this, "i");
      }
      __unenv__ = {};
      readableEncoding = null;
      readableEnded = true;
      readableFlowing = false;
      readableHighWaterMark = 0;
      readableLength = 0;
      readableObjectMode = false;
      readableAborted = false;
      readableDidRead = false;
      closed = false;
      errored = null;
      readable = false;
      destroyed = false;
      static from(t5, e5) {
        return new _i(e5);
      }
      constructor(t5) {
        super();
      }
      _read(t5) {
      }
      read(t5) {
      }
      setEncoding(t5) {
        return this;
      }
      pause() {
        return this;
      }
      resume() {
        return this;
      }
      isPaused() {
        return true;
      }
      unpipe(t5) {
        return this;
      }
      unshift(t5, e5) {
      }
      wrap(t5) {
        return this;
      }
      push(t5, e5) {
        return false;
      }
      _destroy(t5, e5) {
        this.removeAllListeners();
      }
      destroy(t5) {
        return this.destroyed = true, this._destroy(t5), this;
      }
      pipe(t5, e5) {
        return {};
      }
      compose(t5, e5) {
        throw new Error("Method not implemented.");
      }
      [Symbol.asyncDispose]() {
        return this.destroy(), Promise.resolve();
      }
      async *[Symbol.asyncIterator]() {
        throw o4("Readable.asyncIterator");
      }
      iterator(t5) {
        throw o4("Readable.iterator");
      }
      map(t5, e5) {
        throw o4("Readable.map");
      }
      filter(t5, e5) {
        throw o4("Readable.filter");
      }
      forEach(t5, e5) {
        throw o4("Readable.forEach");
      }
      reduce(t5, e5, r4) {
        throw o4("Readable.reduce");
      }
      find(t5, e5) {
        throw o4("Readable.find");
      }
      findIndex(t5, e5) {
        throw o4("Readable.findIndex");
      }
      some(t5, e5) {
        throw o4("Readable.some");
      }
      toArray(t5) {
        throw o4("Readable.toArray");
      }
      every(t5, e5) {
        throw o4("Readable.every");
      }
      flatMap(t5, e5) {
        throw o4("Readable.flatMap");
      }
      drop(t5, e5) {
        throw o4("Readable.drop");
      }
      take(t5, e5) {
        throw o4("Readable.take");
      }
      asIndexedPairs(t5) {
        throw o4("Readable.asIndexedPairs");
      }
    };
    qe3 = class extends r3 {
      static {
        __name(this, "qe");
      }
      __unenv__ = {};
      writable = true;
      writableEnded = false;
      writableFinished = false;
      writableHighWaterMark = 0;
      writableLength = 0;
      writableObjectMode = false;
      writableCorked = 0;
      closed = false;
      errored = null;
      writableNeedDrain = false;
      writableAborted = false;
      destroyed = false;
      _data;
      _encoding = "utf8";
      constructor(t5) {
        super();
      }
      pipe(t5, e5) {
        return {};
      }
      _write(t5, e5, r4) {
        if (this.writableEnded) r4 && r4();
        else {
          if (void 0 === this._data) this._data = t5;
          else {
            const r5 = "string" == typeof this._data ? s2.from(this._data, this._encoding || e5 || "utf8") : this._data, a4 = "string" == typeof t5 ? s2.from(t5, e5 || this._encoding || "utf8") : t5;
            this._data = s2.concat([r5, a4]);
          }
          this._encoding = e5, r4 && r4();
        }
      }
      _writev(t5, e5) {
      }
      _destroy(t5, e5) {
      }
      _final(t5) {
      }
      write(t5, e5, r4) {
        const s3 = "string" == typeof e5 ? this._encoding : "utf8", a4 = "function" == typeof e5 ? e5 : "function" == typeof r4 ? r4 : void 0;
        return this._write(t5, s3, a4), true;
      }
      setDefaultEncoding(t5) {
        return this;
      }
      end(t5, e5, r4) {
        const s3 = "function" == typeof t5 ? t5 : "function" == typeof e5 ? e5 : "function" == typeof r4 ? r4 : void 0;
        if (this.writableEnded) return s3 && s3(), this;
        const a4 = t5 === s3 ? void 0 : t5;
        if (a4) {
          const t6 = e5 === s3 ? void 0 : e5;
          this.write(a4, t6, s3);
        }
        return this.writableEnded = true, this.writableFinished = true, this.emit("close"), this.emit("finish"), this;
      }
      cork() {
      }
      uncork() {
      }
      destroy(t5) {
        return this.destroyed = true, delete this._data, this.removeAllListeners(), this;
      }
      compose(t5, e5) {
        throw new Error("Method not implemented.");
      }
      [Symbol.asyncDispose]() {
        return Promise.resolve();
      }
    };
    We3 = class {
      static {
        __name(this, "We");
      }
      allowHalfOpen = true;
      _destroy;
      constructor(t5 = new i3(), e5 = new qe3()) {
        Object.assign(this, t5), Object.assign(this, e5), this._destroy = /* @__PURE__ */ (function(...t6) {
          return function(...e6) {
            for (const r4 of t6) r4(...e6);
          };
        })(t5._destroy, e5._destroy);
      }
    };
    Le3 = (Object.assign(We3.prototype, i3.prototype), Object.assign(We3.prototype, qe3.prototype), We3);
    A4 = class extends Le3 {
      static {
        __name(this, "A");
      }
      __unenv__ = {};
      bufferSize = 0;
      bytesRead = 0;
      bytesWritten = 0;
      connecting = false;
      destroyed = false;
      pending = false;
      localAddress = "";
      localPort = 0;
      remoteAddress = "";
      remoteFamily = "";
      remotePort = 0;
      autoSelectFamilyAttemptedAddresses = [];
      readyState = "readOnly";
      constructor(t5) {
        super();
      }
      write(t5, e5, r4) {
        return false;
      }
      connect(t5, e5, r4) {
        return this;
      }
      end(t5, e5, r4) {
        return this;
      }
      setEncoding(t5) {
        return this;
      }
      pause() {
        return this;
      }
      resume() {
        return this;
      }
      setTimeout(t5, e5) {
        return this;
      }
      setNoDelay(t5) {
        return this;
      }
      setKeepAlive(t5, e5) {
        return this;
      }
      address() {
        return {};
      }
      unref() {
        return this;
      }
      ref() {
        return this;
      }
      destroySoon() {
        this.destroy();
      }
      resetAndDestroy() {
        const t5 = new Error("ERR_SOCKET_CLOSED");
        return t5.code = "ERR_SOCKET_CLOSED", this.destroy(t5), this;
      }
    };
    y4 = class extends i3 {
      static {
        __name(this, "y");
      }
      aborted = false;
      httpVersion = "1.1";
      httpVersionMajor = 1;
      httpVersionMinor = 1;
      complete = true;
      connection;
      socket;
      headers = {};
      trailers = {};
      method = "GET";
      url = "/";
      statusCode = 200;
      statusMessage = "";
      closed = false;
      errored = null;
      readable = false;
      constructor(t5) {
        super(), this.socket = this.connection = t5 || new A4();
      }
      get rawHeaders() {
        const t5 = this.headers, e5 = [];
        for (const r4 in t5) if (Array.isArray(t5[r4])) for (const s3 of t5[r4]) e5.push(r4, s3);
        else e5.push(r4, t5[r4]);
        return e5;
      }
      get rawTrailers() {
        return [];
      }
      setTimeout(t5, e5) {
        return this;
      }
      get headersDistinct() {
        return p3(this.headers);
      }
      get trailersDistinct() {
        return p3(this.trailers);
      }
    };
    __name(p3, "p");
    w4 = class extends qe3 {
      static {
        __name(this, "w");
      }
      statusCode = 200;
      statusMessage = "";
      upgrading = false;
      chunkedEncoding = false;
      shouldKeepAlive = false;
      useChunkedEncodingByDefault = false;
      sendDate = false;
      finished = false;
      headersSent = false;
      strictContentLength = false;
      connection = null;
      socket = null;
      req;
      _headers = {};
      constructor(t5) {
        super(), this.req = t5;
      }
      assignSocket(t5) {
        t5._httpMessage = this, this.socket = t5, this.connection = t5, this.emit("socket", t5), this._flush();
      }
      _flush() {
        this.flushHeaders();
      }
      detachSocket(t5) {
      }
      writeContinue(t5) {
      }
      writeHead(t5, e5, r4) {
        t5 && (this.statusCode = t5), "string" == typeof e5 && (this.statusMessage = e5, e5 = void 0);
        const s3 = r4 || e5;
        if (s3 && !Array.isArray(s3)) for (const t6 in s3) this.setHeader(t6, s3[t6]);
        return this.headersSent = true, this;
      }
      writeProcessing() {
      }
      setTimeout(t5, e5) {
        return this;
      }
      appendHeader(t5, e5) {
        t5 = t5.toLowerCase();
        const r4 = this._headers[t5], s3 = [...Array.isArray(r4) ? r4 : [r4], ...Array.isArray(e5) ? e5 : [e5]].filter(Boolean);
        return this._headers[t5] = s3.length > 1 ? s3 : s3[0], this;
      }
      setHeader(t5, e5) {
        return this._headers[t5.toLowerCase()] = e5, this;
      }
      setHeaders(t5) {
        for (const [e5, r4] of Object.entries(t5)) this.setHeader(e5, r4);
        return this;
      }
      getHeader(t5) {
        return this._headers[t5.toLowerCase()];
      }
      getHeaders() {
        return this._headers;
      }
      getHeaderNames() {
        return Object.keys(this._headers);
      }
      hasHeader(t5) {
        return t5.toLowerCase() in this._headers;
      }
      removeHeader(t5) {
        delete this._headers[t5.toLowerCase()];
      }
      addTrailers(t5) {
      }
      flushHeaders() {
      }
      writeEarlyHints(t5, e5) {
        "function" == typeof e5 && e5();
      }
    };
    Fe3 = (() => {
      const n3 = /* @__PURE__ */ __name(function() {
      }, "n");
      return n3.prototype = /* @__PURE__ */ Object.create(null), n3;
    })();
    __name(v4, "v");
    Ye3 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
    __name(b4, "b");
    __name(hasProp, "hasProp");
    H3Error = class extends Error {
      static {
        __name(this, "H3Error");
      }
      static __h3_error__ = true;
      statusCode = 500;
      fatal = false;
      unhandled = false;
      statusMessage;
      data;
      cause;
      constructor(t5, e5 = {}) {
        super(t5, e5), e5.cause && !this.cause && (this.cause = e5.cause);
      }
      toJSON() {
        const t5 = { message: this.message, statusCode: sanitizeStatusCode(this.statusCode, 500) };
        return this.statusMessage && (t5.statusMessage = sanitizeStatusMessage(this.statusMessage)), void 0 !== this.data && (t5.data = this.data), t5;
      }
    };
    __name(createError, "createError");
    __name(isError, "isError");
    __name(getQuery$1, "getQuery$1");
    __name(getRequestHeaders, "getRequestHeaders");
    __name(getRequestHeader, "getRequestHeader");
    Ve2 = getRequestHeader;
    Qe3 = /* @__PURE__ */ Symbol.for("h3RawBody");
    Je3 = ["PATCH", "POST", "PUT", "DELETE"];
    __name(readRawBody, "readRawBody");
    __name(getRequestWebStream, "getRequestWebStream");
    __name(handleCacheHeaders, "handleCacheHeaders");
    Ge3 = { html: "text/html", json: "application/json" };
    $e4 = /[^\u0009\u0020-\u007E]/g;
    __name(sanitizeStatusMessage, "sanitizeStatusMessage");
    __name(sanitizeStatusCode, "sanitizeStatusCode");
    __name(splitCookiesString, "splitCookiesString");
    tn = void 0 === a3 ? (t5) => t5() : a3;
    __name(send, "send");
    __name(setResponseStatus, "setResponseStatus");
    __name(getResponseStatus, "getResponseStatus");
    __name(getResponseStatusText, "getResponseStatusText");
    __name(setResponseHeaders, "setResponseHeaders");
    en = setResponseHeaders;
    __name(setResponseHeader, "setResponseHeader");
    nn = setResponseHeader;
    __name(appendResponseHeader, "appendResponseHeader");
    __name(sendStream, "sendStream");
    __name(sendWebResponse, "sendWebResponse");
    rn = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
    sn = /* @__PURE__ */ new Set(["transfer-encoding", "accept-encoding", "connection", "keep-alive", "upgrade", "expect", "host", "accept"]);
    __name(proxyRequest, "proxyRequest");
    __name(getProxyRequestHeaders, "getProxyRequestHeaders");
    __name(fetchWithEvent, "fetchWithEvent");
    __name(_getFetch, "_getFetch");
    __name(rewriteCookieProperty, "rewriteCookieProperty");
    H3Event = class {
      static {
        __name(this, "H3Event");
      }
      __is_event__ = true;
      node;
      web;
      context = {};
      _method;
      _path;
      _headers;
      _requestBody;
      _handled = false;
      _onBeforeResponseCalled;
      _onAfterResponseCalled;
      constructor(t5, e5) {
        this.node = { req: t5, res: e5 };
      }
      get method() {
        return this._method || (this._method = (this.node.req.method || "GET").toUpperCase()), this._method;
      }
      get path() {
        return this._path || this.node.req.url || "/";
      }
      get headers() {
        return this._headers || (this._headers = (function(t5) {
          const e5 = new Headers();
          for (const [r4, s3] of Object.entries(t5)) if (Array.isArray(s3)) for (const t6 of s3) e5.append(r4, t6);
          else s3 && e5.set(r4, s3);
          return e5;
        })(this.node.req.headers)), this._headers;
      }
      get handled() {
        return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
      }
      respondWith(t5) {
        return Promise.resolve(t5).then((t6) => sendWebResponse(this, t6));
      }
      toString() {
        return `[${this.method}] ${this.path}`;
      }
      toJSON() {
        return this.toString();
      }
      get req() {
        return this.node.req;
      }
      get res() {
        return this.node.res;
      }
    };
    __name(isEvent, "isEvent");
    __name(createEvent, "createEvent");
    __name(defineEventHandler, "defineEventHandler");
    __name(_normalizeArray, "_normalizeArray");
    an = defineEventHandler;
    __name(toEventHandler, "toEventHandler");
    lazyEventHandler = /* @__PURE__ */ __name(function(t5) {
      let e5, r4;
      const resolveHandler = /* @__PURE__ */ __name(() => r4 ? Promise.resolve(r4) : (e5 || (e5 = Promise.resolve(t5()).then((t6) => {
        const e6 = t6.default || t6;
        if ("function" != typeof e6) throw new TypeError("Invalid lazy handler result. It should be a function:", e6);
        return r4 = { handler: toEventHandler(t6.default || t6) }, r4;
      })), e5), "resolveHandler"), s3 = an((t6) => r4 ? r4.handler(t6) : resolveHandler().then((e6) => e6.handler(t6)));
      return s3.__resolve__ = resolveHandler, s3;
    }, "lazyEventHandler");
    __name(createApp, "createApp");
    __name(use, "use");
    __name(normalizeLayer, "normalizeLayer");
    __name(handleHandlerResponse, "handleHandlerResponse");
    on = ["connect", "delete", "get", "head", "options", "post", "put", "trace", "patch"];
    __name(toNodeListener, "toNodeListener");
    __name(flatHooks, "flatHooks");
    cn = { run: /* @__PURE__ */ __name((t5) => t5(), "run") };
    un = void 0 !== console.createTask ? console.createTask : () => cn;
    __name(serialTaskCaller, "serialTaskCaller");
    __name(parallelTaskCaller, "parallelTaskCaller");
    __name(callEachWith, "callEachWith");
    Hookable = class {
      static {
        __name(this, "Hookable");
      }
      constructor() {
        this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
      }
      hook(t5, e5, r4 = {}) {
        if (!t5 || "function" != typeof e5) return () => {
        };
        const s3 = t5;
        let a4;
        for (; this._deprecatedHooks[t5]; ) a4 = this._deprecatedHooks[t5], t5 = a4.to;
        if (a4 && !r4.allowDeprecated) {
          let t6 = a4.message;
          t6 || (t6 = `${s3} hook has been deprecated` + (a4.to ? `, please use ${a4.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(t6) || (console.warn(t6), this._deprecatedMessages.add(t6));
        }
        if (!e5.name) try {
          Object.defineProperty(e5, "name", { get: /* @__PURE__ */ __name(() => "_" + t5.replace(/\W+/g, "_") + "_hook_cb", "get"), configurable: true });
        } catch {
        }
        return this._hooks[t5] = this._hooks[t5] || [], this._hooks[t5].push(e5), () => {
          e5 && (this.removeHook(t5, e5), e5 = void 0);
        };
      }
      hookOnce(t5, e5) {
        let r4, _function = /* @__PURE__ */ __name((...t6) => ("function" == typeof r4 && r4(), r4 = void 0, _function = void 0, e5(...t6)), "_function");
        return r4 = this.hook(t5, _function), r4;
      }
      removeHook(t5, e5) {
        if (this._hooks[t5]) {
          const r4 = this._hooks[t5].indexOf(e5);
          -1 !== r4 && this._hooks[t5].splice(r4, 1), 0 === this._hooks[t5].length && delete this._hooks[t5];
        }
      }
      deprecateHook(t5, e5) {
        this._deprecatedHooks[t5] = "string" == typeof e5 ? { to: e5 } : e5;
        const r4 = this._hooks[t5] || [];
        delete this._hooks[t5];
        for (const e6 of r4) this.hook(t5, e6);
      }
      deprecateHooks(t5) {
        Object.assign(this._deprecatedHooks, t5);
        for (const e5 in t5) this.deprecateHook(e5, t5[e5]);
      }
      addHooks(t5) {
        const e5 = flatHooks(t5), r4 = Object.keys(e5).map((t6) => this.hook(t6, e5[t6]));
        return () => {
          for (const t6 of r4.splice(0, r4.length)) t6();
        };
      }
      removeHooks(t5) {
        const e5 = flatHooks(t5);
        for (const t6 in e5) this.removeHook(t6, e5[t6]);
      }
      removeAllHooks() {
        for (const t5 in this._hooks) delete this._hooks[t5];
      }
      callHook(t5, ...e5) {
        return e5.unshift(t5), this.callHookWith(serialTaskCaller, t5, ...e5);
      }
      callHookParallel(t5, ...e5) {
        return e5.unshift(t5), this.callHookWith(parallelTaskCaller, t5, ...e5);
      }
      callHookWith(t5, e5, ...r4) {
        const s3 = this._before || this._after ? { name: e5, args: r4, context: {} } : void 0;
        this._before && callEachWith(this._before, s3);
        const a4 = t5(e5 in this._hooks ? [...this._hooks[e5]] : [], r4);
        return a4 instanceof Promise ? a4.finally(() => {
          this._after && s3 && callEachWith(this._after, s3);
        }) : (this._after && s3 && callEachWith(this._after, s3), a4);
      }
      beforeEach(t5) {
        return this._before = this._before || [], this._before.push(t5), () => {
          if (void 0 !== this._before) {
            const e5 = this._before.indexOf(t5);
            -1 !== e5 && this._before.splice(e5, 1);
          }
        };
      }
      afterEach(t5) {
        return this._after = this._after || [], this._after.push(t5), () => {
          if (void 0 !== this._after) {
            const e5 = this._after.indexOf(t5);
            -1 !== e5 && this._after.splice(e5, 1);
          }
        };
      }
    };
    pn = globalThis;
    ln = /#/g;
    fn = /&/g;
    dn = /\//g;
    hn = /=/g;
    gn = /\+/g;
    mn = /%5e/gi;
    xn = /%60/gi;
    _n = /%7c/gi;
    bn = /%20/gi;
    __name(encodeQueryValue$1, "encodeQueryValue$1");
    __name(encodeQueryKey$1, "encodeQueryKey$1");
    __name(decode$1, "decode$1");
    __name(decodeQueryKey$1, "decodeQueryKey$1");
    __name(decodeQueryValue$1, "decodeQueryValue$1");
    __name(parseQuery$1, "parseQuery$1");
    __name(stringifyQuery$1, "stringifyQuery$1");
    yn = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
    jn = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
    zn = /^([/\\]\s*){2,}[^/\\]/;
    Tn = /^\.?\//;
    __name(hasProtocol$1, "hasProtocol$1");
    __name(withTrailingSlash$1, "withTrailingSlash$1");
    __name(withBase, "withBase");
    __name(withQuery$1, "withQuery$1");
    wn = /* @__PURE__ */ Symbol.for("ufo:protocolRelative");
    __name(parsePath$1, "parsePath$1");
    FetchError = class extends Error {
      static {
        __name(this, "FetchError");
      }
      constructor(t5, e5) {
        super(t5, e5), this.name = "FetchError", e5?.cause && !this.cause && (this.cause = e5.cause);
      }
    };
    vn = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
    __name(isPayloadMethod, "isPayloadMethod");
    Cn = /* @__PURE__ */ new Set(["image/svg", "application/xml", "application/xhtml", "application/html"]);
    Sn = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
    __name(resolveFetchOptions, "resolveFetchOptions");
    __name(callHooks2, "callHooks");
    Rn = /* @__PURE__ */ new Set([408, 409, 425, 429, 500, 502, 503, 504]);
    Zn = /* @__PURE__ */ new Set([101, 204, 205, 304]);
    __name(createFetch, "createFetch");
    kn = (function() {
      if ("undefined" != typeof globalThis) return globalThis;
      if ("undefined" != typeof self) return self;
      if (void 0 !== pn) return pn;
      throw new Error("unable to locate global object");
    })();
    Bn = kn.fetch ? (...t5) => kn.fetch(...t5) : () => Promise.reject(new Error("[ofetch] global.fetch is not supported!"));
    Dn = kn.Headers;
    En = kn.AbortController;
    createFetch({ fetch: Bn, Headers: Dn, AbortController: En });
    Kn = /#/g;
    Xn = /&/g;
    An = /\//g;
    In = /=/g;
    Mn = /\+/g;
    Hn = /%5e/gi;
    Pn = /%60/gi;
    Nn = /%7c/gi;
    Un = /%20/gi;
    __name(encodeQueryValue, "encodeQueryValue");
    __name(encodeQueryKey, "encodeQueryKey");
    __name(decode, "decode");
    __name(decodeQueryKey, "decodeQueryKey");
    __name(decodeQueryValue, "decodeQueryValue");
    __name(parseQuery, "parseQuery");
    __name(stringifyQuery, "stringifyQuery");
    On = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
    qn = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
    Wn = /^([/\\]\s*){2,}[^/\\]/;
    Ln = /^\.?\//;
    __name(withTrailingSlash, "withTrailingSlash");
    __name(withoutBase, "withoutBase");
    __name(withQuery, "withQuery");
    __name(getQuery, "getQuery");
    __name(joinURL, "joinURL");
    Fn = /* @__PURE__ */ Symbol.for("ufo:protocolRelative");
    __name(parseURL, "parseURL");
    __name(parsePath, "parsePath");
    __name(asyncCall, "asyncCall");
    __name(stringify2, "stringify");
    Yn = "base64:";
    __name(serializeRaw, "serializeRaw");
    __name(deserializeRaw, "deserializeRaw");
    Vn = ["has", "hasItem", "get", "getItem", "getItemRaw", "set", "setItem", "setItemRaw", "del", "remove", "removeItem", "getMeta", "setMeta", "removeMeta", "getKeys", "clear", "mount", "unmount"];
    __name(normalizeKey$1, "normalizeKey$1");
    __name(joinKeys, "joinKeys");
    __name(normalizeBaseKey, "normalizeBaseKey");
    memory = /* @__PURE__ */ __name(() => {
      const t5 = /* @__PURE__ */ new Map();
      return { name: "memory", getInstance: /* @__PURE__ */ __name(() => t5, "getInstance"), hasItem: /* @__PURE__ */ __name((e5) => t5.has(e5), "hasItem"), getItem: /* @__PURE__ */ __name((e5) => t5.get(e5) ?? null, "getItem"), getItemRaw: /* @__PURE__ */ __name((e5) => t5.get(e5) ?? null, "getItemRaw"), setItem(e5, r4) {
        t5.set(e5, r4);
      }, setItemRaw(e5, r4) {
        t5.set(e5, r4);
      }, removeItem(e5) {
        t5.delete(e5);
      }, getKeys: /* @__PURE__ */ __name(() => [...t5.keys()], "getKeys"), clear() {
        t5.clear();
      }, dispose() {
        t5.clear();
      } };
    }, "memory");
    __name(watch, "watch");
    __name(dispose, "dispose");
    Qn = {};
    normalizeKey = /* @__PURE__ */ __name(function(t5) {
      return t5 && t5.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
    }, "normalizeKey");
    Jn = { getKeys: /* @__PURE__ */ __name(() => Promise.resolve(Object.keys(Qn)), "getKeys"), hasItem: /* @__PURE__ */ __name((t5) => (t5 = normalizeKey(t5), Promise.resolve(t5 in Qn)), "hasItem"), getItem: /* @__PURE__ */ __name((t5) => (t5 = normalizeKey(t5), Promise.resolve(Qn[t5] ? Qn[t5].import() : null)), "getItem"), getMeta: /* @__PURE__ */ __name((t5) => (t5 = normalizeKey(t5), Promise.resolve(Qn[t5] ? Qn[t5].meta : {})), "getMeta") };
    Gn = (function(t5 = {}) {
      const e5 = { mounts: { "": t5.driver || memory() }, mountpoints: [""], watching: false, watchListeners: [], unwatch: {} }, getMount = /* @__PURE__ */ __name((t6) => {
        for (const r5 of e5.mountpoints) if (t6.startsWith(r5)) return { base: r5, relativeKey: t6.slice(r5.length), driver: e5.mounts[r5] };
        return { base: "", relativeKey: t6, driver: e5.mounts[""] };
      }, "getMount"), getMounts = /* @__PURE__ */ __name((t6, r5) => e5.mountpoints.filter((e6) => e6.startsWith(t6) || r5 && t6.startsWith(e6)).map((r6) => ({ relativeBase: t6.length > r6.length ? t6.slice(r6.length) : void 0, mountpoint: r6, driver: e5.mounts[r6] })), "getMounts"), onChange = /* @__PURE__ */ __name((t6, r5) => {
        if (e5.watching) {
          r5 = normalizeKey$1(r5);
          for (const s3 of e5.watchListeners) s3(t6, r5);
        }
      }, "onChange"), stopWatch = /* @__PURE__ */ __name(async () => {
        if (e5.watching) {
          for (const t6 in e5.unwatch) await e5.unwatch[t6]();
          e5.unwatch = {}, e5.watching = false;
        }
      }, "stopWatch"), runBatch = /* @__PURE__ */ __name((t6, e6, r5) => {
        const s3 = /* @__PURE__ */ new Map(), getBatch = /* @__PURE__ */ __name((t7) => {
          let e7 = s3.get(t7.base);
          return e7 || (e7 = { driver: t7.driver, base: t7.base, items: [] }, s3.set(t7.base, e7)), e7;
        }, "getBatch");
        for (const r6 of t6) {
          const t7 = "string" == typeof r6, s4 = normalizeKey$1(t7 ? r6 : r6.key), a4 = t7 ? void 0 : r6.value, c4 = t7 || !r6.options ? e6 : { ...e6, ...r6.options }, u4 = getMount(s4);
          getBatch(u4).items.push({ key: s4, value: a4, relativeKey: u4.relativeKey, options: c4 });
        }
        return Promise.all([...s3.values()].map((t7) => r5(t7))).then((t7) => t7.flat());
      }, "runBatch"), r4 = { hasItem(t6, e6 = {}) {
        t6 = normalizeKey$1(t6);
        const { relativeKey: r5, driver: s3 } = getMount(t6);
        return asyncCall(s3.hasItem, r5, e6);
      }, getItem(t6, e6 = {}) {
        t6 = normalizeKey$1(t6);
        const { relativeKey: r5, driver: s3 } = getMount(t6);
        return asyncCall(s3.getItem, r5, e6).then((t7) => destr(t7));
      }, getItems: /* @__PURE__ */ __name((t6, e6 = {}) => runBatch(t6, e6, (t7) => t7.driver.getItems ? asyncCall(t7.driver.getItems, t7.items.map((t8) => ({ key: t8.relativeKey, options: t8.options })), e6).then((e7) => e7.map((e8) => ({ key: joinKeys(t7.base, e8.key), value: destr(e8.value) }))) : Promise.all(t7.items.map((e7) => asyncCall(t7.driver.getItem, e7.relativeKey, e7.options).then((t8) => ({ key: e7.key, value: destr(t8) }))))), "getItems"), getItemRaw(t6, e6 = {}) {
        t6 = normalizeKey$1(t6);
        const { relativeKey: r5, driver: s3 } = getMount(t6);
        return s3.getItemRaw ? asyncCall(s3.getItemRaw, r5, e6) : asyncCall(s3.getItem, r5, e6).then((t7) => deserializeRaw(t7));
      }, async setItem(t6, e6, s3 = {}) {
        if (void 0 === e6) return r4.removeItem(t6);
        t6 = normalizeKey$1(t6);
        const { relativeKey: a4, driver: c4 } = getMount(t6);
        c4.setItem && (await asyncCall(c4.setItem, a4, stringify2(e6), s3), c4.watch || onChange("update", t6));
      }, async setItems(t6, e6) {
        await runBatch(t6, e6, async (t7) => {
          if (t7.driver.setItems) return asyncCall(t7.driver.setItems, t7.items.map((t8) => ({ key: t8.relativeKey, value: stringify2(t8.value), options: t8.options })), e6);
          t7.driver.setItem && await Promise.all(t7.items.map((e7) => asyncCall(t7.driver.setItem, e7.relativeKey, stringify2(e7.value), e7.options)));
        });
      }, async setItemRaw(t6, e6, s3 = {}) {
        if (void 0 === e6) return r4.removeItem(t6, s3);
        t6 = normalizeKey$1(t6);
        const { relativeKey: a4, driver: c4 } = getMount(t6);
        if (c4.setItemRaw) await asyncCall(c4.setItemRaw, a4, e6, s3);
        else {
          if (!c4.setItem) return;
          await asyncCall(c4.setItem, a4, serializeRaw(e6), s3);
        }
        c4.watch || onChange("update", t6);
      }, async removeItem(t6, e6 = {}) {
        "boolean" == typeof e6 && (e6 = { removeMeta: e6 }), t6 = normalizeKey$1(t6);
        const { relativeKey: r5, driver: s3 } = getMount(t6);
        s3.removeItem && (await asyncCall(s3.removeItem, r5, e6), (e6.removeMeta || e6.removeMata) && await asyncCall(s3.removeItem, r5 + "$", e6), s3.watch || onChange("remove", t6));
      }, async getMeta(t6, e6 = {}) {
        "boolean" == typeof e6 && (e6 = { nativeOnly: e6 }), t6 = normalizeKey$1(t6);
        const { relativeKey: r5, driver: s3 } = getMount(t6), a4 = /* @__PURE__ */ Object.create(null);
        if (s3.getMeta && Object.assign(a4, await asyncCall(s3.getMeta, r5, e6)), !e6.nativeOnly) {
          const t7 = await asyncCall(s3.getItem, r5 + "$", e6).then((t8) => destr(t8));
          t7 && "object" == typeof t7 && ("string" == typeof t7.atime && (t7.atime = new Date(t7.atime)), "string" == typeof t7.mtime && (t7.mtime = new Date(t7.mtime)), Object.assign(a4, t7));
        }
        return a4;
      }, setMeta(t6, e6, r5 = {}) {
        return this.setItem(t6 + "$", e6, r5);
      }, removeMeta(t6, e6 = {}) {
        return this.removeItem(t6 + "$", e6);
      }, async getKeys(t6, e6 = {}) {
        t6 = normalizeBaseKey(t6);
        const r5 = getMounts(t6, true);
        let s3 = [];
        const a4 = [];
        let c4 = true;
        for (const t7 of r5) {
          t7.driver.flags?.maxDepth || (c4 = false);
          const r6 = await asyncCall(t7.driver.getKeys, t7.relativeBase, e6);
          for (const e7 of r6) {
            const r7 = t7.mountpoint + normalizeKey$1(e7);
            s3.some((t8) => r7.startsWith(t8)) || a4.push(r7);
          }
          s3 = [t7.mountpoint, ...s3.filter((e7) => !e7.startsWith(t7.mountpoint))];
        }
        const u4 = void 0 !== e6.maxDepth && !c4;
        return a4.filter((r6) => (!u4 || (function(t7, e7) {
          if (void 0 === e7) return true;
          let r7 = 0, s4 = t7.indexOf(":");
          for (; s4 > -1; ) r7++, s4 = t7.indexOf(":", s4 + 1);
          return r7 <= e7;
        })(r6, e6.maxDepth)) && (function(t7, e7) {
          return e7 ? t7.startsWith(e7) && "$" !== t7[t7.length - 1] : "$" !== t7[t7.length - 1];
        })(r6, t6));
      }, async clear(t6, e6 = {}) {
        t6 = normalizeBaseKey(t6), await Promise.all(getMounts(t6, false).map(async (t7) => {
          if (t7.driver.clear) return asyncCall(t7.driver.clear, t7.relativeBase, e6);
          if (t7.driver.removeItem) {
            const r5 = await t7.driver.getKeys(t7.relativeBase || "", e6);
            return Promise.all(r5.map((r6) => t7.driver.removeItem(r6, e6)));
          }
        }));
      }, async dispose() {
        await Promise.all(Object.values(e5.mounts).map((t6) => dispose(t6)));
      }, watch: /* @__PURE__ */ __name(async (t6) => (await (async () => {
        if (!e5.watching) {
          e5.watching = true;
          for (const t7 in e5.mounts) e5.unwatch[t7] = await watch(e5.mounts[t7], onChange, t7);
        }
      })(), e5.watchListeners.push(t6), async () => {
        e5.watchListeners = e5.watchListeners.filter((e6) => e6 !== t6), 0 === e5.watchListeners.length && await stopWatch();
      }), "watch"), async unwatch() {
        e5.watchListeners = [], await stopWatch();
      }, mount(t6, s3) {
        if ((t6 = normalizeBaseKey(t6)) && e5.mounts[t6]) throw new Error(`already mounted at ${t6}`);
        return t6 && (e5.mountpoints.push(t6), e5.mountpoints.sort((t7, e6) => e6.length - t7.length)), e5.mounts[t6] = s3, e5.watching && Promise.resolve(watch(s3, onChange, t6)).then((r5) => {
          e5.unwatch[t6] = r5;
        }).catch(console.error), r4;
      }, async unmount(t6, r5 = true) {
        (t6 = normalizeBaseKey(t6)) && e5.mounts[t6] && (e5.watching && t6 in e5.unwatch && (e5.unwatch[t6]?.(), delete e5.unwatch[t6]), r5 && await dispose(e5.mounts[t6]), e5.mountpoints = e5.mountpoints.filter((e6) => e6 !== t6), delete e5.mounts[t6]);
      }, getMount(t6 = "") {
        t6 = normalizeKey$1(t6) + ":";
        const e6 = getMount(t6);
        return { driver: e6.driver, base: e6.base };
      }, getMounts(t6 = "", e6 = {}) {
        t6 = normalizeKey$1(t6);
        return getMounts(t6, e6.parents).map((t7) => ({ driver: t7.driver, base: t7.mountpoint }));
      }, keys: /* @__PURE__ */ __name((t6, e6 = {}) => r4.getKeys(t6, e6), "keys"), get: /* @__PURE__ */ __name((t6, e6 = {}) => r4.getItem(t6, e6), "get"), set: /* @__PURE__ */ __name((t6, e6, s3 = {}) => r4.setItem(t6, e6, s3), "set"), has: /* @__PURE__ */ __name((t6, e6 = {}) => r4.hasItem(t6, e6), "has"), del: /* @__PURE__ */ __name((t6, e6 = {}) => r4.removeItem(t6, e6), "del"), remove: /* @__PURE__ */ __name((t6, e6 = {}) => r4.removeItem(t6, e6), "remove") };
      return r4;
    })({});
    __name(useStorage, "useStorage");
    Gn.mount("/assets", Jn);
    $n = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225];
    tr2 = [1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998];
    er2 = [];
    k4 = class {
      static {
        __name(this, "k");
      }
      _data = new l3();
      _hash = new l3([...$n]);
      _nDataBytes = 0;
      _minBufferSize = 0;
      finalize(t5) {
        t5 && this._append(t5);
        const e5 = 8 * this._nDataBytes, r4 = 8 * this._data.sigBytes;
        return this._data.words[r4 >>> 5] |= 128 << 24 - r4 % 32, this._data.words[14 + (r4 + 64 >>> 9 << 4)] = Math.floor(e5 / 4294967296), this._data.words[15 + (r4 + 64 >>> 9 << 4)] = e5, this._data.sigBytes = 4 * this._data.words.length, this._process(), this._hash;
      }
      _doProcessBlock(t5, e5) {
        const r4 = this._hash.words;
        let s3 = r4[0], a4 = r4[1], c4 = r4[2], u4 = r4[3], f4 = r4[4], d5 = r4[5], h5 = r4[6], g4 = r4[7];
        for (let r5 = 0; r5 < 64; r5++) {
          if (r5 < 16) er2[r5] = 0 | t5[e5 + r5];
          else {
            const t6 = er2[r5 - 15], e6 = (t6 << 25 | t6 >>> 7) ^ (t6 << 14 | t6 >>> 18) ^ t6 >>> 3, s4 = er2[r5 - 2], a5 = (s4 << 15 | s4 >>> 17) ^ (s4 << 13 | s4 >>> 19) ^ s4 >>> 10;
            er2[r5] = e6 + er2[r5 - 7] + a5 + er2[r5 - 16];
          }
          const m5 = s3 & a4 ^ s3 & c4 ^ a4 & c4, x5 = (s3 << 30 | s3 >>> 2) ^ (s3 << 19 | s3 >>> 13) ^ (s3 << 10 | s3 >>> 22), _5 = g4 + ((f4 << 26 | f4 >>> 6) ^ (f4 << 21 | f4 >>> 11) ^ (f4 << 7 | f4 >>> 25)) + (f4 & d5 ^ ~f4 & h5) + tr2[r5] + er2[r5];
          g4 = h5, h5 = d5, d5 = f4, f4 = u4 + _5 | 0, u4 = c4, c4 = a4, a4 = s3, s3 = _5 + (x5 + m5) | 0;
        }
        r4[0] = r4[0] + s3 | 0, r4[1] = r4[1] + a4 | 0, r4[2] = r4[2] + c4 | 0, r4[3] = r4[3] + u4 | 0, r4[4] = r4[4] + f4 | 0, r4[5] = r4[5] + d5 | 0, r4[6] = r4[6] + h5 | 0, r4[7] = r4[7] + g4 | 0;
      }
      _append(t5) {
        "string" == typeof t5 && (t5 = l3.fromUtf8(t5)), this._data.concat(t5), this._nDataBytes += t5.sigBytes;
      }
      _process(t5) {
        let e5, r4 = this._data.sigBytes / 64;
        r4 = t5 ? Math.ceil(r4) : Math.max((0 | r4) - this._minBufferSize, 0);
        const s3 = 16 * r4, a4 = Math.min(4 * s3, this._data.sigBytes);
        if (s3) {
          for (let t6 = 0; t6 < s3; t6 += 16) this._doProcessBlock(this._data.words, t6);
          e5 = this._data.words.splice(0, s3), this._data.sigBytes -= a4;
        }
        return new l3(e5, a4);
      }
    };
    l3 = class _l {
      static {
        __name(this, "l");
      }
      words;
      sigBytes;
      constructor(t5, e5) {
        t5 = this.words = t5 || [], this.sigBytes = void 0 === e5 ? 4 * t5.length : e5;
      }
      static fromUtf8(t5) {
        const e5 = unescape(encodeURIComponent(t5)), r4 = e5.length, s3 = [];
        for (let t6 = 0; t6 < r4; t6++) s3[t6 >>> 2] |= (255 & e5.charCodeAt(t6)) << 24 - t6 % 4 * 8;
        return new _l(s3, r4);
      }
      toBase64() {
        const t5 = [];
        for (let e5 = 0; e5 < this.sigBytes; e5 += 3) {
          const r4 = (this.words[e5 >>> 2] >>> 24 - e5 % 4 * 8 & 255) << 16 | (this.words[e5 + 1 >>> 2] >>> 24 - (e5 + 1) % 4 * 8 & 255) << 8 | this.words[e5 + 2 >>> 2] >>> 24 - (e5 + 2) % 4 * 8 & 255;
          for (let s3 = 0; s3 < 4 && 8 * e5 + 6 * s3 < 8 * this.sigBytes; s3++) t5.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(r4 >>> 6 * (3 - s3) & 63));
        }
        return t5.join("");
      }
      concat(t5) {
        if (this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8, this.words.length = Math.ceil(this.sigBytes / 4), this.sigBytes % 4) for (let e5 = 0; e5 < t5.sigBytes; e5++) {
          const r4 = t5.words[e5 >>> 2] >>> 24 - e5 % 4 * 8 & 255;
          this.words[this.sigBytes + e5 >>> 2] |= r4 << 24 - (this.sigBytes + e5) % 4 * 8;
        }
        else for (let e5 = 0; e5 < t5.sigBytes; e5 += 4) this.words[this.sigBytes + e5 >>> 2] = t5.words[e5 >>> 2];
        this.sigBytes += t5.sigBytes;
      }
    };
    nr = (() => {
      class Hasher2 {
        static {
          __name(this, "Hasher2");
        }
        buff = "";
        #s = /* @__PURE__ */ new Map();
        write(t5) {
          this.buff += t5;
        }
        dispatch(t5) {
          return this[null === t5 ? "null" : typeof t5](t5);
        }
        object(t5) {
          if (t5 && "function" == typeof t5.toJSON) return this.object(t5.toJSON());
          const e5 = Object.prototype.toString.call(t5);
          let r4 = "";
          const a4 = e5.length;
          r4 = a4 < 10 ? "unknown:[" + e5 + "]" : e5.slice(8, a4 - 1), r4 = r4.toLowerCase();
          let c4 = null;
          if (void 0 !== (c4 = this.#s.get(t5))) return this.dispatch("[CIRCULAR:" + c4 + "]");
          if (this.#s.set(t5, this.#s.size), void 0 !== s2 && s2.isBuffer && s2.isBuffer(t5)) return this.write("buffer:"), this.write(t5.toString("utf8"));
          if ("object" !== r4 && "function" !== r4 && "asyncfunction" !== r4) this[r4] ? this[r4](t5) : this.unknown(t5, r4);
          else {
            const e6 = Object.keys(t5).sort(), r5 = [];
            this.write("object:" + (e6.length + r5.length) + ":");
            const dispatchForKey = /* @__PURE__ */ __name((e7) => {
              this.dispatch(e7), this.write(":"), this.dispatch(t5[e7]), this.write(",");
            }, "dispatchForKey");
            for (const t6 of e6) dispatchForKey(t6);
            for (const t6 of r5) dispatchForKey(t6);
          }
        }
        array(t5, e5) {
          if (e5 = void 0 !== e5 && e5, this.write("array:" + t5.length + ":"), !e5 || t5.length <= 1) {
            for (const e6 of t5) this.dispatch(e6);
            return;
          }
          const r4 = /* @__PURE__ */ new Map(), s3 = t5.map((t6) => {
            const e6 = new Hasher2();
            e6.dispatch(t6);
            for (const [t7, s4] of e6.#s) r4.set(t7, s4);
            return e6.toString();
          });
          return this.#s = r4, s3.sort(), this.array(s3, false);
        }
        date(t5) {
          return this.write("date:" + t5.toJSON());
        }
        symbol(t5) {
          return this.write("symbol:" + t5.toString());
        }
        unknown(t5, e5) {
          if (this.write(e5), t5) return this.write(":"), t5 && "function" == typeof t5.entries ? this.array([...t5.entries()], true) : void 0;
        }
        error(t5) {
          return this.write("error:" + t5.toString());
        }
        boolean(t5) {
          return this.write("bool:" + t5);
        }
        string(t5) {
          this.write("string:" + t5.length + ":"), this.write(t5);
        }
        function(t5) {
          this.write("fn:"), !(function(t6) {
            if ("function" != typeof t6) return false;
            return "[native code] }" === Function.prototype.toString.call(t6).slice(-15);
          })(t5) ? this.dispatch(t5.toString()) : this.dispatch("[native]");
        }
        number(t5) {
          return this.write("number:" + t5);
        }
        null() {
          return this.write("Null");
        }
        undefined() {
          return this.write("Undefined");
        }
        regexp(t5) {
          return this.write("regex:" + t5.toString());
        }
        arraybuffer(t5) {
          return this.write("arraybuffer:"), this.dispatch(new Uint8Array(t5));
        }
        url(t5) {
          return this.write("url:" + t5.toString());
        }
        map(t5) {
          this.write("map:");
          const e5 = [...t5];
          return this.array(e5, false);
        }
        set(t5) {
          this.write("set:");
          const e5 = [...t5];
          return this.array(e5, false);
        }
        bigint(t5) {
          return this.write("bigint:" + t5.toString());
        }
      }
      for (const t5 of ["uint8array", "uint8clampedarray", "unt8array", "uint16array", "unt16array", "uint32array", "unt32array", "float32array", "float64array"]) Hasher2.prototype[t5] = function(e5) {
        return this.write(t5 + ":"), this.array([...e5], false);
      };
      return Hasher2;
    })();
    __name(hash, "hash");
    __name(defineCachedFunction, "defineCachedFunction");
    __name(getKey, "getKey");
    __name(escapeKey, "escapeKey");
    __name(cloneWithProxy, "cloneWithProxy");
    cachedEventHandler = /* @__PURE__ */ __name(function(t5, e5 = { name: "_", base: "/cache", swr: true, maxAge: 1 }) {
      const r4 = (e5.varies || []).filter(Boolean).map((t6) => t6.toLowerCase()).sort(), s3 = { ...e5, getKey: /* @__PURE__ */ __name(async (t6) => {
        const s4 = await e5.getKey?.(t6);
        if (s4) return escapeKey(s4);
        const a5 = t6.node.req.originalUrl || t6.node.req.url || t6.path;
        let c4;
        try {
          c4 = escapeKey(decodeURI(parseURL(a5).pathname)).slice(0, 16) || "index";
        } catch {
          c4 = "-";
        }
        return [`${c4}.${hash(a5)}`, ...r4.map((e6) => [e6, t6.node.req.headers[e6]]).map(([t7, e6]) => `${escapeKey(t7)}.${hash(e6)}`)].join(":");
      }, "getKey"), validate: /* @__PURE__ */ __name((t6) => !!t6.value && (!(t6.value.code >= 400) && (void 0 !== t6.value.body && ("undefined" !== t6.value.headers.etag && "undefined" !== t6.value.headers["last-modified"]))), "validate"), group: e5.group || "nitro/handlers", integrity: e5.integrity || hash([t5, e5]) }, a4 = (function(t6, e6 = {}) {
        return defineCachedFunction(t6, e6);
      })(async (a5) => {
        const c4 = {};
        for (const t6 of r4) {
          const e6 = a5.node.req.headers[t6];
          void 0 !== e6 && (c4[t6] = e6);
        }
        const u4 = cloneWithProxy(a5.node.req, { headers: c4 }), f4 = {};
        let d5;
        const h5 = createEvent(u4, cloneWithProxy(a5.node.res, { statusCode: 200, writableEnded: false, writableFinished: false, headersSent: false, closed: false, getHeader: /* @__PURE__ */ __name((t6) => f4[t6], "getHeader"), setHeader(t6, e6) {
          return f4[t6] = e6, this;
        }, getHeaderNames: /* @__PURE__ */ __name(() => Object.keys(f4), "getHeaderNames"), hasHeader: /* @__PURE__ */ __name((t6) => t6 in f4, "hasHeader"), removeHeader(t6) {
          delete f4[t6];
        }, getHeaders: /* @__PURE__ */ __name(() => f4, "getHeaders"), end(t6, e6, r5) {
          return "string" == typeof t6 && (d5 = t6), "function" == typeof e6 && e6(), "function" == typeof r5 && r5(), this;
        }, write: /* @__PURE__ */ __name((t6, e6, r5) => ("string" == typeof t6 && (d5 = t6), "function" == typeof e6 && e6(void 0), "function" == typeof r5 && r5(), true), "write"), writeHead(t6, e6) {
          if (this.statusCode = t6, e6) {
            if (Array.isArray(e6) || "string" == typeof e6) throw new TypeError("Raw headers  is not supported.");
            for (const t7 in e6) {
              const r5 = e6[t7];
              void 0 !== r5 && this.setHeader(t7, r5);
            }
          }
          return this;
        } }));
        h5.fetch = (t6, e6) => fetchWithEvent(h5, t6, e6, { fetch: useNitroApp().localFetch }), h5.$fetch = (t6, e6) => fetchWithEvent(h5, t6, e6, { fetch: globalThis.$fetch }), h5.waitUntil = a5.waitUntil, h5.context = a5.context, h5.context.cache = { options: s3 };
        const g4 = await t5(h5) || d5, m5 = h5.node.res.getHeaders();
        m5.etag = String(m5.Etag || m5.etag || `W/"${hash(g4)}"`), m5["last-modified"] = String(m5["Last-Modified"] || m5["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString());
        const x5 = [];
        e5.swr ? (e5.maxAge && x5.push(`s-maxage=${e5.maxAge}`), e5.staleMaxAge ? x5.push(`stale-while-revalidate=${e5.staleMaxAge}`) : x5.push("stale-while-revalidate")) : e5.maxAge && x5.push(`max-age=${e5.maxAge}`), x5.length > 0 && (m5["cache-control"] = x5.join(", "));
        return { code: h5.node.res.statusCode, headers: m5, body: g4 };
      }, s3);
      return defineEventHandler(async (r5) => {
        if (e5.headersOnly) {
          if (handleCacheHeaders(r5, { maxAge: e5.maxAge })) return;
          return t5(r5);
        }
        const s4 = await a4(r5);
        if (r5.node.res.headersSent || r5.node.res.writableEnded) return s4.body;
        if (!handleCacheHeaders(r5, { modifiedTime: new Date(s4.headers["last-modified"]), etag: s4.headers.etag, maxAge: e5.maxAge })) {
          r5.node.res.statusCode = s4.code;
          for (const t6 in s4.headers) {
            const e6 = s4.headers[t6];
            "set-cookie" === t6 ? r5.node.res.appendHeader(t6, splitCookiesString(e6)) : void 0 !== e6 && r5.node.res.setHeader(t6, e6);
          }
          return s4.body;
        }
      });
    }, "cachedEventHandler");
    __name(klona, "klona");
    __name(isPlainObject$1, "isPlainObject$1");
    __name(_defu$1, "_defu$1");
    rr2 = (sr = /* @__PURE__ */ __name((t5, e5, r4) => {
      if (void 0 !== t5[e5] && "function" == typeof r4) return t5[e5] = r4(t5[e5]), true;
    }, "sr"), (...t5) => t5.reduce((t6, e5) => _defu$1(t6, e5, "", sr), {}));
    ar = rr2({});
    ir = /\d/;
    or = ["-", "_", "/", "."];
    __name(isUppercase, "isUppercase");
    __name(kebabCase, "kebabCase");
    __name(getEnv, "getEnv");
    __name(_isObject, "_isObject");
    __name(applyEnv, "applyEnv");
    cr = /\{\{([^{}]*)\}\}/g;
    __name(_expandFromEnv, "_expandFromEnv");
    ur = { app: { baseURL: "/", buildId: "ae631f9a-0866-4b47-b1b3-987eb90fca71", buildAssetsDir: "/_nuxt/", cdnURL: "" }, nitro: { envPrefix: "NUXT_", routeRules: { "/__nuxt_error": { cache: false }, "/_nuxt/builds/meta/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } }, "/_nuxt/builds/**": { headers: { "cache-control": "public, max-age=1, immutable" } }, "/_nuxt/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } } } }, public: {}, githubOauthClientId: "", supabaseUrl: "https://qhxvznvummjtypytcxlw.supabase.co", supabasePublishableKey: "sb_publishable_k_4B3nDBaJTZz7CK931mZA_dVtge7WN", webAiCompatibleOrigin: "" };
    pr = { prefix: "NITRO_", altPrefix: ur.nitro.envPrefix ?? m2.env.NITRO_ENV_PREFIX ?? "_", envExpansion: ur.nitro.envExpansion ?? m2.env.NITRO_ENV_EXPANSION ?? false };
    lr = _deepFreeze(applyEnv(klona(ur), pr));
    __name(useRuntimeConfig, "useRuntimeConfig");
    __name(_deepFreeze, "_deepFreeze");
    _deepFreeze(klona(ar)), new Proxy(/* @__PURE__ */ Object.create(null), { get: /* @__PURE__ */ __name((t5, e5) => {
      console.warn("Please use `useRuntimeConfig()` instead of accessing config directly.");
      const r4 = useRuntimeConfig();
      if (e5 in r4) return r4[e5];
    }, "get") });
    fr = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : void 0 !== pn ? pn : {};
    dr = "__unctx__";
    hr = fr[dr] || (fr[dr] = /* @__PURE__ */ (function(t5 = {}) {
      const e5 = {};
      return { get: /* @__PURE__ */ __name((r4, s3 = {}) => (e5[r4] || (e5[r4] = (function(t6 = {}) {
        let e6, r5 = false;
        const checkConflict = /* @__PURE__ */ __name((t7) => {
          if (e6 && e6 !== t7) throw new Error("Context conflict");
        }, "checkConflict");
        let s4;
        if (t6.asyncContext) {
          const e7 = t6.AsyncLocalStorage || globalThis.AsyncLocalStorage;
          e7 ? s4 = new e7() : console.warn("[unctx] `AsyncLocalStorage` is not provided.");
        }
        const _getCurrentInstance = /* @__PURE__ */ __name(() => {
          if (s4) {
            const t7 = s4.getStore();
            if (void 0 !== t7) return t7;
          }
          return e6;
        }, "_getCurrentInstance");
        return { use: /* @__PURE__ */ __name(() => {
          const t7 = _getCurrentInstance();
          if (void 0 === t7) throw new Error("Context is not available");
          return t7;
        }, "use"), tryUse: /* @__PURE__ */ __name(() => _getCurrentInstance(), "tryUse"), set: /* @__PURE__ */ __name((t7, s5) => {
          s5 || checkConflict(t7), e6 = t7, r5 = true;
        }, "set"), unset: /* @__PURE__ */ __name(() => {
          e6 = void 0, r5 = false;
        }, "unset"), call: /* @__PURE__ */ __name((t7, a4) => {
          checkConflict(t7), e6 = t7;
          try {
            return s4 ? s4.run(t7, a4) : a4();
          } finally {
            r5 || (e6 = void 0);
          }
        }, "call"), async callAsync(t7, a4) {
          e6 = t7;
          const onRestore = /* @__PURE__ */ __name(() => {
            e6 = t7;
          }, "onRestore"), onLeave = /* @__PURE__ */ __name(() => e6 === t7 ? onRestore : void 0, "onLeave");
          mr.add(onLeave);
          try {
            const c4 = s4 ? s4.run(t7, a4) : a4();
            return r5 || (e6 = void 0), await c4;
          } finally {
            mr.delete(onLeave);
          }
        } };
      })({ ...t5, ...s3 })), e5[r4]), "get") };
    })());
    gr = "__unctx_async_handlers__";
    mr = fr[gr] || (fr[gr] = /* @__PURE__ */ new Set());
    __name(isPlainObject, "isPlainObject");
    __name(_defu, "_defu");
    ((t5, e5 = {}) => {
      hr.get(t5, e5);
    })("nitro-app", { asyncContext: false, AsyncLocalStorage: void 0 });
    xr = /* @__PURE__ */ (function(t5) {
      return (...e5) => e5.reduce((e6, r4) => _defu(e6, r4, "", t5), {});
    })();
    __name(isPathInScope, "isPathInScope");
    _r = toRouteMatcher(createRouter$1({ routes: useRuntimeConfig().nitro.routeRules }));
    __name(createRouteRulesHandler, "createRouteRulesHandler");
    __name(getRouteRules, "getRouteRules");
    __name(getRouteRulesForPath, "getRouteRulesForPath");
    br = /post|put|patch/i;
    __name(joinHeaders, "joinHeaders");
    __name(normalizeCookieHeader, "normalizeCookieHeader");
    __name(normalizeCookieHeaders, "normalizeCookieHeaders");
    __name(hasReqHeader, "hasReqHeader");
    __name(defaultHandler, "defaultHandler");
    yr = [async function(t5, e5, { defaultHandler: r4 }) {
      if (e5.handled || (function(t6) {
        return !hasReqHeader(t6, "accept", "text/html") && (hasReqHeader(t6, "accept", "application/json") || hasReqHeader(t6, "user-agent", "curl/") || hasReqHeader(t6, "user-agent", "httpie/") || hasReqHeader(t6, "sec-fetch-mode", "cors") || t6.path.startsWith("/api/") || t6.path.endsWith(".json"));
      })(e5)) return;
      const s3 = await r4(t5, e5, { json: true });
      if (404 === (t5.status || t5.statusCode || 500) && 302 === s3.status) return setResponseHeaders(e5, s3.headers), setResponseStatus(e5, s3.status, s3.statusText), send(e5, JSON.stringify(s3.body, null, 2));
      const a4 = s3.body, c4 = new URL(a4.url);
      a4.url = (function(t6, e6) {
        if (!(r5 = e6) || "/" === r5) return t6;
        var r5;
        const s4 = withoutTrailingSlash$2(e6);
        if (!t6.startsWith(s4)) return t6;
        const a5 = t6[s4.length];
        return a5 && "/" !== a5 && "?" !== a5 ? t6 : "/" + t6.slice(s4.length).replace(/^\/+/, "");
      })(c4.pathname, useRuntimeConfig(e5).app.baseURL) + c4.search + c4.hash, a4.message = t5.unhandled ? a4.message || "Server Error" : t5.message || a4.message || "Server Error", a4.data ||= t5.data, a4.statusText ||= t5.statusText || t5.statusMessage, delete s3.headers["content-type"], delete s3.headers["content-security-policy"], setResponseHeaders(e5, s3.headers);
      const u4 = getRequestHeaders(e5), f4 = e5.path.startsWith("/__nuxt_error") || u4["x-nuxt-error"] ? null : await useNitroApp().localFetch(withQuery$2(joinURL$2(useRuntimeConfig(e5).app.baseURL, "/__nuxt_error"), a4), { headers: { ...u4, "x-nuxt-error": "true" }, redirect: "manual" }).catch(() => null);
      if (e5.handled) return;
      if (!f4) {
        const { template: t6 } = await Promise.resolve().then(() => (init_error_500(), error_500_exports));
        return setResponseHeader(e5, "Content-Type", "text/html;charset=UTF-8"), send(e5, t6(a4));
      }
      const d5 = await f4.text();
      for (const [t6, r5] of f4.headers.entries()) "set-cookie" !== t6 ? setResponseHeader(e5, t6, r5) : appendResponseHeader(e5, t6, r5);
      return setResponseStatus(e5, f4.status && 200 !== f4.status ? f4.status : s3.status, f4.statusText || s3.statusText), send(e5, d5);
    }, function(t5, e5) {
      const r4 = defaultHandler(t5, e5);
      return setResponseHeaders(e5, r4.headers), setResponseStatus(e5, r4.status, r4.statusText), send(e5, JSON.stringify(r4.body, null, 2));
    }];
    jr = [];
    _lazy_dLCGg7 = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_renderer(), renderer_exports)), "_lazy_dLCGg7");
    zr = [{ route: "/api/web/ai", handler: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_ai_post(), ai_post_exports)), "handler"), lazy: true, middleware: false, method: "post" }, { route: "/api/web/credentials", handler: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_credentials_get(), credentials_get_exports)), "handler"), lazy: true, middleware: false, method: "get" }, { route: "/api/web/credentials", handler: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_credentials_post(), credentials_post_exports)), "handler"), lazy: true, middleware: false, method: "post" }, { route: "/__nuxt_error", handler: _lazy_dLCGg7, lazy: true, middleware: false, method: void 0 }, { route: "/__nuxt_island/**", handler: defineEventHandler(() => {
    }), lazy: false, middleware: false, method: void 0 }, { route: "/**", handler: _lazy_dLCGg7, lazy: true, middleware: false, method: void 0 }];
    Tr = (function() {
      const t5 = useRuntimeConfig(), e5 = new Hookable(), captureError = /* @__PURE__ */ __name((t6, r5 = {}) => {
        const s4 = e5.callHookParallel("error", t6, r5).catch((t7) => {
          console.error("Error while capturing another error", t7);
        });
        if (r5.event && isEvent(r5.event)) {
          const e6 = r5.event.context.nitro?.errors;
          e6 && e6.push({ error: t6, context: r5 }), r5.event.waitUntil && r5.event.waitUntil(s4);
        }
      }, "captureError"), r4 = createApp({ debug: destr(false), onError: /* @__PURE__ */ __name((t6, e6) => (captureError(t6, { event: e6, tags: ["request"] }), (async function(t7, e7) {
        for (const r5 of yr) try {
          if (await r5(t7, e7, { defaultHandler }), e7.handled) return;
        } catch (t8) {
          console.error(t8);
        }
      })(t6, e6)), "onError"), onRequest: /* @__PURE__ */ __name(async (t6) => {
        t6.context.nitro = t6.context.nitro || { errors: [] };
        const e6 = t6.node.req?.__unenv__;
        e6?._platform && (t6.context = { _platform: e6?._platform, ...e6._platform, ...t6.context }), !t6.context.waitUntil && e6?.waitUntil && (t6.context.waitUntil = e6.waitUntil), t6.fetch = (e7, r5) => fetchWithEvent(t6, e7, r5, { fetch: localFetch }), t6.$fetch = (e7, r5) => fetchWithEvent(t6, e7, r5, { fetch: c4 }), t6.waitUntil = (e7) => {
          t6.context.nitro._waitUntilPromises || (t6.context.nitro._waitUntilPromises = []), t6.context.nitro._waitUntilPromises.push(e7), t6.context.waitUntil && t6.context.waitUntil(e7);
        }, t6.captureError = (e7, r5) => {
          captureError(e7, { event: t6, ...r5 });
        }, await Tr.hooks.callHook("request", t6).catch((e7) => {
          captureError(e7, { event: t6, tags: ["request"] });
        });
      }, "onRequest"), onBeforeResponse: /* @__PURE__ */ __name(async (t6, e6) => {
        await Tr.hooks.callHook("beforeResponse", t6, e6).catch((e7) => {
          captureError(e7, { event: t6, tags: ["request", "response"] });
        });
      }, "onBeforeResponse"), onAfterResponse: /* @__PURE__ */ __name(async (t6, e6) => {
        await Tr.hooks.callHook("afterResponse", t6, e6).catch((e7) => {
          captureError(e7, { event: t6, tags: ["request", "response"] });
        });
      }, "onAfterResponse") }), s3 = (function(t6 = {}) {
        const e6 = createRouter$1({}), r5 = {};
        let s4;
        const a5 = {}, addRoute = /* @__PURE__ */ __name((t7, s5, c6) => {
          let u4 = r5[t7];
          if (u4 || (r5[t7] = u4 = { path: t7, handlers: {} }, e6.insert(t7, u4)), Array.isArray(c6)) for (const e7 of c6) addRoute(t7, s5, e7);
          else u4.handlers[c6] = toEventHandler(s5);
          return a5;
        }, "addRoute");
        a5.use = a5.add = (t7, e7, r6) => addRoute(t7, e7, r6 || "all");
        for (const t7 of on) a5[t7] = (e7, r6) => a5.add(e7, r6, t7);
        const matchHandler = /* @__PURE__ */ __name((t7 = "/", r6 = "get") => {
          const a6 = t7.indexOf("?");
          -1 !== a6 && (t7 = t7.slice(0, Math.max(0, a6)));
          const c6 = e6.lookup(t7);
          if (!c6 || !c6.handlers) return { error: createError({ statusCode: 404, name: "Not Found", statusMessage: `Cannot find any route matching ${t7 || "/"}.` }) };
          let u4 = c6.handlers[r6] || c6.handlers.all;
          if (!u4) {
            s4 || (s4 = toRouteMatcher(e6));
            const a7 = s4.matchAll(t7).reverse();
            for (const t8 of a7) {
              if (t8.handlers[r6]) {
                u4 = t8.handlers[r6], c6.handlers[r6] = c6.handlers[r6] || u4;
                break;
              }
              if (t8.handlers.all) {
                u4 = t8.handlers.all, c6.handlers.all = c6.handlers.all || u4;
                break;
              }
            }
          }
          return u4 ? { matched: c6, handler: u4 } : { error: createError({ statusCode: 405, name: "Method Not Allowed", statusMessage: `Method ${r6} is not allowed on this route.` }) };
        }, "matchHandler"), c5 = t6.preemptive || t6.preemtive;
        return a5.handler = an((t7) => {
          const e7 = matchHandler(t7.path, t7.method.toLowerCase());
          if ("error" in e7) {
            if (c5) throw e7.error;
            return;
          }
          t7.context.matchedRoute = e7.matched;
          const r6 = e7.matched.params || {};
          return t7.context.params = r6, Promise.resolve(e7.handler(t7)).then((t8) => void 0 === t8 && c5 ? null : t8);
        }), a5.handler.__resolve__ = async (t7) => {
          t7 = (function(t8 = "") {
            return (function(t9 = "") {
              return t9.startsWith("/");
            })(t8) ? t8 : "/" + t8;
          })(t7);
          const e7 = matchHandler(t7);
          if ("error" in e7) return;
          let r6 = { route: e7.matched.path, handler: e7.handler };
          if (e7.handler.__resolve__) {
            const s5 = await e7.handler.__resolve__(t7);
            if (!s5) return;
            r6 = { ...r6, ...s5 };
          }
          return r6;
        }, a5;
      })({ preemptive: true }), a4 = toNodeListener(r4), localFetch = /* @__PURE__ */ __name((t6, e6) => t6.toString().startsWith("/") ? (async function(t7, e7, r5 = {}) {
        try {
          const s4 = await b4(t7, { url: e7, ...r5 });
          return new Response(s4.body, { status: s4.status, statusText: s4.statusText, headers: v4(s4.headers) });
        } catch (t8) {
          return new Response(t8.toString(), { status: Number.parseInt(t8.statusCode || t8.code) || 500, statusText: t8.statusText });
        }
      })(a4, t6, e6).then((t7) => (function(t8) {
        return t8.headers.has("set-cookie") ? new Response(t8.body, { status: t8.status, statusText: t8.statusText, headers: normalizeCookieHeaders(t8.headers) }) : t8;
      })(t7)) : globalThis.fetch(t6, e6), "localFetch"), c4 = createFetch({ fetch: localFetch, Headers: Dn, defaults: { baseURL: t5.app.baseURL } });
      globalThis.$fetch = c4, r4.use(createRouteRulesHandler({ localFetch }));
      for (const e6 of zr) {
        let a5 = e6.lazy ? lazyEventHandler(e6.handler) : e6.handler;
        if (e6.middleware || !e6.route) {
          const s4 = (t5.app.baseURL + (e6.route || "/")).replace(/\/+/g, "/");
          r4.use(s4, a5);
        } else {
          const t6 = getRouteRulesForPath(e6.route.replace(/:\w+|\*\*/g, "_"));
          t6.cache && (a5 = cachedEventHandler(a5, { group: "nitro/routes", ...t6.cache })), s3.use(e6.route, a5, e6.method);
        }
      }
      return r4.use(t5.app.baseURL, s3.handler), { hooks: e5, h3App: r4, router: s3, localCall: /* @__PURE__ */ __name((t6) => b4(a4, t6), "localCall"), localFetch, captureError };
    })();
    __name(useNitroApp, "useNitroApp");
    __name(defineRenderHandler, "defineRenderHandler");
    !(function(t5) {
      for (const e5 of jr) try {
        e5(t5);
      } catch (e6) {
        throw t5.captureError(e6, { tags: ["plugin"] }), e6;
      }
    })(Tr);
    wr = { "/_nuxt/Cx9_0Zxu.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"e42-AoWoeXS0OClKpbJsI5AJEre0P80"', mtime: "2026-09-11T04:32:37.905Z", size: 3650, path: "../public/_nuxt/Cx9_0Zxu.js" }, "/_nuxt/Cmyvdx_-.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"1038-a0MpnUOEcwy1kkhb3piHjCgahQ8"', mtime: "2026-09-11T04:32:37.906Z", size: 4152, path: "../public/_nuxt/Cmyvdx_-.js" }, "/_nuxt/C3_xuxG1.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"23fd-qnuFlrIJJPeA8QLFXvWdw4NscoM"', mtime: "2026-09-11T04:32:37.904Z", size: 9213, path: "../public/_nuxt/C3_xuxG1.js" }, "/_nuxt/chat.DDXhWmJw.png": { type: "image/png", etag: '"1418-wpEi9Cv0WHSdVVNHSrr8twEjur8"', mtime: "2026-09-11T04:32:37.906Z", size: 5144, path: "../public/_nuxt/chat.DDXhWmJw.png" }, "/_nuxt/DIckivU5.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"50940-zx04O3JLSaayREA+3wLjrVDGRjU"', mtime: "2026-09-11T04:32:37.060Z", size: 330048, path: "../public/_nuxt/DIckivU5.js" }, "/_nuxt/C1OZectE.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"562a-j4NcLlUfSrC9mcFI0Sc0DrtW1Jk"', mtime: "2026-09-11T04:32:37.906Z", size: 22058, path: "../public/_nuxt/C1OZectE.js" }, "/_nuxt/DuqgYnXA.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"2a5-cURI7kWHh2PK3EBJT6ivm5nSUTE"', mtime: "2026-09-11T04:32:38.818Z", size: 677, path: "../public/_nuxt/DuqgYnXA.js.gz" }, "/_nuxt/KaTeX_Size1-Regular.C195tn64.woff": { type: "font/woff", etag: '"1960-rv5mdKVlM2J8c5zXiWOY8USH4Bw"', mtime: "2026-09-11T04:32:37.904Z", size: 6496, path: "../public/_nuxt/KaTeX_Size1-Regular.C195tn64.woff" }, "/_nuxt/KaTeX_SansSerif-Italic.DN2j7dab.woff": { type: "font/woff", etag: '"3720-dWSjZrdv2DcEHCS+70xVgKWt1A4"', mtime: "2026-09-11T04:32:37.910Z", size: 14112, path: "../public/_nuxt/KaTeX_SansSerif-Italic.DN2j7dab.woff" }, "/_nuxt/DOQDXZsa.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"d7b-S0vyyqmv9TYX7ze/7W4hyqpzvas"', mtime: "2026-09-11T04:32:38.059Z", size: 3451, path: "../public/_nuxt/DOQDXZsa.js.gz" }, "/_nuxt/B-D7dJ5g.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"60e0-eKzf4KJ13SUL75PbvTv9fEsHWJo"', mtime: "2026-09-11T04:32:38.108Z", size: 24800, path: "../public/_nuxt/B-D7dJ5g.js.gz" }, "/_nuxt/Bqe5OFuP.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"845-ioowvkmQU+odxYfl96GBVgUOt0M"', mtime: "2026-09-11T04:32:37.905Z", size: 2117, path: "../public/_nuxt/Bqe5OFuP.js" }, "/_nuxt/Cy6QaPw7.js": { type: "text/javascript; charset=utf-8", etag: '"13b-Y+KrUzK7mFtgXpBgjY4Rjp9fpHI"', mtime: "2026-09-11T04:32:37.907Z", size: 315, path: "../public/_nuxt/Cy6QaPw7.js" }, "/_nuxt/KaTeX_Size2-Regular.B7gKUWhC.ttf.br": { type: "font/ttf", encoding: "br", etag: '"1640-dzuRPEZuLNY/FhnrQZ/zRCb+U/Y"', mtime: "2026-09-11T04:32:38.583Z", size: 5696, path: "../public/_nuxt/KaTeX_Size2-Regular.B7gKUWhC.ttf.br" }, "/_nuxt/KaTeX_AMS-Regular.DRggAlZN.ttf.br": { type: "font/ttf", encoding: "br", etag: '"7dd0-TkAhnPnNGt4hwhsAwb9vlBPcfEo"', mtime: "2026-09-11T04:32:38.400Z", size: 32208, path: "../public/_nuxt/KaTeX_AMS-Regular.DRggAlZN.ttf.br" }, "/_nuxt/CSvmdMId.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"7fd-1aMnb1UtX8byNHoQ5p28amkppbk"', mtime: "2026-09-11T04:32:38.837Z", size: 2045, path: "../public/_nuxt/CSvmdMId.js.gz" }, "/_nuxt/D9X70ea_.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"a23-ysc/eLXW/Xuo5+R2aZRiPKQWPrg"', mtime: "2026-09-11T04:32:37.903Z", size: 2595, path: "../public/_nuxt/D9X70ea_.js" }, "/_nuxt/KaTeX_Size3-Regular.DgpXs0kz.ttf.br": { type: "font/ttf", encoding: "br", etag: '"f5e-rAEtBYeD+AijwgSUmHa+02PQU4s"', mtime: "2026-09-11T04:32:38.132Z", size: 3934, path: "../public/_nuxt/KaTeX_Size3-Regular.DgpXs0kz.ttf.br" }, "/_nuxt/KaTeX_Fraktur-Regular.Dxdc4cR9.woff": { type: "font/woff", etag: '"3398-b3VjdjYPCBW0SGL1f3let8HNTbI"', mtime: "2026-09-11T04:32:37.906Z", size: 13208, path: "../public/_nuxt/KaTeX_Fraktur-Regular.Dxdc4cR9.woff" }, "/_nuxt/DMK6l-5U.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"18f-HoEErkDpEatnXpmkr+9u8OMNfw0"', mtime: "2026-09-11T04:32:38.008Z", size: 399, path: "../public/_nuxt/DMK6l-5U.js.br" }, "/_nuxt/CwHFm-oR.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"22b-uCihf/YUMgSFYlXXBBybfDy1mgc"', mtime: "2026-09-11T04:32:39.003Z", size: 555, path: "../public/_nuxt/CwHFm-oR.js.gz" }, "/_nuxt/lVNn4F3S.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"f69-nCvf8x8M6bT0r3N11mwqD8nBDko"', mtime: "2026-09-11T04:32:38.932Z", size: 3945, path: "../public/_nuxt/lVNn4F3S.js.br" }, "/_nuxt/KaTeX_Main-Regular.ypZvNtVU.ttf.br": { type: "font/ttf", encoding: "br", etag: '"73b4-DITsiSYG56t2tIsvQ8Db9HI2Nqk"', mtime: "2026-09-11T04:32:38.914Z", size: 29620, path: "../public/_nuxt/KaTeX_Main-Regular.ypZvNtVU.ttf.br" }, "/_nuxt/entry.DpS-p5p_.css.br": { type: "text/css; charset=utf-8", encoding: "br", etag: '"3f9e-zCgKkWcjcyIstHKh8k8AB0nAf5M"', mtime: "2026-09-11T04:32:39.015Z", size: 16286, path: "../public/_nuxt/entry.DpS-p5p_.css.br" }, "/_nuxt/DH04fbtw.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"ccdc-XYTiE1y5vDp72vI1ydXZS0vaxts"', mtime: "2026-09-11T04:32:39.311Z", size: 52444, path: "../public/_nuxt/DH04fbtw.js.br" }, "/_nuxt/ChRZzNTs.js": { type: "text/javascript; charset=utf-8", etag: '"67-dLly2uVenFKkCiAA294p9b1Tsk0"', mtime: "2026-09-11T04:32:37.903Z", size: 103, path: "../public/_nuxt/ChRZzNTs.js" }, "/_nuxt/DfU9rPl0.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"291a-TnIDzGFs3RAB/09sqZOcCW+bDR0"', mtime: "2026-09-11T04:32:37.905Z", size: 10522, path: "../public/_nuxt/DfU9rPl0.js" }, "/_nuxt/KaTeX_Fraktur-Regular.CB_wures.ttf.br": { type: "font/ttf", encoding: "br", etag: '"3169-+C07CMm8dSc74IRPdMQLso/CMyc"', mtime: "2026-09-11T04:32:39.031Z", size: 12649, path: "../public/_nuxt/KaTeX_Fraktur-Regular.CB_wures.ttf.br" }, "/_nuxt/BP61iLYe.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"c8b-KO2GeHxYpkr5YOV+mM1YcKfkFGY"', mtime: "2026-09-11T04:32:37.904Z", size: 3211, path: "../public/_nuxt/BP61iLYe.js" }, "/_nuxt/D9X70ea_.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"361-kTbV8Oq0MdLK2OJ5G3eshutMVXw"', mtime: "2026-09-11T04:32:37.950Z", size: 865, path: "../public/_nuxt/D9X70ea_.js.gz" }, "/_nuxt/xAeXSfFd.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"432-fVXiTbTQEAJyxh9Ha5/z8dxAZtk"', mtime: "2026-09-11T04:32:38.191Z", size: 1074, path: "../public/_nuxt/xAeXSfFd.js.gz" }, "/_nuxt/BANQB8Nb.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"3a1f-yvEVbYsrqEPk+kyjNGQMVZQHb/I"', mtime: "2026-09-11T04:32:37.905Z", size: 14879, path: "../public/_nuxt/BANQB8Nb.js" }, "/_nuxt/BfMudgLE.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"1c52-dSRz9XMPmODMyzCLJyUgqkOz1Gk"', mtime: "2026-09-11T04:32:37.998Z", size: 7250, path: "../public/_nuxt/BfMudgLE.js.br" }, "/_nuxt/KaTeX_Size3-Regular.CTq5MqoE.woff": { type: "font/woff", etag: '"1144-HaGQWm0dm8q5KwWd9ytSjepwi8s"', mtime: "2026-09-11T04:32:37.904Z", size: 4420, path: "../public/_nuxt/KaTeX_Size3-Regular.CTq5MqoE.woff" }, "/_nuxt/3i8JKPp4.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"2a2-c0b3vmHwi1kxUAUeNFLJG1lY5EM"', mtime: "2026-09-11T04:32:38.768Z", size: 674, path: "../public/_nuxt/3i8JKPp4.js.gz" }, "/_nuxt/BfMudgLE.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"5d1d-/KGynoP9Ac3AV5MQaecEoJgbSVE"', mtime: "2026-09-11T04:32:37.906Z", size: 23837, path: "../public/_nuxt/BfMudgLE.js" }, "/_nuxt/KaTeX_Main-Regular.B22Nviop.woff2": { type: "font/woff2", etag: '"66a0-yIQIbCXOyFWBYLICb5Bu99o1cKw"', mtime: "2026-09-11T04:32:37.905Z", size: 26272, path: "../public/_nuxt/KaTeX_Main-Regular.B22Nviop.woff2" }, "/_nuxt/KaTeX_Main-Italic.BMLOBm91.woff": { type: "font/woff", etag: '"4cdc-fIWJITvHAD4sIzS1HKQVKFiYer0"', mtime: "2026-09-11T04:32:37.903Z", size: 19676, path: "../public/_nuxt/KaTeX_Main-Italic.BMLOBm91.woff" }, "/_nuxt/BEppUSYT.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"e55-IpzcrL2c/EC/Vs2HTXp0ygNsD20"', mtime: "2026-09-11T04:32:37.916Z", size: 3669, path: "../public/_nuxt/BEppUSYT.js" }, "/_nuxt/KaTeX_SansSerif-Italic.YYjJ1zSn.ttf.br": { type: "font/ttf", encoding: "br", etag: '"34ed-tCG3uhUTjdpLSJEenHCe185t6Wc"', mtime: "2026-09-11T04:32:38.837Z", size: 13549, path: "../public/_nuxt/KaTeX_SansSerif-Italic.YYjJ1zSn.ttf.br" }, "/_nuxt/MarkdownRenderer.CEk2HVtF.css.gz": { type: "text/css; charset=utf-8", encoding: "gzip", etag: '"34d-PmRfIX4U8ftOpN5WlULLtofeDRs"', mtime: "2026-09-11T04:32:37.993Z", size: 845, path: "../public/_nuxt/MarkdownRenderer.CEk2HVtF.css.gz" }, "/_nuxt/CtVf1DiR.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"1ae9-rfI7Xt0myNJcOpEIfr83VwFZ1aE"', mtime: "2026-09-11T04:32:37.914Z", size: 6889, path: "../public/_nuxt/CtVf1DiR.js" }, "/_nuxt/DNESoGCl.js": { type: "text/javascript; charset=utf-8", etag: '"4a-KdMC5RmwgGQyk4+U/55XVCeZPQQ"', mtime: "2026-09-11T04:32:37.911Z", size: 74, path: "../public/_nuxt/DNESoGCl.js" }, "/_nuxt/KaTeX_Caligraphic-Regular.wX97UBjC.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"1e09-q7wp6YfPGytJYZL4J7BgxTZJWh8"', mtime: "2026-09-11T04:32:38.133Z", size: 7689, path: "../public/_nuxt/KaTeX_Caligraphic-Regular.wX97UBjC.ttf.gz" }, "/_nuxt/KaTeX_Script-Regular.C5JkGWo-.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"29d5-5T6R6uVoGul9vy8+X8++1VW2jKc"', mtime: "2026-09-11T04:32:38.962Z", size: 10709, path: "../public/_nuxt/KaTeX_Script-Regular.C5JkGWo-.ttf.gz" }, "/_nuxt/CoT1qCUq.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"74ec-xGT2uqd6MYTzmIGjcgCxYvQBCKo"', mtime: "2026-09-11T04:32:37.987Z", size: 29932, path: "../public/_nuxt/CoT1qCUq.js.gz" }, "/_nuxt/DqAPr7Mw.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"c352-3EDvro+Lrf+CC096ZPC6g5MeyoA"', mtime: "2026-09-11T04:32:37.914Z", size: 50002, path: "../public/_nuxt/DqAPr7Mw.js" }, "/_nuxt/B8DElJvO.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"522-g2qIrtttFLswDMTgkgdtczJACFY"', mtime: "2026-09-11T04:32:37.911Z", size: 1314, path: "../public/_nuxt/B8DElJvO.js" }, "/_nuxt/_I7zX1hp.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"560-HMEZPI4R1a7XPh05V6J5OWe1UjQ"', mtime: "2026-09-11T04:32:38.864Z", size: 1376, path: "../public/_nuxt/_I7zX1hp.js.gz" }, "/_nuxt/KaTeX_Size4-Regular.DWFBv043.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"1738-XUUNvUVayJzviVnjq2cBPVSdNDo"', mtime: "2026-09-11T04:32:38.803Z", size: 5944, path: "../public/_nuxt/KaTeX_Size4-Regular.DWFBv043.ttf.gz" }, "/_nuxt/Dd1vPuSX.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"1904-gf5Yke0M7i6PNPSMBKxdlDUF8KY"', mtime: "2026-09-11T04:32:39.049Z", size: 6404, path: "../public/_nuxt/Dd1vPuSX.js.br" }, "/_nuxt/DAEfPZzO.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"860-xi/Q9JkT6YDYpQIQHPF1daW60q4"', mtime: "2026-09-11T04:32:38.872Z", size: 2144, path: "../public/_nuxt/DAEfPZzO.js.br" }, "/_nuxt/58j6fSHb.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"ad4-VOvHg7ObBP7JxHGSDMWxyQXaK1E"', mtime: "2026-09-11T04:32:38.803Z", size: 2772, path: "../public/_nuxt/58j6fSHb.js.gz" }, "/_nuxt/CenSu9pQ.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"6b4-0tsI8hlH9gxS/Pfx93Ik2X/wU+k"', mtime: "2026-09-11T04:32:38.893Z", size: 1716, path: "../public/_nuxt/CenSu9pQ.js.br" }, "/_nuxt/DJIE5NFf.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"1478-gEKKTkC/EqX8WEL24sbh+xa5k14"', mtime: "2026-09-11T04:32:38.629Z", size: 5240, path: "../public/_nuxt/DJIE5NFf.js.gz" }, "/_nuxt/BP61iLYe.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"58a-d6ti/EI1amT7fMeNhqgayvhORrI"', mtime: "2026-09-11T04:32:37.961Z", size: 1418, path: "../public/_nuxt/BP61iLYe.js.gz" }, "/_nuxt/DfU9rPl0.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"e6d-KZ5H/Cy1Czr/Nj575LYGp5jsxG0"', mtime: "2026-09-11T04:32:37.979Z", size: 3693, path: "../public/_nuxt/DfU9rPl0.js.br" }, "/_nuxt/Ca1NHEsT.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"489-JHWIPVxPouB31CiXAKV4tBuLi7A"', mtime: "2026-09-11T04:32:37.907Z", size: 1161, path: "../public/_nuxt/Ca1NHEsT.js" }, "/_nuxt/first-run.xoV6d82S.css": { type: "text/css; charset=utf-8", encoding: null, etag: '"b49-osyEGdaGXW2qk/2McgowtLN3X3A"', mtime: "2026-09-11T04:32:37.906Z", size: 2889, path: "../public/_nuxt/first-run.xoV6d82S.css" }, "/_nuxt/KaTeX_Main-Italic.3WenGoN9.ttf": { type: "font/ttf", encoding: null, etag: '"832c-HVZoorlK59vu/dfNaNmP6dWCXgc"', mtime: "2026-09-11T04:32:37.906Z", size: 33580, path: "../public/_nuxt/KaTeX_Main-Italic.3WenGoN9.ttf" }, "/_nuxt/D33Hiyx4.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"9c6-QlkPpTDVQJENtSEAxDFWH8u17XM"', mtime: "2026-09-11T04:32:38.032Z", size: 2502, path: "../public/_nuxt/D33Hiyx4.js.gz" }, "/_nuxt/KaTeX_Math-Italic.flOr_0UB.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"4b16-O+HMoxC0qZtCDogThIvgbYYjTzQ"', mtime: "2026-09-11T04:32:38.721Z", size: 19222, path: "../public/_nuxt/KaTeX_Math-Italic.flOr_0UB.ttf.gz" }, "/_nuxt/CoT1qCUq.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"12fa8-ektR1Iev0ytwVst0m7aMHN9wYEI"', mtime: "2026-09-11T04:32:37.905Z", size: 77736, path: "../public/_nuxt/CoT1qCUq.js" }, "/_nuxt/MarkdownRenderer.CEk2HVtF.css": { type: "text/css; charset=utf-8", encoding: null, etag: '"ff7-51TirtapxMRrog659fOQjaCFcMI"', mtime: "2026-09-11T04:32:37.904Z", size: 4087, path: "../public/_nuxt/MarkdownRenderer.CEk2HVtF.css" }, "/_nuxt/Bwbix4wE.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"5bc31-idq7UnPrgV/5dJgcxPox7gSiMW8"', mtime: "2026-09-11T04:32:37.063Z", size: 375857, path: "../public/_nuxt/Bwbix4wE.js" }, "/_nuxt/match.ARkrkEri.png": { type: "image/png", etag: '"1699-He/CcnKIGs1OWEwa6sPs+sumsVQ"', mtime: "2026-09-11T04:32:37.911Z", size: 5785, path: "../public/_nuxt/match.ARkrkEri.png" }, "/_nuxt/DmwaeKks.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"620-TCYAE/AtuIgmoI90ZqAIpFMnZU4"', mtime: "2026-09-11T04:32:38.779Z", size: 1568, path: "../public/_nuxt/DmwaeKks.js.gz" }, "/_nuxt/KaTeX_Script-Regular.D3wIWfF6.woff2": { type: "font/woff2", etag: '"25ac-Y7gJWfH8Voma4hugy7zTmmywg5A"', mtime: "2026-09-11T04:32:37.923Z", size: 9644, path: "../public/_nuxt/KaTeX_Script-Regular.D3wIWfF6.woff2" }, "/_nuxt/Bip-Hqa3.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"9ec-d/oJ04zUx2LgMKn71dyy+lY2enU"', mtime: "2026-09-11T04:32:38.315Z", size: 2540, path: "../public/_nuxt/Bip-Hqa3.js.br" }, "/_nuxt/KaTeX_Typewriter-Regular.C0xS9mPB.woff": { type: "font/woff", etag: '"3e9c-9ecp+k/0ZvwH4MerGXmtcMRfpdU"', mtime: "2026-09-11T04:32:37.919Z", size: 16028, path: "../public/_nuxt/KaTeX_Typewriter-Regular.C0xS9mPB.woff" }, "/_nuxt/DIckivU5.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"13a2a-7NxY3KCoTnqMSTEwGTFkLhZZ7lE"', mtime: "2026-09-11T04:32:38.728Z", size: 80426, path: "../public/_nuxt/DIckivU5.js.br" }, "/_nuxt/D1CiTnQp.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"44e42-ThUYNP/IOl+F/48GZ6OSe9CbNy0"', mtime: "2026-09-11T04:32:37.065Z", size: 282178, path: "../public/_nuxt/D1CiTnQp.js" }, "/_nuxt/B8DElJvO.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"306-YeSz44Yh8rFUoJCVd2M7Es66WMw"', mtime: "2026-09-11T04:32:37.979Z", size: 774, path: "../public/_nuxt/B8DElJvO.js.gz" }, "/_nuxt/KaTeX_Fraktur-Regular.CTYiF6lA.woff2": { type: "font/woff2", etag: '"2c34-pXZMbieE0CggwLkECJ8/rHmL5Po"', mtime: "2026-09-11T04:32:37.920Z", size: 11316, path: "../public/_nuxt/KaTeX_Fraktur-Regular.CTYiF6lA.woff2" }, "/_nuxt/DakktQPo.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"5f8-wILW1TL6WAaCKcOp636GY1InS4g"', mtime: "2026-09-11T04:32:38.016Z", size: 1528, path: "../public/_nuxt/DakktQPo.js.br" }, "/_nuxt/BMF2dx8Y.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"2786-fOsG4HDGgWHGJaH9FI/BLG9/zRA"', mtime: "2026-09-11T04:32:38.864Z", size: 10118, path: "../public/_nuxt/BMF2dx8Y.js.gz" }, "/_nuxt/DNaw6KYU.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"2a2-TMOoRRNJKUFo3G/lkQNXjKk1Ii0"', mtime: "2026-09-11T04:32:38.227Z", size: 674, path: "../public/_nuxt/DNaw6KYU.js.br" }, "/_nuxt/Dq033PX3.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"832-ZdUUEQ+foq8dzz6jAYhR5kX1CMU"', mtime: "2026-09-11T04:32:38.029Z", size: 2098, path: "../public/_nuxt/Dq033PX3.js.gz" }, "/_nuxt/C3_xuxG1.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"d48-JFzM6P46MQEMofIV/10Pmao4EKk"', mtime: "2026-09-11T04:32:37.950Z", size: 3400, path: "../public/_nuxt/C3_xuxG1.js.gz" }, "/_nuxt/KaTeX_Main-Italic.3WenGoN9.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"4efe-oromvHSkijUKNT7XHoFNkwFcnik"', mtime: "2026-09-11T04:32:37.993Z", size: 20222, path: "../public/_nuxt/KaTeX_Main-Italic.3WenGoN9.ttf.gz" }, "/_nuxt/KiLc3yVa.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"99c-H/+gnGsQL6KhaP9A+YWUcUGY6mQ"', mtime: "2026-09-11T04:32:37.916Z", size: 2460, path: "../public/_nuxt/KiLc3yVa.js" }, "/_nuxt/_id_-flashcards.Brokb39F.css.br": { type: "text/css; charset=utf-8", encoding: "br", etag: '"153-qoSaU9MUXfX2DeM+S7Iqb9HiAwo"', mtime: "2026-09-11T04:32:38.970Z", size: 339, path: "../public/_nuxt/_id_-flashcards.Brokb39F.css.br" }, "/_nuxt/BANQB8Nb.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"f96-WRpHjyBM73VIQkrMv89W/Ta5yVk"', mtime: "2026-09-11T04:32:37.980Z", size: 3990, path: "../public/_nuxt/BANQB8Nb.js.br" }, "/_nuxt/KaTeX_Main-Bold.waoOVXN0.ttf.br": { type: "font/ttf", encoding: "br", etag: '"70f1-5mLR3Dy4VhK0jxGs8wO1Emi58lM"', mtime: "2026-09-11T04:32:39.067Z", size: 28913, path: "../public/_nuxt/KaTeX_Main-Bold.waoOVXN0.ttf.br" }, "/_nuxt/DNV-kwhi.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"663-ni+BpbkIgULSGXMthOpHakyrozs"', mtime: "2026-09-11T04:32:39.036Z", size: 1635, path: "../public/_nuxt/DNV-kwhi.js.gz" }, "/_nuxt/KaTeX_Math-BoldItalic.B3XSjfu4.ttf.br": { type: "font/ttf", encoding: "br", etag: '"45c6-8nzODS7OyBluGV6qOUKHQU3a7VQ"', mtime: "2026-09-11T04:32:38.962Z", size: 17862, path: "../public/_nuxt/KaTeX_Math-BoldItalic.B3XSjfu4.ttf.br" }, "/_nuxt/KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf.br": { type: "font/ttf", encoding: "br", etag: '"3c1b-j0YCIEGZSVsc0QI4gXTRZ/QqAWw"', mtime: "2026-09-11T04:32:38.716Z", size: 15387, path: "../public/_nuxt/KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf.br" }, "/_nuxt/P4frLxaI.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"534-KGN9PtqCKf/P0QRppqWB0JyjcVE"', mtime: "2026-09-11T04:32:38.060Z", size: 1332, path: "../public/_nuxt/P4frLxaI.js.br" }, "/_nuxt/C0FnF6B9.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"26d-lcEAFOn/9cSuKwrbaYqaEhyGAF8"', mtime: "2026-09-11T04:32:39.036Z", size: 621, path: "../public/_nuxt/C0FnF6B9.js.br" }, "/_nuxt/DakktQPo.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"eba-Su/xJDsn3gi2o9qoonDuO9hX1Iw"', mtime: "2026-09-11T04:32:37.915Z", size: 3770, path: "../public/_nuxt/DakktQPo.js" }, "/_nuxt/DMK6l-5U.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"430-qbwM1Hg31y3B8OrQN3AGBVfrXu0"', mtime: "2026-09-11T04:32:37.914Z", size: 1072, path: "../public/_nuxt/DMK6l-5U.js" }, "/_nuxt/DDi7BBYG.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"9b35-JtmQUbd8uxqP7sBkWoqDkiYLGKw"', mtime: "2026-09-11T04:32:38.714Z", size: 39733, path: "../public/_nuxt/DDi7BBYG.js.br" }, "/_nuxt/browser.worker-DXeZGq5R.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"43b7-2Y4RUb3UYBt3BSjpHZS/aMeDbiI"', mtime: "2026-09-11T04:32:38.335Z", size: 17335, path: "../public/_nuxt/browser.worker-DXeZGq5R.js.gz" }, "/_nuxt/_id_.Bfli5g0z.css": { type: "text/css; charset=utf-8", encoding: null, etag: '"50f-plmxvttfCdno3UIfNeT9w98U92E"', mtime: "2026-09-11T04:32:37.911Z", size: 1295, path: "../public/_nuxt/_id_.Bfli5g0z.css" }, "/_nuxt/sql-wasm.DfANybxk.wasm.br": { type: "application/wasm", encoding: "br", etag: '"440d1-MDtHozsmIh4rmOprChtY+VWJpqI"', mtime: "2026-09-11T04:32:39.702Z", size: 278737, path: "../public/_nuxt/sql-wasm.DfANybxk.wasm.br" }, "/_nuxt/DClUiGwA.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"29a-UwhkArRZX1JleQs2JK+PAZTgdn0"', mtime: "2026-09-11T04:32:38.728Z", size: 666, path: "../public/_nuxt/DClUiGwA.js.br" }, "/_nuxt/KaTeX_Main-Italic.NWA7e6Wa.woff2": { type: "font/woff2", etag: '"425c-ybK1/9LyeqXGtvm6QaeytOZhAtM"', mtime: "2026-09-11T04:32:37.911Z", size: 16988, path: "../public/_nuxt/KaTeX_Main-Italic.NWA7e6Wa.woff2" }, "/_nuxt/Dq033PX3.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"12b6-7OzpzHsHSZa4QJBUXIM/IcPvb+A"', mtime: "2026-09-11T04:32:37.908Z", size: 4790, path: "../public/_nuxt/Dq033PX3.js" }, "/_nuxt/D33Hiyx4.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"1964-rovVFkDo6rBtSDL8c0gHgZNVdJI"', mtime: "2026-09-11T04:32:37.906Z", size: 6500, path: "../public/_nuxt/D33Hiyx4.js" }, "/_nuxt/KaTeX_SansSerif-Regular.DDBCnlJ7.woff2": { type: "font/woff2", etag: '"2868-5F1fT0p/L/PcqfzMLxSOeB4j8pI"', mtime: "2026-09-11T04:32:37.905Z", size: 10344, path: "../public/_nuxt/KaTeX_SansSerif-Regular.DDBCnlJ7.woff2" }, "/_nuxt/KaTeX_Caligraphic-Bold.ATXxdsX0.ttf.br": { type: "font/ttf", encoding: "br", etag: '"1c43-nM9bzRG+a20DM4kC5xBD7mMwtVU"', mtime: "2026-09-11T04:32:38.546Z", size: 7235, path: "../public/_nuxt/KaTeX_Caligraphic-Bold.ATXxdsX0.ttf.br" }, "/_nuxt/BgTQkGHw.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"18ce9-8Sv6jMH5oeji86H/A3pVffzTtIc"', mtime: "2026-09-11T04:32:38.872Z", size: 101609, path: "../public/_nuxt/BgTQkGHw.js.br" }, "/_nuxt/DZyAFy_C.js": { type: "text/javascript; charset=utf-8", etag: '"38d-QFC23I4lIl2KOQhNPJniO1MFRgY"', mtime: "2026-09-11T04:32:37.906Z", size: 909, path: "../public/_nuxt/DZyAFy_C.js" }, "/_nuxt/DtNPzvWu.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"2dc8-2uvA9J8yeKp2Bg8/9wVtbMTh80U"', mtime: "2026-09-11T04:32:37.919Z", size: 11720, path: "../public/_nuxt/DtNPzvWu.js" }, "/_nuxt/KaTeX_Size2-Regular.Dy4dx90m.woff2": { type: "font/woff2", etag: '"1458-7hhxNjSjvoyZcnaAhVKrGVpZj0M"', mtime: "2026-09-11T04:32:37.915Z", size: 5208, path: "../public/_nuxt/KaTeX_Size2-Regular.Dy4dx90m.woff2" }, "/_nuxt/Cmyvdx_-.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"563-Owd04sYY7+BdTc5UxrbyqXKLOvQ"', mtime: "2026-09-11T04:32:37.961Z", size: 1379, path: "../public/_nuxt/Cmyvdx_-.js.br" }, "/_nuxt/D1CiTnQp.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"131c6-5q8BhjArydK+5rAQRhKJz7YbphE"', mtime: "2026-09-11T04:32:38.035Z", size: 78278, path: "../public/_nuxt/D1CiTnQp.js.gz" }, "/_nuxt/-WKEmQhb.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"108a-natX+cHD330pTkImuXb6lLBCIIg"', mtime: "2026-09-11T04:32:38.782Z", size: 4234, path: "../public/_nuxt/-WKEmQhb.js.br" }, "/_nuxt/KaTeX_Fraktur-Bold.BdnERNNW.ttf.br": { type: "font/ttf", encoding: "br", etag: '"31c5-k6tqjzKdhFgo/79Ub/yLbD+1gPE"', mtime: "2026-09-11T04:32:38.790Z", size: 12741, path: "../public/_nuxt/KaTeX_Fraktur-Bold.BdnERNNW.ttf.br" }, "/_nuxt/BTJ8lpNB.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"10e1-g33dVxaZp6L56e5TEHUC6TnUKSw"', mtime: "2026-09-11T04:32:39.023Z", size: 4321, path: "../public/_nuxt/BTJ8lpNB.js.gz" }, "/_nuxt/lyDHIuzO.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"64c-L/0q933sc0ElNVFJb0o9NUayDTM"', mtime: "2026-09-11T04:32:38.634Z", size: 1612, path: "../public/_nuxt/lyDHIuzO.js.gz" }, "/_nuxt/Bif3aajk.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"6a3-mFEKuVcB8gN8uuq0ezZgykEQ3Yw"', mtime: "2026-09-11T04:32:39.023Z", size: 1699, path: "../public/_nuxt/Bif3aajk.js.gz" }, "/_nuxt/BtC09ozt.js": { type: "text/javascript; charset=utf-8", etag: '"65-P+qGBkIS2NOwVWWpvsXgl91va1I"', mtime: "2026-09-11T04:32:37.915Z", size: 101, path: "../public/_nuxt/BtC09ozt.js" }, "/_nuxt/CLXvOnT1.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"397-yjXjyTG76opkqNRwr/qGxsuN8pc"', mtime: "2026-09-11T04:32:38.904Z", size: 919, path: "../public/_nuxt/CLXvOnT1.js.gz" }, "/_nuxt/DXug_GbP.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"527-nuHFHIiVDGtWnapnqruhtW53mao"', mtime: "2026-09-11T04:32:38.875Z", size: 1319, path: "../public/_nuxt/DXug_GbP.js.br" }, "/_nuxt/BaPl6vKy.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"2a9-0MqO7JJ5nlipD8NFSdZu6l5gcas"', mtime: "2026-09-11T04:32:38.863Z", size: 681, path: "../public/_nuxt/BaPl6vKy.js.br" }, "/_nuxt/DHWHPuxT.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"8a4-f4Gc8nVOml+CmVIyt6mA37IWRhQ"', mtime: "2026-09-11T04:32:38.984Z", size: 2212, path: "../public/_nuxt/DHWHPuxT.js.gz" }, "/_nuxt/z4myVNlC.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"19e1a-m5XTgyp8b7GEBRnVpO7CLoi11Tc"', mtime: "2026-09-11T04:32:39.219Z", size: 106010, path: "../public/_nuxt/z4myVNlC.js.br" }, "/_nuxt/KaTeX_Size1-Regular.Dbsnue_I.ttf.br": { type: "font/ttf", encoding: "br", etag: '"1774-0FpTBf8xMxPHryw+jDY3Oy8aCmc"', mtime: "2026-09-11T04:32:38.848Z", size: 6004, path: "../public/_nuxt/KaTeX_Size1-Regular.Dbsnue_I.ttf.br" }, "/_nuxt/KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2": { type: "font/woff2", etag: '"1b00-W/pJysRs0derE1E4jTfBGvWbphU"', mtime: "2026-09-11T04:32:37.919Z", size: 6912, path: "../public/_nuxt/KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2" }, "/_nuxt/bsfWI-nE.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"1cd7-UTYQ+S0J5WFfZ6V0YGg5gWznEvE"', mtime: "2026-09-11T04:32:38.047Z", size: 7383, path: "../public/_nuxt/bsfWI-nE.js.gz" }, "/_nuxt/DqAPr7Mw.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"2864-raG87yVarOMUEa8GDnHLrNhlJY8"', mtime: "2026-09-11T04:32:38.035Z", size: 10340, path: "../public/_nuxt/DqAPr7Mw.js.br" }, "/_nuxt/Ca1NHEsT.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"218-irG4corlxpQyM6uRZFYPr+3fQJI"', mtime: "2026-09-11T04:32:37.987Z", size: 536, path: "../public/_nuxt/Ca1NHEsT.js.br" }, "/_nuxt/bsfWI-nE.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"6011-IBbTlHPtbRB0YgNqFsk8QUdjXgY"', mtime: "2026-09-11T04:32:37.916Z", size: 24593, path: "../public/_nuxt/bsfWI-nE.js" }, "/_nuxt/error-404.C3wqHTJz.css": { type: "text/css; charset=utf-8", encoding: null, etag: '"97d-bnuHySqHNw6hr3RxjvX1i4ng3W0"', mtime: "2026-09-11T04:32:37.915Z", size: 2429, path: "../public/_nuxt/error-404.C3wqHTJz.css" }, "/_nuxt/error-404.C3wqHTJz.css.gz": { type: "text/css; charset=utf-8", encoding: "gzip", etag: '"353-q3uaTVJNYoSHZsHyGtFZYnI/dVk"', mtime: "2026-09-11T04:32:38.059Z", size: 851, path: "../public/_nuxt/error-404.C3wqHTJz.css.gz" }, "/_nuxt/D3eL2sTE.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"30b-dgwQSyMfXMJMEw2Ib2el11hlMZo"', mtime: "2026-09-11T04:32:38.878Z", size: 779, path: "../public/_nuxt/D3eL2sTE.js.br" }, "/_nuxt/P4frLxaI.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"1002-fnD8Opz6Flg5uAlwQzC1OEbdrs0"', mtime: "2026-09-11T04:32:37.914Z", size: 4098, path: "../public/_nuxt/P4frLxaI.js" }, "/_nuxt/DOQDXZsa.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"20d8-izLbM8i8v0YnBlHWp1qMtMS/tEA"', mtime: "2026-09-11T04:32:37.911Z", size: 8408, path: "../public/_nuxt/DOQDXZsa.js" }, "/_nuxt/KiLc3yVa.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"3d7-GV/Dg+pHLiWcRFH/xS13nDbwjmg"', mtime: "2026-09-11T04:32:38.026Z", size: 983, path: "../public/_nuxt/KiLc3yVa.js.br" }, "/_nuxt/KaTeX_SansSerif-Regular.BNo7hRIc.ttf": { type: "font/ttf", encoding: null, etag: '"4bec-So4XoMtYqCKN1EF/vRuJnkHasEU"', mtime: "2026-09-11T04:32:37.910Z", size: 19436, path: "../public/_nuxt/KaTeX_SansSerif-Regular.BNo7hRIc.ttf" }, "/_nuxt/BrCCkkvX.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"75d-KU47UbSa4OA+4lrKLMouIJVtl/o"', mtime: "2026-09-11T04:32:39.023Z", size: 1885, path: "../public/_nuxt/BrCCkkvX.js.gz" }, "/_nuxt/B-D7dJ5g.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"17ed8-5woKhd5SwFp50IFL9jtw8eHQxl0"', mtime: "2026-09-11T04:32:37.906Z", size: 98008, path: "../public/_nuxt/B-D7dJ5g.js" }, "/_nuxt/KaTeX_SansSerif-Bold.CFMepnvq.ttf": { type: "font/ttf", encoding: null, etag: '"5fb8-ILRfU0a2htUsRFdFOT0XB7uI7B0"', mtime: "2026-09-11T04:32:37.906Z", size: 24504, path: "../public/_nuxt/KaTeX_SansSerif-Bold.CFMepnvq.ttf" }, "/_nuxt/8x4ij3rf.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"b3c-s3XfTzs5ka4mFBOtEXk6bP8dGIQ"', mtime: "2026-09-11T04:32:37.919Z", size: 2876, path: "../public/_nuxt/8x4ij3rf.js" }, "/_nuxt/omrco8F4.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"6ef-tFFDk9BRnvwz7h5OY3O5f5fkYnk"', mtime: "2026-09-11T04:32:38.128Z", size: 1775, path: "../public/_nuxt/omrco8F4.js.gz" }, "/_nuxt/KaTeX_SansSerif-Bold.DbIhKOiC.woff": { type: "font/woff", etag: '"3848-or7dyKPU0IAo1wd3btvU0k8uwPw"', mtime: "2026-09-11T04:32:37.915Z", size: 14408, path: "../public/_nuxt/KaTeX_SansSerif-Bold.DbIhKOiC.woff" }, "/_nuxt/BgTQkGHw.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"59d34-scjz8kGyMm+ZNccvGKWP2uiq4C0"', mtime: "2026-09-11T04:32:37.062Z", size: 367924, path: "../public/_nuxt/BgTQkGHw.js" }, "/_nuxt/Cwhw7OVi.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"994-7Kol2MASFz1pp0gloXmsfNAGols"', mtime: "2026-09-11T04:32:37.914Z", size: 2452, path: "../public/_nuxt/Cwhw7OVi.js" }, "/_nuxt/BkOLPXZH.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"427-3OdfnxqElGY9pBEpZaeda8gy4z8"', mtime: "2026-09-11T04:32:38.971Z", size: 1063, path: "../public/_nuxt/BkOLPXZH.js.br" }, "/_nuxt/C0-rP3Ca.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"2d76-n7rUgANlLvoqrtO/8TaVCwGtPMw"', mtime: "2026-09-11T04:32:38.146Z", size: 11638, path: "../public/_nuxt/C0-rP3Ca.js.gz" }, "/_nuxt/KaTeX_Size3-Regular.DgpXs0kz.ttf": { type: "font/ttf", encoding: null, etag: '"1da4-MCphsuzfgtOeZ4D0K9B+5M5nuNU"', mtime: "2026-09-11T04:32:37.906Z", size: 7588, path: "../public/_nuxt/KaTeX_Size3-Regular.DgpXs0kz.ttf" }, "/_nuxt/flashcards.ICvZV-Vm.png": { type: "image/png", etag: '"1b37-eysGq3nLNmrnTM4gH91qN2Sw7Xk"', mtime: "2026-09-11T04:32:37.910Z", size: 6967, path: "../public/_nuxt/flashcards.ICvZV-Vm.png" }, "/_nuxt/BTtBPxxM.js": { type: "text/javascript; charset=utf-8", etag: '"312-OvRbm4l2srAYspXiher9ZaOH2ss"', mtime: "2026-09-11T04:32:37.911Z", size: 786, path: "../public/_nuxt/BTtBPxxM.js" }, "/_nuxt/W5zwDZH1.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"46e-+q2y2dmmJ5yL37XcOTICN7wcaLE"', mtime: "2026-09-11T04:32:38.226Z", size: 1134, path: "../public/_nuxt/W5zwDZH1.js.br" }, "/_nuxt/YSTTKXwf.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"1659-tVblEhK7/1xjb+ICf86hPHX+4JI"', mtime: "2026-09-11T04:32:38.356Z", size: 5721, path: "../public/_nuxt/YSTTKXwf.js.gz" }, "/_nuxt/pdf.worker.TGcf_-kp.mjs.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"7347e-Aj2sNeIgnEHzuIGiNjtx0XN+ccE"', mtime: "2026-09-11T04:32:38.809Z", size: 472190, path: "../public/_nuxt/pdf.worker.TGcf_-kp.mjs.gz" }, "/_nuxt/KaTeX_SansSerif-Regular.BNo7hRIc.ttf.br": { type: "font/ttf", encoding: "br", etag: '"2de7-yPyAVy95ZgWm4uquiSnPOeZSqQA"', mtime: "2026-09-11T04:32:38.109Z", size: 11751, path: "../public/_nuxt/KaTeX_SansSerif-Regular.BNo7hRIc.ttf.br" }, "/_nuxt/first-run.xoV6d82S.css.br": { type: "text/css; charset=utf-8", encoding: "br", etag: '"210-zu758FcYpES6IBooJDtwQSoVmTo"', mtime: "2026-09-11T04:32:37.984Z", size: 528, path: "../public/_nuxt/first-run.xoV6d82S.css.br" }, "/_nuxt/KaTeX_SansSerif-Bold.CFMepnvq.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"3943-eVEi5upGT9HzPO6bTkn5kRXwUG4"', mtime: "2026-09-11T04:32:38.084Z", size: 14659, path: "../public/_nuxt/KaTeX_SansSerif-Bold.CFMepnvq.ttf.gz" }, "/_nuxt/CJR9iA_2.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"65b-XxW3tNZLsY21k1pf4yNKvQPubwA"', mtime: "2026-09-11T04:32:38.837Z", size: 1627, path: "../public/_nuxt/CJR9iA_2.js.gz" }, "/_nuxt/CYWUEkeD.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"468e-5dCB6aqGaUxOHb8uAkWu8NVE0wQ"', mtime: "2026-09-11T04:32:37.911Z", size: 18062, path: "../public/_nuxt/CYWUEkeD.js" }, "/_nuxt/omrco8F4.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"f79-nCSYrQjogy2T9Sah/oLqTWfWRVc"', mtime: "2026-09-11T04:32:37.910Z", size: 3961, path: "../public/_nuxt/omrco8F4.js" }, "/_nuxt/_id_.Bfli5g0z.css.br": { type: "text/css; charset=utf-8", encoding: "br", etag: '"1b8-PlNSkxl5Qa+jD2k88LAPHgThAP8"', mtime: "2026-09-11T04:32:38.021Z", size: 440, path: "../public/_nuxt/_id_.Bfli5g0z.css.br" }, "/_nuxt/Bwbix4wE.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"11278-Hx1+KOryLavQPGgfHALYM6+rTMc"', mtime: "2026-09-11T04:32:38.753Z", size: 70264, path: "../public/_nuxt/Bwbix4wE.js.br" }, "/_nuxt/Y6CevI7H.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"16b7-79TdBBj4DdFDZNLVynJjq3E4YBw"', mtime: "2026-09-11T04:32:39.033Z", size: 5815, path: "../public/_nuxt/Y6CevI7H.js.gz" }, "/_nuxt/ymJ5NHXU.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"7c7-/cCPgy3Zd6WIFYcOQ+uoDAFtvfg"', mtime: "2026-09-11T04:32:38.855Z", size: 1991, path: "../public/_nuxt/ymJ5NHXU.js.gz" }, "/_nuxt/KaTeX_Caligraphic-Regular.wX97UBjC.ttf": { type: "font/ttf", encoding: null, etag: '"3038-JvJqE+an0KabSPYqzTGoGWvOf24"', mtime: "2026-09-11T04:32:37.933Z", size: 12344, path: "../public/_nuxt/KaTeX_Caligraphic-Regular.wX97UBjC.ttf" }, "/_nuxt/KaTeX_Caligraphic-Bold.BEiXGLvX.woff": { type: "font/woff", etag: '"1e24-3SOsD7CsRpsGJEhep41wD2NhQgM"', mtime: "2026-09-11T04:32:37.929Z", size: 7716, path: "../public/_nuxt/KaTeX_Caligraphic-Bold.BEiXGLvX.woff" }, "/_nuxt/xAeXSfFd.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"1006-6VrvWSMyQhjiL+tqvMTVSCyB6rA"', mtime: "2026-09-11T04:32:37.907Z", size: 4102, path: "../public/_nuxt/xAeXSfFd.js" }, "/_nuxt/KaTeX_Main-BoldItalic.DzxPMmG6.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"4dc4-CKESiCP4dnGDI88ZwaxCd53qd5M"', mtime: "2026-09-11T04:32:38.916Z", size: 19908, path: "../public/_nuxt/KaTeX_Main-BoldItalic.DzxPMmG6.ttf.gz" }, "/_nuxt/C0-rP3Ca.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"991c-yDWX7GsZ0JvGxZId37SPYJkCOH8"', mtime: "2026-09-11T04:32:37.928Z", size: 39196, path: "../public/_nuxt/C0-rP3Ca.js" }, "/_nuxt/yGYSWVbr.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"2e3a-kmnAGlkJAY4oy5dO24Y5W91zZdQ"', mtime: "2026-09-11T04:32:37.925Z", size: 11834, path: "../public/_nuxt/yGYSWVbr.js" }, "/_nuxt/DNaw6KYU.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"753-Fn2tM1UVsbeAVnFprU5tsJ70fD0"', mtime: "2026-09-11T04:32:37.923Z", size: 1875, path: "../public/_nuxt/DNaw6KYU.js" }, "/_nuxt/KaTeX_Script-Regular.D5yQViql.woff": { type: "font/woff", etag: '"295c-agXNyk8fcIXmB9w4vt71V1P4b9g"', mtime: "2026-09-11T04:32:37.924Z", size: 10588, path: "../public/_nuxt/KaTeX_Script-Regular.D5yQViql.woff" }, "/_nuxt/Bqe5OFuP.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"327-0tY716rPWCP2LjF2Gu0dBnqZxng"', mtime: "2026-09-11T04:32:37.961Z", size: 807, path: "../public/_nuxt/Bqe5OFuP.js.br" }, "/_nuxt/CtVf1DiR.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"9cf-GbuISekjREyEUhzFqDunNva5/Cs"', mtime: "2026-09-11T04:32:37.967Z", size: 2511, path: "../public/_nuxt/CtVf1DiR.js.gz" }, "/_nuxt/yGYSWVbr.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"ea3-S6IkTpCSe8cb1GyIkGbFW/dmz+4"', mtime: "2026-09-11T04:32:38.222Z", size: 3747, path: "../public/_nuxt/yGYSWVbr.js.br" }, "/_nuxt/CYWUEkeD.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"181b-15SdGSitbZiOv+VoLtpyfkk0UGU"', mtime: "2026-09-11T04:32:38.125Z", size: 6171, path: "../public/_nuxt/CYWUEkeD.js.gz" }, "/_nuxt/worker.min.32WLk7pY.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"83ce-JoL+vg2bUvxOFVwwmXx7GblILm4"', mtime: "2026-09-11T04:32:38.661Z", size: 33742, path: "../public/_nuxt/worker.min.32WLk7pY.js.gz" }, "/_nuxt/ByWL3V-x.js": { type: "text/javascript; charset=utf-8", etag: '"37a-gZToA80o8P2mXRGxakqQNCfXTh8"', mtime: "2026-09-11T04:32:37.921Z", size: 890, path: "../public/_nuxt/ByWL3V-x.js" }, "/_nuxt/KaTeX_AMS-Regular.DRggAlZN.ttf": { type: "font/ttf", encoding: null, etag: '"f890-Hf0O5uMPihwjmZ2dll24cAtany4"', mtime: "2026-09-11T04:32:37.921Z", size: 63632, path: "../public/_nuxt/KaTeX_AMS-Regular.DRggAlZN.ttf" }, "/_nuxt/Cwhw7OVi.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"4b0-P2bgTwwKEGlS3oE6VbIUZsIoSkI"', mtime: "2026-09-11T04:32:38.127Z", size: 1200, path: "../public/_nuxt/Cwhw7OVi.js.gz" }, "/_nuxt/sql-wasm.DfANybxk.wasm": { type: "application/wasm", encoding: null, etag: '"a0bea-U9z84RUokQWWknmt5KxwjUhRqfQ"', mtime: "2026-09-11T04:32:37.107Z", size: 658410, path: "../public/_nuxt/sql-wasm.DfANybxk.wasm" }, "/_nuxt/W5zwDZH1.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"b69-zA/JISib/exOS1rKukArpSTqdNo"', mtime: "2026-09-11T04:32:37.920Z", size: 2921, path: "../public/_nuxt/W5zwDZH1.js" }, "/_nuxt/error-500.D6rBzoDj.css.gz": { type: "text/css; charset=utf-8", encoding: "gzip", etag: '"2d5-5MlU25PlHJ7cul9G5EpopWmu7mc"', mtime: "2026-09-11T04:32:38.992Z", size: 725, path: "../public/_nuxt/error-500.D6rBzoDj.css.gz" }, "/_nuxt/8x4ij3rf.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"4d9-KWkpFgWuo3bztTd1to1P/7EVZ4c"', mtime: "2026-09-11T04:32:38.084Z", size: 1241, path: "../public/_nuxt/8x4ij3rf.js.br" }, "/_nuxt/BEppUSYT.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"4fb-LRtRdpgOrl3WYKJ+BmYLJd+dmw8"', mtime: "2026-09-11T04:32:37.966Z", size: 1275, path: "../public/_nuxt/BEppUSYT.js.gz" }, "/_nuxt/YSTTKXwf.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"4368-50wqEtZmRQZV0PtO+SBQKLvtppE"', mtime: "2026-09-11T04:32:37.938Z", size: 17256, path: "../public/_nuxt/YSTTKXwf.js" }, "/_nuxt/KaTeX_Math-Italic.DA0__PXp.woff": { type: "font/woff", etag: '"493c-HBtIc54ctL4T3djAvCed3oUb26A"', mtime: "2026-09-11T04:32:37.935Z", size: 18748, path: "../public/_nuxt/KaTeX_Math-Italic.DA0__PXp.woff" }, "/_nuxt/DKEvlRFT.js": { type: "text/javascript; charset=utf-8", etag: '"d3-zpYXSz5FceXQ6brZ1Mcdh7RCFog"', mtime: "2026-09-11T04:32:37.934Z", size: 211, path: "../public/_nuxt/DKEvlRFT.js" }, "/_nuxt/Bip-Hqa3.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"1d01-7kbQ2EVqkP8XjsHzEWtOQ78Z09Y"', mtime: "2026-09-11T04:32:37.929Z", size: 7425, path: "../public/_nuxt/Bip-Hqa3.js" }, "/_nuxt/DtNPzvWu.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"b53-FW4mQ+buKHx4SaleUhJJZvvts3A"', mtime: "2026-09-11T04:32:38.055Z", size: 2899, path: "../public/_nuxt/DtNPzvWu.js.br" }, "/_nuxt/3iSiVjmt.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"11fa-nHyrjF9D3j7zqnrnV3/9m6/viWU"', mtime: "2026-09-11T04:32:38.913Z", size: 4602, path: "../public/_nuxt/3iSiVjmt.js.br" }, "/_nuxt/C1OZectE.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"2019-zGD1Guaj41IIUX0CpHhagGw7W+o"', mtime: "2026-09-11T04:32:37.985Z", size: 8217, path: "../public/_nuxt/C1OZectE.js.br" }, "/_nuxt/Cx9_0Zxu.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"624-g6E98/QeMhaDdMKTsdHjas4b568"', mtime: "2026-09-11T04:32:37.956Z", size: 1572, path: "../public/_nuxt/Cx9_0Zxu.js.gz" }, "/_nuxt/C1bbhg3s.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"734-XK0sTVzDKNE5qjqlptaxZks1KII"', mtime: "2026-09-11T04:32:38.756Z", size: 1844, path: "../public/_nuxt/C1bbhg3s.js.gz" }, "/_nuxt/CYOK9Egh.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"941-GE3bKR5p1VLM679gNR98PqyrrwE"', mtime: "2026-09-11T04:32:39.004Z", size: 2369, path: "../public/_nuxt/CYOK9Egh.js.gz" }, "/_nuxt/KaTeX_Math-BoldItalic.iY-2wyZ7.woff": { type: "font/woff", etag: '"48ec-1U5kgNbUBGxqVhmqODuqWXH7igw"', mtime: "2026-09-11T04:32:37.925Z", size: 18668, path: "../public/_nuxt/KaTeX_Math-BoldItalic.iY-2wyZ7.woff" }, "/_nuxt/D9X70ea_.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"2e5-H4Fqryq7x/5UAbqEtvrL0Tu9pqs"', mtime: "2026-09-11T04:32:37.961Z", size: 741, path: "../public/_nuxt/D9X70ea_.js.br" }, "/_nuxt/browser.worker-DXeZGq5R.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"cd3c-UH6IlDhSttQLHSZPMF0v0J9Un48"', mtime: "2026-09-11T04:32:37.928Z", size: 52540, path: "../public/_nuxt/browser.worker-DXeZGq5R.js" }, "/_nuxt/DDi7BBYG.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"2bb72-wjE4H2goFbBFoILpbCaKcU6bV1Y"', mtime: "2026-09-11T04:32:37.066Z", size: 179058, path: "../public/_nuxt/DDi7BBYG.js" }, "/_nuxt/KaTeX_Size2-Regular.oD1tc_U0.woff": { type: "font/woff", etag: '"182c-RmmP8YGb0ngm/V0txLpOH2PKzfQ"', mtime: "2026-09-11T04:32:37.919Z", size: 6188, path: "../public/_nuxt/KaTeX_Size2-Regular.oD1tc_U0.woff" }, "/_nuxt/KaTeX_Main-BoldItalic.SpSLRI95.woff": { type: "font/woff", etag: '"4bd4-A4u9yIh6lzCtlBR/xXxv9N+0hBE"', mtime: "2026-09-11T04:32:37.921Z", size: 19412, path: "../public/_nuxt/KaTeX_Main-BoldItalic.SpSLRI95.woff" }, "/_nuxt/xAeXSfFd.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"3b2-DiNLq84g/31nbcKkGbNyuDdmWCg"', mtime: "2026-09-11T04:32:38.202Z", size: 946, path: "../public/_nuxt/xAeXSfFd.js.br" }, "/_nuxt/pdf.worker.TGcf_-kp.mjs": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"220109-BmOc6dyygQbsea4ORHuHvcIX9+M"', mtime: "2026-09-11T04:32:37.106Z", size: 2228489, path: "../public/_nuxt/pdf.worker.TGcf_-kp.mjs" }, "/_nuxt/3i8JKPp4.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"263-8ZJdUClfZHKppygS+iWgecx0leA"', mtime: "2026-09-11T04:32:38.760Z", size: 611, path: "../public/_nuxt/3i8JKPp4.js.br" }, "/_nuxt/BfMudgLE.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"1f76-C6lNbtM4KhOfvD0c3W+6owP8KqY"', mtime: "2026-09-11T04:32:37.967Z", size: 8054, path: "../public/_nuxt/BfMudgLE.js.gz" }, "/_nuxt/C7y-hBT4.js": { type: "text/javascript; charset=utf-8", etag: '"14c-QbSjTLKo1t3kKGvZ+7brkKgoyF0"', mtime: "2026-09-11T04:32:37.919Z", size: 332, path: "../public/_nuxt/C7y-hBT4.js" }, "/_nuxt/KaTeX_Caligraphic-Regular.Di6jR-x-.woff2": { type: "font/woff2", etag: '"1afc-n4B34LOKKQzZt7E2sKwpyDdegaY"', mtime: "2026-09-11T04:32:37.938Z", size: 6908, path: "../public/_nuxt/KaTeX_Caligraphic-Regular.Di6jR-x-.woff2" }, "/_nuxt/CY_WsQ5S.js": { type: "text/javascript; charset=utf-8", etag: '"33c-c8X2LDNqlIRMvHtHSAJaM/h5AgA"', mtime: "2026-09-11T04:32:37.934Z", size: 828, path: "../public/_nuxt/CY_WsQ5S.js" }, "/_nuxt/KaTeX_Caligraphic-Bold.ATXxdsX0.ttf": { type: "font/ttf", encoding: null, etag: '"3050-j6tziha6j7fnACoHXwNqRVpFxug"', mtime: "2026-09-11T04:32:37.934Z", size: 12368, path: "../public/_nuxt/KaTeX_Caligraphic-Bold.ATXxdsX0.ttf" }, "/_nuxt/KaTeX_Fraktur-Regular.CB_wures.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"33e7-+JI6nyLU0fvgv9zjdi70TEW9uE4"', mtime: "2026-09-11T04:32:38.997Z", size: 13287, path: "../public/_nuxt/KaTeX_Fraktur-Regular.CB_wures.ttf.gz" }, "/_nuxt/DH04fbtw.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"f827-hgnViN4OlSOzlpPwW13p9UYM238"', mtime: "2026-09-11T04:32:39.014Z", size: 63527, path: "../public/_nuxt/DH04fbtw.js.gz" }, "/_nuxt/CwHFm-oR.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"1f8-2SrpCEJbezaFAppx5xkYno+VfBo"', mtime: "2026-09-11T04:32:39.004Z", size: 504, path: "../public/_nuxt/CwHFm-oR.js.br" }, "/_nuxt/CTjMpgdN.js": { type: "text/javascript; charset=utf-8", etag: '"318-JLHb2/AQskw1mOKFVkYGYj105JU"', mtime: "2026-09-11T04:32:37.934Z", size: 792, path: "../public/_nuxt/CTjMpgdN.js" }, "/_nuxt/KaTeX_AMS-Regular.DMm9YOAa.woff": { type: "font/woff", etag: '"82ec-ma2i3jIA55UUPWOSMsNESwgBgjU"', mtime: "2026-09-11T04:32:37.934Z", size: 33516, path: "../public/_nuxt/KaTeX_AMS-Regular.DMm9YOAa.woff" }, "/_nuxt/z4myVNlC.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"6935d-vPfzP7jy2ONzE8/M4f/3zn+d9HU"', mtime: "2026-09-11T04:32:37.084Z", size: 430941, path: "../public/_nuxt/z4myVNlC.js" }, "/_nuxt/KaTeX_Size2-Regular.B7gKUWhC.ttf": { type: "font/ttf", encoding: null, etag: '"2cf4-+vc/8+eVGE5UMWZv+v64qg4og00"', mtime: "2026-09-11T04:32:37.938Z", size: 11508, path: "../public/_nuxt/KaTeX_Size2-Regular.B7gKUWhC.ttf" }, "/_nuxt/KaTeX_SansSerif-Italic.YYjJ1zSn.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"37fb-WUCTbLHuCxv8dMucvaa6jYvfY8U"', mtime: "2026-09-11T04:32:38.790Z", size: 14331, path: "../public/_nuxt/KaTeX_SansSerif-Italic.YYjJ1zSn.ttf.gz" }, "/_nuxt/MarkdownRenderer.CEk2HVtF.css.br": { type: "text/css; charset=utf-8", encoding: "br", etag: '"2ba-OW24012CXUYvMqhPHgFuhFnZpkI"', mtime: "2026-09-11T04:32:37.998Z", size: 698, path: "../public/_nuxt/MarkdownRenderer.CEk2HVtF.css.br" }, "/_nuxt/DJIE5NFf.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"3f5c-DH4uXj37afy7ICfSj0kvg71R5As"', mtime: "2026-09-11T04:32:37.939Z", size: 16220, path: "../public/_nuxt/DJIE5NFf.js" }, "/_nuxt/CkxMmgaC.js": { type: "text/javascript; charset=utf-8", etag: '"175-sMl3U1eIdW+bEc+bo/Fhkuwt1sA"', mtime: "2026-09-11T04:32:37.939Z", size: 373, path: "../public/_nuxt/CkxMmgaC.js" }, "/_nuxt/worker.min.32WLk7pY.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"1b2cb-/N/GkNdd+o0+EhsLNbRj99yr/Dg"', mtime: "2026-09-11T04:32:37.934Z", size: 111307, path: "../public/_nuxt/worker.min.32WLk7pY.js" }, "/_nuxt/lyDHIuzO.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"f37-2/dEBLNYN+uo3LNrXXh5lr7733U"', mtime: "2026-09-11T04:32:37.934Z", size: 3895, path: "../public/_nuxt/lyDHIuzO.js" }, "/_nuxt/CoT1qCUq.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"69f9-80HgbBLxNnVTkVKYZehsMTKwghA"', mtime: "2026-09-11T04:32:38.111Z", size: 27129, path: "../public/_nuxt/CoT1qCUq.js.br" }, "/_nuxt/KaTeX_Math-Italic.flOr_0UB.ttf": { type: "font/ttf", encoding: null, etag: '"7a4c-npoQ2Ppa2Iyez6SQKt3U2SWAsrw"', mtime: "2026-09-11T04:32:37.933Z", size: 31308, path: "../public/_nuxt/KaTeX_Math-Italic.flOr_0UB.ttf" }, "/_nuxt/KaTeX_Size4-Regular.Dl5lxZxV.woff2": { type: "font/woff2", etag: '"1340-m+0X+5LyZQUB4imGLEDGQH4cVSg"', mtime: "2026-09-11T04:32:37.928Z", size: 4928, path: "../public/_nuxt/KaTeX_Size4-Regular.Dl5lxZxV.woff2" }, "/_nuxt/KaTeX_AMS-Regular.DRggAlZN.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"8809-YtZQ15mRlAeUedn9MEpAgToA+Dg"', mtime: "2026-09-11T04:32:38.229Z", size: 34825, path: "../public/_nuxt/KaTeX_AMS-Regular.DRggAlZN.ttf.gz" }, "/_nuxt/B-D7dJ5g.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"546d-1wESqc5zG+/kKXuBd+2lF+U0UXI"', mtime: "2026-09-11T04:32:38.227Z", size: 21613, path: "../public/_nuxt/B-D7dJ5g.js.br" }, "/_nuxt/KaTeX_Fraktur-Bold.BdnERNNW.ttf": { type: "font/ttf", encoding: null, etag: '"4c80-TgjdADgxJOfNlpcMyw++NcnvqqM"', mtime: "2026-09-11T04:32:37.924Z", size: 19584, path: "../public/_nuxt/KaTeX_Fraktur-Bold.BdnERNNW.ttf" }, "/_nuxt/KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf": { type: "font/ttf", encoding: null, etag: '"6ba4-YpuZ+vGNl1KfIaGxAYCT5gvNBY8"', mtime: "2026-09-11T04:32:37.928Z", size: 27556, path: "../public/_nuxt/KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf" }, "/_nuxt/DClUiGwA.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"605-1gY2DYxPVBvKbxdB1JANvAn726U"', mtime: "2026-09-11T04:32:37.925Z", size: 1541, path: "../public/_nuxt/DClUiGwA.js" }, "/_nuxt/KaTeX_Fraktur-Bold.BsDP51OF.woff": { type: "font/woff", etag: '"33f0-W7r9UB8mIhlCavfyDBEDu0tzJZI"', mtime: "2026-09-11T04:32:37.924Z", size: 13296, path: "../public/_nuxt/KaTeX_Fraktur-Bold.BsDP51OF.woff" }, "/_nuxt/3i8JKPp4.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"51d-1webLrjw98lal6VJKn+CENP/E8c"', mtime: "2026-09-11T04:32:37.923Z", size: 1309, path: "../public/_nuxt/3i8JKPp4.js" }, "/_nuxt/entry.DpS-p5p_.css.gz": { type: "text/css; charset=utf-8", encoding: "gzip", etag: '"4dc2-dwq/yxKYYB4Q4eoHDmQc7fI8PO8"', mtime: "2026-09-11T04:32:38.898Z", size: 19906, path: "../public/_nuxt/entry.DpS-p5p_.css.gz" }, "/_nuxt/KaTeX_Main-Regular.ypZvNtVU.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"7be4-CcYmW5R3v7ANE3lLwTmTo+pe9TA"', mtime: "2026-09-11T04:32:38.804Z", size: 31716, path: "../public/_nuxt/KaTeX_Main-Regular.ypZvNtVU.ttf.gz" }, "/_nuxt/lVNn4F3S.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"114f-OXKyKsURm+60K9d+6aACe/TsxGg"', mtime: "2026-09-11T04:32:38.916Z", size: 4431, path: "../public/_nuxt/lVNn4F3S.js.gz" }, "/_nuxt/CSvmdMId.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"73f-stJ1DN/Nam6gtPEZmKrTea1FanY"', mtime: "2026-09-11T04:32:38.837Z", size: 1855, path: "../public/_nuxt/CSvmdMId.js.br" }, "/_nuxt/DMK6l-5U.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"1b7-IKOmwfrS5KksMqrOLQh2fPVTWpg"', mtime: "2026-09-11T04:32:38.007Z", size: 439, path: "../public/_nuxt/DMK6l-5U.js.gz" }, "/_nuxt/KaTeX_Size2-Regular.B7gKUWhC.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"17db-Od8GhP+Ck/9f1O+2z93MbqtQ1fg"', mtime: "2026-09-11T04:32:38.577Z", size: 6107, path: "../public/_nuxt/KaTeX_Size2-Regular.B7gKUWhC.ttf.gz" }, "/_nuxt/KaTeX_Size3-Regular.DgpXs0kz.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"10ba-jmryt+Uew6wkQMSpJBqnDnfaTcA"', mtime: "2026-09-11T04:32:38.112Z", size: 4282, path: "../public/_nuxt/KaTeX_Size3-Regular.DgpXs0kz.ttf.gz" }, "/_nuxt/C1bbhg3s.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"1081-HkIeYtnxvu1i+pzrSrFXMkON8rA"', mtime: "2026-09-11T04:32:37.921Z", size: 4225, path: "../public/_nuxt/C1bbhg3s.js" }, "/_nuxt/KaTeX_SansSerif-Regular.CS6fqUqJ.woff": { type: "font/woff", etag: '"301c-gEYQ9MsuLq2WlLjaLshOzo0Jw40"', mtime: "2026-09-11T04:32:37.920Z", size: 12316, path: "../public/_nuxt/KaTeX_SansSerif-Regular.CS6fqUqJ.woff" }, "/_nuxt/-WKEmQhb.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"363e-4637KTvSRLJKmR9pVnc1QIM1GNg"', mtime: "2026-09-11T04:32:37.914Z", size: 13886, path: "../public/_nuxt/-WKEmQhb.js" }, "/_nuxt/DOQDXZsa.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"c3b-tVX1YQ8o5BzcNxnoyudgVYuyLYs"', mtime: "2026-09-11T04:32:38.060Z", size: 3131, path: "../public/_nuxt/DOQDXZsa.js.br" }, "/_nuxt/DuqgYnXA.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"233-0bGgl4r484Jk+HxVFCGquZWRLpE"', mtime: "2026-09-11T04:32:38.819Z", size: 563, path: "../public/_nuxt/DuqgYnXA.js.br" }, "/_nuxt/DmwaeKks.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"c57-3HUQ4Fc6DC64rvra+ckk5d7+T7c"', mtime: "2026-09-11T04:32:37.916Z", size: 3159, path: "../public/_nuxt/DmwaeKks.js" }, "/_nuxt/BMF2dx8Y.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"2162-MrivI3h0d+VUOKmsNCCZr1WyRTY"', mtime: "2026-09-11T04:32:38.898Z", size: 8546, path: "../public/_nuxt/BMF2dx8Y.js.br" }, "/_nuxt/KaTeX_SansSerif-Italic.YYjJ1zSn.ttf": { type: "font/ttf", encoding: null, etag: '"575c-mR+9wDFouxSkRHz6PlFfCabs/tw"', mtime: "2026-09-11T04:32:37.915Z", size: 22364, path: "../public/_nuxt/KaTeX_SansSerif-Italic.YYjJ1zSn.ttf" }, "/_nuxt/KaTeX_Main-Regular.ypZvNtVU.ttf": { type: "font/ttf", encoding: null, etag: '"d14c-h0TbbvjDCePchfG76YBSCti3v9Q"', mtime: "2026-09-11T04:32:37.914Z", size: 53580, path: "../public/_nuxt/KaTeX_Main-Regular.ypZvNtVU.ttf" }, "/_nuxt/DNaw6KYU.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"315-htq1Icmrpu8eFu9af+Zk0OhFlVI"', mtime: "2026-09-11T04:32:38.219Z", size: 789, path: "../public/_nuxt/DNaw6KYU.js.gz" }, "/_nuxt/DakktQPo.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"6a6-VvCZ/ZMOUTJrMx1gqaSFuG6zmF4"', mtime: "2026-09-11T04:32:38.007Z", size: 1702, path: "../public/_nuxt/DakktQPo.js.gz" }, "/_nuxt/DIckivU5.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"16f71-lm3uhxt2VzPC85E4e/a84LfVCS0"', mtime: "2026-09-11T04:32:37.997Z", size: 94065, path: "../public/_nuxt/DIckivU5.js.gz" }, "/_nuxt/58j6fSHb.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"186e-1VCiRlHFs/NyjIqqV/PAULLYgDM"', mtime: "2026-09-11T04:32:37.912Z", size: 6254, path: "../public/_nuxt/58j6fSHb.js" }, "/_nuxt/B8DElJvO.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"2ae-Ie2dbD7+hz0zUQXSTUxl02QokVM"', mtime: "2026-09-11T04:32:37.979Z", size: 686, path: "../public/_nuxt/B8DElJvO.js.br" }, "/_nuxt/KaTeX_Size4-Regular.DWFBv043.ttf": { type: "font/ttf", encoding: null, etag: '"287c-PY2d1YoDt6RtSX9XYeYNi4RKUZk"', mtime: "2026-09-11T04:32:37.910Z", size: 10364, path: "../public/_nuxt/KaTeX_Size4-Regular.DWFBv043.ttf" }, "/_nuxt/KaTeX_Caligraphic-Regular.CTRA-rTL.woff": { type: "font/woff", etag: '"1de8-Gm85vXDJt0cTB431991hCPm604s"', mtime: "2026-09-11T04:32:37.910Z", size: 7656, path: "../public/_nuxt/KaTeX_Caligraphic-Regular.CTRA-rTL.woff" }, "/_nuxt/P4frLxaI.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"5a2-tfbd5Cuqy/F0qX1bM+mYhLRolK4"', mtime: "2026-09-11T04:32:38.059Z", size: 1442, path: "../public/_nuxt/P4frLxaI.js.gz" }, "/_nuxt/DuqgYnXA.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"4bd-ZHrnxLNJJu72LtByg24+uE8T0oM"', mtime: "2026-09-11T04:32:37.916Z", size: 1213, path: "../public/_nuxt/DuqgYnXA.js" }, "/_nuxt/CNs_Ozdc.js": { type: "text/javascript; charset=utf-8", etag: '"1b-1MHUJYdBtOvbvPMaiQxDXp3lHyw"', mtime: "2026-09-11T04:32:37.915Z", size: 27, path: "../public/_nuxt/CNs_Ozdc.js" }, "/_nuxt/KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"3fe8-Q04J4UE+xINfZSmCO6rb4pNvmF8"', mtime: "2026-09-11T04:32:38.720Z", size: 16360, path: "../public/_nuxt/KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf.gz" }, "/_nuxt/C0FnF6B9.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"2c8-5Su++M6BT0HB97a3kZqfJBIrq3k"', mtime: "2026-09-11T04:32:39.033Z", size: 712, path: "../public/_nuxt/C0FnF6B9.js.gz" }, "/_nuxt/DNV-kwhi.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"5b4-6Q3LoH9pmYiNHLnteLs3j68YUs0"', mtime: "2026-09-11T04:32:39.049Z", size: 1460, path: "../public/_nuxt/DNV-kwhi.js.br" }, "/_nuxt/KaTeX_Math-BoldItalic.B3XSjfu4.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"4a89-1mm019AsC9ziM9nOUiSKiGdmyp8"', mtime: "2026-09-11T04:32:38.913Z", size: 19081, path: "../public/_nuxt/KaTeX_Math-BoldItalic.B3XSjfu4.ttf.gz" }, "/_nuxt/_id_-flashcards.Brokb39F.css.gz": { type: "text/css; charset=utf-8", encoding: "gzip", etag: '"180-L4CRBHx1sjelJtdhlTtjYryxmJQ"', mtime: "2026-09-11T04:32:38.967Z", size: 384, path: "../public/_nuxt/_id_-flashcards.Brokb39F.css.gz" }, "/_nuxt/KaTeX_Main-Bold.waoOVXN0.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"783d-XoOfkxjmO5aeU2tAtyN7HArygXY"', mtime: "2026-09-11T04:32:38.960Z", size: 30781, path: "../public/_nuxt/KaTeX_Main-Bold.waoOVXN0.ttf.gz" }, "/_nuxt/C3_xuxG1.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"c0c-+Qw5WxOJJ8y63RJaO4O/AgErgvQ"', mtime: "2026-09-11T04:32:37.967Z", size: 3084, path: "../public/_nuxt/C3_xuxG1.js.br" }, "/_nuxt/Dq033PX3.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"760-dEx1ooUCay24wxe0xPyW4Fe4V8c"', mtime: "2026-09-11T04:32:38.035Z", size: 1888, path: "../public/_nuxt/Dq033PX3.js.br" }, "/_nuxt/KaTeX_Main-Italic.3WenGoN9.ttf.br": { type: "font/ttf", encoding: "br", etag: '"49bd-MmE8abmFI3P4W95YtRolhVr+cy0"', mtime: "2026-09-11T04:32:38.087Z", size: 18877, path: "../public/_nuxt/KaTeX_Main-Italic.3WenGoN9.ttf.br" }, "/_nuxt/KaTeX_Size1-Regular.Dbsnue_I.ttf": { type: "font/ttf", encoding: null, etag: '"2fc4-MoC6y8sSRZcf4BAXtHTHbDN8EMk"', mtime: "2026-09-11T04:32:37.914Z", size: 12228, path: "../public/_nuxt/KaTeX_Size1-Regular.Dbsnue_I.ttf" }, "/_nuxt/BANQB8Nb.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"11c0-GliiEGz+jHB0e3WSIAWGH7iaVVw"', mtime: "2026-09-11T04:32:37.961Z", size: 4544, path: "../public/_nuxt/BANQB8Nb.js.gz" }, "/_nuxt/CSvmdMId.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"12e3-RCIrNuTymZaiVnLuzrxB2GkkV5U"', mtime: "2026-09-11T04:32:37.911Z", size: 4835, path: "../public/_nuxt/CSvmdMId.js" }, "/_nuxt/DAEfPZzO.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"a6e-9Ksfyiid1IxyrDy8qDEUTiL3Q6I"', mtime: "2026-09-11T04:32:38.863Z", size: 2670, path: "../public/_nuxt/DAEfPZzO.js.gz" }, "/_nuxt/Dd1vPuSX.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"1c26-4PXkGdMXyno5WV/7X+/uYZyTZbk"', mtime: "2026-09-11T04:32:39.031Z", size: 7206, path: "../public/_nuxt/Dd1vPuSX.js.gz" }, "/_nuxt/CJR9iA_2.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"db1-l2XdBAmH0UomH/Kq13TKSw6+L8c"', mtime: "2026-09-11T04:32:37.911Z", size: 3505, path: "../public/_nuxt/CJR9iA_2.js" }, "/_nuxt/58j6fSHb.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"98b-p24BuEq7CStHEiIDD+WA7Rx3ke0"', mtime: "2026-09-11T04:32:38.804Z", size: 2443, path: "../public/_nuxt/58j6fSHb.js.br" }, "/_nuxt/KaTeX_Size4-Regular.DWFBv043.ttf.br": { type: "font/ttf", encoding: "br", etag: '"1588-HcY1OGyLXxyoUmOM3WTGkt003Pc"', mtime: "2026-09-11T04:32:38.837Z", size: 5512, path: "../public/_nuxt/KaTeX_Size4-Regular.DWFBv043.ttf.br" }, "/_nuxt/_I7zX1hp.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"4e1-pZD0rZv8JATQC/jd1gBlM7x3hDw"', mtime: "2026-09-11T04:32:38.872Z", size: 1249, path: "../public/_nuxt/_I7zX1hp.js.br" }, "/_nuxt/KaTeX_Main-Bold.Jm3AIy58.woff": { type: "font/woff", etag: '"74d8-9po2JQ6ubooCFzqZCapihCi6IGA"', mtime: "2026-09-11T04:32:37.939Z", size: 29912, path: "../public/_nuxt/KaTeX_Main-Bold.Jm3AIy58.woff" }, "/_nuxt/KaTeX_Size4-Regular.BF-4gkZK.woff": { type: "font/woff", etag: '"175c-j93bg1E+wiYjHr7gUHnsRfwBNXg"', mtime: "2026-09-11T04:32:37.938Z", size: 5980, path: "../public/_nuxt/KaTeX_Size4-Regular.BF-4gkZK.woff" }, "/_nuxt/BuNPglMN.js": { type: "text/javascript; charset=utf-8", etag: '"1fb-234US/TU0xCp5x5MX0cgiqquvF0"', mtime: "2026-09-11T04:32:37.939Z", size: 507, path: "../public/_nuxt/BuNPglMN.js" }, "/_nuxt/BMF2dx8Y.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"607d-f2AQkoDlyVh1TyzEB5FfJd7du2U"', mtime: "2026-09-11T04:32:37.934Z", size: 24701, path: "../public/_nuxt/BMF2dx8Y.js" }, "/_nuxt/Bip-Hqa3.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"b25-6dC2xY2yRg6leD0lyXHRj8CsAXc"', mtime: "2026-09-11T04:32:38.335Z", size: 2853, path: "../public/_nuxt/Bip-Hqa3.js.gz" }, "/_nuxt/KaTeX_Caligraphic-Regular.wX97UBjC.ttf.br": { type: "font/ttf", encoding: "br", etag: '"1c07-Q3RwoZmxkpveT9n6kz9Mvn43i0Q"', mtime: "2026-09-11T04:32:38.201Z", size: 7175, path: "../public/_nuxt/KaTeX_Caligraphic-Regular.wX97UBjC.ttf.br" }, "/_nuxt/ymJ5NHXU.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"12e4-4Vp9LkX3wqqTBp22SVnTa4bPIa4"', mtime: "2026-09-11T04:32:37.934Z", size: 4836, path: "../public/_nuxt/ymJ5NHXU.js" }, "/_nuxt/KaTeX_Script-Regular.C5JkGWo-.ttf.br": { type: "font/ttf", encoding: "br", etag: '"273f-Y88MqegTAJ+laWvqVi+6b/UWQpo"', mtime: "2026-09-11T04:32:38.961Z", size: 10047, path: "../public/_nuxt/KaTeX_Script-Regular.C5JkGWo-.ttf.br" }, "/_nuxt/DfU9rPl0.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"101d-ZcCkQE8I9u1jinEyzR4xvEed5RE"', mtime: "2026-09-11T04:32:37.961Z", size: 4125, path: "../public/_nuxt/DfU9rPl0.js.gz" }, "/_nuxt/D33Hiyx4.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"8d7-cBfckVoZP9OaPYr0HAKkowC0dZs"', mtime: "2026-09-11T04:32:38.036Z", size: 2263, path: "../public/_nuxt/D33Hiyx4.js.br" }, "/_nuxt/KaTeX_Math-Italic.flOr_0UB.ttf.br": { type: "font/ttf", encoding: "br", etag: '"465b-VOxCLGfG0i3FpTtct5KAz9rtSEA"', mtime: "2026-09-11T04:32:38.752Z", size: 18011, path: "../public/_nuxt/KaTeX_Math-Italic.flOr_0UB.ttf.br" }, "/_nuxt/CenSu9pQ.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"769-KgoftrUXlRCDUxpF1Hmgsp3sTmo"', mtime: "2026-09-11T04:32:38.878Z", size: 1897, path: "../public/_nuxt/CenSu9pQ.js.gz" }, "/_nuxt/DJIE5NFf.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"1259-7Dpt+nQ8cLbWyvvRoT8dkfN44Ec"', mtime: "2026-09-11T04:32:38.617Z", size: 4697, path: "../public/_nuxt/DJIE5NFf.js.br" }, "/_nuxt/DmwaeKks.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"553-/pE5HcTw/S2KEx1EYqIoAt51rWQ"', mtime: "2026-09-11T04:32:38.779Z", size: 1363, path: "../public/_nuxt/DmwaeKks.js.br" }, "/_nuxt/BP61iLYe.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"508-kJt5NTmhnQwTWQjjwm/1mNfG28I"', mtime: "2026-09-11T04:32:37.961Z", size: 1288, path: "../public/_nuxt/BP61iLYe.js.br" }, "/_nuxt/D3eL2sTE.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"380-CymSMEqv73frlAuxSbVqhn2cfNU"', mtime: "2026-09-11T04:32:38.874Z", size: 896, path: "../public/_nuxt/D3eL2sTE.js.gz" }, "/_nuxt/BrCCkkvX.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"69f-uX9Yfen7BV7lWqVmxIzzG+xCXa4"', mtime: "2026-09-11T04:32:39.020Z", size: 1695, path: "../public/_nuxt/BrCCkkvX.js.br" }, "/_nuxt/KiLc3yVa.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"441-hEXOXWxrPhEeUtSKP5OeRIyz9xk"', mtime: "2026-09-11T04:32:38.008Z", size: 1089, path: "../public/_nuxt/KiLc3yVa.js.gz" }, "/_nuxt/error-404.C3wqHTJz.css.br": { type: "text/css; charset=utf-8", encoding: "br", etag: '"2d5-PAc2V6WVGVmSd4owwK5yRhaDlg4"', mtime: "2026-09-11T04:32:38.060Z", size: 725, path: "../public/_nuxt/error-404.C3wqHTJz.css.br" }, "/_nuxt/DUEfs9ab.js": { type: "text/javascript; charset=utf-8", etag: '"1b9-cy3jFD4ibX5daC1bZMxDoSXMH8o"', mtime: "2026-09-11T04:32:37.935Z", size: 441, path: "../public/_nuxt/DUEfs9ab.js" }, "/_nuxt/BaPl6vKy.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"52a-XQJm/6kRjfKD2u5wsDsiIjqZnec"', mtime: "2026-09-11T04:32:37.938Z", size: 1322, path: "../public/_nuxt/BaPl6vKy.js" }, "/_nuxt/DAEfPZzO.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"15d6-KXLs3uvE2d+w7SZ/YMKcrA+IZmI"', mtime: "2026-09-11T04:32:37.934Z", size: 5590, path: "../public/_nuxt/DAEfPZzO.js" }, "/_nuxt/DqAPr7Mw.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"2d5e-jyUVKu1zKXfwvepVpS8XLrYRCpA"', mtime: "2026-09-11T04:32:37.979Z", size: 11614, path: "../public/_nuxt/DqAPr7Mw.js.gz" }, "/_nuxt/KaTeX_SansSerif-Italic.C3H0VqGB.woff2": { type: "font/woff2", etag: '"2efc-PV+jyzCfjYO03L3SdyXycPYPPus"', mtime: "2026-09-11T04:32:37.934Z", size: 12028, path: "../public/_nuxt/KaTeX_SansSerif-Italic.C3H0VqGB.woff2" }, "/_nuxt/_I7zX1hp.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"b46-+NIxvNcp+o2vxjDXOFWXE9CbYG8"', mtime: "2026-09-11T04:32:37.939Z", size: 2886, path: "../public/_nuxt/_I7zX1hp.js" }, "/_nuxt/CIxQqB1T.js": { type: "text/javascript; charset=utf-8", etag: '"42-A91dC1pHdnRfO7aafuJN5vaoORA"', mtime: "2026-09-11T04:32:37.939Z", size: 66, path: "../public/_nuxt/CIxQqB1T.js" }, "/_nuxt/bsfWI-nE.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"19fe-E4czvZH+Nki241kwEb6Tb1XakKg"', mtime: "2026-09-11T04:32:38.087Z", size: 6654, path: "../public/_nuxt/bsfWI-nE.js.br" }, "/_nuxt/Ca1NHEsT.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"24c-w7fG51BrDSqckikzmwdJTBP3Hxs"', mtime: "2026-09-11T04:32:37.984Z", size: 588, path: "../public/_nuxt/Ca1NHEsT.js.gz" }, "/_nuxt/KaTeX_Size1-Regular.Dbsnue_I.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"1911-EXdj0N9RLkuDmzrsLnT/s/ZIl8g"', mtime: "2026-09-11T04:32:38.819Z", size: 6417, path: "../public/_nuxt/KaTeX_Size1-Regular.Dbsnue_I.ttf.gz" }, "/_nuxt/DXug_GbP.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"d4d-hKLhUY7441uqw2org2xw0bSIfSg"', mtime: "2026-09-11T04:32:37.939Z", size: 3405, path: "../public/_nuxt/DXug_GbP.js" }, "/_nuxt/D3eL2sTE.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"694-ungKm8PVVqqaq3EUOtOvcxGx1+4"', mtime: "2026-09-11T04:32:37.934Z", size: 1684, path: "../public/_nuxt/D3eL2sTE.js" }, "/_nuxt/3iSiVjmt.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"4495-yd+g62oo7DdG5X2ObzJ3qJCD8dg"', mtime: "2026-09-11T04:32:37.934Z", size: 17557, path: "../public/_nuxt/3iSiVjmt.js" }, "/_nuxt/CenSu9pQ.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"10ae-tRYXxsJkDeV0ijknI6JeKtq6NaA"', mtime: "2026-09-11T04:32:37.939Z", size: 4270, path: "../public/_nuxt/CenSu9pQ.js" }, "/_nuxt/omrco8F4.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"61b-fMVfTf0jUb2ZX+l42Aswju2SDT8"', mtime: "2026-09-11T04:32:38.128Z", size: 1563, path: "../public/_nuxt/omrco8F4.js.br" }, "/_nuxt/entry.DpS-p5p_.css": { type: "text/css; charset=utf-8", encoding: null, etag: '"17a93-bQ8DSdWRuGOUfe/LXVe1KmQm4T8"', mtime: "2026-09-11T04:32:37.934Z", size: 96915, path: "../public/_nuxt/entry.DpS-p5p_.css" }, "/_nuxt/_id_-learn.DqGQqNXT.css": { type: "text/css; charset=utf-8", etag: '"be-+sErXzT4097D5LM1mr318UQyhIk"', mtime: "2026-09-11T04:32:37.939Z", size: 190, path: "../public/_nuxt/_id_-learn.DqGQqNXT.css" }, "/_nuxt/C0-rP3Ca.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"2936-sXj7bv2mdwyOLCzvIvfV4BN6SGI"', mtime: "2026-09-11T04:32:38.196Z", size: 10550, path: "../public/_nuxt/C0-rP3Ca.js.br" }, "/_nuxt/KaTeX_AMS-Regular.BQhdFMY1.woff2": { type: "font/woff2", etag: '"6dac-NElHQ3Nv2nVxl9FvzGpuGnkxfIY"', mtime: "2026-09-11T04:32:37.928Z", size: 28076, path: "../public/_nuxt/KaTeX_AMS-Regular.BQhdFMY1.woff2" }, "/_nuxt/KaTeX_Math-BoldItalic.B3XSjfu4.ttf": { type: "font/ttf", encoding: null, etag: '"79dc-6AzEwjLSB192KlLUa+tP+9N6Xxo"', mtime: "2026-09-11T04:32:37.928Z", size: 31196, path: "../public/_nuxt/KaTeX_Math-BoldItalic.B3XSjfu4.ttf" }, "/_nuxt/CLXvOnT1.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"6f8-mAtnFkMjFDK2nzMu108S96IwuDs"', mtime: "2026-09-11T04:32:37.929Z", size: 1784, path: "../public/_nuxt/CLXvOnT1.js" }, "/_nuxt/KaTeX_Math-BoldItalic.CZnvNsCZ.woff2": { type: "font/woff2", etag: '"4010-j8udLeZaxxoMT92YYXPbcwWS7Yo"', mtime: "2026-09-11T04:32:37.925Z", size: 16400, path: "../public/_nuxt/KaTeX_Math-BoldItalic.CZnvNsCZ.woff2" }, "/_nuxt/KaTeX_Main-Regular.Dr94JaBh.woff": { type: "font/woff", etag: '"7834-/crlS6HUY17oWlRizByX5SHP1RU"', mtime: "2026-09-11T04:32:37.933Z", size: 30772, path: "../public/_nuxt/KaTeX_Main-Regular.Dr94JaBh.woff" }, "/_nuxt/D4Qf99be.js": { type: "text/javascript; charset=utf-8", etag: '"2e6-w19Rtluy+qq5kygnysAEfM1iXtM"', mtime: "2026-09-11T04:32:37.932Z", size: 742, path: "../public/_nuxt/D4Qf99be.js" }, "/_nuxt/BgTQkGHw.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"1df42-vm5nzaSqQwLXv6l3lDgo2Inldrg"', mtime: "2026-09-11T04:32:38.133Z", size: 122690, path: "../public/_nuxt/BgTQkGHw.js.gz" }, "/_nuxt/DClUiGwA.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"2e2-jetYkmfrBLdpoE96DgyNmai75Pw"', mtime: "2026-09-11T04:32:38.729Z", size: 738, path: "../public/_nuxt/DClUiGwA.js.gz" }, "/_nuxt/browser.worker-DXeZGq5R.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"3c60-dWM9orsb2RXaoc6wP5qOUgb2yl0"', mtime: "2026-09-11T04:32:38.352Z", size: 15456, path: "../public/_nuxt/browser.worker-DXeZGq5R.js.br" }, "/_nuxt/KaTeX_Caligraphic-Bold.ATXxdsX0.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"1e3b-Zx0tI85FvoaSSTNvA6XZ5wde8Ao"', mtime: "2026-09-11T04:32:38.546Z", size: 7739, path: "../public/_nuxt/KaTeX_Caligraphic-Bold.ATXxdsX0.ttf.gz" }, "/_nuxt/lVNn4F3S.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"37ca-Hhc7IPFBgl+WTEX5wkXPLsIoFb4"', mtime: "2026-09-11T04:32:37.924Z", size: 14282, path: "../public/_nuxt/lVNn4F3S.js" }, "/_nuxt/KaTeX_Main-BoldItalic.DzxPMmG6.ttf": { type: "font/ttf", encoding: null, etag: '"80c8-umRk5EL9UK73Z4kkug8tlYHruwc"', mtime: "2026-09-11T04:32:37.923Z", size: 32968, path: "../public/_nuxt/KaTeX_Main-BoldItalic.DzxPMmG6.ttf" }, "/_nuxt/DDi7BBYG.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"b7b1-CWpJsDY/vJi9DsOM/zNjXvpb6Dc"', mtime: "2026-09-11T04:32:38.551Z", size: 47025, path: "../public/_nuxt/DDi7BBYG.js.gz" }, "/_nuxt/BaPl6vKy.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"2f5-ku8va2Ry9ndxEqREqti2PA56SLM"', mtime: "2026-09-11T04:32:38.862Z", size: 757, path: "../public/_nuxt/BaPl6vKy.js.gz" }, "/_nuxt/sql-wasm.DfANybxk.wasm.gz": { type: "application/wasm", encoding: "gzip", etag: '"4e9b3-UJV96fcN8V4kFPFSw04PmgSmdJU"', mtime: "2026-09-11T04:32:38.584Z", size: 321971, path: "../public/_nuxt/sql-wasm.DfANybxk.wasm.gz" }, "/_nuxt/study-guide.BA6NWRPA.png": { type: "image/png", etag: '"1be2-R7XoIWNIMAolfNSaZTJKRayAsvU"', mtime: "2026-09-11T04:32:37.920Z", size: 7138, path: "../public/_nuxt/study-guide.BA6NWRPA.png" }, "/_nuxt/DHWHPuxT.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"785-6R/P726P2/QKBuJTBAfhVaIxJhM"', mtime: "2026-09-11T04:32:38.990Z", size: 1925, path: "../public/_nuxt/DHWHPuxT.js.br" }, "/_nuxt/DXug_GbP.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"60e-B0wh5QqsVrkbeqHobi9EGEjTAqo"', mtime: "2026-09-11T04:32:38.868Z", size: 1550, path: "../public/_nuxt/DXug_GbP.js.gz" }, "/_nuxt/C4juBKIn.js": { type: "text/javascript; charset=utf-8", etag: '"103-wj2KJdETmSLdesEzLDjUvq8JRsA"', mtime: "2026-09-11T04:32:37.929Z", size: 259, path: "../public/_nuxt/C4juBKIn.js" }, "/_nuxt/CLXvOnT1.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"32f-6q47tdeEZrwc99qsrZ/yrv+2iw0"', mtime: "2026-09-11T04:32:38.911Z", size: 815, path: "../public/_nuxt/CLXvOnT1.js.br" }, "/_nuxt/KaTeX_Main-Bold.waoOVXN0.ttf": { type: "font/ttf", encoding: null, etag: '"c888-QTqz3D/DpXUidbriyuZ+tY8rMvA"', mtime: "2026-09-11T04:32:37.919Z", size: 51336, path: "../public/_nuxt/KaTeX_Main-Bold.waoOVXN0.ttf" }, "/_nuxt/KaTeX_Fraktur-Bold.BdnERNNW.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"3438-GYNF0YgDvUYMKtkk90YhJ6Nblhg"', mtime: "2026-09-11T04:32:38.729Z", size: 13368, path: "../public/_nuxt/KaTeX_Fraktur-Bold.BdnERNNW.ttf.gz" }, "/_nuxt/z4myVNlC.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"1f271-9istsZnoh8trKqzWuXGWIkmZlMw"', mtime: "2026-09-11T04:32:38.659Z", size: 127601, path: "../public/_nuxt/z4myVNlC.js.gz" }, "/_nuxt/BTJ8lpNB.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"f1d-3ybP/mtivWrpjj3x2gEUIUf8Tos"', mtime: "2026-09-11T04:32:39.032Z", size: 3869, path: "../public/_nuxt/BTJ8lpNB.js.br" }, "/_nuxt/-WKEmQhb.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"1255-n0LJkTDSZ6wlx7gaEogJH/PwQDs"', mtime: "2026-09-11T04:32:38.779Z", size: 4693, path: "../public/_nuxt/-WKEmQhb.js.gz" }, "/_nuxt/KaTeX_Typewriter-Regular.CO6r4hn1.woff2": { type: "font/woff2", etag: '"3500-egiIP//GlYxxzAGnWguZzKPktHU"', mtime: "2026-09-11T04:32:37.928Z", size: 13568, path: "../public/_nuxt/KaTeX_Typewriter-Regular.CO6r4hn1.woff2" }, "/_nuxt/Bif3aajk.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"5aa-gt0LLja5+4TzWSNlYuxz0lzI4Vg"', mtime: "2026-09-11T04:32:39.023Z", size: 1450, path: "../public/_nuxt/Bif3aajk.js.br" }, "/_nuxt/KaTeX_Script-Regular.C5JkGWo-.ttf": { type: "font/ttf", encoding: null, etag: '"4108-xvZ12oGtKcvySyz3cPeVtNosZI4"', mtime: "2026-09-11T04:32:37.927Z", size: 16648, path: "../public/_nuxt/KaTeX_Script-Regular.C5JkGWo-.ttf" }, "/_nuxt/lyDHIuzO.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"5a7-9a4UF2eESiNtns9aoBLL1ByVpDM"', mtime: "2026-09-11T04:32:38.634Z", size: 1447, path: "../public/_nuxt/lyDHIuzO.js.br" }, "/_nuxt/Cmyvdx_-.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"639-+JJPbSMOnPnETIMpMcE5reqC0Tk"', mtime: "2026-09-11T04:32:37.956Z", size: 1593, path: "../public/_nuxt/Cmyvdx_-.js.gz" }, "/_nuxt/_id_-flashcards.Brokb39F.css": { type: "text/css; charset=utf-8", encoding: null, etag: '"414-UcXnU2YV+AOs5fXyouN9EiQ1L+I"', mtime: "2026-09-11T04:32:37.923Z", size: 1044, path: "../public/_nuxt/_id_-flashcards.Brokb39F.css" }, "/_nuxt/BkOLPXZH.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"b6c-lhlTtRCabNhFVnyHloULGtMaFJY"', mtime: "2026-09-11T04:32:37.924Z", size: 2924, path: "../public/_nuxt/BkOLPXZH.js" }, "/_nuxt/KaTeX_SansSerif-Bold.D1sUS0GD.woff2": { type: "font/woff2", etag: '"2fb8-iG5heXpSXUqvzgqvV0FP366huHM"', mtime: "2026-09-11T04:32:37.920Z", size: 12216, path: "../public/_nuxt/KaTeX_SansSerif-Bold.D1sUS0GD.woff2" }, "/_nuxt/DHWHPuxT.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"1801-bXHCwzWTDr0cZUVP5No5VExpsgE"', mtime: "2026-09-11T04:32:37.921Z", size: 6145, path: "../public/_nuxt/DHWHPuxT.js" }, "/_nuxt/KaTeX_Math-Italic.t53AETM-.woff2": { type: "font/woff2", etag: '"4038-20iD0M/5XstcA0EOMoOnN8Ue1gQ"', mtime: "2026-09-11T04:32:37.929Z", size: 16440, path: "../public/_nuxt/KaTeX_Math-Italic.t53AETM-.woff2" }, "/_nuxt/KaTeX_Size1-Regular.mCD8mA8B.woff2": { type: "font/woff2", etag: '"155c-V/pZmXShvAs31fDlzIYCMC8CtXM"', mtime: "2026-09-11T04:32:37.929Z", size: 5468, path: "../public/_nuxt/KaTeX_Size1-Regular.mCD8mA8B.woff2" }, "/_nuxt/D1CiTnQp.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"ebb4-FiP6/QSg4FIqc5jSFxnMf1Fzy3c"', mtime: "2026-09-11T04:32:38.590Z", size: 60340, path: "../public/_nuxt/D1CiTnQp.js.br" }, "/_nuxt/error-500.D6rBzoDj.css": { type: "text/css; charset=utf-8", encoding: null, etag: '"772-1gy21mJcEtmrpKn02mQKUYB/dbo"', mtime: "2026-09-11T04:32:37.928Z", size: 1906, path: "../public/_nuxt/error-500.D6rBzoDj.css" }, "/_nuxt/Cwhw7OVi.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"423-9jBdHqL6wFlRfDfEBDNyNbreWnM"', mtime: "2026-09-11T04:32:38.127Z", size: 1059, path: "../public/_nuxt/Cwhw7OVi.js.br" }, "/_nuxt/practice.DslxcpkH.png": { type: "image/png", etag: '"25d9-T8mTNKboAoFUhQSM8IvXxWC3YlU"', mtime: "2026-09-11T04:32:37.924Z", size: 9689, path: "../public/_nuxt/practice.DslxcpkH.png" }, "/_nuxt/KaTeX_Main-BoldItalic.DxDJ3AOS.woff2": { type: "font/woff2", etag: '"418c-pKSQW4sSb5/9VT0hpyoMJOlIA0U"', mtime: "2026-09-11T04:32:37.923Z", size: 16780, path: "../public/_nuxt/KaTeX_Main-BoldItalic.DxDJ3AOS.woff2" }, "/_nuxt/error-500.D6rBzoDj.css.br": { type: "text/css; charset=utf-8", encoding: "br", etag: '"266-7kiHV03sXc9n1Dtesc/q9mHwvn4"', mtime: "2026-09-11T04:32:38.994Z", size: 614, path: "../public/_nuxt/error-500.D6rBzoDj.css.br" }, "/_nuxt/CwHFm-oR.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"498-bm8922mwANNxAFogJ6+CCuSjqZQ"', mtime: "2026-09-11T04:32:37.933Z", size: 1176, path: "../public/_nuxt/CwHFm-oR.js" }, "/_nuxt/DH04fbtw.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"3f54d-WnwsSM9WjpfocbCmKSAIu5xn0/g"', mtime: "2026-09-11T04:32:37.066Z", size: 259405, path: "../public/_nuxt/DH04fbtw.js" }, "/_nuxt/CYWUEkeD.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"156c-yblfXAXQEPJkIrgYlqW/6frh6ws"', mtime: "2026-09-11T04:32:38.164Z", size: 5484, path: "../public/_nuxt/CYWUEkeD.js.br" }, "/_nuxt/KaTeX_Fraktur-Regular.CB_wures.ttf": { type: "font/ttf", encoding: null, etag: '"4c74-F9tAiC3V8UBiXyjdlMQwReGJPpg"', mtime: "2026-09-11T04:32:37.920Z", size: 19572, path: "../public/_nuxt/KaTeX_Fraktur-Regular.CB_wures.ttf" }, "/_nuxt/CYOK9Egh.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"1aa7-rwKcS51UBUoPiU3NenIE2lx8yqs"', mtime: "2026-09-11T04:32:37.929Z", size: 6823, path: "../public/_nuxt/CYOK9Egh.js" }, "/_nuxt/CtVf1DiR.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"89f-4M6ZGj/4NmQPRLz2OSpqPWuwISc"', mtime: "2026-09-11T04:32:37.979Z", size: 2207, path: "../public/_nuxt/CtVf1DiR.js.br" }, "/_nuxt/Bqe5OFuP.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"394-C9Gh+0vW25l0i565RpLIytYpmuM"', mtime: "2026-09-11T04:32:37.955Z", size: 916, path: "../public/_nuxt/Bqe5OFuP.js.gz" }, "/_nuxt/yGYSWVbr.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"1038-9R07DGjgM9XVY6mqdxAzEX5wrYA"', mtime: "2026-09-11T04:32:38.203Z", size: 4152, path: "../public/_nuxt/yGYSWVbr.js.gz" }, "/_nuxt/Bz0bHmaK.js": { type: "text/javascript; charset=utf-8", etag: '"64-99EBOgkSJGxhzORDMrf3OS6ku1U"', mtime: "2026-09-11T04:32:37.927Z", size: 100, path: "../public/_nuxt/Bz0bHmaK.js" }, "/_nuxt/KaTeX_Fraktur-Bold.CL6g_b3V.woff2": { type: "font/woff2", etag: '"2c54-+Y+JJy7KEa5BdnLFmg+qaoiAWok"', mtime: "2026-09-11T04:32:37.924Z", size: 11348, path: "../public/_nuxt/KaTeX_Fraktur-Bold.CL6g_b3V.woff2" }, "/_nuxt/BSPB2cL8.js": { type: "text/javascript; charset=utf-8", etag: '"10a-QUpdQPC5fPMbF50TaqiyMrMoHNo"', mtime: "2026-09-11T04:32:37.924Z", size: 266, path: "../public/_nuxt/BSPB2cL8.js" }, "/_nuxt/C1bbhg3s.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"67b-NZ6nQqyHGZ67p8vYxKERaxbKuQ8"', mtime: "2026-09-11T04:32:38.781Z", size: 1659, path: "../public/_nuxt/C1bbhg3s.js.br" }, "/_nuxt/BEppUSYT.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"458-TugVtLTElcjUgoWVtY4PhHcnZzI"', mtime: "2026-09-11T04:32:37.968Z", size: 1112, path: "../public/_nuxt/BEppUSYT.js.br" }, "/_nuxt/C1OZectE.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"236c-JlkM8JhPC7TM0zxmFzujV0YccdY"', mtime: "2026-09-11T04:32:37.956Z", size: 9068, path: "../public/_nuxt/C1OZectE.js.gz" }, "/_nuxt/YSTTKXwf.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"13dd-qf4q4K22GicZUpP3Qo6yenvw248"', mtime: "2026-09-11T04:32:38.356Z", size: 5085, path: "../public/_nuxt/YSTTKXwf.js.br" }, "/_nuxt/CYOK9Egh.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"865-RqC2v7v3xlCsKsX3faYZK42TVGc"', mtime: "2026-09-11T04:32:39.012Z", size: 2149, path: "../public/_nuxt/CYOK9Egh.js.br" }, "/_nuxt/worker.min.32WLk7pY.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"6b9e-BYdYR5/VJBgV9AJOAlhiFaTJ8Qk"', mtime: "2026-09-11T04:32:38.817Z", size: 27550, path: "../public/_nuxt/worker.min.32WLk7pY.js.br" }, "/_nuxt/8x4ij3rf.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"571-6h732U/v1YbazQIM+TOzOQWzhtI"', mtime: "2026-09-11T04:32:38.099Z", size: 1393, path: "../public/_nuxt/8x4ij3rf.js.gz" }, "/_nuxt/Bif3aajk.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"e8e-OZuqlc7ndW3YzuExT9LhOJqkXQg"', mtime: "2026-09-11T04:32:37.933Z", size: 3726, path: "../public/_nuxt/Bif3aajk.js" }, "/_nuxt/BTJ8lpNB.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"4111-GR+gEYYwIyP45exRmWuxLBhvgYc"', mtime: "2026-09-11T04:32:37.928Z", size: 16657, path: "../public/_nuxt/BTJ8lpNB.js" }, "/_nuxt/Cu-FIESN.js": { type: "text/javascript; charset=utf-8", etag: '"1bc-JiTEq5gFU72/p+E1MMtQpopQHY8"', mtime: "2026-09-11T04:32:37.933Z", size: 444, path: "../public/_nuxt/Cu-FIESN.js" }, "/_nuxt/KaTeX_Main-Bold.Cx986IdX.woff2": { type: "font/woff2", etag: '"62ec-MQUKGxsSP7LFnK0fdLff+Q3rj84"', mtime: "2026-09-11T04:32:37.928Z", size: 25324, path: "../public/_nuxt/KaTeX_Main-Bold.Cx986IdX.woff2" }, "/_nuxt/BkOLPXZH.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"49d-jaYB9HCQpEp5FzCgFbdyYWrOirg"', mtime: "2026-09-11T04:32:38.962Z", size: 1181, path: "../public/_nuxt/BkOLPXZH.js.gz" }, "/_nuxt/Cx9_0Zxu.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"5ab-rMBeyYeusFfyUuTjBDheEuQQ0vw"', mtime: "2026-09-11T04:32:37.961Z", size: 1451, path: "../public/_nuxt/Cx9_0Zxu.js.br" }, "/_nuxt/BrCCkkvX.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"108b-lkadfKNdXvnFAf1xXxdSz3pXfyg"', mtime: "2026-09-11T04:32:37.925Z", size: 4235, path: "../public/_nuxt/BrCCkkvX.js" }, "/_nuxt/DtNPzvWu.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"ce0-DgTxJu8d7ZI+XyJL+foMZ+qWFrQ"', mtime: "2026-09-11T04:32:38.035Z", size: 3296, path: "../public/_nuxt/DtNPzvWu.js.gz" }, "/_nuxt/3iSiVjmt.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"1432-B75HUbtcwFiqfKITMurQrmM2OE4"', mtime: "2026-09-11T04:32:38.893Z", size: 5170, path: "../public/_nuxt/3iSiVjmt.js.gz" }, "/_nuxt/Dd1vPuSX.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"434b-wjw/J+Bf6kzoqZZHxP9yhWQ9w44"', mtime: "2026-09-11T04:32:37.923Z", size: 17227, path: "../public/_nuxt/Dd1vPuSX.js" }, "/_nuxt/DR0b2V_-.js": { type: "text/javascript; charset=utf-8", etag: '"133-J9KEfp83VVcqg67KRo700xoJBmo"', mtime: "2026-09-11T04:32:37.919Z", size: 307, path: "../public/_nuxt/DR0b2V_-.js" }, "/_nuxt/C0FnF6B9.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"50b-+WBETyVi3nVwvAsJ9zqeHfutBiA"', mtime: "2026-09-11T04:32:37.921Z", size: 1291, path: "../public/_nuxt/C0FnF6B9.js" }, "/_nuxt/_id_.Bfli5g0z.css.gz": { type: "text/css; charset=utf-8", encoding: "gzip", etag: '"204-c/oDdIgaZDRbuRNtB3XZxYAyYTM"', mtime: "2026-09-11T04:32:38.004Z", size: 516, path: "../public/_nuxt/_id_.Bfli5g0z.css.gz" }, "/_nuxt/W5zwDZH1.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"4d2-QtXjCCFkgYgjhXCqjgNw/fgYMvo"', mtime: "2026-09-11T04:32:38.222Z", size: 1234, path: "../public/_nuxt/W5zwDZH1.js.gz" }, "/_nuxt/Y6CevI7H.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"5540-6df5FBmaL88ZveWEbjlqChpcY+w"', mtime: "2026-09-11T04:32:37.915Z", size: 21824, path: "../public/_nuxt/Y6CevI7H.js" }, "/_nuxt/KaTeX_Main-BoldItalic.DzxPMmG6.ttf.br": { type: "font/ttf", encoding: "br", etag: '"489f-sAEUSzQA/PEj9ZQW0ofUmAUKvY8"', mtime: "2026-09-11T04:32:38.992Z", size: 18591, path: "../public/_nuxt/KaTeX_Main-BoldItalic.DzxPMmG6.ttf.br" }, "/_nuxt/DNV-kwhi.js": { type: "text/javascript; charset=utf-8", encoding: null, etag: '"e85-KrDX7Wggn0Jtt1gYOmfh0XuQWwM"', mtime: "2026-09-11T04:32:37.914Z", size: 3717, path: "../public/_nuxt/DNV-kwhi.js" }, "/_nuxt/Bwbix4wE.js.gz": { type: "text/javascript; charset=utf-8", encoding: "gzip", etag: '"15c5e-vurMRDDKbuoQ0Z1O3mWT41aW3DA"', mtime: "2026-09-11T04:32:38.029Z", size: 89182, path: "../public/_nuxt/Bwbix4wE.js.gz" }, "/_nuxt/ymJ5NHXU.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"6ff-S3Up93Iz+DlxOURhMu1nFaQZ+pY"', mtime: "2026-09-11T04:32:38.867Z", size: 1791, path: "../public/_nuxt/ymJ5NHXU.js.br" }, "/_nuxt/Y6CevI7H.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"1442-N6I8ItmL9J+fU1IrfKZ57f7LuPo"', mtime: "2026-09-11T04:32:39.063Z", size: 5186, path: "../public/_nuxt/Y6CevI7H.js.br" }, "/_nuxt/KaTeX_SansSerif-Regular.BNo7hRIc.ttf.gz": { type: "font/ttf", encoding: "gzip", etag: '"3085-cNYL7814Eq0SSxdwUbxwx/kEAUQ"', mtime: "2026-09-11T04:32:38.064Z", size: 12421, path: "../public/_nuxt/KaTeX_SansSerif-Regular.BNo7hRIc.ttf.gz" }, "/_nuxt/builds/meta/ae631f9a-0866-4b47-b1b3-987eb90fca71.json": { type: "application/json", etag: '"58-aTlA7VdzmQUc+klVlHDkW++wqOM"', mtime: "2026-09-11T04:32:37.898Z", size: 88, path: "../public/_nuxt/builds/meta/ae631f9a-0866-4b47-b1b3-987eb90fca71.json" }, "/_nuxt/first-run.xoV6d82S.css.gz": { type: "text/css; charset=utf-8", encoding: "gzip", etag: '"278-j5WSB5y+QOB58iS6UmyX1/oofTM"', mtime: "2026-09-11T04:32:37.985Z", size: 632, path: "../public/_nuxt/first-run.xoV6d82S.css.gz" }, "/_nuxt/builds/latest.json": { type: "application/json", etag: '"47-L3ep495I9PhOCDuyipERGi/07qY"', mtime: "2026-09-11T04:32:37.900Z", size: 71, path: "../public/_nuxt/builds/latest.json" }, "/_nuxt/CJR9iA_2.js.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"59c-DY0MLDg0D8L64aDrD0BuhWTcKbA"', mtime: "2026-09-11T04:32:38.848Z", size: 1436, path: "../public/_nuxt/CJR9iA_2.js.br" }, "/_nuxt/KaTeX_SansSerif-Bold.CFMepnvq.ttf.br": { type: "font/ttf", encoding: "br", etag: '"3591-WVPVJBhmg4vyIqVvJrm9+XTRTwk"', mtime: "2026-09-11T04:32:38.127Z", size: 13713, path: "../public/_nuxt/KaTeX_SansSerif-Bold.CFMepnvq.ttf.br" }, "/_nuxt/pdf.worker.TGcf_-kp.mjs.br": { type: "text/javascript; charset=utf-8", encoding: "br", etag: '"5c2bc-eSb8LTDzjdVpHMRh5k0jYcsalqc"', mtime: "2026-09-11T04:32:41.256Z", size: 377532, path: "../public/_nuxt/pdf.worker.TGcf_-kp.mjs.br" } };
    vr = { "/_nuxt/builds/meta/": { maxAge: 31536e3 }, "/_nuxt/builds/": { maxAge: 1 }, "/_nuxt/": { maxAge: 31536e3 } };
    Cr = (function(t5) {
      const e5 = useNitroApp();
      return { async fetch(r4, a4, c4) {
        const u4 = {}, f4 = new URL(r4.url);
        if (t5.fetch) {
          const e6 = await t5.fetch(r4, a4, c4, f4, u4);
          if (e6) return e6;
        }
        return (async function(t6, e6, r5, a5 = new URL(t6.url), c5 = useNitroApp(), u5) {
          let f5;
          (function(t7) {
            return br.test(t7.method);
          })(t6) && (f5 = s2.from(await t6.arrayBuffer()));
          return globalThis.__env__ = e6, c5.localFetch(a5.pathname + a5.search, { context: { waitUntil: /* @__PURE__ */ __name((t7) => r5.waitUntil(t7), "waitUntil"), _platform: { cf: t6.cf, cloudflare: { request: t6, env: e6, context: r5, url: a5, ...u5 } } }, host: a5.hostname, protocol: a5.protocol, method: t6.method, headers: t6.headers, body: f5 });
        })(r4, a4, c4, f4, e5, u4);
      }, scheduled(t6, r4, s3) {
        globalThis.__env__ = r4, s3.waitUntil(e5.hooks.callHook("cloudflare:scheduled", { controller: t6, env: r4, context: s3 }));
      }, email(t6, r4, s3) {
        globalThis.__env__ = r4, s3.waitUntil(e5.hooks.callHook("cloudflare:email", { message: t6, event: t6, env: r4, context: s3 }));
      }, queue(t6, r4, s3) {
        globalThis.__env__ = r4, s3.waitUntil(e5.hooks.callHook("cloudflare:queue", { batch: t6, event: t6, env: r4, context: s3 }));
      }, tail(t6, r4, s3) {
        globalThis.__env__ = r4, s3.waitUntil(e5.hooks.callHook("cloudflare:tail", { traces: t6, env: r4, context: s3 }));
      }, trace(t6, r4, s3) {
        globalThis.__env__ = r4, s3.waitUntil(e5.hooks.callHook("cloudflare:trace", { traces: t6, env: r4, context: s3 }));
      } };
    })({ fetch(t5, e5, r4, s3) {
      if (e5.ASSETS && (function(t6 = "") {
        if (wr[t6]) return true;
        for (const e6 in vr) if (t6.startsWith(e6)) return true;
        return false;
      })(s3.pathname)) return e5.ASSETS.fetch(t5);
    } });
  }
});

// .wrangler/tmp/bundle-x8brNa/middleware-loader.entry.ts
init_modules_watch_stub();

// .wrangler/tmp/bundle-x8brNa/middleware-insertion-facade.js
init_modules_watch_stub();

// ../cloudflare/entry.ts
init_modules_watch_stub();

// ../.output-cloudflare/server/index.mjs
init_modules_watch_stub();
init_nitro();
import "node:process";
import "cloudflare:workers";
import "node:events";
import "node:buffer";
import "node:timers";
globalThis._importMeta_ = { url: "file:///_entry.js", env: {} };

// ../cloudflare/bounded-body.ts
init_modules_watch_stub();
var BodyTooLarge2 = class extends Error {
  static {
    __name(this, "BodyTooLarge");
  }
};
async function readBoundedBody(stream, limit) {
  const reader = stream?.getReader();
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
        throw new BodyTooLarge2("Request too large.");
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
__name(readBoundedBody, "readBoundedBody");

// ../cloudflare/entry.ts
var entry_default = {
  async fetch(request, env, context) {
    const url = new URL(request.url);
    const api = url.pathname.startsWith("/api/");
    const started = Date.now();
    let response;
    try {
      if (env.TRACER_MAINTENANCE === "1") return new Response("Tracer is temporarily unavailable. Please try again shortly.", { status: 503, headers: { "Retry-After": "300", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
      if (request.body) {
        const limit = url.pathname === "/api/web/ai" ? 5 * 1024 * 1024 : 64 * 1024;
        if (Number(request.headers.get("content-length")) > limit) throw new BodyTooLarge2();
        const bytes = await readBoundedBody(request.body, limit);
        request = new Request(request, { body: bytes });
      }
      response = await Cr.fetch(request, env, context);
    } catch (error) {
      const status = error instanceof BodyTooLarge2 ? 413 : 500;
      response = Response.json({ statusCode: status, statusMessage: status === 413 ? "Request too large." : "Tracer could not complete the request." }, { status });
    }
    response = new Response(response.body, response);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    response.headers.set("X-Content-Type-Options", "nosniff");
    if (api) response.headers.set("Cache-Control", "private, no-store");
    else if (url.pathname.startsWith("/_nuxt/") && response.ok) response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    else response.headers.set("Cache-Control", "no-cache");
    if (api) console.log(JSON.stringify({ event: "web_request", route: ["/api/web/ai", "/api/web/credentials"].includes(url.pathname) ? url.pathname : "/api/other", status: response.status, durationMs: Date.now() - started }));
    return response;
  }
};

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e5) {
      console.error("Failed to drain the unused request body.", e5);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_modules_watch_stub();
function reduceError(e5) {
  return {
    name: e5?.name,
    message: e5?.message ?? String(e5),
    stack: e5?.stack,
    cause: e5?.cause === void 0 ? void 0 : reduceError(e5.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e5) {
    const error = reduceError(e5);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-x8brNa/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = entry_default;

// ../node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-x8brNa/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=entry.js.map
