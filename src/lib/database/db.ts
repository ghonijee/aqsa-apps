import { CamelCasePlugin, Kysely, MysqlDialect } from "kysely";
import { DatabaseTable } from "./types";
import { createPool } from "mysql2";

export const dbDialect = new MysqlDialect({
  pool: createPool({
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
  }),
});

export const db = new Kysely<DatabaseTable>({
  dialect: dbDialect,
  plugins: [new CamelCasePlugin()],
  log: ["query", "error"],
});

export type DatabaseConnection = Kysely<DatabaseTable>;
