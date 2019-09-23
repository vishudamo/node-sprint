import { UserTypes } from "./types";

export interface User {
    id: string | null;
    email: string;
    password: string;
    userType: UserTypes;
    firstName: string | null;
    lastName: string | null;
}