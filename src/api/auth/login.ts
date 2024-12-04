import { useMutation } from "react-query";
import { axiosInstance } from "..";
import { LoginResponse } from "@/interface/login/response";

const postLogin = async ({ username, password }:{username:string, password:string}):Promise<LoginResponse> => {
    const response = await axiosInstance.post("/master/login", { username, password });
    return response.data;
}

export const PostLoginMutation = () => {
    return useMutation({
        mutationFn: postLogin
    })
}