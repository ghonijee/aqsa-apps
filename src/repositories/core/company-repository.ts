import {
  Company,
  GetListCompaniesParams,
  NewCompany,
  UpdateCompany,
} from "@/entities";
import { DatabaseConnection, db } from "@/lib/database/db";
import { InsertResult, UpdateResult } from "kysely";
import { create } from "zustand";

export class CompanyRepository {
  protected db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  async findAll({
    page = 1,
    pageSize = 10,
    search = "",
    isActive = undefined,
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
      .$if(isActive !== undefined && isActive !== null, (qb) =>
        qb.where("companies.isActive", "=", isActive!)
      )
      .where("companies.deletedAt", "is", null)
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
      .where("companies.deletedAt", "is", null)
      .execute();

    return companies;
  }
  async findByCompanyCode(code: string): Promise<Company | null> {
    const companies = await this.db
      .selectFrom("companies")
      .selectAll()
      .where("companies.code", "=", code)
      .where("companies.deletedAt", "is", null)
      .executeTakeFirst();

    return companies ?? null;
  }

  async create(data: NewCompany): Promise<InsertResult> {
    const result = await this.db
      .insertInto("companies")
      .values(data)
      .executeTakeFirstOrThrow();

    return result;
  }

  async update(id: number, data: UpdateCompany): Promise<UpdateResult> {
    const result = await this.db
      .updateTable("companies")
      .set(data)
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return result;
  }

  async delete(id: number): Promise<UpdateResult> {
    const result = await this.db
      .updateTable("companies")
      .set({ deletedAt: new Date() })
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return result;
  }
}

export const companyRepository = new CompanyRepository(db);
