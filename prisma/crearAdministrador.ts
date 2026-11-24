import "dotenv/config";
import { Correo } from "../src/domain/value-objects/Correo";
import { cifrarContrasenaNueva } from "../src/lib/contrasenas";
import { prisma } from "../src/lib/prisma";

async function crearAdministrador(): Promise<void> {
  const [textoCorreo, contrasena] = process.argv.slice(2);
  if (!textoCorreo || !contrasena) {
    throw new Error("Uso: npx tsx prisma/crearAdministrador.ts correo contrasena");
  }

  const correo = Correo.crear(textoCorreo);
  const existente = await prisma.usuario.findUnique({
    where: { correo: correo.texto },
  });
  if (existente) {
    throw new Error("Ya existe un usuario con ese correo.");
  }

  const contrasenaHash = await cifrarContrasenaNueva(contrasena);
  await prisma.usuario.create({
    data: { correo: correo.texto, contrasenaHash, rol: "administrador" },
  });
  console.log(`Administrador creado: ${correo.texto}`);
}

crearAdministrador()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());