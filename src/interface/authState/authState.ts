import User from "./user";

interface AuthState {
    user: User | null;
    status: number | null;
}

export default AuthState;