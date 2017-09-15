const knex = require('knex');
const rootRequire = require('app-root-path').require;
const knexConfiguration = rootRequire('knexfile');

const AttachKnex = {};

AttachKnex.register = (server, options, next) => {
  const environment = process.env.NODE_ENV || 'development';
  const knexConn = knex(knexConfiguration[environment]);

  server.decorate('request', 'knex', knexConn);
  server.decorate('server', 'knex', knexConn);
  next();
};

AttachKnex.register.attributes = {
  name: 'AttachKnex',
  version: '0.0.0'
};

module.exports = AttachKnex;
