import { NewUser } from "@/entities";
import type { Kysely } from "kysely";
import { PasswordHash } from "../utils/password.helper";

export async function seed(db: Kysely<any>): Promise<void> {
  const users: NewUser[] = [
    {
      name: "Superadmin",
      email: "superadmin@mail.com",
      username: "superadmin",
      password: PasswordHash("password"),
      isActive: true,
    },
    {
      name: "Admin",
      email: "admin@mail.com",
      username: "admin",
      password: PasswordHash("password"),
      isActive: true,
    },
  ];

  await db
    .insertInto("users")
    .values(users)
    .onConflict((oc) => oc.doNothing())
    .execute();
}
