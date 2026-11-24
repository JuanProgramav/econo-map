"use server";

import { redirect } from "next/navigation";
import { rutaInicialDe } from "@/lib/rutas";
import { cerrarSesion, crearSesion } from "@/lib/sesion";
import { RepositorioSolicitudesPrisma } from "@/repositories/RepositorioSolicitudesPrisma";
import { RepositorioUsuariosPrisma } from "@/repositories/RepositorioUsuariosPrisma";
import { AutenticacionServicio } from "@/services/AutenticacionServicio";

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

  if (usuario.albergueId) {
    const aprobado = await new RepositorioSolicitudesPrisma().estaAprobado(
      usuario.albergueId,
    );
    if (!aprobado) {
      return { error: "Tu albergue todavía está pendiente de aprobación." };
    }
  }

  await crearSesion({
    usuarioId: usuario.id,
    rol: usuario.rol,
    albergueId: usuario.albergueId,
  });
  redirect(rutaInicialDe(usuario.rol));
}

export async function salir(): Promise<void> {
  await cerrarSesion();
  redirect("/login");
}