import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";

const URL_BASE_DE_DATOS = process.env.DATABASE_URL ?? "file:./dev.db";

const globalParaPrisma = globalThis as unknown as { prisma?: PrismaClient };

function crearCliente(): PrismaClient {
  const adaptador = new PrismaBetterSqlite3({ url: URL_BASE_DE_DATOS });
  return new PrismaClient({ adapter: adaptador });
}

export const prisma = globalParaPrisma.prisma ?? crearCliente();

if (process.env.NODE_ENV !== "production") {
  globalParaPrisma.prisma = prisma;
}