"use server";

import { revalidatePath } from "next/cache";
import { exigirAdministrador } from "@/lib/acceso";
import { RepositorioAfectacionesPrisma } from "@/repositories/RepositorioAfectacionesPrisma";
import { AfectacionesServicio } from "@/services/AfectacionesServicio";

export async function ajustarEstrategia(formulario: FormData): Promise<void> {
  const admin = await exigirAdministrador();
  await new AfectacionesServicio(
    new RepositorioAfectacionesPrisma(),
  ).ajustarEstrategia(
    admin,
    String(formulario.get("id")),
    String(formulario.get("estrategia")),
  );

  revalidatePath("/evaluacion");
  revalidatePath("/afectaciones");
}