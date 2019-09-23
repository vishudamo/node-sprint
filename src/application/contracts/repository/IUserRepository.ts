import { User, ResponseStatus } from "../../../domain";

export interface IUserRepository  {
    createUser(param: User): Promise<ResponseStatus>;
    findUserWithEmail(email: string): Promise<User | null>;
}