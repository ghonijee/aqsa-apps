import { getAllCompaniesAction } from "@/actions/company/company.action";
import { Company, GetListCompaniesParams } from "@/entities";
import CompanyTableView from "./table-view";

export async function CompaniesView({
  search,
  orderBy,
  orderDir,
  page,
  pageSize,
}: GetListCompaniesParams) {
  let data: Company[];

  // cretae delay for demo
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const params: GetListCompaniesParams = {
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    search: search || undefined,
    orderBy: orderBy || "id",
    orderDir: orderDir || "asc",
  };
  data = await getAllCompaniesAction(params);

  return (
    <div className="px-6 py-5 h-full w-full scroll-mb-10">
      <CompanyTableView data={data} />
    </div>
  );
}
