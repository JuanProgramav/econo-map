import {
  aprobarAfectacion,
  rechazarAfectacion,
} from "@/app/admin/acciones";
import { ESTILO_CAMPO } from "@/components/ui/estilos";
import { Afectacion } from "@/domain/entities/Afectacion";
import { listarEstrategias } from "@/domain/strategies/CatalogoEstrategias";
import { ETIQUETA_GRUPO } from "@/domain/value-objects/GrupoPoblacional";
import { ETIQUETA_TIPO } from "@/domain/value-objects/TipoAfectacion";
import { formatearPesos } from "@/lib/formato";

interface TarjetaAfectacionPendienteProps {
  afectacion: Afectacion;
}

export function TarjetaAfectacionPendiente({
  afectacion,
}: TarjetaAfectacionPendienteProps) {
  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <h3 className="text-lg font-semibold text-strong">
        {ETIQUETA_TIPO[afectacion.tipo]}
      </h3>
      <p className="text-sm text-foreground">{afectacion.descripcion}</p>
      <p className="mt-3 text-sm text-muted">
        Pérdida estimada: {formatearPesos(afectacion.perdidaEstimada)}
      </p>
      <p className="text-sm text-muted">
        Grupo: {ETIQUETA_GRUPO[afectacion.grupo]}
      </p>
      <p className="text-sm text-muted">Ciudadano: {afectacion.correoCiudadano}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <form action={aprobarAfectacion} className="flex items-center gap-3">
          <input type="hidden" name="id" value={afectacion.id} />
          <select name="estrategia" className={ESTILO_CAMPO}>
            {listarEstrategias().map((estrategia) => (
              <option key={estrategia.clave} value={estrategia.clave}>
                {estrategia.nombre}
              </option>
            ))}
          </select>
          <button className="rounded-lg bg-available px-4 py-2 text-sm font-medium text-strong">
            Aprobar
          </button>
        </form>

        <form action={rechazarAfectacion}>
          <input type="hidden" name="id" value={afectacion.id} />
          <button className="rounded-lg border border-critical px-4 py-2 text-sm text-critical">
            Rechazar
          </button>
        </form>
      </div>
    </article>
  );
}