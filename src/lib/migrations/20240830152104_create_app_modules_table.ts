import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("modules")
    .addColumn("id", "bigint", (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn("parent_id", "bigint")
    .addColumn("name", "varchar(255)", (c) => c.notNull())
    .addColumn("icon", "char(50)")
    .addColumn("url", "varchar(255)", (c) => c.notNull())
    .addColumn("created_at", "timestamp", (c) => c.defaultTo(sql`now()`))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("modules").execute();
}
