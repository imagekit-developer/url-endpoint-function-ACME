/**
 * Error Handling
 * 
 * Handle errors gracefully and fallback to original URL
 */

function handler(url, urlPrefix, context) {
  try {
    const modifiedUrl = complexTransform(url);
    return { url: modifiedUrl };
  } catch (error) {
    context.logger.error({ error }, 'Transform failed');
    return { url }; // Fallback to original URL
  }
}

function complexTransform(url) {
  // Your complex transformation logic here
  const parsedUrl = new URL(url);
  // ... transformation code ...
  return parsedUrl.toString();
}

module.exports.handler = handler;
