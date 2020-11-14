import ISemillas from "./ISemillas";

export default class AsignarSemillasAleatorias implements ISemillas{
    calcularSemillas(distancia: number) {
        return Math.ceil(Math.random() * distancia);
    }
}