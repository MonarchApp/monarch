exports.up = async knex => {
  await knex.schema.createTable('user_account_info', table => {
    table
      .increments('id')
      .primary();

    table
      .string('email')
      .notNullable()
      .unique();

    table
      .string('password')
      .notNullable();

    table.string('bio');

    table
      .timestamp('create_date')
      .notNullable()
      .defaultTo(new Date().toISOString());

    table
      .timestamp('modify_date')
      .notNullable()
      .defaultTo(new Date().toISOString());
  });

  await knex.schema.createTable('user_account', (table) => {
    table
      .increments('id')
      .primary();

    table
      .int('user_account_info_id')
      .references('id')
      .inTable('user_account_info');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('user_account');
};
