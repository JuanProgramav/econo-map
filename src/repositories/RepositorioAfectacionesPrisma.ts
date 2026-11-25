import { Afectacion, EstadoAfectacion } from "@/domain/entities/Afectacion";
import { GrupoPoblacional } from "@/domain/value-objects/GrupoPoblacional";
import { TipoAfectacion } from "@/domain/value-objects/TipoAfectacion";
import { prisma } from "@/lib/prisma";
import {
  DatosNuevaAfectacion,
  RepositorioAfectaciones,
  ResolucionAfectacion,
} from "@/repositories/RepositorioAfectaciones";

interface FilaAfectacion {
  id: string;
  tipo: string;
  descripcion: string;
  grupo: string;
  perdidaEstimada: number;
  estado: string;
  estrategia: string | null;
  apoyoAsignado: number | null;
  fecha: Date;
  usuario: { correo: string };
}

const INCLUIR_USUARIO = { usuario: { select: { correo: true } } } as const;

function aEntidad(fila: FilaAfectacion): Afectacion {
  return {
    id: fila.id,
    correoCiudadano: fila.usuario.correo,
    tipo: fila.tipo as TipoAfectacion,
    descripcion: fila.descripcion,
    grupo: fila.grupo as GrupoPoblacional,
    perdidaEstimada: fila.perdidaEstimada,
    estado: fila.estado as EstadoAfectacion,
    estrategia: fila.estrategia,
    apoyoAsignado: fila.apoyoAsignado,
    fecha: fila.fecha,
  };
}

export class RepositorioAfectacionesPrisma implements RepositorioAfectaciones {
  async registrar(datos: DatosNuevaAfectacion): Promise<void> {
    await prisma.afectacion.create({ data: datos });
  }

  async listarDeUsuario(usuarioId: string): Promise<Afectacion[]> {
    const filas = await prisma.afectacion.findMany({
      where: { usuarioId },
      include: INCLUIR_USUARIO,
      orderBy: { fecha: "desc" },
    });
    return filas.map(aEntidad);
  }

  async listarPendientes(): Promise<Afectacion[]> {
    const filas = await prisma.afectacion.findMany({
      where: { estado: "pendiente" },
      include: INCLUIR_USUARIO,
      orderBy: { fecha: "asc" },
    });
    return filas.map(aEntidad);
  }

  async listarTodas(): Promise<Afectacion[]> {
    const filas = await prisma.afectacion.findMany({
      include: INCLUIR_USUARIO,
      orderBy: { fecha: "desc" },
    });
    return filas.map(aEntidad);
  }

  async buscarPorId(id: string): Promise<Afectacion | null> {
    const fila = await prisma.afectacion.findUnique({
      where: { id },
      include: INCLUIR_USUARIO,
    });
    return fila ? aEntidad(fila) : null;
  }

  async resolver(id: string, resolucion: ResolucionAfectacion): Promise<void> {
    await prisma.afectacion.update({ where: { id }, data: resolucion });
  }
}