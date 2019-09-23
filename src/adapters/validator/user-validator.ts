import { IUserValidator } from "../../application/contracts/validator";
import { ResponseStatus } from "../../domain";

export class UserValidator implements IUserValidator {

    private _emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    validateEmail(email: string): Promise<ResponseStatus> {  
        const validEmail = this._emailRegex.test(email);

        const failed: ResponseStatus = {
            status: false,
            errorMsg: 'Not a valid email'
        };

        const success: ResponseStatus = {
            status: true,
            errorMsg: ''
        };

        if(!validEmail) {
           return new Promise((resolve) => resolve(failed));
        } 
        return new Promise((resolve) => resolve(success));
    }    
     
    validatePassword(password: string): Promise<ResponseStatus> {
        const validatePassword = password.length >= 8;

        const failed: ResponseStatus = {
            status: false,
            errorMsg: 'Password must be alteast 8 characters'
        };

        const success: ResponseStatus = {
            status: true,
            errorMsg: ''
        };

        if(!validatePassword) {
            return new Promise((resolve) => resolve(failed));
        }
        return new Promise((resolve) => resolve(success));
    }

}