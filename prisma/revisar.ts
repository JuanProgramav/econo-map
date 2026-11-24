import { prisma } from "../src/lib/prisma";

async function revisar() {
  const albergues = await prisma.albergue.findMany({
    include: { usuarios: true },
  });

  for (const albergue of albergues) {
    const correos = albergue.usuarios.map((u) => u.correo).join(", ");
    console.log(
      `${albergue.nombre} | aprobado: ${albergue.aprobado} | usuarios: ${correos || "ninguno"}`,
    );
  }
}

revisar().finally(() => prisma.$disconnect());