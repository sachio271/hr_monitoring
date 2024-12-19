export interface JobDescription {
    posisi: string;
    jobdesc: string[];
}

export interface ApiResponse {
    status: number;
    data: JobDescription[];
}