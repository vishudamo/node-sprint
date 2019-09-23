import { Mapper } from "../../base";
import { SprintEntity } from "./sprint.entity";
import { Sprint } from "../../domain";

export class SprintMapper {
    
    mapFrom(param: Sprint): SprintEntity[] {
        const data = {
            _id: null,
            sprintNo: param.sprintNo,
            status: param.status,
            creation_date: param.creation_date
        };
        const entity = [data];
        return entity;
    }    
    
    mapTo(param: SprintEntity[]): Sprint[] {
        const result: Sprint[] = param.map(data => {
            return {
                id: data._id,
                sprintNo: data.sprintNo,
                status: data.status,
                creation_date: data.creation_date
            }
        });
        return result;
    }
}