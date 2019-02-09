const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

const {saltRounds} = require('../config.json').auth;
const hash = Promise.promisify(bcrypt.hash);

exports.seed = async knex => {
  await knex('user_account').truncate();

  const users = [{
    email: 'jill@abc.com',
    id: uuidv4(),
    password: await hash('password', saltRounds)
  }];

  await knex('user_account').insert(users);
};
