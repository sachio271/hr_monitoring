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
import { useNavigate } from "react-router-dom";

export function Login() {
    const postLogin = PostLoginMutation();
    const loginAuthStore = useAuthStore((state: AuthStore) => state.login);
    const [, setCookie] = useCookies(['refreshToken']);
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm<FormData>({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const handleLogin = (data:FormData) => {
        postLogin.mutate({
            username: data.username,
            password: data.password
        }, {
            onError: (error:unknown) => {
                if (error instanceof AxiosError) {
                    console.log("error : " + error.response?.data.message);
                }
            },
            onSuccess: (data: LoginResponse) => {
                loginAuthStore(data);
                setCookie('refreshToken', data.token, { path: '/' });
                if (data.data.status == '2') {
                    navigate("/dashboard")
                }
            }
        });
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <form onSubmit={handleSubmit(handleLogin)}>
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register("username")}
                                    id="email"
                                    type="text"
                                    placeholder="m@example.com"
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