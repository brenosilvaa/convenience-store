import axios, { AxiosInstance } from "axios";

export default class HttpClient {
    private static myInstance: AxiosInstance;

    static get instance(): AxiosInstance {
        // const user: User | null = useGetUser();
        // const token: string | undefined = user?.token;

        return HttpClient.myInstance ?? axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            // headers: {
            //     'Authorization': token ? `Bearer ${token}` : ''
            // }
        });
    }
}