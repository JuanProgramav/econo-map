import { FormularioLogin } from "@/components/login/FormularioLogin";

export default function PaginaLogin() {
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-10">
      <h1 className="text-2xl font-bold text-strong">Ingreso de albergues</h1>
      <p className="mb-6 mt-2 text-sm text-muted">
        Solo para responsables de albergue y administradores.
      </p>
      <div className="rounded-xl border border-border bg-surface p-6">
        <FormularioLogin />
      </div>
    </main>
  );
}