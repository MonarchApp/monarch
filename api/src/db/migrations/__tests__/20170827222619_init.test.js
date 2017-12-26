const initialMigrations = require('./../20170827222619_init');
const rootRequire = require('app-root-path').require;
const sinon = require('sinon');

const {getKnexConnection} = rootRequire('src/utils/test_utils');
const knex = getKnexConnection();

describe('Add Users Migration', function() {
  context('when applying the migration', function() {
    const now = new Date();
    let dateStub;
    let hasAllColumns = false;

    before(async function() {
      dateStub = sinon.useFakeTimers(now);
      await initialMigrations.up(knex);

      hasAllColumns = [
        await knex.schema.hasColumn('users', 'createDate'),
        await knex.schema.hasColumn('users', 'email'),
        await knex.schema.hasColumn('users', 'id'),
        await knex.schema.hasColumn('users', 'modifyDate'),
        await knex.schema.hasColumn('users', 'password')
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
        await knex('users').insert({email, password});
      });

      it('should populate default fields properly', async function() {
        const [mockUser] = await knex.select().table('users').where({email});
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
      await initialMigrations.down(knex);
      hasTable = await knex.schema.hasTable('users');
    });

    it('should drop the users table', function() {
      expect(hasTable).to.be.false;
    });
  });
});
