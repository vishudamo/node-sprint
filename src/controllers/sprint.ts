import { Controller } from "../base";
import { Express, Request, Response, NextFunction } from "express";
import { SprintRepository } from "../repository/SprintRepository/sprint.repository";
import { CreateSprintInteractor } from "../application/use-cases/create-sprint";
import { ListSprintInteractor } from "../application/use-cases/list-sprint";

export class SprintController extends Controller<Express> {
    _repository: SprintRepository;

    constructor(server: Express) {
        super(server);
        this._repository = new SprintRepository();
    }
    
    initialize(baseUrl: string): void {
        this.server.post(`${baseUrl}sprint`, this.createSprint);
        this.server.get(`${baseUrl}sprint`, this.getAllSprint);
    }

    public createSprint = async(req: Request, res: Response, next: NextFunction) => {
        const useCase = new CreateSprintInteractor(this._repository);
        const result = await useCase.execute(req.body);
        res.send(result);
    };

    public getAllSprint = async(req: Request, res: Response, next: NextFunction) => {
        const useCase = new ListSprintInteractor(this._repository);
        const result = await useCase.execute(req.body);
        res.send(result);
    };
}