export interface LoginResponseData {
    id_karyawan: string;
    status: string;
    nama_karyawan: string;
    privileges: string;
    email: string | null;
    first_login: number;
}

export interface LoginResponse {
    status: number;
    data: LoginResponseData;
    token: string;
}