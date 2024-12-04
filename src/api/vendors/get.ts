import { useQuery } from "react-query";
import { axiosInstance } from "..";
import { McuResponse } from "@/interface/mcu/response";

const getMcuData = async (token:string, omni:string, penempatan:string, offset:string):Promise<McuResponse> => {
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