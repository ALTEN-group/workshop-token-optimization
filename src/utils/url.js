
const TRAILING_SLASH_RE = /\/$/;

/**
 * Removes trailing slash from a URL string if present.
 * This ensures consistent URL matching by normalizing URLs with and without trailing slashes.
 * Uses regex pattern /\/$/ which matches a forward slash (\/) at the end of string ($).
 *
 * @param {string} url - The URL string to process
 * @return {string} The URL without a trailing slash
 * @example
 * stripTrailingSlash('/api/users/') // returns '/api/users'
 * stripTrailingSlash('/api/users')  // returns '/api/users'
 */
export function stripTrailingSlash(url) {
  return url.replace(TRAILING_SLASH_RE, "");
}
