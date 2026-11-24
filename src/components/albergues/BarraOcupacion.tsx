import { EstadoAlbergue } from "@/domain/value-objects/EstadoAlbergue";

const COLOR_POR_ESTADO: Record<EstadoAlbergue, string> = {
  disponible: "bg-available",
  atencion: "bg-warning",
  critico: "bg-critical",
};

interface BarraOcupacionProps {
  porcentaje: number;
  estado: EstadoAlbergue;
}

export function BarraOcupacion({ porcentaje, estado }: BarraOcupacionProps) {
  const ancho = Math.min(porcentaje, 100);

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-border">
      <div
        className={`h-full rounded-full ${COLOR_POR_ESTADO[estado]}`}
        style={{ width: `${ancho}%` }}
      />
    </div>
  );
}