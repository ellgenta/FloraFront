import { http } from "./http";
import type { User, UserCreateRequest, UserUpdateRequest } from "../types/user";

type BackendUser = {
  id: number;
  userName?: string | null;
  password?: string | null;
  email?: string | null;
  orders?: unknown[] | null;
  isActive?: boolean;
};

type BackendUserCreateDto = {
  userName?: string;
  password?: string;
  email?: string;
};

const mapBackendUserToUser = (user: BackendUser): User => {
  return {
    id: user.id,
    name: user.userName || "Unknown user",
    email: user.email || "",
    role: user.isActive === false ? "Inactive" : "User",
    ordersCount: user.orders?.length ?? 0,
    isActive: user.isActive,
  };
};

const mapUserToBackendDto = (
  user: UserCreateRequest | UserUpdateRequest
): BackendUserCreateDto => {
  return {
    userName: user.name,
    email: user.email,
    password: user.password,
  };
};

export const userApi = {
  getAll: async () => {
    const data = await http<BackendUser[]>("/api/users/all");

    return data.map(mapBackendUserToUser);
  },

  getById: async (id: string | number) => {
    const data = await http<BackendUser>(`/api/users/${id}`);

    return mapBackendUserToUser(data);
  },

  create: async (user: UserCreateRequest) => {
    const data = await http<BackendUser>("/api/users", {
      method: "POST",
      body: JSON.stringify(mapUserToBackendDto(user)),
    });

    return mapBackendUserToUser(data);
  },

  update: async (id: string | number, user: UserUpdateRequest) => {
    const data = await http<BackendUser>(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(mapUserToBackendDto(user)),
    });

    return mapBackendUserToUser(data);
  },

  delete: (id: string | number) => {
    return http<void>(`/api/users/${id}`, {
      method: "DELETE",
    });
  },
};