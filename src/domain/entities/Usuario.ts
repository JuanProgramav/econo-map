import { Correo } from "@/domain/value-objects/Correo";

export interface DatosUsuario {
  id: string;
  correo: Correo;
  contrasenaHash: string;
}

export abstract class Usuario {
  constructor(protected readonly datos: DatosUsuario) {}

  get id(): string {
    return this.datos.id;
  }

  get correo(): Correo {
    return this.datos.correo;
  }

  get contrasenaHash(): string {
    return this.datos.contrasenaHash;
  }

  abstract get rol(): string;

  abstract get albergueId(): string | null;

  abstract puedeReportarOcupacionDe(albergueId: string): boolean;

  abstract puedeAprobarAlbergues(): boolean;

  puedeRegistrarAfectaciones(): boolean {
    return false;
  }

  puedeGestionarAfectaciones(): boolean {
    return false;
  }

  puedeGestionarEmpleo(): boolean {
    return false;
  }
}