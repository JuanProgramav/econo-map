import Link from "next/link";
import { salir } from "@/app/login/acciones";
import { BarraOcupacion } from "@/components/albergues/BarraOcupacion";
import { FormularioReporte } from "@/components/panel/FormularioReporte";
import { exigirUsuario } from "@/lib/acceso";
import { RepositorioAlberguesPrisma } from "@/repositories/RepositorioAlberguesPrisma";

export const dynamic = "force-dynamic";

export default async function Panel() {
  const usuario = await exigirUsuario();

  const albergue = usuario.albergueId
    ? await new RepositorioAlberguesPrisma().buscarPorId(usuario.albergueId)
    : null;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-strong">Panel</h1>
        <Link href="/" className="text-sm text-muted hover:text-foreground">
          Ver lista pública
        </Link>
      </div>

      {albergue ? (
        <section className="mt-6 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-strong">{albergue.nombre}</h2>
          <p className="mb-4 text-sm text-muted">{albergue.direccion}</p>

          <BarraOcupacion
            porcentaje={albergue.porcentajeOcupacion()}
            estado={albergue.estado()}
          />
          <p className="mb-6 mt-3 text-sm text-muted">
            {albergue.ocupadas} de {albergue.capacidad.total} personas (
            {albergue.porcentajeOcupacion()}%)
          </p>

          <FormularioReporte
            ocupadasActuales={albergue.ocupadas}
            capacidad={albergue.capacidad.total}
          />
        </section>
      ) : (
        <p className="mt-6 text-muted">
          Esta cuenta no tiene un albergue asignado para reportar.
        </p>
      )}

      <form action={salir} className="mt-6">
        <button className="rounded-lg border border-border px-4 py-2 text-foreground">
          Cerrar sesión
        </button>
      </form>
    </main>
  );
}