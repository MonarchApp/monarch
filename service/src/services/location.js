const rp = require('request-promise');

const location = {};

location.search = async ({
  locationGatewayId,
  locationGatewayCode,
  locationGatewayHost,
  port,
  search
}) => {
  let uriPort;
  uriPort = port ? `:${port}` : '';

  const geocodeSuggestions = await rp.get({
    json: true,
    qs: {
      app_code: locationGatewayCode,
      app_id: locationGatewayId,
      query: search
    },
    uri: `${locationGatewayHost}${uriPort}/6.2/suggest.json`
  });

  return geocodeSuggestions.suggestions
    .map(({label, locationId}) => ({label, locationId}));
};

module.exports = location;
