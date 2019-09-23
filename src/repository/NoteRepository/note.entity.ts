import { BoardTypes } from "../../domain/types";
import { ReactionEntity } from "./reaction.entity";

export interface NoteEntity {
    _id: string | null;
    userId: string;
    sprintId: string;
    text: string;
    boardType: BoardTypes;
    reaction: Array<ReactionEntity>;
}