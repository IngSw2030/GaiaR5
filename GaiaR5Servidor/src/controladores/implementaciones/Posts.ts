import SuperControlador from "../SuperControlador";
import IControlador from "../IControlador";
import Controlador from "../Controlador";
import {Express} from "express";
import Post from "@entidades/Post";
import DB from "../../db";
import EndPoint, {metodoEnum} from "../EndPoint";
import Autentificacion, {Payload} from "../../servicios/Autentificacion";

export default class Posts extends SuperControlador implements IControlador {

    constructor(path: string) {
        super(path);
        this.endpoints = [
            new EndPoint(
                "post",
                metodoEnum.POST,
                async (req, res) => {
                    let token:Payload = Autentificacion.verificar(req);
                    let estado = (await this.crearPost(req.body.post, token.cedula))? 200 : 500;
                    res.sendStatus(estado);
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
            await DB.obtenerInstancia().session.run(
                "CREATE (u:Usuario { cedula: $cedulaUsuario })-[r:Postea]->(p:Post $post) RETURN p",
                {
                    cedulaUsuario,
                    post
                }
            );
            for(let tag of post.tags){
                await DB.obtenerInstancia().session.run(
                    "CREATE (p:Post {cedula: $cedula, titulo: $titulo})-[r:MarcadoPor]->(t:Tag {tag: $tag}) ",
                    {
                        cedula: cedulaUsuario,
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

}