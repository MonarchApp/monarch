const initialMigrations = require('./../20170827222619_init');
const rootRequire = require('app-root-path').require;
const sinon = require('sinon');
const Promise = require('bluebird');
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

    after(async function() {
      dateStub.restore();
      await initialMigrations.down(knex);
    });

    it('creates the user_account table with correct columns', async function() {
      expect((await Promise.all([
        knex.schema.hasColumn('user_account', 'id'),
        knex.schema.hasColumn('user_account', 'password'),
        knex.schema.hasColumn('user_account', 'created_at'),
        knex.schema.hasColumn('user_account', 'updated_at'),
      ])).every(exists => exists === true)).to.be.true;
    });

    it('creates the user_account_info table with correct columns', async function() {
      expect((await Promise.all([
        knex.schema.hasColumn('user_account_info', 'bio'),
        knex.schema.hasColumn('user_account_info', 'created_at'),
        knex.schema.hasColumn('user_account_info', 'email'),
        knex.schema.hasColumn('user_account_info', 'id'),
        knex.schema.hasColumn('user_account_info', 'location'),
        knex.schema.hasColumn('user_account_info', 'updated_at'),
        knex.schema.hasColumn('user_account_info', 'user_account_id')
      ])).every(exists => exists === true)).to.be.true;
    });
  });

  context('when deleting a user account', function() {
    const id = uuidv4();

    before(async function() {
      await initialMigrations.up(knex);
      await knex('user_account').insert({
        id,
        password: 'mypetname123'
      });

      await knex('user_account_info').insert({
        email: 'fuckdonaldtrump@justice.com',
        id: uuidv4(),
        user_account_id: id,
      });

      await knex('user_account').where({id}).delete();
    });

    after(async function() {
      await initialMigrations.down(knex);
    });

    it('deletes the corresponding user_account_info row', async function() {
      expect(await knex('user_account_info')
        .select()
        .where({user_account_id: id})
      ).to.be.empty;
    });
  });

  context('when rolling back the migration', function() {
    before(async function() {
      await initialMigrations.up(knex);
      await initialMigrations.down(knex);
    });

    it('drops all tables', async function() {
      expect([
        await knex.schema.hasTable('user_account'),
        await knex.schema.hasTable('user_account_info')
      ].every(exists => exists === true)).to.be.false;
    });
  });
});
