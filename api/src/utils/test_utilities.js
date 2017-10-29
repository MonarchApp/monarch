const rootRequire = require('app-root-path').require;
const knexConn = require('knex')(rootRequire('knexfile')['test']);

module.exports = {knexConn};
