import Link from "next/link";
import { TablaResumen } from "@/components/evaluacion/TablaResumen";
import { TarjetaAjuste } from "@/components/evaluacion/TarjetaAjuste";
import { TarjetaCifra } from "@/components/evaluacion/TarjetaCifra";
import { exigirAdministrador } from "@/lib/acceso";
import { formatearPesos } from "@/lib/formato";
import { RepositorioAfectacionesPrisma } from "@/repositories/RepositorioAfectacionesPrisma";
import { AfectacionesServicio } from "@/services/AfectacionesServicio";
import { EvaluacionServicio } from "@/services/EvaluacionServicio";

export const dynamic = "force-dynamic";

export default async function PaginaEvaluacion() {
  const admin = await exigirAdministrador();
  const afectaciones = await new AfectacionesServicio(
    new RepositorioAfectacionesPrisma(),
  ).listarTodas(admin);

  const resumen = new EvaluacionServicio().resumir(afectaciones);
  const aprobadas = afectaciones.filter((a) => a.estado === "aprobada");

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-strong">Evaluación</h1>
        <Link href="/admin" className="text-sm text-muted hover:text-foreground">
          Volver al panel
        </Link>
      </div>
      <p className="mt-2 text-sm text-muted">
        Medición de las afectaciones y del apoyo asignado.
      </p>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <TarjetaCifra
          titulo="Casos registrados"
          valor={String(resumen.totalCasos)}
          detalle={`${resumen.pendientes} pendientes · ${resumen.rechazadas} rechazados`}
        />
        <TarjetaCifra
          titulo="Casos aprobados"
          valor={String(resumen.aprobadas)}
        />
        <TarjetaCifra
          titulo="Pérdida aprobada"
          valor={formatearPesos(resumen.perdidaAprobada)}
        />
        <TarjetaCifra
          titulo="Apoyo asignado"
          valor={formatearPesos(resumen.apoyoTotal)}
          detalle={`${resumen.porcentajeCubierto}% de la pérdida`}
        />
      </section>

      <TablaResumen
        titulo="Por grupo poblacional"
        encabezado="Grupo"
        lineas={resumen.porGrupo}
      />
      <TablaResumen
        titulo="Por estrategia"
        encabezado="Estrategia"
        lineas={resumen.porEstrategia}
      />

      <section className="mt-10 flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-strong">
          Ajustes: cambiar la estrategia de un caso
        </h2>
        {aprobadas.length === 0 ? (
          <p className="text-muted">No hay casos aprobados para ajustar.</p>
        ) : (
          aprobadas.map((afectacion) => (
            <TarjetaAjuste key={afectacion.id} afectacion={afectacion} />
          ))
        )}
      </section>
    </main>
  );
}