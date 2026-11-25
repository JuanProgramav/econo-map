import Link from "next/link";
import { FormularioOferta } from "@/components/empleo/FormularioOferta";
import { TarjetaOferta } from "@/components/empleo/TarjetaOferta";
import { leerSesion } from "@/lib/sesion";
import { RepositorioOfertasPrisma } from "@/repositories/RepositorioOfertasPrisma";
import { RepositorioUsuariosPrisma } from "@/repositories/RepositorioUsuariosPrisma";
import { OfertasServicio } from "@/services/OfertasServicio";

export const dynamic = "force-dynamic";

async function esAdministrador(): Promise<boolean> {
  const sesion = await leerSesion();
  if (!sesion) return false;
  const usuario = await new RepositorioUsuariosPrisma().buscarPorId(
    sesion.usuarioId,
  );
  return usuario?.puedeGestionarEmpleo() ?? false;
}

export default async function PaginaEmpleo() {
  const ofertas = await new OfertasServicio(
    new RepositorioOfertasPrisma(),
  ).listarActivas();
  const esAdmin = await esAdministrador();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-strong">Empleo y emprendimiento</h1>
        <Link href="/" className="text-sm text-muted hover:text-foreground">
          Volver al inicio
        </Link>
      </div>
      <p className="mt-2 text-sm text-muted">
        Ofertas de empleo temporal para personas afectadas, con prioridad para
        los grupos más vulnerables.
      </p>

      <section className="mt-6 flex flex-col gap-4">
        {ofertas.length === 0 ? (
          <p className="text-muted">Todavía no hay ofertas publicadas.</p>
        ) : (
          ofertas.map((oferta) => (
            <TarjetaOferta
              key={oferta.id}
              oferta={oferta}
              puedeCerrar={esAdmin}
            />
          ))
        )}
      </section>

      {esAdmin && (
        <section className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-4 text-lg font-semibold text-strong">
            Publicar una oferta
          </h2>
          <FormularioOferta />
        </section>
      )}
    </main>
  );
}