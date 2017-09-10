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
Users.get.handler = (request, reply) => {
  reply('shit');
};
Users.getAll.handler = () => {};

Users.post.handler = co.wrap(function*(request, reply) {
  try {
    const [userId] = yield request.knex('users').insert(request.payload);
    const response = _(request.payload)
      .pick(USER_FIELDS)
      .set('id', userId)
      .value();

    reply(response);
  } catch (error) {
    console.log(error);
    // TODO - Replace with better error response
    reply(Boom.badImplementation);
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
