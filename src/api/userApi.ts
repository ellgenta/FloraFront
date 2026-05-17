import { http } from "./http";
import type { User, UserUpdateRequest } from "../types/user";

type BackendUser = {
  id: number;
  userName?: string | null;
  email?: string | null;
  gender?: number;
  role?: number;
  defaultAddress?: {
    state: string;
    city: string;
    street: string;
    house: string;
    apartment?: string;
  } | null;
  defaultPaymentMethod?: number | null;
  isActive?: boolean;
};

const mapBackendUserToUser = (user: BackendUser): User => ({
  id: user.id,
  name: user.userName || "Unknown user",
  email: user.email || "",
  gender: user.gender ?? 0,
  defaultAddress: user.defaultAddress ?? null,
  defaultPaymentMethod: user.defaultPaymentMethod ?? null,
  role: user.role === 2 ? "Admin" : "User",
  isActive: !!user.isActive,
});

export const userApi = {
  getAll: async () => {
    const data = await http<BackendUser[]>("/users/all");
    return data.map(mapBackendUserToUser);
  },

  getById: async (id: number) => {
    const data = await http<BackendUser>(`/users/${id}`);
    return mapBackendUserToUser(data);
  },

  update: async (id: number, user: UserUpdateRequest) => {
    const data = await http<BackendUser>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        userName: user.name,
        email: user.email,
        password: user.password,
        gender: user.gender,
        defaultAddress: user.defaultAddress,
        defaultPaymentMethod: user.defaultPaymentMethod,
      }),
    });
    return mapBackendUserToUser(data);
  },

  delete: (id: number) => http<void>(`/users/${id}`, { method: "DELETE" }),
};