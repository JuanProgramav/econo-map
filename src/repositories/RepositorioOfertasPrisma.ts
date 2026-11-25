import { OfertaEmpleo } from "@/domain/entities/OfertaEmpleo";
import { GrupoPoblacional } from "@/domain/value-objects/GrupoPoblacional";
import { prisma } from "@/lib/prisma";
import {
  DatosNuevaOferta,
  RepositorioOfertas,
} from "@/repositories/RepositorioOfertas";

interface FilaOferta {
  id: string;
  titulo: string;
  empresa: string;
  descripcion: string;
  cupos: number;
  grupoPrioritario: string;
  fecha: Date;
}

function aEntidad(fila: FilaOferta): OfertaEmpleo {
  return {
    id: fila.id,
    titulo: fila.titulo,
    empresa: fila.empresa,
    descripcion: fila.descripcion,
    cupos: fila.cupos,
    grupoPrioritario: fila.grupoPrioritario as GrupoPoblacional,
    fecha: fila.fecha,
  };
}

export class RepositorioOfertasPrisma implements RepositorioOfertas {
  async listarActivas(): Promise<OfertaEmpleo[]> {
    const filas = await prisma.ofertaEmpleo.findMany({
      where: { activa: true },
      orderBy: { fecha: "desc" },
    });
    return filas.map(aEntidad);
  }

  async registrar(datos: DatosNuevaOferta): Promise<void> {
    await prisma.ofertaEmpleo.create({ data: datos });
  }

  async cerrar(id: string): Promise<void> {
    await prisma.ofertaEmpleo.update({
      where: { id },
      data: { activa: false },
    });
  }
}