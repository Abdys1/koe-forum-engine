import { createTableWithAudit, dropTableWithAuditIfExists } from '../utils/audit.js';

const TABLE_NAME = 'forum_user';

export function up(knex) {
  return createTableWithAudit(knex, TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.string('username', 255).notNullable();
    table.text('password').notNullable();
  }, (auditTable) => {
    auditTable.increments('aud_id').primary();
    auditTable.timestamp('created_at').notNullable();
    auditTable.string('op_type', 1).notNullable();
    auditTable.bigint('id').notNullable().references(`${TABLE_NAME}.id`);
    auditTable.string('username', 255).notNullable();
    auditTable.text('password').notNullable();
  });
}

export function down(knex) {
  return dropTableWithAuditIfExists(knex, TABLE_NAME);
}
