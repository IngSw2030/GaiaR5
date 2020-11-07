import Media from "@entidades/Media";

export default class Imagen extends Media{
    private _enlaceImagen: string;

    constructor(alto: number, ancho: number, enlaceImagen: string) {
        super(alto, ancho);
        this._enlaceImagen = enlaceImagen;
    }

    get enlaceImagen(): string {
        return this._enlaceImagen;
    }

    set enlaceImagen(value: string) {
        this._enlaceImagen = value;
    }
}