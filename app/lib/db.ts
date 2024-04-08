import { PrismaClient } from "@prisma/client";

/**
 * Returns a singleton instance of the PrismaClient.
 *
 * @returns {PrismaClient} - The singleton instance of the PrismaClient.
 */
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
