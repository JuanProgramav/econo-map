import { SolicitudAlbergue } from "@/domain/entities/SolicitudAlbergue";
import { prisma } from "@/lib/prisma";
import {
  DatosNuevaSolicitud,
  RepositorioSolicitudes,
} from "@/repositories/RepositorioSolicitudes";

export class RepositorioSolicitudesPrisma implements RepositorioSolicitudes {
  async registrar(datos: DatosNuevaSolicitud): Promise<void> {
    await prisma.albergue.create({
      data: {
        nombre: datos.nombre,
        direccion: datos.direccion,
        capacidad: datos.capacidad,
        aprobado: false,
        usuarios: {
          create: {
            correo: datos.correo,
            contrasenaHash: datos.contrasenaHash,
            rol: "responsable",
          },
        },
      },
    });
  }

  async listarPendientes(): Promise<SolicitudAlbergue[]> {
    const filas = await prisma.albergue.findMany({
      where: { aprobado: false },
      include: { usuarios: true },
      orderBy: { nombre: "asc" },
    });

    return filas.map((fila) => ({
      id: fila.id,
      nombre: fila.nombre,
      direccion: fila.direccion,
      capacidad: fila.capacidad,
      correoResponsable: fila.usuarios[0]?.correo ?? "Sin correo",
    }));
  }

  async aprobar(albergueId: string): Promise<void> {
    await prisma.albergue.update({
      where: { id: albergueId },
      data: { aprobado: true, ultimaActualizacion: new Date() },
    });
  }

  async rechazar(albergueId: string): Promise<void> {
    await prisma.$transaction([
      prisma.usuario.deleteMany({ where: { albergueId } }),
      prisma.albergue.delete({ where: { id: albergueId } }),
    ]);
  }

  async estaAprobado(albergueId: string): Promise<boolean> {
    const fila = await prisma.albergue.findUnique({
      where: { id: albergueId },
      select: { aprobado: true },
    });
    return fila?.aprobado ?? false;
  }
}