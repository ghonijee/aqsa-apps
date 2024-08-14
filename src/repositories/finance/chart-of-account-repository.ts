import { PaginationResult } from "@/entities";
import {
  ChartOfAccountWithLevel,
  ListChartOfAccountParams,
} from "./../../entities/finance/chart-of-account.entity";
import { DatabaseConnection, db } from "@/lib/database/db";
import { Singleton } from "@/lib/utils/singleton";
import {
  ChartOfAccount,
  UpdateChartOfAccount,
} from "../../entities/finance/chart-of-account.entity";
import { DeleteResult, InsertResult, sql, UpdateResult } from "kysely";

export class ChartOfAccountRepository {
  protected db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  async findAll(
    params: ListChartOfAccountParams
  ): Promise<ChartOfAccountWithLevel[]> {
    const data = this.db
      .withRecursive("ChartOfAccountWithLevel", (qb) =>
        qb
          .selectFrom("chartOfAccounts")
          .select([
            "chartOfAccounts.id",
            "chartOfAccounts.parentId",
            "chartOfAccounts.name",
            "chartOfAccounts.code",
            "chartOfAccounts.type",
            "chartOfAccounts.isActive",
            "chartOfAccounts.isManageable",
          ])
          .select((qb) => qb.cast<number>(sql`1`, "char").as("level"))
          .where("chartOfAccounts.parentId", "is", null)
          .innerJoin("companies", "companies.id", "chartOfAccounts.companyId")
          .where("companies.code", "=", params.companyCode)
          .union((qb) =>
            qb
              .selectFrom("chartOfAccounts")
              .select([
                "chartOfAccounts.id",
                "chartOfAccounts.parentId",
                "chartOfAccounts.name",
                "chartOfAccounts.code",
                "chartOfAccounts.type",
                "chartOfAccounts.isActive",
                "chartOfAccounts.isManageable",
              ])
              .select((qb) =>
                qb.cast<number>(sql`level + 1`, "char").as("level")
              )
              .innerJoin(
                "ChartOfAccountWithLevel",
                "chartOfAccounts.parentId",
                "ChartOfAccountWithLevel.id"
              )
          )
      )
      .selectFrom("ChartOfAccountWithLevel")
      .selectAll()
      .orderBy("ChartOfAccountWithLevel.code", "asc");

    console.log(data.compile().sql);

    return await data.execute();
  }

  async findById(id: number): Promise<ChartOfAccount | null> {
    const data = await this.db
      .selectFrom("chartOfAccounts")
      .select([
        "chartOfAccounts.id",
        "chartOfAccounts.parentId",
        "chartOfAccounts.companyId",
        "chartOfAccounts.name",
        "chartOfAccounts.code",
        "chartOfAccounts.type",
        "chartOfAccounts.isActive",
        "chartOfAccounts.isManageable",
      ])
      .where("chartOfAccounts.id", "=", id)
      .executeTakeFirst();

    return data ?? null;
  }

  async create(data: ChartOfAccount): Promise<InsertResult> {
    const result = await this.db
      .insertInto("chartOfAccounts")
      .values(data)
      .executeTakeFirstOrThrow();

    return result;
  }

  async update(data: UpdateChartOfAccount): Promise<UpdateResult> {
    const result = await this.db
      .updateTable("chartOfAccounts")
      .set(data)
      .where("id", "=", data.id)
      .executeTakeFirstOrThrow();

    return result;
  }

  async delete(id: number): Promise<DeleteResult> {
    const result = await this.db
      .deleteFrom("chartOfAccounts")
      .where("id", "=", id)
      .executeTakeFirst();

    return result;
  }
}

export const chartOfAccountRepository =
  Singleton.getInstance<ChartOfAccountRepository>(
    "ChartOfAccountRepository",
    () => new ChartOfAccountRepository(db)
  );
