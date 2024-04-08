import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import NoItems from "../components/NoItems";
import ListingCards from "../components/ListingCards";
import { unstable_noStore as noStore } from "next/cache";

const getData = async (userId: string) => {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      userId: userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      country: true,
      photo: true,
      description: true,
      price: true,
      title: true,
      favorite: {
        where: { userId: userId },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};
const HomesPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(user?.id);
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>
      {data.length === 0 ? (
        <NoItems
          title="You dont have any homes listed"
          description="Please list a home on Airbnb so that you can see it right here"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-8">
          {data.map((item) => (
            <ListingCards
              key={item.id}
              description={item.description as string}
              image={item.photo as string}
              location={item.country as string}
              price={item.price as number}
              title={item.title as string}
              homeId={item.id}
              userId={user.id}
              pathName="/my-homes"
              favoriteId={item?.favorite[0]?.id}
              isInFavoriteList={item.favorite.length > 0 ? true : false}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HomesPage;
