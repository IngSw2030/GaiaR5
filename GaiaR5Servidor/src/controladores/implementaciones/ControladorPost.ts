import SuperControlador from "../SuperControlador";
import IControlador from "../IControlador";
import Controlador from "../Controlador";
import {Express} from "express";
import {Comentario, Post} from "../../../../entidades";
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
                        let token: Payload = Autentificacion.verificar(req);
                        let estado = (await this.crearPost(Post.hidratar(req.body), token.cedula)) ? 200 : 500;
                        res.sendStatus(estado);
                    } catch (e) {
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
                    }catch (e) {
                        if(e.message == "Token invalido"){
                            res.sendStatus(403);
                        }else{
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
                    }catch (e){
                        if(e.message == "Token invalido"){
                            res.sendStatus(403);
                        }else{
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
                    }catch (e){
                        if(e.message == "Token invalido"){
                            res.sendStatus(403);
                        }else{
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
                    }catch (e){
                        if(e.message == "Token invalido"){
                            res.sendStatus(403);
                        }else{
                            res.sendStatus(500);
                        }
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

    public async crearPost(post: Post, cedulaUsuario: string): Promise<boolean> {
        try {
            console.log(post);
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
            return (DB.obtenerInstancia().desempacarRegistros(respuesta.records, "p"));
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
            return (DB.obtenerInstancia().desempacarRegistros(respuesta.records, "p"));
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
        }catch (e) {
            console.log(e);
            throw e;
        }
    }

    async darLike(cedula:string, post:Post) {
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
        let coment = new Comentario(cedula, comentario, Date.now());
        let consulta = await DB.obtenerInstancia().session.run("MATCH (p:Post{titulo: $titulo, creador: $creador}), (u:Usuario{cedula: $cedula}) CREATE (u)-[c:Comenta $comentario]->(p) RETURN c", {
            titulo: post.titulo,
            creador: post.creador,
            cedula: cedula,
            comentario: coment
        });
        return DB.obtenerInstancia().desempacarRegistros(consulta.records, "c");
    }

    async reportarPost(cedula: string, post: Post, reporte:string){
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
}