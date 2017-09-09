'use strict';

const Hapi = require('hapi');
const localConfig = require('./../config/local.json');

const server = new Hapi.Server();

server.connection(localConfig);
server.register({
  register: require('./plugins/attach-knex')
}, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    return console.log(err);
  }

  server.start(function() {
    // eslint-disable-next-line no-console
    console.log(`\nMonarch started at ${server.info.uri}\n`);
  });
});

process.on('SIGINT', () => {
  // eslint-disable-next-line no-console
  console.log('Shutting down Monarch server...');

  server.stop(err => {
    // eslint-disable-next-line no-console
    console.log('Monarch has stopped.');
    if (err) {
      return process.exit(1);
    }
    process.exit(0);
  });
});

module.exports = server;
