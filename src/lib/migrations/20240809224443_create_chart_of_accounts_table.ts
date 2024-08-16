import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // migration for chart-of-accounts table
  await db.schema
    .createTable("chart_of_accounts")
    .addColumn("id", "bigint", (col) => col.autoIncrement().primaryKey())
    .addColumn("parent_id", "bigint")
    .addColumn("company_id", "integer", (col) => col.notNull())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("code", "varchar(255)", (col) => col.notNull())
    .addColumn("type", "varchar(255)")
    .addColumn("normal_balance", "varchar(10)", (col) => col.notNull())
    .addColumn("is_active", "boolean", (col) => col.defaultTo(true))
    .addColumn("is_manageable", "boolean", (col) => col.defaultTo(true))
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("deleted_at", "timestamp")
    .execute();

  // create migration for account-mutations.entity.ts table
  await db.schema
    .createTable("account_mutations")
    .addColumn("id", "bigint", (col) => col.autoIncrement().primaryKey())
    .addColumn("account_id", "bigint", (col) => col.notNull())
    .addColumn("transaction_id", "bigint")
    .addColumn("debit", "bigint")
    .addColumn("credit", "bigint")
    .addColumn("balance", "bigint", (col) => col.notNull())
    .addColumn("description", "varchar(255)")
    .addColumn("date", "timestamp", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("deleted_at", "timestamp")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("chart_of_accounts").execute();
  await db.schema.dropTable("account_mutations").execute();
}
