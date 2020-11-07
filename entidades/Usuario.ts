import Post from "./Post";
import Buzon from "./Buzon";

export default class Usuario{
    nombre:string = "";
    cedula:string = "";
    semillas: number = 0;
    pass: string = "";
    posts: Post[] = [];
    seguidos: Usuario[] = [];
    buzon: Buzon | undefined = undefined;

    constructor(nombre: string, cedula: string, semillas: number) {
        this.nombre = nombre;
        this.cedula = cedula;
        this.semillas = semillas;
    }
}