const rp = require('request-promise');

const register = server => {
  const {code, host, id, port} = server.config.get('locationGateway');

  let uriPort;
  uriPort = port ? `:${port}` : '';

  const url = `${host}${uriPort}/6.2`;

  server.method('connect.location.search', async query => {
    const geocodeSuggestions = await rp.get({
      json: true,
      qs: {
        app_code: code,
        app_id: id,
        query
      },
      uri: `${url}/suggest.json`
    });

    return geocodeSuggestions.suggestions
      .map(({label, locationId}) => ({label, locationId}));
  });

  server.method('connect.location.getCoordsFromLocationId', async locationId => {
    rp.get({
      json: true,
      qs: {
        app_code: code,
        app_id: id
      },
      uri: `${url}/suggest.json`
    });
  });
};

module.exports = {
  register,
  name: 'connect',
  version: '0.0.0'
};
