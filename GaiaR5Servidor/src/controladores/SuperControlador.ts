import {Express, RequestHandler} from "express";
import Controlador from "./Controlador";
export enum metodoEnum{
    "GET" = "GET",
    "POST" = "POST",
    "PUT" = "PUT",
    "DELETE" = "DELETE",
    "PATCH" = "PATCH"
}
export interface EndPoint{
    etiqueta: string,
    metodo: metodoEnum,
    manejador: RequestHandler
}
export default class SuperControlador{
    protected path: string;
    protected endpoints: EndPoint[];

    constructor(path: string) {
        this.path = path;
        this.endpoints = [];
    }

    protected exponer(server:Express):void{
        for(let ep of this.endpoints){
            switch (ep.metodo) {
                case metodoEnum.GET:
                    server.get(`${this.path}/${ep.etiqueta}`, ep.manejador);
                    break;
                case metodoEnum.POST:
                    server.post(`${this.path}/${ep.etiqueta}`, ep.manejador);
                    break;
                case metodoEnum.PUT:
                    server.put(`${this.path}/${ep.etiqueta}`, ep.manejador);
                    break;
                case metodoEnum.DELETE:
                    server.delete(`${this.path}/${ep.etiqueta}`, ep.manejador);
                    break;
                case metodoEnum.PATCH:
                    server.patch(`${this.path}/${ep.etiqueta}`, ep.manejador);
                    break;
            }
            console.log(`Registrando ${ep.metodo} ${this.path}/${ep.etiqueta}`);
        }
    }
}