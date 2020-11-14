import {decode, encode} from "jwt-simple";
import {Request} from "express";

export interface Payload {
    nombre: string,
    cedula: string,
    semillas: number
}

export default class Autentificacion {
    private static SECRETO = "Tw5Ingesoft";

    public static crearToken(payload: Payload) {
        return encode(payload, this.SECRETO);
    }

    public static verificar(req: Request){
        let tokenStr = req.headers.authorization.split(" ")[1];
        try{
            return decode(tokenStr, this.SECRETO);
        }catch (e) {
            throw new Error("Token invalido");
        }
    }
}