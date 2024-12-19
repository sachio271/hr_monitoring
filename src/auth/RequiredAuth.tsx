import { useAuthStore } from "@/state/authState";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = (props: { allowedRoles?: string[] }) => {
    const authStore = useAuthStore((state) => state.auth);
    const logoutAuthStore = useAuthStore((state) => state.logout);
    const { allowedRoles } = props;
    const [, removeCookie] = useCookies(['refreshToken']);
    const [isLoading, setIsLoading] = useState(true);
    let roleSesuai = false;

    useEffect(() => {
        if (authStore.status !== 200) {
            logoutAuthStore();
            removeCookie('refreshToken', { path: '/' });
        }
        setIsLoading(false);
    }, [authStore.status]);

    if (isLoading) return null; 

    if (authStore.status !== 200) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles) {
        roleSesuai = true;
    } else {
        allowedRoles.map((role) => {
            if (role === authStore.user?.status) {
                roleSesuai = true;
            }
        });
    }

    if (!roleSesuai) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default RequireAuth;
