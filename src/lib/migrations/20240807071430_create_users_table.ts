import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("users")
    .addColumn("id", "bigserial", (c) => c.primaryKey().notNull())
    .addColumn("name", "varchar(255)", (c) => c.notNull())
    .addColumn("email", "varchar(255)", (c) => c.notNull().unique())
    .addColumn("username", "varchar(255)", (c) => c.notNull().unique())
    .addColumn("password", "text", (c) => c.notNull())
    .addColumn("is_active", "boolean", (c) => c.defaultTo(true))
    .addColumn("image", "text")
    .addColumn("created_at", "timestamp", (c) => c.defaultTo(sql`now()`))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("users").execute();
}
