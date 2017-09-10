const co = require('co');
const rootRequire = require('app-root-path').require;
const {defineSupportCode} = require('cucumber');

defineSupportCode(function({Before, After}) {
  Before(co.wrap(function*() {
    process.env.NODE_ENV = 'test';

    this.server = rootRequire('src/app');
    this.knex = this.server.knex;
    yield this.knex.migrate.latest();
  }));

  Before(function() {
    this.apiUrl = `${this.server.info.uri}/v1`;
  });

  After(function() {
    const knex = this.server.knex;

    this.server.stop(co.wrap(function*() {
      yield knex.raw('DROP SCHEMA public CASCADE');
      yield knex.raw('CREATE SCHEMA public');
    }));
  });
});
