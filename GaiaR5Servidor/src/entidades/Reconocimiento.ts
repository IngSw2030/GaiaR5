export default abstract class Reconocimiento{
    private _imagen: string;

    get imagen(): string {
        return this._imagen;
    }

    set imagen(value: string) {
        this._imagen = value;
    }
}