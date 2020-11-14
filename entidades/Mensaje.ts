export default class Mensaje{
    public fecha: Date;
    public hora: Date;

    constructor(fecha: Date, hora: Date) {
        this.fecha = fecha;
        this.hora = hora;
    }
}