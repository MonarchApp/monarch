const rp = require('request-promise');

const location = {};

location.search = async ({hereAppId, hereAppCode, port, search}) => {
  let uriPort;
  uriPort = port ? `:${port}` : '';

  const uri =
    `https://autocomplete.geocoder.api.here.com/6.2/suggest.json${uriPort}`;

  const geocodeSuggestions = await rp.get({
    json: true,
    qs: {
      app_code: hereAppCode,
      app_id: hereAppId,
      query: search
    },
    uri
  });

  return geocodeSuggestions.suggestions
    .map(({label, locationId}) => ({label, locationId}));
};

module.exports = location;
