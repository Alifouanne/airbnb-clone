import { createReservation } from "@/app/actions";
import CalenderHome from "@/app/components/Calender";
import CategoryMap from "@/app/components/CategoryMap";
import CategoryShowcase from "@/app/components/CategoryShowcase";
import { ReservationSubmit } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

const getData = async (homeId: string) => {
  noStore();
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      guests: true,
      description: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      createdAt: true,
      user: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
      reservation: {
        where: {
          homeId: homeId,
        },
      },
    },
  });
  return data;
};

const HomePage = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          src={`https://gzlrmpyzprvpprhztioi.supabase.co/storage/v1/object/public/images/${data?.photo} `}
          fill
          className="rounded-lg h-full w-full object-cover"
          alt="home image"
        />
      </div>
      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label}/{country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests</p>*<p>{data?.bedrooms} Bedrooms</p>*
            <p>{data?.bathrooms} Bathrooms</p>
          </div>
          <div className="flex items-center mt-6 ">
            <Avatar className="size-11">
              <AvatarImage
                src={
                  data?.user?.profileImage ??
                  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="default user image"
              />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {data?.user?.firstName}</h3>
              <p className="text-sm text-muted-foreground">Host since 2024</p>
            </div>
          </div>
          <Separator className="my-7" />
          <CategoryShowcase categoryName={data?.categoryName as string} />
          <Separator className="my-7" />
          <p className="text-muted-foreground">{data?.description}</p>
          <Separator className="my-7" />
          <CategoryMap location={country?.value as string} />
        </div>
        <form action={createReservation}>
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={user?.id} />
          <CalenderHome reservation={data?.reservation} />
          {user?.id ? (
            <ReservationSubmit />
          ) : (
            <Button asChild className="w-full">
              <Link href="/api/auth/lohin">Make a Reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default HomePage;
