import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../state/authState";

const RequireAuth = (Component) => {
    const authStore = useAuthStore((state) => state.auth);
    const logoutAuthStore = useAuthStore((state) => state.logout);
    const { allowedRoles } = Component;
    let roleSesuai = false;
    const [cookies, removeCookie] = useCookies(['refreshToken']);

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
            if (role === authStore.data.status) {
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