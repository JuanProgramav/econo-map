import { cerrarOferta } from "@/app/empleo/acciones";
import { OfertaEmpleo } from "@/domain/entities/OfertaEmpleo";
import { ETIQUETA_GRUPO } from "@/domain/value-objects/GrupoPoblacional";

interface TarjetaOfertaProps {
  oferta: OfertaEmpleo;
  puedeCerrar: boolean;
}

export function TarjetaOferta({ oferta, puedeCerrar }: TarjetaOfertaProps) {
  const etiquetaPrioridad =
    oferta.grupoPrioritario === "ninguno"
      ? "Abierta a todos"
      : `Prioridad: ${ETIQUETA_GRUPO[oferta.grupoPrioritario]}`;

  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <header className="mb-2 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-strong">{oferta.titulo}</h3>
          <p className="text-sm text-muted">{oferta.empresa}</p>
        </div>
        <span className="rounded-full border border-available px-2 py-1 text-xs text-available">
          {etiquetaPrioridad}
        </span>
      </header>

      <p className="text-sm text-foreground">{oferta.descripcion}</p>
      <p className="mt-3 text-sm text-muted">Cupos: {oferta.cupos}</p>

      {puedeCerrar && (
        <form action={cerrarOferta} className="mt-4">
          <input type="hidden" name="id" value={oferta.id} />
          <button className="rounded-lg border border-critical px-4 py-2 text-sm text-critical">
            Cerrar oferta
          </button>
        </form>
      )}
    </article>
  );
}