const auth = {};

auth.register = async (server, options, next) => {
  try {
    await server.register(require('hapi-auth-jwt2'));
  } catch (error) {
    error.message = `Failed to load hapi-auth-jwt plugin.\n\nError:\n${error.message}`
    throw error;
  }

  server.auth.strategy('jwt');
  next();
};

auth.register.attributes = {
  name: 'auth',
  version: '0.0.0'
};

module.exports = auth;
