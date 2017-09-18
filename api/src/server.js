const rootRequire = require('app-root-path').require;
const Hapi = require('hapi');
require('hapi-bluebird');

const localConfig = rootRequire('config/local');
const routes = require('./routes');

const initServer = async (options) => {
  const server = new Hapi.Server();
  const optionsWithDefaults = Object.assign({}, localConfig, options);
  const {connection: serverOptions, good: goodOptions} = optionsWithDefaults;

  server.connection(serverOptions);
  server.route(routes);

  try {
    await server.register([
      {register: require('./plugins/attach-knex')},
      {register: require('good'), options: goodOptions}
    ]);
    await server.start();
  } catch (error) {
    error.message = `Failed to register plugins.\n\nError:\n${error.message}`;
    throw error;
  }

  // eslint-disable-next-line no-console
  console.log(`\nMonarch started at ${server.info.uri}\n`);

  process.on('SIGINT', async () => {
    // eslint-disable-next-line no-console
    console.log('Shutting down Monarch server...');

    try {
      await server.knex.destroy();
      await server.stop()

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
