/* eslint-disable no-unused-vars */
export function up(knex) {
  return knex.schema.createTable('forum_user', (table) => {
    table.increments('id').primary();
    table.string('username', 255).notNullable();
    table.text('password').notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists('forum_user');
}
