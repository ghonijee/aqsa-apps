import Sidebar from "@/components/layouts/sidebar";

export const metadata = {
  title: {
    template: " %s | AQSA APPS",
    default: "AQSA APPS",
    absolute: "AQSA APPS",
  },
};

export default function AppLayout({
  children,
}: // params,
{
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen max-h-screen min-h-screen">
        <Sidebar />

        {/* Content */}

        <div className="w-full bg-base text-color-base">{children}</div>
      </div>
    </>
  );
}
