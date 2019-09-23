import { Mapper } from "../../base";
import { Note, Reaction } from "../../domain";
import { NoteEntity } from "./note.entity";
import { ReactionEntity } from "./reaction.entity";

export class NoteMapper implements Mapper<Note, Array<NoteEntity>> {
    
    mapFrom(param: Note): NoteEntity[] {
        const entity:NoteEntity = {
            _id: param.id,
            userId: param.userId as string,
            boardType: param.boardType,
            sprintId: param.sprintId,
            text: param.text,
            reaction: this.mapReactionFrom(param.reaction[0])
        };
        return [entity];
    }    
    
    mapTo(param: NoteEntity[]): Note {
        const result = param.map(data => {
            return {
                id: data._id,
                userId: data.userId,
                boardType: data.boardType,
                sprintId: data.sprintId,
                text: data.text,
                reaction: this.mapReactionTo(data.reaction[0])
            }
        });
        return result[0];
    }

    mapReactionFrom(param: Reaction): ReactionEntity[] {
        const entity: ReactionEntity = {
            _id: param.id,
            userId: param.userId,
            like: param.like,
            dislike: param.dislike,
            informative: param.informative,
            confused: param.confused,
            applause: param.applause
        };
        
        return [entity];
    }

    mapReactionTo(param: ReactionEntity): Reaction[] {
        const result:Reaction = {
            id: param._id,
            userId: param.userId,
            like: param.like,
            dislike: param.dislike,
            informative: param.informative,
            confused: param.confused,
            applause: param.applause
        };
        return [result]; 
    }

}