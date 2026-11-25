import { ajustarEstrategia } from "@/app/evaluacion/acciones";
import { ESTILO_CAMPO } from "@/components/ui/estilos";
import { Afectacion } from "@/domain/entities/Afectacion";
import {
  listarEstrategias,
  obtenerEstrategia,
} from "@/domain/strategies/CatalogoEstrategias";
import { ETIQUETA_TIPO } from "@/domain/value-objects/TipoAfectacion";
import { formatearPesos } from "@/lib/formato";

interface TarjetaAjusteProps {
  afectacion: Afectacion;
}

export function TarjetaAjuste({ afectacion }: TarjetaAjusteProps) {
  const claveActual = afectacion.estrategia ?? "";
  const nombreActual = claveActual ? obtenerEstrategia(claveActual).nombre : "";

  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <h3 className="text-lg font-semibold text-strong">
        {ETIQUETA_TIPO[afectacion.tipo]}
      </h3>
      <p className="text-sm text-muted">{afectacion.correoCiudadano}</p>
      <p className="mt-2 text-sm text-foreground">
        Pérdida: {formatearPesos(afectacion.perdidaEstimada)}
      </p>
      <p className="text-sm text-foreground">
        {nombreActual}: {formatearPesos(afectacion.apoyoAsignado ?? 0)}
      </p>

      <form action={ajustarEstrategia} className="mt-4 flex items-center gap-3">
        <input type="hidden" name="id" value={afectacion.id} />
        <select
          name="estrategia"
          defaultValue={claveActual}
          className={ESTILO_CAMPO}
        >
          {listarEstrategias().map((estrategia) => (
            <option key={estrategia.clave} value={estrategia.clave}>
              {estrategia.nombre}
            </option>
          ))}
        </select>
        <button className="rounded-lg border border-border px-4 py-2 text-sm text-foreground">
          Ajustar
        </button>
      </form>
    </article>
  );
}