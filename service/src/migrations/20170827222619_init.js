exports.up = async knex => {
  await knex.schema.createTable('user_account_info', table => {
    table
      .uuid('id')
      .unique()
      .index()
      .primary();

    table
      .string('email')
      .notNullable()
      .unique();

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

    table.uuid('user_account_info_id');
    table
      .foreign('user_account_info_id')
      .references('id')
      .inTable('user_account_info');

    table
      .string('password')
      .notNullable();

    table
      .timestamp('create_date')
      .notNullable()
      .defaultTo(new Date().toISOString());

    table
      .timestamp('modify_date')
      .notNullable()
      .defaultTo(new Date().toISOString());
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('user_account');
  await knex.schema.dropTable('user_account_info');
};
