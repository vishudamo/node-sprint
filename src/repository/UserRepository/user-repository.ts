import { IUserRepository } from "../../application/contracts/repository/IUserRepository";
import { User, ResponseStatus } from "../../domain";
import { UserRepositoryMapper } from "./user-repository.mapper";
import UserDB from '../model/user';
import { UserEntity } from "./user-repository.entity";

export class UserRepository implements IUserRepository {
    _mapper: UserRepositoryMapper;

    constructor() {
        this._mapper = new UserRepositoryMapper();
    }

    async createUser(param: User): Promise<ResponseStatus> {
        const failedResponse: ResponseStatus = {
            status: false,
            errorMsg: 'Cannot create user'
        };

        const successResponse: ResponseStatus = {
            status: true,
            errorMsg: ''
        };

        try {

        const data = this._mapper.mapFrom(param);  
        const result = await new UserDB(data).save();

            if(result) {
                return new Promise((resolve) => resolve(successResponse));
            }
            return new Promise((resolve) => resolve(failedResponse));

        } catch(e) {
            console.log(e);
            return new Promise((resolve) => resolve(failedResponse));
        }
    }

    async findUserWithEmail(email: string): Promise<User | null> {
        try {
            const result: Array<UserEntity> = await UserDB.findOne({email: email}).lean();

            const data = this._mapper.mapTo(result);

            return new Promise((resolve) => resolve(data));

        } catch(e) {
            return new Promise((resolve) => resolve(null));
        }
    }

}