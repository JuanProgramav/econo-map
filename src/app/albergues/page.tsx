import Link from "next/link";
import { TarjetaAlbergue } from "@/components/albergues/TarjetaAlbergue";
import { RepositorioAlberguesPrisma } from "@/repositories/RepositorioAlberguesPrisma";
import { AlberguesServicio } from "@/services/AlberguesServicio";

export const dynamic = "force-dynamic";

export default async function PaginaAlbergues() {
  const servicio = new AlberguesServicio(new RepositorioAlberguesPrisma());
  const albergues = await servicio.obtenerTodos();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-strong">Albergues</h1>
        <Link href="/" className="text-sm text-muted hover:text-foreground">
          Volver al inicio
        </Link>
      </div>
      <p className="mt-2 text-muted">
        Consulta los albergues disponibles y su ocupación.
      </p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {albergues.length === 0 ? (
          <p className="text-muted">Todavía no hay albergues registrados.</p>
        ) : (
          albergues.map((albergue) => (
            <TarjetaAlbergue key={albergue.id} albergue={albergue} />
          ))
        )}
      </section>
    </main>
  );
}