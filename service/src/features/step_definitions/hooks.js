const rootRequire = require('app-root-path').require;

const sinon = require('sinon');
const path = require('path');
const nock = require('nock');

const {Before, BeforeAll, After, AfterAll} = require('cucumber');
const Mockingjays = require('mockingjays');

const createServer = rootRequire('src/server');

const locationAutocompleteMock = new Mockingjays();
const locationGeocodeMock = new Mockingjays();
let server;

const getGatewayUrl = (config, path) => {
  const {host, port} = config.get(`gateways:${path}`);
  const uriPort = port ? `:${port}` : '';

  return `${host}${uriPort}`;
};

BeforeAll(async function() {
  try {
    server = await createServer();
  } catch (error) {
    error.message = `Failed to initialize server.\n\nError:\n${error.message}`;
    throw error;
  }
});

Before(function() {
  this.config = {};
  this.server = server;

  this.knex = this.server.knex;
});

Before(function() {
  const {config} = this.server;

  this.config.locationAutocompleteUrl =
    getGatewayUrl(config, 'location:autocomplete');

  this.config.locationGeocodeUrl = getGatewayUrl(config, 'location:geocode');
});

Before(function() {
  locationAutocompleteMock.start({
    cacheDir: path.resolve('src/features/fixtures/here'),
    logLevel: 'none',
    port: 33500,
    queryParameterBlacklist: 'app_code,app_id',
    serverBaseUrl: 'https://autocomplete.geocoder.api.here.com'
  });

  locationGeocodeMock.start({
    cacheDir: path.resolve('src/features/fixtures/here'),
    logLevel: 'none',
    port: 33501,
    queryParameterBlacklist: 'app_code,app_id',
    serverBaseUrl: 'https://geocoder.api.here.com'
  });
});

After(function() {
  nock.cleanAll();
  locationAutocompleteMock.stop();
  locationGeocodeMock.stop();
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

Before({tags: '@StubDate'}, function() {
  this.stubClock = sinon.useFakeTimers();
});

After({tags: '@StubDate'}, function() {
  this.stubClock.restore();
});

After(function() {
  require('lodash-match-pattern').getLodashModule().clearMemos();
});
