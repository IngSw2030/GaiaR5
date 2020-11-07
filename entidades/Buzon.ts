import Chat from "./Chat";

export default class Buzon {
    constructor(chats: Chat[]) {
        this._chats = chats;
    }

    private _chats: Chat[];

    get chats(): Chat[] {
        return this._chats;
    }

    set chats(value: Chat[]) {
        this._chats = value;
    }
}