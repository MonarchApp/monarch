const Hapi = require('hapi');
require('hapi-bluebird');

const routes = require('./routes');

const initServer = async () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'develop';

  const server = new Hapi.Server();

  try {
    await server.register({register: require('./plugins/attach_config')});
  } catch (error) {
    error.message = `Failed to register configuration plugin.\n\nError:\n${error.message}`;
  }

  server.connection(server.config.get('connection'));
  server.route(routes);

  try {
    await server.register([
      {register: require('./plugins/auth')},
      {register: require('./plugins/attach_knex')},
      {register: require('good'), options: server.config.get('good')}
    ]);
    await server.start();
  } catch (error) {
    error.message = `Failed to register plugins.\n\nError:\n${error.message}`;
    throw error;
  }

  // eslint-disable-next-line no-console
  server.log(['info'], `\nMonarch started at ${server.info.uri}\n`);

  process.on('SIGINT', async () => {
    // eslint-disable-next-line no-console
    server.log(['info'], 'Shutting down Monarch server...');

    try {
      await server.knex.destroy();
      await server.stop();

      // eslint-disable-next-line no-console
      console.log('Monarch has stopped.');

      process.exit(0);
    } catch (error) {
      process.exit(1);
    }
  });

  return server;
};

module.exports = initServer;
