const initialMigrations = require('./../20170827222619_init');
const rootRequire = require('app-root-path').require;
const sinon = require('sinon');
const uuidv4 = require('uuid/v4');
const Promise = require('bluebird');

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
        knex.schema.hasColumn('user_account', 'user_account_info_id'),
        knex.schema.hasColumn('user_account', 'password'),
        knex.schema.hasColumn('user_account', 'create_date'),
        knex.schema.hasColumn('user_account', 'modify_date'),
      ])).every(exists => exists === true)).to.be.true;
    });

    it('creates the user_account_info table with correct columns', async function() {
      expect((await Promise.all([
        knex.schema.hasColumn('user_account_info', 'id'),
        knex.schema.hasColumn('user_account_info', 'email'),
        knex.schema.hasColumn('user_account_info', 'bio'),
        knex.schema.hasColumn('user_account_info', 'create_date'),
        knex.schema.hasColumn('user_account_info', 'modify_date'),
      ])).every(exists => exists === true)).to.be.true;
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
