import DataTableLoading from "@/components/table/table-loading";
import { Metadata } from "next";
import { Suspense } from "react";
import TreeChartOfAccounts from "./tree-chart-of-account";
import FilterAction from "./filter-action";
import ContentWrapper from "@/components/layouts/content-wrapper";
import { ListChartOfAccountParams } from "@/entities";
import { getListChartOfAccountsAction } from "@/actions/chart_of_account/chart-of-account.action";

export const metadata: Metadata = {
  title: "Chart of Accounts",
};

export default async function ChartOfAccountsPage({
  params,
  searchParams,
}: {
  params: { company: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const paramsList: ListChartOfAccountParams = {
    pageSize: 0,
    companyCode: params.company,
  };

  const data = await getListChartOfAccountsAction(paramsList);

  return (
    <ContentWrapper company={params.company} titlePage="Chart of Accounts">
      <div className="px-6 py-5 h-full space-y-5 w-full scroll-mb-10">
        <FilterAction accounts={data} />
        <Suspense fallback={<DataTableLoading />} key={data.length}>
          <TreeChartOfAccounts data={data} />
        </Suspense>
      </div>
    </ContentWrapper>
  );
}
