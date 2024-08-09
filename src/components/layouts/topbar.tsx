import getListCompaniesByUserIdAction from "@/actions/company/get-list-companies-by-user-id.action";
import { auth } from "@/auth";
import UserInfo from "./user-info";

export default async function TopBar({ company }: { company: string }) {
  const session = await auth();
  const user = session?.user;
  const listCompanies = session?.user.companies || [];

  return (
    <div className="h-16 w-full  bg-base flex justify-end items-center px-4">
      <UserInfo data={listCompanies} company={company} user={user!} />
    </div>
  );
}
