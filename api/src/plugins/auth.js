const auth = {};

auth.register = (server, options, next) => {
  next();
};

auth.register.attributes = {
  name: 'auth',
  version: '0.0.0'
};

module.exports = auth;
