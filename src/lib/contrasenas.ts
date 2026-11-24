import bcrypt from "bcryptjs";

const LARGO_MINIMO_CONTRASENA = 8;
const VUELTAS_DE_CIFRADO = 10;

export async function cifrarContrasenaNueva(contrasena: string): Promise<string> {
  if (contrasena.length < LARGO_MINIMO_CONTRASENA) {
    throw new Error(
      `La contraseña debe tener al menos ${LARGO_MINIMO_CONTRASENA} caracteres.`,
    );
  }
  return bcrypt.hash(contrasena, VUELTAS_DE_CIFRADO);
}