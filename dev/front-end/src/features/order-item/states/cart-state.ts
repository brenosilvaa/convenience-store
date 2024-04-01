import { atom } from "recoil";
import { CreateOrderItem } from "../models/create-order-item";

export const cartState = atom<CreateOrderItem[]>({
    key: 'cartState',
    default: []
});