const rootRequire = require('app-root-path').require;
const {defineSupportCode} = require('cucumber');

defineSupportCode(function({Before, After}) {
  Before(function*() {
    this.server = rootRequire('src/app');
    this.knex = this.server.knex;
    yield this.knex.migrate.latest();
  });

  Before(function() {
    this.apiUrl = `${this.server.info.uri}/v1`;
  });

  After(function*() {
    yield this.knex.raw('DROP SCHEMA public CASCADE');
    yield this.knex.raw('CREATE SCHEMA public');

    this.server.stop();
  });
});
