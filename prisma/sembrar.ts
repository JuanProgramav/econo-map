import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

const HORAS_DOS_DIAS = 48;
const MILISEGUNDOS_POR_HORA = 3_600_000;
const CONTRASENA_DE_PRUEBA = "Prueba123";
const VUELTAS_DE_CIFRADO = 10;

async function sembrar() {
  const haceDosDias = new Date(
    Date.now() - HORAS_DOS_DIAS * MILISEGUNDOS_POR_HORA,
  );

  await prisma.reporteDiario.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.albergue.deleteMany();

  await prisma.albergue.createMany({
    data: [
      { nombre: "Coliseo del Pueblo", direccion: "Cra. 5 con Calle 5, Cali", capacidad: 200, ocupadas: 120, aprobado: true },
      { nombre: "Colegio Santa Librada", direccion: "Calle 8 # 28-30, Cali", capacidad: 150, ocupadas: 140, aprobado: true },
      { nombre: "Polideportivo Aguablanca", direccion: "Diagonal 26 # 72-00, Cali", capacidad: 100, ocupadas: 80, aprobado: true, ultimaActualizacion: haceDosDias },
    ],
  });

  const coliseo = await prisma.albergue.findFirstOrThrow({
    where: { nombre: "Coliseo del Pueblo" },
  });
  const hash = await bcrypt.hash(CONTRASENA_DE_PRUEBA, VUELTAS_DE_CIFRADO);

  await prisma.usuario.createMany({
    data: [
      { correo: "admin@economap.co", contrasenaHash: hash, rol: "administrador" },
      { correo: "coliseo@economap.co", contrasenaHash: hash, rol: "responsable", albergueId: coliseo.id },
    ],
  });
}

sembrar()
  .then(() => console.log("Datos de ejemplo creados."))
  .finally(() => prisma.$disconnect());