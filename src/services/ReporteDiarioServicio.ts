import { Usuario } from "@/domain/entities/Usuario";
import { RepositorioAlbergues } from "@/repositories/RepositorioAlbergues";
import { RepositorioReportes } from "@/repositories/RepositorioReportes";

export class ReporteDiarioServicio {
  constructor(
    private readonly albergues: RepositorioAlbergues,
    private readonly reportes: RepositorioReportes,
  ) {}

  async reportar(
    usuario: Usuario,
    albergueId: string,
    personas: number,
  ): Promise<void> {
    if (!usuario.puedeReportarOcupacionDe(albergueId)) {
      throw new Error("No tienes permiso para reportar en este albergue.");
    }

    const albergue = await this.albergues.buscarPorId(albergueId);
    if (!albergue) {
      throw new Error("El albergue no existe.");
    }

    albergue.actualizarOcupacion(personas);
    await this.albergues.guardar(albergue);
    await this.reportes.registrar(albergueId, personas);
  }
}