"use server";

import { revalidatePath } from "next/cache";
import { leerSesion } from "@/lib/sesion";
import { RepositorioAlberguesPrisma } from "@/repositories/RepositorioAlberguesPrisma";
import { RepositorioReportesPrisma } from "@/repositories/RepositorioReportesPrisma";
import { RepositorioUsuariosPrisma } from "@/repositories/RepositorioUsuariosPrisma";
import { ReporteDiarioServicio } from "@/services/ReporteDiarioServicio";

export interface EstadoReporte {
  error: string | null;
  mensaje: string | null;
}

export async function reportarOcupacion(
  _estadoPrevio: EstadoReporte,
  formulario: FormData,
): Promise<EstadoReporte> {
  const sesion = await leerSesion();
  if (!sesion || !sesion.albergueId) {
    return { error: "Tu sesión no es válida. Vuelve a iniciar sesión.", mensaje: null };
  }

  const texto = String(formulario.get("personas") ?? "").trim();
  if (texto === "") {
    return { error: "Escribe la cantidad de personas.", mensaje: null };
  }

  try {
    const usuario = await new RepositorioUsuariosPrisma().buscarPorId(
      sesion.usuarioId,
    );
    if (!usuario) {
      return { error: "El usuario ya no existe.", mensaje: null };
    }

    const servicio = new ReporteDiarioServicio(
      new RepositorioAlberguesPrisma(),
      new RepositorioReportesPrisma(),
    );
    await servicio.reportar(usuario, sesion.albergueId, Number(texto));
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : "No se pudo guardar.";
    return { error: mensaje, mensaje: null };
  }

  revalidatePath("/");
  revalidatePath("/panel");
  return { error: null, mensaje: "Reporte guardado. Gracias por actualizar." };
}