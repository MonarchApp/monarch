const matchPattern = require('lodash-match-pattern');
const {defineSupportCode} = require('cucumber');

defineSupportCode(function({Then, When}) {
  When('raw query', async function(query) {
    this.rawQueryResult = await this.knex.raw(query);
  });

  When('{string} table is dropped', async function(tableName) {
    await this.knex.schema.dropTable(tableName);
  });

  Then('raw query result matches', async function(json) {
    const result = this.parseJson(json);
    const rawQueryResultMatchesPattern = matchPattern(this.rawQueryResult, result);
    if (rawQueryResultMatchesPattern) { throw new Error(rawQueryResultMatchesPattern); }
  });
});
