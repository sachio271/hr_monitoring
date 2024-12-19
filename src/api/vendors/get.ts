import { ApiResponse } from "@/interface/vendor/response";
import { useQuery } from "react-query";
import { axiosInstance } from "..";

const getVendorsData = async (token:string, type:string,):Promise<ApiResponse> => {
    const response = await axiosInstance.get("/master/vendor", {
        headers: {
            "auth-token": token
        },
        params: {
            type: type,
        }
    });
    return response.data;
}

export const GetVendorsData = (token:string, type:string) => {
    return useQuery({
        queryKey: ["get-vendor-all", token, type],
        queryFn: ({ queryKey }) => getVendorsData(queryKey[1],queryKey[2]),
    })
}