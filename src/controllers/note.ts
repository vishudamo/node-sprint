import { Controller } from "../base";
import { Express, Request, Response, NextFunction } from "express";
import { NoteRepository } from "../repository/NoteRepository/note.repository";
import { CreateNoteInteractor } from "../application/use-cases/create-note/create-note";

export class NoteController extends Controller<Express> {
    _repository: NoteRepository;  
    
    constructor(server: Express) {
        super(server);
        this._repository = new NoteRepository();
    }
    
    initialize(baseUrl: string): void {
       this.server.post(`${baseUrl}note`, this.createNote);
    }

    public createNote = async(req: Request, res: Response, next: NextFunction) => {
        const useCase = new CreateNoteInteractor(this._repository);
        const result = useCase.execute(req.body);
        res.send(result);
    }
}