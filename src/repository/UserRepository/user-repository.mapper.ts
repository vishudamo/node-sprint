import { Mapper } from "../../base";
import { User } from "../../domain";
import { UserEntity } from "./user-repository.entity";

export class UserRepositoryMapper implements Mapper<User, Array<UserEntity>> {
   
    mapFrom(param: User): Array<UserEntity> {
        let entity = [];
        const data = {
            _id: param.id,
            email: param.email,
            password: param.password,
            userType: param.userType,
            firstName: param.firstName,
            lastName: param.lastName
        };
        entity = [data];
        return entity;
    }   
    
    mapTo(param: Array<UserEntity>): User {
        const user: User = {
            id: param[0]._id,
            email: param[0].email,
            password: param[0].password,
            userType: param[0].userType,
            firstName: param[0].firstName,
            lastName: param[0].lastName
        };
        return user;
    }
}