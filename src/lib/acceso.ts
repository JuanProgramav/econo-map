import { redirect } from "next/navigation";
import { Usuario } from "@/domain/entities/Usuario";
import { leerSesion } from "@/lib/sesion";
import { RepositorioSolicitudesPrisma } from "@/repositories/RepositorioSolicitudesPrisma";
import { RepositorioUsuariosPrisma } from "@/repositories/RepositorioUsuariosPrisma";

export async function exigirUsuario(): Promise<Usuario> {
  const sesion = await leerSesion();
  if (!sesion) redirect("/login");

  const usuario = await new RepositorioUsuariosPrisma().buscarPorId(
    sesion.usuarioId,
  );
  if (!usuario) redirect("/login");

  if (usuario.albergueId) {
    const aprobado = await new RepositorioSolicitudesPrisma().estaAprobado(
      usuario.albergueId,
    );
    if (!aprobado) redirect("/login");
  }

  return usuario;
}

export async function exigirAdministrador(): Promise<Usuario> {
  const usuario = await exigirUsuario();
  if (!usuario.puedeAprobarAlbergues()) redirect("/panel");
  return usuario;
}