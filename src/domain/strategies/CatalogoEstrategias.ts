import { Capacitacion } from "@/domain/strategies/Capacitacion";
import { Estrategia } from "@/domain/strategies/Estrategia";
import { Microcredito } from "@/domain/strategies/Microcredito";
import { Subsidio } from "@/domain/strategies/Subsidio";

const ESTRATEGIAS: Estrategia[] = [
  new Subsidio(),
  new Microcredito(),
  new Capacitacion(),
];

export function listarEstrategias(): Estrategia[] {
  return ESTRATEGIAS;
}

export function obtenerEstrategia(clave: string): Estrategia {
  const estrategia = ESTRATEGIAS.find((e) => e.clave === clave);
  if (!estrategia) {
    throw new Error("La estrategia seleccionada no existe.");
  }
  return estrategia;
}