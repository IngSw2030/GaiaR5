export default class Comentario{
    private _texto: string;
    private _likes: number;

    constructor(texto: string, likes: number) {
        this._texto = texto;
        this._likes = likes;
    }


    get texto(): string {
        return this._texto;
    }

    set texto(value: string) {
        this._texto = value;
    }

    get likes(): number {
        return this._likes;
    }

    set likes(value: number) {
        this._likes = value;
    }
}