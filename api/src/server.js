const rootRequire = require('app-root-path').require;
const Hapi = require('hapi');

const localConfig = rootRequire('config/local');
const routes = require('./routes');

const initServer = async (options) => {
  const server = new Hapi.Server();
  const optionsWithDefaults = Object.assign({}, localConfig, options);
  const {connection: serverOptions, good: goodOptions} = optionsWithDefaults;

  server.connection(serverOptions);
  server.route(routes);

  server.register([
    {register: require('./plugins/attach-knex')},
    {register: require('good'), options: goodOptions}
  ], (err) => {
    // eslint-disable-next-line no-console
    if (err) { return console.log(err); }

    server.start(() => {
      // eslint-disable-next-line no-console
      console.log(`\nMonarch started at ${server.info.uri}\n`);
    });
  });

  process.on('SIGINT', async () => {
    // eslint-disable-next-line no-console
    console.log('Shutting down Monarch server...');
    await server.knex.destroy();

    server.stop(err => {
      // eslint-disable-next-line no-console
      console.log('Monarch has stopped.');

      if (err) { return process.exit(1); }
      process.exit(0);
    });
  });

  return server;
};

module.exports = initServer;
