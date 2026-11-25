import { Afectacion, EstadoAfectacion } from "@/domain/entities/Afectacion";
import {
  LineaResumen,
  ResumenEvaluacion,
} from "@/domain/entities/ResumenEvaluacion";
import { obtenerEstrategia } from "@/domain/strategies/CatalogoEstrategias";
import { ETIQUETA_GRUPO } from "@/domain/value-objects/GrupoPoblacional";

const PORCENTAJE_TOTAL = 100;

function sumar(valores: number[]): number {
  return valores.reduce((acumulado, valor) => acumulado + valor, 0);
}

function porcentaje(parte: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((parte / total) * PORCENTAJE_TOTAL);
}

function contar(afectaciones: Afectacion[], estado: EstadoAfectacion): number {
  return afectaciones.filter((a) => a.estado === estado).length;
}

function construirLinea(etiqueta: string, casos: Afectacion[]): LineaResumen {
  const perdida = sumar(casos.map((c) => c.perdidaEstimada));
  const apoyo = sumar(casos.map((c) => c.apoyoAsignado ?? 0));
  return {
    etiqueta,
    casos: casos.length,
    perdida,
    apoyo,
    porcentajeCubierto: porcentaje(apoyo, perdida),
  };
}

function agrupar(
  afectaciones: Afectacion[],
  etiquetaDe: (afectacion: Afectacion) => string,
): LineaResumen[] {
  const grupos = new Map<string, Afectacion[]>();
  for (const afectacion of afectaciones) {
    const etiqueta = etiquetaDe(afectacion);
    grupos.set(etiqueta, [...(grupos.get(etiqueta) ?? []), afectacion]);
  }
  return Array.from(grupos, ([etiqueta, casos]) =>
    construirLinea(etiqueta, casos),
  );
}

function nombreDeEstrategia(afectacion: Afectacion): string {
  return afectacion.estrategia
    ? obtenerEstrategia(afectacion.estrategia).nombre
    : "Sin estrategia";
}

export class EvaluacionServicio {
  resumir(afectaciones: Afectacion[]): ResumenEvaluacion {
    const aprobadas = afectaciones.filter((a) => a.estado === "aprobada");
    const total = construirLinea("Total", aprobadas);

    return {
      totalCasos: afectaciones.length,
      pendientes: contar(afectaciones, "pendiente"),
      aprobadas: aprobadas.length,
      rechazadas: contar(afectaciones, "rechazada"),
      perdidaAprobada: total.perdida,
      apoyoTotal: total.apoyo,
      porcentajeCubierto: total.porcentajeCubierto,
      porGrupo: agrupar(aprobadas, (a) => ETIQUETA_GRUPO[a.grupo]),
      porEstrategia: agrupar(aprobadas, nombreDeEstrategia),
    };
  }
}