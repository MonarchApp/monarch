const nock = require('nock');

const {Given} = require('cucumber');

Given('the location gateway autocomplete API is down', function() {
  nock(this.config.locationAutocompleteUrl)
    .get('/6.2/suggest.json')
    .reply(503);
});

Given('the location gateway geocode API is down', function() {
  nock(this.config.locationGeocodeUrl)
    .get('/6.2/geocode.json')
    .reply(503);
});
