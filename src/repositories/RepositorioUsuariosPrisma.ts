import { AdministradorGeneral } from "@/domain/entities/AdministradorGeneral";
import { ResponsableAlbergue } from "@/domain/entities/ResponsableAlbergue";
import { Usuario } from "@/domain/entities/Usuario";
import { Correo } from "@/domain/value-objects/Correo";
import { prisma } from "@/lib/prisma";
import { RepositorioUsuarios } from "@/repositories/RepositorioUsuarios";

interface FilaUsuario {
  id: string;
  correo: string;
  contrasenaHash: string;
  rol: string;
  albergueId: string | null;
}

function aEntidad(fila: FilaUsuario): Usuario {
  const datos = {
    id: fila.id,
    correo: Correo.crear(fila.correo),
    contrasenaHash: fila.contrasenaHash,
  };

  if (fila.rol === "administrador") {
    return new AdministradorGeneral(datos);
  }
  if (!fila.albergueId) {
    throw new Error("Un responsable debe tener un albergue asignado.");
  }
  return new ResponsableAlbergue(datos, fila.albergueId);
}

export class RepositorioUsuariosPrisma implements RepositorioUsuarios {
  async buscarPorCorreo(correo: Correo): Promise<Usuario | null> {
    const fila = await prisma.usuario.findUnique({
      where: { correo: correo.texto },
    });
    return fila ? aEntidad(fila) : null;
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    const fila = await prisma.usuario.findUnique({ where: { id } });
    return fila ? aEntidad(fila) : null;
  }
}