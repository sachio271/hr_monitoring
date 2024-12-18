import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import { axiosInstance } from "../api";
import { useAuthStore } from "../state/authState";

const PersistLogin = () => {
    const auth = useAuthStore((state) => state.auth);
    const refresh = useAuthStore((state) => state.updateToken);
    const [IsLoading, setIsLoading] = useState(true);
    const [cookies,] = useCookies(['refreshToken']);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axiosInstance.post("/master/check-token", {}, { headers: { 'auth-token': cookies.refreshToken } });
                const data = response.status;
                refresh(data, response.data.user);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        }
        if (!auth?.status) {
            verifyToken();
        } else {
            console.log("auth.status: " + auth.status);
            setIsLoading(false);
        }
    }, []);

    return <>{IsLoading ? <></> : <Outlet />}</>;
}
export default PersistLogin;