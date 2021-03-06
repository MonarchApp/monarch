const matchPattern = require('lodash-match-pattern');
const path = require('path');
const rootRequire = require('app-root-path').require;
const {Then, When} = require('cucumber');

When('raw query', async function(query) {
  this.rawQueryResult = await this.knex.raw(query);
});

When('{string} table is dropped', async function(tableName) {
  await this.knex.schema.raw(`DROP TABLE if exists ${tableName} CASCADE`);
});

When('the database is seeded with {string}', async function(seedFilename) {
  const pathToSeed = path.join('env', process.env.NODE_ENV, 'seeds', seedFilename);
  const seedFunction = rootRequire(pathToSeed).seed;
  await seedFunction(this.knex);
});

Then('raw query result matches', async function(json) {
  const rawQueryResultMatchesPattern = matchPattern(this.rawQueryResult.rows, json);
  if (rawQueryResultMatchesPattern) { throw new Error(rawQueryResultMatchesPattern); }
});
