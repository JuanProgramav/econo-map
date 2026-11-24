"use client";

import { useActionState } from "react";
import { EstadoRegistro, solicitarRegistro } from "@/app/registro/acciones";

const ESTADO_INICIAL: EstadoRegistro = { error: null, mensaje: null };
const ESTILO_CAMPO =
  "rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-muted";

export function FormularioRegistro() {
  const [estado, accion, pendiente] = useActionState(
    solicitarRegistro,
    ESTADO_INICIAL,
  );

  return (
    <form action={accion} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm text-muted">
        Nombre del albergue
        <input name="nombre" type="text" required className={ESTILO_CAMPO} />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        Dirección
        <input name="direccion" type="text" required className={ESTILO_CAMPO} />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        Capacidad (personas)
        <input
          name="capacidad"
          type="number"
          min={1}
          required
          className={ESTILO_CAMPO}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        Correo del responsable
        <input name="correo" type="email" required className={ESTILO_CAMPO} />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        Contraseña (mínimo 8 caracteres)
        <input
          name="contrasena"
          type="password"
          minLength={8}
          required
          className={ESTILO_CAMPO}
        />
      </label>

      {estado.error && <p className="text-sm text-critical">{estado.error}</p>}
      {estado.mensaje && (
        <p className="text-sm text-available">{estado.mensaje}</p>
      )}

      <button
        type="submit"
        disabled={pendiente}
        className="rounded-lg bg-strong px-4 py-2 font-medium text-background disabled:opacity-60"
      >
        {pendiente ? "Enviando..." : "Enviar solicitud"}
      </button>
    </form>
  );
}