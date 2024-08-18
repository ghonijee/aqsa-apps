import ContentWrapper from "@/components/layouts/content-wrapper";
import { Suspense } from "react";
import { CompaniesView } from "../../../../../screens/company/companies-view";
import ContentViewLoading from "@/components/loading/content-view-loading";
import { GetListCompaniesParams } from "@/entities";

export default function CompaniesPage({
  searchParams,
}: {
  searchParams: GetListCompaniesParams;
}) {
  return (
    <ContentWrapper titlePage="Manage Company">
      <Suspense fallback={<ContentViewLoading />}>
        <CompaniesView {...searchParams} />
      </Suspense>
    </ContentWrapper>
  );
}
