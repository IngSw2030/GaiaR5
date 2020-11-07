import {Express} from "express";
import EndPoint from "./EndPoint";
import {metodoEnum} from "./EndPoint";
import Controlador from "./Controlador";

export default class SuperControlador{
    protected path: string;
    protected server: Express;
    protected controlador: Controlador;
    protected endpoints: EndPoint[];

    constructor(path: string) {
        this.path = path;
        this.endpoints = [];
    }

    protected exponer():void{
        for(let ep of this.endpoints){
            switch (ep.metodo) {
                case metodoEnum.GET:
                    this.server.get(`${this.path}/${ep.etiqueta}`, ep.manejador);
                    break;
                case metodoEnum.POST:
                    this.server.post(`${this.path}/${ep.etiqueta}`, ep.manejador);
                    break;
                case metodoEnum.PUT:
                    this.server.put(`${this.path}/${ep.etiqueta}`, ep.manejador);
                    break;
                case metodoEnum.DELETE:
                    this.server.delete(`${this.path}/${ep.etiqueta}`, ep.manejador);
                    break;
                case metodoEnum.PATCH:
                    this.server.patch(`${this.path}/${ep.etiqueta}`, ep.manejador);
                    break;
            }
            console.log(`Registrando ${ep.metodo} ${this.path}/${ep.etiqueta}`);
        }
    }
}