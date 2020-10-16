import * as exp from "express";
import * as bp from "body-parser";
import * as cors from "cors";
import DB from "./db";
import Controlador from "./controladores/Controlador";

const server = exp();
const port = 4557;
const db: DB = DB.obtenerInstancia();
//
server.use(cors());
server.use(bp.urlencoded({extended: true}))
server.use(bp.json())

const controlador = new Controlador(server);

server.get("/hola-mundo", ((req, res) => {
    res.send("Hola Mundo");
}))

server.post("/buscar-acopio", (async (req, res) => {
    res.send(await db.obtenerCentrosPorRecurso(req.body.filtro));
}))

server.post("/test", (async (req, res) => {
    res.send(await db.obtenerRecursos());
}))

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}.`);
});
