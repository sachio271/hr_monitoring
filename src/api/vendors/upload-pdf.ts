import { useMutation } from "react-query";
import { axiosInstance } from "..";
import { File } from "buffer";

const uploadHasilMcu = async ([token, foto, idx, id_user, apply_ke] : [string, File, string, string, string]) => {
    const response = await axiosInstance.post("/rekrutmen/upload/dokumen/pelamar", { foto, idx, id_user, apply_ke },
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "auth-token": token
            }
        }
    );
    return response.data;
}

export const UploadHasilMcuMutation = () => {
    return useMutation({
        mutationFn: uploadHasilMcu
    })
}