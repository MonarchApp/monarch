const initialMigrations = require('./../20170827222619_init');
const rootRequire = require('app-root-path').require;
const sinon = require('sinon');
const uuidv4 = require('uuid/v4');

const {getKnexConnection} = rootRequire('src/utils/test_utils');
const knex = getKnexConnection();

describe('Initial Migration', function() {
  context('when applying the migration', function() {
    const now = new Date();
    let dateStub;
    let hasAllColumns = false;

    before(async function() {
      dateStub = sinon.useFakeTimers(now);
      await initialMigrations.up(knex);

      hasAllColumns = [
        await knex.schema.hasColumn('user_account', 'bio'),
        await knex.schema.hasColumn('user_account', 'createDate'),
        await knex.schema.hasColumn('user_account', 'email'),
        await knex.schema.hasColumn('user_account', 'id'),
        await knex.schema.hasColumn('user_account', 'modifyDate'),
        await knex.schema.hasColumn('user_account', 'password')
      ].every(exists => exists === true);
    });

    after(function() {
      dateStub.restore();
    });

    it('creates the user_account table with basic columns', function() {
      expect(hasAllColumns).to.be.true;
    });

    context('and when adding a default user_account', function() {
      const email = '( ͡° ͜ʖ ͡°)';
      const id = uuidv4();
      const password = 'Light salt, please...';

      before(async function() {
        await knex('user_account').insert({id, email, password});
      });

      it('populates default fields properly', async function() {
        const [mockUser] = await knex.select().table('user_account').where({email});
        expect(mockUser).to.eql({
          bio: null,
          createDate: now,
          email,
          id,
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
      hasTable = await knex.schema.hasTable('user_account');
    });

    it('drops the user_account table', function() {
      expect(hasTable).to.be.false;
    });
  });
});
