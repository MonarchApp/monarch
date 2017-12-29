const rootRequire = require('app-root-path').require;
const getKnexConnection = () => require('knex')(rootRequire('knexfile')['test']);

module.exports = {getKnexConnection};
