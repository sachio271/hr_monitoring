import { PostLoginMutation } from "@/api/auth/login";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AuthStore from "@/interface/authState/authStore";
import { FormData } from "@/interface/login/payload";
import { LoginResponse } from "@/interface/login/response";
import { useAuthStore } from "@/state/authState";
import { Label } from "@radix-ui/react-label";
import { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

export function Login() {
    const postLogin = PostLoginMutation();
    const loginAuthStore = useAuthStore((state: AuthStore) => state.login);
    const authStore = useAuthStore((state) => state.auth);
    const [, setCookie] = useCookies(['refreshToken']);
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm<FormData>({
        defaultValues: {
            username: "",
            password: "",
        },
    });
    console.log(authStore.status);
    if (authStore.status === 200) {
        if (authStore.user?.status == '7') {
            return <Navigate to="/dashboard" replace />;
        }
        else{
            return <Navigate to="/admin" replace />;
        }
    }

    const handleLogin = (data:FormData) => {
        postLogin.mutate({
            username: data.username,
            password: data.password
        }, {
            onError: (error:unknown) => {
                if (error instanceof AxiosError) {
                    toast("Login Gagal", {
                        description: error.response?.data.msg,
                        style: {
                            backgroundColor: "#a70000 ",
                            color: "#F3F4F6",
                        }
                    });
                }
            },
            onSuccess: (data: LoginResponse) => {
                loginAuthStore(data);
                setCookie('refreshToken', data.token, { path: '/' });
                if (data.data.status == '7') {
                    navigate("/dashboard")
                }
                else if (data.data.status == '2') {
                    navigate("/admin")
                }
            }
        });
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Toaster />
            <form onSubmit={handleSubmit(handleLogin)}>
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your username below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Username</Label>
                                <Input
                                    {...register("username")}
                                    id="email"
                                    type="text"
                                    placeholder="ID12345"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    {...register('password')}
                                    id="password"
                                    type="password"
                                    placeholder="*******"
                                    required />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}

export default Login