import CentroAcopio from "@entidades/CentroAcopio";
import Usuario from "@entidades/Usuario";

export default interface IDBAdaptador {
    obtenerNodosPorEtiqueta(etiquetaNodo, filtro): Record<any, any>[];

    obtenerNodosPorRelacion(etiquedaNodoOrigen, etiquetaRelacion, etiquetaNodoDestino): Record<any, any>;

    obtenerCentrosPorRecurso(recurso: string): Promise<CentroAcopio[]>;

    obtenerRecursos(): Promise<string[]>;

    crearUsuario(usuario: Usuario): Promise<Usuario>;

    obtenerUsuario(): Promise<any>;

    asignarSemillasUsuario(): Promise<number>;

}