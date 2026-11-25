import Link from "next/link";
import { FormularioLogin } from "@/components/login/FormularioLogin";
import { rutaInicialDe } from "@/lib/rutas";
import { leerSesion } from "@/lib/sesion";

const ESTILO_ENLACE_SECUNDARIO = "text-sm text-muted hover:text-foreground";

export async function PantallaIngreso() {
  const sesion = await leerSesion();

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-10">
      <h1 className="text-3xl font-bold text-strong">EconoMap</h1>
      <p className="mb-6 mt-2 text-sm text-muted">
        Albergues y recuperación económica después del terremoto.
      </p>

      {sesion && (
        <Link
          href={rutaInicialDe(sesion.rol)}
          className="mb-4 rounded-lg bg-available px-4 py-2 text-center font-medium text-strong"
        >
          Ir a mi panel
        </Link>
      )}

      <div className="rounded-xl border border-border bg-surface p-6">
        <FormularioLogin />
      </div>

      <Link
        href="/albergues"
        className="mt-4 rounded-lg border border-border px-4 py-2 text-center text-foreground"
      >
        Ver albergues sin iniciar sesión
      </Link>

      <div className="mt-6 flex flex-col gap-2">
        <Link href="/cuenta" className={ESTILO_ENLACE_SECUNDARIO}>
          Fui afectado por el terremoto: crear cuenta
        </Link>
        <Link href="/registro" className={ESTILO_ENLACE_SECUNDARIO}>
          Represento un albergue: solicitar registro
        </Link>
      </div>
    </main>
  );
}