"use server";

import { RepositorioSolicitudesPrisma } from "@/repositories/RepositorioSolicitudesPrisma";
import { RepositorioUsuariosPrisma } from "@/repositories/RepositorioUsuariosPrisma";
import { SolicitudesServicio } from "@/services/SolicitudesServicio";

export interface EstadoRegistro {
  error: string | null;
  mensaje: string | null;
}

export async function solicitarRegistro(
  _estadoPrevio: EstadoRegistro,
  formulario: FormData,
): Promise<EstadoRegistro> {
  const servicio = new SolicitudesServicio(
    new RepositorioSolicitudesPrisma(),
    new RepositorioUsuariosPrisma(),
  );

  try {
    await servicio.registrar({
      nombre: String(formulario.get("nombre") ?? ""),
      direccion: String(formulario.get("direccion") ?? ""),
      capacidad: Number(formulario.get("capacidad")),
      correo: String(formulario.get("correo") ?? ""),
      contrasena: String(formulario.get("contrasena") ?? ""),
    });
  } catch (error) {
    const mensaje =
      error instanceof Error ? error.message : "No se pudo enviar la solicitud.";
    return { error: mensaje, mensaje: null };
  }

  return {
    error: null,
    mensaje:
      "Solicitud enviada. Cuando un administrador la apruebe podrás iniciar sesión.",
  };
}