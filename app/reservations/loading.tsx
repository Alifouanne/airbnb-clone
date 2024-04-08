import SkeletonPage from "../components/SkeletonPage";

const FavoritesLoading = () => {
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="font-semibold text-3xl tracking-tight">
        Your Reservations
      </h2>
      <SkeletonPage />
    </section>
  );
};

export default FavoritesLoading;
