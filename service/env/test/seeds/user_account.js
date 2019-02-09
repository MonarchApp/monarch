const Promise = require('bluebird');
const bcrypt = require('bcrypt');

const {saltRounds} = require('../config.json').auth;
const hash = Promise.promisify(bcrypt.hash);

exports.seed = async knex => {
  await knex('user_account').truncate();

  const users = [
    {
      email: 'frankjaeger@foxhound.com',
      id: '10ba038e-48da-487b-96e8-8d3b99b6d18a',
      password: await hash('password', saltRounds)
    }
  ];

  return knex('user_account').insert(users);
};
