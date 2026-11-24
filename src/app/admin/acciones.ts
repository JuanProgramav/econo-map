"use server";

import { revalidatePath } from "next/cache";
import { exigirAdministrador } from "@/lib/acceso";
import { RepositorioSolicitudesPrisma } from "@/repositories/RepositorioSolicitudesPrisma";
import { RepositorioUsuariosPrisma } from "@/repositories/RepositorioUsuariosPrisma";
import { SolicitudesServicio } from "@/services/SolicitudesServicio";

function crearServicio(): SolicitudesServicio {
  return new SolicitudesServicio(
    new RepositorioSolicitudesPrisma(),
    new RepositorioUsuariosPrisma(),
  );
}

function refrescarPantallas(): void {
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function aprobarSolicitud(formulario: FormData): Promise<void> {
  const admin = await exigirAdministrador();
  await crearServicio().aprobar(admin, String(formulario.get("id")));
  refrescarPantallas();
}

export async function rechazarSolicitud(formulario: FormData): Promise<void> {
  const admin = await exigirAdministrador();
  await crearServicio().rechazar(admin, String(formulario.get("id")));
  refrescarPantallas();
}