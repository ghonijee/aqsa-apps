import Sidebar from "@/components/layouts/sidebar";
import TopBar from "@/components/layouts/topbar";

export default function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { company: string };
}) {
  return (
    <>
      <div className="flex flex-col h-screen max-h-screen">
        <div className="flex h-full">
          <Sidebar company={params.company} />

          {/* Content */}
          <div className="w-full bg-base">
            <TopBar company={params.company} />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
