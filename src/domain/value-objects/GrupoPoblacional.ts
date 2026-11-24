export const GRUPOS_POBLACIONALES = [
  "indigena",
  "afrodescendiente",
  "lgbtiq",
  "madre-soltera",
  "persona-vulnerable",
  "adulto-mayor",
  "ninguno",
] as const;

export type GrupoPoblacional = (typeof GRUPOS_POBLACIONALES)[number];

export const ETIQUETA_GRUPO: Record<GrupoPoblacional, string> = {
  indigena: "Indígena",
  afrodescendiente: "Afrodescendiente",
  lgbtiq: "LGBTIQ+",
  "madre-soltera": "Madre soltera",
  "persona-vulnerable": "Persona vulnerable",
  "adulto-mayor": "Adulto mayor",
  ninguno: "Prefiero no indicarlo",
};

export function esGrupoPoblacional(texto: string): texto is GrupoPoblacional {
  return (GRUPOS_POBLACIONALES as readonly string[]).includes(texto);
}