import { User } from "../../users/models/user";
import { OrderItem } from "./order-item";

export interface Order {
    id: string;
    date: Date;
    sellerId: string;
    seller?: User;
    customerId: string;
    customer?: User;
    observation?: string;
    totalValue: number;
    isCancelled: boolean;
    items: OrderItem[];
}