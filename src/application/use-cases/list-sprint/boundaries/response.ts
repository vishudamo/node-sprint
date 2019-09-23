import { Sprint, ResponseStatus } from "../../../../domain";

export interface ListSprintResponse extends ResponseStatus {
    sprintList: Array<Sprint>;
}