// .wrangler/tmp/bundle-ysKIJ1/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// build/worker/shim.mjs
import z from "./bf361edde7556beaacf8e8be9d2b7de1cafd36ab-index.wasm";
import Vt from "./bf361edde7556beaacf8e8be9d2b7de1cafd36ab-index.wasm";
var D = Object.defineProperty;
var R = (e, t) => {
  for (var r in t)
    D(e, r, { get: t[r], enumerable: true });
};
var g = {};
R(g, { IntoUnderlyingByteSource: () => M, IntoUnderlyingSink: () => T, IntoUnderlyingSource: () => q, MinifyConfig: () => L, PipeOptions: () => C, PolishConfig: () => X, QueuingStrategy: () => S, R2Range: () => v, ReadableStreamGetReaderOptions: () => $, RequestRedirect: () => Y, __wbg_buffer_4e79326814bdd393: () => St, __wbg_buffer_55ba7a6b1b92e2ac: () => ht, __wbg_byobRequest_08c18cee35def1f4: () => Mt, __wbg_byteLength_5299848ed3264181: () => qt, __wbg_byteOffset_b69b0a07afccce19: () => vt, __wbg_call_587b30eea3e09332: () => gt, __wbg_cause_52959bcad93f9e0f: () => st, __wbg_cf_703652f0d2c5b8d1: () => tt, __wbg_close_da7e6fb9d9851e5a: () => Lt, __wbg_close_e9110ca16e2567db: () => $t, __wbg_enqueue_d71a1a518e21f5c3: () => Ft, __wbg_error_a7e23606158b68b9: () => Dt, __wbg_headers_1eff4f53324496e6: () => Q, __wbg_instanceof_Error_fac23a8832b241da: () => _t, __wbg_length_0aab7ffd65ad19ed: () => wt, __wbg_method_e15eb9cf1c32cdbb: () => Z, __wbg_new_143b41b4342650bb: () => et, __wbg_new_2b55e405e4af4986: () => dt, __wbg_new_2b6fea4ea03b1b95: () => Rt, __wbg_new_87297f22973157c8: () => Ct, __wbg_newwithbyteoffsetandlength_88d1d8be5df94b9b: () => yt, __wbg_newwithlength_89eeca401d8918c2: () => ut, __wbg_newwithoptbuffersourceandinit_6c49960a834dd7cf: () => ft, __wbg_newwithoptreadablestreamandinit_d238e5b972c7b57f: () => bt, __wbg_newwithoptstrandinit_ff70839f3334d3aa: () => ct, __wbg_resolve_ae38ad63c43ff98b: () => Ot, __wbg_respond_8fadc5f5c9d95422: () => At, __wbg_set_07da13cc24b69217: () => at, __wbg_set_3698e3ca519b3c3c: () => xt, __wbg_set_76353df4722f4954: () => rt, __wbg_then_8df675b8bb5d5e3c: () => Et, __wbg_toString_506566b763774a16: () => ot, __wbg_url_3325e0ef088003ca: () => G, __wbg_view_231340b0dd8a2484: () => Tt, __wbindgen_cb_drop: () => kt, __wbindgen_closure_wrapper772: () => It, __wbindgen_debug_string: () => mt, __wbindgen_memory: () => lt, __wbindgen_number_new: () => zt, __wbindgen_object_clone_ref: () => Wt, __wbindgen_object_drop_ref: () => it, __wbindgen_string_get: () => nt, __wbindgen_string_new: () => pt, __wbindgen_throw: () => jt, fetch: () => F, getMemory: () => N });
var I = new WebAssembly.Instance(z, { "./index_bg.js": g });
var n = I.exports;
function N() {
  return n.memory;
}
var a = new Array(128).fill(void 0);
a.push(void 0, null, true, false);
function s(e) {
  return a[e];
}
var h = 0;
var m = null;
function k() {
  return (m === null || m.byteLength === 0) && (m = new Uint8Array(n.memory.buffer)), m;
}
var H = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
var E = new H("utf-8");
var P = typeof E.encodeInto == "function" ? function(e, t) {
  return E.encodeInto(e, t);
} : function(e, t) {
  let r = E.encode(e);
  return t.set(r), { read: e.length, written: r.length };
};
function O(e, t, r) {
  if (r === void 0) {
    let f = E.encode(e), y = t(f.length) >>> 0;
    return k().subarray(y, y + f.length).set(f), h = f.length, y;
  }
  let _ = e.length, o = t(_) >>> 0, u = k(), c = 0;
  for (; c < _; c++) {
    let f = e.charCodeAt(c);
    if (f > 127)
      break;
    u[o + c] = f;
  }
  if (c !== _) {
    c !== 0 && (e = e.slice(c)), o = r(o, _, _ = c + e.length * 3) >>> 0;
    let f = k().subarray(o + c, o + _), y = P(e, f);
    c += y.written;
  }
  return h = c, o;
}
function p(e) {
  return e == null;
}
var j = null;
function b() {
  return (j === null || j.byteLength === 0) && (j = new Int32Array(n.memory.buffer)), j;
}
var x = a.length;
function U(e) {
  e < 132 || (a[e] = x, x = e);
}
function d(e) {
  let t = s(e);
  return U(e), t;
}
var J = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
var W = new J("utf-8", { ignoreBOM: true, fatal: true });
W.decode();
function w(e, t) {
  return e = e >>> 0, W.decode(k().subarray(e, e + t));
}
function i(e) {
  x === a.length && a.push(a.length + 1);
  let t = x;
  return x = a[t], a[t] = e, t;
}
function A(e) {
  let t = typeof e;
  if (t == "number" || t == "boolean" || e == null)
    return `${e}`;
  if (t == "string")
    return `"${e}"`;
  if (t == "symbol") {
    let o = e.description;
    return o == null ? "Symbol" : `Symbol(${o})`;
  }
  if (t == "function") {
    let o = e.name;
    return typeof o == "string" && o.length > 0 ? `Function(${o})` : "Function";
  }
  if (Array.isArray(e)) {
    let o = e.length, u = "[";
    o > 0 && (u += A(e[0]));
    for (let c = 1; c < o; c++)
      u += ", " + A(e[c]);
    return u += "]", u;
  }
  let r = /\[object ([^\]]+)\]/.exec(toString.call(e)), _;
  if (r.length > 1)
    _ = r[1];
  else
    return toString.call(e);
  if (_ == "Object")
    try {
      return "Object(" + JSON.stringify(e) + ")";
    } catch {
      return "Object";
    }
  return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : _;
}
function V(e, t, r, _) {
  let o = { a: e, b: t, cnt: 1, dtor: r }, u = (...c) => {
    o.cnt++;
    let f = o.a;
    o.a = 0;
    try {
      return _(f, o.b, ...c);
    } finally {
      --o.cnt === 0 ? n.__wbindgen_export_2.get(o.dtor)(f, o.b) : o.a = f;
    }
  };
  return u.original = o, u;
}
function B(e, t, r) {
  n.__wbindgen_export_3(e, t, i(r));
}
function F(e, t, r) {
  let _ = n.fetch(i(e), i(t), i(r));
  return d(_);
}
function l(e, t) {
  try {
    return e.apply(this, t);
  } catch (r) {
    n.__wbindgen_export_4(i(r));
  }
}
function K(e, t, r, _) {
  n.__wbindgen_export_5(e, t, i(r), i(_));
}
var X = Object.freeze({ Off: 0, 0: "Off", Lossy: 1, 1: "Lossy", Lossless: 2, 2: "Lossless" });
var Y = Object.freeze({ Error: 0, 0: "Error", Follow: 1, 1: "Follow", Manual: 2, 2: "Manual" });
var M = class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    let t = this.__destroy_into_raw();
    n.__wbg_intounderlyingbytesource_free(t);
  }
  get type() {
    let t, r;
    try {
      let u = n.__wbindgen_add_to_stack_pointer(-16);
      n.intounderlyingbytesource_type(u, this.__wbg_ptr);
      var _ = b()[u / 4 + 0], o = b()[u / 4 + 1];
      return t = _, r = o, w(_, o);
    } finally {
      n.__wbindgen_add_to_stack_pointer(16), n.__wbindgen_export_6(t, r);
    }
  }
  get autoAllocateChunkSize() {
    return n.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr) >>> 0;
  }
  start(t) {
    n.intounderlyingbytesource_start(this.__wbg_ptr, i(t));
  }
  pull(t) {
    let r = n.intounderlyingbytesource_pull(this.__wbg_ptr, i(t));
    return d(r);
  }
  cancel() {
    let t = this.__destroy_into_raw();
    n.intounderlyingbytesource_cancel(t);
  }
};
var T = class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    let t = this.__destroy_into_raw();
    n.__wbg_intounderlyingsink_free(t);
  }
  write(t) {
    let r = n.intounderlyingsink_write(this.__wbg_ptr, i(t));
    return d(r);
  }
  close() {
    let t = this.__destroy_into_raw(), r = n.intounderlyingsink_close(t);
    return d(r);
  }
  abort(t) {
    let r = this.__destroy_into_raw(), _ = n.intounderlyingsink_abort(r, i(t));
    return d(_);
  }
};
var q = class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    let t = this.__destroy_into_raw();
    n.__wbg_intounderlyingsource_free(t);
  }
  pull(t) {
    let r = n.intounderlyingsource_pull(this.__wbg_ptr, i(t));
    return d(r);
  }
  cancel() {
    let t = this.__destroy_into_raw();
    n.intounderlyingsource_cancel(t);
  }
};
var L = class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    let t = this.__destroy_into_raw();
    n.__wbg_minifyconfig_free(t);
  }
  get js() {
    return n.__wbg_get_minifyconfig_js(this.__wbg_ptr) !== 0;
  }
  set js(t) {
    n.__wbg_set_minifyconfig_js(this.__wbg_ptr, t);
  }
  get html() {
    return n.__wbg_get_minifyconfig_html(this.__wbg_ptr) !== 0;
  }
  set html(t) {
    n.__wbg_set_minifyconfig_html(this.__wbg_ptr, t);
  }
  get css() {
    return n.__wbg_get_minifyconfig_css(this.__wbg_ptr) !== 0;
  }
  set css(t) {
    n.__wbg_set_minifyconfig_css(this.__wbg_ptr, t);
  }
};
var C = class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    let t = this.__destroy_into_raw();
    n.__wbg_pipeoptions_free(t);
  }
  get preventClose() {
    return n.pipeoptions_preventClose(this.__wbg_ptr) !== 0;
  }
  get preventCancel() {
    return n.pipeoptions_preventCancel(this.__wbg_ptr) !== 0;
  }
  get preventAbort() {
    return n.pipeoptions_preventAbort(this.__wbg_ptr) !== 0;
  }
  get signal() {
    let t = n.pipeoptions_signal(this.__wbg_ptr);
    return d(t);
  }
};
var S = class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    let t = this.__destroy_into_raw();
    n.__wbg_queuingstrategy_free(t);
  }
  get highWaterMark() {
    return n.queuingstrategy_highWaterMark(this.__wbg_ptr);
  }
};
var v = class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    let t = this.__destroy_into_raw();
    n.__wbg_r2range_free(t);
  }
  get offset() {
    try {
      let _ = n.__wbindgen_add_to_stack_pointer(-16);
      n.__wbg_get_r2range_offset(_, this.__wbg_ptr);
      var t = b()[_ / 4 + 0], r = b()[_ / 4 + 1];
      return t === 0 ? void 0 : r >>> 0;
    } finally {
      n.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set offset(t) {
    n.__wbg_set_r2range_offset(this.__wbg_ptr, !p(t), p(t) ? 0 : t);
  }
  get length() {
    try {
      let _ = n.__wbindgen_add_to_stack_pointer(-16);
      n.__wbg_get_r2range_length(_, this.__wbg_ptr);
      var t = b()[_ / 4 + 0], r = b()[_ / 4 + 1];
      return t === 0 ? void 0 : r >>> 0;
    } finally {
      n.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set length(t) {
    n.__wbg_set_r2range_length(this.__wbg_ptr, !p(t), p(t) ? 0 : t);
  }
  get suffix() {
    try {
      let _ = n.__wbindgen_add_to_stack_pointer(-16);
      n.__wbg_get_r2range_suffix(_, this.__wbg_ptr);
      var t = b()[_ / 4 + 0], r = b()[_ / 4 + 1];
      return t === 0 ? void 0 : r >>> 0;
    } finally {
      n.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set suffix(t) {
    n.__wbg_set_r2range_suffix(this.__wbg_ptr, !p(t), p(t) ? 0 : t);
  }
};
var $ = class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    let t = this.__destroy_into_raw();
    n.__wbg_readablestreamgetreaderoptions_free(t);
  }
  get mode() {
    let t = n.readablestreamgetreaderoptions_mode(this.__wbg_ptr);
    return d(t);
  }
};
function Z(e, t) {
  let r = s(t).method, _ = O(r, n.__wbindgen_export_0, n.__wbindgen_export_1), o = h;
  b()[e / 4 + 1] = o, b()[e / 4 + 0] = _;
}
function G(e, t) {
  let r = s(t).url, _ = O(r, n.__wbindgen_export_0, n.__wbindgen_export_1), o = h;
  b()[e / 4 + 1] = o, b()[e / 4 + 0] = _;
}
function Q(e) {
  let t = s(e).headers;
  return i(t);
}
function tt(e) {
  let t = s(e).cf;
  return p(t) ? 0 : i(t);
}
function et() {
  return l(function() {
    let e = new Headers();
    return i(e);
  }, arguments);
}
function rt() {
  return l(function(e, t, r, _, o) {
    s(e).set(w(t, r), w(_, o));
  }, arguments);
}
function nt(e, t) {
  let r = s(t), _ = typeof r == "string" ? r : void 0;
  var o = p(_) ? 0 : O(_, n.__wbindgen_export_0, n.__wbindgen_export_1), u = h;
  b()[e / 4 + 1] = u, b()[e / 4 + 0] = o;
}
function _t(e) {
  let t;
  try {
    t = s(e) instanceof Error;
  } catch {
    t = false;
  }
  return t;
}
function ot(e) {
  let t = s(e).toString();
  return i(t);
}
function st(e) {
  let t = s(e).cause;
  return i(t);
}
function it(e) {
  d(e);
}
function ct() {
  return l(function(e, t, r) {
    let _ = new Response(e === 0 ? void 0 : w(e, t), s(r));
    return i(_);
  }, arguments);
}
function ut(e) {
  let t = new Uint8Array(e >>> 0);
  return i(t);
}
function ft() {
  return l(function(e, t) {
    let r = new Response(s(e), s(t));
    return i(r);
  }, arguments);
}
function bt() {
  return l(function(e, t) {
    let r = new Response(s(e), s(t));
    return i(r);
  }, arguments);
}
function gt() {
  return l(function(e, t, r) {
    let _ = s(e).call(s(t), s(r));
    return i(_);
  }, arguments);
}
function pt(e, t) {
  let r = w(e, t);
  return i(r);
}
function dt(e, t) {
  try {
    var r = { a: e, b: t }, _ = (u, c) => {
      let f = r.a;
      r.a = 0;
      try {
        return K(f, r.b, u, c);
      } finally {
        r.a = f;
      }
    };
    let o = new Promise(_);
    return i(o);
  } finally {
    r.a = r.b = 0;
  }
}
function at() {
  return l(function(e, t, r) {
    return Reflect.set(s(e), s(t), s(r));
  }, arguments);
}
function wt(e) {
  return s(e).length;
}
function lt() {
  let e = n.memory;
  return i(e);
}
function ht(e) {
  let t = s(e).buffer;
  return i(t);
}
function yt(e, t, r) {
  let _ = new Uint8Array(s(e), t >>> 0, r >>> 0);
  return i(_);
}
function xt(e, t, r) {
  s(e).set(s(t), r >>> 0);
}
function mt(e, t) {
  let r = A(s(t)), _ = O(r, n.__wbindgen_export_0, n.__wbindgen_export_1), o = h;
  b()[e / 4 + 1] = o, b()[e / 4 + 0] = _;
}
function jt(e, t) {
  throw new Error(w(e, t));
}
function kt(e) {
  let t = d(e).original;
  return t.cnt-- == 1 ? (t.a = 0, true) : false;
}
function Et(e, t) {
  let r = s(e).then(s(t));
  return i(r);
}
function Ot(e) {
  let t = Promise.resolve(s(e));
  return i(t);
}
function At(e, t) {
  s(e).respond(t >>> 0);
}
function Mt(e) {
  let t = s(e).byobRequest;
  return p(t) ? 0 : i(t);
}
function Tt(e) {
  let t = s(e).view;
  return p(t) ? 0 : i(t);
}
function qt(e) {
  return s(e).byteLength;
}
function Lt(e) {
  s(e).close();
}
function Ct(e, t) {
  let r = new Error(w(e, t));
  return i(r);
}
function St(e) {
  let t = s(e).buffer;
  return i(t);
}
function vt(e) {
  return s(e).byteOffset;
}
function $t(e) {
  s(e).close();
}
function Ft(e, t) {
  s(e).enqueue(s(t));
}
function Wt(e) {
  let t = s(e);
  return i(t);
}
function Dt(e) {
  console.error(s(e));
}
function Rt() {
  let e = new Object();
  return i(e);
}
function zt(e) {
  return i(e);
}
function It(e, t, r) {
  let _ = V(e, t, 39, B);
  return i(_);
}
var Bt = { fetch: F, scheduled: void 0, queue: void 0 };

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
};
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-ysKIJ1/middleware-insertion-facade.js
Bt.middleware = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default,
  ...Bt.middleware ?? []
].filter(Boolean);
var middleware_insertion_facade_default = Bt;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
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
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// .wrangler/tmp/bundle-ysKIJ1/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (worker.middleware === void 0 || worker.middleware.length === 0) {
    return worker;
  }
  for (const middleware of worker.middleware) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  };
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
function wrapWorkerEntrypoint(klass) {
  if (klass.middleware === void 0 || klass.middleware.length === 0) {
    return klass;
  }
  for (const middleware of klass.middleware) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
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
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  M as IntoUnderlyingByteSource,
  T as IntoUnderlyingSink,
  q as IntoUnderlyingSource,
  L as MinifyConfig,
  C as PipeOptions,
  X as PolishConfig,
  S as QueuingStrategy,
  v as R2Range,
  $ as ReadableStreamGetReaderOptions,
  Y as RequestRedirect,
  St as __wbg_buffer_4e79326814bdd393,
  ht as __wbg_buffer_55ba7a6b1b92e2ac,
  Mt as __wbg_byobRequest_08c18cee35def1f4,
  qt as __wbg_byteLength_5299848ed3264181,
  vt as __wbg_byteOffset_b69b0a07afccce19,
  gt as __wbg_call_587b30eea3e09332,
  st as __wbg_cause_52959bcad93f9e0f,
  tt as __wbg_cf_703652f0d2c5b8d1,
  Lt as __wbg_close_da7e6fb9d9851e5a,
  $t as __wbg_close_e9110ca16e2567db,
  Ft as __wbg_enqueue_d71a1a518e21f5c3,
  Dt as __wbg_error_a7e23606158b68b9,
  Q as __wbg_headers_1eff4f53324496e6,
  _t as __wbg_instanceof_Error_fac23a8832b241da,
  wt as __wbg_length_0aab7ffd65ad19ed,
  Z as __wbg_method_e15eb9cf1c32cdbb,
  et as __wbg_new_143b41b4342650bb,
  dt as __wbg_new_2b55e405e4af4986,
  Rt as __wbg_new_2b6fea4ea03b1b95,
  Ct as __wbg_new_87297f22973157c8,
  yt as __wbg_newwithbyteoffsetandlength_88d1d8be5df94b9b,
  ut as __wbg_newwithlength_89eeca401d8918c2,
  ft as __wbg_newwithoptbuffersourceandinit_6c49960a834dd7cf,
  bt as __wbg_newwithoptreadablestreamandinit_d238e5b972c7b57f,
  ct as __wbg_newwithoptstrandinit_ff70839f3334d3aa,
  Ot as __wbg_resolve_ae38ad63c43ff98b,
  At as __wbg_respond_8fadc5f5c9d95422,
  at as __wbg_set_07da13cc24b69217,
  xt as __wbg_set_3698e3ca519b3c3c,
  rt as __wbg_set_76353df4722f4954,
  Et as __wbg_then_8df675b8bb5d5e3c,
  ot as __wbg_toString_506566b763774a16,
  G as __wbg_url_3325e0ef088003ca,
  Tt as __wbg_view_231340b0dd8a2484,
  kt as __wbindgen_cb_drop,
  It as __wbindgen_closure_wrapper772,
  mt as __wbindgen_debug_string,
  lt as __wbindgen_memory,
  zt as __wbindgen_number_new,
  Wt as __wbindgen_object_clone_ref,
  it as __wbindgen_object_drop_ref,
  nt as __wbindgen_string_get,
  pt as __wbindgen_string_new,
  jt as __wbindgen_throw,
  middleware_loader_entry_default as default,
  F as fetch,
  N as getMemory,
  Vt as wasmModule
};
//# sourceMappingURL=shim.js.map
