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

    before(async function() {
      dateStub = sinon.useFakeTimers(now);
      await initialMigrations.up(knex);
    });

    after(function() {
      dateStub.restore();
    });

    it('creates the all tables with all columns', async function() {
      expect([
        await knex.schema.hasColumn('user_account', 'id'),
        await knex.schema.hasColumn('user_account', 'user_account_info_id'),
        await knex.schema.hasColumn('user_account', 'password'),
        await knex.schema.hasColumn('user_account_info', 'id'),
        await knex.schema.hasColumn('user_account_info', 'email'),
        await knex.schema.hasColumn('user_account_info', 'bio'),
        await knex.schema.hasColumn('user_account_info', 'create_date'),
        await knex.schema.hasColumn('user_account_info', 'modify_date'),
      ].every(exists => exists === true)).to.be.true;
    });
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

  context('when rolling back the migration', function() {
    before(async function() {
      await initialMigrations.up(knex);
      await initialMigrations.down(knex);
    });

    it('drops all tables', async function() {
      expect([
        await knex.schema.hasTable('user_account')
        await knex.schema.hasTable('user_account_info')
      ].every(exists => exists === true)).to.be.false;
    });
  });
});
