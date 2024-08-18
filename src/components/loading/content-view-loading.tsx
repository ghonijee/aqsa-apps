import { Skeleton } from "@/components/ui/skeleton";

export default function ContentViewLoading() {
  return (
    <div className="flex flex-col w-full max-h-[700px] overflow-clip px-6 py-5 space-y-5">
      <div className="flex">
        <div className="flex space-x-2 w-full">
          <Skeleton className="w-4/12 h-12 bg-slate-500/10 rounded-md" />
          <Skeleton className="w-3/12 h-12 bg-slate-500/10 rounded-md" />
          <Skeleton className="w-1/12 h-12 bg-slate-500/10 rounded-md" />
        </div>
        <Skeleton className="w-2/12 h-12 bg-slate-500/10 rounded-none" />
      </div>
      <div>
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
    </div>
  );
}
