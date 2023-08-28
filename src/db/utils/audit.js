function createAuditTriggerQuery(tableName, auditTableName) {
  const AUD_TABLE_SEQ = `${auditTableName}_aud_id_seq`;

  return `
        CREATE OR REPLACE FUNCTION ${auditTableName}() RETURNS TRIGGER
          AS
          $${auditTableName}$
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
          $${auditTableName}$
          language plpgsql;

        CREATE TRIGGER ${auditTableName}_trigger
        AFTER INSERT OR UPDATE OR DELETE ON ${tableName}
        FOR EACH ROW
        EXECUTE PROCEDURE ${auditTableName}();`;
}

function dropAuditTriggerIfExistsQuery(tableName, auditTableName) {
  return `
    DROP TRIGGER IF EXISTS ${auditTableName}_trigger ON ${tableName};
    DROP FUNCTION IF EXISTS ${auditTableName};
  `;
}

function resolveAuditTableName(tableName) {
  return `aud_${tableName}`;
}

function createTableWithAudit(knex, tableName, init, initAudit) {
  if (process.env.NODE_ENV === 'test') {
    // teszt környezetben sqllite van, ami nem szereti a postgres-es triggereket
    // ezért nem hozunk létre olyankor audit táblát/triggert
    return knex.schema.createTable(tableName, init);
  }

  const auditTableName = resolveAuditTableName(tableName);
  return knex.schema
    .createTable(tableName, init)
    .createTable(auditTableName, initAudit)
    .raw(createAuditTriggerQuery(tableName, auditTableName));
}

function dropTableWithAuditIfExists(knex, tableName) {
  if (process.env.NODE_ENV === 'test') {
    return knex.schema.dropTableIfExists(tableName);
  }

  const auditTableName = resolveAuditTableName(tableName);
  return knex.schema
    .raw(dropAuditTriggerIfExistsQuery(tableName, auditTableName))
    .dropTableIfExists(auditTableName)
    .dropTableIfExists(tableName);
}

// eslint-disable-next-line import/prefer-default-export
export { createTableWithAudit, dropTableWithAuditIfExists };
