// src/index.ts
// BE CAREFUL: 0th element in a package is the latest

var packages = {
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
  };
  var src_default = {
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
          const param_a = searchParams.get("a") || "";
          if (param_a === "") {
            return new Response(JSON.stringify({
              v: packages[param_p][latest_version]["version"],
              b: packages[param_p][latest_version]["binary"],
              s: packages[param_p][latest_version]["source"]
            }));
          }
          else if (packages[param_p][latest_version]["binary"][param_a] === undefined) {
            return new Response('{"e": "Architecture not found."}', {
              status: 404,
              statusText: "Architecture not found."
            });
          }
          else {
            return new Response(JSON.stringify({
              v: latest_version,
              b: packages[param_p][latest_version]["binary"][param_a],
              s: packages[param_p][latest_version]["source"]
            }));
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
  export {
    src_default as default
  };
  