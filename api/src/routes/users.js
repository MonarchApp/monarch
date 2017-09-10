const Users = require('./../handlers/user');

module.exports = [
  {
    handler: Users.getAll.handler,
    method: 'GET',
    path: '/v1/users',
  },
  {
    handler: Users.get.handler,
    method: 'GET',
    path: '/v1/users/{id}',
  },
  {
    handler: Users.post.handler,
    method: 'POST',
    path: '/v1/users',
  },
  {
    handler: Users.delete.handler,
    method: 'DELETE',
    path: '/v1/users/{id}',
  }
];
