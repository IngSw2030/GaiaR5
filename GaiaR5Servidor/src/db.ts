import neo4j, {Driver, Session} from "neo4j-driver"
import IDBAdaptador from "./adaptadores/IDBAdaptador";
import CentroAcopio from "@entidades/CentroAcopio";
import Usuario from "../src/entidades/Usuario";

export default class DB implements IDBAdaptador{
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

    async obtenerCentrosPorRecurso(recurso: string): Promise<CentroAcopio[]> {
        let resultado: CentroAcopio[] = [];
        let resultados = await this.session.run("MATCH (a:Acopio)-[:Recicla]-(r:Recurso) WHERE r.nombre IN $recurso RETURN DISTINCT a", {
            recurso
        });
        resultados.records.forEach((nodo)=>{
            nodo.forEach((acopio)=>{
                let acopioData = acopio.properties;
                let tags = acopioData.tags.replace(new RegExp('\'', 'g'), "\"");
                acopioData.tags = JSON.parse(tags).tags;
            })
        })
        return resultado;
    }

    async obtenerRecursos(): Promise<string[]> {
        let consulta = await this.session.run("MATCH (r:Recurso) RETURN DISTINCT r.nombre");
        return consulta.records.map((registro) => {
            return registro.get("r.nombre");
        });
    }

    async crearUsuario(usuario:Usuario): Promise<Usuario> {
        let consulta = await this.session.run("CREATE (n:Person $props) RETURN n", {
            props: usuario
        });
        let props = consulta.records[0].get('n').properties;
        return new Usuario(props.nombre, props.cedula, props.semillas);
    }

    obtenerUsuario(): Promise<Usuario> {
        return Promise.resolve(undefined);
    }

    asignarSemillasUsuario(): Promise<number> {

        return Promise.resolve(0);
    }

    obtenerNodosPorEtiqueta(etiquetaNodo, filtro): Record<any, any>[] {
        return [];
    }

    obtenerNodosPorRelacion(etiquedaNodoOrigen, etiquetaRelacion, etiquetaNodoDestino): Record<any, any> {
        return undefined;
    }

}