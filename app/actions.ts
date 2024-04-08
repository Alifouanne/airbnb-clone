"use server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";

/**
 * Creates an Airbnb home for the specified user.
 *
 * @param {Object} params - The parameters for creating the Airbnb home.
 * @param {string} params.userId - The ID of the user.
 * @returns {Promise<string>} A promise that resolves to a redirect URL.
 */
export const createAirbnbHome = async ({ userId }: { userId: string }) => {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });
    return redirect(`/create/${data.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/address`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLocation
  ) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });
    return redirect(`/create/${data.id}/structure`);
  }
};

/**
 * Creates a new category and updates the specified home with the category name and addedCategory flag.
 *
 * @param formData - The form data containing the category name and home ID.
 * @returns A redirect URL to the description page of the specified home.
 */
export const createCategory = async (formData: FormData) => {
  const categoryName = formData.get("categoryName") as string;
  const homeId = formData.get("homeId") as string;
  await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: categoryName,
      addedCategory: true,
    },
  });
  return redirect(`/create/${homeId}/description`);
};

/**
 * Creates a description for a home and updates the corresponding data in the database.
 *
 * @param formData - The form data containing the information for the home description.
 * @returns A promise that resolves to the URL of the next page to redirect to.
 */
export async function CreateDescription(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const imageFile = formData.get("image") as File;
  const homeId = formData.get("homeId") as string;

  const guestNumber = formData.get("guests") as string;
  const roomNumber = formData.get("rooms") as string;
  const bathroomsNumber = formData.get("bathrooms") as string;

  const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

  await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: Number(price),
      bedrooms: roomNumber,
      bathrooms: bathroomsNumber,
      guests: guestNumber,
      photo: imageData?.path,
      addedDescription: true,
    },
  });

  return redirect(`/create/${homeId}/address`);
}

/**
 * Creates a new location for a home.
 *
 * @param formData - The form data containing the home ID and country.
 * @returns A Promise that resolves to a redirect to the home page.
 */
export const createLocation = async (formData: FormData) => {
  const homeId = formData.get("homeId") as string;
  const countryValue = formData.get("country") as string;
  await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      addedLocation: true,
      country: countryValue,
    },
  });
  return redirect("/");
};

/**
 * Adds a home to the user's favorites.
 *
 * @param formData - The form data containing the home ID, user ID, and path name.
 * @returns Promise<void>
 */
export const addToFavorite = async (formData: FormData) => {
  const homeId = formData.get("homeId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favorite.create({
    data: {
      homeId: homeId,
      userId: userId,
    },
  });
  revalidatePath(pathName);
};

/**
 * Deletes a favorite item from the database and triggers a revalidation of the specified path.
 *
 * @param formData - The form data containing the favorite ID, user ID, and path name.
 * @returns A promise that resolves when the favorite item is successfully deleted.
 */
export const deleteFromFavorite = async (formData: FormData) => {
  const favoriteId = formData.get("favoriteId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: userId,
    },
  });
  revalidatePath(pathName);
};

/**
 * Creates a reservation with the provided form data.
 *
 * @param formData - The form data containing the user ID, home ID, start date, and end date.
 * @returns A redirect to the home page.
 */
export const createReservation = async (formData: FormData) => {
  const userId = formData.get("userId") as string;
  const homeId = formData.get("homeId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const data = await prisma.reservation.create({
    data: {
      userId: userId,
      homeId: homeId,
      startDate: startDate,
      endDate: endDate,
    },
  });
  return redirect("/");
};
