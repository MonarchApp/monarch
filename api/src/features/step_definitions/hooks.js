const rootRequire = require('app-root-path').require;
const sinon = require('sinon');
const {defineSupportCode} = require('cucumber');

defineSupportCode(function({Before, After}) {
  Before(async function() {
    try {
      const createServer = rootRequire('src/server');
      this.server = await createServer();
      this.knex = this.server.knex;
    } catch (error) {
      error.message = `Failed to initialize server.\n\nError:\n${error.message}`;
      throw error;
    }
  });

  Before(async function() {
    try {
      await this.knex.migrate.latest();
    } catch (error) {
      error.message = `Failed to perform database migrations.\n\nError:\n${error.message}`;
      throw error;
    }
  });

  Before(function() {
    this.getRequestUrl = path => `${this.server.info.uri}/v1${path}`;
  });

  After(async function() {
    try {
      await this.knex.destroy();
      await this.server.stop();
    } catch (error) {
      error.message = `Failed to stop server.\n\nError:\n${error.message}`;
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

  Before('@StubDate', function() {
    this.stubClock = sinon.useFakeTimers();
  });

  After('@StubDate', function() {
    this.stubClock.restore();
  });
});
