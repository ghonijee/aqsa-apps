import { auth } from "@/auth";
import UserInfo from "./user-info";

export default async function TopBar({
  company,
  titlePage,
}: {
  company: string;
  titlePage?: string;
}) {
  const session = await auth();
  const user = session?.user;
  const listCompanies = session?.user.companies || [];

  return (
    <div className="h-16 w-full bg-base border-b flex justify-between items-center px-4">
      {titlePage && (
        <h1 className="text-color-base font-bold text-base">{titlePage}</h1>
      )}
      <UserInfo data={listCompanies} company={company} user={user!} />
    </div>
  );
}
