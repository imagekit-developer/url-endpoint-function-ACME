/**
 * Parameter Extraction from Path
 * 
 * Convert path-based parameters to query string transformations
 * Example: /w_100/h_200/image.jpg → /image.jpg?tr=w-100,h-200
 */

function handler(url, urlPrefix, context) {
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

module.exports.handler = handler;
