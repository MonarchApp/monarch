const rootRequire = require('app-root-path').require;
const Hapi = require('hapi');
const co = require('co');

const localConfig = rootRequire('config/local');
const routes = require('./routes');

const goodOptions = {
  ops: {
    interval: 1000
  },
  reporters: {
    console: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{log: '*', response: '*'}]
    }, {
      module: 'good-console'
    }, 'stdout']
  }
};

const server = new Hapi.Server();

server.connection(localConfig);
server.route(routes);

server.register([
  {register: require('./plugins/attach-knex')},
  {register: require('good'), options: goodOptions}
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

module.exports = server;
