export type UserRole = "Admin" | "User" | string;

export type User = {
  id: string | number;
  name: string;
  email: string;
  role: UserRole;
  ordersCount?: number;
};