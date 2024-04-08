import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import ListingCards from "./ListingCards";
import NoItems from "./NoItems";
import { unstable_noStore as noStore } from "next/cache";
const getData = async ({
  searchParams,
  userId,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guests?: string;
    rooms?: string;
    bathrooms?: string;
  };
  userId: string | undefined;
}) => {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guests ?? undefined,
      bathrooms: searchParams?.bathrooms ?? undefined,
      bedrooms: searchParams?.rooms ?? undefined,
    },
    select: {
      title: true,
      description: true,
      country: true,
      photo: true,
      price: true,
      id: true,
      favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });
  return data;
};
const ShowItems = async ({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
  };
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams: searchParams, userId: user?.id });

  return (
    <>
      {data.length === 0 ? (
        <NoItems
          title="Sorry no listing found for this category found..."
          description="Please check other category or create your own listing!"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCards
              key={item.id}
              description={item.description as string}
              image={item.photo as string}
              location={item.country as string}
              price={item.price as number}
              title={item.title as string}
              userId={user?.id as string}
              favoriteId={item.favorite[0]?.id}
              isInFavoriteList={item.favorite.length > 0 ? true : false}
              homeId={item.id}
              pathName="/"
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ShowItems;
