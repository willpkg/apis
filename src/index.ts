import packages from './packages.json';

export interface Env {}
export interface ExecutionContext {}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		var packages = JSON
		if (url.pathname === "/latest") {
			return new Response('0.1.0');
		}
		else if (url.pathname === "/package") {
			const urlParams = new URLSearchParams(window.location.search);
			if (urlParams.get("p") === null) {
				return new Response("Missing quqery parameter p.", {
					status: 400,
					statusText: "Missing quqery parameter p."
				})
			}
			else if (urlParams.get("p") in packages && urlParams.get("p") !== null) {

			}
		}
		else {
			return new Response("404 Not Found", {
				status: 404,
				statusText: "The requested resource was not found."
			});
		}
		// Fallback
		return new Response("500 Internal Server Error", {
			status: 500,
			statusText: "An unknown error occured on the server."
		});
	},
};
