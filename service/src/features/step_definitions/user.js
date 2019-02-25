const matchPattern = require('lodash-match-pattern');
const {Given, Then} = require('cucumber');
const {expect} = require('chai');

Given('a comparison of the {string} user', async function(id) {
  const [user] = await this.knex('user_account').select().where({id});
  this.activeUser = user;
});

Then('{string} user remains unchanged', async function(id) {
  const [user] = await this.knex('user_account').select().where({id});
  expect(user).to.eql(this.activeUser);
});

Then('{string} user matches', async function(id, json) {
  const [user] = await this.knex('user_account')
    .select()
    .innerJoin(
      'user_account_info',
      'user_account.id',
      'user_account_info.user_account_id'
    )
    .where({'user_account.id': id});

  const userResultMatchesPattern = matchPattern(user, json);
  if (userResultMatchesPattern) { throw new Error(userResultMatchesPattern); }
});

Then('{string} user has location', async function(id, coordinates) {
  const expectedCoordinates = JSON.parse(coordinates);

  const [user] = await this.knex('user_account')
    .select(this.knex.postgis.asText('location'))
    .innerJoin(
      'user_account_info',
      'user_account.id',
      'user_account_info.user_account_id'
    )
    .where({'user_account.id': id});

  const actualCoordinates = user.location
    .match(/\((.*)\)/)[1]
    .split(' ')
    .map(parseFloat);

  expect(actualCoordinates).to.eql(expectedCoordinates);
});
