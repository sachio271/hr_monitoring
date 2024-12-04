import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    auth: {
        user: null,
        status: null,
    },
    login: (response) => set({
        auth: {
            user: {
                id_karyawan: response.data.id_karyawan,
                nama_karyawan: response.data.nama_karyawan,
                status: response.data.status,
                privilages: response.data.privilages,
            },
            status: response.status
        }
    }),
    logout: () => set({
        auth: {
            user: null,
            status: null,
        },
    }),
    updateToken: (newStatus, user) => set({ auth: { user: user, status: newStatus } }),
}))
