import { Express, Request, Response, NextFunction } from "express";
import { Controller } from "../base";
import { UserRepository } from "../repository";
import { CreateUserInteractor } from "../application/use-cases";
import { UserValidator } from "../adapters/validator";
import { PasswordHasher } from "../adapters/hash";

export class RegisterController extends Controller<Express> {
    _repository: UserRepository;
    _validator: UserValidator;
    _passwordHasher: PasswordHasher;

    constructor(server: Express) {
        super(server);
        this._repository = new UserRepository();
        this._validator = new UserValidator();
        this._passwordHasher = new PasswordHasher();
    }

    initialize(baseUrl: string): void {
        this.server.post(`${baseUrl}register`, this.registerUser);
    }

    public registerUser = async(req: Request, res: Response, next: NextFunction) => {
        const useCase = new CreateUserInteractor(this._repository, this._validator, this._passwordHasher);
        const result = await useCase.execute(req.body);
        res.send(result);
    };
}