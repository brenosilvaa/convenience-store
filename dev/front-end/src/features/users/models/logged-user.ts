import { User } from "./user";

export interface LoggedUser extends User {
    token: string;
    tokenValidity: Date;
}