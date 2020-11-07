import Usuario from "./Usuario";

export default class Chat {
    public receptor: Usuario;
    public mensajes: Chat[];

    constructor(receptor: Usuario, mensajes: Chat[]) {
        this.receptor = receptor;
        this.mensajes = mensajes;
    }
}