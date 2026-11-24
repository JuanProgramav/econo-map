"use server";

import { redirect } from "next/navigation";
import { RepositorioUsuariosPrisma } from "@/repositories/RepositorioUsuariosPrisma";
import { AutenticacionServicio } from "@/services/AutenticacionServicio";
import { cerrarSesion, crearSesion } from "@/lib/sesion";

export interface EstadoLogin {
  error: string | null;
}

export async function iniciarSesion(
  _estadoPrevio: EstadoLogin,
  formulario: FormData,
): Promise<EstadoLogin> {
  const correo = String(formulario.get("correo") ?? "");
  const contrasena = String(formulario.get("contrasena") ?? "");

  const servicio = new AutenticacionServicio(new RepositorioUsuariosPrisma());
  const usuario = await servicio.iniciarSesion(correo, contrasena);

  if (!usuario) {
    return { error: "Correo o contraseña incorrectos." };
  }

  await crearSesion({
    usuarioId: usuario.id,
    rol: usuario.rol,
    albergueId: usuario.albergueId,
  });
  redirect("/panel");
}

export async function salir(): Promise<void> {
  await cerrarSesion();
  redirect("/login");
}