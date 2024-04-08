import { Suspense } from "react";
import FilterItems from "./components/FilterItems";
import ShowItems from "./components/ShowItems";
import SkeletonPage from "./components/SkeletonPage";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guests?: string;
    rooms?: string;
    bathrooms?: string;
  };
}) {
  return (
    <div className="container mx-auto px-6 lg:px-10">
      <FilterItems />
      <Suspense key={searchParams?.filter} fallback={<SkeletonPage />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
