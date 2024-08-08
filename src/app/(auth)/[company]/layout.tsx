import Sidebar from "@/components/layouts/sidebar";

export default function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { company: string };
}) {
  return (
    <>
      <div className="flex min-h-screen max-h-screen">
        <Sidebar company={params.company} />

        {/* Content */}
        <div className="w-full bg-base">{children}</div>
      </div>
    </>
  );
}
