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
    <div className="w-full bg-base text-color-base">
      <TopBar company={company} titlePage={titlePage} />
      {children}
    </div>
  );
}
