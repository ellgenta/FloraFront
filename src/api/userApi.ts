import { http } from "./http";
import type { User } from "../types/user";

export const userApi = {
  getAll: () => {
    return http<User[]>("/api/User");
  },

  getById: (id: string | number) => {
    return http<User>(`/api/User/${id}`);
  },
};