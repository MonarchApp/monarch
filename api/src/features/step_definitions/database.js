const {defineSupportCode} = require('cucumber');

defineSupportCode(function({When}) {
  When('{string} table is dropped', async function(tableName) {
    await this.knex.schema.dropTable(tableName);
  });
});
