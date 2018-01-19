const jwt = require('jsonwebtoken');

const BEARER_TOKEN_LENGTH = 'Bearer '.length;

const requestUtils = {};

requestUtils.getTokenFromRequest = (request) => jwt.decode(
  request.headers.authorization.substr(BEARER_TOKEN_LENGTH)
);

module.exports = requestUtils;
