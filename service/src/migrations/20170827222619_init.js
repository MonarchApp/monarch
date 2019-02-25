exports.up = async knex => {
  await knex.schema.createTable('user_account', (table) => {
    table
      .uuid('id')
      .unique()
      .index()
      .primary();

    table
      .string('password')
      .notNullable();

    table.timestamps(true, true);
  });

  await knex.schema.createTable('user_account_info', table => {
    table
      .uuid('id')
      .unique()
      .index()
      .primary();

    table
      .uuid('user_account_id')
      .notNullable();

    table
      .foreign('user_account_id')
      .references('id')
      .inTable('user_account')
      .onDelete('cascade');

    table
      .string('email')
      .notNullable()
      .unique();

    table.string('bio');

    table
      .specificType('location', 'geometry(point)')
      .index();

    table.timestamps(true, true);
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('user_account_info');
  await knex.schema.dropTableIfExists('user_account');
};
