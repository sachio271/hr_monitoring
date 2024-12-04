import { useQuery } from "react-query";
import { axiosInstance } from "..";

const getMcuData = async (token, omni, penempatan, offset) => {
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

export const GetMcuData = (token, omni, penempatan, offset) => {
    return useQuery({
        queryKey: ["vendor-mcu-all", token, omni, penempatan, offset],
        queryFn: ({ queryKey }) => getMcuData(queryKey[1],),
    })
}