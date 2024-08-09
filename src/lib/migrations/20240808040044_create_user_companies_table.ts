import type { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("user_companies")
    .addColumn("user_id", "bigint", (c) => c.notNull())
    .addColumn("company_id", "bigint", (c) => c.notNull())
    .addForeignKeyConstraint("user_fk", ["user_id"], "users", ["id"], (cb) =>
      cb.onDelete("cascade")
    )
    .addForeignKeyConstraint(
      "company_fk",
      ["company_id"],
      "companies",
      ["id"],
      (cb) => cb.onDelete("cascade")
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("user_companies").execute();
}
