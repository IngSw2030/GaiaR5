import SuperControlador from "../SuperControlador";
import IControlador from "../IControlador";
import Controlador from "../Controlador";
import {Express} from "express";
import {Post} from "../../../../entidades";
import DB from "../../db";
import EndPoint, {metodoEnum} from "../EndPoint";
import Autentificacion, {Payload} from "../../servicios/Autentificacion";
import {int as neo4jInt} from 'neo4j-driver'

export default class Posts extends SuperControlador implements IControlador {

    constructor(path: string) {
        super(path);
        this.endpoints = [
            new EndPoint(
                "post",
                metodoEnum.POST,
                async (req, res) => {
                    let token:Payload = Autentificacion.verificar(req);
                    let estado = (await this.crearPost(new Post("", 0, "", []).hidratar(req.body.post), token.cedula))? 200 : 500;
                    res.sendStatus(estado);
                }
            ),
            new EndPoint(
                "post",
                metodoEnum.GET,
                async (req, res) => {
                    let {titulo, tags} = req.query;
                    if(titulo !== undefined){
                        try{
                            res.send(await this.buscarPostsPorTitulo(<string>titulo));
                        }catch (e) {
                            res.sendStatus(500);
                        }
                    }else if(tags !== undefined){
                        try{
                            res.send(await this.buscarPostsPorTags(<Array<string>>tags));
                        }catch (e) {
                            res.sendStatus(500);
                        }
                    }else{
                        res.sendStatus(400);
                    }
                }
            ),
            new EndPoint(
                "post/tags/popular",
                metodoEnum.GET,
                async (req, res) => {
                    try{
                        res.send(await this.tagsPopulares(Number.parseInt(<string>req.query.top)));
                    }catch (e) {
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
                    cedulaUsuario,
                    post
                }
            );
            for(let tag of post.tags){
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

    public async buscarPostsPorTitulo(titulo:string){
        let query = `MATCH (p:Post) WHERE p.titulo =~ '(?i).*${titulo}.*' RETURN p`
        try{
            let respuesta = await DB.obtenerInstancia().session.run(query);
            return (DB.obtenerInstancia().desempacarRegistros(respuesta.records, "p"));
        }catch (e) {
            throw e;
        }
    }

    public async buscarPostsPorTags(tags:string[]){
        try{
            let respuesta = await DB.obtenerInstancia().session.run(
                "MATCH (p:Post)-[:MarcadoPor]-(t:Tag) WHERE t.tag IN $tags RETURN DISTINCT p",
                {
                    tags
                }
            );
            return (DB.obtenerInstancia().desempacarRegistros(respuesta.records, "p"));
        }catch (e) {
            throw e;
        }
    }

    public async tagsPopulares(top:number){
        try{
            let respuesta = await DB.obtenerInstancia().session.run(
                "MATCH (r:Tag)-[:MarcadoPor]-(:Post) WITH r, COUNT(r) AS c ORDER BY c DESC RETURN r.tag as tag, c LIMIT $top",
                {
                    top: neo4jInt(top)
                }
            );
            let tablero = respuesta.records.map((registro)=>{
                return {
                    tag: registro.get("tag"),
                    c: registro.get("c").toNumber()
                };
            });
            return tablero;
        }catch (e) {
            throw e;
        }
    }

}