import { Skeleton } from "@/components/ui/skeleton";

const SkeletonPage = () => {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-72 w-full rounded-lg" />
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-72 w-full rounded-lg" />
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-72 w-full rounded-lg" />
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-72 w-full rounded-lg" />
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-72 w-full rounded-lg" />
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-72 w-full rounded-lg" />
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonPage;
