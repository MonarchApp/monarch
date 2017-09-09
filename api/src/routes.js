const Users = {};

module.exports = [
  {path: '/v1/users', method: 'GET', handler: Users.getAll},
  {path: '/v1/users/{id}', method: 'GET', handler: Users.get},
  {path: '/v1/users', method: 'POST', handler: Users.post},
  {path: '/v1/users/{id}', method: 'DELETE', handler: Users.get}
];
