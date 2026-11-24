import { Usuario } from "@/domain/entities/Usuario";

export class Ciudadano extends Usuario {
  get rol(): string {
    return "ciudadano";
  }

  get albergueId(): string | null {
    return null;
  }

  puedeReportarOcupacionDe(): boolean {
    return false;
  }

  puedeAprobarAlbergues(): boolean {
    return false;
  }

  puedeRegistrarAfectaciones(): boolean {
    return true;
  }
}