const knex = require('knex');
const rootRequire = require('app-root-path').require;

const testConfig = rootRequire('knexfile')['test'];
const knexConn = knex(testConfig);

const getKnexConnection = () => knexConn;

const killKnex = async () => {
  await knexConn.raw('DROP SCHEMA public CASCADE');
  await knexConn.raw('CREATE SCHEMA public');
  await knexConn.destroy();
};

module.exports = {getKnexConnection, killKnex};
