export abstract class Controller<ServerType> {
    protected server: ServerType;

    constructor(server: ServerType) {
        this.server = server;
    }
    
    abstract initialize(baseUrl: string): void;
}