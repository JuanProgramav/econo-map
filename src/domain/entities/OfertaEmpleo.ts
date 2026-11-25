import { GrupoPoblacional } from "@/domain/value-objects/GrupoPoblacional";

export interface OfertaEmpleo {
  id: string;
  titulo: string;
  empresa: string;
  descripcion: string;
  cupos: number;
  grupoPrioritario: GrupoPoblacional;
  fecha: Date;
}