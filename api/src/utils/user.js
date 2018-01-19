const boom = require('boom');
const {getTokenFromRequest} = require('./request');

const userUtils = {};

userUtils.enforceSelfActionOnly = (request, reply) => {
  const userIdFromToken = parseInt(getTokenFromRequest(request).id);
  const userIdFromRequest = parseInt(request.params.id);

  if (userIdFromRequest !== userIdFromToken) {
    reply(boom.forbidden('This action may only be performed by the same user'));
    return;
  }

  reply.continue();
};

module.exports = userUtils;
