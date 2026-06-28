// @ts-check

/**
 * Detects catastrophically backtracking (ReDoS) regex patterns.
 * Flags nested quantifiers of the form (X+)+, (X*)*, (X+)* etc.
 * This covers the most common class of ReDoS vulnerabilities without
 * requiring an external package.
 *
 * Examples flagged:  (a+)+   (a*)*   (\w+)+   ([a-z]+)+
 * Examples allowed:  /\d+    /search  /(?<id>\d+)/history
 */
const NESTED_QUANTIFIER_RE = /\([^)]*[+*{][^)]*\)[+*?{]/;

/**
 * Express middleware that validates route `pattern` fields in req.body.rows
 * against known ReDoS-prone structures before they are written to the database.
 * Applied to both POST (insert) and PUT (update) on the /gateway/routes endpoint.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function checkRoutePattern(req, res, next) {
  const rows = req.body?.rows;
  if (!Array.isArray(rows)) return next();

  for (const row of rows) {
    const pattern = row.pattern;
    if (typeof pattern !== "string") continue;

    if (NESTED_QUANTIFIER_RE.test(pattern)) {
      return next({
        statusCode: 400,
        message: `Route pattern "${pattern}" contains nested quantifiers that may cause catastrophic backtracking (ReDoS).`,
      });
    }

    // Also reject patterns that cannot be compiled at all
    try {
      new RegExp(pattern);
    } catch {
      return next({
        statusCode: 400,
        message: `Route pattern "${pattern}" is not a valid regular expression.`,
      });
    }
  }

  next();
}
