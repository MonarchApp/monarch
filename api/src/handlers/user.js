const Joi = require('joi');

const Users = {
  delete: {},
  get: {},
  getAll: {},
  post: {}
};

Users.delete.handler = () => {};
Users.get.handler = (request, reply) => {
  reply('shit');
};
Users.getAll.handler = () => {};

Users.post.handler = (request, reply) => {
  reply({
    email: 'testemail@domain.com',
    id: 0
  });
};

Users.post.config = {
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }
};

module.exports = Users;
