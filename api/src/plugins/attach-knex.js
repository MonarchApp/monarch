const knex = require('knex');
const rootRequire = require('app-root-path').require;
const knexConfiguration = rootRequire('knexfile');

const attachKnex = {};

attachKnex.register = (server, options, next) => {
  const environment = process.env.NODE_ENV || 'development';
  const knexConn = knex(knexConfiguration[environment]);

  server.decorate('server', 'knex', knexConn);
  return next();
};

attachKnex.register.attributes = {
  name: 'attachKnex',
  version: '0.0.0'
};

module.exports = attachKnex;
