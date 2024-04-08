import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCountries } from "../lib/getCountries";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddToFavoriteButton, DeleteFromFavorite } from "./SubmitButtons";
import { addToFavorite, deleteFromFavorite } from "../actions";
interface ListProps {
  image: string;
  description: string;
  location: string;
  price: number;
  title: string;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  pathName: string;
}
const ListingCards = ({
  description,
  image,
  location,
  price,
  title,
  userId,
  favoriteId,
  homeId,
  isInFavoriteList,
  pathName,
}: ListProps) => {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-semibold text-lg line-clamp-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-72">
          <Image
            src={`https://gzlrmpyzprvpprhztioi.supabase.co/storage/v1/object/public/images/${image}`}
            alt="Image of House"
            className="rounded-lg h-full object-cover "
            fill
          />
          {userId && (
            <div className="z-10 absolute top-2 right-2">
              {isInFavoriteList ? (
                <form action={deleteFromFavorite}>
                  <input type="hidden" name="favoriteId" value={favoriteId} />
                  <input type="hidden" name="userId" value={userId} />
                  <input type="hidden" name="pathName" value={pathName} />
                  <DeleteFromFavorite />
                </form>
              ) : (
                <form action={addToFavorite}>
                  <input type="hidden" name="homeId" value={homeId} />
                  <input type="hidden" name="userId" value={userId} />
                  <input type="hidden" name="pathName" value={pathName} />
                  <AddToFavoriteButton />
                </form>
              )}
            </div>
          )}
        </div>
        <Link href={`/home/${homeId}`} className="mt-2">
          <h3 className="font-medium text-base">
            {country?.flag}
            {country?.label}/{country?.region}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
        </Link>
      </CardContent>
      <CardFooter>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> Night
        </p>
      </CardFooter>
    </Card>
  );
};

export default ListingCards;
