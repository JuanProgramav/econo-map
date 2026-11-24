import Link from "next/link";
import { salir } from "@/app/login/acciones";
import { FormularioAfectacion } from "@/components/afectaciones/FormularioAfectacion";
import { TarjetaAfectacion } from "@/components/afectaciones/TarjetaAfectacion";
import { exigirCiudadano } from "@/lib/acceso";
import { RepositorioAfectacionesPrisma } from "@/repositories/RepositorioAfectacionesPrisma";
import { AfectacionesServicio } from "@/services/AfectacionesServicio";

export const dynamic = "force-dynamic";

export default async function PaginaAfectaciones() {
  const usuario = await exigirCiudadano();
  const servicio = new AfectacionesServicio(new RepositorioAfectacionesPrisma());
  const afectaciones = await servicio.listarDe(usuario);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-strong">Mi afectación</h1>
        <Link href="/" className="text-sm text-muted hover:text-foreground">
          Ver albergues
        </Link>
      </div>

      <section className="mt-6 rounded-xl border border-border bg-surface p-6">
        <h2 className="mb-4 text-lg font-semibold text-strong">
          Reportar una pérdida
        </h2>
        <FormularioAfectacion />
      </section>

      <section className="mt-8 flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-strong">Mis reportes</h2>
        {afectaciones.length === 0 ? (
          <p className="text-muted">Todavía no has enviado reportes.</p>
        ) : (
          afectaciones.map((afectacion) => (
            <TarjetaAfectacion key={afectacion.id} afectacion={afectacion} />
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