import Comentario from "@entidades/Comentario";
import Contenido from "@entidades/Contenido";

export default class Post{
    private _creador: string;
    private _publicacion: number;
    private _titulo:string;
    private _tags: string[];
    private _likes:number = 0;
    private _comentarios: Comentario[] = [];
    private _contenido: Contenido[] = [];

    constructor(creador: string, publicacion: number, titulo: string, tags: string[], likes?: number, comentarios?: [], contenido?: []) {
        this._creador = creador;
        this._publicacion = publicacion;
        this._titulo = titulo;
        this._tags = tags;
        this._likes = likes? likes : 0;
        this._comentarios = comentarios? comentarios : [];
        this._contenido = contenido? contenido : [];
    }

    get creador(): string {
        return this._creador;
    }

    set creador(value: string) {
        this._creador = value;
    }

    get publicacion(): number {
        return this._publicacion;
    }

    set publicacion(value: number) {
        this._publicacion = value;
    }

    get titulo(): string {
        return this._titulo;
    }

    set titulo(value: string) {
        this._titulo = value;
    }

    get tags(): string[] {
        return this._tags;
    }

    set tags(value: string[]) {
        this._tags = value;
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