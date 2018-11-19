const login = require('./../handlers/location');

module.exports = [
  {
    config: login.search.config,
    handler: login.search.handler,
    method: 'POST',
    path: '/v1/location/search'
  }
];
