import { useEffect } from "react";
import { useLoggedInUser, useSetLoggedInUser } from "../../features/users/hooks/use-logged-in-user";
import { UserService } from "../../features/users/services/user-service";
import Forbidden from "../components/forbidden";

const withUser = (WrappedComponent: any, restrict: "seller" | "customer" | null = null) => {
    return (props: any) => {
        const user = useLoggedInUser();
        const setUser = useSetLoggedInUser();

        const userId = "08dc6ae0-d6e4-455f-887a-e2a7817e8137"; // Customer 
        // const userId = "08dc6ae8-0e60-42f6-8c01-8276611d0db1"; // Seller 

        useEffect(() => {
            const fetchUser = async () => {
                setUser(await UserService.instance.findAsync(userId));
            }

            if (!user)
                fetchUser();
        }, [user]);

        const moreProps = { ...props, user };

        if (!user)
            return "Carregando...";

        if (!!restrict) {
            if (user.isSeller && restrict === "customer")
                return (<Forbidden />);

            if (!user.isSeller && restrict === "seller")
                return (<Forbidden />);
        }

        return (<WrappedComponent {...moreProps} />);
    };
}

export default withUser;