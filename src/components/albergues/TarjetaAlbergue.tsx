import { Albergue } from "@/domain/entities/Albergue";
import { BarraOcupacion } from "@/components/albergues/BarraOcupacion";

interface TarjetaAlbergueProps {
  albergue: Albergue;
}

export function TarjetaAlbergue({ albergue }: TarjetaAlbergueProps) {
  const porcentaje = albergue.porcentajeOcupacion();

  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-strong">
            {albergue.nombre}
          </h2>
          <p className="text-sm text-muted">{albergue.direccion}</p>
        </div>
        {albergue.estaDesactualizado() && (
          <span className="rounded-full border border-warning px-2 py-1 text-xs text-warning">
            Sin actualizar hoy
          </span>
        )}
      </header>

      <BarraOcupacion porcentaje={porcentaje} estado={albergue.estado()} />

      <p className="mt-3 text-sm text-muted">
        <span className="font-medium text-foreground">
          {albergue.ocupadas}
        </span>{" "}
        de {albergue.capacidad.total} personas ({porcentaje}%)
      </p>
    </article>
  );
}