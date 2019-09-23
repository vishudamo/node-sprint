import * as bcrypt from 'bcrypt';
import { IPasswordHasher } from "../../application/contracts/hash";

export class PasswordHasher implements IPasswordHasher {
    private _saltRounds = 10;
    
    async generateHashedPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this._saltRounds);
    }    
    
    async checkHashedPassword(inputPassword: string, dbPassword: string): Promise<boolean> {
        return bcrypt.compare(inputPassword, dbPassword);
    }
}