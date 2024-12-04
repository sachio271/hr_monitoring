import { useAuthStore } from "@/state/authState";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = (props:{allowedRoles?:string[]}) => {
    const authStore = useAuthStore((state) => state.auth);
    const logoutAuthStore = useAuthStore((state) => state.logout);
    const { allowedRoles } = props;
    let roleSesuai = false;
    const [, removeCookie] = useCookies(['refreshToken']);

    if (authStore.status !== 200) {
        logoutAuthStore();
        removeCookie('refreshToken', { path: '/' });
        return <Navigate to="/" replace />;
    }
    if (!allowedRoles) {
        roleSesuai = true;
    }
    else {
        allowedRoles.map((role) => {
            if (role === authStore.user?.status) {
                roleSesuai = true;
            }
        });
    }
    if (!roleSesuai) {
        return <Navigate to="/" replace />;
    }
    else {
        return <Outlet />;
    }
}

export default RequireAuth;