const auth = {};

const authOptions = {
  key: 'ThisKeyIsNotSafe',
  validateFunc: validateToken,
  verifyOptions: {algorithms: ['RS256']}
};

function validateToken(decoded, request, callback) {
  // Validate against user
  return callback(null, true);
}

auth.register = async (server, options, next) => {
  try {
    await server.register(require('hapi-auth-jwt2'));
  } catch (error) {
    error.message = `Failed to load hapi-auth-jwt plugin.\n\nError:\n${error.message}`;
    throw error;
  }

  server.auth.strategy('jwt', 'jwt', authOptions);
  server.auth.default('jwt');
  next();
};

auth.register.attributes = {
  name: 'auth',
  version: '0.0.0'
};

module.exports = auth;
