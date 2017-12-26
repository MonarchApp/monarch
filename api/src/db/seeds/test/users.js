const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const path = require('path');
const rootRequire = require('app-root-path').require;

const nodeEnvironment = process.env.NODE_ENV || 'test';
const configPath = path.join('config', `${nodeEnvironment}.json`);
const {saltRounds} = rootRequire(configPath).auth;
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
