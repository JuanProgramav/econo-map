"use server";

import { revalidatePath } from "next/cache";
import { exigirAdministrador } from "@/lib/acceso";
import { RepositorioOfertasPrisma } from "@/repositories/RepositorioOfertasPrisma";
import { OfertasServicio } from "@/services/OfertasServicio";

export interface EstadoOferta {
  error: string | null;
  mensaje: string | null;
}

function crearServicio(): OfertasServicio {
  return new OfertasServicio(new RepositorioOfertasPrisma());
}

export async function publicarOferta(
  _estadoPrevio: EstadoOferta,
  formulario: FormData,
): Promise<EstadoOferta> {
  const admin = await exigirAdministrador();

  try {
    await crearServicio().publicar(admin, {
      titulo: String(formulario.get("titulo") ?? ""),
      empresa: String(formulario.get("empresa") ?? ""),
      descripcion: String(formulario.get("descripcion") ?? ""),
      cupos: Number(formulario.get("cupos")),
      grupo: String(formulario.get("grupo") ?? ""),
    });
  } catch (error) {
    const mensaje =
      error instanceof Error ? error.message : "No se pudo publicar la oferta.";
    return { error: mensaje, mensaje: null };
  }

  revalidatePath("/empleo");
  return { error: null, mensaje: "Oferta publicada." };
}

export async function cerrarOferta(formulario: FormData): Promise<void> {
  const admin = await exigirAdministrador();
  await crearServicio().cerrar(admin, String(formulario.get("id")));
  revalidatePath("/empleo");
}