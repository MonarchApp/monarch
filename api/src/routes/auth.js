const auth = require('./../handlers/auth');

module.exports = [
  {
    config: auth.login.config,
    handler: auth.login.handler,
    method: 'POST',
    path: '/v1/login'
  },
  {
    handler: auth.logout.handler,
    method: 'POST',
    path: '/v1/logout'
  }
];
