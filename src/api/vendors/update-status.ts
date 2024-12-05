import { useMutation } from "react-query";
import { axiosInstance } from "..";

const updateKonfirmasi = async ([token, id, apply, status_attendance]:[string, string, string, string]) => {
    const response = await axiosInstance.put("/vendors/mcu/" + id + "/" + apply, { status_attendance }, {
        headers: {
            "auth-token": token
        }
    });
    return response.data;
}

export const UpdateKonfirmasiMutation = () => {
    return useMutation({
        mutationFn: updateKonfirmasi
    })
}