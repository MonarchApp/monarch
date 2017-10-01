const auth = {};

const strategyName = 'jwt';
const schemeName = 'jwt';
const requireJwtForAllRoutes = true;
const authOptionDefaults = {
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

  const {jwtSecret} = server.config.get('auth');
  const authOptions = Object.assign({}, authOptionDefaults, {key: jwtSecret});

  server.auth.strategy(strategyName, schemeName, requireJwtForAllRoutes, authOptions);
  server.auth.default(strategyName);
  next();
};

auth.register.attributes = {
  name: 'auth',
  version: '0.0.0'
};

module.exports = auth;
