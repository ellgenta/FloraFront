import { http } from "./http";

export type AuthResponse = {
  token?: string;
  isSuccess?: boolean;
  message?: string;
  userId?: number;
};

export type UserCreateDto = {
  userName: string;
  password: string;
  email: string;
  dob: string;
  gender: number;
};

export const login = (data: { login: string; password: string }) =>
  http<AuthResponse>("/api/session/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const register = (data: UserCreateDto) =>
  http<AuthResponse>("/api/session/register", {
    method: "POST",
    body: JSON.stringify(data),
  });