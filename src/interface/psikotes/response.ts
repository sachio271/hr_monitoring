export interface Applicant {
    id_applicant: number;
    apply_ke: string; 
    nama_lengkap: string; 
    no_ktp: string; 
    tgl_tes: string; 
    waktu_tes: string; 
    leveling: string; 
    tujuan_tes: string; 
    nama_vendor: string; 
    alamat_vendor: string; 
    id_karyawan: string;
    pic: string; 
}

export interface Pagination {
    page: number; 
    pageSize: number; 
    totalData: number;
    totalPages: number; 
}

export interface ApiResponse {
    status: number; 
    data: Applicant[]; 
    pagination: Pagination; 
}