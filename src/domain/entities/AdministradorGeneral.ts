import { Usuario } from "@/domain/entities/Usuario";

export class AdministradorGeneral extends Usuario {
  get rol(): string {
    return "administrador";
  }

  get albergueId(): string | null {
    return null;
  }

  puedeReportarOcupacionDe(): boolean {
    return false;
  }

  puedeAprobarAlbergues(): boolean {
    return true;
  }

  puedeGestionarAfectaciones(): boolean {
    return true;
  }

  puedeGestionarEmpleo(): boolean {
    return true;
  }
}