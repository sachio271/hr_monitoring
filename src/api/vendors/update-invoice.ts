import { useMutation } from "react-query";
import { axiosInstance } from "..";

const updateInvoice = async ([token, id, apply, invoice_ref]:[string, string, string, string]) => {
    const response = await axiosInstance.put("/vendors/mcu/invoice-status/" + id + "/" + apply, { invoice_ref }, {
        headers: {
            "auth-token": token
        }
    });
    return response.data;
}

export const UpdateInvoiceMutation = () => {
    return useMutation({
        mutationFn: updateInvoice
    })
}