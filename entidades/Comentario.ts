export default class Comentario {
    public autor: string;
    public texto: string;
    public publicacion: number;

    constructor(autor: string, texto: string, publicacion: number) {
        this.autor = autor;
        this.texto = texto;
        this.publicacion = publicacion;
    }

    public static hidratar(json: any): Comentario {
        return new Comentario(
            json.autor,
            json.texto,
            json.publicacion
        );
    }
}