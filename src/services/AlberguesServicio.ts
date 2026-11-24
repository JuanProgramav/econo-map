import { Albergue } from "@/domain/entities/Albergue";
import { RepositorioAlbergues } from "@/repositories/RepositorioAlbergues";

export class AlberguesServicio {
  constructor(private readonly repositorio: RepositorioAlbergues) {}

  obtenerTodos(): Promise<Albergue[]> {
    return this.repositorio.listar();
  }

  async reportarOcupacion(id: string, personas: number): Promise<void> {
    const albergue = await this.repositorio.buscarPorId(id);
    if (!albergue) {
      throw new Error("El albergue no existe.");
    }
    albergue.actualizarOcupacion(personas);
    await this.repositorio.guardar(albergue);
  }
}