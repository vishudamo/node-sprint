import { Interactor } from "../../../base";
import { CreateNoteRequest, CreateNoteResponse } from "./boundaries";
import { INoteRepository } from "../../contracts/repository";
import { Reaction } from "../../../domain";

export class CreateNoteInteractor extends Interactor<CreateNoteRequest, CreateNoteResponse> {
    _repository: INoteRepository;    

    constructor(repo: INoteRepository) {
        super();
        this._repository = repo;
    }
    
    async execute(param: CreateNoteRequest): Promise<CreateNoteResponse> {
        
        const data: Reaction = {
            id: null,
            userId: param.userId,
            like: false,
            dislike: false,
            informative: false,
            confused: false,
            applause: false
        };

        const finalData = {
            ...param,
            Reaction: [data]
        };

        const result = await this._repository.createNote(finalData);

        const success = {
            status: true,
            errorMsg: ''
        };

        const failed = {
            status: true,
            errorMsg: 'Something went wrong'
        };

        return new Promise((res) => res(success));

    }

}