import { Estrategia } from "@/domain/strategies/Estrategia";

const PORCENTAJE_SUBSIDIO = 0.3;

export class Subsidio extends Estrategia {
  get clave(): string {
    return "subsidio";
  }

  get nombre(): string {
    return "Subsidio";
  }

  calcularApoyo(perdida: number): number {
    return Math.round(perdida * PORCENTAJE_SUBSIDIO);
  }
}