import { useMutation } from "react-query";
import { axiosInstance } from "..";

const postLogin = async ({ username, password }) => {
    const response = await axiosInstance.post("/master/login", { username, password });
    return response.data;
}

export const PostLoginMutation = () => {
    return useMutation({
        mutationFn: postLogin
    })
}