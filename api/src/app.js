const Hapi = require('hapi');
const localConfig = require('./../config/local.json');
const routes = require('./routes');

const server = new Hapi.Server();

server.connection(localConfig);
server.route(routes);
server.register({
  register: require('./plugins/attach-knex')
}, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    return console.log(err);
  }

  server.start(() => {
    // eslint-disable-next-line no-console
    console.log(`\nMonarch started at ${server.info.uri}\n`);
  });
});

module.exports = server;
