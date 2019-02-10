const rp = require('request-promise');

const locationFactory = server => {
  const location = {};

  location.search = async query => {
    console.log(server.config.get('locationGateway'));
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
  };

  return location;
};

module.exports = locationFactory;
