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