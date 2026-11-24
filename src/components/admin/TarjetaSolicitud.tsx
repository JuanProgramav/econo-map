import { aprobarSolicitud, rechazarSolicitud } from "@/app/admin/acciones";
import { SolicitudAlbergue } from "@/domain/entities/SolicitudAlbergue";

interface TarjetaSolicitudProps {
  solicitud: SolicitudAlbergue;
}

export function TarjetaSolicitud({ solicitud }: TarjetaSolicitudProps) {
  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <h2 className="text-lg font-semibold text-strong">{solicitud.nombre}</h2>
      <p className="text-sm text-muted">{solicitud.direccion}</p>
      <p className="mt-3 text-sm text-muted">
        Capacidad: {solicitud.capacidad} personas
      </p>
      <p className="text-sm text-muted">
        Responsable: {solicitud.correoResponsable}
      </p>

      <div className="mt-4 flex gap-3">
        <form action={aprobarSolicitud}>
          <input type="hidden" name="id" value={solicitud.id} />
          <button className="rounded-lg bg-available px-4 py-2 text-sm font-medium text-strong">
            Aprobar
          </button>
        </form>
        <form action={rechazarSolicitud}>
          <input type="hidden" name="id" value={solicitud.id} />
          <button className="rounded-lg border border-critical px-4 py-2 text-sm text-critical">
            Rechazar
          </button>
        </form>
      </div>
    </article>
  );
}