const Promise = require('bluebird');
const boom = require('boom');
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');

const compare = Promise.promisify(bcrypt.compare);

const THIRTY_MINUTES_IN_SECONDS = 60 * 30;
const auth = {
  login: {},
  logout: {}
};

function generateToken(jwtSecret) {
  const dateInSeconds = Date.now() / 1000;

  return jwt.sign({
    exp: Math.floor(dateInSeconds + THIRTY_MINUTES_IN_SECONDS)
  }, jwtSecret, {algorithm: 'RS256'});

}

auth.login.config = {
  validate: {
    payload: {
      email: joi.string().email().required(),
      password: joi.string().required()
    }
  }
};
auth.login.handler = async (request, reply) => {
  const {email, password} = request.payload;
  const {jwtSecret} = request.config.get('auth');
  const replyWithInvalidCreds = () => {
    reply(boom.unauthorized('invalid username or password', 'jwt'));
  };

  try {
    const [user] = await request.knex('users').select().where({email});
    if (!user) { return replyWithInvalidCreds(); }

    const hashedPassword = user.password;
    const isValidPassword = compare(password, hashedPassword);
    if (!isValidPassword) { return replyWithInvalidCreds(); }

    const token = generateToken(jwtSecret);
    reply.response({token}).code(200);
  } catch (error) {
    const errorMessage = `Failed to authenticate ${email}\n\nError:\n${error.message}`;
    reply(boom.badImplementation(errorMessage));
  }
};

auth.logout.handler = () => {};

module.exports = auth;
