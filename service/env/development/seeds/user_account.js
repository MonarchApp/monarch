const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

const {saltRounds} = require('../config.json').auth;
const hash = Promise.promisify(bcrypt.hash);

exports.seed = async knex => {
  const userId = uuidv4();
  const password = await hash('password', saltRounds);

  const [existingUser] = await knex('user_account_info')
    .select('user_account_id')
    .where({email: 'jill@abc.com'});

  if (existingUser) {
    await knex('user_account')
      .where({id: existingUser.user_account_id})
      .del();
  }

  await knex.transaction(trx =>
    Promise.all([
      trx('user_account').insert({id: userId, password}),
      trx('user_account_info').insert({
        id: uuidv4(),
        user_account_id: userId,
        email: 'jill@abc.com',
      })
    ])
  );
};
