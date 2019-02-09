const Hapi = require('hapi');

const routes = require('./routes');
const getConfig = require('./utils/get_config');

const registerPlugins = async (server, plugins) => {
  try {
    await server.register(plugins);
  } catch (error) {
    server.log(['error', 'init'], 'Failed to register plugins');
    throw error;
  }
};

const initServer = async () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  const config = await getConfig();
  const server = new Hapi.Server(config.get('server'));

  await registerPlugins(server, [{
    options: config.get('good'),
    plugin: require('good')
  }, {
    options: {config},
    plugin: require('./plugins/attach_config')
  }, {
    options: {jwtPublicKey: config.get('auth:jwtPublicKey')},
    plugin: require('./plugins/auth')
  }, {
    plugin: require('./plugins/attach_knex')
  }]);

  server.route(routes);
  await server.start();

  if (process.env.NODE_ENV === 'development') {
    try {
      await server.knex.migrate.latest();
      await server.knex.seed.run();
    } catch (error) {
      await server.knex.destroy();
      await server.stop();

      // eslint-disable-next-line no-console
      console.error('Failed to run migrations. Is Postgres running?');
      process.exit(1);
    }
  }

  // eslint-disable-next-line no-console
  server.log(['info', 'init'], `\nMonarch started at ${server.info.uri}\n`);

  process.on('SIGINT', async () => {
    // eslint-disable-next-line no-console
    server.log(['info', 'exit'], 'Shutting down Monarch server...');

    try {
      await server.knex.destroy();
      await server.stop();

      // eslint-disable-next-line no-console
      console.log('Monarch has stopped.');

      process.exit(0);
    } catch (error) {
      process.exit(1);
      throw error;
    }
  });

  return server;
};

module.exports = initServer;
