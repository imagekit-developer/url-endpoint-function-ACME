# URL Endpoint Function Template

Template for creating and testing ImageKit URL Endpoint Functions with unit tests and GitHub Actions CI.

## Requirements

- **Node.js 14.x** - Required for compatibility

## Quick Start

```bash
npm install
npm test
```

## Handler Signature

```javascript
function handler(url, urlPrefix, context) {
  // Your logic here
  return { url: modifiedUrl }
}

// Important: Always export using this format
module.exports.handler = handler;
```

**Note:** Always include `module.exports.handler = handler;` at the end of your handler file.

### Parameters

- **`url`** - Full request URL including protocol, hostname, path, and query string
- **`urlPrefix`** - Pattern identifier from client configuration
- **`context`** - Request context object:
  - `host` - Request hostname
  - `clientNumber` - Client identifier
  - `isDebug` - Debug mode flag
  - `logger` - Request logger (`.info()`, `.warn()`, `.error()`, `.debug()`)

### Return Types

**Normal Result** (continue processing):
```javascript
{
  url: string,      // Required: Full URL with protocol + hostname
  signURL: boolean  // Optional: Should server sign this URL? (default: false)
}
```

**Early Response** (stop processing):
```javascript
{
  status: number,                    // Required: HTTP status code
  body: string | object,             // Required: Response body
  headers: Record<string, string>    // Optional: Response headers
}
```

## Examples

See the [`examples/`](./examples) folder for ready-to-use handler implementations:

1. **Simple URL Rewrite** - Change version in path (e.g., /v1/ to /v2/)
2. **Path Parameters** - Extract path parameters and convert to query string
3. **Hostname Change** - Change domain/hostname
4. **Keyword Path Rewriting** - Rewrite paths based on keyword mapping
5. **Query Parameter Transformation** - Transform custom query params
6. **Access Control** - Block access to private paths and sensitive files
7. **Error Handling** - Handle errors gracefully with fallback
8. **Video Thumbnail** - Generate video thumbnails with image extensions

Each example is a complete, working handler file that you can copy directly to `handler.js`. See [`examples/README.md`](./examples/README.md) for details.

### Quick Example

```javascript
function handler(url, urlPrefix, context) {
  return {
    url: url.replace('/v1/', '/v2/')
  };
}

module.exports.handler = handler;
```

## Testing

```bash
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

### Multiple Handlers

This template supports multiple handlers in the same repository. Each handler should follow the naming convention `handler*.js` with a corresponding test file `handler*.test.js`.

**Current structure:**
```
handler1.js          # Handler implementation 1
handler1.test.js     # Tests for handler 1
handler2.js          # Handler implementation 2
handler2.test.js     # Tests for handler 2
```

All test files matching `**/*.test.js` will be automatically discovered and executed by Jest. The CI pipeline will run all tests for all handlers.

**To add a new handler:**
1. Create `handlerN.js` with your handler implementation
2. Create `handlerN.test.js` with corresponding tests
3. Run `npm test` to verify all handlers pass their tests

Coverage is collected for all `handler*.js` files automatically.

## CI/CD

GitHub Actions automatically runs tests on push/PR to `main` or `develop` branches. All test files will be executed and coverage will be reported for all handlers.