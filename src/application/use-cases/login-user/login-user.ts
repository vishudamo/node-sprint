import { Interactor } from "../../../base";
import { LoginUserRequest, LoginUserResponse } from "./boundaries";
import { IUserRepository } from "../../contracts/repository";
import { IPasswordHasher } from "../../contracts/hash";
import { ITokenGenerator } from "../../contracts/token";

export class LoginUserInteractor extends Interactor<LoginUserRequest, LoginUserResponse> {
    _repository: IUserRepository;
    _passwordHasher: IPasswordHasher;
    _tokenGenerator: ITokenGenerator;

    constructor(
        repo: IUserRepository,
        hasher: IPasswordHasher,
        tokenGen: ITokenGenerator
    ) {
        super();
        this._repository = repo;
        this._passwordHasher = hasher;
        this._tokenGenerator = tokenGen;
    }
    
    async execute(param: LoginUserRequest): Promise<LoginUserResponse> {

        const failedAuth: LoginUserResponse = {
            status: false,
            errorMsg: 'Username or Password does not match',
            token: null
        };

        const successAuth: LoginUserResponse = {
            status: true,
            errorMsg: '',
            token: null
        };

        try {
            const userDBObject = await this._repository.findUserWithEmail(param.email);

            if(!userDBObject) {
                return new Promise((resolve) => resolve(failedAuth));
            }

            const passwordMatch = await this._passwordHasher.checkHashedPassword(param.password, userDBObject.password);
            if(!passwordMatch) {
                return new Promise((resolve) => resolve(failedAuth));
            }

            successAuth.token = this._tokenGenerator.generateToken(userDBObject);

            return new Promise((resolve) => resolve(successAuth));
            
        } catch(e) {
            return new Promise((resolve) => resolve(failedAuth));
        }

    }

}