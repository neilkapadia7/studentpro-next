import { PrismaClient } from "@prisma/client";


declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NEXT_APP_ENVIRONMENT !== "production") globalThis.prisma = db;
