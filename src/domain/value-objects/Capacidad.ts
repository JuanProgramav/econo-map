export class Capacidad {
  private constructor(private readonly valor: number) {}

  static crear(valor: number): Capacidad {
    if (!Number.isInteger(valor) || valor <= 0) {
      throw new Error("La capacidad debe ser un número entero mayor que cero.");
    }
    return new Capacidad(valor);
  }

  get total(): number {
    return this.valor;
  }

  porcentajeOcupado(ocupadas: number): number {
    return Math.round((ocupadas / this.valor) * 100);
  }

  estaLlena(ocupadas: number): boolean {
    return ocupadas >= this.valor;
  }
}