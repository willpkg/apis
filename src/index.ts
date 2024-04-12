// src/index.ts
// BE CAREFUL: 0th element in a package is the latest

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

/* var packages = {
  will: {
    latest: "0.1.0",
    "0.1.0": { // this is latest because it is at top
      binary: {
        "linux-x86_64": {
          "checksum": "",
          "links": [],
        },
        "macos-arm64": {
          "checksum": "",
          "links": [],
        },
        "macos-x86_64": {
          "checksum": "",
          "links": [],
        },
        "windows-x86_64": {
          "checksum": "",
          "links": [],
        },
      },
      source: {
        "checksum": "",
        "links": ["https://gitlab.com/willpkg/cli/-/archive/main/cli-main.tar.gz"],
      }
    },
  },
}; */

/*
export default {
  async fetch(request) {
    console.log(packages);
    const url = new URL(request.url);
    var { searchParams } = new URL(request.url);
    const pathname = url.pathname;
    if (pathname === "/latest") {
      return new Response('{"v": "0.1.0"}');
    } else if (pathname === "/package") {
      const param_p = searchParams.get("p") || "";
      if (param_p === "") {
        return new Response('{"e": "Missing query paramater p."}', {
          status: 400,
          statusText: "Missing query parameter p."
        });
      } else if (!(param_p in packages)) {
        return new Response('{"e": "Package not found."}', {
          status: 404,
          statusText: "Package not found."
        });
      } else if (param_p in packages) {
        let version = searchParams.get("v") || "";
        let latest_version = "";
        if (version === "") {
          latest_version = packages[param_p]["latest"];
        }
        else if (packages[param_p][version] === undefined) {
          return new Response('{"e": "Version not found."}', {
            status: 404,
            statusText: "Version not found."
          });
        }
        else {
          latest_version = version;
        }
        // let latest_version = packages[param_p]["latest"];
        const param_a_real = searchParams.get("a") || "";
        const arch = param_a_real.split("-");
        const param_a = `${arch[0]}-${arch[1]}` || "";
        console.log(param_a);
        const param_r = searchParams.get("r") || "";
        if (param_a_real === "") {
          if (param_r === "") {
            return new Response(JSON.stringify({
              v: packages[param_p][latest_version]["version"],
              b: packages[param_p][latest_version]["binary"],
              s: packages[param_p][latest_version]["source"]
            }));
          }
          else if (param_r === "source") {
            return new Response(JSON.stringify({
              v: packages[param_p][latest_version]["version"],
              s: packages[param_p][latest_version]["source"]
            }));
          }
          else if (param_r === "binary") {
            return new Response(JSON.stringify({
              v: packages[param_p][latest_version]["version"],
              b: packages[param_p][latest_version]["binary"],
            }));
          }
          else {
            return new Response('{"e": "`r` has to be either `source` or `binary`."}', {
              status: 400,
              statusText: "`r` has to be either `source` or `binary`."
            });
          }
        }
        else if (packages[param_p][latest_version]["binary"][param_a] === undefined) {
          return new Response('{"e": "Architecture not found."}', {
            status: 404,
            statusText: "Architecture not found."
          });
        }
        else {
          if (param_r === "") {
            return new Response(JSON.stringify({
              v: latest_version,
              b: packages[param_p][latest_version]["binary"][param_a],
              s: packages[param_p][latest_version]["source"]
            }));
          }
          else if (param_r === "source") {
            return new Response(JSON.stringify({
              v: latest_version,
              s: packages[param_p][latest_version]["source"]
            }));
          }
          else if (param_r === "binary") {
            return new Response(JSON.stringify({
              v: latest_version,
              b: packages[param_p][latest_version]["binary"][param_a],
            }));
          }
          else {
            return new Response('{"e": "`r` has to be either `source` or `binary`."}', {
              status: 400,
              statusText: "`r` has to be either `source` or `binary`."
            });
          }
        }
      }
    } else {
      return new Response('{"e": "404 Not Found"}', {
        status: 404,
        statusText: "The requested resource was not found."
      });
    }
    return new Response('{"e": "500 Internal Server Error"}', {
      status: 500,
      statusText: "An unknown error occured on the server."
    });
  }
};
*/

export interface Env {
  DATABASE_URL: string;
}
export interface ExecutionContext {

}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // TODO add logic
    // YES THIS WORKS!
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate())
    const tableNames = await prisma.$queryRaw`SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    `;
    const user = await prisma.packages.findMany({
      where: {
        name: {
          contains: 'will',
        },
      },
      cacheStrategy: { swr: 60000, ttl: 60000 },
    });
    console.log(user);
    return new Response(`Hello World from ${user}!`);
	},
};

