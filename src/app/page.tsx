import { TarjetaAlbergue } from "@/components/albergues/TarjetaAlbergue";
import { RepositorioAlberguesEnMemoria } from "@/repositories/RepositorioAlberguesEnMemoria";
import { AlberguesServicio } from "@/services/AlberguesServicio";

export const dynamic = "force-dynamic";

export default async function Inicio() {
  const servicio = new AlberguesServicio(new RepositorioAlberguesEnMemoria());
  const albergues = await servicio.obtenerTodos();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-bold text-strong">EconoMap</h1>
      <p className="mt-2 text-muted">
        Consulta los albergues disponibles y su ocupación.
      </p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {albergues.map((albergue) => (
          <TarjetaAlbergue key={albergue.id} albergue={albergue} />
        ))}
      </section>
    </main>
  );
}