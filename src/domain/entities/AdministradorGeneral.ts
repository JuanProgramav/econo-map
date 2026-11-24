import { Usuario } from "@/domain/entities/Usuario";

export class AdministradorGeneral extends Usuario {
  get rol(): string {
    return "administrador";
  }

  puedeReportarOcupacionDe(): boolean {
    return false;
  }

  puedeAprobarAlbergues(): boolean {
    return true;
  }
}