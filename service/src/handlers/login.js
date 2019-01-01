const Promise = require('bluebird');
const boom = require('boom');
const bounce = require('bounce');
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');

const compare = Promise.promisify(bcrypt.compare);
const THIRTY_MINUTES_IN_SECONDS = 60 * 30;

const generateToken = (payload, jwtPrivateKey, options) => {
  const dateInSeconds = Date.now() / 1000;

  const jwtOptions = Object.assign({}, {
    algorithm: 'RS256',
    expiresIn: Math.floor(dateInSeconds + THIRTY_MINUTES_IN_SECONDS)
  }, options);

  return jwt.sign(payload, jwtPrivateKey, jwtOptions);
};

const replyWithInvalidCreds = async () => {
  await Promise.delay(500);
  return boom.unauthorized('invalid username or password', 'jwt');
};

const login = {
  post: {}
};

login.post.config = {
  auth: false,
  validate: {
    payload: {
      email: joi.string().email().required(),
      password: joi.string().required()
    }
  }
};

login.post.handler = async (request, h) => {
  const {email, password} = request.payload;
  const {jwtAudience, jwtPrivateKey} = request.config.get('auth');

  try {
    const [user] = await request.knex('user_account').select().where({email});
    if (!user) { return await replyWithInvalidCreds(); }

    const hashedPassword = user.password;
    const isValidPassword = await compare(password, hashedPassword);
    if (!isValidPassword) { return await replyWithInvalidCreds(); }

    const tokenPayload = {id: user.id};
    const tokenOptions = {audience: jwtAudience};

    const token = generateToken(tokenPayload, jwtPrivateKey, tokenOptions);
    return h.response({token}).code(200);
  } catch (error) {
    bounce.rethrow(error, 'system');
    return boom.badImplementation();
  }
};

module.exports = login;
