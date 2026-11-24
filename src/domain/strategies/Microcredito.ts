import { Estrategia } from "@/domain/strategies/Estrategia";

const PORCENTAJE_MICROCREDITO = 0.6;

export class Microcredito extends Estrategia {
  get clave(): string {
    return "microcredito";
  }

  get nombre(): string {
    return "Microcrédito";
  }

  calcularApoyo(perdida: number): number {
    return Math.round(perdida * PORCENTAJE_MICROCREDITO);
  }
}