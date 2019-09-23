import { BoardTypes } from "./types";
import { Reaction } from "./reaction";

export interface Note {
    id: string | null;
    userId: string;
    sprintId: string;
    text: string;
    boardType: BoardTypes;
    reaction: Array<Reaction>;
}