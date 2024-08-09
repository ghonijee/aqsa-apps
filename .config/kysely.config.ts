import { defineConfig, getKnexTimestampPrefix } from "kysely-ctl";
import { db } from "../src/lib/database/db";

export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: "src/lib/migrations",
    getMigrationPrefix: getKnexTimestampPrefix,
  },
  seeds: {
    seedFolder: "src/lib/seeds",
  },
});
