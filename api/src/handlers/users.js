const Joi = require('joi');
const Boom = require('boom');
const co = require('co');
const _ = require('lodash');

const USER_FIELDS = ['email'];

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
    const [userEmail] = yield request.knex
      .select('email')
      .from('users')
      .where({email: request.payload.email});

    if(userEmail) {
      request.log(['error'], `Email "${request.payload.email}" is invalid or it exists`);
      return reply(Boom.badRequest('Email invalid or exists'));
    }

    const [userId] = yield request.knex('users')
      .returning('id')
      .insert(request.payload);

    const response = _(request.payload)
      .pick(USER_FIELDS)
      .set('id', userId)
      .value();

    request.log(['info'], `User "${request.payload.email}" created`);

    reply(response);
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
