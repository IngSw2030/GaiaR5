import neo4j from "neo4j-driver"
import {Driver, Session} from "neo4j-driver";
export default class DB{
    private static instancia: DB;
    private driver:Driver;
    private session:Session;
    private constructor() {
        this.driver = neo4j.driver(
            'neo4j://localhost',
            neo4j.auth.basic('neo4j', '1234')
        );
        this.session = this.driver.session();
    }
    public static obtenerInstancia():DB{
        if(!DB.instancia){
            DB.instancia = new DB();
        }
        return DB.instancia;
    }
    async buscar(filtro){
        let resultado = [];
        let incluidos = [];
        let resultados = await this.session.run("MATCH (a:Acopio)-[:Recicla]-(r:Recurso) WHERE r.nombre IN $filtro RETURN a", {
            filtro: filtro
        });
        resultados.records.forEach((nodo)=>{
            nodo.forEach((acopio)=>{
                let acopioData = acopio.properties;
                let tags = acopioData.tags.replace(new RegExp('\'', 'g'), "\"");
                acopioData.tags = JSON.parse(tags).tags;
                if(!incluidos.includes(acopioData.nombre)){
                    incluidos.push(acopioData.nombre)
                    resultado.push(acopioData)
                }
            })
        })
        return resultado;
    }
}