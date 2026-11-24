"use client";

import { useActionState } from "react";
import { EstadoReporte, reportarOcupacion } from "@/app/panel/acciones";

const ESTADO_INICIAL: EstadoReporte = { error: null, mensaje: null };

interface FormularioReporteProps {
  ocupadasActuales: number;
  capacidad: number;
}

export function FormularioReporte({
  ocupadasActuales,
  capacidad,
}: FormularioReporteProps) {
  const [estado, accion, pendiente] = useActionState(
    reportarOcupacion,
    ESTADO_INICIAL,
  );

  return (
    <form action={accion} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm text-muted">
        Personas en el albergue hoy (máximo {capacidad})
        <input
          name="personas"
          type="number"
          min={0}
          max={capacidad}
          defaultValue={ocupadasActuales}
          required
          className="rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-muted"
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
        {pendiente ? "Guardando..." : "Guardar reporte"}
      </button>
    </form>
  );
}