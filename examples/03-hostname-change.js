/**
 * Hostname Change
 * 
 * Change domain from one hostname to another
 */

function handler(url, urlPrefix, context) {
  // Change domain from old-domain.com to new-domain.com
  const parsedUrl = new URL(url);
  parsedUrl.hostname = 'new-domain.com';

  return {
    url: parsedUrl.toString()
  };
}

module.exports.handler = handler;
