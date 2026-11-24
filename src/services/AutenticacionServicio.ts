import bcrypt from "bcryptjs";
import { Usuario } from "@/domain/entities/Usuario";
import { Correo } from "@/domain/value-objects/Correo";
import { RepositorioUsuarios } from "@/repositories/RepositorioUsuarios";

export class AutenticacionServicio {
  constructor(private readonly repositorio: RepositorioUsuarios) {}

  async iniciarSesion(
    textoCorreo: string,
    contrasena: string,
  ): Promise<Usuario | null> {
    let correo: Correo;
    try {
      correo = Correo.crear(textoCorreo);
    } catch {
      return null;
    }

    const usuario = await this.repositorio.buscarPorCorreo(correo);
    if (!usuario) return null;

    const coincide = await bcrypt.compare(contrasena, usuario.contrasenaHash);
    return coincide ? usuario : null;
  }
}