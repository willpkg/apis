# apis

The APIs for will.

## Specification

All results are minified before they are returned by the API.

### Error

eg. `/thispagedoesnotexist`

```json
{
    "e": "<error> (eg. 500 Internal Server Error/Package not found)"
}
```

### Latest version

`GET /latest`

```json
{
    "v": "<version> (eg. 0.1.0)"
}
```

### Package

`GET /package`

#### Query parameters

| Parameter (*required) | Description                                                                                                                        | Example                 |
|-----------------------|------------------------------------------------------------------------------------------------------------------------------------|-------------------------|
| *p                    | The package name you are requesting                                                                                                | `?p=will`               |
| a                     | Your architecture, specified in the format `{os}-{arch}-{compiler}`  If no arch is specified, then automatically return all arches | `?a=linux-x86_64-gcc`   |
| v                     | The version requested for the package  If left blank, it automatically chooses the latest package                                  | `?v=0.1.0`              |
| r                     | Return binary or source  If left blank both will be returned                                                                       | `?r=binary` `?r=source` |

```json
```

## Cloudflare Workers

This index.js file is designed to work on Cloudflare Workers.

### Develop

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and log in
2. Press 'Workers and Pages' on the sidebar
3. Press 'Create application'
4. Press 'Create Worker'
5. Press 'Deploy'
6. Paste the contents of `index.js` in
