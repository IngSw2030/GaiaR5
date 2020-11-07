import Contenido from "./Contenido";

export default abstract class Media extends Contenido{
    public alto: number;
    public ancho: number;


    protected constructor(alto: number, ancho: number) {
        super();
        this.alto = alto;
        this.ancho = ancho;
    }
}