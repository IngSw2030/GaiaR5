import Reconocimiento from "@entidades/Reconocimiento";

export default class Avatar extends Reconocimiento{
    constructor(imagen: string) {
        super();
        this.imagen = imagen;
    }
}