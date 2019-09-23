import { Interactor } from "../../../base";
import { CreateUserRequest, CreateUserResponse } from "./boundaries";
import { IUserRepository } from "../../contracts/repository";
import { IPasswordHasher } from "../../contracts/hash";
import { IUserValidator } from "../../contracts/validator";
import { User } from '../../../domain';
import { UserTypes } from "../../../domain/types";

export class CreateUserInteractor extends Interactor<CreateUserRequest, CreateUserResponse> {
    
    _repository: IUserRepository;
    _passwordHasher: IPasswordHasher;
    _validator: IUserValidator;

    constructor(
        repo: IUserRepository,
        validator: IUserValidator,
        hasher: IPasswordHasher
    ) {
        super();
        this._repository = repo;
        this._validator = validator;
        this._passwordHasher = hasher;
    }
   
    async execute(param: CreateUserRequest): Promise<CreateUserResponse> {
        const emailStatus = await this._validator.validateEmail(param.email);

        if(!emailStatus.status) {
            return new Promise((resolve) => resolve(emailStatus));
        }

        const passwordStatus = await this._validator.validatePassword(param.password);

        if(!passwordStatus.status) {
            return new Promise((resolve) => resolve(passwordStatus));
        }

        const hashedPassword = await this._passwordHasher.generateHashedPassword(param.password);

        const user: User =  {
            id: null,
            email: param.email.toLowerCase(),
            password: hashedPassword,
            userType: UserTypes.Regular,
            firstName: param.firstName,
            lastName: param.lastName
        };

        return this._repository.createUser(user);
    }

}
