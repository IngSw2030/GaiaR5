import Post from "./Post";
import Buzon from "./Buzon";

export default class Usuario{
    public nombre:string = "";
    public cedula:string = "";
    public email:string = "";
    public semillas: number = 0;
    public pass: string = "";
    public posts: Post[] = [];
    public seguidos: Usuario[] = [];
    public buzon: Buzon | undefined = undefined;

    constructor(nombre: string, cedula: string, email: string) {
        this.nombre = nombre;
        this.cedula = cedula;
        this.email = email;
    }
}