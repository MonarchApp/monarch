const rp = require('request-promise');

const register = server => {
  server.method('connect.location.search', async query => {
    const {code, host, id, port} = server.config.get('locationGateway');

    let uriPort;
    uriPort = port ? `:${port}` : '';

    const geocodeSuggestions = await rp.get({
      json: true,
      qs: {
        app_code: code,
        app_id: id,
        query
      },
      uri: `${host}${uriPort}/6.2/suggest.json`
    });

    return geocodeSuggestions.suggestions
      .map(({label, locationId}) => ({label, locationId}));
  });
};

module.exports = {
  register,
  name: 'connect',
  version: '0.0.0'
};
