import { Sprint, ResponseStatus } from "../../../domain";

export interface ISprintRepository {
    getAllSprints(): Promise<Array<Sprint>>;
    createSprint(sprint: Sprint): Promise<ResponseStatus>;
}