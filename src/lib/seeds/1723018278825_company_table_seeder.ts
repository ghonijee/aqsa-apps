import { UserCompanyTable } from "./../../entities/core/user_company.entity";
import { NewCompany } from "@/entities";
import type { Kysely } from "kysely";

export async function seed(db: Kysely<any>): Promise<void> {
  const newCompany: NewCompany[] = [
    {
      name: "CompanyOne",
      code: "C1",
      email: "company1@mail.com",
      phoneNumber: "1234567890",
      address: "Company 1 Address",
      isActive: true,
    },
    {
      name: "CompanyTwo",
      code: "C2",
      email: "company2@mail.com",
      phoneNumber: "1234567890",
      address: "Company 2 Address",
      isActive: true,
    },
  ];

  const companyResult = await db
    .insertInto("companies")
    .values(newCompany)
    .execute();

  const users = await db.selectFrom("users").selectAll().execute();

  for (const user of users) {
    for (const company of companyResult) {
      await db
        .insertInto("userCompanies")
        .values({
          userId: user.id,
          companyId: company.insertId,
        })
        .execute();
    }
  }
}
