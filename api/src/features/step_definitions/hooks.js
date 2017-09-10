const co = require('co');
const rootRequire = require('app-root-path').require;
const {defineSupportCode} = require('cucumber');

defineSupportCode(function({Before, After}) {
  Before(function() {
    process.env.NODE_ENV = 'test';

    this.server = rootRequire('src/app');
    this.knex = this.server.knex;
    this.knex.migrate.latest();
  });

  Before(function() {
    this.apiUrl = `${this.server.info.uri}/v1`;
  });

  After(function() {
    this.server.stop(co.wrap(function*() {
      yield this.knex.raw('DROP SCHEMA public CASCADE');
      yield this.knex.raw('CREATE SCHEMA public');
    }));
  });
});
