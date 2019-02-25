const rootRequire = require('app-root-path').require;

const knexMigrate = require('knex-migrate');
const nock = require('nock');
const path = require('path');
const sinon = require('sinon');

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

Before(async function() {
  await server.knex.migrate.latest();
});

After(async function() {
  await knexMigrate('down', {to: 0});
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

Before(function() {
  this.config = {};
  this.server = server;
  this.knex = this.server.knex;

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

Before({tags: '@StubDate'}, function() {
  this.stubClock = sinon.useFakeTimers();
});

After({tags: '@StubDate'}, function() {
  this.stubClock.restore();
});

After(function() {
  require('lodash-match-pattern').getLodashModule().clearMemos();
});
