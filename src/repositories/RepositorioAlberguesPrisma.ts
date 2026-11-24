import { Albergue } from "@/domain/entities/Albergue";
import { Capacidad } from "@/domain/value-objects/Capacidad";
import { prisma } from "@/lib/prisma";
import { RepositorioAlbergues } from "@/repositories/RepositorioAlbergues";

interface FilaAlbergue {
  id: string;
  nombre: string;
  direccion: string;
  capacidad: number;
  ocupadas: number;
  ultimaActualizacion: Date;
}

function aEntidad(fila: FilaAlbergue): Albergue {
  return new Albergue({
    id: fila.id,
    nombre: fila.nombre,
    direccion: fila.direccion,
    capacidad: Capacidad.crear(fila.capacidad),
    ocupadas: fila.ocupadas,
    ultimaActualizacion: fila.ultimaActualizacion,
  });
}

export class RepositorioAlberguesPrisma implements RepositorioAlbergues {
  async listar(): Promise<Albergue[]> {
    const filas = await prisma.albergue.findMany({
      where: { aprobado: true },
      orderBy: { nombre: "asc" },
    });
    return filas.map(aEntidad);
  }

  async buscarPorId(id: string): Promise<Albergue | null> {
    const fila = await prisma.albergue.findUnique({ where: { id } });
    return fila ? aEntidad(fila) : null;
  }

  async guardar(albergue: Albergue): Promise<void> {
    await prisma.albergue.update({
      where: { id: albergue.id },
      data: {
        ocupadas: albergue.ocupadas,
        ultimaActualizacion: new Date(),
      },
    });
  }
}