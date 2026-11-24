import { Correo } from "@/domain/value-objects/Correo";
import { cifrarContrasenaNueva } from "@/lib/contrasenas";
import { RepositorioUsuarios } from "@/repositories/RepositorioUsuarios";

export class CiudadanosServicio {
  constructor(private readonly usuarios: RepositorioUsuarios) {}

  async registrar(textoCorreo: string, contrasena: string): Promise<void> {
    const correo = Correo.crear(textoCorreo);

    if (await this.usuarios.buscarPorCorreo(correo)) {
      throw new Error("Ya existe una cuenta con ese correo.");
    }

    const contrasenaHash = await cifrarContrasenaNueva(contrasena);
    await this.usuarios.registrarCiudadano(correo, contrasenaHash);
  }
}