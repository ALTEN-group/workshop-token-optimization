/**
 * Prepare and send response back to the front-end
 * This JavaScript function, send, prepares and sends a response back to the front-end.
 * It takes two parameters: req (request) and res (response).
 * If res.locals exists, it sends it as a JSON response.
 * If res.locals doesn't exist, it sends a 204 status code (No Content) response.
 */
function send(_req, res) {
  const data = res.locals;
  res.status(200).json({ rows: data.rows, total: data.total });
}

export { send };
