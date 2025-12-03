/**
 * Early Response - Access Control
 * 
 * Block access to private paths and sensitive file types
 */

function handler(url, urlPrefix, context) {
  const parsedUrl = new URL(url);

  // Block access to private paths
  if (parsedUrl.pathname.includes('/private/')) {
    context.logger.warn({
      path: parsedUrl.pathname,
      clientNumber: context.clientNumber
    }, 'Access denied to private path');
    
    return {
      status: 403,
      body: { error: 'Access denied' }
    };
  }

  // Block certain file extensions
  const blockedExtensions = ['.env', '.config', '.key'];
  if (blockedExtensions.some(ext => parsedUrl.pathname.endsWith(ext))) {
    context.logger.warn({
      path: parsedUrl.pathname
    }, 'Blocked sensitive file type');
    
    return {
      status: 403,
      body: { error: 'File type not allowed' }
    };
  }

  return { url };
}

module.exports.handler = handler;
