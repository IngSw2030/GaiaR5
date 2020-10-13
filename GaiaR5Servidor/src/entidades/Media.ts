import Contenido from "@entidades/Contenido";

export default abstract class Media extends Contenido{
    private _alto: number;
    private _ancho: number;


    protected constructor(alto: number, ancho: number) {
        super();
        this._alto = alto;
        this._ancho = ancho;
    }

    get alto(): number {
        return this._alto;
    }

    set alto(value: number) {
        this._alto = value;
    }

    get ancho(): number {
        return this._ancho;
    }

    set ancho(value: number) {
        this._ancho = value;
    }
}