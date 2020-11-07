export default class Comentario{
    public texto: string;
    public likes: number;

    constructor(texto: string, likes: number) {
        this.texto = texto;
        this.likes = likes;
    }
}