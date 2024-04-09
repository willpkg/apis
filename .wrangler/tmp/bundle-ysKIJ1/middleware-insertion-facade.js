				import worker, * as OTHER_EXPORTS from "/workspaces/apis/build/worker/shim.mjs";
				import * as __MIDDLEWARE_0__ from "/workspaces/apis/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts";
import * as __MIDDLEWARE_1__ from "/workspaces/apis/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts";
				
				worker.middleware = [
					__MIDDLEWARE_0__.default,__MIDDLEWARE_1__.default,
					...(worker.middleware ?? []),
				].filter(Boolean);
				
				export * from "/workspaces/apis/build/worker/shim.mjs";
				export default worker;