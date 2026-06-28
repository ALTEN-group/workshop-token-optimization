// @ts-check

import { execute } from "@dwtechs/antity-pgsql";
import rEnt from "../entities/route.js";
import { stripTrailingSlash } from "../utils/url.js";

/**
 * @typedef {Object} RouteConfig
 * @property {string} url - The URL pattern to match (prefix with ~ for regex)
 * @property {string[]} methodNames - Array of allowed HTTP method names
 */

/** @type {Map<string, RouteConfig[]>} method → routes that accept that method */
let routesByMethod = new Map();

/** @type {Map<string, string>} */
let serviceBaseUrls = new Map();

/**
 * Initializes the route cache by loading all route configurations from the database.
 * This function should be called once when the application starts to populate the
 * in-memory cache with route data for fast pattern matching during request processing.
 * Routes are used to determine which requests are valid and whether they require authentication.
 * Uses the @dwtechs/antity-pgsql library to build and execute the SQL query.
 *
 * @return {Promise<void>} A promise that resolves when all routes have been loaded into cache
 * @throws {Error} Database connection or query execution errors
 * @example
 * // Initialize route cache at application startup
 * await init();
 * console.log('Route cache initialized with', routes.length, 'routes');
 */
function init() {
  const filters = {
    archived: {
      value: false,
      matchMode: "equals",
    },
  };
  const { query, args } = rEnt.query.select(0, 0, "id", "ASC", filters);
  const { APP_NAME, ENV_NAME } = process.env;
  const scheme = process.env.SERVER_SCHEME ?? "http://";
  const port = process.env.PORT ?? "3000";
  const san = `${scheme}${APP_NAME}-`;
  const ep = `-${ENV_NAME}:${port}`;
  return execute(query, args, null).then((r) => {
    // Collect unique service names to build base URLs later
    // const serviceNames = new Set();
    // Reset the method index: each key is an HTTP method (GET, POST…),
    // each value is the subset of routes that accept that method
    routesByMethod = new Map();
    for (const row of r.rows) {
      serviceNames.add(row.serviceName);
    }
    serviceBaseUrls = new Map(
      [...serviceNames].map((name) => [name, `${san}${name}${ep}`]),
    );
  });
}

/**
 * Finds a route configuration that matches the given URL and HTTP method.
 * Routes are matched using regex patterns - if a route pattern starts with '~',
 * it's treated as a regex pattern (with the '~' stripped), otherwise it's used as-is.
 * The URL is normalized by removing trailing slashes before matching.
 *
 * @param {string} requestUrl - The incoming request URL to match against route patterns
 * @param {string} requestMethod - The HTTP method (GET, POST, PUT, DELETE, etc.)
 * @return {RouteConfig|undefined} The matching route object with url, methods, and other config, or undefined if no match
 * @example
 * // Route with url: "~/api/users/[0-9]+" and methods: ["GET"]
 * getOne('/api/users/123', 'GET') // returns the matching route
 * getOne('/api/users/abc', 'GET') // returns undefined (no match)
 */
function getOne(requestUrl, requestMethod) {
  const candidates = routesByMethod.get(requestMethod);
  if (!candidates) return undefined;
  // Strip query string and normalize URL by removing trailing slash for consistent matching
  const pathOnly = requestUrl.split("?")[0];
  const actualUrl = stripTrailingSlash(pathOnly);
  // Find the first route that matches the URL within the method bucket
  return candidates.find((r) => r._regex.test(actualUrl));
}

function getServiceBaseUrl(serviceName) {
  return serviceBaseUrls.get(serviceName);
}

/**
 * Deletes all archived routes from the database that have been archived for a specified duration.
 * This function is typically run by a scheduled job to clean up old/inactive route records.
 *
 * @param {Date} date - The date before which archived routes should be deleted.
 * @throws {Error} Database connection or query execution errors
 * @example
 * // Delete all routes archived for more than 2 months
 * const twoMonthsAgo = new Date();
 * twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
 * const deletedCount = await deleteArchived(twoMonthsAgo);
 * console.log(`Deleted ${deletedCount} archived route(s)`);
 */
function deleteArchived(date) {
  const q = rEnt.query.deleteArchive();
  return execute(q, [date], null).then((r) => r.rowCount || 0);
}

export default {
  init,
  getOne,
  getServiceBaseUrl,
  deleteArchived,
};
