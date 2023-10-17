import { Knex } from "knex";

function resolveAuditTableName(tableName: string): string {
  return `aud_${tableName}`;
}

function resolveOnUpdateFuncName(tableName: string): string {
  return `on_update_${tableName}`;
}

function createAuditTriggerQuery(tableName: string, auditTableName: string): string {
  const AUD_TABLE_SEQ = `${auditTableName}_aud_id_seq`;
  const ON_UPDATE_FUNC_NAME = resolveOnUpdateFuncName(tableName);

  return `
  CREATE OR REPLACE FUNCTION ${ON_UPDATE_FUNC_NAME}() RETURNS TRIGGER
  AS
  $$
  BEGIN
      IF (TG_OP = 'DELETE') THEN
        INSERT INTO ${auditTableName} SELECT nextval('${AUD_TABLE_SEQ}'), now(), 'D', OLD.*;
      ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO ${auditTableName} SELECT nextval('${AUD_TABLE_SEQ}'), now(), 'U', NEW.*;
      ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO ${auditTableName} SELECT nextval('${AUD_TABLE_SEQ}'), now(), 'I', NEW.*;
      END IF;
      RETURN NULL;
  END;
  $$
  language plpgsql;

  CREATE TRIGGER update_${auditTableName}_trigger
  AFTER INSERT OR UPDATE OR DELETE ON ${tableName}
  FOR EACH ROW
  EXECUTE PROCEDURE ${ON_UPDATE_FUNC_NAME}();`;
}

function createTableWithAudit(knex: Knex, tableName: string, initCb: any, initAuditCb: any) {
  const auditTableName = resolveAuditTableName(tableName);
  return knex.schema
    .createTable(tableName, initCb)
    .createTable(auditTableName, (auditTable) => {
      auditTable.increments('aud_id').primary();
      auditTable.timestamp('created_at').notNullable();
      auditTable.string('op_type', 1).notNullable();
      initAuditCb(auditTable);
    })
    .raw(createAuditTriggerQuery(tableName, auditTableName));
}

function dropTableWithAuditIfExists(knex: Knex, tableName: string) {
  const auditTableName = resolveAuditTableName(tableName);
  const onUpdateFuncName = resolveOnUpdateFuncName(tableName);
  return knex.schema
    .dropTableIfExists(auditTableName)
    .dropTableIfExists(tableName)
    .raw(`DROP FUNCTION IF EXISTS ${onUpdateFuncName};`);
}

export { createTableWithAudit, dropTableWithAuditIfExists };
