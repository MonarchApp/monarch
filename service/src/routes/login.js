const login = require('./../handlers/login');

module.exports = [
  {
    config: login.post.config,
    handler: login.post.handler,
    method: 'POST',
    path: '/v1/login'
  }
];
