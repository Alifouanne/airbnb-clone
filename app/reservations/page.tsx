import React from "react";
import NoItems from "../components/NoItems";
import ListingCards from "../components/ListingCards";
import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const getData = async (userId: string) => {
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          id: true,
          country: true,
          photo: true,
          description: true,
          title: true,
          price: true,
          favorite: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });
  return data;
};
const ReservationPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id) return redirect("/");
  const data = await getData(user.id);
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="font-semibold text-3xl tracking-tight">
        Your Reservations
      </h2>
      {data.length === 0 ? (
        <NoItems
          title="Hey you dont have any reservations"
          description="Please add reservations to see them right here"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <ListingCards
              key={item.Home?.id}
              description={item.Home?.description as string}
              location={item.Home?.country as string}
              pathName="/favorites"
              homeId={item.Home?.id as string}
              image={item.Home?.photo as string}
              price={item.Home?.price as number}
              userId={user.id}
              favoriteId={item.Home?.favorite[0]?.id as string}
              isInFavoriteList={
                (item.Home?.favorite.length as number) > 0 ? true : false
              }
              title={item.Home?.title as string}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ReservationPage;
