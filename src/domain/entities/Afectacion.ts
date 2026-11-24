import { GrupoPoblacional } from "@/domain/value-objects/GrupoPoblacional";
import { TipoAfectacion } from "@/domain/value-objects/TipoAfectacion";

export type EstadoAfectacion = "pendiente" | "aprobada" | "rechazada";

export interface Afectacion {
  id: string;
  correoCiudadano: string;
  tipo: TipoAfectacion;
  descripcion: string;
  grupo: GrupoPoblacional;
  perdidaEstimada: number;
  estado: EstadoAfectacion;
  estrategia: string | null;
  apoyoAsignado: number | null;
  fecha: Date;
}