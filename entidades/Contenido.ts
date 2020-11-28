export enum TipoContenido {
    PARRAFO,
    IMAGEN,
    VIDEO
}

export default class Contenido{
    tipo: TipoContenido;
    texto: string;
    enlace: string;

    constructor(tipo: TipoContenido, texto: string, enlace: string) {
        this.tipo = tipo;
        this.texto = texto;
        this.enlace = enlace;
    }
}