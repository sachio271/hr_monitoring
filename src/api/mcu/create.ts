import { useMutation } from "react-query";
import { axiosInstance } from "..";

const createAplicantMcu = async ([token, no_ktp, nama_lengkap, tgl_tes, waktu_tes, vendor, penempatan]:[string, string, string, string, string, string, string]) => {
    const response = await axiosInstance.post("/vendors/mcu/manual", { no_ktp, nama_lengkap, tgl_tes, waktu_tes, vendor, penempatan }, {
        headers: {
            "auth-token": token
        }
    });
    return response.data;
}

export const CreateAplicantMcuMutation = () => {
    return useMutation({
        mutationFn: createAplicantMcu
    })
}