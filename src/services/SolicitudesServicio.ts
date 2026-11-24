import { SolicitudAlbergue } from "@/domain/entities/SolicitudAlbergue";
import { Usuario } from "@/domain/entities/Usuario";
import { Capacidad } from "@/domain/value-objects/Capacidad";
import { Correo } from "@/domain/value-objects/Correo";
import { cifrarContrasenaNueva } from "@/lib/contrasenas";
import { RepositorioSolicitudes } from "@/repositories/RepositorioSolicitudes";
import { RepositorioUsuarios } from "@/repositories/RepositorioUsuarios";

export interface DatosRegistro {
  nombre: string;
  direccion: string;
  capacidad: number;
  correo: string;
  contrasena: string;
}

export class SolicitudesServicio {
  constructor(
    private readonly solicitudes: RepositorioSolicitudes,
    private readonly usuarios: RepositorioUsuarios,
  ) {}

  async registrar(datos: DatosRegistro): Promise<void> {
    const nombre = datos.nombre.trim();
    const direccion = datos.direccion.trim();
    if (nombre === "" || direccion === "") {
      throw new Error("El nombre y la dirección son obligatorios.");
    }

    const capacidad = Capacidad.crear(datos.capacidad);
    const correo = Correo.crear(datos.correo);

    if (await this.usuarios.buscarPorCorreo(correo)) {
      throw new Error("Ya existe una cuenta con ese correo.");
    }

    const contrasenaHash = await cifrarContrasenaNueva(datos.contrasena);
    await this.solicitudes.registrar({
      nombre,
      direccion,
      capacidad: capacidad.total,
      correo: correo.texto,
      contrasenaHash,
    });
  }

  listarPendientes(admin: Usuario): Promise<SolicitudAlbergue[]> {
    this.exigirPermiso(admin);
    return this.solicitudes.listarPendientes();
  }

  async aprobar(admin: Usuario, albergueId: string): Promise<void> {
    this.exigirPermiso(admin);
    await this.solicitudes.aprobar(albergueId);
  }

  async rechazar(admin: Usuario, albergueId: string): Promise<void> {
    this.exigirPermiso(admin);
    await this.solicitudes.rechazar(albergueId);
  }

  private exigirPermiso(usuario: Usuario): void {
    if (!usuario.puedeAprobarAlbergues()) {
      throw new Error("No tienes permiso para gestionar solicitudes.");
    }
  }
}