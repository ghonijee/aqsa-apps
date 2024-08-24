import { getAllCompaniesAction } from "@/actions/company/company.action";
import { Company, GetListCompaniesParams } from "@/entities";
import CompanyTableView from "./table-view";

export async function CompaniesView({
  search,
  orderBy,
  status,
  orderDir,
  page,
  pageSize,
}: GetListCompaniesParams) {
  let result: { data: Company[]; totalData: number };

  const params: GetListCompaniesParams = {
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    status: status || undefined,
    search: search || undefined,
    orderBy: orderBy || "id",
    orderDir: orderDir || "asc",
  };
  result = await getAllCompaniesAction(params);

  return (
    <div className="px-6 py-5 h-full w-full scroll-mb-10">
      <CompanyTableView
        data={result.data}
        totalData={result.totalData}
        param={params}
      />
    </div>
  );
}
