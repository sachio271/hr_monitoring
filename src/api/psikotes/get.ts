import { ApiResponse } from "@/interface/psikotes/response";
import { useQuery } from "react-query";
import { axiosInstance } from "..";

const getPsikotesAll = async (token:string, omni:string, penempatan:string, offset:string):Promise<ApiResponse> => {
    const response = await axiosInstance.get("/vendors/schedule/psikotes", {
        headers: {
            "auth-token": token
        },
        params: {
            omni: omni,
            penempatan: penempatan,
            offset: offset
        }
    });
    return response.data;
}

export const GetPsikotesAll = (token:string, omni:string, penempatan:string, offset:string) => {
    return useQuery({
        queryKey: ["vendor-psikotes-all", token, omni, penempatan, offset],
        queryFn: ({ queryKey }) => getPsikotesAll(queryKey[1],queryKey[2],queryKey[3],queryKey[4]),
    })
}