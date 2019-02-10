const register = server => {
  const locationFactory = require('./location');
  const location = locationFactory(server);

  Object.keys(location)
    .forEach(key => server.method(`connect.location.${key}`, location[key]));
};

module.exports = {
  register,
  name: 'connect',
  version: '0.0.0'
};
