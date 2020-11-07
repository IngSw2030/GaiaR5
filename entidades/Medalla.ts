import Reconocimiento from "@entidades/Reconocimiento";

export default class Medalla extends Reconocimiento{

    constructor(imagen:string) {
        super();
        this.imagen = imagen;
    }
}