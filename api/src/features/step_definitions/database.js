const matchPattern = require('lodash-match-pattern');
const rootRequire = require('app-root-path').require;
const {defineSupportCode} = require('cucumber');

defineSupportCode(function({Then, When}) {
  When('raw query', async function(query) {
    this.rawQueryResult = await this.knex.raw(query);
  });

  When('{string} table is dropped', async function(tableName) {
    await this.knex.schema.dropTable(tableName);
  });

  When('I seed {string}', async function(seedFilename) {
    const pathToSeed = `src/db/seeds/${process.env.NODE_ENV}/${seedFilename}`;
    await rootRequire(pathToSeed).seed(this.knex);
  });

  Then('raw query result matches', async function(json) {
    const rawQueryResultMatchesPattern = matchPattern(this.rawQueryResult.rows, json);
    if (rawQueryResultMatchesPattern) { throw new Error(rawQueryResultMatchesPattern); }
  });
});
