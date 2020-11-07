import Sticker from "@entidades/Sticker";
import Reconocimiento from "@entidades/Reconocimiento";
import Post from "@entidades/Post";
import Buzon from "@entidades/Buzon";
import Ubicacion from "@entidades/Ubicacion";

export default class Usuario{
    nombre:string = "";
    cedula:string = "";
    semillas: number = 0;
    pass: string = "";
    stickers: Sticker[] = [];
    reconocimientos: Reconocimiento[] = [];
    posts: Post[] = [];
    seguidos: Usuario[] = [];
    buzon: Buzon = undefined;
    ubicacion: Ubicacion = undefined;

    constructor(nombre: string, cedula: string, semillas: number) {
        this.nombre = nombre;
        this.cedula = cedula;
        this.semillas = semillas;
    }
}