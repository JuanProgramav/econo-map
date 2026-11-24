"use server";

import { revalidatePath } from "next/cache";
import { exigirCiudadano } from "@/lib/acceso";
import { RepositorioAfectacionesPrisma } from "@/repositories/RepositorioAfectacionesPrisma";
import { AfectacionesServicio } from "@/services/AfectacionesServicio";

export interface EstadoFormularioAfectacion {
  error: string | null;
  mensaje: string | null;
}

export async function reportarAfectacion(
  _estadoPrevio: EstadoFormularioAfectacion,
  formulario: FormData,
): Promise<EstadoFormularioAfectacion> {
  const usuario = await exigirCiudadano();

  try {
    await new AfectacionesServicio(new RepositorioAfectacionesPrisma()).registrar(
      usuario,
      {
        tipo: String(formulario.get("tipo") ?? ""),
        descripcion: String(formulario.get("descripcion") ?? ""),
        grupo: String(formulario.get("grupo") ?? ""),
        perdidaEstimada: Number(formulario.get("perdidaEstimada")),
      },
    );
  } catch (error) {
    const mensaje =
      error instanceof Error ? error.message : "No se pudo guardar el reporte.";
    return { error: mensaje, mensaje: null };
  }

  revalidatePath("/afectaciones");
  return {
    error: null,
    mensaje: "Reporte enviado. Un administrador lo revisará pronto.",
  };
}