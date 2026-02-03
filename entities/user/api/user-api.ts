import { api } from "@/shared/api/base"
import type { PaginationResponse, User } from "@/shared/types/api"

export const userApi = {
  getUsers: async (limit?: number, offset?: number) => {
    const params = { limit, offset }
    const response = await api.get<PaginationResponse<User>>("/users/users/", { params })
    return response.data
  },
  getUserById: async (id: number) => {
    const response = await api.get<User>(`/users/users/${id}/`)
    return response.data
  },
  createUser: async (userData: Omit<User, "id" | "patient_uid">) => {
    const response = await api.post<User>("/users/users/", userData)
    return response.data
  },
  updateUser: async (id: number, userData: Partial<User>) => {
    const response = await api.put<User>(`/users/users/${id}/`, userData)
    return response.data
  },
  patchUser: async (id: number, userData: Partial<User>) => {
    const response = await api.patch<User>(`/users/users/${id}/`, userData)
    return response.data
  },
  deleteUser: async (id: number) => {
    await api.delete(`/users/users/${id}/`)
  },
}
