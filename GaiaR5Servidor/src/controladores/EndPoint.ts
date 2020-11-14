import {RequestHandler} from "express";

export enum metodoEnum{
    "GET" = "GET",
    "POST" = "POST",
    "PUT" = "PUT",
    "DELETE" = "DELETE",
    "PATCH" = "PATCH",
    "NULL" = "NULL"
}

export default class EndPoint{
    public etiqueta: string = "";
    public metodo: metodoEnum = metodoEnum.NULL;
    public manejador: RequestHandler = (req, res) => {};

    /**
     * @param etiqueta recurso al que se desea acceder, ej:'usuario'
     * @param metodo metodo Http con el que se desea registrar, ej:'GET'
     * @param manejador callback con el que se manejara el endpoint, ej: (req, res)=>{}
     */
    constructor(etiqueta: string, metodo: metodoEnum, manejador: RequestHandler) {
        this.etiqueta = etiqueta;
        this.metodo = metodo;
        this.manejador = manejador;
    }
}