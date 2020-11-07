import Media from "@entidades/Media";

export default class Video extends Media{
    private _enlaceVideo: string;

    constructor(alto: number, ancho: number, enlaceVideo: string) {
        super(alto, ancho);
        this._enlaceVideo = enlaceVideo;
    }

    get enlaceVideo(): string {
        return this._enlaceVideo;
    }

    set enlaceVideo(value: string) {
        this._enlaceVideo = value;
    }
}