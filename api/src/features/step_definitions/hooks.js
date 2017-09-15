const RootRequire = require('app-root-path').require;
const {defineSupportCode} = require('cucumber');

defineSupportCode(function({Before, After}) {
  Before(function*() {
    this.server = RootRequire('src/server');
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
