export interface McuAplicant {
    id_applicant: number;
    apply_ke: string;
    nama_lengkap: string;
    no_ktp: string;
    tgl_tes: string;
    waktu_tes: string;
    nama_vendor: string;
    alamat_vendor: string;
    penempatan: string;
    id_karyawan: string;
    recruiter: string;
    mcu_file_link: string | null;
    status_attendance: number;
    invoice_ref: string;
    status_konfirmasi: string;
    tgl_reschedule: string;
}

export interface Pagination {
    page: number;
    pageSize: number;
    totalData: number;
    totalPages: number;
}

export interface GetMcuDataResponse {
    status: number;
    data: McuAplicant[];
    pagination: Pagination;
}