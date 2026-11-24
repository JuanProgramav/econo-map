import Link from "next/link";
import { FormularioCuenta } from "@/components/cuenta/FormularioCuenta";

export default function PaginaCuenta() {
  return (
    <main className="mx-auto w-full max-w-sm px-6 py-10">
      <h1 className="text-2xl font-bold text-strong">Crear cuenta</h1>
      <p className="mb-6 mt-2 text-sm text-muted">
        Para reportar tu afectación por el terremoto necesitas una cuenta. Un
        administrador revisará tu caso.
      </p>
      <div className="rounded-xl border border-border bg-surface p-6">
        <FormularioCuenta />
      </div>
      <Link
        href="/login"
        className="mt-6 inline-block text-sm text-muted hover:text-foreground"
      >
        Ya tengo cuenta, iniciar sesión
      </Link>
    </main>
  );
}