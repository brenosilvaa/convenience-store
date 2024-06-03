import { Pix } from "./pix";

export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    isSeller: boolean;
    pix: Pix;
}