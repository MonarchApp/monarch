const rootRequire = require('app-root-path').require;
const Hapi = require('hapi');
const co = require('co');

const localConfig = rootRequire('config/local');
const routes = require('./routes');

module.exports = co.wrap(function* ({goodOptions, serverOptions}) {
  const server = new Hapi.Server();
  const serverConnOptions = Object.assign({}, localConfig.connection, serverOptions);
  const goodOptionsWithDefaults = Object.assign({}, localConfig.good, goodOptions);

  server.connection(serverConnOptions);
  server.route(routes);

  server.register([
    {register: require('./plugins/attach-knex')},
    {register: require('good'), options: goodOptionsWithDefaults}
  ], (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      return console.log(err);
    }

    server.start(() => {
      // eslint-disable-next-line no-console
      console.log(`\nMonarch started at ${server.info.uri}\n`);
    });
  });

  process.on('SIGINT', co.wrap(function*() {
    // eslint-disable-next-line no-console
    console.log('Shutting down Monarch server...');
    yield server.knex.destroy();

    server.stop(err => {
      // eslint-disable-next-line no-console
      console.log('Monarch has stopped.');
      if (err) {
        return process.exit(1);
      }
      process.exit(0);
    });
  }));

  return server;
});
