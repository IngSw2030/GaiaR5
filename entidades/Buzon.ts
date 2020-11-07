import Chat from "./Chat";

export default class Buzon {
    public chats: Chat[];

    constructor(chats: Chat[]) {
        this.chats = chats;
    }
}