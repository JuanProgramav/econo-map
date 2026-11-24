import { Albergue } from "@/domain/entities/Albergue";
import { Capacidad } from "@/domain/value-objects/Capacidad";
import { RepositorioAlbergues } from "@/repositories/RepositorioAlbergues";

function crearAlberguesDeEjemplo(): Albergue[] {
  const ahora = new Date();
  const haceDosDias = new Date(ahora.getTime() - 48 * 3_600_000);

  return [
    new Albergue({
      id: "alb-1",
      nombre: "Coliseo del Pueblo",
      direccion: "Cra. 5 con Calle 5, Cali",
      capacidad: Capacidad.crear(200),
      ocupadas: 120,
      ultimaActualizacion: ahora,
    }),
    new Albergue({
      id: "alb-2",
      nombre: "Colegio Santa Librada",
      direccion: "Calle 8 # 28-30, Cali",
      capacidad: Capacidad.crear(150),
      ocupadas: 140,
      ultimaActualizacion: ahora,
    }),
    new Albergue({
      id: "alb-3",
      nombre: "Polideportivo Aguablanca",
      direccion: "Diagonal 26 # 72-00, Cali",
      capacidad: Capacidad.crear(100),
      ocupadas: 80,
      ultimaActualizacion: haceDosDias,
    }),
  ];
}

export class RepositorioAlberguesEnMemoria implements RepositorioAlbergues {
  private readonly albergues = new Map<string, Albergue>(
    crearAlberguesDeEjemplo().map((a) => [a.id, a]),
  );

  async listar(): Promise<Albergue[]> {
    return Array.from(this.albergues.values());
  }

  async buscarPorId(id: string): Promise<Albergue | null> {
    return this.albergues.get(id) ?? null;
  }

  async guardar(albergue: Albergue): Promise<void> {
    this.albergues.set(albergue.id, albergue);
  }
}