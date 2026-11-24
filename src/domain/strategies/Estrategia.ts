export abstract class Estrategia {
  abstract get clave(): string;

  abstract get nombre(): string;

  abstract calcularApoyo(perdida: number): number;
}