# URL Endpoint Function Examples

This folder contains ready-to-use examples for common URL transformation scenarios. Each file is a complete, working handler that you can copy directly to `handler.js`.

## Available Examples

1. **`01-simple-url-rewrite.js`** - Change version in path (e.g., /v1/ to /v2/)
2. **`02-path-parameters.js`** - Extract path parameters and convert to query string
3. **`03-hostname-change.js`** - Change domain/hostname
4. **`04-keyword-path-rewriting.js`** - Rewrite paths based on keyword mapping
5. **`05-query-parameter-transformation.js`** - Transform custom query params
6. **`06-access-control.js`** - Block access to private paths and sensitive files
7. **`07-error-handling.js`** - Handle errors gracefully with fallback
8. **`08-video-thumbnail.js`** - Generate video thumbnails with image extensions

## How to Use

1. Choose an example that matches your use case
2. Copy the entire file content
3. Paste it into `handler.js`
4. Modify as needed for your specific requirements
5. Run `npm test` to verify it works

## Testing Your Handler

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

## Need Help?

- Check the main [README.md](../README.md) for handler signature details
- Review the inline comments in each example file
- Combine multiple patterns to create more complex handlers
