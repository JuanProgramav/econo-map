"use server";

import { redirect } from "next/navigation";
import { rutaInicialDe } from "@/lib/rutas";
import { crearSesion } from "@/lib/sesion";
import { RepositorioUsuariosPrisma } from "@/repositories/RepositorioUsuariosPrisma";
import { AutenticacionServicio } from "@/services/AutenticacionServicio";
import { CiudadanosServicio } from "@/services/CiudadanosServicio";

export interface EstadoCuenta {
  error: string | null;
}

export async function crearCuenta(
  _estadoPrevio: EstadoCuenta,
  formulario: FormData,
): Promise<EstadoCuenta> {
  const correo = String(formulario.get("correo") ?? "");
  const contrasena = String(formulario.get("contrasena") ?? "");
  const repositorio = new RepositorioUsuariosPrisma();

  try {
    await new CiudadanosServicio(repositorio).registrar(correo, contrasena);
  } catch (error) {
    const mensaje =
      error instanceof Error ? error.message : "No se pudo crear la cuenta.";
    return { error: mensaje };
  }

  const usuario = await new AutenticacionServicio(repositorio).iniciarSesion(
    correo,
    contrasena,
  );
  if (!usuario) {
    return { error: "Cuenta creada. Inicia sesión para continuar." };
  }

  await crearSesion({
    usuarioId: usuario.id,
    rol: usuario.rol,
    albergueId: usuario.albergueId,
  });
  redirect(rutaInicialDe(usuario.rol));
}