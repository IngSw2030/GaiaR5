import Comentario from "./Comentario";
import Contenido from "./Contenido";

export default class Post{
    public creador: string;
    public publicacion: number;
    public titulo:string;
    public tags: string[];
    public likes:number = 0;
    public comentarios: Comentario[] = [];
    public contenido: Contenido[] = [];

    constructor(creador: string, publicacion: number, titulo: string, tags: string[], likes?: number, comentarios?: [], contenido?: []) {
        this.creador = creador;
        this.publicacion = publicacion;
        this.titulo = titulo;
        this.tags = tags;
        this.likes = likes? likes : 0;
        this.comentarios = comentarios? comentarios : [];
        this.contenido = contenido? contenido : [];
    }

    public static hidratar(json:any):Post{
        return new Post(json.creador, json.publicacion, json.titulo, json.tags, json.likes, json.comentarios, json.contenido);
    }
}