import * as jwt from 'jsonwebtoken';

import { ITokenGenerator } from "../../application/contracts/token";
import { User } from "../../domain";

export class TokenGenerator implements ITokenGenerator {

    _secret: string = 'Hauqk:vAh8KHG8+&';
    _expiry: string = '6h';
    
    generateToken(user: User): string {
        const data = {
            _id: user.id,
            email: user.email,
            role: user.userType
        };

        return jwt.sign({data}, this._secret, {expiresIn: this._expiry});
    }

}