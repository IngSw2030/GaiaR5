import Media from "./Media";

export default class Video extends Media{
    private enlaceVideo: string;

    constructor(alto: number, ancho: number, enlaceVideo: string) {
        super(alto, ancho);
        this.enlaceVideo = enlaceVideo;
    }
}