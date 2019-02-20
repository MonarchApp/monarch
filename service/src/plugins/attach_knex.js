const knex = require('knex');
const knexPostgis = require('knex-postgis');
const rootRequire = require('app-root-path').require;
const knexConfiguration = rootRequire('knexfile');

const register = async server => {
  const knexConn = knex(knexConfiguration[process.env.NODE_ENV]);
  knexPostgis(knexConn);

  server.decorate('request', 'knex', knexConn);
  server.decorate('server', 'knex', knexConn);
};

module.exports = {
  register,
  name: 'attachKnex',
  version: '0.0.0'
};
