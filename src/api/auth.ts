import { http } from "./http";

export type AuthResponse = {
  token?: string;
  isSuccess?: boolean;
  message?: string;
};

export const login = (data: { login: string; password: string }) =>
  http<AuthResponse>("/api/session/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const register = (data: {
  userName: string;
  email: string;
  password: string;
}) =>
  http<AuthResponse>("/api/session/register", {
    method: "POST",
    body: JSON.stringify(data),
  });