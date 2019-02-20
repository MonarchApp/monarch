const rp = require('request-promise');

const getLocationUrl = (config, name) => {
  const {host, port} = config.get(`gateways:location:${name}`);
  const uriPort = port ? `:${port}` : '';

  return `${host}${uriPort}/6.2`;
};

const getCodeAndId = (config, name) => {
  const {code, id} = config.get(`gateways:location:${name}`);
  return [code, id];
};

const register = server => {
  const autocompleteUrl = getLocationUrl(server.config, 'autocomplete');
  const [autocompleteCode, autocompleteId] =
    getCodeAndId(server.config, 'autocomplete');

  const geocodeUrl = getLocationUrl(server.config, 'geocode');
  const [geocodeCode, geocodeId] = getCodeAndId(server.config, 'geocode');

  server.method('connect.location.search', async query => {
    const geocodeSuggestions = await rp.get({
      json: true,
      qs: {
        app_code: autocompleteCode,
        app_id: autocompleteId,
        query
      },
      uri: `${autocompleteUrl}/suggest.json`
    });

    return geocodeSuggestions.suggestions
      .map(({label, locationId}) => ({label, locationId}));
  });

  server.method('connect.location.getCoordsFromLocationId', async locationId => {
    const result = rp.get({
      json: true,
      qs: {
        app_code: geocodeCode,
        app_id: geocodeId,
        locationid: locationId
      },
      uri: `${geocodeUrl}/geocode.json`
    });

    const {Latitude, Longitude} = result.Response.View
      .Result[0].Location.DisplayPosition;

    return [Latitude, Longitude];
  });
};

module.exports = {
  register,
  name: 'connect',
  version: '0.0.0'
};
