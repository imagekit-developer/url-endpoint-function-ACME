# URL Endpoint Function Template

Template for creating and testing ImageKit URL Endpoint Functions with unit tests and GitHub Actions CI.

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
```

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

### 1. Simple URL Rewrite

```javascript
function handler(url, urlPrefix, context) {
  return {
    url: url.replace('/v1/', '/v2/')
  };
}
```

### 2. Extract Path Parameters

```javascript
function handler(url, urlPrefix, context) {
  // Convert: /w_100/h_200/image.jpg → /image.jpg?tr=w-100,h-200
  const parsedUrl = new URL(url);
  const params = [];
  
  parsedUrl.pathname = parsedUrl.pathname.replace(
    /\/(w|h)_(\d+)/g,
    (match, key, value) => {
      params.push(`${key}-${value}`);
      return '';
    }
  );
  
  if (params.length > 0) {
    parsedUrl.search = `?tr=${params.join(',')}`;
  }
  
  return {
    url: parsedUrl.toString(),
    signURL: true
  };
}
```

### 3. Block Private Paths

```javascript
function handler(url, urlPrefix, context) {
  const parsedUrl = new URL(url);
  
  if (parsedUrl.pathname.includes('/private/')) {
    return {
      status: 403,
      body: { error: 'Access denied' }
    };
  }
  
  return { url };
}
```

**See [examples.js](./examples.js) for 12+ more examples** including hostname changes, routing, query transformations, and more.

## Testing

```bash
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

## CI/CD

GitHub Actions automatically runs tests on push/PR to `main` or `develop` branches. Tests run on Node.js 18.x and 20.x.