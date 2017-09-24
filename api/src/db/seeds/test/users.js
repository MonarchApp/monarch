const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const rootRequire = require('app-root-path').require;

const nodeEnvironment = process.env.NODE_ENV || 'test';
const {saltRounds} = rootRequire(`src/config/${nodeEnvironment}`);
const hash = Promise.promisify(bcrypt.hash);

exports.seed = async knex => {
  const users = [
    {
      email: 'frankjaeger@foxhound.com',
      password: await hash('I forgot my password!', saltRounds)
    }
  ];

  return knex('users').insert(users);
};
