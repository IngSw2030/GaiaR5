export default class Mensaje{
    public fecha: number;
    public autor: string;
    public destinatario: string;
    public mensaje: string;
    public leido: boolean;

    constructor(autor: string, destinatario: string, mensaje: string) {
        this.fecha = Date.now();
        this.autor = autor;
        this.destinatario = destinatario;
        this.mensaje = mensaje;
        this.leido = false;
    }
}