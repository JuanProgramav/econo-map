import { SolicitudAlbergue } from "@/domain/entities/SolicitudAlbergue";

export interface DatosNuevaSolicitud {
  nombre: string;
  direccion: string;
  capacidad: number;
  correo: string;
  contrasenaHash: string;
}

export interface RepositorioSolicitudes {
  registrar(datos: DatosNuevaSolicitud): Promise<void>;
  listarPendientes(): Promise<SolicitudAlbergue[]>;
  aprobar(albergueId: string): Promise<void>;
  rechazar(albergueId: string): Promise<void>;
  estaAprobado(albergueId: string): Promise<boolean>;
}