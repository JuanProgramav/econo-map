import { Afectacion, EstadoAfectacion } from "@/domain/entities/Afectacion";
import { GrupoPoblacional } from "@/domain/value-objects/GrupoPoblacional";
import { TipoAfectacion } from "@/domain/value-objects/TipoAfectacion";

export interface DatosNuevaAfectacion {
  usuarioId: string;
  tipo: TipoAfectacion;
  descripcion: string;
  grupo: GrupoPoblacional;
  perdidaEstimada: number;
}

export interface ResolucionAfectacion {
  estado: EstadoAfectacion;
  estrategia: string | null;
  apoyoAsignado: number | null;
}

export interface RepositorioAfectaciones {
  registrar(datos: DatosNuevaAfectacion): Promise<void>;
  listarDeUsuario(usuarioId: string): Promise<Afectacion[]>;
  listarPendientes(): Promise<Afectacion[]>;
  listarTodas(): Promise<Afectacion[]>;
  buscarPorId(id: string): Promise<Afectacion | null>;
  resolver(id: string, resolucion: ResolucionAfectacion): Promise<void>;
}