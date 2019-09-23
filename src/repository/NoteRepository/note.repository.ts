import { INoteRepository } from "../../application/contracts/repository";
import { NoteMapper } from "./note.mapper";
import { Note, Reaction, ResponseStatus } from "../../domain";
import NoteDB from "../model/note";
import { NoteEntity } from "./note.entity";

export class NoteRepository implements INoteRepository {
    _mapper: NoteMapper;

    constructor() {
        this._mapper = new NoteMapper();
    }
    
    async createNote(param: Note): Promise<ResponseStatus> {
       const mappedData = this._mapper.mapFrom(param);
       const result = await new NoteDB(mappedData).save();

       const success = {
           status: true,
           errorMsg: ''
       };

       const failed = {
           status: false,
           errorMsg: 'Something went wrong'
           
       };

       if(result) return new Promise((res) => res(success));
       return new Promise((res) => res(failed));

    }    
    
    getAllNote(): Promise<Note[]> {
        throw new Error("Method not implemented.");
    }

    updateReaction(param: Reaction): Promise<ResponseStatus> {
        throw new Error("Method not implemented.");
    }


}