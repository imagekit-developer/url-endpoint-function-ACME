/**
 * URL Endpoint Function Handler
 * 
 * This is a default no-op handler that returns the URL unchanged.
 * Modify this function to implement your custom URL transformation logic.
 * 
 * @param {string} url - Full request URL including protocol, hostname, path, and query string
 * @param {string} urlPrefix - Pattern identifier from client configuration
 * @param {object} context - Read-only request context
 * @param {string} context.host - Request hostname
 * @param {string} context.clientNumber - Client identifier
 * @param {boolean} context.isDebug - Debug mode flag
 * @param {object} context.logger - Request logger
 * 
 * @returns {object} Result object with url and optional signURL flag
 */
function handler(url, urlPrefix, context) {
  // Default behavior: return URL unchanged without signing
  return {
    url: url,
    signURL: false
  };
}

module.exports.handler = handler;
