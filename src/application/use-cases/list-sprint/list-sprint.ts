import { Interactor } from "../../../base";
import { ListSprintRequest, ListSprintResponse } from "./boundaries";
import { ISprintRepository } from "../../contracts/repository";

export class ListSprintInteractor extends Interactor<ListSprintRequest, ListSprintResponse> {
    _repository: ISprintRepository;
    
    constructor(repo: ISprintRepository) {
        super();
        this._repository = repo;
    }
    
    async execute(param: ListSprintRequest): Promise<ListSprintResponse> {
        
        try {
            const sprintResult = await this._repository.getAllSprints();
            const data = {
                sprintList: sprintResult,
                status: true,
                errorMsg: ''
            };
            return new Promise((resolve) => resolve(data));
        } catch(e) {
            const noData = {
                sprintList: [],
                status: false,
                errorMsg: 'Something went wrong'
            };
            return new Promise((resolve) => resolve(noData));
        }

    }
}