"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Usuario } from "@/domain/entities/Usuario";
import { leerSesion } from "@/lib/sesion";
import { RepositorioSolicitudesPrisma } from "@/repositories/RepositorioSolicitudesPrisma";
import { RepositorioUsuariosPrisma } from "@/repositories/RepositorioUsuariosPrisma";
import { SolicitudesServicio } from "@/services/SolicitudesServicio";

async function obtenerAdministrador(): Promise<Usuario> {
  const sesion = await leerSesion();
  if (!sesion) redirect("/login");

  const usuario = await new RepositorioUsuariosPrisma().buscarPorId(
    sesion.usuarioId,
  );
  if (!usuario) redirect("/login");
  return usuario;
}

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
  const admin = await obtenerAdministrador();
  await crearServicio().aprobar(admin, String(formulario.get("id")));
  refrescarPantallas();
}

export async function rechazarSolicitud(formulario: FormData): Promise<void> {
  const admin = await obtenerAdministrador();
  await crearServicio().rechazar(admin, String(formulario.get("id")));
  refrescarPantallas();
}