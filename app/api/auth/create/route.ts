import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

/**
 * GET function
 *
 * This function handles the GET request and performs the following steps:
 * 1. Retrieves the user from the Kinde server session.
 * 2. Checks if the user exists and has an ID.
 * 3. Retrieves the user from the database using the user ID.
 * 4. If the user does not exist in the database, creates a new user entry.
 * 5. Redirects the user to http://localhost:3000.
 *
 * @throws Error if something goes wrong during the process.
 *
 * @returns NextResponse object with a redirect to http://localhost:3000.
 */
export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user === null || !user.id) {
    throw new Error("something went wrong, SORRY!....");
  }
  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: user.email ?? "",
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        id: user.id,
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user?.given_name}`,
      },
    });
  }
  return NextResponse.redirect("http://localhost:3000");
}
