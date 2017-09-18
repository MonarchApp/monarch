const knex = require('knex');
const rootRequire = require('app-root-path').require;
const knexConfiguration = rootRequire('knexfile');

const attachKnex = {};

attachKnex.register = (server, options, next) => {
  const knexConn = knex(knexConfiguration[process.env.NODE_ENV]);

  server.decorate('request', 'knex', knexConn);
  server.decorate('server', 'knex', knexConn);
  next();
};

attachKnex.register.attributes = {
  name: 'attachKnex',
  version: '0.0.0'
};

module.exports = attachKnex;
