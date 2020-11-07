import Contenido from "./Contenido";

export default class Parrafo extends Contenido {
    constructor(texto: string) {
        super();
        this._texto = texto;
    }

    private _texto: string;

    get texto(): string {
        return this._texto;
    }

    set texto(value: string) {
        this._texto = value;
    }
}