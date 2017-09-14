const {defineSupportCode} = require('cucumber');

defineSupportCode(function({When}) {
  When('{string} table is dropped', function*(tableName) {
    yield this.knex.schema.dropTable(tableName);
  });
});
