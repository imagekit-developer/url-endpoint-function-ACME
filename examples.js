/**
 * URL Endpoint Function Handler Examples
 * 
 * This file contains example implementatie for common use cases.
 * Copy any example to handler.js and modify as needed.
 * 
 * Note: Only one function named 'handler' can be exported at a time.
 * To use an example, copy the function body to handler.js.
 */

// ============================================================================
// Example: Simple URL Rewrite (Change version in path)
// ============================================================================

function handler(url, urlPrefix, context) {
  // Change /v1/ to /v2/ in path
  return {
    url: url.replace('/v1/', '/v2/')
  };
}

// ============================================================================
// Example: Parameter Extraction from Path
// ============================================================================

function handler(url, urlPrefix, context) {
  // Convert path-based parameters to query string transformations
  // Example: /w_100/h_200/image.jpg → /image.jpg?tr=w-100,h-200
  
  const parsedUrl = new URL(url);
  const params = [];
  const regex = /\/(w|h)_(\d+)/g;

  let cleanPath = parsedUrl.pathname.replace(regex, (match, key, value) => {
    params.push(`${key}-${value}`);
    return '';
  });

  cleanPath = cleanPath.replace(/\/{2,}/g, '/');

  if (params.length > 0) {
    parsedUrl.pathname = cleanPath;
    parsedUrl.search = `?tr=${params.join(',')}`;
    
    context.logger.info({
      transformations: params.join(',')
    }, 'Converted path parameters to query string');
  }

  return {
    url: parsedUrl.toString(),
    signURL: true // Server will sign the modified URL
  };
}

// ============================================================================
// Example: Hostname Change
// ============================================================================

function handler(url, urlPrefix, context) {
  // Change domain from old-domain.com to new-domain.com
  const parsedUrl = new URL(url);
  parsedUrl.hostname = 'new-domain.com';

  return {
    url: parsedUrl.toString()
  };
}

// ============================================================================
// Example: Keyword-Based Path Rewriting
// ============================================================================

function handler(url, urlPrefix, context) {
  // Rewrite paths based on keywords
  const parsedUrl = new URL(url);
  
  const KEYWORD_MAP = {
    'products': 'prod',
    'images': 'img',
    'thumbnails': 'thumb'
  };
  
  // Replace keywords in path
  const pathParts = parsedUrl.pathname.split('/');
  const newPathParts = pathParts.map(part => KEYWORD_MAP[part] || part);
  parsedUrl.pathname = newPathParts.join('/');
  
  return {
    url: parsedUrl.toString()
  };
}

// ============================================================================
// Example: Query Parameter Transformation
// ============================================================================

function handler(url, urlPrefix, context) {
  // Convert custom query params to ImageKit transformation format
  // Example: ?width=100&height=200 → ?tr=w-100,h-200
  
  const parsedUrl = new URL(url);
  const width = parsedUrl.searchParams.get('width');
  const height = parsedUrl.searchParams.get('height');
  const quality = parsedUrl.searchParams.get('quality');

  if (width || height || quality) {
    const transforms = [];
    if (width) transforms.push(`w-${width}`);
    if (height) transforms.push(`h-${height}`);
    if (quality) transforms.push(`q-${quality}`);

    // Remove old params and add new transformation
    parsedUrl.searchParams.delete('width');
    parsedUrl.searchParams.delete('height');
    parsedUrl.searchParams.delete('quality');
    parsedUrl.searchParams.set('tr', transforms.join(','));
    
    context.logger.info({
      transformations: transforms.join(',')
    }, 'Converted custom params to ImageKit format');
  }

  return {
    url: parsedUrl.toString(),
    signURL: true
  };
}

// ============================================================================
// Example: Early Response - Access Control
// ============================================================================

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

// ============================================================================
// Example: Error Handling
// ============================================================================

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

// ============================================================================
// Example: Adding Thumbnail Suffix
// ============================================================================

function handler(url, urlPrefix, context) {
  // Add /ik-thumbnail.jpg suffix to generate thumbnails from videos with image extensions
  const parsedUrl = new URL(url);
  
  if (parsedUrl.pathname.includes('/video/') && 
      parsedUrl.pathname.match(/\.(jpg|jpeg|png|webp)$/i)) {
    
    const pathWithoutExtension = parsedUrl.pathname.replace(/\.[^.]+$/, '');
    parsedUrl.pathname = `${pathWithoutExtension}.mp4/ik-thumbnail.jpg`;
    
    context.logger.info({ 
      originalPath: url, 
      modifiedPath: parsedUrl.toString() 
    }, 'Added thumbnail suffix');
  }
  
  return {
    url: parsedUrl.toString()
  };
}
