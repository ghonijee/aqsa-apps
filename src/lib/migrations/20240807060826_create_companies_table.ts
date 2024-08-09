import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("companies")
    .addColumn("id", "bigint", (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn("name", "varchar(255)", (c) => c.notNull())
    .addColumn("code", "varchar(5)")
    .addColumn("email", "varchar(100)")
    .addColumn("phone_number", "varchar(20)")
    .addColumn("address", "varchar(255)")
    .addColumn("is_active", "boolean", (c) => c.defaultTo(true))
    .addColumn("created_at", "timestamp", (c) => c.defaultTo(sql`now()`))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("companies").execute();
}
