export abstract class Interactor<Request, Response> {
    abstract execute(param: Request): Promise<Response>;
}