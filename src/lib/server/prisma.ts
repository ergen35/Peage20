import { PrismaClient } from "@prisma/client";

const uuid = crypto.randomUUID();
const prismaClient = new PrismaClient();

console.log("Re-played prisma.ts with " + uuid);

export const prisma = prismaClient || new PrismaClient();