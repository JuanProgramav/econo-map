import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalParaPrisma = globalThis as unknown as { prisma?: PrismaClient };

function crearCliente(): PrismaClient {
  const direccion = process.env.DATABASE_URL;
  if (!direccion) {
    throw new Error("Falta DATABASE_URL en el archivo .env.");
  }
  const adaptador = new PrismaPg({ connectionString: direccion });
  return new PrismaClient({ adapter: adaptador });
}

export const prisma = globalParaPrisma.prisma ?? crearCliente();

if (process.env.NODE_ENV !== "production") {
  globalParaPrisma.prisma = prisma;
}