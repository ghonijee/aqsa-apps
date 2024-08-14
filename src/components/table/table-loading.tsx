import { Skeleton } from "@/components/ui/skeleton";

export default function DataTableLoading() {
  return (
    <div className="flex flex-col w-full max-h-[500px] overflow-clip">
      <div>
        <Skeleton className="w-full h-12 bg-slate-500/10 rounded-none" />
      </div>
      <div className="px-5 flex flex-col gap-y-4 my-3 overflow-clip">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="flex gap-x-5" key={index}>
            <Skeleton className="w-1/12 min-h-8 bg-slate-100 rounded-lg" />
            <Skeleton className="w-full min-h-8 bg-slate-100 rounded-lg" />
            <Skeleton className="w-full min-h-8 bg-slate-100 rounded-lg" />
            <Skeleton className="w-3/12 min-h-8 bg-slate-100 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
