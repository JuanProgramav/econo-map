import { Capacidad } from "@/domain/value-objects/Capacidad";
import { EstadoAlbergue } from "@/domain/value-objects/EstadoAlbergue";

const UMBRAL_ATENCION = 70;
const UMBRAL_CRITICO = 90;
const HORAS_PARA_DESACTUALIZAR = 24;
const MILISEGUNDOS_POR_HORA = 3_600_000;

export interface DatosAlbergue {
  id: string;
  nombre: string;
  direccion: string;
  capacidad: Capacidad;
  ocupadas: number;
  ultimaActualizacion: Date;
}

export class Albergue {
  constructor(private datos: DatosAlbergue) {}

  get id(): string {
    return this.datos.id;
  }

  get nombre(): string {
    return this.datos.nombre;
  }

  get direccion(): string {
    return this.datos.direccion;
  }

  get ocupadas(): number {
    return this.datos.ocupadas;
  }

  get capacidad(): Capacidad {
    return this.datos.capacidad;
  }

  actualizarOcupacion(personas: number, fecha: Date = new Date()): void {
    if (!Number.isInteger(personas) || personas < 0) {
      throw new Error("La cantidad de personas no puede ser negativa.");
    }
    this.datos = {
      ...this.datos,
      ocupadas: personas,
      ultimaActualizacion: fecha,
    };
  }

  porcentajeOcupacion(): number {
    return this.datos.capacidad.porcentajeOcupado(this.datos.ocupadas);
  }

  estado(): EstadoAlbergue {
    const porcentaje = this.porcentajeOcupacion();
    if (porcentaje >= UMBRAL_CRITICO) return "critico";
    if (porcentaje >= UMBRAL_ATENCION) return "atencion";
    return "disponible";
  }

  estaDesactualizado(ahora: Date = new Date()): boolean {
    const horas =
      (ahora.getTime() - this.datos.ultimaActualizacion.getTime()) /
      MILISEGUNDOS_POR_HORA;
    return horas >= HORAS_PARA_DESACTUALIZAR;
  }
}