import { DatosUsuario, Usuario } from "@/domain/entities/Usuario";

export class ResponsableAlbergue extends Usuario {
  constructor(
    datos: DatosUsuario,
    private readonly albergueId: string,
  ) {
    super(datos);
  }

  get rol(): string {
    return "responsable";
  }

  puedeReportarOcupacionDe(albergueId: string): boolean {
    return this.albergueId === albergueId;
  }

  puedeAprobarAlbergues(): boolean {
    return false;
  }
}