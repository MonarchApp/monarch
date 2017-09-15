const Knex = require('knex');
const RootRequire = require('app-root-path').require;
const knexConfiguration = RootRequire('knexfile');

const attachKnex = {};

attachKnex.register = (server, options, next) => {
  const environment = process.env.NODE_ENV || 'development';
  const knexConn = Knex(knexConfiguration[environment]);

  server.decorate('request', 'knex', knexConn);
  server.decorate('server', 'knex', knexConn);
  next();
};

attachKnex.register.attributes = {
  name: 'attachKnex',
  version: '0.0.0'
};

module.exports = attachKnex;
