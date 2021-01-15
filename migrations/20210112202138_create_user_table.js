
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function (table) {
        table.increments('user_id');
        table.string('name', 255).notNullable();
        table.string('email', 255).notNullable();
        table.text('password').notNullable();
        table.string('phone_number', 255);
        table.text('address');
        table.text('city');
        table.text('state');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
