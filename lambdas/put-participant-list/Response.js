const RESPONSE_HEADERS = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'OPTIONS,POST',
};

// eslint-disable-next-line require-jsdoc
function sendResponse(
    statusCode,
    body,
    headers = RESPONSE_HEADERS) {
  return {
    statusCode,
    body,
    headers,
  };
}

module.exports = {
  sendResponse,
};
