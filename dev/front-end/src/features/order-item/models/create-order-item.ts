import { Product } from "../../products/models/product";

export interface CreateOrderItem {
    productId: string;
    quantity: number;
    totalValue: number;
    unitaryValue: number;
    product?: Product;
}