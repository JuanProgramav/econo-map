"use server";

import { revalidatePath } from "next/cache";
import { exigirAdministrador } from "@/lib/acceso";
import { RepositorioAfectacionesPrisma } from "@/repositories/RepositorioAfectacionesPrisma";
import { RepositorioSolicitudesPrisma } from "@/repositories/RepositorioSolicitudesPrisma";
import { RepositorioUsuariosPrisma } from "@/repositories/RepositorioUsuariosPrisma";
import { AfectacionesServicio } from "@/services/AfectacionesServicio";
import { SolicitudesServicio } from "@/services/SolicitudesServicio";

function crearServicioSolicitudes(): SolicitudesServicio {
  return new SolicitudesServicio(
    new RepositorioSolicitudesPrisma(),
    new RepositorioUsuariosPrisma(),
  );
}

function crearServicioAfectaciones(): AfectacionesServicio {
  return new AfectacionesServicio(new RepositorioAfectacionesPrisma());
}

function refrescarPantallas(): void {
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/afectaciones");
}

export async function aprobarSolicitud(formulario: FormData): Promise<void> {
  const admin = await exigirAdministrador();
  await crearServicioSolicitudes().aprobar(admin, String(formulario.get("id")));
  refrescarPantallas();
}

export async function rechazarSolicitud(formulario: FormData): Promise<void> {
  const admin = await exigirAdministrador();
  await crearServicioSolicitudes().rechazar(admin, String(formulario.get("id")));
  refrescarPantallas();
}

export async function aprobarAfectacion(formulario: FormData): Promise<void> {
  const admin = await exigirAdministrador();
  await crearServicioAfectaciones().aprobar(
    admin,
    String(formulario.get("id")),
    String(formulario.get("estrategia")),
  );
  refrescarPantallas();
}

export async function rechazarAfectacion(formulario: FormData): Promise<void> {
  const admin = await exigirAdministrador();
  await crearServicioAfectaciones().rechazar(admin, String(formulario.get("id")));
  refrescarPantallas();
}