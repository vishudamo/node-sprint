import { Interactor } from "../../../base";
import { CreateSprintRequest, CreateSprintResponse } from "./boundaries";
import { ISprintRepository } from "../../contracts/repository";
import { Sprint } from "../../../domain";

export class CreateSprintInteractor extends Interactor<CreateSprintRequest, CreateSprintResponse> {
    _repository: ISprintRepository;

    constructor(repo: ISprintRepository) {
        super();
        this._repository = repo;
    }
    
    async execute(param: CreateSprintRequest): Promise<CreateSprintResponse> {

        try {

            const existingSprintList = await this._repository.getAllSprints();
    
            const data: Sprint = {
                id: null,
                sprintNo: existingSprintList.length + 1,
                status: false,
                creation_date: new Date()
            };
    
            const result = await this._repository.createSprint(data);

            return new Promise((resolve) => resolve(result));
        } catch(e) {
            const failed = {
                status: false,
                errorMsg: 'Something Went wrong'
            };

            return new Promise((resolve) => resolve(failed));
        }
    }

}