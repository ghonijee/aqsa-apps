import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("app_modules")
    .addColumn("id", "bigserial", (c) => c.primaryKey().notNull())
    .addColumn("name", "varchar(255)", (c) => c.notNull())
    .addColumn("defaultUrl", "varchar(255)", (c) => c.notNull())
    .addColumn("created_at", "timestamp", (c) => c.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createTable("feature_modules")
    .addColumn("id", "bigserial", (c) => c.primaryKey().notNull())
    .addColumn("name", "varchar(255)", (c) => c.notNull())
    .addColumn("defaultUrl", "varchar(255)", (c) => c.notNull())
    .addColumn("app_module_id", "bigint", (c) => c.notNull())
    .addColumn("created_at", "timestamp", (c) => c.defaultTo(sql`now()`))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("feature_modules").execute();
  await db.schema.dropTable("app_modules").execute();
}
