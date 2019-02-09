const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

const {saltRounds} = require('../config.json').auth;
const hash = Promise.promisify(bcrypt.hash);

exports.seed = async knex => {
  const userId = '10ba038e-48da-487b-96e8-8d3b99b6d18a';
  const password = await hash('password', saltRounds);

  await knex.transaction(trx =>
    Promise.all([
      trx('user_account').insert({id: userId, password}),
      trx('user_account_info').insert({
        id: uuidv4(),
        user_account_id: userId,
        email: 'frankjaeger@foxhound.com',
      })
    ])
  );
};
