import { PixKeyType } from "../enums/pix-key-type";

export interface Pix {
    type: PixKeyType;
    key: string;
}