import Contenido from "./Contenido";

export default class Parrafo extends Contenido {
    public texto: string;

    constructor(texto: string) {
        super();
        this.texto = texto;
    }
}