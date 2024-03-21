import { HttpStatusCode } from "axios";
import { CreateProduct } from "../models/create-product";
import { Product } from "../models/product";
import HttpClient from "../../../http/http-client";

const controller: string = "/products";

export class ProductService {
    private static _instance?: ProductService;

    static get instance(): ProductService {
        return (ProductService._instance ??= new ProductService());
    }

    async listAsync(): Promise<Product[]> {
        const response = await HttpClient.instance.get(controller);

        if (response.status === HttpStatusCode.Ok) return response.data;
        else throw new Error(response.data?.detail ?? response.data);
    }

    async findAsync(id: string): Promise<Product | undefined> {
        const response = await HttpClient.instance.get(`${controller}/${id}`);

        if (response.status === HttpStatusCode.Ok) return response.data;
        else throw new Error(response.data?.detail ?? response.data);
    }

    async createAsync(product: CreateProduct): Promise<Product> {
        const response = await HttpClient.instance.post(controller, product);

        if (response.status === HttpStatusCode.Ok) return response.data;
        else throw new Error(response.data?.detail ?? response.data);
    }

    async updateAsync(id: string, product: CreateProduct): Promise<Product> {
        const response = await HttpClient.instance.put(`${controller}/${id}`, product);

        if (response.status === HttpStatusCode.Ok) return response.data;
        else throw new Error(response.data?.detail ?? response.data);
    }

    async removeAsync(id: string): Promise<boolean> {
        const response = await HttpClient.instance.delete(`${controller}/${id}`);

        if (response.status === HttpStatusCode.Ok) return response.data;
        else throw new Error(response.data?.detail ?? response.data);
    }
}