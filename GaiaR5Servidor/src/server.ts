import * as exp from "express";
import * as bp from "body-parser";
import * as cors from "cors";
import DB from "./db";
const server = exp();
const port = 4557;
//
server.use(cors());
server.use(bp.urlencoded({extended:true}))
server.use(bp.json())

server.get("/hola-mundo", ((req, res) => {
    res.send("Hola Mundo");
}))

server.post("/buscar-acopio", (async (req, res) => {
    let resultado = await DB.obtenerInstancia().buscar(req.body.filtro);
    res.send(resultado);
}))

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}.`);
});
