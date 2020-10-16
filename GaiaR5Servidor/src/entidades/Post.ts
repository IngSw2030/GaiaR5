import Comentario from "@entidades/Comentario";
import Contenido from "@entidades/Contenido";

export default class Post{
    private _titulo:string;
    private _likes:number;
    private _comentarios: Comentario[];
    private _contenido: Contenido[];

    constructor(titulo: string, likes: number, comentarios: Comentario[], contenido: Contenido[]) {
        this._titulo = titulo;
        this._likes = likes;
        this._comentarios = comentarios;
        this._contenido = contenido;
    }

    get titulo(): string {
        return this._titulo;
    }

    set titulo(value: string) {
        this._titulo = value;
    }

    get likes(): number {
        return this._likes;
    }

    set likes(value: number) {
        this._likes = value;
    }

    get comentarios(): Comentario[] {
        return this._comentarios;
    }

    set comentarios(value: Comentario[]) {
        this._comentarios = value;
    }

    get contenido(): Contenido[] {
        return this._contenido;
    }

    set contenido(value: Contenido[]) {
        this._contenido = value;
    }
}