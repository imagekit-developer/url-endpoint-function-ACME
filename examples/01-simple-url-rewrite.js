/**
 * Simple URL Rewrite
 * 
 * Change version in path (e.g., /v1/ to /v2/)
 */

function handler(url, urlPrefix, context) {
  // Change /v1/ to /v2/ in path
  return {
    url: url.replace('/v1/', '/v2/')
  };
}

module.exports.handler = handler;
