import { useQuery } from "react-query";
import { axiosInstance } from "..";
import { ApiResponse } from "@/interface/penempatan/response";

const getPenempatan = async (token:string):Promise<ApiResponse> => {
    const response = await axiosInstance.get("/master/penempatan?limit=99&offset=1", {
        headers: {
            "auth-token": token
        },
    });
    return response.data;
}

export const GetPenempatan = (token:string) => {
    return useQuery({
        queryKey: ["penempatan-all", token],
        queryFn: ({ queryKey }) => getPenempatan(queryKey[1]),
    })
}