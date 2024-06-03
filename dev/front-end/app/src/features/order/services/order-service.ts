import { HttpStatusCode } from "axios";
import { CreateOrder } from "../models/create-order";
import { Order } from "../models/order";
import HttpClient from "../../../http/http-client";

const controller: string = "/orders";

export class OrderService {
    private static _instance?: OrderService;

    static get instance(): OrderService {
        return (OrderService._instance ??= new OrderService());
    }

    async listAsync(): Promise<Order[]> {
        const response = await HttpClient.instance.get(controller);

        if (response.status === HttpStatusCode.Ok) return response.data;
        else throw new Error(response.data?.detail ?? response.data);
    }

    async findAsync(id: string): Promise<Order | undefined> {
        const response = await HttpClient.instance.get(`${controller}/${id}`);

        if (response.status === HttpStatusCode.Ok) return response.data;
        else throw new Error(response.data?.detail ?? response.data);
    }

    async createAsync(order: CreateOrder): Promise<boolean> {
        try {
            const response = await HttpClient.instance.post(controller, order);
            return response.status === HttpStatusCode.Ok;
        } catch (error) {
            return false;
        }

        // if (response.status === HttpStatusCode.Ok) return response.data;
        // else throw new Error(response.data?.detail ?? response.data);
    }
}