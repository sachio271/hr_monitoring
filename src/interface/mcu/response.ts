export interface McuApplicant {
    id_applicant: number;
    apply_ke: string;
    nama_lengkap: string;
    no_ktp: string;
    ktp_file_link: string | null;
    tgl_tes: string;
    waktu_tes: string;
    nama_vendor: string;
    alamat_vendor: string;
    penempatan: string;
    id_karyawan: string;
    recruiter: string;
    mcu_file_link: string;
    status_konfirmasi: string;
    tgl_reschedule: string;
    note_reschedule: string;
}

export interface McuPagination {
    page: number;
    pageSize: number;
    totalData: number;
    totalPages: number;
}

export interface McuResponse {
    status: number;
    data: McuApplicant[];
    pagination: McuPagination;
}