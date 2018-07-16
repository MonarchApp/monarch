const validateToken = async () => ({isValid: true});

const register = async (server, {jwtPublicKey}) => {
  try {
    await server.register(require('hapi-auth-jwt2'));
  } catch (error) {
    server.log(['error', 'init', 'auth'], 'Failed to load hapi-auth-jwt2');
    throw error;
  }

  const authOptions = {
    key: jwtPublicKey,
    validate: validateToken,
    verifyOptions: {algorithms: ['RS256']}
  };

  server.auth.strategy('jwt', 'jwt', authOptions);
  server.auth.default('jwt');
};

module.exports = {
  register,
  name: 'auth',
  version: '0.0.0'
};
