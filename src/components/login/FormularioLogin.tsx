"use client";

import { useActionState } from "react";
import { EstadoLogin, iniciarSesion } from "@/app/login/acciones";

const ESTADO_INICIAL: EstadoLogin = { error: null };

export function FormularioLogin() {
  const [estado, accion, pendiente] = useActionState(
    iniciarSesion,
    ESTADO_INICIAL,
  );

  return (
    <form action={accion} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm text-muted">
        Correo
        <input
          name="correo"
          type="email"
          required
          className="rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-muted"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        Contraseña
        <input
          name="contrasena"
          type="password"
          required
          className="rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-muted"
        />
      </label>

      {estado.error && (
        <p className="text-sm text-critical">{estado.error}</p>
      )}

      <button
        type="submit"
        disabled={pendiente}
        className="rounded-lg bg-strong px-4 py-2 font-medium text-background disabled:opacity-60"
      >
        {pendiente ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}