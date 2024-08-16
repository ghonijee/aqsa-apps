import { ListChartOfAccountParams } from "@/entities";
import FilterAction from "./filter-action";
import TreeChartOfAccounts from "./tree-chart-of-account";
import { getListChartOfAccountsAction } from "@/actions/chart_of_account/chart-of-account.action";

export async function ChartOfAccountsView({
  params,
}: {
  params: ListChartOfAccountParams;
}) {
  const data = await getListChartOfAccountsAction(params);
  return (
    <div className="px-6 py-5 h-full space-y-5 w-full scroll-mb-10">
      <FilterAction accounts={data} />
      <TreeChartOfAccounts data={data} />
    </div>
  );
}
