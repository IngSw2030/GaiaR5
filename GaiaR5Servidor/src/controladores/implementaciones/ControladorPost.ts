import SuperControlador from "../SuperControlador";
import IControlador from "../IControlador";
import Controlador from "../Controlador";
import {Express} from "express";
import {Post} from "../../../../entidades";
import DB from "../../db";
import EndPoint, {metodoEnum} from "../EndPoint";
import Autentificacion, {Payload} from "../../servicios/Autentificacion";
import {int as neo4jInt} from 'neo4j-driver'

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

}