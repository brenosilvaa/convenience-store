import axios, { AxiosInstance } from "axios";
import { LoggedUser } from "../features/users/models/logged-user";

export default class HttpClient {
    private static myInstance: AxiosInstance;

    static get instance(): AxiosInstance {
        //  const user: LoggedUser | null = useGetUser();
        // const token: string | undefined = user?.token;
        const userStorage = localStorage.getItem("conv_user");
        const user: LoggedUser | null = !!userStorage ? JSON.parse(userStorage) : null;

        return HttpClient.myInstance ?? axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            headers: {
                'Authorization': user?.token ? `Bearer ${user?.token}` : ''
            }
        });
    }
}