const rp = require('request-promise');

const location = {};

location.search = async ({hereAppId, hereAppCode, search}) => {
  const geocodeSuggestions = await rp.get({
    json: true,
    qs: {
      app_code: hereAppCode,
      app_id: hereAppId,
      query: search
    },
    uri: 'https://autocomplete.geocoder.api.here.com/6.2/suggest.json'
  });

  return geocodeSuggestions.suggestions
    .map(({label, locationId}) => ({label, locationId}));
};

module.exports = location;
