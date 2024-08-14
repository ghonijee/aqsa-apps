import Sidebar from "@/components/layouts/sidebar";
import TopBar from "@/components/layouts/topbar";
import { headers } from "next/headers";

export const metadata = {
  title: {
    template: " %s | AQSA APPS",
    default: "AQSA APPS",
    absolute: "AQSA APPS",
  },
};

export default function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { company: string };
}) {
  return (
    <>
      <div className="flex h-screen max-h-screen min-h-screen">
        <Sidebar company={params.company} />

        {/* Content */}
        <div className="w-full bg-base text-color-base">{children}</div>
      </div>
    </>
  );
}
