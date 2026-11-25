import Link from "next/link";
import { rutaInicialDe } from "@/lib/rutas";

const ESTILO_ENLACE =
  "rounded-lg border border-border px-3 py-2 text-sm text-foreground";

interface NavegacionPrincipalProps {
  rol: string | null;
}

export function NavegacionPrincipal({ rol }: NavegacionPrincipalProps) {
  if (rol) {
    return (
      <nav className="mt-4 flex flex-wrap gap-3">
        <Link href={rutaInicialDe(rol)} className={ESTILO_ENLACE}>
          Ir a mi panel
        </Link>
      </nav>
    );
  }

  return (
    <nav className="mt-4 flex flex-wrap gap-3">
      <Link href="/login" className={ESTILO_ENLACE}>
        Iniciar sesión
      </Link>
      <Link href="/cuenta" className={ESTILO_ENLACE}>
        Fui afectado: crear cuenta
      </Link>
      <Link href="/registro" className={ESTILO_ENLACE}>
        Registrar un albergue
      </Link>
    </nav>
  );
}