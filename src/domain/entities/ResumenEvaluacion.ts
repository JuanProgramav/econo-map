export interface LineaResumen {
  etiqueta: string;
  casos: number;
  perdida: number;
  apoyo: number;
  porcentajeCubierto: number;
}

export interface ResumenEvaluacion {
  totalCasos: number;
  pendientes: number;
  aprobadas: number;
  rechazadas: number;
  perdidaAprobada: number;
  apoyoTotal: number;
  porcentajeCubierto: number;
  porGrupo: LineaResumen[];
  porEstrategia: LineaResumen[];
}