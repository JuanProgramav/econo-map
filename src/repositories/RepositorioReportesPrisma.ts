import { prisma } from "@/lib/prisma";
import { RepositorioReportes } from "@/repositories/RepositorioReportes";

export class RepositorioReportesPrisma implements RepositorioReportes {
  async registrar(albergueId: string, personas: number): Promise<void> {
    await prisma.reporteDiario.create({
      data: { albergueId, personas },
    });
  }
}