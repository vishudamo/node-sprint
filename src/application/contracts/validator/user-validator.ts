import { ResponseStatus } from "../../../domain";

export interface IUserValidator {
    validateEmail(email: string): Promise<ResponseStatus>;
    validatePassword(password: string): Promise<ResponseStatus>;
}