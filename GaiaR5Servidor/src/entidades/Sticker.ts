import Contenido from "@entidades/Contenido";

export default class Sticker extends Contenido{
    private _imagen: string;
    private _precio: number;

    constructor(imagen: string, precio: number) {
        super();
        this._imagen = imagen;
        this._precio = precio;
    }


    get imagen(): string {
        return this._imagen;
    }

    set imagen(value: string) {
        this._imagen = value;
    }

    get precio(): number {
        return this._precio;
    }

    set precio(value: number) {
        this._precio = value;
    }
}