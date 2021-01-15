
exports.up = function(knex) {
    return knex.schema
        .createTable('categories', function (table) {
                table.increments('category_id');
                table.string('name', 255).notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('categories');
};
