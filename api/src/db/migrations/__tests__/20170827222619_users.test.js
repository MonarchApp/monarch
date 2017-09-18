const rootRequire = require('app-root-path').require;
const userMigrations = require('./../20170827222619_users');

const {expect, knexConn} = rootRequire('src/utils/test_utilities');

describe('Add Users Migration', function() {
  context('when applying the migration', function() {
    let hasAllColumns = false;

    before(async function() {
      await userMigrations.up(knexConn);

      hasAllColumns = [
        await knexConn.schema.hasColumn('users', 'id'),
        await knexConn.schema.hasColumn('users', 'email'),
        await knexConn.schema.hasColumn('users', 'password')
      ].every(exists => exists === true);
    });

    it('should create the users table with basic columns', function() {
      expect(hasAllColumns).to.be.true;
    });
  });

  context('when rolling back the migration', function() {
    let hasTable = true;

    before(async function() {
      await userMigrations.down(knexConn);
      hasTable = await knexConn.schema.hasTable('users');
    });

    it('should drop the users table', function() {
      expect(hasTable).to.be.false;
    });
  });
});
