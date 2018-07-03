const {defineSupportCode} = require('cucumber');
const {expect} = require('chai');
const jwt = require('jsonwebtoken');

defineSupportCode(function({Then}) {
  Then('returned token lasts for thirty minutes', function() {
    const tokenExpirationInSeconds = jwt.decode(this.activeRequest.body.token).exp;
    const dateInSeconds = Date.now() / 1000;
    const thirtyMinutesInSeconds = 60 * 30;
    expect(tokenExpirationInSeconds).to.equal(dateInSeconds + thirtyMinutesInSeconds);
  });
});
