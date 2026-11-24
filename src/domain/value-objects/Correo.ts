const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class Correo {
  private constructor(private readonly valor: string) {}

  static crear(texto: string): Correo {
    const limpio = texto.trim().toLowerCase();
    if (!PATRON_CORREO.test(limpio)) {
      throw new Error("El correo no tiene un formato válido.");
    }
    return new Correo(limpio);
  }

  get texto(): string {
    return this.valor;
  }
}