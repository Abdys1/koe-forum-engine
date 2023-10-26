import { createTableWithAudit, dropTableWithAuditIfExists } from '../utils/audit.js';

const TABLE_NAME = 'forum_user';

function up(knex) {
  return createTableWithAudit(knex, TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.string('username', 255).notNullable();
    table.text('password').notNullable();
  }, (auditTable) => {
    auditTable.bigint('id').notNullable().references(`${TABLE_NAME}.id`);
    auditTable.string('username', 255).notNullable();
    auditTable.text('password').notNullable();
  });
}

function down(knex) {
  return dropTableWithAuditIfExists(knex, TABLE_NAME);
}

export { up, down };
