const Promise = require('bluebird');
const _ = require('lodash');

const bcrypt = require('bcrypt');
const boom = require('boom');
const bounce = require('bounce');
const joi = require('joi');

const {enforceSelfActionOnly} = require('../utils/user');
const {getTokenFromRequest} = require('../utils/request');

const hash = Promise.promisify(bcrypt.hash);

const users = {
  delete: {},
  get: {},
  patch: {},
  post: {}
};

users.delete.config = {
  pre: [enforceSelfActionOnly],
};

users.delete.handler = async (request, h) => {
  const {id} = request.params;

  try {
    await request.knex('user_account').where({id}).delete();
    return h.response().code(204);
  } catch (error) {
    bounce.rethrow(error, 'system');
    request.log(['error', 'user', 'delete'], `Failed to delete user with id "${id}"`);

    return boom.badImplementation();
  }
};

users.get.config = {
  pre: [enforceSelfActionOnly],
};

users.get.handler = async (request, h) => {
  const {id} = request.params;

  try {
    const [user] = await request.knex('user_account').select().where({id});
    return h.response(user || {}).code(200);
  } catch (error) {
    bounce.rethrow(error, 'system');
    request.log(['error', 'user', 'get'], `Failed to get user with id "${id}"`);

    return boom.badImplementation();
  }
};

users.patch.config = {
  pre: [enforceSelfActionOnly],
  validate: {
    payload: {
      bio: joi.string().max(500)
    }
  }
};

users.patch.handler = async (request, h) => {
  const id = parseInt(getTokenFromRequest(request).id);

  if (_.isEmpty(request.payload)) return h.response().code(200);

  const now = request.knex.fn.now();
  const newValues = Object.assign({}, request.payload, {modifyDate: now});

  try {
    await request.knex('user_account').where({id}).update(newValues);
    return h.response().code(200);
  } catch (error) {
    bounce.rethrow(error, 'system');
    request.log(['error', 'user', 'patch'], `Failed to update user with id "${id}"`);

    return boom.badImplementation();
  }
};

users.post.handler = async (request, h) => {
  const {email, password} = request.payload;
  const {saltRounds} = request.config.get('auth');
  let hashedPassword;

  try {
    hashedPassword = await hash(password, saltRounds);
  } catch (error) {
    bounce.rethrow(error, 'system');
    request.log(
      ['error', 'user', 'post'],
      `Failed to generate hash while creating user for ${email}`
    );

    return boom.badImplementation();
  }

  const userObject = {
    email,
    password: hashedPassword
  };

  try {
    await request.knex('user_account').insert(userObject);

    // TODO: Send user email
    return h.response().code(201);
  } catch (error) {
    bounce.rethrow(error, 'system');

    if (error.message.indexOf('user_account_email_unique') > -1) {
      return h.response().code(201);
    }

    request.log(
      ['error', 'user', 'post'],
      `Failed to create user with email "${email}"`
    );

    return boom.badImplementation();
  }
};

users.post.config = {
  auth: false,
  validate: {
    payload: {
      email: joi.string().email().required(),
      password: joi.string().max(72).required()
    }
  }
};

module.exports = users;
