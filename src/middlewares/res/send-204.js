// @ts-check

/**
 * Express middleware that sends a 204 No Content response.
 * Used for successful operations that don't return any content (typically DELETE).
 * 
 * @param {import('express').Request} _req - Express request object (unused)
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} _next - Express next function (unused)
 * @return {void} Sends 204 response
 * @example
 * // Use as final middleware in route
 * router.delete('/resource', deleteResource, send204);
 */
export function send204(_req, res, _next) {
  res.status(204).send();
}
