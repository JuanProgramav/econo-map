export interface RepositorioReportes {
  registrar(albergueId: string, personas: number): Promise<void>;
}