import neo4j, {Driver, Session} from "neo4j-driver"
import CentroAcopio from "../src/entidades/CentroAcopio";
import Usuario from "../src/entidades/Usuario";

export default class DB {
    private static instancia: DB;
    private driver: Driver;
    private session: Session;

    private constructor() {
        this.driver = neo4j.driver(
            'neo4j://localhost',
            neo4j.auth.basic('neo4j', '1234')
        );
        this.session = this.driver.session();
    }

    public static obtenerInstancia(): DB {
        if (!DB.instancia) {
            DB.instancia = new DB();
        }
        return DB.instancia;
    }

    async obtenerCentrosPorRecurso(recurso: string): Promise<CentroAcopio[]> {
        let resultado: CentroAcopio[] = [];
        let resultados = await this.session.run("MATCH (a:Acopio)-[:Recicla]-(r:Recurso) WHERE r.nombre IN $recurso RETURN DISTINCT a", {
            recurso
        });
        resultados.records.forEach((nodo) => {
            nodo.forEach((acopio) => {
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

    private async crearEntidad(entidad:string, props:object){
        let consulta = await this.session.run(`CREATE (n:${entidad} $props) RETURN n`, {
            props: props
        });
        return consulta.records[0].get('n').properties;
    }

    async crearUsuario(usuario: Usuario): Promise<Usuario> {
        let consulta = await this.session.run("CREATE (n:Usuario $props) RETURN n", {
            props: usuario
        });
        let props = consulta.records[0].get('n').properties;
        return new Usuario(props.nombre, props.cedula, props.semillas);
    }

    obtenerUsuario(): Promise<Usuario> {
        return Promise.resolve(undefined);
    }

    async asignarSemillasUsuario(cedula: string, semillas: number): Promise<number> {
        let consulta = await this.session.run("MATCH (u:Usuario{cedula:$cedula}) SET u.semillas = u.semillas + $semillas RETURN u", {
            "cedula": cedula,
            "semillas": semillas
        });
        return consulta.records[0].get("u").properties;
    }

    async crearCentroAcopio(centroAcopio){
        let props = await this.crearEntidad("Acopio", centroAcopio);
        return new CentroAcopio(props.nombre, props.direccion, props.numero, props.latitud, props.longitud, props.pagina, props.horarioApertura, props.horarioCierre);
    }

    obtenerNodosPorEtiqueta(etiquetaNodo, filtro): Record<any, any>[] {
        return [];
    }

    obtenerNodosPorRelacion(etiquedaNodoOrigen, etiquetaRelacion, etiquetaNodoDestino): Record<any, any> {
        return undefined;
    }

}