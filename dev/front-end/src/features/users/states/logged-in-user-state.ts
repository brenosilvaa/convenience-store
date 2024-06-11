import { atom } from "recoil";
import { User } from "../models/user";

export const loggedInUserState = atom<User | null>({
    key: "loggedInUserState",
    default: null
})
