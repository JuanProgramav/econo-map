import Link from "next/link";
import { FormularioRegistro } from "@/components/registro/FormularioRegistro";

export default function PaginaRegistro() {
  return (
    <main className="mx-auto w-full max-w-md px-6 py-10">
      <h1 className="text-2xl font-bold text-strong">Registrar un albergue</h1>
      <p className="mb-6 mt-2 text-sm text-muted">
        Tu solicitud será revisada por un administrador antes de aparecer en la
        lista pública.
      </p>
      <div className="rounded-xl border border-border bg-surface p-6">
        <FormularioRegistro />
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