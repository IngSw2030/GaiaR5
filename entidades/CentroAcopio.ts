export default class CentroAcopio {
    public nombre: string;
    public direccion: string;
    public numero: string;
    public latitud: number;
    public longitud: number;
    public pagina: string;
    //Hora de inicio en formato militar ej: 1500 = 3:00 pm
    public horarioApertura: number;
    public horarioCierre: number;
    public recursos: string[];

    constructor(nombre?: string, direccion?: string, numero?: string, latitud?: number, longitud?: number, pagina?: string, horarioApertura?: number, horarioCierre?: number, recursos?: string[]) {
        this.nombre = nombre? nombre : "";
        this.direccion = direccion? direccion : "";
        this.numero = numero? numero : "";
        this.latitud = latitud? latitud : 0;
        this.longitud = longitud? longitud : 0;
        this.pagina = pagina? pagina : "";
        this.horarioApertura = horarioApertura? horarioApertura : 0;
        this.horarioCierre = horarioCierre? horarioCierre : 0;
        this.recursos = recursos? recursos : [];
    }

    public static hidratar(json: any):CentroAcopio{
        return new CentroAcopio(
            json.nombre,
            json.direccion,
            json.numero,
            json.latitud,
            json.longitud,
            json.pagina,
            json.horarioApertura,
            json.horarioCierre,
            json.recursos
        );
    }
}