export interface Penempatan {
    id_penempatan: number;
    nama_penempatan: string;
    status: number;
}

export interface Pagination {
    page: number;
    pageSize: number;
    totalData: number;
    totalPages: number;
}

export interface ApiResponse {
    data: Penempatan[];
}
