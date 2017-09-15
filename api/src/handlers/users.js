const Joi = require('joi');
const Boom = require('boom');
const co = require('co');

const Users = {
  delete: {},
  get: {},
  getAll: {},
  post: {}
};

Users.delete.handler = () => {};
Users.get.handler = () => {};
Users.getAll.handler = () => {};

Users.post.handler = co.wrap(function*(request, reply) {
  const {email} = request.payload;
  const userCreatedMessage = `User created for "${email}"`;

  try {
    yield request.knex('users').insert(request.payload);

    reply.response().code(201);
  } catch (error) {
    if (error.message.indexOf('users_email_unique') > -1) {
      return reply.response().code(201);
    }

    reply(Boom.badImplementation());
  } finally {
    request.log(['info'], userCreatedMessage);
  }
});

Users.post.config = {
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }
};

module.exports = Users;
