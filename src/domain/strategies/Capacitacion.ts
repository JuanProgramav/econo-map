import { Estrategia } from "@/domain/strategies/Estrategia";

const MONTO_CAPACITACION = 500_000;

export class Capacitacion extends Estrategia {
  get clave(): string {
    return "capacitacion";
  }

  get nombre(): string {
    return "Capacitación";
  }

  calcularApoyo(perdida: number): number {
    return Math.min(perdida, MONTO_CAPACITACION);
  }
}