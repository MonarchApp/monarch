const Auth = require('./../handlers/auth');

module.exports = [
  {
    handler: Auth.login.handler,
    method: 'GET',
    path: '/v1/login'
  },
  {
    handler: Auth.logout.handler,
    method: 'GET',
    path: '/v1/logout'
  }
];
