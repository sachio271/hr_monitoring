import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://join.wings.co.id/api',
});