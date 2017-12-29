const auth = {};

const strategyName = 'jwt';
const schemeName = 'jwt';
const requireJwtForAllRoutes = true;

const validateToken = (decoded, request, callback) => {
  // Validate against user
  return callback(null, true);
};

auth.register = async (server, options, next) => {
  try {
    await server.register(require('hapi-auth-jwt2'));
  } catch (error) {
    error.message = `Failed to load hapi-auth-jwt plugin.\n\nError:\n${error.message}`;
    throw error;
  }

  const {jwtSecret} = server.config.get('auth');
  const authOptions = {
    key: jwtSecret,
    validateFunc: validateToken,
    verifyOptions: {algorithms: ['RS256']}
  };

  server.auth.strategy(strategyName, schemeName, requireJwtForAllRoutes, authOptions);
  next();
};

auth.register.attributes = {
  name: 'auth',
  version: '0.0.0'
};

module.exports = auth;
