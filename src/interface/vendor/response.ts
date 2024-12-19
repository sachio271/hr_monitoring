export interface Vendor {
    id_vendor: string; 
    nama_vendor: string; 
    alamat_vendor: string;
    no_telp: string; 
    email: string | null; 
    status: number; 
    type: string;
}

export interface Pagination {
    page: number;
    pageSize: number;
    totalData: number;
    totalPages: number;
}

export interface ApiResponse {
    status: number;
    data: Vendor[]; 
    pagination: Pagination; 
}