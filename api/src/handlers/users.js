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
  try {
    const {email} = request.payload;
    const userCreatedMessage = `User created for "${email}"`;

    const [existingEmail] = yield request.knex
      .select('email')
      .from('users')
      .where({email});

    if (existingEmail) {
      request.log(['info'], userCreatedMessage);
      return reply.response().code(201);
    }

    yield request.knex('users').insert(request.payload);

    request.log(['info'], userCreatedMessage);
    reply.response().code(201);
  } catch (error) {
    reply(Boom.badImplementation());
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
