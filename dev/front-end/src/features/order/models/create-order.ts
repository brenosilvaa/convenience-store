import { CreateOrderItem } from "./create-order-item";

export interface CreateOrder{
    sellerId: string;
    customerId: string;
    observation?: string;
    items: CreateOrderItem[];
    totalValue: number;
}