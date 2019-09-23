import { Note, ResponseStatus, Reaction } from "../../../domain";

export interface INoteRepository {
    createNote(param: Note): Promise<ResponseStatus>;
    getAllNote(): Promise<Array<Note>>;
    updateReaction(param: Reaction): Promise<ResponseStatus>;
}