import DataTableLoading from "@/components/table/table-loading";
import { Metadata } from "next";
import { Suspense } from "react";
import TreeChartOfAccounts from "./tree-chart-of-account";
import FilterAction from "./filter-action";
import ContentWrapper from "@/components/layouts/content-wrapper";

export const metadata: Metadata = {
  title: "Chart of Accounts",
};

export default function ChartOfAccountsPage({
  params,
  searchParams,
}: {
  params: { company: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search = searchParams?.search as string | undefined;
  const type = searchParams?.type as string | undefined;
  const pageSize = (searchParams?.pageSize as string) || "10";
  const lastId = (searchParams?.lastId as string) || "0";

  return (
    <ContentWrapper company={params.company} titlePage="Chart of Accounts">
      <div className="px-6 py-5">
        <div className="space-y-4">
          <div className="">
            <FilterAction />
          </div>

          <TreeChartOfAccounts
            search={search}
            type={type}
            pageSize={Number(pageSize)}
            lastId={Number(lastId)}
            companyCode={params.company}
          />
        </div>
      </div>
    </ContentWrapper>
  );
}
