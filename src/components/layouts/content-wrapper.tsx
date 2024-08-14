import TopBar from "./topbar";

export default function ContentWrapper({
  company,
  titlePage,
  children,
}: {
  company: string;
  titlePage?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full bg-base text-color-base h-screen">
      <TopBar company={company} titlePage={titlePage} />
      <main className="flex overflow-y-auto w-full mb-10">{children}</main>
    </div>
  );
}
