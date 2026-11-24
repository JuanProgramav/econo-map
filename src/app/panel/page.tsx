import { redirect } from "next/navigation";
import { salir } from "@/app/login/acciones";
import { leerSesion } from "@/lib/sesion";

export const dynamic = "force-dynamic";

export default async function Panel() {
  const sesion = await leerSesion();
  if (!sesion) redirect("/login");

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold text-strong">Panel</h1>
      <p className="mt-2 text-muted">Sesión iniciada como: {sesion.rol}</p>
      <form action={salir} className="mt-6">
        <button className="rounded-lg border border-border px-4 py-2 text-foreground">
          Cerrar sesión
        </button>
      </form>
    </main>
  );
}