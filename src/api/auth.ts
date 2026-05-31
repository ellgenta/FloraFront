import { http } from "./http";

export const login = (data: { login: string; password: string }) =>
    http<{ token: string }>("/api/session/login", {
        method: "POST",
        body: JSON.stringify(data),
    });

export const register = (data: { userName: string; email: string; password: string }) =>
    http<{ isSuccess: boolean; message: string }>("/api/session/register", {
        method: "POST",
        body: JSON.stringify(data),
    });