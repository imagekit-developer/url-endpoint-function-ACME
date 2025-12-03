/**
 * Query Parameter Transformation
 * 
 * Convert custom query params to ImageKit transformation format
 * Example: ?width=100&height=200 → ?tr=w-100,h-200
 */

function handler(url, urlPrefix, context) {
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

module.exports.handler = handler;
