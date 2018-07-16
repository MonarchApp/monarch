const boom = require('boom');
const {getTokenFromRequest} = require('./request');

const userUtils = {};

userUtils.enforceSelfActionOnly = (request, h) => {
  const userIdFromToken = parseInt(getTokenFromRequest(request).id);
  const userIdFromRequest = parseInt(request.params.id);

  if (userIdFromRequest !== userIdFromToken) {
    return boom.forbidden();
  }

  return h.continue;
};

module.exports = userUtils;
