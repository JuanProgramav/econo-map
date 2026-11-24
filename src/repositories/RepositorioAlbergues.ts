import { Albergue } from "@/domain/entities/Albergue";

export interface RepositorioAlbergues {
  listar(): Promise<Albergue[]>;
  buscarPorId(id: string): Promise<Albergue | null>;
  guardar(albergue: Albergue): Promise<void>;
}