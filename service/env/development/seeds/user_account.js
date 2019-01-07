const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

const {saltRounds} = require('../config.json').auth;
const hash = Promise.promisify(bcrypt.hash);

exports.seed = async knex => {
  const userId = uuidv4();

  await knex('user_account').insert({
    id: userId,
    password: await hash('password', saltRounds)
  });

  await knex('user_account_info').insert({
    id: uuidv4(),
    user_account_id: userId,
    email: 'jill@abc.com',
  });
};
