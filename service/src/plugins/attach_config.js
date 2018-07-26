const register = async (server, {config}) => {
  server.decorate('request', 'config', config);
  server.decorate('server', 'config', config);
};

module.exports = {
  register,
  name: 'config',
  version: '0.0.0'
};
