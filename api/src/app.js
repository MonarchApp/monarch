'use strict';

const Hapi = require('hapi');
const localConfig = require('./../config/local.json');

const server = new Hapi.Server();

server.connection(localConfig);
server.start(function() {
  // eslint-disable-next-line no-console
  console.log(`\nStarting Monarch on ${localConfig.port}...\n`);
});

module.exports = server;
