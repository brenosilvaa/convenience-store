import { HttpStatusCode } from "axios";
import { CreateUser } from "../models/create-user";
import { User } from "../models/user";
import HttpClient from "../../../http/http-client";

export class UserService {
    private static _instance?: UserService;

    static get instance(): UserService {
        return (UserService._instance ??= new UserService());
    }

    async registerAsync(user: CreateUser): Promise<User> {
        const response = await HttpClient.instance.post(`/users`, user);

        if (response.status === HttpStatusCode.Ok) return response.data;
        else throw new Error(response.data?.detail ?? response.data);


        // const response = await AuthHttpClient.instance.post("/users", model);

        // if (response.status === HttpStatusCode.Ok) return response.data;
        // else throw new Error(response.data?.detail ?? response.data);
    }
}