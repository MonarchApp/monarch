const rp = require('request-promise');

const connect = {};

connect.geocode = async ({hereAppId, hereAppCode, search}) => {
  return await rp.get({
    uri: 'https://geocoder.api.here.com/6.2/geocode.json',
    qs: {
      app_id: hereAppId,
      app_code: hereAppCode,
      searchText: search,
    }
  });
};

module.exports = connect;
