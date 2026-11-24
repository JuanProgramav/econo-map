import { Albergue } from "@/domain/entities/Albergue";
import { RepositorioAlbergues } from "@/repositories/RepositorioAlbergues";

export class AlberguesServicio {
  constructor(private readonly repositorio: RepositorioAlbergues) {}

  obtenerTodos(): Promise<Albergue[]> {
    return this.repositorio.listar();
  }
}