import { NewCompany } from "@/entities";
import type { Kysely } from "kysely";

export async function seed(db: Kysely<any>): Promise<void> {
  const newCompany: NewCompany = {
    name: "CompanyOne",
    code: "C1",
    email: "company1@mail.com",
    phoneNumber: "1234567890",
    address: "Company 1 Address",
    isActive: true,
  };

  await db
    .insertInto("companies")
    .values(newCompany)
    .onConflict((oc) => oc.doNothing())
    .execute();
}
