"use client";

import { useActionState } from "react";
import { crearCuenta, EstadoCuenta } from "@/app/cuenta/acciones";
import {
  ESTILO_BOTON_PRINCIPAL,
  ESTILO_CAMPO,
} from "@/components/ui/estilos";

const ESTADO_INICIAL: EstadoCuenta = { error: null };

export function FormularioCuenta() {
  const [estado, accion, pendiente] = useActionState(
    crearCuenta,
    ESTADO_INICIAL,
  );

  return (
    <form action={accion} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm text-muted">
        Correo
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

      <button
        type="submit"
        disabled={pendiente}
        className={ESTILO_BOTON_PRINCIPAL}
      >
        {pendiente ? "Creando..." : "Crear cuenta"}
      </button>
    </form>
  );
}