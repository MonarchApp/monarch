const {Then, When} = require('cucumber');
const {expect} = require('chai');
const jwt = require('jsonwebtoken');

const isTokenActive = token => {
  if (!token) return false;

  const {exp} = jwt.decode(token);
  return (exp * 1000) > (Date.now() - (60 * 1000));
};

When('a valid, authenticated token is obtained', async function() {
  if (isTokenActive(this.token)) return this.token;

  const url = this.utils.getRequestUrl('/login');
  const body = {
    email: 'frankjaeger@foxhound.com',
    password: 'password'
  };

  const result = await this.utils.request({body, method: 'POST', url});
  this.token = result.body.token;
});

Then('returned token lasts for thirty minutes', function() {
  const tokenExpirationInSeconds = jwt.decode(this.activeRequest.body.token).exp;
  const dateInSeconds = Date.now() / 1000;
  const thirtyMinutesInSeconds = 60 * 30;
  expect(tokenExpirationInSeconds).to.equal(dateInSeconds + thirtyMinutesInSeconds);
});
