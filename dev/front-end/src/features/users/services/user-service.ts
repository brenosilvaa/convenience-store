import { HttpStatusCode } from "axios";
import HttpClient from "../../../http/http-client";
import { CreateUser } from "../models/create-user";
import { LoggedUser } from "../models/logged-user";
import { Login } from "../models/login";
import { User } from "../models/user";
import { Pix } from "../models/pix";

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

    async findAsync(id: string): Promise<User> {
        const response = await HttpClient.instance.get(`/users/${id}`);

        if (response.status === HttpStatusCode.Ok) return response.data;
        else throw new Error(response.data?.detail ?? response.data);
    }

    async loginAsync(login: Login): Promise<LoggedUser> {
        const response = await HttpClient.instance.post(`/users/login`, login);

        if (response.status === HttpStatusCode.Ok) return response.data;
        else throw new Error(response.data?.detail ?? response.data);
    }

    async turnToSellerAsync(id: string, pix: Pix): Promise<boolean> {
        const response = await HttpClient.instance.patch(`/users/${id}/turnToSeller`, pix);

        if (response.status === HttpStatusCode.Ok) return response.data;
        else throw new Error(response.data?.detail ?? response.data);
    }
}