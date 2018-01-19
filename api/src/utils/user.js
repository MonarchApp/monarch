const boom = require('boom');
const {getTokenFromRequest} = require('./request');

const userUtils = {};

userUtils.enforceSelfActionOnly = (request, reply) => {
  const tokenId = parseInt(getTokenFromRequest(request).id);
  const requestId = parseInt(request.params.id);

  if (requestId !== tokenId) {
    reply(boom.forbidden('This action may only be performed by the same user'));
    return;
  }

  reply.continue();
};

module.exports = userUtils;
