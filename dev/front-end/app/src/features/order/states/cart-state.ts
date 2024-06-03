import { atom } from "recoil";
import { CreateOrder } from "../models/create-order";

export const cartState = atom<CreateOrder | undefined>({
    key: 'cartState',
    default: undefined
});