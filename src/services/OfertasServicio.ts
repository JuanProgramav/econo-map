import { OfertaEmpleo } from "@/domain/entities/OfertaEmpleo";
import { Usuario } from "@/domain/entities/Usuario";
import { esGrupoPoblacional } from "@/domain/value-objects/GrupoPoblacional";
import { RepositorioOfertas } from "@/repositories/RepositorioOfertas";

export interface DatosOferta {
  titulo: string;
  empresa: string;
  descripcion: string;
  cupos: number;
  grupo: string;
}

export class OfertasServicio {
  constructor(private readonly repositorio: RepositorioOfertas) {}

  listarActivas(): Promise<OfertaEmpleo[]> {
    return this.repositorio.listarActivas();
  }

  async publicar(admin: Usuario, datos: DatosOferta): Promise<void> {
    this.exigirPermiso(admin);

    const titulo = datos.titulo.trim();
    const empresa = datos.empresa.trim();
    const descripcion = datos.descripcion.trim();
    if (titulo === "" || empresa === "" || descripcion === "") {
      throw new Error("Completa el título, la empresa y la descripción.");
    }
    if (!Number.isInteger(datos.cupos) || datos.cupos <= 0) {
      throw new Error("Los cupos deben ser un número entero mayor que cero.");
    }
    if (!esGrupoPoblacional(datos.grupo)) {
      throw new Error("El grupo prioritario no es válido.");
    }

    await this.repositorio.registrar({
      titulo,
      empresa,
      descripcion,
      cupos: datos.cupos,
      grupoPrioritario: datos.grupo,
    });
  }

  async cerrar(admin: Usuario, id: string): Promise<void> {
    this.exigirPermiso(admin);
    await this.repositorio.cerrar(id);
  }

  private exigirPermiso(usuario: Usuario): void {
    if (!usuario.puedeGestionarEmpleo()) {
      throw new Error("No tienes permiso para gestionar ofertas.");
    }
  }
}