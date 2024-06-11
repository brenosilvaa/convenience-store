import { useEffect } from "react";
import { useLoggedInUser, useSetLoggedInUser } from "../../features/users/hooks/use-logged-in-user";
import { UserService } from "../../features/users/services/user-service";
import Forbidden from "../components/forbidden";

const withUser = (WrappedComponent: any, restrict: "seller" | "customer" | null = null) => {
    return (props: any) => {
        const user = useLoggedInUser();
        const setUser = useSetLoggedInUser();

        const userStr = localStorage.getItem("conv_user");
        const loggedUser = !!userStr ? JSON.parse(userStr) : null;
        const userId = loggedUser?.id ?? "";

        useEffect(() => {
            const fetchUser = async () => {
                setUser(await UserService.instance.findAsync(userId));
            }

            if (!user && !!userStr)
                fetchUser();
        }, [user]);

        const moreProps = { ...props, user };

        if (!!userStr) {
            if (!user)
                return "Carregando...";

            if (!!restrict) {
                if (user.isSeller && restrict === "customer")
                    return (<Forbidden />);

                if (!user.isSeller && restrict === "seller")
                    return (<Forbidden />);
            }
        } else if (!!restrict) {
            return (<Forbidden />);
        }

        return (<WrappedComponent {...moreProps} />);
    };
}

export default withUser;