const rootRequire = require('app-root-path').require;
const initialMigrations = require('./../20170827222619_init');

const {expect, knexConn, sinon} = rootRequire('src/utils/test_utilities');

describe('Add Users Migration', function() {
  context('when applying the migration', function() {
    const now = new Date();
    let dateStub;
    let hasAllColumns = false;

    before(async function() {
      dateStub = sinon.useFakeTimers(now);
      await initialMigrations.up(knexConn);

      hasAllColumns = [
        await knexConn.schema.hasColumn('users', 'createDate'),
        await knexConn.schema.hasColumn('users', 'email'),
        await knexConn.schema.hasColumn('users', 'id'),
        await knexConn.schema.hasColumn('users', 'modifyDate'),
        await knexConn.schema.hasColumn('users', 'password')
      ].every(exists => exists === true);
    });

    after(function() {
      dateStub.restore();
    });

    it('should create the users table with basic columns', function() {
      expect(hasAllColumns).to.be.true;
    });

    context('and when adding a default user', function() {
      const email = '( ͡° ͜ʖ ͡°)';
      const password = 'Light salt, please...';

      before(async function() {
        await knexConn('users').insert({email, password});
      });

      it('should populate default fields properly', async function() {
        const [mockUser] = await knexConn.select().table('users').where({email});
        expect(mockUser).to.eql({
          createDate: now,
          email,
          id: 1,
          modifyDate: now,
          password
        });
      });
    });
  });

  context('when rolling back the migration', function() {
    let hasTable = true;

    before(async function() {
      await initialMigrations.down(knexConn);
      hasTable = await knexConn.schema.hasTable('users');
    });

    it('should drop the users table', function() {
      expect(hasTable).to.be.false;
    });
  });
});
