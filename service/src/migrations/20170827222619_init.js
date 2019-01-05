exports.up = knex => {
  return knex.schema.createTable('user_account', (table) => {
    table
      .uuid('id')
      .unique()
      .index()
      .primary();

    table
      .string('email')
      .notNullable()
      .unique();

    table
      .string('password')
      .notNullable();

    table
      .timestamp('createDate')
      .notNullable()
      .defaultTo(new Date().toISOString());

    table
      .timestamp('modifyDate')
      .notNullable()
      .defaultTo(new Date().toISOString());

    table.string('bio');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('user_account');
};
