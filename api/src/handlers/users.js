const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const boom = require('boom');
const joi = require('joi');

const hash = Promise.promisify(bcrypt.hash);

const users = {
  delete: {},
  get: {},
  getAll: {},
  post: {}
};

users.delete.handler = () => {};
users.get.handler = () => {};
users.getAll.handler = () => {};

users.post.handler = async (request, reply) => {
  const {email, password} = request.payload;
  const {saltRounds} = request.config.get('auth');
  const userCreatedMessage = `User created for "${email}"`;
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
      reply.response().code(201);
    }

    reply(boom.badImplementation());
    throw error;
  } finally {
    request.log(['info'], userCreatedMessage);
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
