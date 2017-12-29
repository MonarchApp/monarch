const users = require('./../handlers/users');

module.exports = [
  {
    handler: users.delete.handler,
    method: 'DELETE',
    path: '/v1/users/{id}'
  },
  {
    handler: users.getAll.handler,
    method: 'GET',
    path: '/v1/users'
  },
  {
    handler: users.get.handler,
    method: 'GET',
    path: '/v1/users/{id}'
  },
  {
    config: users.post.config,
    handler: users.post.handler,
    method: 'POST',
    path: '/v1/users'
  }
];
