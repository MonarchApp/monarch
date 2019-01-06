const matchPattern = require('lodash-match-pattern');
const {Given, Then} = require('cucumber');
const {expect} = require('chai');

Given('{string} user matches', async function(id, json) {
  const [user] = await this.knex('user_account').select().where({id});

  const userResultMatchesPattern = matchPattern(user, json);
  if (userResultMatchesPattern) { throw new Error(userResultMatchesPattern); }
});

Given('I store the {string} user', async function(id) {
  const [user] = await this.knex('user_account').select().where({id});
  this.activeUser = user;
});

Then('{string} user remains unchanged', async function(id) {
  const [user] = await this.knex('user_account').select().where({id});
  expect(user).to.eql(this.activeUser);
});
