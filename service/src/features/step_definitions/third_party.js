const nock = require('nock');

const {Given} = require('cucumber');

Given('the third party geocoding API is down', function() {
  nock(this.config.locationGatewayUrl)
    .get('/6.2/suggest.json')
    .reply(500);
});
