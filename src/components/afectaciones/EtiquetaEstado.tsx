import { EstadoAfectacion } from "@/domain/entities/Afectacion";

const ESTILO_POR_ESTADO: Record<
  EstadoAfectacion,
  { texto: string; clase: string }
> = {
  pendiente: { texto: "En revisión", clase: "border-warning text-warning" },
  aprobada: { texto: "Aprobada", clase: "border-available text-available" },
  rechazada: { texto: "Rechazada", clase: "border-critical text-critical" },
};

interface EtiquetaEstadoProps {
  estado: EstadoAfectacion;
}

export function EtiquetaEstado({ estado }: EtiquetaEstadoProps) {
  const { texto, clase } = ESTILO_POR_ESTADO[estado];
  return (
    <span className={`rounded-full border px-2 py-1 text-xs ${clase}`}>
      {texto}
    </span>
  );
}