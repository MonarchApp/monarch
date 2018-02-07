const rootRequire = require('app-root-path').require;
const sinon = require('sinon');
const {defineSupportCode} = require('cucumber');
const createServer = rootRequire('src/server');

defineSupportCode(function({Before, BeforeAll, After, AfterAll}) {
  let server;

  BeforeAll(async function() {
    try {
      server = await createServer();
    } catch (error) {
      error.message = `Failed to initialize server.\n\nError:\n${error.message}`;
      throw error;
    }
  });

  Before(function() {
    this.server = server;
    this.knex = this.server.knex;
  });

  Before(async function() {
    try {
      await this.knex.migrate.latest();
    } catch (error) {
      error.message = `Failed to perform database migrations.\n\nError:\n${error.message}`;
      throw error;
    }
  });

  After(async function() {
    try {
      await this.knex.raw('DROP SCHEMA public CASCADE');
      await this.knex.raw('CREATE SCHEMA public');
    } catch (error) {
      error.message = `Failed to reset database schema.\n\nError:\n${error.message}`;
      throw error;
    }
  });

  AfterAll(async function() {
    try {
      await server.knex.destroy();
      await server.stop();
    } catch (error) {
      error.message = `Failed to stop server.\n\nError:\n${error.message}`;
      throw error;
    }
  });

  Before('@StubDate', function() {
    this.stubClock = sinon.useFakeTimers();
  });

  After('@StubDate', function() {
    this.stubClock.restore();
  });

  After(function() {
    require('lodash-match-pattern').getLodashModule().clearMemos();
  });
});
