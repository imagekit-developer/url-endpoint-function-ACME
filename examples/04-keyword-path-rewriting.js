/**
 * Keyword-Based Path Rewriting
 * 
 * Rewrite paths based on keyword mapping
 */

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

module.exports.handler = handler;
