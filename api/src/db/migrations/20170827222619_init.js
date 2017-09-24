exports.up = knex => {
  return knex.schema.createTable('users', (table) => {
    table.timestamp('createDate')
      .notNullable()
      .defaultTo(new Date().toISOString());
    table.string('email')
      .notNullable()
      .unique();
    table.increments('id')
      .primary();
    table.timestamp('modifyDate')
      .notNullable()
      .defaultTo(new Date().toISOString());
    table.string('password')
      .notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('users');
};
