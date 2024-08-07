import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DatabaseTable } from "./types";
import { container } from "tsyringe";

export const pgDialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
  }),
});

export const db = new Kysely<DatabaseTable>({
  dialect: pgDialect,
  plugins: [new CamelCasePlugin()],
});

export type DatabaseConnection = Kysely<DatabaseTable>;

container.registerInstance<DatabaseConnection>("DatabaseConnection", db);
