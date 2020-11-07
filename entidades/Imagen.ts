import Media from "./Media";

export default class Imagen extends Media{
    public enlaceImagen: string;

    constructor(alto: number, ancho: number, enlaceImagen: string) {
        super(alto, ancho);
        this.enlaceImagen = enlaceImagen;
    }
}