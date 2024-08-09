import { Company } from "@/entities";
import { DatabaseConnection, db } from "@/lib/database/db";

export class CompanyRepository {
  protected db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  async findByUserId(userId: number): Promise<Company[]> {
    const companies = await this.db
      .selectFrom("companies")
      .innerJoin("userCompanies", "companies.id", "userCompanies.companyId")
      .selectAll()
      .where("userCompanies.userId", "=", userId)
      .execute();

    return companies;
  }
}

export const companyRepository = new CompanyRepository(db);
