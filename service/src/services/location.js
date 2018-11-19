const rp = require('request-promise');

const location = {};

location.geocode = async ({hereAppId, hereAppCode, search}) => {
  const geocodeSuggestions = await rp.get({
    uri: 'http://autocomplete.geocoder.api.here.com/6.2/suggest.json',
    qs: {
      app_code: hereAppCode,
      app_id: hereAppId,
      query: search
    }
  });

  return geocodeSuggestions.suggestions
    .map(({label, locationId}) => ({label, locationId}));
};

module.exports = location;
