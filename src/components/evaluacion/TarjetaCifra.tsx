interface TarjetaCifraProps {
  titulo: string;
  valor: string;
  detalle?: string;
}

export function TarjetaCifra({ titulo, valor, detalle }: TarjetaCifraProps) {
  return (
    <article className="rounded-xl border border-border bg-surface p-4">
      <p className="text-sm text-muted">{titulo}</p>
      <p className="mt-1 text-2xl font-bold text-strong">{valor}</p>
      {detalle && <p className="mt-1 text-xs text-muted">{detalle}</p>}
    </article>
  );
}