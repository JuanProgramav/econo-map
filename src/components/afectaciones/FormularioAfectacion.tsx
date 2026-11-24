"use client";

import { useActionState } from "react";
import {
  EstadoFormularioAfectacion,
  reportarAfectacion,
} from "@/app/afectaciones/acciones";
import {
  ESTILO_BOTON_PRINCIPAL,
  ESTILO_CAMPO,
} from "@/components/ui/estilos";
import {
  ETIQUETA_GRUPO,
  GRUPOS_POBLACIONALES,
} from "@/domain/value-objects/GrupoPoblacional";
import {
  ETIQUETA_TIPO,
  TIPOS_AFECTACION,
} from "@/domain/value-objects/TipoAfectacion";

const ESTADO_INICIAL: EstadoFormularioAfectacion = { error: null, mensaje: null };

export function FormularioAfectacion() {
  const [estado, accion, pendiente] = useActionState(
    reportarAfectacion,
    ESTADO_INICIAL,
  );

  return (
    <form action={accion} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm text-muted">
        ¿Qué perdiste?
        <select name="tipo" required className={ESTILO_CAMPO}>
          {TIPOS_AFECTACION.map((tipo) => (
            <option key={tipo} value={tipo}>
              {ETIQUETA_TIPO[tipo]}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        Descripción breve
        <textarea
          name="descripcion"
          rows={3}
          required
          className={ESTILO_CAMPO}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        Pérdida estimada (en pesos)
        <input
          name="perdidaEstimada"
          type="number"
          min={1}
          step={1}
          required
          className={ESTILO_CAMPO}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        Grupo poblacional
        <select name="grupo" required className={ESTILO_CAMPO}>
          {GRUPOS_POBLACIONALES.map((grupo) => (
            <option key={grupo} value={grupo}>
              {ETIQUETA_GRUPO[grupo]}
            </option>
          ))}
        </select>
      </label>

      {estado.error && <p className="text-sm text-critical">{estado.error}</p>}
      {estado.mensaje && (
        <p className="text-sm text-available">{estado.mensaje}</p>
      )}

      <button
        type="submit"
        disabled={pendiente}
        className={ESTILO_BOTON_PRINCIPAL}
      >
        {pendiente ? "Enviando..." : "Enviar reporte"}
      </button>
    </form>
  );
}