import { Afectacion } from "@/domain/entities/Afectacion";
import { Usuario } from "@/domain/entities/Usuario";
import { obtenerEstrategia } from "@/domain/strategies/CatalogoEstrategias";
import { esGrupoPoblacional } from "@/domain/value-objects/GrupoPoblacional";
import { esTipoAfectacion } from "@/domain/value-objects/TipoAfectacion";
import { RepositorioAfectaciones } from "@/repositories/RepositorioAfectaciones";

export interface DatosAfectacion {
  tipo: string;
  descripcion: string;
  grupo: string;
  perdidaEstimada: number;
}

export class AfectacionesServicio {
  constructor(private readonly repositorio: RepositorioAfectaciones) {}

  async registrar(usuario: Usuario, datos: DatosAfectacion): Promise<void> {
    if (!usuario.puedeRegistrarAfectaciones()) {
      throw new Error("Tu cuenta no puede registrar afectaciones.");
    }

    const descripcion = datos.descripcion.trim();
    if (descripcion === "") {
      throw new Error("Describe brevemente lo que perdiste.");
    }
    if (!esTipoAfectacion(datos.tipo)) {
      throw new Error("El tipo de afectación no es válido.");
    }
    if (!esGrupoPoblacional(datos.grupo)) {
      throw new Error("El grupo poblacional no es válido.");
    }
    if (!Number.isInteger(datos.perdidaEstimada) || datos.perdidaEstimada <= 0) {
      throw new Error("La pérdida estimada debe ser un valor entero mayor que cero.");
    }

    await this.repositorio.registrar({
      usuarioId: usuario.id,
      tipo: datos.tipo,
      descripcion,
      grupo: datos.grupo,
      perdidaEstimada: datos.perdidaEstimada,
    });
  }

  listarDe(usuario: Usuario): Promise<Afectacion[]> {
    return this.repositorio.listarDeUsuario(usuario.id);
  }

  listarPendientes(admin: Usuario): Promise<Afectacion[]> {
    this.exigirGestion(admin);
    return this.repositorio.listarPendientes();
  }

  listarTodas(admin: Usuario): Promise<Afectacion[]> {
    this.exigirGestion(admin);
    return this.repositorio.listarTodas();
  }

  async aprobar(
    admin: Usuario,
    afectacionId: string,
    claveEstrategia: string,
  ): Promise<void> {
    this.exigirGestion(admin);
    const afectacion = await this.buscarConEstado(afectacionId, "pendiente");
    await this.asignarEstrategia(afectacion, claveEstrategia);
  }

  async ajustarEstrategia(
    admin: Usuario,
    afectacionId: string,
    claveEstrategia: string,
  ): Promise<void> {
    this.exigirGestion(admin);
    const afectacion = await this.buscarConEstado(afectacionId, "aprobada");
    await this.asignarEstrategia(afectacion, claveEstrategia);
  }

  async rechazar(admin: Usuario, afectacionId: string): Promise<void> {
    this.exigirGestion(admin);
    const afectacion = await this.buscarConEstado(afectacionId, "pendiente");

    await this.repositorio.resolver(afectacion.id, {
      estado: "rechazada",
      estrategia: null,
      apoyoAsignado: null,
    });
  }

  private async asignarEstrategia(
    afectacion: Afectacion,
    claveEstrategia: string,
  ): Promise<void> {
    const estrategia = obtenerEstrategia(claveEstrategia);

    await this.repositorio.resolver(afectacion.id, {
      estado: "aprobada",
      estrategia: estrategia.clave,
      apoyoAsignado: estrategia.calcularApoyo(afectacion.perdidaEstimada),
    });
  }

  private async buscarConEstado(
    id: string,
    estado: Afectacion["estado"],
  ): Promise<Afectacion> {
    const afectacion = await this.repositorio.buscarPorId(id);
    if (!afectacion || afectacion.estado !== estado) {
      throw new Error("La afectación no existe o no está en el estado esperado.");
    }
    return afectacion;
  }

  private exigirGestion(usuario: Usuario): void {
    if (!usuario.puedeGestionarAfectaciones()) {
      throw new Error("No tienes permiso para gestionar afectaciones.");
    }
  }
}