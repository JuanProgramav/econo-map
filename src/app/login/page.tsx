import Link from "next/link";
import { FormularioLogin } from "@/components/login/FormularioLogin";

export default function PaginaLogin() {
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-10">
      <h1 className="text-2xl font-bold text-strong">Ingreso</h1>
      <p className="mb-6 mt-2 text-sm text-muted">
        Para responsables de albergue, administradores y personas afectadas.
      </p>
      <div className="rounded-xl border border-border bg-surface p-6">
        <FormularioLogin />
      </div>
      <Link
        href="/cuenta"
        className="mt-6 text-sm text-muted hover:text-foreground"
      >
        Fui afectado por el terremoto: crear cuenta
      </Link>
      <Link
        href="/registro"
        className="mt-3 text-sm text-muted hover:text-foreground"
      >
        Represento un albergue: solicitar registro
      </Link>
    </main>
  );
}