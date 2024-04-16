import { Product } from "../../products/models/product";

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    product: Product;
    quantity: number;
    totalValue: number;
    unitaryValue: number;
}