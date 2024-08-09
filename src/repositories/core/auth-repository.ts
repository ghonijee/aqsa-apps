import { db, type DatabaseConnection } from "@/lib/database/db";

export class AuthRepository {
  protected db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  findByUsername(username: string) {
    return this.db
      .selectFrom("users")
      .select(["id", "username", "password", "email", "name", "image"])
      .where("username", "=", username)
      .where("isActive", "=", true)
      .executeTakeFirst();
  }
}

export const authRepository = new AuthRepository(db);
