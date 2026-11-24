import Link from "next/link";
import { redirect } from "next/navigation";
import { salir } from "@/app/login/acciones";
import { TarjetaSolicitud } from "@/components/admin/TarjetaSolicitud";
import { leerSesion } from "@/lib/sesion";
import { RepositorioSolicitudesPrisma } from "@/repositories/RepositorioSolicitudesPrisma";
import { RepositorioUsuariosPrisma } from "@/repositories/RepositorioUsuariosPrisma";
import { SolicitudesServicio } from "@/services/SolicitudesServicio";

export const dynamic = "force-dynamic";

export default async function PanelAdministrador() {
  const sesion = await leerSesion();
  if (!sesion) redirect("/login");

  const usuario = await new RepositorioUsuariosPrisma().buscarPorId(
    sesion.usuarioId,
  );
  if (!usuario || !usuario.puedeAprobarAlbergues()) redirect("/panel");

  const servicio = new SolicitudesServicio(
    new RepositorioSolicitudesPrisma(),
    new RepositorioUsuariosPrisma(),
  );
  const pendientes = await servicio.listarPendientes(usuario);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-strong">Solicitudes de albergues</h1>
        <Link href="/" className="text-sm text-muted hover:text-foreground">
          Ver lista pública
        </Link>
      </div>

      <section className="mt-6 flex flex-col gap-4">
        {pendientes.length === 0 ? (
          <p className="text-muted">No hay solicitudes pendientes.</p>
        ) : (
          pendientes.map((solicitud) => (
            <TarjetaSolicitud key={solicitud.id} solicitud={solicitud} />
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