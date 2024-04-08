import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const CategoryMap = ({ location }: { location: string }) => {
  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[50vh]" />,
  });
  return <LazyMap location={location} />;
};

export default CategoryMap;
