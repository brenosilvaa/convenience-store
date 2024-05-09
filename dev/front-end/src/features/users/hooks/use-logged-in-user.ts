import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInUserState } from "../states/logged-in-user-state";
import { User } from "../models/user";

const useLoggedInUser = () => {
    return useRecoilValue(loggedInUserState);
};

const useSetLoggedInUser = () => {
    const setValue = useSetRecoilState(loggedInUserState);

    return (user: User) => {
        setValue(user);
    }
}

export { useLoggedInUser, useSetLoggedInUser };
