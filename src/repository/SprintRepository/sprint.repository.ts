import { ISprintRepository } from "../../application/contracts/repository";
import { Sprint, ResponseStatus } from "../../domain";
import { SprintMapper } from "./sprint.mapper";
import SprintDB from "../model/sprint";
import { SprintEntity } from "./sprint.entity";

export class SprintRepository implements ISprintRepository {
    _mapper: SprintMapper;

    constructor() {
        this._mapper = new SprintMapper();
    }
    
    async getAllSprints(): Promise<Sprint[]> {
            const result: SprintEntity[] = await SprintDB.find().lean();
            const mappedData = this._mapper.mapTo(result);
            return new Promise((res) => res(mappedData));
      
    }    
    
    async createSprint(sprint: Sprint): Promise<ResponseStatus> {
        const data = this._mapper.mapFrom(sprint);

        const failed = {
            status: false,
            errorMsg: 'Something Went wrong'
        };

        const success = {
            status: true,
            errorMsg: ''
        };

        try {
            const result = await new SprintDB(data).save();

            if(result) {
                return new Promise((res) => res(success));
            }
            return new Promise((res) => res(failed));
        } catch(e) {
            return new Promise((res) => res(failed));
        }
    }
}