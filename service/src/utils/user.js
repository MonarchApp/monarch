const boom = require('boom');
const {getTokenFromRequest} = require('./request');

const userUtils = {};

userUtils.enforceSelfActionOnly = (request, h) => {
  const userIdFromToken = getTokenFromRequest(request).id;
  const userIdFromRequest = request.params.id;

  if (userIdFromRequest !== userIdFromToken) {
    return boom.forbidden();
  }

  return h.continue;
};

module.exports = userUtils;
