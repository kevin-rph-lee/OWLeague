exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('uid');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
