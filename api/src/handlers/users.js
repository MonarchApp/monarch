const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const boom = require('boom');
const joi = require('joi');
const {enforceSelfActionOnly} = require('../utils/user');

const hash = Promise.promisify(bcrypt.hash);

const users = {
  delete: {},
  get: {},
  getAll: {},
  patch: {},
  post: {}
};

users.delete.config = {
  pre: [enforceSelfActionOnly],
};

users.delete.handler = async (request, reply) => {
  const {id} = request.params;

  try {
    await request.knex('users').where({id}).delete();
    reply.response().code(204);
  } catch (error) {
    reply(boom.badImplementation(`Failed to delete user with id "${id}"`));
  }
};

users.get.handler = async (request, reply) => {
  const {id} = request.params;

  try {
    const [user] = await request.knex('users').select().where({id});

    reply.response(user || {}).code(200);
  } catch (error) {
    reply(boom.badImplementation(`Failed to get user with id ${id}`));
  }
};

users.getAll.handler = () => {};

users.patch.config = {
  pre: [enforceSelfActionOnly],
};

users.patch.handler = async (request, reply) => {
  const {id} = request.params;
  const updatedValues = request.payload;
  const now = request.knex.fn.now();
  const newValues = Object.assign({}, {modifyDate: now}, updatedValues);

  try {
    await request.knex('users').update(newValues).where({id});
  } catch (error) {
    reply(boom.badImplementation(`Failed to update user with id "${id}"`));
    throw error;
  }

  reply.response().code(201);
};

users.post.handler = async (request, reply) => {
  const {email, password} = request.payload;
  const {saltRounds} = request.config.get('auth');
  let hashedPassword;

  try {
    hashedPassword = await hash(password, saltRounds);
  } catch (error) {
    const errorMessage = `Failed to generate hash while creating user for ${email}`;
    reply(boom.badImplementation(errorMessage));
  }

  const now = request.knex.fn.now();
  const userObject = {
    createDate: now,
    email,
    modifyDate: now,
    password: hashedPassword
  };

  try {
    await request.knex('users').insert(userObject);

    // TODO: Send user email
    reply.response().code(201);
  } catch (error) {
    if (error.message.indexOf('users_email_unique') > -1) {
      return reply.response().code(201);
    }

    reply(boom.badImplementation());
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
