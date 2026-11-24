export const TIPOS_AFECTACION = ["vivienda", "empleo", "local"] as const;

export type TipoAfectacion = (typeof TIPOS_AFECTACION)[number];

export const ETIQUETA_TIPO: Record<TipoAfectacion, string> = {
  vivienda: "Vivienda",
  empleo: "Empleo",
  local: "Local o negocio",
};

export function esTipoAfectacion(texto: string): texto is TipoAfectacion {
  return (TIPOS_AFECTACION as readonly string[]).includes(texto);
}