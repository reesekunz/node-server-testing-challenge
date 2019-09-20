exports.up = function(knex) {
  return knex.schema.createTable("users", column => {
    column.increments();

    column
      .string("username", 128)
      .notNullable()
      .unique();
    column.string("password", 128).notNullable();
    // column.string("department", 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
