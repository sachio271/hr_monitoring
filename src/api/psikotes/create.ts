import { useMutation } from "react-query";
import { axiosInstance } from "..";

const createAplicantPsikotes = async ([token, no_ktp, nama_lengkap, tgl_tes, waktu_tes, vendor, leveling, tujuan_tes]:[string, string, string, string, string, string, string, string]) => {
    const response = await axiosInstance.post("/vendors/psikotes/manual", { no_ktp, nama_lengkap, tgl_tes, waktu_tes, vendor, leveling, tujuan_tes }, {
        headers: {
            "auth-token": token
        }
    });
    return response.data;
}

export const CreateAplicantPsikotesMutation = () => {
    return useMutation({
        mutationFn: createAplicantPsikotes
    })
}