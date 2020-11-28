import SuperControlador from "../SuperControlador";
import IControlador from "../IControlador";
import Controlador from "../Controlador";
import {Express} from "express";
import {Comentario, Post, Contenido} from "../../../../entidades";
import DB from "../../db";
import EndPoint, {metodoEnum} from "../EndPoint";
import Autentificacion, {Payload} from "../../servicios/Autentificacion";
import {int as neo4jInt} from 'neo4j-driver'
import Like from "../../../../entidades/Interfaces TypeScript/Like";
import Reporte from "../../../../entidades/Interfaces TypeScript/Reporte";

export default class ControladorPost extends SuperControlador implements IControlador {

    constructor(path: string) {
        super(path);
        this.endpoints = [
            new EndPoint(
                "post",
                metodoEnum.POST,
                async (req, res) => {
                    try {
                        console.log(req.headers);
                        let token: Payload = Autentificacion.verificar(req);
                        let estado = (await this.crearPost(Post.hidratar(req.body), token.cedula)) ? 200 : 500;
                        res.sendStatus(estado);
                    } catch (e) {
                        console.log(e);
                        res.sendStatus(403);
                    }
                }
            ),
            new EndPoint(
                "post",
                metodoEnum.GET,
                async (req, res) => {
                    let {titulo, tags} = req.query;
                    if (titulo !== undefined) {
                        try {
                            res.send(await this.buscarPostsPorTitulo(<string>titulo));
                        } catch (e) {
                            res.sendStatus(500);
                        }
                    } else if (tags !== undefined) {
                        try {
                            res.send(await this.buscarPostsPorTags(<Array<string>>tags));
                        } catch (e) {
                            res.sendStatus(500);
                        }
                    } else {
                        res.sendStatus(400);
                    }
                }
            ),
            new EndPoint(
                "post",
                metodoEnum.PATCH,
                async (req, res) => {
                    try {
                        let {postActual, postNuevo} = req.body;
                        Autentificacion.verificar(req);
                        await this.editarPost(Post.hidratar(postActual), Post.hidratar(postNuevo))
                        res.sendStatus(200);
                    } catch (e) {
                        if (e.message == "Token invalido") {
                            res.sendStatus(403);
                        } else {
                            res.sendStatus(500);
                        }
                    }
                }
            ),
            new EndPoint(
                "post/tags/popular",
                metodoEnum.GET,
                async (req, res) => {
                    try {
                        res.send(await this.tagsPopulares(Number.parseInt(<string>req.query.top)));
                    } catch (e) {
                        res.sendStatus(500);
                    }
                }
            ),
            new EndPoint(
                "post/like",
                metodoEnum.POST,
                async (req, res) => {
                    try {
                        let {cedula} = Autentificacion.verificar(req);
                        await this.darLike(cedula, Post.hidratar(req.body))
                        res.sendStatus(200);
                    } catch (e) {
                        if (e.message == "Token invalido") {
                            res.sendStatus(403);
                        } else {
                            res.sendStatus(500);
                        }
                    }
                }
            ),
            new EndPoint(
                "post/comentario",
                metodoEnum.POST,
                async (req, res) => {
                    try {
                        let {cedula} = Autentificacion.verificar(req);
                        res.send(await this.comentar(cedula, Post.hidratar(req.body.post), req.body.comentario));
                    } catch (e) {
                        if (e.message == "Token invalido") {
                            res.sendStatus(403);
                        } else {
                            res.sendStatus(500);
                        }
                    }
                }
            ),
            new EndPoint(
                "post/reporte",
                metodoEnum.POST,
                async (req, res) => {
                    try {
                        let {cedula} = Autentificacion.verificar(req);
                        res.send(await this.reportarPost(cedula, Post.hidratar(req.body.post), req.body.reporte));
                    } catch (e) {
                        if (e.message == "Token invalido") {
                            res.sendStatus(403);
                        } else {
                            res.sendStatus(500);
                        }
                    }
                }
            ),
            new EndPoint(
                "post/reportados",
                metodoEnum.GET,
                async (req, res) => {
                    try {
                        let {admin} = Autentificacion.verificar(req);
                        if (admin) {
                            res.send(await this.reportePostsReportados());
                        } else {
                            res.sendStatus(403);
                        }
                    } catch (e) {
                        if (e.message == "Token invalido") {
                            res.sendStatus(403);
                        } else {
                            res.sendStatus(500);
                        }
                    }
                }
            ),
            new EndPoint(
                "post/home",
                metodoEnum.GET,
                async (req, res) => {
                    try {
                        let {cedula} = Autentificacion.verificar(req);
                        res.send(await this.home(cedula));
                    } catch (e) {
                        console.log(e);
                        if (e.message == "Token invalido") {
                            res.sendStatus(403);
                        } else {
                            res.sendStatus(500);
                        }
                    }
                }
            ),
            new EndPoint(
                "post/usuario",
                metodoEnum.GET,
                async (req, res) => {
                    try {
                        res.send(await this.postPorUsuario(<string>req.query.cedula));
                    } catch (e) {
                        console.log(e);
                        res.status(500).send(e);
                    }
                }
            ),
            new EndPoint(
                "post/comentarios",
                metodoEnum.GET,
                async (req, res) => {
                    try {
                        res.send(await this.buscarComentarios(req.query.titulo, req.query.creador));
                    } catch (e) {
                        console.log(e);
                        res.status(500).send(e);
                    }
                }
            )
        ];
    }

    instalar(server: Express, controlador: Controlador): void {
        this.server = server;
        this.controlador = controlador;
        this.exponer();
    }

    private async addContenido(post:Post){
        let contenido = await DB.obtenerInstancia().session.run("MATCH (post:Post{creador: $creador, titulo: $titulo})-[:Contiene]-(c:Contenido) RETURN c ORDER BY c.orden", {
            creador: post.creador,
            titulo: post.titulo
        });
        let contenidoArray = DB.obtenerInstancia().desempacarRegistros(contenido.records, "c");
        post.contenido = contenidoArray;
        return post;
    }

    private async poblarContenido(posts:Post[]){
        for(let post of posts){
            post = await this.addContenido(post);
        }
        return posts;
    }

    public async crearPost(post: Post, cedulaUsuario: string): Promise<boolean> {
        try {
            let contenido = post.contenido;
            delete post.contenido;
            await DB.obtenerInstancia().session.run(
                "MATCH (u:Usuario) WHERE u.cedula = $cedulaUsuario WITH u CREATE (u)-[r:Postea]->(p:Post $post) RETURN p",
                {
                    cedulaUsuario: cedulaUsuario,
                    post: post
                }
            );
            for (let tag of post.tags) {
                await DB.obtenerInstancia().session.run(
                    "MATCH (p:Post {creador: $creador, titulo: $titulo}) MERGE (t:Tag {tag: $tag}) WITH p, t CREATE (p)-[r:MarcadoPor]->(t) ",
                    {
                        creador: cedulaUsuario,
                        titulo: post.titulo,
                        tag: tag
                    }
                );
            }
            let i=0;
            for (let item of contenido) {
                await DB.obtenerInstancia().session.run(
                    "MATCH (p:Post {creador: $creador, titulo: $titulo}) MERGE (c:Contenido{tipo:$tipo, texto:$texto, enlace: $enlace, orden: $orden}) WITH p, c CREATE (p)-[:Contiene]->(c)",
                    {
                        creador: cedulaUsuario,
                        titulo: post.titulo,
                        tipo: item.tipo,
                        texto: item.texto,
                        enlace: item.enlace,
                        orden: i
                    }
                );
                i++;
            }
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    public async buscarPostsPorTitulo(titulo: string) {
        let query = `MATCH (p:Post) WHERE p.titulo =~ '(?i).*${titulo}.*' RETURN p`
        try {
            let respuesta = await DB.obtenerInstancia().session.run(query);
            return (await this.poblarContenido(DB.obtenerInstancia().desempacarRegistros(respuesta.records, "p")));
        } catch (e) {
            throw e;
        }
    }

    public async buscarPostsPorTags(tags: string[]) {
        try {
            let respuesta = await DB.obtenerInstancia().session.run(
                "MATCH (p:Post)-[:MarcadoPor]-(t:Tag) WHERE t.tag IN $tags RETURN DISTINCT p",
                {
                    tags
                }
            );
            return (await this.poblarContenido(DB.obtenerInstancia().desempacarRegistros(respuesta.records, "p")));
        } catch (e) {
            throw e;
        }
    }

    public async tagsPopulares(top: number) {
        try {
            let respuesta = await DB.obtenerInstancia().session.run(
                "MATCH (r:Tag)-[:MarcadoPor]-(:Post) WITH r, COUNT(r) AS c ORDER BY c DESC RETURN r.tag as tag, c LIMIT $top",
                {
                    top: neo4jInt(top)
                }
            );
            return respuesta.records.map((registro) => {
                return {
                    tag: registro.get("tag"),
                    c: registro.get("c").toNumber()
                };
            });
        } catch (e) {
            throw e;
        }
    }

    public async editarPost(postActual: Post, postNuevo: Post) {
        let {creador, titulo} = postActual;
        try {
            delete postActual.contenido;
            delete postNuevo.contenido;
            await DB.obtenerInstancia().session.run(
                "MATCH (p:Post) WHERE p.creador = $creador AND p.titulo = $titulo SET p+=$postNuevo RETURN p",
                {
                    creador,
                    titulo,
                    postNuevo
                }
            );
            let tagsNuevos = postNuevo.tags.filter((tag) => !postActual.tags.includes(tag));
            let tagsEliminados = postActual.tags.filter((tag) => !postNuevo.tags.includes(tag));
            console.log("tagsNuevos", tagsNuevos);
            console.log("tagsEliminados", tagsEliminados);
            for (let tag of tagsNuevos) {
                console.log(tag);
                await DB.obtenerInstancia().session.run(
                    "MATCH (p:Post {creador: $creador, titulo: $titulo}) MERGE (t:Tag {tag: $tag}) WITH p, t CREATE (p)-[r:MarcadoPor]->(t) ",
                    {
                        creador: creador,
                        titulo: titulo,
                        tag: tag
                    }
                );
            }
            for (let tag of tagsEliminados) {
                console.log(tag);
                await DB.obtenerInstancia().session.run(
                    "MATCH (p:Post {creador: $creador, titulo: $titulo})-[r:MarcadoPor]-(t:Tag {tag: $tag}) DELETE r;",
                    {
                        creador: creador,
                        titulo: titulo,
                        tag: tag
                    }
                )
            }
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async darLike(cedula: string, post: Post) {
        let like: Like = {
            autor: cedula,
            fecha: Date.now()
        }
        let query = "MATCH (u:Usuario{cedula:$cedula}), (p:Post{titulo:$titulo, creador:$creador}) WITH u, p CREATE (u)-[l:Like $like]->(p) SET p.likes = p.likes + 1 RETURN l";
        await DB.obtenerInstancia().session.run(query, {
            cedula: cedula,
            titulo: post.titulo,
            creador: post.creador,
            like: like
        });
    }

    async comentar(cedula: string, post: Post, comentario: string) {
        let coment: Comentario;
        coment = new Comentario(cedula, comentario, Date.now());
        let consulta = await DB.obtenerInstancia().session.run("MATCH (p:Post{titulo: $titulo, creador: $creador}), (u:Usuario{cedula: $cedula}) CREATE (u)-[c:Comenta $comentario]->(p) RETURN c", {
            titulo: post.titulo,
            creador: post.creador,
            cedula: cedula,
            comentario: coment
        });
        return DB.obtenerInstancia().desempacarRegistros(consulta.records, "c");
    }

    async reportarPost(cedula: string, post: Post, reporte: string) {
        let reporteObj: Reporte = {
            autor: cedula,
            fecha: Date.now(),
            reporte: reporte,
            solucionado: false
        };
        let consulta = await DB.obtenerInstancia().session.run("MATCH (p:Post{titulo: $titulo, creador: $creador}), (u:Usuario{cedula: $cedula}) CREATE (u)-[r:Reporta $reporte]->(p) RETURN r", {
            titulo: post.titulo,
            creador: post.creador,
            cedula: cedula,
            reporte: reporteObj
        });
        return DB.obtenerInstancia().desempacarRegistros(consulta.records, "r");
    }

    async reportePostsReportados() {
        let query = "MATCH ()-[reporte:Reporta{solucionado:FALSE}]->(post:Post) RETURN reporte, post";
        let consulta = await DB.obtenerInstancia().session.run(query);
        return DB.obtenerInstancia().desempacarRegistros(consulta.records, ["reporte", "post"]);
    }

    async home(cedula: string) {
        let query = "MATCH (usuario:Usuario {cedula: $cedula})-[:Sigue]->(seguido:Usuario)-[:Postea]->(post:Post) RETURN post ORDER BY post.publicacion DESC LIMIT 10";
        let consulta = await DB.obtenerInstancia().session.run(query, {
            cedula
        });
        let postSeguidos = await this.poblarContenido(DB.obtenerInstancia().desempacarRegistros(consulta.records, "post"));
        query = "MATCH (post:Post), (usuario:Usuario {cedula: $cedula})  WHERE NOT (usuario)-[:Sigue]->(:Usuario)-[:Postea]->(:Post) RETURN post ORDER BY post.publicacion DESC LIMIT 10";
        consulta = await DB.obtenerInstancia().session.run(query, {
            cedula
        });
        let postRandom = await this.poblarContenido(DB.obtenerInstancia().desempacarRegistros(consulta.records, "post"));
        let home = [];
        if(postSeguidos){
            home = [...postSeguidos];
        }
        if(postRandom){
            home = [...home, ...postRandom];
        }
        return home;
    }

    async postPorUsuario(cedula: string){
        let query = "MATCH (usuario:Usuario{cedula:$cedula})-[:Postea]-(post:Post) RETURN post";
        let consulta = await DB.obtenerInstancia().session.run(query, {cedula:cedula});
        return await this.poblarContenido(DB.obtenerInstancia().desempacarRegistros(consulta.records, "post"));
    }

    async buscarComentarios( titulo, creador ){
        let query = await DB.obtenerInstancia().session.run("MATCH (:Usuario)-[c:Comenta]->(p:Post{titulo: $titulo, creador: $creador}) RETURN c ORDER BY c.publicacion", {
            titulo: titulo,
            creador: creador
        });
        return DB.obtenerInstancia().desempacarRegistros(query.records, "c");
    }
}