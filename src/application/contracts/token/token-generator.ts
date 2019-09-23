import { User } from "../../../domain";

export interface ITokenGenerator {
    generateToken(user: User): string;
}