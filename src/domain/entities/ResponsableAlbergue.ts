import { DatosUsuario, Usuario } from "@/domain/entities/Usuario";

export class ResponsableAlbergue extends Usuario {
  constructor(
    datos: DatosUsuario,
    private readonly albergueIdAsignado: string,
  ) {
    super(datos);
  }

  get rol(): string {
    return "responsable";
  }

  get albergueId(): string | null {
    return this.albergueIdAsignado;
  }

  puedeReportarOcupacionDe(albergueId: string): boolean {
    return this.albergueIdAsignado === albergueId;
  }

  puedeAprobarAlbergues(): boolean {
    return false;
  }
}