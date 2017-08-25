'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const serverOptions = {
  port: 3000
};

server.connection(serverOptions);
server.start(function() {
  // eslint-disable-next-line no-console
  console.log(`\nStarting Monarch on ${serverOptions.port}...\n`);
});

module.exports = server;
