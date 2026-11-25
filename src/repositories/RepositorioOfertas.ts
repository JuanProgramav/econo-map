import { OfertaEmpleo } from "@/domain/entities/OfertaEmpleo";
import { GrupoPoblacional } from "@/domain/value-objects/GrupoPoblacional";

export interface DatosNuevaOferta {
  titulo: string;
  empresa: string;
  descripcion: string;
  cupos: number;
  grupoPrioritario: GrupoPoblacional;
}

export interface RepositorioOfertas {
  listarActivas(): Promise<OfertaEmpleo[]>;
  registrar(datos: DatosNuevaOferta): Promise<void>;
  cerrar(id: string): Promise<void>;
}