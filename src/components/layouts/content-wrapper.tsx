import { Suspense } from "react";
import ContentViewLoading from "../loading/content-view-loading";
import TopBar from "./topbar";

export default function ContentWrapper({
  titlePage,
  children,
}: {
  titlePage?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full bg-base text-color-base h-screen">
      <TopBar titlePage={titlePage} />
      <Suspense fallback={<ContentViewLoading />}>
        <main className="flex overflow-y-auto w-full mb-10">{children}</main>
      </Suspense>
    </div>
  );
}
