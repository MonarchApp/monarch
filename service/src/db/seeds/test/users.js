const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const rootRequire = require('app-root-path').require;

const {saltRounds} = rootRequire('config/test.json').auth;
const hash = Promise.promisify(bcrypt.hash);

exports.seed = async knex => {
  const users = [
    {
      email: 'frankjaeger@foxhound.com',
      password: await hash('password', saltRounds)
    }
  ];

  return knex('users').insert(users);
};
