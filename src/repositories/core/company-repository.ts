import { Company, GetListCompaniesParams } from "@/entities";
import { DatabaseConnection, db } from "@/lib/database/db";

export class CompanyRepository {
  protected db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  async findAll({
    page = 1,
    pageSize = 10,
    search = "",
    isActive = true,
    orderBy = "id",
    orderDir = "asc",
  }: GetListCompaniesParams): Promise<Company[]> {
    const companies = await this.db
      .selectFrom("companies")
      .selectAll()
      .$if(search !== "" && search !== undefined, (qb) =>
        qb.where((wb) =>
          wb.or([
            wb("companies.name", "like", `%${search}%`),
            wb("companies.email", "like", `%${search}%`),
            wb("companies.code", "like", `%${search}%`),
            wb("companies.phoneNumber", "like", `%${search}%`),
            wb("companies.address", "like", `%${search}%`),
          ])
        )
      )
      .where("companies.isActive", "=", isActive)
      .orderBy(orderBy, orderDir)
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .execute();

    return companies;
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
  async findByCompanyCode(code: string): Promise<Company | null> {
    const companies = await this.db
      .selectFrom("companies")
      .selectAll()
      .where("companies.code", "=", code)
      .executeTakeFirst();

    return companies ?? null;
  }
}

export const companyRepository = new CompanyRepository(db);
