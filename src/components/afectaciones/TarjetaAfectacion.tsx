import { EtiquetaEstado } from "@/components/afectaciones/EtiquetaEstado";
import { Afectacion } from "@/domain/entities/Afectacion";
import { obtenerEstrategia } from "@/domain/strategies/CatalogoEstrategias";
import { ETIQUETA_GRUPO } from "@/domain/value-objects/GrupoPoblacional";
import { ETIQUETA_TIPO } from "@/domain/value-objects/TipoAfectacion";
import { formatearPesos } from "@/lib/formato";

const PORCENTAJE_TOTAL = 100;

interface TarjetaAfectacionProps {
  afectacion: Afectacion;
}

export function TarjetaAfectacion({ afectacion }: TarjetaAfectacionProps) {
  const cubierto =
    afectacion.apoyoAsignado === null
      ? null
      : Math.round(
          (afectacion.apoyoAsignado / afectacion.perdidaEstimada) *
            PORCENTAJE_TOTAL,
        );

  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <header className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-strong">
          {ETIQUETA_TIPO[afectacion.tipo]}
        </h3>
        <EtiquetaEstado estado={afectacion.estado} />
      </header>

      <p className="text-sm text-foreground">{afectacion.descripcion}</p>
      <p className="mt-3 text-sm text-muted">
        Pérdida estimada: {formatearPesos(afectacion.perdidaEstimada)}
      </p>
      <p className="text-sm text-muted">
        Grupo: {ETIQUETA_GRUPO[afectacion.grupo]}
      </p>

      {afectacion.estado === "aprobada" &&
        afectacion.estrategia &&
        afectacion.apoyoAsignado !== null && (
          <p className="mt-3 text-sm text-available">
            {obtenerEstrategia(afectacion.estrategia).nombre}:{" "}
            {formatearPesos(afectacion.apoyoAsignado)} ({cubierto}% de tu
            pérdida)
          </p>
        )}
    </article>
  );
}