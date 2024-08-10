import { NewChartOfAccount } from "@/entities";
import type { Kysely } from "kysely";
import { ChartOfAccountType } from "../../entities/finance/chart-of-account.entity";

export async function seed(db: Kysely<any>): Promise<void> {
  const companies = await db.selectFrom("companies").selectAll().execute();

  for (const company of companies) {
    const accounts: NewChartOfAccount[] = [
      {
        parentId: null,
        companyId: company.id,
        name: "Assets",
        code: "1000",
        type: ChartOfAccountType.View,
      },
      {
        parentId: null,
        companyId: company.id,
        name: "Liabilities",
        code: "2000",
        type: ChartOfAccountType.View,
      },
      {
        parentId: null,
        companyId: company.id,
        name: "Equity",
        code: "3000",
        type: ChartOfAccountType.View,
      },
      {
        parentId: null,
        companyId: company.id,
        name: "Income",
        code: "4000",
        type: ChartOfAccountType.View,
      },
      {
        parentId: null,
        companyId: company.id,
        name: "Expenses",
        code: "5000",
        type: ChartOfAccountType.View,
      },
    ];

    await db.insertInto("chart_of_accounts").values(accounts).execute();
  }
}
