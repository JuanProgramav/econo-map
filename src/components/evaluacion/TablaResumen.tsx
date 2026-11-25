import { LineaResumen } from "@/domain/entities/ResumenEvaluacion";
import { formatearPesos } from "@/lib/formato";

interface TablaResumenProps {
  titulo: string;
  encabezado: string;
  lineas: LineaResumen[];
}

export function TablaResumen({ titulo, encabezado, lineas }: TablaResumenProps) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-lg font-semibold text-strong">{titulo}</h2>
      {lineas.length === 0 ? (
        <p className="text-muted">Todavía no hay casos aprobados.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">{encabezado}</th>
                <th className="px-4 py-3 font-medium">Casos</th>
                <th className="px-4 py-3 font-medium">Pérdida</th>
                <th className="px-4 py-3 font-medium">Apoyo</th>
                <th className="px-4 py-3 font-medium">Cubierto</th>
              </tr>
            </thead>
            <tbody>
              {lineas.map((linea) => (
                <tr key={linea.etiqueta} className="border-t border-border">
                  <td className="px-4 py-3 text-foreground">{linea.etiqueta}</td>
                  <td className="px-4 py-3 text-foreground">{linea.casos}</td>
                  <td className="px-4 py-3 text-foreground">
                    {formatearPesos(linea.perdida)}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {formatearPesos(linea.apoyo)}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {linea.porcentajeCubierto}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}