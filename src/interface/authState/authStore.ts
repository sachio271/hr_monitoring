import { LoginResponse } from "../login/response";
import AuthState from "./authState";
import User from "./user";

interface AuthStore {
    auth: AuthState;
    login: (respose: LoginResponse) => void;
    logout: () => void;
    updateToken: (newStatus: number, user: User) => void;
}

export default AuthStore;