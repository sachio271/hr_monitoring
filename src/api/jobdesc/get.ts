import { ApiResponse } from "@/interface/jobdesc/response";
import { useQuery } from "react-query";
import { axiosInstance } from "..";

const getJobDesc = async (token:string):Promise<ApiResponse> => {
    const response = await axiosInstance.get("/master/psikotes/temp-jobdesc", {
        headers: {
            "auth-token": token
        },
    });
    return response.data;
}

export const GetJobDesc = (token:string) => {
    return useQuery({
        queryKey: ["jobdesc-all", token],
        queryFn: ({ queryKey }) => getJobDesc(queryKey[1]),
    })
}