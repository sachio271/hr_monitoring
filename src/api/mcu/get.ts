import { GetMcuDataResponse } from "@/interface/mcu/response";
import { useQuery } from "react-query";
import { axiosInstance } from "..";

const getMcuData = async (token:string, omni:string, penempatan:string, offset:string):Promise<GetMcuDataResponse> => {
    const response = await axiosInstance.get("/vendors/schedule/mcu", {
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

export const GetMcuData = (token:string, omni:string, penempatan:string, offset:string) => {
    return useQuery({
        queryKey: ["vendor-mcu-all", token, omni, penempatan, offset],
        queryFn: ({ queryKey }) => getMcuData(queryKey[1],queryKey[2],queryKey[3],queryKey[4]),
    })
}