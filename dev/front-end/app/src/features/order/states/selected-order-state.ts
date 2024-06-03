import { atom } from "recoil";
import { Order } from "../models/order";

export const selectedOrderState = atom<Order>({
    key: 'selectedOrderState',
    default: undefined
});