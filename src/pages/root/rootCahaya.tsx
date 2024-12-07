import { AppSidebar } from "@/components/helper/sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthStore } from "@/state/authState";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";

export const RootUser = () => {
    const [, removeCookie] = useCookies(['refreshToken']);
    const role = useAuthStore((state) => state.auth?.user?.status);
    const logoutAuthStore = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    // const handleLogout = () => {
    //     try {
    //       postLogout.mutate([cookies.refreshToken], {
    //         onError: (error) => {
    //           console.log(error);
    //         },
    //         onSuccess: () => {
    //           logoutAuthStore();
    //           removeCookie('refreshToken', { path: '/' });
    //           navigate("/login");
    //         }
    //       });
    //     } catch (error) {
    //       console.log('error : ' + error);
    //     }
    //   }
    const handleLogout = () => {
        logoutAuthStore();
        removeCookie('refreshToken', { path: '/' });
        navigate("/");
    }
    return (
        <SidebarProvider>
            <AppSidebar onLogout={handleLogout} role={role ?? ""}/>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};
