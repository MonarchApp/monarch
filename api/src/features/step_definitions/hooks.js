const rootRequire = require('app-root-path').require;
const {defineSupportCode} = require('cucumber');

const SERVER_OPTIONS = {
  serverOptions: {port: 3001}
};

defineSupportCode(function({Before, After}) {
  Before(function*() {
    const createServer = rootRequire('src/app');
    this.server = yield createServer(SERVER_OPTIONS);
    this.knex = this.server.knex;
    yield this.knex.migrate.latest();
  });

  Before(function() {
    this.getRequestUrl = path => `${this.server.info.uri}/v1${path}`;
  });

  After(function*() {
    yield this.knex.raw('DROP SCHEMA public CASCADE');
    yield this.knex.raw('CREATE SCHEMA public');
  });
});
