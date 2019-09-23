import { ResponseStatus } from "../../../../domain";

export interface LoginUserResponse extends ResponseStatus {
    token: string | null;
}