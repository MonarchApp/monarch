const matchPattern = require('lodash-match-pattern');
const path = require('path');
const rootRequire = require('app-root-path').require;
const {Then, When} = require('cucumber');

When('raw query', async function(query) {
  this.rawQueryResult = await this.knex.raw(query);
});

When('{string} table is dropped', async function(tableName) {
  await this.knex.schema.dropTable(tableName);
});

When('I seed {string}', async function(seedFilename) {
  const pathToSeed = path.join('src/db/seeds', process.env.NODE_ENV, seedFilename);
  const seedFunction = rootRequire(pathToSeed).seed;
  await seedFunction(this.knex);
});

Then('raw query result matches', async function(json) {
  const rawQueryResultMatchesPattern = matchPattern(this.rawQueryResult.rows, json);
  if (rawQueryResultMatchesPattern) { throw new Error(rawQueryResultMatchesPattern); }
});
