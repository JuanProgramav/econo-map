const RUTA_POR_ROL: Record<string, string> = {
  administrador: "/admin",
  responsable: "/panel",
  ciudadano: "/afectaciones",
};

export function rutaInicialDe(rol: string): string {
  return RUTA_POR_ROL[rol] ?? "/login";
}