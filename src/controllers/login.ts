import { Express, Request, Response, NextFunction } from "express";

import { Controller } from "../base";
import { UserRepository } from "../repository";
import { PasswordHasher } from "../adapters/hash";
import { LoginUserInteractor } from "../application/use-cases/login-user";
import { TokenGenerator } from "../adapters/token";

export class LoginController extends Controller<Express> {
    _repository: UserRepository;
    _passwordHasher: PasswordHasher;
    _tokenGenerator: TokenGenerator;

    constructor(server: Express) {
        super(server);
        this._repository = new UserRepository();
        this._passwordHasher = new PasswordHasher();
        this._tokenGenerator = new TokenGenerator();
    }

    initialize(baseUrl: string): void {
        this.server.post(`${baseUrl}login/`, this.authenticateUser);
    }

    public authenticateUser = async(req: Request, res: Response, next: NextFunction) => {
        const useCase = new LoginUserInteractor(this._repository, this._passwordHasher, this._tokenGenerator);
        try {
            const result = await useCase.execute(req.body);
            res.send(result);
        } catch(e) {
            res.status(400).send(e);
        }
    };
    
}