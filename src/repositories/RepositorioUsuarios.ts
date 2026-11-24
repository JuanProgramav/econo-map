import { Usuario } from "@/domain/entities/Usuario";
import { Correo } from "@/domain/value-objects/Correo";

export interface RepositorioUsuarios {
  buscarPorCorreo(correo: Correo): Promise<Usuario | null>;
  buscarPorId(id: string): Promise<Usuario | null>;
}