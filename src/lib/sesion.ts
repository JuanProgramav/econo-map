import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const NOMBRE_COOKIE = "economap_sesion";
const DURACION_EN_HORAS = 8;

export interface DatosSesion {
  usuarioId: string;
  rol: string;
  albergueId: string | null;
}

function obtenerClave(): Uint8Array {
  const secreto = process.env.SESSION_SECRET;
  if (!secreto || secreto.length < 32) {
    throw new Error("Falta SESSION_SECRET (mínimo 32 caracteres) en el .env.");
  }
  return new TextEncoder().encode(secreto);
}

export async function crearSesion(datos: DatosSesion): Promise<void> {
  const token = await new SignJWT({ ...datos })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${DURACION_EN_HORAS}h`)
    .sign(obtenerClave());

  const almacen = await cookies();
  almacen.set(NOMBRE_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: DURACION_EN_HORAS * 3600,
    path: "/",
  });
}

export async function leerSesion(): Promise<DatosSesion | null> {
  const almacen = await cookies();
  const token = almacen.get(NOMBRE_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, obtenerClave());
    return {
      usuarioId: String(payload.usuarioId),
      rol: String(payload.rol),
      albergueId: payload.albergueId ? String(payload.albergueId) : null,
    };
  } catch {
    return null;
  }
}

export async function cerrarSesion(): Promise<void> {
  const almacen = await cookies();
  almacen.delete(NOMBRE_COOKIE);
}