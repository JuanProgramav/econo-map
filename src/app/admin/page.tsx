import Link from "next/link";
import { salir } from "@/app/login/acciones";
import { TarjetaAfectacionPendiente } from "@/components/admin/TarjetaAfectacionPendiente";
import { TarjetaSolicitud } from "@/components/admin/TarjetaSolicitud";
import { exigirAdministrador } from "@/lib/acceso";
import { RepositorioAfectacionesPrisma } from "@/repositories/RepositorioAfectacionesPrisma";
import { RepositorioSolicitudesPrisma } from "@/repositories/RepositorioSolicitudesPrisma";
import { RepositorioUsuariosPrisma } from "@/repositories/RepositorioUsuariosPrisma";
import { AfectacionesServicio } from "@/services/AfectacionesServicio";
import { SolicitudesServicio } from "@/services/SolicitudesServicio";

export const dynamic = "force-dynamic";

export default async function PanelAdministrador() {
  const admin = await exigirAdministrador();

  const solicitudes = new SolicitudesServicio(
    new RepositorioSolicitudesPrisma(),
    new RepositorioUsuariosPrisma(),
  );
  const afectaciones = new AfectacionesServicio(
    new RepositorioAfectacionesPrisma(),
  );

  const albergues = await solicitudes.listarPendientes(admin);
  const casos = await afectaciones.listarPendientes(admin);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-strong">Panel del administrador</h1>
        <Link href="/" className="text-sm text-muted hover:text-foreground">
          Ver lista pública
        </Link>
      </div>

      <section className="mt-8 flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-strong">
          Solicitudes de albergues
        </h2>
        {albergues.length === 0 ? (
          <p className="text-muted">No hay solicitudes pendientes.</p>
        ) : (
          albergues.map((solicitud) => (
            <TarjetaSolicitud key={solicitud.id} solicitud={solicitud} />
          ))
        )}
      </section>

      <section className="mt-10 flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-strong">
          Afectaciones por revisar
        </h2>
        {casos.length === 0 ? (
          <p className="text-muted">No hay afectaciones pendientes.</p>
        ) : (
          casos.map((afectacion) => (
            <TarjetaAfectacionPendiente
              key={afectacion.id}
              afectacion={afectacion}
            />
          ))
        )}
      </section>

      <form action={salir} className="mt-8">
        <button className="rounded-lg border border-border px-4 py-2 text-foreground">
          Cerrar sesión
        </button>
      </form>
    </main>
  );
}