"use client";

import { useActionState } from "react";
import { EstadoOferta, publicarOferta } from "@/app/empleo/acciones";
import {
  ESTILO_BOTON_PRINCIPAL,
  ESTILO_CAMPO,
} from "@/components/ui/estilos";
import {
  ETIQUETA_GRUPO,
  GRUPOS_POBLACIONALES,
} from "@/domain/value-objects/GrupoPoblacional";

const ESTADO_INICIAL: EstadoOferta = { error: null, mensaje: null };

export function FormularioOferta() {
  const [estado, accion, pendiente] = useActionState(
    publicarOferta,
    ESTADO_INICIAL,
  );

  return (
    <form action={accion} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm text-muted">
        Título del empleo
        <input name="titulo" type="text" required className={ESTILO_CAMPO} />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        Empresa o entidad
        <input name="empresa" type="text" required className={ESTILO_CAMPO} />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        Descripción
        <textarea
          name="descripcion"
          rows={3}
          required
          className={ESTILO_CAMPO}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        Cupos
        <input
          name="cupos"
          type="number"
          min={1}
          step={1}
          required
          className={ESTILO_CAMPO}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        Grupo con prioridad
        <select name="grupo" required className={ESTILO_CAMPO}>
          {GRUPOS_POBLACIONALES.map((grupo) => (
            <option key={grupo} value={grupo}>
              {grupo === "ninguno" ? "Abierta a todos" : ETIQUETA_GRUPO[grupo]}
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
        {pendiente ? "Publicando..." : "Publicar oferta"}
      </button>
    </form>
  );
}