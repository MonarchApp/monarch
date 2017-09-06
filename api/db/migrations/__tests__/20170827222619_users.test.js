const co = require('co');
const rootRequire = require('app-root-path').require;
const userMigrations = require('./../20170827222619_users');

const {expect, knexConn} = rootRequire('src/utils/test-utilities');

describe('Add Users Migration', function() {
  context('when applying the migration', function() {
    let hasAllColumns = false;

    before(co.wrap(function*() {
      yield userMigrations.up(knexConn);

      const columns = [
        yield knexConn.schema.hasColumn('users', 'id'),
        yield knexConn.schema.hasColumn('users', 'email'),
        yield knexConn.schema.hasColumn('users', 'password')
      ];

      hasAllColumns = columns.every(exists => exists === true);
    }));

    it('should create the users table with basic columns', function() {
      expect(hasAllColumns).to.be.true;
    });
  });

  context('when rolling back the migration', function() {
    let hasTable = true;

    before(co.wrap(function*() {
      yield userMigrations.down(knexConn);
      hasTable = yield knexConn.schema.hasTable('users');
    }));

    it('should drop the users table', function() {
      expect(hasTable).to.be.false;
    });
  });
});
